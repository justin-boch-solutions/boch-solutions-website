import { lookup } from "node:dns/promises";
import tls from "node:tls";

/** Private, link-local und Loopback-Bereiche. Schutz gegen SSRF über unsere API. */
const BLOCKED_V4 = [
  { net: "0.0.0.0", bits: 8 },
  { net: "10.0.0.0", bits: 8 },
  { net: "100.64.0.0", bits: 10 },
  { net: "127.0.0.0", bits: 8 },
  { net: "169.254.0.0", bits: 16 },
  { net: "172.16.0.0", bits: 12 },
  { net: "192.0.0.0", bits: 24 },
  { net: "192.168.0.0", bits: 16 },
  { net: "198.18.0.0", bits: 15 },
  { net: "224.0.0.0", bits: 4 },
  { net: "240.0.0.0", bits: 4 },
];

function v4ToInt(ip: string): number | null {
  const parts = ip.split(".");
  if (parts.length !== 4) return null;
  let out = 0;
  for (const p of parts) {
    const n = Number(p);
    if (!Number.isInteger(n) || n < 0 || n > 255) return null;
    out = (out << 8) | n;
  }
  return out >>> 0;
}

export function isBlockedAddress(ip: string): boolean {
  const asInt = v4ToInt(ip);
  if (asInt !== null) {
    return BLOCKED_V4.some(({ net, bits }) => {
      const netInt = v4ToInt(net)!;
      const mask = bits === 0 ? 0 : (0xffffffff << (32 - bits)) >>> 0;
      return (asInt & mask) === (netInt & mask);
    });
  }
  // IPv6: Loopback, Unique Local, Link Local, unspecified.
  const low = ip.toLowerCase();
  if (low === "::1" || low === "::") return true;
  if (/^f[cd][0-9a-f]{2}:/.test(low)) return true;
  if (/^fe[89ab][0-9a-f]:/.test(low)) return true;
  if (low.startsWith("::ffff:")) return isBlockedAddress(low.slice(7));
  return false;
}

/** Normalisiert Nutzereingaben wie "example.de/", "HTTP://Example.de" oder "www.example.de". */
export function normalizeTarget(input: string): { origin: string; hostname: string } | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  let url: URL;
  try {
    url = new URL(withScheme);
  } catch {
    return null;
  }

  const host = url.hostname.toLowerCase();
  // Muss wie ein öffentlicher Hostname aussehen: mindestens ein Punkt, keine Ports auf Nicht-Standard.
  if (!host.includes(".") || host.endsWith(".")) return null;
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local")) return null;
  // Direkte IP-Eingaben lassen wir nicht zu: dafür gibt es den Selbstcheck.
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host)) return null;

  return { origin: `https://${host}`, hostname: host };
}

/** Prüft, ob der Hostname auf eine öffentliche Adresse zeigt. */
export async function assertPublicHost(hostname: string): Promise<void> {
  let addresses: { address: string }[];
  try {
    addresses = await lookup(hostname, { all: true });
  } catch {
    throw new Error("DNS_FEHLGESCHLAGEN");
  }
  if (addresses.length === 0) throw new Error("DNS_FEHLGESCHLAGEN");
  if (addresses.some((a) => isBlockedAddress(a.address))) {
    throw new Error("PRIVATE_ADRESSE");
  }
}

export interface Probe {
  ok: boolean;
  status?: number;
  headers?: Headers;
  body?: string;
  redirectedTo?: string;
  error?: string;
}

const USER_AGENT =
  "BochSolutions-SicherheitsCheck/1.0 (+https://boch-solutions.de/sicherheits-check)";

/**
 * Einzelner, bewusst schonender HTTP-Request.
 * Kein Retry, kurzer Timeout, maximal 256 KB Body.
 */
export async function probe(
  url: string,
  opts: { method?: string; timeoutMs?: number; maxBytes?: number; redirect?: RequestRedirect } = {}
): Promise<Probe> {
  const { method = "GET", timeoutMs = 8000, maxBytes = 256 * 1024, redirect = "follow" } = opts;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      method,
      redirect,
      signal: controller.signal,
      headers: { "User-Agent": USER_AGENT, Accept: "*/*" },
      cache: "no-store",
    });

    let body = "";
    if (method !== "HEAD" && res.body) {
      const reader = res.body.getReader();
      const chunks: Uint8Array[] = [];
      let total = 0;
      while (total < maxBytes) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        total += value.length;
      }
      await reader.cancel().catch(() => {});
      const merged = new Uint8Array(total);
      let offset = 0;
      for (const c of chunks) {
        merged.set(c.subarray(0, Math.min(c.length, total - offset)), offset);
        offset += c.length;
        if (offset >= total) break;
      }
      body = new TextDecoder("utf-8", { fatal: false }).decode(merged);
    }

    return {
      ok: true,
      status: res.status,
      headers: res.headers,
      body,
      redirectedTo: res.redirected ? res.url : undefined,
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, error: controller.signal.aborted ? "TIMEOUT" : msg };
  } finally {
    clearTimeout(timer);
  }
}

/** Zertifikatsfelder können string oder string[] sein. */
function firstString(v: string | string[] | undefined): string | undefined {
  if (Array.isArray(v)) return v[0];
  return v;
}

export interface TlsInfo {
  valid: boolean;
  issuer?: string;
  validTo?: string;
  daysRemaining?: number;
  protocol?: string;
  error?: string;
}

/** Liest das TLS-Zertifikat direkt, weil fetch() diese Details nicht herausgibt. */
export function inspectTls(hostname: string, timeoutMs = 8000): Promise<TlsInfo> {
  return new Promise((resolve) => {
    let settled = false;
    const done = (info: TlsInfo) => {
      if (settled) return;
      settled = true;
      socket.destroy();
      resolve(info);
    };

    const socket = tls.connect(
      { host: hostname, port: 443, servername: hostname, rejectUnauthorized: false, timeout: timeoutMs },
      () => {
        const cert = socket.getPeerCertificate();
        if (!cert || !cert.valid_to) {
          return done({ valid: false, error: "KEIN_ZERTIFIKAT" });
        }
        const validTo = new Date(cert.valid_to);
        const daysRemaining = Math.floor((validTo.getTime() - Date.now()) / 86_400_000);
        done({
          valid: socket.authorized,
          issuer: firstString(cert.issuer?.O) ?? firstString(cert.issuer?.CN),
          validTo: validTo.toISOString(),
          daysRemaining,
          protocol: socket.getProtocol() || undefined,
          error: socket.authorized ? undefined : socket.authorizationError?.toString(),
        });
      }
    );

    socket.on("timeout", () => done({ valid: false, error: "TIMEOUT" }));
    socket.on("error", (e) => done({ valid: false, error: e.message }));
  });
}
