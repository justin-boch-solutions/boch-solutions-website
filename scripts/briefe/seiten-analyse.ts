/**
 * Inhaltliche Prüfung einer Webseite – das, was Googles Messung NICHT sieht.
 *
 * Der Zweck: Die Briefe sollen sich unterscheiden. Vier Zahlen aus PageSpeed
 * sehen bei jedem Betrieb ähnlich aus und greifen bei guten Seiten gar nicht.
 * Diese Prüfungen liefern dagegen Befunde, die wirklich vom einzelnen Betrieb
 * abhängen – und sie funktionieren auch dort, wo die Technik in Ordnung ist.
 */

export interface SeitenBefund {
  domain: string;
  erreichbar: boolean;
  /** Befunde in der Reihenfolge ihrer Verkaufsrelevanz. */
  punkte: { titel: string; text: string }[];
  /** Gefundene Unterseiten – Grundlage für die Sichtbarkeitsaussage. */
  seitenAnzahl: number | null;
}

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/130.0 Safari/537.36";

async function hole(url: string, ms = 15000): Promise<string | null> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    const r = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow", signal: ctrl.signal });
    return r.ok ? await r.text() : null;
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

async function sitemapSeiten(basis: string): Promise<number | null> {
  for (const pfad of ["/sitemap.xml", "/sitemap_index.xml", "/wp-sitemap.xml"]) {
    const x = await hole(basis + pfad, 12000);
    if (!x) continue;
    const locs = x.match(/<loc>/g);
    if (locs) return locs.length;
  }
  return null;
}

export async function analysiereSeite(domain: string): Promise<SeitenBefund> {
  const basis = `https://${domain}`;
  const html =
    (await hole(basis)) ??
    (await hole(`https://www.${domain}`)) ??
    (await hole(`http://www.${domain}`));
  if (!html) return { domain, erreichbar: false, punkte: [], seitenAnzahl: null };

  const h = html.toLowerCase();
  const punkte: SeitenBefund["punkte"] = [];

  // 1. Stellenangebote – im Handwerk der wundeste Punkt überhaupt.
  const karriere = /karriere|stellenangebot|stellenanzeige|jobs|wir stellen ein|ausbildung|azubi|mitarbeiter gesucht|bewerb/.test(h);
  if (!karriere) {
    punkte.push({
      titel: "Keine Seite für Bewerber",
      text: "Auf Ihrer Webseite finde ich nichts zu offenen Stellen oder Ausbildung. Wer heute Gesellen oder Azubis sucht, wird zuerst im Netz gesucht – und viele Betriebe stecken fünfstellige Beträge in Personalsuche, während die eigene Seite dazu schweigt.",
    });
  }

  // 2. Telefonnummer als anklickbarer Link – entscheidend auf dem Handy.
  if (!/href=["']tel:/i.test(html)) {
    punkte.push({
      titel: "Die Telefonnummer ist auf dem Handy nicht antippbar",
      text: "Ihre Rufnummer steht zwar auf der Seite, ist aber nicht als Anruf-Link hinterlegt. Wer Sie vom Handy aus erreichen will, muss sie abtippen. Das ist der häufigste Grund für verlorene Anfragen, und es ist in Minuten behoben.",
    });
  }

  // 3. Pflichtangaben – fehlen sie, ist das abmahnfähig.
  const impressum = /impressum|imprint/.test(h);
  const datenschutz = /datenschutz|privacy/.test(h);
  if (!impressum || !datenschutz) {
    const fehlt = [!impressum ? "ein Impressum" : null, !datenschutz ? "eine Datenschutzerklärung" : null].filter(Boolean).join(" und ");
    punkte.push({
      titel: "Pflichtangaben fehlen",
      text: `Ich finde auf Ihrer Startseite keinen Verweis auf ${fehlt}. Beides ist für gewerbliche Seiten vorgeschrieben, und das Fehlen ist ein klassischer Abmahngrund.`,
    });
  }

  // 4. Veraltetes Jahr in der Fußzeile – wirkt wie ein verlassener Betrieb.
  const jahre = [...html.matchAll(/(?:©|&copy;|copyright)[^0-9]{0,12}(20\d{2})/gi)].map((m) => Number(m[1]));
  const jahr = jahre.length ? Math.max(...jahre) : null;
  const heuer = new Date().getFullYear();
  if (jahr && heuer - jahr >= 3) {
    punkte.push({
      titel: `In der Fußzeile steht noch ${jahr}`,
      text: `Besucher lesen daraus, dass sich seit Jahren niemand um die Seite gekümmert hat – und schließen daraus gern auf den Betrieb. Ein Detail, aber eines, das jeder sieht.`,
    });
  }

  // 5. Bilder ohne Alternativtext – Barrierefreiheit und Bildersuche.
  const bilder = (html.match(/<img\b/gi) ?? []).length;
  const ohneAlt = (html.match(/<img(?![^>]*\balt=)[^>]*>/gi) ?? []).length;
  if (bilder >= 4 && ohneAlt / bilder > 0.4) {
    punkte.push({
      titel: `${ohneAlt} von ${bilder} Bildern ohne Beschreibung`,
      text: "Ohne Alternativtext kann Google nicht erkennen, was auf Ihren Bildern zu sehen ist – Ihre Referenzfotos tauchen dadurch in der Bildersuche nicht auf. Für Screenreader sind sie ebenfalls unsichtbar.",
    });
  }

  // 6. Zu wenige Unterseiten – ohne eigene Seiten je Leistung und Ort keine Sichtbarkeit.
  // Zwei unabhängige Signale, damit die Aussage stimmt: Eine Sitemap mit einem
  // einzigen Eintrag kann ein Index sein, und eine fehlende Sitemap heißt nicht,
  // dass es keine Unterseiten gibt. Behauptet wird nur, was beide Quellen stützen.
  const seitenAnzahl = await sitemapSeiten(basis);
  const interneLinks = new Set(
    [...html.matchAll(/href=["']([^"'#?]+)["']/gi)]
      .map((m) => m[1])
      .filter((u) => (u.startsWith("/") || u.includes(domain)) && !/\.(jpg|jpeg|png|svg|webp|pdf|css|js|ico|gif)$/i.test(u))
      .map((u) => u.replace(/^https?:\/\/[^/]+/, "").replace(/\/$/, ""))
      .filter((u) => u.length > 1),
  ).size;

  const wenigSeiten = Math.max(seitenAnzahl ?? 0, interneLinks);
  if (wenigSeiten > 0 && wenigSeiten <= 6 && (seitenAnzahl === null || seitenAnzahl <= 6)) {
    punkte.push({
      titel: wenigSeiten === 1 ? "Ihre Webseite besteht aus einer einzigen Seite" : `Ihre Webseite hat nur ${wenigSeiten} Unterseiten`,
      text: "Wer bei Google für eine bestimmte Leistung in einem bestimmten Ort gefunden werden will, braucht dafür jeweils eine eigene Seite mit eigenem Titel. Mit so wenigen Seiten treten Sie bei jeder Suchanfrage mit derselben einen an.",
    });
  }

  return { domain, erreichbar: true, punkte, seitenAnzahl };
}
