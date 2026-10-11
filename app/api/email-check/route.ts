import { NextResponse } from "next/server";
import { Resend } from "resend";
import { company, formatEuro, pricing } from "@/lib/constants";
import { checkEmailSecurity, normalizeDomain, type EmailSecurityReport, type Severity } from "@/lib/email-security";
import { emailButton, emailDataRows, escapeHtml, getLogoAttachment, renderEmailLayout } from "@/lib/email-template";

export const maxDuration = 60;

const SEVERITY_COLOR: Record<Severity, string> = {
  ok: "#22c55e",
  warn: "#eab308",
  critical: "#ef4444",
};

const SEVERITY_LABEL: Record<Severity, string> = {
  ok: "In Ordnung",
  warn: "Lücke",
  critical: "Kritisch",
};

const VERDICT_HEADLINE: Record<EmailSecurityReport["verdict"], string> = {
  sauber: "Ihre E-Mail-Domain ist sauber eingerichtet",
  lueckenhaft: "Ihre E-Mail-Domain hat Lücken",
  kritisch: "Ihre E-Mail-Domain ist angreifbar",
  unbekannt: "Zu Ihrer Domain ließen sich keine Einträge abrufen",
};

function findingsHtml(report: EmailSecurityReport): string {
  return report.findings
    .map(
      (finding) => `<tr>
        <td style="padding:16px;border:1px solid #e5e7eb;border-radius:12px;">
          <div style="font-size:12px;font-weight:700;color:${SEVERITY_COLOR[finding.severity]};text-transform:uppercase;letter-spacing:0.08em;">${SEVERITY_LABEL[finding.severity]}</div>
          <div style="margin-top:6px;font-size:15px;font-weight:600;color:#10131a;">${escapeHtml(finding.title)}</div>
          <div style="margin-top:6px;font-size:14px;line-height:1.5;color:#5b6472;">${escapeHtml(finding.consequence)}</div>
          <div style="margin-top:8px;font-size:12px;line-height:1.45;color:#8b94a3;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;word-break:break-all;">${escapeHtml(finding.detail)}</div>
        </td>
      </tr>
      <tr><td style="height:10px;line-height:10px;font-size:0;">&nbsp;</td></tr>`,
    )
    .join("");
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  // Honeypot: a hidden field real users never fill in.
  if (typeof body.hp_confirm === "string" && body.hp_confirm.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const firma = typeof body.firma === "string" ? body.firma.trim() : "";
  const domainInput = typeof body.domain === "string" ? body.domain.trim() : "";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !email || !domainInput || !emailPattern.test(email)) {
    return NextResponse.json({ error: "Bitte füllen Sie alle Pflichtfelder aus." }, { status: 400 });
  }

  const domain = normalizeDomain(domainInput);
  if (!domain) {
    return NextResponse.json(
      { error: "Bitte geben Sie eine gültige Domain an, zum Beispiel meine-firma.de." },
      { status: 400 },
    );
  }

  let report: EmailSecurityReport;
  try {
    report = await checkEmailSecurity(domain);
  } catch (err) {
    console.error("E-Mail-Check fehlgeschlagen:", err);
    return NextResponse.json(
      { error: "Die Domain konnte nicht geprüft werden. Bitte prüfen Sie die Eingabe und versuchen Sie es erneut." },
      { status: 502 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY ist nicht gesetzt.");
    return NextResponse.json({ ok: true, report });
  }

  const resend = new Resend(apiKey);
  const logoAttachment = getLogoAttachment();
  const fromAddress = `Justin Boch - Solutions <email-check@send.${company.domain}>`;
  const needsWork = report.criticalCount > 0 || report.warnCount > 0;

  const offerHtml = needsWork
    ? `<div style="margin-top:4px;padding:16px;border:1px solid #e5e7eb;border-radius:12px;background:#f8fafc;">
         <div style="font-size:15px;font-weight:600;color:#10131a;">Soll ich das beheben?</div>
         <div style="margin-top:6px;font-size:14px;line-height:1.5;color:#5b6472;">
           Ich richte SPF, DKIM und DMARC für Ihre Domain korrekt ein, beobachte vier Wochen die Berichte und ziehe den Schutz dann auf die strenge Stufe. Danach bekommen Sie denselben Bericht noch einmal – als Nachweis.
           Festpreis ${escapeHtml(formatEuro(pricing.emailProtection))}, kein Betriebsausfall. Eine Antwort auf diese Mail reicht.
         </div>
       </div>`
    : "";

  const resultHtml = renderEmailLayout({
    previewText: `E-Mail-Sicherheit für ${report.domain}: ${VERDICT_HEADLINE[report.verdict]}`,
    bodyHtml: `
      <h1 style="margin:0 0 4px;font-size:20px;color:#10131a;">${escapeHtml(VERDICT_HEADLINE[report.verdict])}</h1>
      <p style="margin:0 0 20px;font-size:15px;color:#5b6472;">Hallo ${escapeHtml(name)}, hier ist das Ergebnis für <strong>${escapeHtml(report.domain)}</strong>${report.provider ? ` (E-Mail läuft über ${escapeHtml(report.provider)})` : ""}.</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${findingsHtml(report)}</table>
      ${offerHtml}
      <div style="margin-top:20px;">
        ${emailButton(needsWork ? "Details zur E-Mail-Optimierung" : "Kostenlosen Strategie-Call vereinbaren", needsWork ? `${company.url}/leistungen/email-optimierung` : `${company.url}/kontakt`)}
      </div>
      <p style="margin:20px 0 0;font-size:12px;line-height:1.5;color:#8b94a3;">
        Geprüft wurden ausschließlich öffentlich abrufbare DNS-Einträge Ihrer Domain. Es wurde kein Zugriff auf Postfächer, Server oder Inhalte genommen.
      </p>
    `,
  });

  try {
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: email,
      replyTo: company.email,
      subject: `E-Mail-Sicherheit für ${report.domain}: ${VERDICT_HEADLINE[report.verdict]}`,
      text: [
        `Hallo ${name},`,
        "",
        `Ergebnis für ${report.domain}${report.provider ? ` (E-Mail über ${report.provider})` : ""}:`,
        "",
        ...report.findings.map((f) => `[${SEVERITY_LABEL[f.severity]}] ${f.title}\n${f.consequence}\n${f.detail}\n`),
        needsWork
          ? `Soll ich das beheben? Festpreis ${formatEuro(pricing.emailProtection)}, kein Betriebsausfall. Eine Antwort auf diese Mail reicht.`
          : "",
        "",
        "Geprüft wurden ausschließlich öffentlich abrufbare DNS-Einträge Ihrer Domain.",
        "",
        `${company.owner}, ${company.name}`,
      ].join("\n"),
      html: resultHtml,
      attachments: [logoAttachment],
    });
    if (error) console.error("Resend error:", error);
  } catch (err) {
    console.error("E-Mail-Check-Ergebnis-Versand fehlgeschlagen:", err);
  }

  // Internal lead notification. Provider plus finding summary make the lead
  // qualifiable at a glance: Microsoft 365 with missing DKIM/DMARC closes fastest.
  const leadDataRows = [
    { label: "Name", value: name },
    { label: "E-Mail", value: email },
    ...(firma ? [{ label: "Firma", value: firma }] : []),
    { label: "Domain", value: report.domain },
    { label: "E-Mail-Anbieter", value: report.provider ?? "kein MX-Eintrag" },
    { label: "Microsoft 365", value: report.isMicrosoft365 ? "ja" : "nein" },
    { label: "Bewertung", value: `${report.verdict} (${report.criticalCount} kritisch, ${report.warnCount} Lücken)` },
    ...report.findings.map((f) => ({
      label: f.id.toUpperCase(),
      value: `${SEVERITY_LABEL[f.severity]} – ${f.detail}`,
    })),
  ];

  resend.emails
    .send({
      from: fromAddress,
      to: company.email,
      replyTo: email,
      subject: `E-Mail-Check-Lead: ${firma || name} (${report.domain}) – ${report.verdict}${report.isMicrosoft365 ? ", M365" : ""}`,
      text: leadDataRows.map((row) => `${row.label}: ${row.value}`).join("\n"),
      html: renderEmailLayout({
        previewText: `Neuer E-Mail-Check-Lead: ${name}`,
        bodyHtml: `
          <h1 style="margin:0 0 16px;font-size:20px;color:#10131a;">Neuer E-Mail-Check-Lead</h1>
          ${emailDataRows(leadDataRows)}
          <div style="margin-top:24px;">
            ${emailButton("Direkt antworten", `mailto:${email}`)}
          </div>
        `,
      }),
      attachments: [logoAttachment],
    })
    .catch((err) => console.error("Interne E-Mail-Check-Lead-Benachrichtigung fehlgeschlagen:", err));

  return NextResponse.json({ ok: true, report });
}
