import { NextResponse } from "next/server";
import { Resend } from "resend";
import { company } from "@/lib/constants";
import { emailButton, emailDataRows, escapeHtml, renderEmailLayout } from "@/lib/email-template";

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
  const firma = typeof body.firma === "string" ? body.firma.trim() : "";
  const telefon = typeof body.telefon === "string" ? body.telefon.trim() : "";
  const branche = typeof body.branche === "string" ? body.branche.trim() : "";
  const anliegen = typeof body.anliegen === "string" ? body.anliegen.trim() : "";
  const nachricht = typeof body.nachricht === "string" ? body.nachricht.trim() : "";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !email || !firma || !emailPattern.test(email)) {
    return NextResponse.json({ error: "Bitte füllen Sie alle Pflichtfelder aus." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY ist nicht gesetzt.");
    return NextResponse.json(
      { error: "Der Versand ist derzeit nicht verfügbar. Bitte rufen Sie uns an oder schreiben Sie direkt eine E-Mail." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);

  // Resend requires the sending domain to be verified; only the
  // "send." subdomain is verified in Resend, not the bare root domain.
  const fromAddress = `Kontaktformular <formular@send.${company.domain}>`;

  const dataRows = [
    { label: "Name", value: name },
    { label: "Firma", value: firma },
    { label: "E-Mail", value: email },
    ...(telefon ? [{ label: "Telefon", value: telefon }] : []),
    ...(branche ? [{ label: "Branche", value: branche }] : []),
    ...(anliegen ? [{ label: "Anliegen", value: anliegen }] : []),
  ];

  const summaryLines = dataRows.map((row) => `${row.label}: ${row.value}`);

  const textLines = [...summaryLines, "", nachricht || "(keine Nachricht angegeben)"];

  const notificationHtml = renderEmailLayout({
    previewText: `Neue Anfrage von ${name}${firma ? ` (${firma})` : ""}`,
    bodyHtml: `
      <h1 style="margin:0 0 16px;font-size:20px;color:#10131a;">Neue Anfrage über die Webseite</h1>
      ${emailDataRows(dataRows)}
      ${
        nachricht
          ? `<p style="margin:20px 0 4px;font-size:13px;font-weight:600;color:#5b6472;">Nachricht</p>
             <p style="margin:0;font-size:14px;color:#10131a;line-height:1.6;white-space:pre-wrap;">${escapeHtml(nachricht)}</p>`
          : ""
      }
      <div style="margin-top:24px;">
        ${emailButton("Direkt antworten", `mailto:${email}`)}
      </div>
    `,
  });

  const confirmationHtml = renderEmailLayout({
    previewText: "Vielen Dank für Ihre Anfrage – wir melden uns zeitnah bei Ihnen.",
    bodyHtml: `
      <h1 style="margin:0 0 12px;font-size:20px;color:#10131a;">Vielen Dank, ${escapeHtml(name)}!</h1>
      <p style="margin:0 0 20px;font-size:15px;color:#10131a;line-height:1.6;">
        Ihre Anfrage ist bei uns angekommen. Wir melden uns in der Regel innerhalb eines Werktags bei Ihnen.
      </p>
      <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#5b6472;">Ihre Angaben im Überblick</p>
      ${emailDataRows(dataRows)}
      <p style="margin:24px 0 8px;font-size:14px;color:#10131a;">Lieber direkt sprechen?</p>
      <div>
        ${emailButton(`Anrufen: ${company.phone}`, company.phoneHref)}
      </div>
    `,
  });

  try {
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: company.email,
      replyTo: email,
      subject: `Anfrage über die Webseite – ${firma || name}`,
      text: textLines.join("\n"),
      html: notificationHtml,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Senden fehlgeschlagen. Bitte versuchen Sie es erneut." }, { status: 502 });
    }

    // Customer confirmation – best-effort, doesn't block the success response.
    resend.emails
      .send({
        from: fromAddress,
        to: email,
        replyTo: company.email,
        subject: "Ihre Anfrage ist angekommen – JB Solutions",
        text: `Vielen Dank, ${name}!\n\nIhre Anfrage ist bei uns angekommen. Wir melden uns in der Regel innerhalb eines Werktags bei Ihnen.\n\nIhre Angaben:\n${summaryLines.join("\n")}\n\nLieber direkt sprechen? ${company.phone}`,
        html: confirmationHtml,
      })
      .catch((err) => console.error("Bestätigungsmail an Kunde fehlgeschlagen:", err));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Kontaktformular-Versand fehlgeschlagen:", err);
    return NextResponse.json({ error: "Senden fehlgeschlagen. Bitte versuchen Sie es erneut." }, { status: 500 });
  }
}
