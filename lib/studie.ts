/**
 * Zahlen der eigenen Untersuchung zur E-Mail-Sicherheit in NRW (Oktober 2026).
 *
 * Quelle der Werte ist presse/pressemitteilung-email-sicherheit.md – beide Stellen
 * müssen übereinstimmen, sonst zitiert eine Redaktion die eine und prüft die andere.
 * Die Rohdaten liegen in studie-daten/ und sind nicht Teil des Repos.
 *
 * Alle Prozentwerte beziehen sich auf die Betriebe MIT erkennbarem Mailbetrieb,
 * nicht auf alle geprüften Domains – das ist der Nenner, den auch die
 * Pressemitteilung verwendet.
 */

export interface BranchenErgebnis {
  name: string;
  /** Betriebe mit erkennbarem Mailbetrieb; nur sie gehen in die Quote ein. */
  geprueft: number;
  /** Anteil mit kritischer Lücke: SPF oder DMARC fehlt, widersprüchlich oder unvollständig. */
  kritischProzent: number;
  /** Hebt das Handwerk in der Tabelle hervor – die Kernzielgruppe der Seite. */
  istKernzielgruppe?: boolean;
}

export interface BezirksErgebnis {
  name: string;
  betriebe: number;
  kritischProzent: number;
  /** Der eigene Regierungsbezirk, wird in der Tabelle hervorgehoben. */
  istEigenerBezirk?: boolean;
}

export const studie = {
  titel: "E-Mail-Sicherheit in Nordrhein-Westfalen 2026",
  slug: "email-sicherheit-nrw-2026",
  /** Erhebungszeitraum, nicht Veröffentlichungsdatum. */
  erhebungVon: "2026-10-14",
  erhebungBis: "2026-10-15",
  veroeffentlicht: "2026-10-16",

  /** Alle Domains, die in die Prüfung gingen. */
  domainsGesamt: 15452,
  /** Davon mit erkennbarem Mailbetrieb – der Nenner aller Quoten. */
  mitMailbetrieb: 14132,
  /** Ohne erkennbaren Mailbetrieb, aus der Auswertung ausgeschlossen. */
  ohneMailbetrieb: 1320,
  branchenAnzahl: 14,

  kritischGesamtProzent: 54.3,
  vollstaendigAbgesichertProzent: 4.6,

  datenquelle: "OpenStreetMap-Mitwirkende, Open Database License (ODbL)",
} as const;

/** Nach Quote aufsteigend – die Reihenfolge ist die Aussage: oben steht, was funktioniert. */
export const branchen: BranchenErgebnis[] = [
  { name: "Banken und Sparkassen", geprueft: 209, kritischProzent: 16.3 },
  { name: "IT-Dienstleister", geprueft: 611, kritischProzent: 31.9 },
  { name: "Werbe- und Webagenturen", geprueft: 232, kritischProzent: 44.0 },
  { name: "Apotheken", geprueft: 1515, kritischProzent: 45.1 },
  { name: "Versicherungsbüros", geprueft: 258, kritischProzent: 48.1 },
  { name: "Immobilienmakler", geprueft: 359, kritischProzent: 52.4 },
  { name: "Handwerksbetriebe", geprueft: 4410, kritischProzent: 55.7, istKernzielgruppe: true },
  { name: "Rechtsanwälte", geprueft: 625, kritischProzent: 56.0 },
  { name: "Kfz-Werkstätten", geprueft: 955, kritischProzent: 57.4 },
  { name: "Architekturbüros", geprueft: 173, kritischProzent: 58.4 },
  { name: "Steuerberater", geprueft: 360, kritischProzent: 58.9 },
  { name: "Arztpraxen", geprueft: 2125, kritischProzent: 60.2 },
  { name: "Schulen", geprueft: 2269, kritischProzent: 60.6 },
  { name: "Handwerksorganisationen", geprueft: 23, kritischProzent: 60.9 },
];

/** Nur Handwerksbetriebe, aufgeteilt nach Regierungsbezirk. Summe = 4.410. */
export const bezirke: BezirksErgebnis[] = [
  { name: "Düsseldorf", betriebe: 797, kritischProzent: 52.7 },
  { name: "Köln", betriebe: 1380, kritischProzent: 53.4 },
  { name: "Detmold", betriebe: 716, kritischProzent: 56.8 },
  { name: "Arnsberg", betriebe: 912, kritischProzent: 57.3 },
  { name: "Münster", betriebe: 605, kritischProzent: 61.3, istEigenerBezirk: true },
];

/** Einzelbefunde zum Handwerk, alle bezogen auf die 4.410 Betriebe mit Mailbetrieb. */
export const handwerkBefunde = [
  {
    anzahl: 1902,
    prozent: 43.1,
    titel: "keine Regel hinterlegt",
    text: "Es ist nicht festgelegt, was mit gefälschten Nachrichten im Namen des Betriebs geschehen soll.",
  },
  {
    anzahl: 1421,
    prozent: 32.2,
    titel: "eingerichtet, nie scharf gestellt",
    text: "Die Regel steht auf „nur beobachten“. Gefälschte Nachrichten werden erkannt – und trotzdem zugestellt.",
    istKernbefund: true,
  },
  {
    anzahl: 795,
    prozent: 18.0,
    titel: "kein Absender veröffentlicht",
    text: "Es ist nicht hinterlegt, welche Server im Namen des Betriebs Mails verschicken dürfen.",
  },
  {
    anzahl: 883,
    prozent: 20.0,
    titel: "Microsoft 365 im Einsatz",
    text: "Dort sind die nötigen Einstellungen enthalten und müssen nur aktiviert werden.",
  },
];

/** Handwerkskammern, Kreishandwerkerschaften und Innungen in NRW. */
export const organisationen = {
  geprueft: 23,
  kritisch: 14,
  vollstaendig: 2,
  vollstaendigNamen: ["Handwerkskammer Münster", "Kreishandwerkerschaft Coesfeld"],
};

/**
 * Einschränkungen, die auf der Seite stehen müssen. Eine Untersuchung, die ihre
 * eigenen Grenzen verschweigt, ist für Redaktionen wertlos – und angreifbar.
 */
export const einschraenkungen = [
  {
    titel: "Digitale Signaturen sind von außen nicht sicher nachweisbar",
    text: "DKIM-Schlüssel liegen unter frei wählbaren Kennungen; geprüft wurden elf verbreitete. Wer eine eigene nutzt, zählt als „nicht gefunden“, obwohl er signiert. Der DKIM-Wert ist deshalb eine Obergrenze und der Anteil vollständig abgesicherter Betriebe eine Untergrenze. Die Einstufung „kritische Lücke“ ist davon nicht betroffen, weil sie auf SPF und DMARC beruht.",
  },
  {
    titel: "Die Auswahl ist nicht repräsentativ",
    text: "Erfasst sind nur Unternehmen, die in OpenStreetMap stehen und eine Website betreiben. Sie sind tendenziell digital weiter aufgestellt als der Durchschnitt – das tatsächliche Bild dürfte eher schlechter ausfallen. Die Zahlen gelten für die untersuchte Gruppe, nicht für „die Unternehmen in NRW“ insgesamt.",
  },
  {
    titel: "Kleine Teilgruppen zeigen nur Größenordnungen",
    text: "Handwerksorganisationen (23), Architekturbüros (173) und Banken (209) erlauben keine belastbaren Quoten.",
  },
  {
    titel: "Ausschlüsse",
    text: "1.320 der 15.452 Domains zeigten keinen erkennbaren Mailbetrieb und wurden nicht ausgewertet.",
  },
];

/** Deutsche Zahlenformatierung mit Tausenderpunkt. */
export function zahl(n: number): string {
  return n.toLocaleString("de-DE");
}

/** Prozentwert mit Komma statt Punkt. */
export function prozent(n: number): string {
  return `${n.toLocaleString("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} %`;
}
