import { NextResponse } from "next/server";
import { Resend } from "resend";
import { company } from "@/lib/constants";

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

  const lines = [
    `Name: ${name}`,
    `Firma: ${firma}`,
    email ? `E-Mail: ${email}` : null,
    telefon ? `Telefon: ${telefon}` : null,
    branche ? `Branche: ${branche}` : null,
    anliegen ? `Anliegen: ${anliegen}` : null,
    "",
    nachricht || "(keine Nachricht angegeben)",
  ].filter((line): line is string => line !== null);

  try {
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: company.email,
      replyTo: email,
      subject: `Anfrage über die Webseite – ${firma || name}`,
      text: lines.join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Senden fehlgeschlagen. Bitte versuchen Sie es erneut." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Kontaktformular-Versand fehlgeschlagen:", err);
    return NextResponse.json({ error: "Senden fehlgeschlagen. Bitte versuchen Sie es erneut." }, { status: 500 });
  }
}
