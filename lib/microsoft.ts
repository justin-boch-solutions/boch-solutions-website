/**
 * Microsoft-365-Wissen für das Handbuch: Basispläne, Zusatzprodukte, die
 * einzelnen Dienste dahinter, eine Fähigkeiten-Matrix für den Paket-Baukasten,
 * Umstellungswege und die Checkliste.
 *
 * ZU DEN PREISEN: Listenpreise von Microsoft, netto je Nutzer und Monat bei
 * Jahresabrechnung. Sie ändern sich mehrmals im Jahr. Vor jedem Angebot unter
 * QUELLE nachsehen.
 */

export const PREIS_STAND = "20. Oktober 2026";
export const QUELLE =
  "https://www.microsoft.com/de-de/microsoft-365/business/compare-all-microsoft-365-business-products";

/* ------------------------------------------------------------ Basispläne */

export interface Plan {
  id: string;
  name: string;
  /** Netto je Nutzer und Monat, Jahresabrechnung. */
  preis: number;
  /** Netto je Nutzer und Monat bei monatlicher Kündbarkeit, falls ausgewiesen. */
  preisMonatlich?: number;
  fuer: string;
  grenze: string;
  hinweis?: string;
}

/** Genau einer davon wird gewählt – sie schließen sich gegenseitig aus. */
export const plaene: Plan[] = [
  {
    id: "exchange1",
    name: "Exchange Online (Plan 1)",
    preis: 3.5,
    fuer: "Nur E-Mail mit eigener Domain, sonst nichts. Der günstigste Einstieg.",
    grenze: "50 GB je Postfach",
    hinweis: "Kein Office, kein Teams, keine gemeinsame Ablage. Für Betriebe, die nur weg vom Freemail-Postfach wollen.",
  },
  {
    id: "exchange2",
    name: "Exchange Online (Plan 2)",
    preis: 6.9,
    fuer: "Wie Plan 1, mit unbegrenztem Archiv und Datenverlust-Schutz.",
    grenze: "100 GB je Postfach plus Archiv",
    hinweis: "Lohnt sich selten. Meist ist Business Basic für 6,07 € das bessere Geschäft.",
  },
  {
    id: "basic-ewr",
    name: "Microsoft 365 Business Basic EWR (ohne Teams)",
    preis: 4.67,
    fuer: "E-Mail, Dateiablage und Office im Browser – ohne Teams.",
    grenze: "Bis 300 Nutzer",
    hinweis: "Seit der EU-Entflechtung getrennt buchbar. Teams lässt sich später dazunehmen.",
  },
  {
    id: "basic",
    name: "Microsoft 365 Business Basic",
    preis: 6.07,
    fuer: "E-Mail, Teams, gemeinsame Ablage, Office im Browser und auf dem Handy.",
    grenze: "Bis 300 Nutzer",
    hinweis: "Office lässt sich NICHT auf dem PC installieren. Das ist der häufigste Irrtum bei diesem Plan.",
  },
  {
    id: "apps",
    name: "Microsoft 365 Apps for Business",
    preis: 11.0,
    fuer: "Nur die Office-Programme auf dem Rechner, E-Mail bleibt woanders.",
    grenze: "Bis 300 Nutzer",
    hinweis: "KEIN Postfach enthalten. Nur sinnvoll, wenn die E-Mail nachweislich woanders bleibt.",
  },
  {
    id: "standard",
    name: "Microsoft 365 Business Standard",
    preis: 12.13,
    preisMonatlich: 14.56,
    fuer: "Der Normalfall für Handwerksbetriebe: E-Mail, Teams, Ablage und Office zum Installieren.",
    grenze: "Bis 300 Nutzer",
  },
  {
    id: "premium",
    name: "Microsoft 365 Business Premium",
    preis: 19.06,
    preisMonatlich: 22.87,
    fuer: "Alles aus Standard plus Geräteverwaltung und erweiterten Schutz.",
    grenze: "Bis 300 Nutzer",
    hinweis: "Der Aufpreis von 6,93 € je Nutzer bringt Intune, Defender und bedingten Zugriff – zusammen deutlich mehr wert als einzeln gekauft.",
  },
];

/* --------------------------------------------------------- Zusatzprodukte */

export interface Zusatz {
  id: string;
  name: string;
  /** null = Preis nicht öffentlich ausgewiesen oder nicht von Microsoft. */
  preis: number | null;
  was: string;
  hinweis?: string;
  /** Diese Zusätze schließen sich gegenseitig aus (z. B. die Telefon-Varianten). */
  gruppe?: string;
}

export const zusaetze: Zusatz[] = [
  {
    id: "copilot",
    name: "Microsoft 365 Copilot",
    preis: 18.2,
    was: "KI-Unterstützung in Word, Excel, Outlook und Teams, mit Zugriff auf die eigenen Firmendaten.",
    hinweis: "Setzt Business Standard oder Premium voraus. Kostet mehr als der Basisplan selbst – nur anbieten, wenn der Betrieb wirklich viel schreibt.",
  },
  {
    id: "phone-standard",
    name: "Teams Telefon Standard",
    preis: 8.7,
    gruppe: "telefon",
    was: "Telefonanlage in Teams. Durchwahlen, Warteschleife, Weiterleitung.",
    hinweis: "Enthält KEINE Gesprächsminuten. Die kommen von einem SIP-Anbieter oder über einen Anrufplan.",
  },
  {
    id: "phone-inland",
    name: "Teams Telefon mit Anrufplan Inland",
    preis: 19.1,
    gruppe: "telefon",
    was: "Telefonanlage plus Inlandsgespräche von Microsoft.",
    hinweis: "Rundum-Lösung ohne weiteren Telefonanbieter. Meist teurer als Standard plus deutscher SIP-Anbieter.",
  },
  {
    id: "phone-international",
    name: "Teams Telefon mit Anrufplan In- und Ausland",
    preis: 29.5,
    gruppe: "telefon",
    was: "Wie Inland, zusätzlich Auslandsgespräche.",
    hinweis: "Für Handwerksbetriebe praktisch nie nötig.",
  },
  {
    id: "backup",
    name: "Datensicherung durch Dritte",
    preis: null,
    was: "Echte Sicherung der Microsoft-365-Daten, aus der sich Stände gezielt zurückholen lassen.",
    hinweis:
      "WICHTIG: Microsoft sichert NICHT im Sinne eines Backups. Der Papierkorb hält 30 bis 93 Tage, danach ist es weg. Wer gelöschte oder verschlüsselte Daten zurückholen will, braucht ein Produkt eines Drittanbieters. Preis je nach Anbieter.",
  },
];

/* ------------------------------------------------- Die Dienste dahinter */

export interface Dienst {
  name: string;
  wofuer: string;
  kann: string[];
  kannNicht: string[];
  /** In welchen Basisplänen enthalten – Plan-IDs. */
  inPlaenen: string[];
}

export const dienste: Dienst[] = [
  {
    name: "Exchange Online",
    wofuer: "E-Mail, Kalender und Kontakte mit eigener Domain.",
    kann: [
      "Postfächer mit eigener Domain, 50 GB je Person",
      "Gemeinsame Kalender – wer ist wann auf welcher Baustelle",
      "Freigegebene Postfächer wie info@ ohne eigene Lizenz",
      "Verteiler, Abwesenheitsnotizen, Regeln",
      "Spam- und Schadsoftwarefilter",
    ],
    kannNicht: ["Keine echte Datensicherung – gelöscht ist nach 30 bis 93 Tagen endgültig weg"],
    inPlaenen: ["exchange1", "exchange2", "basic", "basic-ewr", "standard", "premium"],
  },
  {
    name: "Teams",
    wofuer: "Chat, Telefonate, Videobesprechungen und Zusammenarbeit.",
    kann: [
      "Chat statt WhatsApp – dienstlich getrennt vom Privaten",
      "Video- und Sprachbesprechungen mit Kunden und Lieferanten",
      "Kanäle je Baustelle oder Projekt, mit Dateien direkt daneben",
      "Bildschirm teilen – gut für Fernhilfe",
    ],
    kannNicht: ["Kein Telefonieren ins Festnetz – dafür braucht es Teams Telefon"],
    inPlaenen: ["basic", "standard", "premium"],
  },
  {
    name: "SharePoint",
    wofuer: "Die gemeinsame Dateiablage des Betriebs.",
    kann: [
      "Ersetzt den Server im Büro und die NAS",
      "Zugriff von Baustelle, Büro und Zuhause",
      "Rechte je Gruppe – Buchhaltung sieht anderes als Montage",
      "Versionsverlauf: alte Stände einer Datei zurückholen",
      "Gleichzeitiges Bearbeiten derselben Datei",
    ],
    kannNicht: [
      "Keine Dateien über 250 GB",
      "Sehr lange Pfade und Sonderzeichen machen Probleme",
      "Kein Ersatz für ein Backup",
    ],
    inPlaenen: ["basic", "basic-ewr", "standard", "premium"],
  },
  {
    name: "OneDrive",
    wofuer: "Die persönliche Ablage je Mitarbeiter, 1 TB.",
    kann: [
      "Eigene Dateien, von überall erreichbar",
      "Automatische Sicherung von Desktop und Dokumenten",
      "Einzelne Dateien per Link teilen, auch mit Ablaufdatum",
    ],
    kannNicht: ["Nicht für gemeinsame Betriebsdaten gedacht – die gehören nach SharePoint"],
    inPlaenen: ["basic", "basic-ewr", "apps", "standard", "premium"],
  },
  {
    name: "Office-Programme (Word, Excel, PowerPoint, Outlook)",
    wofuer: "Die Programme zum Installieren auf dem Rechner.",
    kann: [
      "Installation auf 5 PCs, 5 Tablets und 5 Handys je Person",
      "Arbeiten ohne Internet",
      "Voller Funktionsumfang statt der abgespeckten Browserversion",
    ],
    kannNicht: ["Im Browser fehlen Serienbriefe, komplexe Excel-Funktionen und Makros"],
    inPlaenen: ["apps", "standard", "premium"],
  },
  {
    name: "Entra ID (früher Azure AD)",
    wofuer: "Die Benutzerverwaltung – wer darf sich wo anmelden.",
    kann: [
      "Ein Konto für alles, eine Anmeldung",
      "Mehrfaktor-Anmeldung – der wirksamste Einzelschutz überhaupt",
      "Bedingter Zugriff: Anmeldung nur von Firmengeräten oder aus Deutschland (nur Premium)",
      "Konto eines ausgeschiedenen Mitarbeiters in Sekunden sperren",
    ],
    kannNicht: ["Bedingter Zugriff fehlt in Basic, Standard und Apps"],
    inPlaenen: ["basic", "basic-ewr", "apps", "standard", "premium"],
  },
  {
    name: "Intune",
    wofuer: "Geräteverwaltung – PCs, Tablets und Handys zentral im Griff.",
    kann: [
      "Firmendaten auf einem verlorenen Handy aus der Ferne löschen",
      "Vorgaben erzwingen: Bildschirmsperre, Verschlüsselung, Updates",
      "Programme zentral verteilen",
      "Privates Handy nutzen, ohne dass Firmendaten dort liegen bleiben",
    ],
    kannNicht: ["Kein Fernzugriff auf den Bildschirm – dafür braucht es eine Fernwartungslösung"],
    inPlaenen: ["premium"],
  },
  {
    name: "Defender for Business",
    wofuer: "Schutz vor Schadsoftware, Phishing und Erpressungstrojanern.",
    kann: [
      "Prüft Anhänge und Links, bevor sie geöffnet werden",
      "Erkennt Erpressungstrojaner und schlägt Alarm",
      "Übersicht, welches Gerät ein Problem hat",
    ],
    kannNicht: ["Ersetzt keine Datensicherung – wenn etwas verschlüsselt ist, braucht es ein Backup"],
    inPlaenen: ["premium"],
  },
  {
    name: "Bookings",
    wofuer: "Online-Terminbuchung für Kunden.",
    kann: [
      "Kunden buchen Besichtigungs- oder Beratungstermine selbst",
      "Schreibt direkt in den Kalender",
      "Erinnerung per E-Mail an den Kunden",
    ],
    kannNicht: ["Keine Einsatzplanung für Monteure – dafür braucht es Planner oder eine Branchenlösung"],
    inPlaenen: ["standard", "premium"],
  },
  {
    name: "Planner und To Do",
    wofuer: "Aufgaben verteilen und nachhalten.",
    kann: ["Aufgaben je Baustelle mit Zuständigem und Termin", "Übersicht, was offen ist", "In Teams eingebettet"],
    kannNicht: ["Keine Zeiterfassung, keine Materialverwaltung"],
    inPlaenen: ["basic", "basic-ewr", "standard", "premium"],
  },
  {
    name: "Power Automate",
    wofuer: "Wiederkehrende Abläufe automatisieren.",
    kann: [
      "Formular auf der Webseite landet automatisch als Aufgabe",
      "Rechnungsanhänge automatisch in den richtigen Ordner",
      "Erinnerungen bei fehlender Rückmeldung",
    ],
    kannNicht: ["Für anspruchsvolle Abläufe braucht es eine kostenpflichtige Erweiterung"],
    inPlaenen: ["basic", "basic-ewr", "standard", "premium"],
  },
  {
    name: "Teams Telefon",
    wofuer: "Die Telefonanlage des Betriebs, in Teams integriert.",
    kann: [
      "Eine Nummer, erreichbar auf Handy, PC und Tischtelefon",
      "Warteschleife, Ansage, Weiterleitung nach Feierabend",
      "Gespräche aus Teams heraus führen",
    ],
    kannNicht: ["Standard enthält keine Gesprächsminuten – entweder Anrufplan von Microsoft oder ein SIP-Anbieter"],
    inPlaenen: [],
  },
];

/* --------------------------------------------- Fähigkeiten für den Baukasten */

export interface Faehigkeit {
  id: string;
  name: string;
  erklaerung: string;
  /** Plan- oder Zusatz-IDs, die diese Fähigkeit liefern. Eine genügt. */
  durch: string[];
}

export const faehigkeiten: Faehigkeit[] = [
  { id: "mail", name: "E-Mail mit eigener Domain", erklaerung: "Schluss mit gmx oder t-online im Absender.", durch: ["exchange1", "exchange2", "basic", "basic-ewr", "standard", "premium"] },
  { id: "kalender", name: "Gemeinsame Kalender", erklaerung: "Wer ist wann auf welcher Baustelle.", durch: ["exchange1", "exchange2", "basic", "basic-ewr", "standard", "premium"] },
  { id: "sammeladresse", name: "Sammeladressen wie info@", erklaerung: "Ohne eigene Lizenz, mehrere greifen zu.", durch: ["exchange1", "exchange2", "basic", "basic-ewr", "standard", "premium"] },
  { id: "office-browser", name: "Office im Browser und auf dem Handy", erklaerung: "Word und Excel ohne Installation.", durch: ["basic", "basic-ewr", "standard", "premium"] },
  { id: "office-pc", name: "Office auf dem PC installieren", erklaerung: "Voller Funktionsumfang, auch ohne Internet.", durch: ["apps", "standard", "premium"] },
  { id: "ablage", name: "Gemeinsame Dateiablage", erklaerung: "Ersetzt den Server im Büro, erreichbar von der Baustelle.", durch: ["basic", "basic-ewr", "standard", "premium"] },
  { id: "onedrive", name: "Persönliche Ablage mit 1 TB", erklaerung: "Eigene Dateien, automatisch gesichert.", durch: ["basic", "basic-ewr", "apps", "standard", "premium"] },
  { id: "versionen", name: "Alte Dateistände zurückholen", erklaerung: "Wenn jemand etwas überschreibt.", durch: ["basic", "basic-ewr", "standard", "premium"] },
  { id: "teams", name: "Chat und Videobesprechungen", erklaerung: "Dienstlich getrennt von WhatsApp.", durch: ["basic", "standard", "premium"] },
  { id: "mfa", name: "Mehrfaktor-Anmeldung", erklaerung: "Der wirksamste Einzelschutz gegen übernommene Konten.", durch: ["basic", "basic-ewr", "apps", "standard", "premium"] },
  { id: "bedingt", name: "Bedingter Zugriff", erklaerung: "Anmeldung nur von Firmengeräten oder aus Deutschland.", durch: ["premium"] },
  { id: "geraete", name: "Geräte zentral verwalten", erklaerung: "Vorgaben erzwingen, Programme verteilen.", durch: ["premium"] },
  { id: "fernloeschen", name: "Verlorenes Handy aus der Ferne leeren", erklaerung: "Firmendaten weg, bevor jemand sie liest.", durch: ["premium"] },
  { id: "defender", name: "Schutz vor Phishing und Erpressungstrojanern", erklaerung: "Prüft Anhänge und Links vor dem Öffnen.", durch: ["premium"] },
  { id: "termine", name: "Online-Terminbuchung für Kunden", erklaerung: "Kunden buchen selbst, landet im Kalender.", durch: ["standard", "premium"] },
  { id: "aufgaben", name: "Aufgaben verteilen und nachhalten", erklaerung: "Wer macht was bis wann.", durch: ["basic", "basic-ewr", "standard", "premium"] },
  { id: "telefon", name: "Telefonanlage mit Durchwahl und Warteschleife", erklaerung: "Eine Nummer auf allen Geräten.", durch: ["phone-standard", "phone-inland", "phone-international"] },
  { id: "minuten", name: "Gesprächsminuten ins Festnetz", erklaerung: "Ohne Anrufplan braucht es einen SIP-Anbieter.", durch: ["phone-inland", "phone-international"] },
  { id: "ki", name: "KI-Unterstützung beim Schreiben", erklaerung: "Copilot in Word, Outlook und Teams.", durch: ["copilot"] },
  { id: "sicherung", name: "Echte Datensicherung mit Rückholpunkt", erklaerung: "Microsoft sichert NICHT. Ohne Zusatz ist Gelöschtes nach spätestens 93 Tagen weg.", durch: ["backup"] },
];

/* ------------------------------------------------------- Umstellungswege */

export interface Szenario {
  id: string;
  titel: string;
  ausgangslage: string;
  haeufigkeit: "sehr häufig" | "häufig" | "gelegentlich" | "selten";
  empfehlung: string;
  brauche: string[];
  schritte: string[];
  dauer: string;
  stolpersteine: string[];
}

export const szenarien: Szenario[] = [
  {
    id: "freemail",
    titel: "Vom Freemail-Postfach auf eigene Domain",
    ausgangslage:
      "Der Betrieb arbeitet mit einer Adresse bei GMX, web.de, T-Online oder Gmail. Oft teilen sich mehrere Leute ein Postfach.",
    haeufigkeit: "sehr häufig",
    empfehlung: "Business Standard, damit Office auf den Rechnern mitkommt.",
    brauche: [
      "Zugang zum bisherigen Postfach – Passwort, nicht nur „der Chef weiß es“",
      "Domain: vorhanden oder neu zu registrieren",
      "Liste aller Mitarbeiter mit Wunschadresse",
      "Entscheidung, ob alte Mails mitkommen sollen",
    ],
    schritte: [
      "Mandant anlegen, Domain hinzufügen und per TXT-Eintrag verifizieren",
      "Nutzer anlegen, Lizenzen zuweisen",
      "Alte Mails importieren – bei Freemail meist per IMAP-Migration",
      "MX-Eintrag auf Microsoft umstellen",
      "SPF, DKIM und DMARC einrichten – gehört zwingend dazu",
      "Outlook auf allen Rechnern und Handys einrichten",
      "Alte Adresse vier Wochen als Weiterleitung behalten, dann abschalten",
      "Kunden und Lieferanten über die neue Adresse informieren",
    ],
    dauer: "Ein Tag Arbeit, verteilt über eine Woche.",
    stolpersteine: [
      "Freemail-Anbieter drosseln IMAP-Zugriffe. Große Postfächer brauchen mehrere Anläufe.",
      "Das geteilte Postfach wird oft zur geteilten Anmeldung. Besser: ein freigegebenes Postfach – das kostet keine Lizenz.",
      "Die alte Adresse steht auf Fahrzeugen, Rechnungen und Schildern. Weiterleitung lange genug laufen lassen.",
    ],
  },
  {
    id: "hoster",
    titel: "Von IONOS, Strato oder united-domains zu Microsoft 365",
    ausgangslage: "E-Mail läuft beim Domain-Anbieter mit, meist ohne Kalenderfreigabe und ohne gemeinsame Ablage.",
    haeufigkeit: "sehr häufig",
    empfehlung: "Business Standard. Der Domainvertrag bleibt, nur die Mail zieht um.",
    brauche: [
      "Zugang zur DNS-Verwaltung beim bisherigen Anbieter",
      "Zugang zu allen bestehenden Postfächern",
      "Übersicht, welche Postfächer wirklich noch genutzt werden",
      "Information über Weiterleitungen und Verteiler, die dort eingerichtet sind",
    ],
    schritte: [
      "Bestandsaufnahme: Postfächer, Aliasse, Weiterleitungen, Verteiler notieren",
      "Mandant anlegen, Domain verifizieren",
      "Postfächer per IMAP migrieren, inklusive Ordnerstruktur",
      "Verteiler und Aliasse in Microsoft 365 nachbauen",
      "MX umstellen, Wirksamkeit abwarten",
      "SPF anpassen, DKIM aktivieren, DMARC setzen",
      "Alte Postfächer erst löschen, wenn nachweislich alles da ist",
    ],
    dauer: "Ein bis zwei Tage.",
    stolpersteine: [
      "Vergessene Weiterleitungen sind der häufigste Fehler. Erst nach Wochen fällt auf, dass info@ nirgends mehr ankommt.",
      "Beim Domain-Anbieter bleibt oft ein Mail-Paket im Vertrag, das weiterläuft und weiter kostet. Kündigen lassen.",
      "Alter SPF-Eintrag muss den Hoster entfernen und Microsoft aufnehmen – sonst landen Mails im Spam.",
    ],
  },
  {
    id: "exchange-lokal",
    titel: "Vom eigenen Exchange-Server in die Cloud",
    ausgangslage: "Im Betrieb steht ein Server, auf dem Exchange läuft – meist alt und ohne Wartungsvertrag.",
    haeufigkeit: "gelegentlich",
    empfehlung: "Business Premium, weil solche Betriebe meist auch Geräteverwaltung brauchen.",
    brauche: [
      "Administrativer Zugang zum Server",
      "Information über Exchange-Version und Patchstand",
      "Netzwerkübersicht: Was hängt sonst noch am Server",
      "Wartungsfenster außerhalb der Arbeitszeit",
    ],
    schritte: [
      "Exchange-Version prüfen – ältere Versionen erlauben keine einfache Migration",
      "Mandant anlegen, Domain verifizieren",
      "Migrationsweg wählen: Hybrid, Cutover oder per Drittwerkzeug",
      "Testmigration mit zwei Postfächern",
      "Hauptmigration am Wochenende",
      "MX umstellen, E-Mail-Schutz einrichten",
      "Server erst abschalten, wenn vier Wochen nichts fehlt",
    ],
    dauer: "Zwei bis vier Wochen, je nach Datenmenge.",
    stolpersteine: [
      "Am Server hängen oft weitere Dienste – Buchhaltung, Zeiterfassung, Dateizugriff. Vorher klären.",
      "Alte Exchange-Versionen sind ein Sicherheitsrisiko. Das ist das Verkaufsargument, nicht die Bequemlichkeit.",
      "Hier ist externe Unterstützung sinnvoll, wenn man es zum ersten Mal macht. Ehrlich sagen statt improvisieren.",
    ],
  },
  {
    id: "dateiserver",
    titel: "Vom Dateiserver oder der NAS auf SharePoint und OneDrive",
    ausgangslage: "Dateien liegen auf einem Server im Büro oder einer NAS. Von unterwegs kommt niemand ran.",
    haeufigkeit: "häufig",
    empfehlung: "Business Standard reicht; Premium, wenn von privaten Geräten zugegriffen wird.",
    brauche: [
      "Übersicht über Ordnerstruktur und Datenmenge",
      "Wer darf was sehen – die bestehenden Berechtigungen",
      "Entscheidung, was mitkommt und was ins Archiv geht",
    ],
    schritte: [
      "Datenmenge und Struktur erfassen, Altlasten aussortieren",
      "SharePoint-Bibliotheken anlegen, die der Arbeitsweise entsprechen",
      "Berechtigungen über Gruppen vergeben, nie je Person",
      "Mit dem Umzugswerkzeug migrieren, in Wellen",
      "OneDrive für persönliche Dateien einrichten",
      "Einweisung: Was gehört in OneDrive, was in SharePoint",
      "Alten Server als Nur-Lesen behalten, bis alle umgestellt sind",
    ],
    dauer: "Ein bis drei Wochen, abhängig von der Datenmenge.",
    stolpersteine: [
      "Zu lange Pfade und Sonderzeichen in Dateinamen brechen die Migration. Vorher bereinigen.",
      "Die alte Ordnerstruktur versteht meist niemand mehr. Der Umzug ist die Gelegenheit aufzuräumen – gemeinsam mit dem Betrieb.",
      "Ohne Einweisung legen alle weiter alles in OneDrive ab, und die gemeinsame Ablage bleibt leer.",
    ],
  },
  {
    id: "geteilter-pc",
    titel: "Vom geteilten Rechner zu eigenen Konten",
    ausgangslage: "Ein PC im Büro, alle nutzen dasselbe Windows-Konto, Passwörter hängen am Monitor.",
    haeufigkeit: "häufig",
    empfehlung: "Business Premium, weil Geräteverwaltung hier den Unterschied macht.",
    brauche: [
      "Liste aller Personen, die den Rechner nutzen",
      "Übersicht über installierte Programme und deren Lizenzen",
      "Zeitfenster, in dem der Rechner nicht gebraucht wird",
    ],
    schritte: [
      "Daten des gemeinsamen Kontos sichern",
      "Je Person ein Microsoft-Konto anlegen",
      "Geräte in Intune aufnehmen",
      "Anmeldung je Person einrichten, Mehrfaktor aktivieren",
      "Gemeinsame Daten nach SharePoint, persönliche nach OneDrive",
      "Einweisung – hier ist der Widerstand am größten",
    ],
    dauer: "Ein halber Tag je Rechner.",
    stolpersteine: [
      "Mehrfaktor ist der häufigste Streitpunkt. Nicht darauf verzichten, sondern erklären: Es schützt vor genau dem Schaden, den eine gefälschte Rechnung anrichtet.",
      "Alte Programme laufen manchmal nur im Admin-Konto. Vorher prüfen.",
    ],
  },
  {
    id: "google",
    titel: "Von Google Workspace zu Microsoft 365",
    ausgangslage: "Der Betrieb nutzt Gmail und Google Drive, will aber Office und Teams.",
    haeufigkeit: "selten",
    empfehlung: "Business Standard.",
    brauche: [
      "Administrativer Zugang zu Google Workspace",
      "Entscheidung über Google-Dokumente: umwandeln oder als PDF archivieren",
    ],
    schritte: [
      "Mandant anlegen, Domain verifizieren",
      "Mail, Kalender und Kontakte mit Microsofts Google-Migration übernehmen",
      "Drive-Dateien nach SharePoint, Google-Formate dabei umwandeln",
      "MX umstellen, E-Mail-Schutz einrichten",
      "Google-Konto drei Monate als Archiv behalten",
    ],
    dauer: "Eine bis zwei Wochen.",
    stolpersteine: [
      "Google-Dokumente mit vielen Formeln oder Kommentaren überleben die Umwandlung nicht sauber. Vorher zeigen, was passiert.",
      "Geteilte Google-Links in alten Mails funktionieren nach Abschaltung nicht mehr.",
    ],
  },
];

/* ----------------------------------------------------------- Checkliste */

export interface Besorgung {
  was: string;
  woher: string;
  hinweis: string;
}

export const checkliste: Besorgung[] = [
  {
    was: "Microsoft-365-Lizenzen",
    woher: "Direkt bei Microsoft, oder über einen CSP-Partner",
    hinweis:
      "Der Betrieb sollte Vertragsinhaber sein, nicht ich. Sonst hängt seine komplette IT an meinem Konto – ein Problem bei jedem Wechsel und ein Risiko für beide Seiten.",
  },
  {
    was: "Zugang zur Domain",
    woher: "Beim Domain-Anbieter des Betriebs",
    hinweis:
      "Ohne DNS-Zugang geht nichts. Wenn niemand die Zugangsdaten hat, zuerst den Anbieter identifizieren und die Inhaberschaft klären – das kann Wochen dauern.",
  },
  {
    was: "Globaler Administrator im Mandanten",
    woher: "Wird beim Anlegen des Mandanten erzeugt",
    hinweis:
      "Ein Konto für den Betrieb, ein getrenntes für mich. Niemals das Chefkonto als Administrator nutzen – wenn es übernommen wird, ist alles offen.",
  },
  {
    was: "Mehrfaktor-Anmeldung",
    woher: "In Microsoft 365 enthalten",
    hinweis:
      "Von Anfang an aktivieren, nicht nachträglich. Später eingeführt gilt sie als Schikane; von Anfang an ist sie normal.",
  },
  {
    was: "Vollständige Mitarbeiterliste",
    woher: "Vom Betrieb",
    hinweis:
      "Mit Namen, gewünschter Adresse und Geräten. Jeder vergessene Mitarbeiter bedeutet einen Rückruf am Tag nach der Umstellung.",
  },
  {
    was: "Liste aller Dienste, die im Namen des Betriebs mailen",
    woher: "Vom Betrieb – Buchhaltung, Shop, Newsletter, Webformular",
    hinweis:
      "Wird einer vergessen, landen dessen Mails nach der SPF-Umstellung im Spam. Das fällt oft erst Wochen später auf.",
  },
  {
    was: "Entscheidung über die Datensicherung",
    woher: "Drittanbieter, nicht Microsoft",
    hinweis:
      "Microsoft sichert nicht im Sinne eines Backups. Das schriftlich klarstellen – sonst steht man bei einem Datenverlust in der Haftungsfrage.",
  },
  {
    was: "Wartungsfenster",
    woher: "Vom Betrieb",
    hinweis:
      "Während der MX-Umstellung kann E-Mail kurz verzögert ankommen. Freitagnachmittag ist bei Handwerksbetrieben meist am unkritischsten.",
  },
];
