import { NextResponse } from "next/server";
import { Resend } from "resend";
import { company } from "@/lib/constants";

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

  // Resend requires the sending domain to be verified; only the
  // "send." subdomain is verified in Resend, not the bare root domain.
  const fromAddress = `JB Solutions <it-check@send.${company.domain}>`;

  const recommendationLines = recommendations.map((r) => `- ${r.name}: ${r.url}`).join("\n");

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
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Senden fehlgeschlagen. Bitte versuchen Sie es erneut." }, { status: 502 });
    }

    // Internal lead notification – best-effort, doesn't block the customer's response.
    resend.emails
      .send({
        from: fromAddress,
        to: company.email,
        replyTo: email,
        subject: `Neuer IT-Check-Lead: ${name}`,
        text: `${name} (${email}) hat den IT-Check abgeschlossen.\n\nErgebnis: ${score} / ${maxScore} Punkten – ${tierTitle}\n\n${recommendationLines || "(keine Empfehlungen)"}`,
      })
      .catch((err) => console.error("Interne IT-Check-Lead-Benachrichtigung fehlgeschlagen:", err));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("IT-Check-Ergebnis-Versand fehlgeschlagen:", err);
    return NextResponse.json({ error: "Senden fehlgeschlagen. Bitte versuchen Sie es erneut." }, { status: 500 });
  }
}
