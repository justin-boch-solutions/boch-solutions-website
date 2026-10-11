import { formatEuro, pricing } from "@/lib/constants";

/**
 * Der vollständige Leistungskatalog – eine einzige Quelle für Website, Angebote
 * und die lesbare Übersicht (LEISTUNGSKATALOG.md, erzeugt mit `npm run katalog`).
 *
 * Die Zahlen stehen ausschließlich in `pricing` (lib/constants.ts). Hier wird nur
 * beschrieben, was zu einem Preis gehört – damit Preisangaben nie auseinanderlaufen.
 */

export type Abrechnung = "einmalig" | "monatlich" | "proNutzerMonat" | "proGeraet" | "proStunde";

export type Gruppe =
  | "einstieg"
  | "it-pakete"
  | "it-betreuung"
  | "website-pakete"
  | "website-laufend"
  | "zusatz"
  | "support";

export interface KatalogPreis {
  art: Abrechnung;
  von: number;
  /** Gesetzt bei Preisspannen (z. B. 79–149 €). */
  bis?: number;
  /** true = "ab"-Preis, der Umfang bestimmt den Endpreis. */
  ab?: boolean;
}

export interface Leistung {
  id: string;
  name: string;
  gruppe: Gruppe;
  kurz: string;
  enthalten: string[];
  nichtEnthalten: string[];
  preis: KatalogPreis;
  /** Interne Notiz für die Angebotskalkulation – nicht für Kundenaugen. */
  hinweis?: string;
}

export const gruppenMeta: Record<Gruppe, { label: string; beschreibung: string }> = {
  einstieg: {
    label: "Einstieg",
    beschreibung: "Das kleine bezahlte Erstprodukt – schafft Zugang zum Microsoft-Konto des Betriebs.",
  },
  "it-pakete": {
    label: "IT-Pakete (einmalig)",
    beschreibung: "Projektpreise für Einrichtung und Modernisierung. Startpreise, nach Umfang kalkuliert.",
  },
  "it-betreuung": {
    label: "IT-Betreuung (laufend)",
    beschreibung: "Pro Nutzer und Monat. Das wiederkehrende Geschäft nach der Einrichtung.",
  },
  "website-pakete": {
    label: "Website-Pakete (einmalig)",
    beschreibung: "Eigenständige Website-Projekte. In „Wachstum“ und „Rundum-sorglos“ bereits enthalten.",
  },
  "website-laufend": {
    label: "Website laufend",
    beschreibung: "Hosting und Wartung pro Website und Monat, mit klaren Zeitgrenzen.",
  },
  zusatz: {
    label: "Zusatzleistungen",
    beschreibung: "Alles, was nicht ausdrücklich im Paket steht. Immer gesondert anbieten.",
  },
  support: {
    label: "Support & Aufwand",
    beschreibung: "Die Absicherung gegen stillschweigende Mehrarbeit.",
  },
};

export const leistungen: Leistung[] = [
  {
    id: "email-schutz",
    name: "E-Mail-Schutz",
    gruppe: "einstieg",
    kurz: "Niemand kann mehr unbemerkt E-Mails im Namen des Betriebs verschicken.",
    enthalten: [
      "Prüfung von SPF, DKIM und DMARC der Domain",
      "Korrekte Einrichtung aller drei Einträge",
      "Vier Wochen Auswertung der DMARC-Berichte",
      "Anhebung auf die strenge Schutzstufe (p=reject)",
      "Nachweis-Bericht vorher und nachher",
      "Schriftlicher Kurzbefund des Microsoft-365-Kontos",
    ],
    nichtEnthalten: [
      "Umzug bestehender Postfächer",
      "Einrichtung auf Endgeräten",
      "Umsetzung der Punkte aus dem Kurzbefund",
    ],
    preis: { art: "einmalig", von: pricing.emailProtection },
    hinweis:
      "Nicht verwechseln mit „E-Mail-Domain-Einrichtung“ (Zusatzleistung). Dort nur Basis-Einträge beim Neuaufsetzen, hier Diagnose plus vierwöchiger DMARC-Prozess. Der Kurzbefund ist das Werkzeug für den Folgeauftrag.",
  },

  {
    id: "starter",
    name: "Starter",
    gruppe: "it-pakete",
    kurz: "Erstmals eine professionelle, sichere IT-Basis auf Microsoft 365.",
    enthalten: [
      "Einrichtung Microsoft 365 (E-Mail, OneDrive, Teams)",
      "Domain-Einrichtung oder -Umzug",
      "Professionelle E-Mail-Adressen inkl. Zustellsicherheit",
      "Beratung zur passenden Microsoft-Lizenzierung",
      "Basis-Backup-Konzept",
      `Bis zu ${pricing.starterSeats} Arbeitsplätze`,
    ],
    nichtEnthalten: [
      `Weitere Arbeitsplätze (je ${formatEuro(pricing.starterAdditionalSeat)})`,
      "Laufende Betreuung",
      "Website, SEO und Sichtbarkeit",
    ],
    preis: { art: "einmalig", von: pricing.starter, ab: true },
    hinweis:
      "Die Grenze von Arbeitsplätzen ist die wichtigste Absicherung: Postfach-Migration bei 25 Leuten ist ein Vielfaches des Aufwands bei 5.",
  },
  {
    id: "wachstum",
    name: "Wachstum",
    gruppe: "it-pakete",
    kurz: "IT-Grundlage plus Website und lokale Sichtbarkeit.",
    enthalten: [
      "Alles aus Starter",
      "Moderne Firmenwebsite mit SEO-Grundlagen",
      "Google-Unternehmensprofil-Optimierung",
      "SEO- und GEO-Optimierung für lokale Sichtbarkeit",
      "Einrichtung der laufenden IT-Betreuung",
    ],
    nichtEnthalten: ["Laufende Betreuung (monatlich)", "Hosting", "Individuelle Software"],
    preis: { art: "einmalig", von: pricing.growth, ab: true },
    hinweis: "Meistgewähltes Paket. Laufende Betreuung immer separat ausweisen, nie im Einmalpreis verstecken.",
  },
  {
    id: "rundum-sorglos",
    name: "Rundum-sorglos",
    gruppe: "it-pakete",
    kurz: "IT, Sichtbarkeit und individuelle Prozesse aus einer Hand.",
    enthalten: [
      "Alles aus Wachstum",
      "Individuelle Software und Kundenportale",
      "Prozessautomatisierung mit Power Automate",
      "Cloud-Sicherheit, Backup und DSGVO-Dokumentation",
      "Priorisierte Bearbeitung in der IT-Betreuung",
    ],
    nichtEnthalten: ["Laufende Betreuung (monatlich)", "Erweiterungen ohne neues Angebot"],
    preis: { art: "einmalig", von: pricing.fullService, ab: true },
  },

  {
    id: "it-betreuung-basis",
    name: "IT-Betreuung Basis",
    gruppe: "it-betreuung",
    kurz: "Das Nötige, damit die eingerichtete IT in Ordnung bleibt.",
    enthalten: [
      "Verwaltung der Postfächer und Benutzer",
      "Lizenzverwaltung und -anpassung",
      "Updates und Sicherheits-Grundpflege",
      "Fester Ansprechpartner statt Hotline",
    ],
    nichtEnthalten: ["Backup", "Geräteverwaltung", "Projektarbeit und größere Änderungen"],
    preis: { art: "proNutzerMonat", von: pricing.itCareBasic },
    hinweis: "Mindestlaufzeit und Kündigungsfrist gehören ins Angebot, sonst ist die Planbarkeit weg.",
  },
  {
    id: "it-betreuung-plus",
    name: "IT-Betreuung Plus",
    gruppe: "it-betreuung",
    kurz: "Betreuung inklusive Datensicherung und Geräten.",
    enthalten: [
      "Alles aus Basis",
      "Backup der Postfächer und Dateien",
      "Geräteverwaltung",
      "Pflege der Zwei-Faktor-Anmeldung",
      "Priorisierte Bearbeitung",
    ],
    nichtEnthalten: ["Projektarbeit", "Hardware-Beschaffung", "Vor-Ort-Einsätze außerhalb Münster"],
    preis: { art: "proNutzerMonat", von: pricing.itCarePlus },
  },

  {
    id: "onepager",
    name: "Startklar Onepager",
    gruppe: "website-pakete",
    kurz: "Kompakter, moderner Auftritt auf einer Seite.",
    enthalten: [
      "Individuelles Design im vereinbarten Rahmen",
      "Responsive Umsetzung für Mobil und Desktop",
      "Einbindung der bereitgestellten Inhalte",
      "Kontaktformular",
      "Impressum und Datenschutz technisch eingebunden",
      "Bis zu 2 gebündelte Korrekturschleifen",
    ],
    nichtEnthalten: [
      "Texterstellung",
      "Rechtliche Prüfung der Rechtstexte",
      "Hosting und Domain",
      "Laufende Wartung",
    ],
    preis: { art: "einmalig", von: pricing.onepager, ab: true },
  },
  {
    id: "firmenauftritt",
    name: "Firmenauftritt Website",
    gruppe: "website-pakete",
    kurz: "Vollständiger Auftritt mit mehreren Unterseiten.",
    enthalten: [
      "Individuelles Design im vereinbarten Rahmen",
      "Bis zu 5 Unterseiten",
      "Responsive Darstellung",
      "Standardfunktionen wie Kontaktformular, Galerie, Leistungsbereiche",
      "Bis zu 2 gebündelte Korrekturschleifen",
    ],
    nichtEnthalten: ["Hosting und Domain", "Laufende Wartung", "SEO-Erfolgsgarantien", "Unbegrenzte Änderungen"],
    preis: { art: "einmalig", von: pricing.firmenauftritt, ab: true },
    hinweis: "In „Wachstum“ bereits enthalten – nicht doppelt berechnen.",
  },
  {
    id: "individuelle-webloesung",
    name: "Individuelle Weblösung",
    gruppe: "website-pakete",
    kurz: "Sonderwünsche, interne Werkzeuge, eigene digitale Abläufe.",
    enthalten: [
      "Individuelle Projektanalyse",
      "Abgestimmter Leistungsumfang",
      "Technische Sonderfunktionen im vereinbarten Rahmen",
      "Definierte Feedback- und Freigabephasen",
    ],
    nichtEnthalten: [
      "Alles, was nicht ausdrücklich im Angebot beschrieben ist",
      "Laufende Betreuung ohne Zusatzvereinbarung",
      "Spätere Erweiterungen ohne neues Angebot",
    ],
    preis: { art: "einmalig", von: pricing.individuell, ab: true },
  },

  {
    id: "hosting",
    name: "Hosting",
    gruppe: "website-laufend",
    kurz: "Technische Bereitstellung einer Website.",
    enthalten: ["1 Website", "SSL-Zertifikat", "Backups im vereinbarten Umfang"],
    nichtEnthalten: ["Inhaltsänderungen", "Support", "Design- und Sonderwünsche"],
    preis: { art: "monatlich", von: pricing.hosting },
  },
  {
    id: "wartung-basic",
    name: "Wartung Basic",
    gruppe: "website-laufend",
    kurz: "Technische Basispflege für kleine Websites.",
    enthalten: ["SSL- und Backup-Kontrolle", "Technische Updates", "Kleine Anpassungen bis 15 Minuten im Monat"],
    nichtEnthalten: ["Inhaltspflege", "Neue Unterseiten", "Alles über 15 Minuten"],
    preis: { art: "monatlich", von: pricing.maintenanceBasic },
  },
  {
    id: "wartung-standard",
    name: "Wartung Standard",
    gruppe: "website-laufend",
    kurz: "Erweiterte Routinepflege – das übliche Paket.",
    enthalten: ["Alles aus Basic", "Erweiterte Routinepflege", "Kleine Anpassungen bis 30 Minuten im Monat"],
    nichtEnthalten: ["Neue Unterseiten", "Alles über 30 Minuten"],
    preis: { art: "monatlich", von: pricing.maintenanceStandard },
  },
  {
    id: "wartung-business",
    name: "Wartung Business",
    gruppe: "website-laufend",
    kurz: "Engere technische Begleitung aktiv gepflegter Projekte.",
    enthalten: ["Alles aus Standard", "Kleine Anpassungen bis 60 Minuten im Monat"],
    nichtEnthalten: ["Projektarbeit", "Alles über 60 Minuten"],
    preis: { art: "monatlich", von: pricing.maintenanceBusiness },
    hinweis: "Nur anbieten, wenn die Zeit auch wirklich eingeplant ist.",
  },

  {
    id: "domain-einrichtung",
    name: "Domain-Einrichtung",
    gruppe: "zusatz",
    kurz: "Anbindung oder Grundeinrichtung einer Domain.",
    enthalten: ["Registrierung oder Umzug", "Einfache DNS-Basisarbeiten"],
    nichtEnthalten: ["Dauerhafte Provider-Kommunikation", "Domaingebühren selbst"],
    preis: { art: "einmalig", von: pricing.domainSetup[0], bis: pricing.domainSetup[1], ab: true },
  },
  {
    id: "email-domain-einrichtung",
    name: "E-Mail-Domain-Einrichtung",
    gruppe: "zusatz",
    kurz: "Geschäftliche E-Mail-Adressen beim Neuaufsetzen einer Domain.",
    enthalten: ["Anlage geschäftlicher Adressen", "MX-, SPF- und DKIM-Basis-Einrichtung"],
    nichtEnthalten: ["DMARC-Prozess über vier Wochen", "Kompletter IT-Support", "Migrationsprojekte"],
    preis: { art: "einmalig", von: pricing.emailDomainSetup[0], bis: pricing.emailDomainSetup[1], ab: true },
    hinweis: `Nur als Zusatz innerhalb eines Projekts. Eigenständig verkauft wird "E-Mail-Schutz" für ${formatEuro(pricing.emailProtection)} – dort steckt die Diagnose und die Härtung auf p=reject drin.`,
  },
  {
    id: "zusaetzliche-unterseite",
    name: "Zusätzliche Unterseite",
    gruppe: "zusatz",
    kurz: "Eine weitere Standard-Unterseite im laufenden oder bestehenden Projekt.",
    enthalten: ["Erstellung", "Einbindung im bestehenden Design"],
    nichtEnthalten: ["Texterstellung", "Sonderfunktionen"],
    preis: { art: "einmalig", von: pricing.extraSubpage[0], bis: pricing.extraSubpage[1], ab: true },
  },
  {
    id: "formular-erweiterung",
    name: "Formular-Erweiterung",
    gruppe: "zusatz",
    kurz: "Anfrage-, Termin- oder Rückrufformular einbauen oder erweitern.",
    enthalten: ["Einbau oder Erweiterung", "Versand an die gewünschte Adresse"],
    nichtEnthalten: ["Komplexe Logik ohne Zusatzangebot", "Anbindung an Fremdsysteme"],
    preis: { art: "einmalig", von: pricing.formExtension[0], bis: pricing.formExtension[1], ab: true },
  },
  {
    id: "bildpflege",
    name: "Bildpflege und -optimierung",
    gruppe: "zusatz",
    kurz: "Zuschnitt, Komprimierung und saubere Einbindung von Bildern.",
    enthalten: ["Zuschnitt", "Komprimierung", "Einbindung"],
    nichtEnthalten: ["Fotografie", "Bildbearbeitung über Zuschnitt hinaus"],
    preis: { art: "einmalig", von: pricing.imageCare[0], bis: pricing.imageCare[1], ab: true },
    hinweis: "Nicht kostenlos nebenbei machen.",
  },
  {
    id: "basis-seo",
    name: "Basis-SEO / Local SEO",
    gruppe: "zusatz",
    kurz: "Seitentitel, Grundstruktur und lokale Grundlagen.",
    enthalten: ["Seitentitel und Meta-Basis", "Grundstruktur", "Lokale Grundlagen im vereinbarten Umfang"],
    nichtEnthalten: ["Ranking-Garantien", "Laufende SEO-Betreuung", "Linkaufbau"],
    preis: { art: "einmalig", von: pricing.basicSeo[0], bis: pricing.basicSeo[1], ab: true },
    hinweis: "Nur als Basisleistung anbieten, nie als Erfolgsversprechen.",
  },
  {
    id: "google-unternehmensprofil",
    name: "Google-Unternehmensprofil",
    gruppe: "zusatz",
    kurz: "Technische Einbindung und lokale Grundeinstellungen.",
    enthalten: ["Einrichtung oder Übernahme", "Grundeinstellungen", "Einbindung auf der Website"],
    nichtEnthalten: ["Laufende Pflege ohne Vereinbarung", "Bewertungsmanagement"],
    preis: { art: "einmalig", von: pricing.googleProfile[0], bis: pricing.googleProfile[1], ab: true },
  },
  {
    id: "cookie-banner",
    name: "Cookie-Banner / Tracking",
    gruppe: "zusatz",
    kurz: "Technische Einbindung vorhandener Werkzeuge.",
    enthalten: ["Technische Einbindung im vereinbarten Umfang"],
    nichtEnthalten: ["Rechtsberatung", "Erstellung von Rechtstexten"],
    preis: { art: "einmalig", von: pricing.cookieBanner[0], bis: pricing.cookieBanner[1], ab: true },
  },
  {
    id: "email-client",
    name: "E-Mail-Einrichtung am Endgerät",
    gruppe: "zusatz",
    kurz: "Mailkonto auf PC, Mac, iPhone oder Android einrichten.",
    enthalten: ["Einrichtung des Kontos auf einem Gerät", "Kurze Funktionsprüfung"],
    nichtEnthalten: ["Allgemeiner Gerätesupport", "Datenübernahme aus Altsystemen"],
    preis: { art: "proGeraet", von: pricing.emailClientPerDevice[0], bis: pricing.emailClientPerDevice[1] },
    hinweis: "Immer pro Gerät abrechnen, nicht pro Mitarbeiter.",
  },

  {
    id: "aufwand",
    name: "Änderungen nach Aufwand",
    gruppe: "support",
    kurz: "Alles außerhalb von Paket, Wartung und Betreuung.",
    enthalten: ["Inhaltsänderungen", "Technischer Support", "Kleinere Erweiterungen"],
    nichtEnthalten: ["Leistungen, die im Paket stehen"],
    preis: { art: "proStunde", von: pricing.hourly },
    hinweis: "Die wichtigste Absicherung. Bei größeren Extras lieber ein kurzes Zusatzangebot schreiben.",
  },
  {
    id: "express",
    name: "Express-Zuschlag",
    gruppe: "support",
    kurz: "Beschleunigte Bearbeitung außerhalb der normalen Planung.",
    enthalten: ["Vorziehen vor laufende Projekte"],
    nichtEnthalten: ["Zusagen zu festen Uhrzeiten ohne schriftliche Vereinbarung"],
    preis: { art: "einmalig", von: pricing.expressFlat[0], bis: pricing.expressFlat[1] },
    hinweis: "Alternativ 15–30 % Zuschlag auf den Projektpreis. Nur bei echten Eilfällen, und früh ansprechen.",
  },
];

/** Monatspreis, sofern die Leistung überhaupt monatlich abgerechnet wird. */
export function monatspreis(leistung: Leistung): number | null {
  const { art, von } = leistung.preis;
  return art === "monatlich" || art === "proNutzerMonat" ? von : null;
}

/** Jahrespreis nach `pricing.yearlyFactor` (10 = zwei Monate geschenkt). */
export function jahrespreis(leistung: Leistung): number | null {
  const monat = monatspreis(leistung);
  return monat === null ? null : Math.round(monat * pricing.yearlyFactor * 100) / 100;
}

function formatZahl(value: number): string {
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/** Preis als lesbarer Text, inklusive Spanne, "ab" und Abrechnungseinheit. */
export function preisText(leistung: Leistung): string {
  const { art, von, bis, ab } = leistung.preis;
  // Bei Spannen steht das Währungszeichen nur einmal am Ende: "49–89 €".
  const betrag = bis ? `${formatZahl(von)}–${formatEuro(bis)}` : formatEuro(von);
  const prefix = ab ? "ab " : "";
  const einheit: Record<Abrechnung, string> = {
    einmalig: " einmalig",
    monatlich: " / Monat",
    proNutzerMonat: " / Nutzer / Monat",
    proGeraet: " / Gerät",
    proStunde: " / Stunde",
  };
  return `${prefix}${betrag}${einheit[art]}`;
}

export function leistungenNachGruppe(gruppe: Gruppe): Leistung[] {
  return leistungen.filter((leistung) => leistung.gruppe === gruppe);
}
