import type { Resend } from "resend";

/**
 * Resend-Segment "Website-Leads (Checks)". Vorher landete jeder Lead nur
 * als einzelne Benachrichtigungs-Mail im Postfach – keine Liste, keine
 * Möglichkeit nachzuvollziehen, wie viele Leads über welchen Check kommen.
 * Bewusst keine neue Infrastruktur (Datenbank, Vercel KV): Resend wird für
 * den E-Mail-Versand schon genutzt, Contacts/Segmente sind im selben
 * Konto enthalten.
 */
const LEADS_SEGMENT_ID = "628e3739-83f6-45eb-9680-fa9542a355e6";

/**
 * Speichert einen Lead als Resend-Kontakt. Best-effort: Ein Fehler hier
 * (z. B. Kontakt existiert schon) darf niemals den eigentlichen
 * E-Mail-Versand an den Kunden blockieren oder fehlschlagen lassen.
 */
export async function saveLeadContact(
  resend: Resend,
  { email, name, source }: { email: string; name?: string; source: string },
): Promise<void> {
  try {
    const [firstName, ...rest] = (name ?? "").trim().split(/\s+/).filter(Boolean);
    await resend.contacts.create({
      email,
      firstName: firstName || undefined,
      lastName: rest.join(" ") || undefined,
      unsubscribed: false,
      segments: [{ id: LEADS_SEGMENT_ID }],
    });
  } catch (err) {
    console.error(`Lead-Kontakt (${source}) konnte nicht in Resend gespeichert werden:`, err);
  }
}
