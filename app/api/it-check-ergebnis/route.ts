import { NextResponse } from "next/server";
import { Resend } from "resend";
import { company } from "@/lib/constants";
import { emailButton, escapeHtml, getLogoAttachment, renderEmailLayout } from "@/lib/email-template";

interface Recommendation {
  name: string;
  url: string;
}

function isRecommendation(value: unknown): value is Recommendation {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof (value as Record<string, unknown>).name === "string" &&
    typeof (value as Record<string, unknown>).url === "string"
  );
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  // Honeypot: a hidden field real users never fill in; bots that
  // auto-fill every field will trip it.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const score = typeof body.score === "number" ? body.score : null;
  const maxScore = typeof body.maxScore === "number" ? body.maxScore : null;
  const tierTitle = typeof body.tierTitle === "string" ? body.tierTitle.trim() : "";
  const tierDescription = typeof body.tierDescription === "string" ? body.tierDescription.trim() : "";
  const recommendations = Array.isArray(body.recommendations) ? body.recommendations.filter(isRecommendation) : [];

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !email || !emailPattern.test(email) || score === null || maxScore === null || !tierTitle) {
    return NextResponse.json({ error: "Bitte füllen Sie alle Pflichtfelder aus." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY ist nicht gesetzt.");
    return NextResponse.json(
      { error: "Der Versand ist derzeit nicht verfügbar. Ihr Ergebnis sehen Sie aber weiterhin oben auf dieser Seite." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const logoAttachment = getLogoAttachment();

  // Resend requires the sending domain to be verified; only the
  // "send." subdomain is verified in Resend, not the bare root domain.
  const fromAddress = `JB Solutions <it-check@send.${company.domain}>`;

  const recommendationLines = recommendations.map((r) => `- ${r.name}: ${r.url}`).join("\n");
  const recommendationsHtml = recommendations
    .map(
      (r) => `<tr>
        <td style="padding:12px 16px;border:1px solid #e5e7eb;border-radius:12px;">
          <a href="${r.url}" style="color:#10131a;font-size:14px;font-weight:600;text-decoration:none;">${escapeHtml(r.name)}</a>
        </td>
      </tr>
      <tr><td style="height:10px;line-height:10px;font-size:0;">&nbsp;</td></tr>`,
    )
    .join("");

  const resultHtml = renderEmailLayout({
    previewText: `Ihr IT-Check-Ergebnis: ${score} von ${maxScore} Punkten – ${tierTitle}`,
    bodyHtml: `
      <h1 style="margin:0 0 4px;font-size:20px;color:#10131a;">Ihr IT-Check-Ergebnis</h1>
      <p style="margin:0 0 20px;font-size:15px;color:#5b6472;">Hallo ${escapeHtml(name)}, vielen Dank für Ihren IT-Check!</p>

      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f5f8;border-radius:12px;margin-bottom:20px;">
        <tr>
          <td style="padding:20px 24px;text-align:center;">
            <div style="font-size:28px;font-weight:700;color:#10131a;">${score} / ${maxScore} Punkten</div>
            <div style="margin-top:4px;font-size:15px;font-weight:600;color:#8c52ff;">${escapeHtml(tierTitle)}</div>
          </td>
        </tr>
      </table>

      <p style="margin:0 0 20px;font-size:14px;color:#10131a;line-height:1.6;">${escapeHtml(tierDescription)}</p>

      ${
        recommendationsHtml
          ? `<p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#5b6472;">Empfohlene nächste Schritte</p>
             <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${recommendationsHtml}</table>`
          : ""
      }

      <div style="margin-top:16px;">
        ${emailButton("Kostenlosen Strategie-Call vereinbaren", `${company.url}/kontakt`)}
      </div>
    `,
  });

  try {
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: email,
      replyTo: company.email,
      subject: "Ihr IT-Check-Ergebnis",
      text: [
        `Hallo ${name},`,
        "",
        "vielen Dank für Ihren IT-Check! Hier ist Ihr persönliches Ergebnis:",
        "",
        `${score} von ${maxScore} Punkten – ${tierTitle}`,
        "",
        tierDescription,
        "",
        recommendationLines ? "Empfohlene nächste Schritte für Ihren Betrieb:" : "",
        recommendationLines,
        "",
        `Fragen dazu? Einfach antworten oder unter ${company.phone} anrufen.`,
        "",
        `Viele Grüße`,
        `${company.owner}, ${company.name}`,
      ]
        .filter((line) => line !== "")
        .join("\n"),
      html: resultHtml,
      attachments: [logoAttachment],
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Senden fehlgeschlagen. Bitte versuchen Sie es erneut." }, { status: 502 });
    }

    // Internal lead notification – best-effort, doesn't block the customer's response.
    const leadHtml = renderEmailLayout({
      previewText: `Neuer IT-Check-Lead: ${name}`,
      bodyHtml: `
        <h1 style="margin:0 0 16px;font-size:20px;color:#10131a;">Neuer IT-Check-Lead</h1>
        <p style="margin:0 0 16px;font-size:14px;color:#10131a;line-height:1.6;">
          <strong>${escapeHtml(name)}</strong> (${escapeHtml(email)}) hat den IT-Check abgeschlossen.
        </p>
        <p style="margin:0 0 16px;font-size:14px;color:#10131a;">
          Ergebnis: <strong>${score} / ${maxScore} Punkten – ${escapeHtml(tierTitle)}</strong>
        </p>
        ${
          recommendationsHtml
            ? `<p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#5b6472;">Empfohlene Leistungen</p>
               <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${recommendationsHtml}</table>`
            : ""
        }
        <div style="margin-top:16px;">
          ${emailButton("Antworten", `mailto:${email}`)}
        </div>
      `,
    });

    resend.emails
      .send({
        from: fromAddress,
        to: company.email,
        replyTo: email,
        subject: `Neuer IT-Check-Lead: ${name}`,
        text: `${name} (${email}) hat den IT-Check abgeschlossen.\n\nErgebnis: ${score} / ${maxScore} Punkten – ${tierTitle}\n\n${recommendationLines || "(keine Empfehlungen)"}`,
        html: leadHtml,
        attachments: [logoAttachment],
      })
      .catch((err) => console.error("Interne IT-Check-Lead-Benachrichtigung fehlgeschlagen:", err));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("IT-Check-Ergebnis-Versand fehlgeschlagen:", err);
    return NextResponse.json({ error: "Senden fehlgeschlagen. Bitte versuchen Sie es erneut." }, { status: 500 });
  }
}
