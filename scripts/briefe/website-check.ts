/**
 * Prüft die Webseite eines Betriebs für Seite 2 des Briefs.
 *
 * Datenquelle ist Googles PageSpeed-Insights-API – dieselbe Messung, die auch
 * hinter dem Website-Check auf boch-solutions.de steht. Dazu ein paar eigene
 * Prüfungen, die Google nicht macht (HTTPS ohne "www", Weiterleitungen).
 *
 * Die Ergebnisse werden zwischengespeichert: Ein Lauf über sieben Domains dauert
 * sonst mehrere Minuten, und beim Korrekturlesen will man nicht jedes Mal warten.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

export interface WebBefund {
  domain: string;
  erreichbar: boolean;
  werte: { performance: number; seo: number; barrierefreiheit: number; praxis: number } | null;
  /** Ladezeit bis zum größten sichtbaren Element, z. B. "2,4 s". */
  lcp: string | null;
  /** true, wenn https://domain ohne "www" nicht sauber antwortet. */
  httpsOhneWwwDefekt: boolean;
  hinweise: string[];
}

const CACHE_TAGE = 7;

function apiSchluessel(wurzel: string): string | null {
  const datei = join(wurzel, ".env.local");
  if (!existsSync(datei)) return null;
  const zeile = readFileSync(datei, "utf8")
    .split("\n")
    .find((z) => z.startsWith("GOOGLE_PAGESPEED_API_KEY="));
  return zeile ? zeile.slice(zeile.indexOf("=") + 1).replace(/['"]/g, "").trim() || null : null;
}

/** https://domain ohne "www" – ein häufiger, unbemerkter Konfigurationsfehler. */
async function httpsOhneWww(domain: string): Promise<boolean> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 15000);
    const r = await fetch(`https://${domain}/`, { redirect: "follow", signal: ctrl.signal });
    clearTimeout(t);
    return !r.ok;
  } catch {
    return true;
  }
}

async function pagespeed(domain: string, key: string | null) {
  const u = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  u.searchParams.set("url", `https://${domain}`);
  u.searchParams.set("strategy", "mobile");
  for (const c of ["performance", "seo", "accessibility", "best-practices"]) u.searchParams.append("category", c);
  if (key) u.searchParams.set("key", key);

  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 120000);
  try {
    const d = await fetch(u, { signal: ctrl.signal }).then((r) => r.json());
    if (!d?.lighthouseResult) return null;
    const c = d.lighthouseResult.categories;
    const a = d.lighthouseResult.audits;
    const n = (k: string) => Math.round((c[k]?.score ?? 0) * 100);
    return {
      werte: {
        performance: n("performance"),
        seo: n("seo"),
        barrierefreiheit: n("accessibility"),
        praxis: n("best-practices"),
      },
      lcp: a?.["largest-contentful-paint"]?.displayValue ?? null,
    };
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

export async function pruefeWebseiten(domains: string[], wurzel: string): Promise<Map<string, WebBefund>> {
  const cacheDatei = join(wurzel, "scripts", "briefe", "website-cache.json");
  const cache: Record<string, { stand: number; befund: WebBefund }> = existsSync(cacheDatei)
    ? JSON.parse(readFileSync(cacheDatei, "utf8"))
    : {};
  const key = apiSchluessel(wurzel);
  if (!key) console.warn("  Hinweis: kein GOOGLE_PAGESPEED_API_KEY in .env.local – Messung ohne Schlüssel ist stark begrenzt.");

  const frisch = Date.now() - CACHE_TAGE * 86400_000;
  const ergebnis = new Map<string, WebBefund>();

  await Promise.all(
    domains.map(async (domain) => {
      const c = cache[domain];
      if (c && c.stand > frisch) {
        ergebnis.set(domain, c.befund);
        console.log(`  ${domain.padEnd(30)} aus Zwischenspeicher`);
        return;
      }
      const [ps, defekt] = await Promise.all([pagespeed(domain, key), httpsOhneWww(domain)]);
      const hinweise: string[] = [];
      if (defekt) hinweise.push(`Die Adresse https://${domain} ohne „www“ liefert keine funktionierende Seite aus. Wer den Link so teilt oder eintippt, landet auf einer Fehlermeldung.`);
      if (ps?.werte) {
        if (ps.werte.performance < 50) hinweise.push("Die Seite lädt auf dem Handy deutlich zu langsam. Genau dort öffnen Ihre Kunden sie – oft mit schlechtem Empfang auf der Baustelle.");
        else if (ps.werte.performance < 80) hinweise.push("Die Ladezeit auf dem Handy hat spürbar Luft nach oben.");
        if (ps.werte.seo < 90) hinweise.push("Technische SEO-Grundlagen fehlen – Google kann die Seite dadurch schlechter einordnen.");
        if (ps.werte.barrierefreiheit < 85) hinweise.push("Bei der Barrierefreiheit gibt es Mängel, etwa zu geringe Kontraste oder fehlende Bildbeschreibungen.");
      }
      const befund: WebBefund = {
        domain,
        erreichbar: ps !== null,
        werte: ps?.werte ?? null,
        lcp: ps?.lcp ?? null,
        httpsOhneWwwDefekt: defekt,
        hinweise,
      };
      cache[domain] = { stand: Date.now(), befund };
      ergebnis.set(domain, befund);
      console.log(`  ${domain.padEnd(30)} ${ps?.werte ? `Perf ${ps.werte.performance} · SEO ${ps.werte.seo} · A11y ${ps.werte.barrierefreiheit}` : "nicht messbar"}`);
    }),
  );

  writeFileSync(cacheDatei, JSON.stringify(cache, null, 1), "utf8");
  return ergebnis;
}
