import { NextResponse } from "next/server";
import { Resend } from "resend";
import { company } from "@/lib/constants";
import { emailButton, escapeHtml, getLogoAttachment, renderEmailLayout } from "@/lib/email-template";
import { runScan } from "@/lib/website-security/scan";
import { SEVERITY_LABEL } from "@/lib/website-security/scoring";
import type { Finding, ScanResult, Severity } from "@/lib/website-security/types";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

/**
 * Rate-Limit im Arbeitsspeicher. Läuft auf Vercel pro Instanz und ist damit
 * keine harte Grenze, bremst aber zuverlässig den Fall, dass jemand den
 * Scanner als Massenwerkzeug gegen fremde Server verwendet.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return false;
}

const ERROR_TEXTS: Record<string, string> = {
  UNGUELTIGE_DOMAIN: "Das sieht nicht nach einer gültigen Domain aus. Bitte so eingeben: beispiel.de",
  PRIVATE_ADRESSE:
    "Diese Domain zeigt auf eine interne Adresse. Interne Systeme lassen sich hier nicht prüfen – dafür gibt es das Selbstcheck-Skript.",
  DNS_FEHLGESCHLAGEN: "Die Domain ließ sich nicht auflösen. Bitte die Schreibweise prüfen.",
  NICHT_ERREICHBAR: "Die Seite war über HTTPS nicht erreichbar.",
  ZEITUEBERSCHREITUNG:
    "Der Server hat zu lange gebraucht. Das kann an einer Firewall liegen, die unsere Anfrage blockt.",
};

const SEVERITY_COLOR: Record<Severity, string> = {
  critical: "#ef4444",
  high: "#f97316",
  medium: "#eab308",
  low: "#38bdf8",
  info: "#8b94a3",
  ok: "#22c55e",
};

function findingHtml(finding: Finding): string {
  const actions = finding.actions
    .slice(0, 12)
    .map((a) => `<li style="margin-bottom:6px;">${escapeHtml(a)}</li>`)
    .join("");

  return `<tr>
      <td style="padding:16px;border:1px solid #e5e7eb;border-radius:12px;">
        <div style="font-size:12px;font-weight:700;color:${SEVERITY_COLOR[finding.severity]};text-transform:uppercase;letter-spacing:0.08em;">${escapeHtml(SEVERITY_LABEL[finding.severity])}</div>
        <div style="margin-top:6px;font-size:15px;font-weight:600;color:#10131a;">${escapeHtml(finding.title)}</div>
        <div style="margin-top:6px;font-size:14px;line-height:1.5;color:#5b6472;">${escapeHtml(finding.evidence)}</div>
        ${finding.impact ? `<div style="margin-top:10px;font-size:14px;line-height:1.5;color:#5b6472;"><strong style="color:#10131a;">Warum das zählt:</strong> ${escapeHtml(finding.impact)}</div>` : ""}
        ${actions ? `<div style="margin-top:10px;font-size:14px;line-height:1.5;color:#5b6472;"><strong style="color:#10131a;">Was jetzt zu tun ist:</strong><ol style="margin:8px 0 0;padding-left:20px;">${actions}</ol></div>` : ""}
        ${finding.cves?.length ? `<div style="margin-top:8px;font-size:12px;color:#8b94a3;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;">${finding.cves.map(escapeHtml).join(" · ")}</div>` : ""}
      </td>
    </tr>
    <tr><td style="height:10px;line-height:10px;font-size:0;">&nbsp;</td></tr>`;
}

function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unbekannt"
  );
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  // Honeypot: ein verstecktes Feld, das echte Besucher nie ausfüllen.
  if (typeof body.hp_confirm === "string" && body.hp_confirm.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (rateLimited(clientIp(request))) {
    return NextResponse.json({ error: "Zu viele Anfragen. Bitte eine Minute warten." }, { status: 429 });
  }

  const domain = typeof body.domain === "string" ? body.domain : "";
  if (!domain.trim()) {
    return NextResponse.json({ error: "Bitte eine Domain angeben." }, { status: 400 });
  }
  if (body.consent !== true) {
    return NextResponse.json(
      { error: "Bitte bestätigen Sie, dass Sie zur Prüfung dieser Domain berechtigt sind." },
      { status: 400 },
    );
  }

  let result: ScanResult;
  try {
    result = await runScan(domain);
  } catch (error) {
    const key = error instanceof Error ? error.message : "";
    const message = ERROR_TEXTS[key] ?? "Die Prüfung ist fehlgeschlagen. Bitte später erneut versuchen.";
    const status = key === "UNGUELTIGE_DOMAIN" || key === "PRIVATE_ADRESSE" ? 400 : 502;
    return NextResponse.json({ error: message }, { status });
  }

  return NextResponse.json({ report: result }, { headers: { "Cache-Control": "no-store" } });
}

/**
 * Versendet den ausführlichen Bericht. Bewusst getrennt vom Scan, damit das
 * Ergebnis sofort sichtbar ist und die E-Mail-Adresse freiwillig bleibt.
 */
export async function PUT(request: Request) {
  let body: { email?: string; name?: string; report?: ScanResult; hp_confirm?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  if (typeof body.hp_confirm === "string" && body.hp_confirm.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const email = body.email?.trim() ?? "";
  const report = body.report;

  if (!/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "Bitte eine gültige E-Mail-Adresse angeben." }, { status: 400 });
  }
  // Das Ergebnis kommt vom Client zurück und ist damit nicht vertrauenswürdig.
  // Jeder Wert wird vor dem Einsetzen in die E-Mail escaped.
  if (!report || !Array.isArray(report.findings) || !report.target?.hostname) {
    return NextResponse.json({ error: "Kein auswertbares Ergebnis übergeben." }, { status: 400 });
  }
  if (report.findings.length > 100) {
    return NextResponse.json({ error: "Ergebnis zu groß." }, { status: 400 });
  }
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Der Versand ist gerade nicht verfügbar." }, { status: 503 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const host = escapeHtml(report.target.hostname);
  const problems = report.findings.filter((f) => f.severity !== "ok");
  const positives = report.findings.filter((f) => f.severity === "ok");
  const criticalCount = report.findings.filter((f) => f.severity === "critical").length;

  const bodyHtml = `
    <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#10131a;">Sicherheits-Bericht für ${host}</h1>
    <p style="margin:0 0 24px;font-size:15px;color:#5b6472;">
      Note ${escapeHtml(report.grade)} · ${escapeHtml(String(report.score))}/100 ·
      geprüft am ${escapeHtml(new Date(report.scannedAt).toLocaleString("de-DE"))}
    </p>
    ${
      criticalCount > 0
        ? `<p style="margin:0 0 24px;padding:14px 16px;background:#fef2f2;border:1px solid #fecaca;border-radius:10px;font-size:14px;color:#991b1b;">
             <strong>${criticalCount} kritische${criticalCount === 1 ? "r" : ""} Fund${criticalCount === 1 ? "" : "e"}.</strong>
             Diese Punkte sollten vor allem anderen abgearbeitet werden.
           </p>`
        : ""
    }
    <h2 style="margin:0 0 12px;font-size:18px;font-weight:700;color:#10131a;">Handlungsbedarf (${problems.length})</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:separate;">
      ${problems.map(findingHtml).join("") || '<tr><td style="font-size:14px;color:#5b6472;">Keine Auffälligkeiten gefunden.</td></tr>'}
    </table>
    ${
      positives.length > 0
        ? `<h2 style="margin:24px 0 12px;font-size:18px;font-weight:700;color:#10131a;">Bereits in Ordnung (${positives.length})</h2>
           <ul style="margin:0;padding-left:20px;font-size:14px;line-height:1.6;color:#5b6472;">
             ${positives.map((f) => `<li>${escapeHtml(f.title)}</li>`).join("")}
           </ul>`
        : ""
    }
    <p style="margin:28px 0 0;font-size:13px;line-height:1.6;color:#8b94a3;">
      Dieser Bericht beruht auf einer Prüfung von außen. Er zeigt, was ein Angreifer ohne Zugangsdaten
      sieht – nicht das, was nur auf dem Server selbst prüfbar ist, allen voran der tatsächliche
      PHP-Patchstand. Dafür gibt es das kostenlose Selbstcheck-Skript unter
      ${company.url}/downloads/boch-selfcheck.sh
    </p>
    <p style="margin:12px 0 24px;font-size:13px;line-height:1.6;color:#8b94a3;">
      Fachliche Grundlage zu php2shell: BSI-IT-Sicherheitshinweis BITS-H Nr. 2026-297981-1232,
      Version 1.2 (TLP:CLEAR).
    </p>
    ${emailButton("Funde gemeinsam abarbeiten", `${company.url}/kontakt`)}
  `;

  try {
    await resend.emails.send({
      from: `${company.name} <kontakt@send.boch-solutions.de>`,
      to: email,
      replyTo: company.email,
      subject: `Sicherheits-Bericht für ${report.target.hostname} (Note ${report.grade})`,
      html: renderEmailLayout({
        previewText: `${problems.length} Punkte mit Handlungsbedarf für ${report.target.hostname}`,
        bodyHtml,
      }),
      attachments: [getLogoAttachment()],
    });

    await resend.emails.send({
      from: `${company.name} <kontakt@send.boch-solutions.de>`,
      to: company.email,
      replyTo: email,
      subject: `Sicherheits-Check: ${report.target.hostname} (Note ${report.grade}, ${criticalCount} kritisch)`,
      html: renderEmailLayout({
        previewText: `Neuer Sicherheits-Check für ${report.target.hostname}`,
        bodyHtml: `
          <h1 style="margin:0 0 16px;font-size:20px;color:#10131a;">Neuer Sicherheits-Check</h1>
          <p style="font-size:14px;color:#5b6472;">
            <strong>Domain:</strong> ${host}<br/>
            <strong>Name:</strong> ${escapeHtml(body.name ?? "nicht angegeben")}<br/>
            <strong>E-Mail:</strong> ${escapeHtml(email)}<br/>
            <strong>Ergebnis:</strong> Note ${escapeHtml(report.grade)} (${escapeHtml(String(report.score))}/100)<br/>
            <strong>Kritisch:</strong> ${criticalCount} · <strong>Handlungsbedarf gesamt:</strong> ${problems.length}<br/>
            <strong>Erkannt:</strong> ${escapeHtml(report.fingerprint?.phpVersion ?? "kein PHP")} ·
            ${escapeHtml(report.fingerprint?.cms ?? "kein CMS erkannt")}
          </p>
          <p style="font-size:13px;color:#8b94a3;">Top-Funde:</p>
          <ul style="font-size:14px;color:#5b6472;">
            ${problems.slice(0, 5).map((f) => `<li>${escapeHtml(SEVERITY_LABEL[f.severity])}: ${escapeHtml(f.title)}</li>`).join("")}
          </ul>`,
      }),
      attachments: [getLogoAttachment()],
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Sicherheits-Bericht konnte nicht versendet werden:", error);
    return NextResponse.json({ error: "Versand fehlgeschlagen. Bitte später erneut." }, { status: 502 });
  }
}
