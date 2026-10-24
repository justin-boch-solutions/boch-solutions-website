/**
 * Das Betriebswissen zu jeder Leistung: Was ich vorher brauche, wie ich es
 * umsetze, wie lange es dauert und wie ich es erkläre.
 *
 * Preise stehen hier bewusst NICHT – die kommen aus lib/leistungen.ts, das sie
 * wiederum aus `pricing` in lib/constants.ts bezieht. Eine Zahl, eine Quelle.
 *
 * Erzeugt wird daraus handbuch.html mit `npm run handbuch`.
 */

export interface HandbuchEintrag {
  /** Eine Erklärung ohne Fachwort, die ein Handwerker sofort versteht. */
  einSatz: string;
  /** Was der Kunde liefern muss, bevor ich anfangen kann. */
  voraussetzungen: string[];
  /** Die Schritte in der Reihenfolge, in der ich sie gehe. */
  ablauf: string[];
  /** Realistische Dauer, nicht die Wunschdauer. */
  dauer: string;
  /** Antwort auf "warum kostet das so viel". */
  preisBegruendung: string;
  /** Was erfahrungsgemäß schiefgeht. */
  achtung: string[];
}

export const handbuch: Record<string, HandbuchEintrag> = {
  "email-schutz": {
    einSatz:
      "Ich sorge dafür, dass niemand Fremdes E-Mails in Ihrem Namen verschicken kann – damit Ihre Kunden keine gefälschte Rechnung mit fremder Kontonummer bekommen.",
    voraussetzungen: [
      "Zugang zur DNS-Verwaltung der Domain (meist IONOS, Strato oder united-domains) – Kunde loggt sich ein, ich führe durch",
      "Falls Microsoft 365: Zugang zum Admin-Center als Administrator",
      "Information, welche Dienste sonst noch in ihrem Namen mailen (Buchhaltung, Newsletter, Shop, Webformular)",
    ],
    ablauf: [
      "Ist-Stand prüfen: SPF, DKIM, DMARC und MX über öffentliche DNS-Abfrage – dauert eine Minute, Ergebnis als Bericht",
      "Alle Absender zusammentragen. Wird einer vergessen, landen dessen Mails später im Spam",
      "SPF-Eintrag setzen oder korrigieren, mit -all am Ende (hard fail)",
      "DKIM aktivieren: bei Microsoft 365 im Admin-Center unter Defender → Richtlinien → DKIM, beide Selektoren; die CNAMEs werden beim Domain-Anbieter eingetragen",
      "DMARC auf p=none mit rua= an die eigene Adresse – vier Wochen beobachten",
      "Nach vier Wochen Berichte auswerten, dann auf p=quarantine, später p=reject",
      "Vorher-Nachher-Bericht an den Kunden, als Nachweis",
    ],
    dauer:
      "Einrichtung ein bis zwei Stunden. Die vier Wochen Beobachtung laufen nebenher; die Umstellung danach dauert zehn Minuten.",
    preisBegruendung:
      "Der Preis ist nicht die Arbeitszeit am ersten Tag, sondern der Abschluss nach vier Wochen. Genau den lassen 32 Prozent der Betriebe weg – die stehen dann auf „beobachten\" und halten sich für geschützt.",
    achtung: [
      "Niemals direkt auf p=reject springen. Vergessene Absender verschwinden dann ohne Fehlermeldung.",
      "DKIM lässt sich von außen nicht sicher nachweisen – bei eigenem Selektornamen erst im Admin-Center nachsehen, bevor man „fehlt\" sagt.",
      "Ein CNAME, der ins Leere zeigt, ist schlimmer als keiner: angefangene, nie beendete Einrichtung.",
    ],
  },

  starter: {
    einSatz:
      "Ich bringe Ihren Betrieb auf Microsoft 365: E-Mail mit eigener Domain, Dateien zentral statt auf einzelnen Rechnern, Teams für die Absprache.",
    voraussetzungen: [
      "Liste aller Mitarbeiter mit Namen und gewünschter E-Mail-Adresse",
      "Zugang zur bestehenden E-Mail und zur Domain",
      "Entscheidung: Welche Daten sollen umziehen, welche bleiben liegen",
      "Ein Termin, an dem der Betrieb zwei Stunden ohne E-Mail auskommt – meist freitagnachmittags",
    ],
    ablauf: [
      "Bestandsaufnahme: Was läuft heute, wo liegen die Daten, wer braucht was",
      "Microsoft-365-Mandant anlegen, Domain verifizieren",
      "Nutzer anlegen, Lizenzen zuweisen",
      "Postfächer migrieren – alte Mails und Kalender kommen mit",
      "MX-Eintrag umstellen, danach E-Mail-Schutz (SPF, DKIM, DMARC) einrichten",
      "Geräte einrichten: Outlook auf PC und Handy je Mitarbeiter",
      "Einweisung vor Ort, eine Stunde, mit allen gemeinsam",
    ],
    dauer: "Ein bis zwei Tage verteilt über eine Woche. Der Umschalttag selbst etwa drei Stunden.",
    preisBegruendung:
      "Der Startpreis deckt fünf Arbeitsplätze. Jeder weitere kostet 90 €, weil jeder Arbeitsplatz eigene Geräte, eigene Daten und eine eigene Einweisung bedeutet.",
    achtung: [
      "Lizenzkosten von Microsoft sind nicht enthalten und laufen weiter – vorher klar sagen.",
      "Alte Postfächer erst löschen, wenn die Migration nachweislich vollständig ist.",
      "Wer seine Mails bisher nur lokal in Outlook hatte, hat sie womöglich nirgends sonst. Vor dem Umzug sichern.",
    ],
  },

  wachstum: {
    einSatz:
      "Alles aus dem Starter-Paket, dazu eine neue Website und Ihr Google-Profil – damit Sie nicht nur ordentlich arbeiten, sondern auch gefunden werden.",
    voraussetzungen: [
      "Alles aus dem Starter-Paket",
      "Bildmaterial vom Betrieb oder Entscheidung für einen Fototermin",
      "Texte oder ein Gespräch, aus dem ich sie schreibe",
      "Zugriff auf ein bestehendes Google-Unternehmensprofil, falls vorhanden",
    ],
    ablauf: [
      "Erst die IT wie im Starter-Paket – sie ist die Grundlage, die Website kommt danach",
      "Website: Struktur abstimmen, Texte schreiben, bauen, Korrekturlauf, Freigabe, live",
      "Google-Unternehmensprofil beanspruchen oder anlegen, Kategorien, Leistungen, Einzugsgebiet, Öffnungszeiten",
      "Die Angaben auf Website und Google-Profil müssen zeichengenau übereinstimmen – sonst zählt Google sie als zwei Betriebe",
    ],
    dauer: "Drei bis fünf Wochen. Der längste Teil ist das Warten auf Texte und Bilder vom Kunden.",
    preisBegruendung:
      "Zwei Projekte in einem, die aufeinander aufbauen. Einzeln gebucht wäre es teurer.",
    achtung: [
      "Nicht mit der Website anfangen, solange die E-Mail noch wackelt. Das Kontaktformular schickt sonst ins Leere.",
      "Fehlende Texte sind der häufigste Grund, warum solche Projekte liegen bleiben. Lieber ein Gespräch aufzeichnen und selbst schreiben.",
    ],
  },

  "rundum-sorglos": {
    einSatz:
      "Das volle Paket: IT, Website, Google und laufende Betreuung – Sie haben einen Ansprechpartner für alles Digitale.",
    voraussetzungen: [
      "Alles aus dem Wachstum-Paket",
      "Benennung einer festen Ansprechperson im Betrieb",
      "Entscheidung über den Betreuungsumfang danach (Basis oder Plus)",
    ],
    ablauf: [
      "Wie Wachstum, zusätzlich: individuelle Anpassungen nach Bedarf des Betriebs",
      "Übergabe in die laufende Betreuung mit vereinbarter Reaktionszeit",
      "Nach vier Wochen ein Nachgespräch: Was läuft, was fehlt",
    ],
    dauer: "Vier bis acht Wochen bis zum Abschluss, danach laufend.",
    preisBegruendung:
      "Der Preis ist der Projektanteil. Die Betreuung danach wird monatlich abgerechnet und ist hier nicht enthalten.",
    achtung: [
      "Klar trennen, was Projekt ist und was laufende Betreuung. Sonst entsteht die Erwartung, dass alles für immer inklusive ist.",
    ],
  },

  "it-betreuung-basis": {
    einSatz:
      "Wenn etwas klemmt, rufen Sie mich an statt zu suchen – ich kümmere mich um Nutzer, Passwörter, Lizenzen und die kleinen Dinge.",
    voraussetzungen: [
      "Administrativer Zugang zum Microsoft-365-Mandanten",
      "Aktuelle Liste der Nutzer",
      "Vereinbarte Erreichbarkeit – wann gilt sie, wann nicht",
    ],
    ablauf: [
      "Zugänge einrichten und dokumentieren",
      "Monatlich: Lizenzen prüfen, ausgeschiedene Nutzer deaktivieren, Updates kontrollieren",
      "Bei Anfragen: telefonisch oder per Fernwartung lösen",
    ],
    dauer: "Laufend. Abrechnung je Nutzer und Monat.",
    preisBegruendung:
      "Pro Nutzer, weil der Aufwand mit der Zahl der Menschen wächst, nicht mit der Zahl der Rechner.",
    achtung: [
      "Was nicht enthalten ist, muss im Angebot stehen – sonst wird alles zur Betreuung gezählt.",
      "Neue Mitarbeiter erhöhen den Monatspreis. Beim Vertragsschluss ansprechen.",
    ],
  },

  "it-betreuung-plus": {
    einSatz:
      "Wie die Basis-Betreuung, aber mit kürzerer Reaktionszeit und mehr enthaltenen Leistungen.",
    voraussetzungen: ["Wie IT-Betreuung Basis", "Schriftlich vereinbarte Reaktionszeit"],
    ablauf: [
      "Wie Basis, zusätzlich: regelmäßiger Check der Sicherheitseinstellungen",
      "Einmal im Quartal ein kurzer Bericht, was gemacht wurde",
    ],
    dauer: "Laufend.",
    preisBegruendung:
      "Der Aufpreis zur Basis ist die Reaktionszeit. Die kostet, weil sie Verfügbarkeit bedeutet.",
    achtung: ["Reaktionszeit nur zusagen, wenn sie auch im Urlaub gilt – sonst nicht zusagen."],
  },

  onepager: {
    einSatz:
      "Eine einzelne, gute Seite: wer Sie sind, was Sie machen, wie man Sie erreicht. Mehr braucht ein kleiner Betrieb oft nicht.",
    voraussetzungen: [
      "Logo in guter Qualität, sonst erstelle ich eine schlichte Wortmarke",
      "Fünf bis zehn Bilder vom Betrieb oder ein Fototermin",
      "Ein Gespräch über Leistungen und Einzugsgebiet",
      "Domain – vorhanden oder neu zu registrieren",
      "Impressumsangaben: Rechtsform, Inhaber, Steuernummer oder USt-IdNr., Kammerzugehörigkeit",
    ],
    ablauf: [
      "Gespräch, daraus Struktur und Texte",
      "Entwurf bauen, dem Kunden als Link zeigen",
      "Ein Korrekturlauf – weitere kosten extra, das vorher sagen",
      "Impressum und Datenschutz einbinden",
      "Domain verbinden, live stellen, bei Google einreichen",
    ],
    dauer: "Zwei bis drei Wochen, abhängig davon, wie schnell Bilder und Freigabe kommen.",
    preisBegruendung:
      "Eine Seite, aber dieselbe Arbeit an Technik, Rechtstexten und Ladezeit wie bei fünf. Der Unterschied ist nur die Textmenge.",
    achtung: [
      "Impressum und Datenschutz sind Pflicht. Ohne sie nicht live gehen – Abmahnrisiko.",
      "Ein Korrekturlauf heißt ein Korrekturlauf. Schriftlich festhalten.",
    ],
  },

  firmenauftritt: {
    einSatz:
      "Der vollständige Auftritt mit mehreren Seiten: Leistungen, Referenzen, Team und eine Seite für Bewerber.",
    voraussetzungen: [
      "Wie Onepager, dazu Inhalte je Unterseite",
      "Entscheidung über eine Karriereseite – für Handwerksbetriebe oft der wichtigste Teil",
      "Referenzprojekte mit Freigabe der jeweiligen Kunden",
    ],
    ablauf: [
      "Struktur festlegen: welche Seiten, welche Reihenfolge",
      "Texte schreiben, Bilder sortieren und zuschneiden",
      "Bauen, Korrekturlauf, Freigabe",
      "Grundlegende Suchmaschinenoptimierung: Titel, Beschreibungen, Ortsbezug, strukturierte Daten",
      "Live stellen, Google-Profil verknüpfen",
    ],
    dauer: "Drei bis fünf Wochen.",
    preisBegruendung:
      "Jede Unterseite braucht eigene Texte, eigene Bilder und einen eigenen Suchbegriff. Das ist der Unterschied zum Onepager.",
    achtung: [
      "Die Karriereseite nicht vergessen. Viele Betriebe suchen dringender Mitarbeiter als Kunden.",
      "Referenzen nur mit schriftlicher Freigabe des genannten Kunden.",
    ],
  },

  "individuelle-webloesung": {
    einSatz:
      "Wenn Standard nicht reicht: Terminbuchung, Kundenportal, Angebotsrechner oder was der Betrieb sonst braucht.",
    voraussetzungen: [
      "Klare Beschreibung, was die Lösung können soll – im Zweifel gemeinsam aufschreiben",
      "Zugang zu Systemen, die angebunden werden sollen",
      "Ansprechpartner, der Entscheidungen treffen darf",
    ],
    ablauf: [
      "Anforderungen aufnehmen und schriftlich bestätigen lassen – das ist der wichtigste Schritt",
      "Aufwand schätzen, Angebot mit klarem Umfang",
      "Bauen, Zwischenstand zeigen, nachsteuern",
      "Test mit echten Daten, Übergabe, Einweisung",
    ],
    dauer: "Sehr unterschiedlich. Vier Wochen aufwärts.",
    preisBegruendung:
      "Startpreis. Der Endpreis hängt vom Umfang ab, deshalb gibt es vorher ein schriftliches Angebot.",
    achtung: [
      "Niemals ohne schriftlich bestätigten Umfang anfangen. Hier entstehen die Projekte, die nie fertig werden.",
      "Nachträgliche Wünsche sind Zusatzleistungen, keine Korrekturen.",
    ],
  },

  hosting: {
    einSatz: "Ihre Website läuft bei mir – schnell, verschlüsselt und gesichert.",
    voraussetzungen: ["Domain, die auf meinen Server zeigen darf"],
    ablauf: [
      "Projekt auf Vercel einrichten",
      "Domain verbinden, TLS-Zertifikat prüfen",
      "Weiterleitung von www einrichten",
      "Erreichbarkeit nach dem Umzug kontrollieren",
    ],
    dauer: "Einrichtung unter einer Stunde, danach laufend.",
    preisBegruendung:
      "Enthält Betrieb, Zertifikat und Sicherung. Günstiger als die meisten Baukästen und ohne Werbung.",
    achtung: ["Beim Umzug von einem alten Anbieter: alte Weiterleitungen übernehmen, sonst brechen Google-Verweise."],
  },

  "wartung-basic": {
    einSatz: "Ich halte die Website aktuell und sicher und ändere auf Zuruf Kleinigkeiten.",
    voraussetzungen: ["Website läuft bei mir oder ich habe vollen Zugriff"],
    ablauf: [
      "Monatlich: Updates, Sicherungen prüfen, Erreichbarkeit und Ladezeit kontrollieren",
      "Kleine Textänderungen im vereinbarten Zeitrahmen",
    ],
    dauer: "Laufend.",
    preisBegruendung: "Der enthaltene Zeitrahmen ist die Grenze. Darüber hinaus wird nach Aufwand abgerechnet.",
    achtung: ["Den enthaltenen Zeitrahmen in Minuten im Angebot nennen, nicht als „kleine Änderungen\"."],
  },

  "wartung-standard": {
    einSatz: "Wie Basic, mit mehr enthaltener Zeit für Änderungen.",
    voraussetzungen: ["Wie Wartung Basic"],
    ablauf: ["Wie Basic, mit größerem Zeitrahmen", "Zusätzlich: regelmäßiger Blick auf die Suchmaschinen-Sichtbarkeit"],
    dauer: "Laufend.",
    preisBegruendung: "Mehr enthaltene Zeit pro Monat.",
    achtung: ["Nicht verbrauchte Zeit verfällt – oder wird übertragen. Eines von beidem festlegen und hinschreiben."],
  },

  "wartung-business": {
    einSatz: "Für Betriebe, die ihre Website regelmäßig ändern – mit entsprechend viel enthaltener Zeit.",
    voraussetzungen: ["Wie Wartung Basic"],
    ablauf: ["Wie Standard, mit größtem Zeitrahmen", "Quartalsbericht über Änderungen und Sichtbarkeit"],
    dauer: "Laufend.",
    preisBegruendung: "Der größte enthaltene Zeitrahmen; lohnt sich ab etwa zwei Änderungen im Monat.",
    achtung: ["Wenn der Rahmen regelmäßig gesprengt wird, ist es kein Wartungsfall mehr, sondern ein Projekt."],
  },

  "domain-einrichtung": {
    einSatz: "Ich registriere oder übernehme Ihre Internetadresse und richte sie richtig ein.",
    voraussetzungen: [
      "Wunschadresse oder Zugang zum bestehenden Anbieter",
      "Bei Umzug: Auth-Code vom alten Anbieter",
      "Inhaberdaten für die Registrierung",
    ],
    ablauf: [
      "Verfügbarkeit prüfen und Alternativen vorschlagen",
      "Registrieren oder umziehen",
      "DNS-Einträge setzen: Website, E-Mail, Nachweise",
      "Erreichbarkeit prüfen, auch mit www",
    ],
    dauer: "Registrierung sofort, Umzug bis zu einer Woche.",
    preisBegruendung: "Die Spanne hängt davon ab, ob neu registriert oder aus einem bestehenden Vertrag umgezogen wird.",
    achtung: [
      "Inhaber muss der Betrieb sein, nicht ich. Sonst gehört die Domain dem Dienstleister – ein Streitpunkt bei jedem Wechsel.",
      "Bei Umzug die bestehenden Mail-Einträge vorher sichern. Sonst steht die E-Mail still.",
    ],
  },

  "email-domain-einrichtung": {
    einSatz: "Sie bekommen E-Mail-Adressen mit Ihrem eigenen Namen statt einer Freemail-Adresse.",
    voraussetzungen: [
      "Domain vorhanden",
      "Liste der gewünschten Adressen",
      "Entscheidung: Microsoft 365, oder beim Domain-Anbieter",
    ],
    ablauf: [
      "Postfächer anlegen",
      "MX-Einträge setzen",
      "SPF, DKIM, DMARC einrichten – gehört immer dazu",
      "Testmail in beide Richtungen",
    ],
    dauer: "Ein bis zwei Stunden.",
    preisBegruendung: "Die Spanne hängt an der Zahl der Postfächer und daran, ob alte Mails übernommen werden.",
    achtung: [
      "Niemals E-Mail einrichten ohne SPF, DKIM und DMARC. Sonst baut man genau das Problem, das man verkauft.",
      "info@ als Sammeladresse einrichten – sonst gehen Anfragen verloren, wenn jemand im Urlaub ist.",
    ],
  },

  "zusaetzliche-unterseite": {
    einSatz: "Eine weitere Seite auf Ihrer Website, zum Beispiel für ein neues Angebot.",
    voraussetzungen: ["Inhalt oder ein Gespräch dazu", "Bilder, falls gewünscht"],
    ablauf: ["Text schreiben oder übernehmen", "Seite bauen, in die Navigation einfügen", "Für Suchmaschinen auszeichnen"],
    dauer: "Zwei bis fünf Tage.",
    preisBegruendung: "Die Spanne hängt davon ab, ob Text vorliegt oder ich ihn schreibe.",
    achtung: ["Mehr Seiten sind nicht automatisch besser. Eine Seite ohne eigenen Zweck schadet eher."],
  },

  "formular-erweiterung": {
    einSatz: "Ein Formular, über das Kunden Ihnen direkt von der Website schreiben können.",
    voraussetzungen: ["Empfängeradresse", "Welche Felder gebraucht werden", "Datenschutzhinweis"],
    ablauf: [
      "Formular einbauen, Spam-Schutz einrichten",
      "Versand über einen zuverlässigen Dienst",
      "Testlauf, auch in den Spam-Ordner schauen",
      "Einwilligung und Datenschutzhinweis ergänzen",
    ],
    dauer: "Zwei bis vier Stunden.",
    preisBegruendung: "Die Spanne hängt an der Zahl der Felder und daran, ob Dateien hochgeladen werden können sollen.",
    achtung: [
      "Immer prüfen, ob die Formularmail beim Kunden ankommt und nicht im Spam landet.",
      "So wenig Felder wie möglich. Jedes zusätzliche Feld kostet Anfragen.",
    ],
  },

  bildpflege: {
    einSatz: "Ich bereite Ihre Fotos so auf, dass sie gut aussehen und die Seite trotzdem schnell lädt.",
    voraussetzungen: ["Bilder in Originalgröße", "Klärung der Rechte – besonders bei Fotos von Mitarbeitern"],
    ablauf: ["Auswählen und zuschneiden", "Größe und Format optimieren", "Alternativtexte für Barrierefreiheit und Suchmaschinen setzen"],
    dauer: "Je nach Menge, meist unter einer Stunde.",
    preisBegruendung: "Nach Anzahl der Bilder.",
    achtung: [
      "Bilder von Mitarbeitern brauchen deren Einwilligung.",
      "Keine Stockfotos, wo echte Bilder möglich sind – bei Handwerksbetrieben fällt das sofort auf.",
    ],
  },

  "basis-seo": {
    einSatz: "Ich sorge dafür, dass Google versteht, was Sie machen und wo Sie es machen.",
    voraussetzungen: ["Zugriff auf die Website", "Liste der Orte im Einzugsgebiet", "Zugang zur Google Search Console oder Einrichtung durch mich"],
    ablauf: [
      "Titel und Beschreibungen je Seite schreiben",
      "Ortsbezug in Texten und strukturierten Daten verankern",
      "Technik prüfen: Ladezeit, mobile Darstellung, Sitemap, robots.txt",
      "Search Console einrichten, Sitemap einreichen, Indexierung beantragen",
    ],
    dauer: "Ein bis zwei Tage Arbeit. Wirkung erst nach Wochen bis Monaten.",
    preisBegruendung: "Einmalige Grundlagenarbeit. Keine laufende Betreuung und keine Garantie für Platzierungen.",
    achtung: [
      "Niemals Platzierungen versprechen. Das kann niemand.",
      "Ehrlich sagen, dass es Monate dauert. Wer schnelle Ergebnisse will, braucht Anzeigen.",
    ],
  },

  "google-unternehmensprofil": {
    einSatz: "Ihr Eintrag bei Google Maps – damit Sie gefunden werden, wenn jemand in der Nähe sucht.",
    voraussetzungen: [
      "Zugang zum bestehenden Profil oder Bereitschaft, es zu beanspruchen",
      "Bestätigung durch Google – per Video oder Postkarte, das kann nur der Inhaber",
      "Fotos vom Betrieb",
      "Exakte Angaben: Name, Adresse, Telefon – zeichengleich zur Website",
    ],
    ablauf: [
      "Profil beanspruchen oder anlegen",
      "Primäre Kategorie und passende Zweitkategorien setzen – aus Googles Liste, nicht frei erfunden",
      "Leistungen eintragen, jede ist ein Suchbegriff",
      "Einzugsgebiet auf die tatsächlichen Orte begrenzen, nicht auf ganz Deutschland",
      "Öffnungszeiten, Beschreibung bis 750 Zeichen, Website mit https",
      "Kunden um Bewertungen bitten – der stärkste Hebel überhaupt",
    ],
    dauer: "Einrichtung ein bis zwei Stunden. Googles Prüfung bis zu zehn Minuten je Änderung.",
    preisBegruendung: "Die Spanne hängt davon ab, ob ein Profil existiert oder neu beansprucht werden muss.",
    achtung: [
      "Ein zu großes Einzugsgebiet schwächt die Sichtbarkeit im Kernbereich. Weniger ist mehr.",
      "Name, Adresse und Telefon müssen überall identisch sein. Abweichungen wertet Google als zwei Betriebe.",
      "Die Verifizierung kann nur der Inhaber machen – das vorher ansagen, sonst bleibt das Projekt liegen.",
    ],
  },

  "cookie-banner": {
    einSatz: "Der rechtlich nötige Hinweis, wenn Ihre Website etwas misst oder einbindet.",
    voraussetzungen: ["Übersicht, was eingebunden ist: Analyse, Karten, Schriften, Videos"],
    ablauf: [
      "Bestandsaufnahme aller Dienste",
      "Banner einbauen, der vor der Einwilligung nichts lädt",
      "Datenschutzerklärung entsprechend ergänzen",
      "Prüfen, dass bei Ablehnung wirklich nichts geladen wird",
    ],
    dauer: "Zwei bis vier Stunden.",
    preisBegruendung: "Die Spanne hängt an der Zahl der eingebundenen Dienste.",
    achtung: [
      "Ein Banner, das trotzdem lädt, ist schlimmer als keiner – er dokumentiert den Verstoß.",
      "Ich bin kein Anwalt. Bei Unsicherheit auf eRecht24 oder einen Anwalt verweisen.",
    ],
  },

  "email-client": {
    einSatz: "Ich richte Ihre E-Mail auf Ihrem Rechner und Ihrem Handy ein, damit alles zusammenpasst.",
    voraussetzungen: ["Zugangsdaten", "Zugriff auf das Gerät – vor Ort oder per Fernwartung"],
    ablauf: ["Konto einrichten", "Signatur anlegen", "Synchronisierung von Kalender und Kontakten prüfen", "Kurze Einweisung"],
    dauer: "20 bis 40 Minuten je Gerät.",
    preisBegruendung: "Pro Gerät, nicht pro Mitarbeiter – wer drei Geräte nutzt, verursacht dreimal Arbeit.",
    achtung: ["Immer alle Geräte erfassen. Das vergessene Handy ist der häufigste Rückrufgrund."],
  },

  aufwand: {
    einSatz: "Alles, was nicht im Paket steht, rechne ich nach tatsächlichem Aufwand ab.",
    voraussetzungen: ["Beschreibung der Aufgabe", "Freigabe vor Beginn, bei größerem Umfang schriftlich"],
    ablauf: ["Aufwand schätzen und nennen", "Freigabe abwarten", "Umsetzen und Zeit dokumentieren", "Mit Nachweis abrechnen"],
    dauer: "Nach Vereinbarung.",
    preisBegruendung: "Angefangene Viertelstunden werden gerundet. Vorher nennen.",
    achtung: [
      "Niemals ohne Freigabe anfangen. Das ist die häufigste Ursache für Streit über Rechnungen.",
      "Zeit mitschreiben, während man arbeitet – nicht hinterher schätzen.",
    ],
  },

  express: {
    einSatz: "Wenn es sofort sein muss, schiebe ich anderes beiseite – das kostet einen Aufschlag.",
    voraussetzungen: ["Klarer Termin", "Bestätigung, dass der Aufschlag akzeptiert wird"],
    ablauf: ["Machbarkeit prüfen und ehrlich sagen, ob es geht", "Aufschlag nennen und bestätigen lassen", "Umsetzen"],
    dauer: "Nach Absprache.",
    preisBegruendung: "Pauschale oder 15 bis 30 Prozent Aufschlag – je nachdem, was günstiger für den Kunden ist.",
    achtung: [
      "Nur zusagen, was man halten kann. Ein gerissener Eiltermin kostet mehr Vertrauen als der Auftrag wert war.",
      "Nicht jeder Eilfall ist einer. Oft reicht eine klare Ansage, wann es fertig wird.",
    ],
  },
};
