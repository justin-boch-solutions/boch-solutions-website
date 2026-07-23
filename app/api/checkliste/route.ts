import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { company } from "@/lib/constants";

const PDF_PATH = path.join(process.cwd(), "public", "downloads", "it-sicherheits-checkliste.pdf");
const DOWNLOAD_URL = "/downloads/it-sicherheits-checkliste.pdf";

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
    return NextResponse.json({ ok: true, downloadUrl: DOWNLOAD_URL });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !email || !emailPattern.test(email)) {
    return NextResponse.json({ error: "Bitte füllen Sie alle Pflichtfelder aus." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY ist nicht gesetzt.");
    return NextResponse.json(
      { error: "Der Versand ist derzeit nicht verfügbar. Sie können die Checkliste trotzdem direkt herunterladen." },
      { status: 500 },
    );
  }

  try {
    const pdfBuffer = await readFile(PDF_PATH);
    const resend = new Resend(apiKey);

    // Resend requires the sending domain to be verified; only the
    // "send." subdomain is verified in Resend, not the bare root domain.
    const fromAddress = `JB Solutions <checkliste@send.${company.domain}>`;

    const { error } = await resend.emails.send({
      from: fromAddress,
      to: email,
      replyTo: company.email,
      subject: "Ihre IT-Sicherheits-Checkliste für Handwerksbetriebe",
      text: `Hallo ${name},\n\nvielen Dank für Ihr Interesse! Im Anhang finden Sie die IT-Sicherheits-Checkliste für Handwerksbetriebe als PDF.\n\nFragen dazu? Einfach antworten oder unter ${company.phone} anrufen.\n\nViele Grüße\n${company.owner}, ${company.name}`,
      attachments: [
        {
          filename: "it-sicherheits-checkliste.pdf",
          content: pdfBuffer.toString("base64"),
        },
      ],
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { ok: true, downloadUrl: DOWNLOAD_URL, warning: "E-Mail-Versand fehlgeschlagen, Download funktioniert trotzdem." },
      );
    }

    return NextResponse.json({ ok: true, downloadUrl: DOWNLOAD_URL });
  } catch (err) {
    console.error("Checkliste-Versand fehlgeschlagen:", err);
    return NextResponse.json({ ok: true, downloadUrl: DOWNLOAD_URL });
  }
}
