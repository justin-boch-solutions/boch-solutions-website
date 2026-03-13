import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Später packen wir deinen echten API-Key sicher in eine .env Datei
const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Wir ziehen uns alle möglichen Daten aus der Anfrage
    const { name, email, message, requestType, projectType, projectGoal, timeline, budget } = body;

    let emailSubject = '';
    let emailHtml = '';

    // WIR BAUEN DIE E-MAIL JE NACH MODUS AUF
    if (requestType === 'project') {
      // Modus 1: Der Projekt-Funnel
      emailSubject = `🔥 Neue PROJEKT-Anfrage: ${projectType} von ${name}`;
      emailHtml = `
        <div style="font-family: sans-serif; color: #0f172a; max-width: 600px;">
          <h2 style="color: #0ea5e9;">Neue Projekt-Anfrage (Website)</h2>
          <p><strong>Name / Firma:</strong> ${name}</p>
          <p><strong>E-Mail:</strong> ${email}</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <h3 style="color: #334155;">Auswertung des Funnels:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><strong>Was:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${projectType}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><strong>Ziel:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${projectGoal}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><strong>Zeitplan:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${timeline}</td></tr>
            <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><strong>Budget:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${budget}</td></tr>
          </table>
          <br/>
          ${message ? `<h3 style="color: #334155;">Zusätzliche Infos:</h3><p style="background: #f8fafc; padding: 15px; border-radius: 8px;">${message}</p>` : ''}
        </div>
      `;
    } else {
      // Modus 2: Allgemeine Frage
      emailSubject = `✉️ Neue ALLGEMEINE Anfrage von ${name}`;
      emailHtml = `
        <div style="font-family: sans-serif; color: #0f172a; max-width: 600px;">
          <h2 style="color: #0ea5e9;">Neue allgemeine Nachricht (Website)</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>E-Mail:</strong> ${email}</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <h3 style="color: #334155;">Nachricht:</h3>
          <p style="background: #f8fafc; padding: 15px; border-radius: 8px; white-space: pre-wrap;">${message}</p>
        </div>
      `;
    }

    // --- HIER WIRD SPÄTER DIE ECHTE E-MAIL GESENDET ---
    /*
    await resend.emails.send({
      from: 'onboarding@resend.dev', // Später deine verifizierte Domain
      to: 'Kontakt@boch-solutions.de', 
      subject: emailSubject,
      html: emailHtml
    });
    */

    // Wir simulieren das Ankommen in deinem VS Code Terminal
    console.log(`\n=== NEUER LEAD EMPFANGEN (${requestType.toUpperCase()}) ===`);
    console.log(`Name: ${name}`);
    console.log(`E-Mail: ${email}`);
    if (requestType === 'project') {
      console.log(`Typ: ${projectType} | Ziel: ${projectGoal} | Zeit: ${timeline} | Budget: ${budget}`);
    }
    console.log("=========================================\n");

    return NextResponse.json({ message: 'E-Mail erfolgreich verarbeitet' }, { status: 200 });
  } catch (error) {
    console.error('Fehler beim Senden:', error);
    return NextResponse.json({ error: 'Fehler im System' }, { status: 500 });
  }
}