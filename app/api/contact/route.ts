import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Wir nutzen nur noch den sicheren API-Key aus den Umgebungsvariablen
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Daten aus der Anfrage extrahieren
    const { name, email, message, requestType, projectType, projectGoal, timeline, budget } = body;

    let emailSubject = '';
    let emailHtml = '';

    // Aufbau der E-Mail-Inhalte
    if (requestType === 'project') {
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

    // --- DER ECHTE VERSAND ---
    await resend.emails.send({
      from: 'Boch Solutions <kontakt@send.boch-solutions.de>', // Dein technischer Absender
      to: 'kontakt@boch-solutions.de',                       // Deine Ziel-Adresse
      replyTo: email,                                        // Damit du direkt dem Kunden antworten kannst
      subject: emailSubject,
      html: emailHtml
    });

    // Logging für Vercel (optional, hilft beim Debuggen)
    console.log(`E-Mail erfolgreich an kontakt@boch-solutions.de gesendet.`);

    return NextResponse.json({ message: 'Anfrage erfolgreich gesendet' }, { status: 200 });
  } catch (error) {
    console.error('Fehler beim Senden:', error);
    return NextResponse.json({ error: 'Fehler beim E-Mail-Versand' }, { status: 500 });
  }
}