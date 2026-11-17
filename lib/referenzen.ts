/**
 * Echte Kundenprojekte. Jede Angabe muss am Projekt selbst nachprüfbar sein
 * (Website, Impressum, Quellcode) – keine geschönten Zahlen, keine erfundenen
 * Zitate. Kommt eine Kundenstimme oder ein Ergebnis dazu, nur mit Freigabe.
 */
export interface Referenz {
  slug: string;
  kunde: string;
  branche: string;
  ort: string;
  url: string;
  /** Anzeigeform der Adresse, ohne https:// */
  domain: string;
  kurz: string;
  ausgangslage: string;
  umsetzung: string[];
  /** Kurze, prüfbare Eckdaten für die Kennzahlen-Leiste. */
  eckdaten: { wert: string; label: string }[];
  leistungen: { label: string; href: string }[];
  bilder: { desktop: string; mobile: string };
  /** Ganze Startseite am Handy, alt und neu – zum Durchscrollen nebeneinander. */
  vergleich?: {
    vorher: { src: string; width: number; height: number };
    nachher: { src: string; width: number; height: number };
  };
}

export const referenzen: Referenz[] = [
  {
    slug: "huesmann",
    kunde: "Huesmann Heizung - Sanitär GmbH",
    branche: "SHK-Fachbetrieb",
    ort: "Altenberge bei Münster",
    url: "https://huesmann-heizung-sanitaer.de",
    domain: "huesmann-heizung-sanitaer.de",
    kurz:
      "Komplette Firmenwebsite für einen SHK-Fachbetrieb: Heizung, Sanitär, Wärmepumpen und Klimaanlagen – gebaut, um im Münsterland gefunden zu werden und Fachkräfte zu gewinnen.",
    ausgangslage:
      "Ein Heizungs- und Sanitärbetrieb mit Kunden in Altenberge, Münster und den umliegenden Orten. Ziel der Website: bei genau den Suchen auftauchen, mit denen Kunden einen SHK-Betrieb in der Region suchen – etwa „Wärmepumpe Greven“, „Heizung Notdienst Münster“ oder „Badsanierung Emsdetten“.",
    umsetzung: [
      "Eigene Seiten für alle sechs Leistungsbereiche – Heizung, Sanitär, Wärmepumpen, Kundendienst, Solar und Klimaanlagen.",
      "Regionale Seiten für elf Orte im Einzugsgebiet, jeweils kombiniert mit den passenden Leistungen – so wird der Betrieb dort gefunden, wo er wirklich arbeitet.",
      "Ratgeber-Bereich mit Antworten auf typische Kundenfragen, etwa zur Wärmepumpe im Altbau oder zur jährlichen Heizungswartung.",
      "Karriere-Seite mit Bewerbungsformular, dazu Kontaktformular, Notdienst-Hinweis, Öffnungszeiten, Anfahrt und FAQ.",
    ],
    eckdaten: [
      { wert: "99", label: "Seiten in der Sitemap" },
      { wert: "11", label: "Orte mit eigener Seite" },
      { wert: "6", label: "Leistungsbereiche" },
    ],
    leistungen: [
      { label: "Webdesign", href: "/leistungen/webdesign" },
      { label: "SEO & GEO", href: "/leistungen/seo-geo-optimierung" },
    ],
    bilder: {
      desktop: "/images/referenzen/huesmann-desktop.jpg",
      mobile: "/images/referenzen/huesmann-mobile.jpg",
    },
    vergleich: {
      vorher: { src: "/images/referenzen/huesmann-vorher-mobil.jpg", width: 291, height: 2000 },
      nachher: { src: "/images/referenzen/huesmann-nachher-mobil.jpg", width: 390, height: 14907 },
    },
  },
  {
    slug: "dzirksts-studio",
    kunde: "Dzirksts Studio",
    branche: "Fotografie, Social Media & Elektrotechnik",
    ort: "Riga, Lettland",
    url: "https://www.dzirkstsstudio.com",
    domain: "dzirkstsstudio.com",
    kurz:
      "Eine Plattform für zwei Geschäftsfelder: Fotografie und Social Media auf der einen, Elektrotechnik auf der anderen Seite – mehrsprachig, mit klarer Trennung und einem gemeinsamen Auftritt.",
    ausgangslage:
      "Ein in Deutschland ausgebildeter Elektriker, der heute in Lettland Fotografie, Social-Media-Betreuung und Elektroarbeiten anbietet. Statt zwei getrennter Websites sollte ein Auftritt beide Welten zeigen, ohne dass Kunden der einen Sparte von der anderen verwirrt werden.",
    umsetzung: [
      "Konzept, Design und Entwicklung der gesamten Website.",
      "Startseite als Weiche: Besucher wählen direkt den Bereich, der für sie gerade relevant ist.",
      "Mehrsprachiger Aufbau mit Sprachumschaltung und eigenem Insights-Bereich für Fachartikel.",
      "Anfrage per Formular und WhatsApp, dazu SEO, Ladezeit-Optimierung und Wartung nach Bedarf.",
    ],
    eckdaten: [
      { wert: "2", label: "Geschäftsfelder, ein Auftritt" },
      { wert: "LV · EN", label: "mehrsprachig" },
      { wert: "Riga", label: "Kunde im Ausland" },
    ],
    leistungen: [
      { label: "Webdesign", href: "/leistungen/webdesign" },
      { label: "SEO & GEO", href: "/leistungen/seo-geo-optimierung" },
    ],
    bilder: {
      desktop: "/images/referenzen/dzirksts-desktop.jpg",
      mobile: "/images/referenzen/dzirksts-mobile.jpg",
    },
  },
];
