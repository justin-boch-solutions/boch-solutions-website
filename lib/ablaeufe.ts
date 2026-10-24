/**
 * Gesprächsleitfäden, Einwände und Projektabläufe für das Handbuch.
 *
 * Gedacht zum Mitlesen während des Telefonats und zum Ausdrucken für die
 * Projektmappe. Deshalb kurze Sätze, keine Absätze.
 */

export interface Punkt {
  text: string;
  /** Zusatz, der klein darunter steht – das Warum oder ein Beispielsatz. */
  warum?: string;
}

export interface Checkliste {
  id: string;
  titel: string;
  wann: string;
  punkte: Punkt[];
  /** Kurzer Hinweis über der Liste. */
  vorbemerkung?: string;
}

export interface Phase {
  name: string;
  /** Woran ich erkenne, dass die Phase abgeschlossen ist. Ohne das geht es nicht weiter. */
  tor: string;
  punkte: Punkt[];
}

export interface Ablauf {
  id: string;
  titel: string;
  fuer: string;
  dauer: string;
  phasen: Phase[];
}

/* ------------------------------------------------------------- Gespräche */

export const gespraeche: Checkliste[] = [
  {
    id: "erstgespraech",
    titel: "Erstgespräch",
    wann: "Erster Kontakt, am Telefon oder vor Ort. 20 bis 30 Minuten.",
    vorbemerkung:
      "Ziel ist nicht, etwas zu verkaufen. Ziel ist zu verstehen, was weh tut, und einen nächsten Termin zu vereinbaren. Mehr fragen als reden.",
    punkte: [
      { text: "Wie viele Leute arbeiten im Betrieb? Wie viele davon brauchen E-Mail?", warum: "Bestimmt Paketgröße und Lizenzkosten." },
      { text: "Wie läuft Ihre E-Mail heute?", warum: "Freemail, beim Domain-Anbieter, eigener Server? Entscheidet den Umstellungsweg." },
      { text: "Wer kümmert sich bisher um die IT?", warum: "Oft ein Verwandter. Nicht schlechtmachen – sondern entlasten." },
      { text: "Was nervt Sie im Moment am meisten?", warum: "Die wichtigste Frage des Gesprächs. Dann still sein und zuhören." },
      { text: "Haben Sie eine Webseite? Wer kann sie ändern?", warum: "„Niemand“ oder „der Sohn, aber der hat keine Zeit“ ist ein Auftrag." },
      { text: "Suchen Sie Mitarbeiter?", warum: "Bei Handwerksbetrieben oft dringender als Kunden. Öffnet die Karriereseite." },
      { text: "Wer entscheidet darüber, und wer zahlt?", warum: "Früh klären. Sonst erstellt man ein Angebot für jemanden ohne Entscheidungsbefugnis." },
      { text: "Bis wann soll es laufen?", warum: "Zeigt, ob es echt ist oder nur Interesse." },
      { text: "Woran würden Sie in einem halben Jahr merken, dass es sich gelohnt hat?", warum: "Macht Erfolg messbar und verhindert Streit am Ende." },
      { text: "Zusammenfassen, was ich verstanden habe – in meinen Worten", warum: "„Ich habe verstanden, dass … Stimmt das so?“ Korrigiert Missverständnisse sofort." },
      { text: "Konkreten nächsten Schritt mit Datum vereinbaren", warum: "Nicht „ich melde mich“, sondern „ich schicke Ihnen Dienstag ein Angebot“." },
    ],
  },
  {
    id: "brief-rueckmeldung",
    titel: "Jemand antwortet auf den Brief",
    wann: "Rückruf oder E-Mail nach einem der 26 Briefe.",
    vorbemerkung:
      "Der Empfänger hat schon gelesen, dass bei ihm etwas nicht stimmt. Nicht noch einmal erklären, dass er ein Problem hat – sondern lösen.",
    punkte: [
      { text: "Danken, dass er sich meldet – kurz, nicht unterwürfig" },
      { text: "Den Befund aus seinem Brief nennen, nicht allgemein reden", warum: "„Bei Ihnen fehlt die Signatur, und die Regel steht auf Beobachten.“" },
      { text: "Anbieten, es gemeinsam live nachzuprüfen", warum: "Der Selbsttest auf boch-solutions.de/email-check dauert eine Minute und macht es greifbar." },
      { text: "Den Festpreis nennen: 390 €, ohne Betriebsunterbrechung, Nachweis vorher und nachher" },
      { text: "Sagen, was ich dafür brauche: DNS-Zugang und gegebenenfalls Microsoft-Admin" },
      { text: "Termin vereinbaren – konkret, nicht „in den nächsten Wochen“" },
      { text: "Nicht gleich das große Paket anbieten", warum: "Der E-Mail-Schutz ist der Einstieg. Alles andere kommt, wenn Vertrauen da ist." },
    ],
  },
  {
    id: "vor-ort",
    titel: "Vor-Ort-Termin zur Bestandsaufnahme",
    wann: "Vor jedem Angebot über 1.000 €.",
    vorbemerkung: "Ohne Bestandsaufnahme kein Festpreis. Was man nicht gesehen hat, kann man nicht kalkulieren.",
    punkte: [
      { text: "Alle Rechner, Laptops, Tablets und Diensthandys zählen" },
      { text: "Betriebssysteme und Alter der Geräte notieren", warum: "Windows 10 ohne Support ist ein eigenes Thema und ein eigener Posten." },
      { text: "Steht ein Server im Haus? Was läuft darauf?" },
      { text: "Wo liegen die Daten? Wird gesichert? Wurde die Sicherung je zurückgespielt?", warum: "Fast nie. Das ist ein eigenes Angebot wert." },
      { text: "Internetanschluss: Anbieter, Geschwindigkeit, Router" },
      { text: "Welche Branchensoftware wird genutzt?", warum: "Handwerkersoftware blockiert manchmal den Umzug. Vorher klären, nicht nachher." },
      { text: "Wer hat die Zugangsdaten für Domain, Webseite, E-Mail?", warum: "Häufigste Antwort: niemand weiß es. Das kostet Zeit und gehört ins Angebot." },
      { text: "Fotos von Server, Netzwerkschrank und Arbeitsplätzen machen", warum: "Zuhause weiß man sonst nicht mehr, was man gesehen hat." },
      { text: "Mit einem Mitarbeiter sprechen, nicht nur mit dem Chef", warum: "Der Chef weiß, was kosten soll. Der Mitarbeiter weiß, was nervt." },
    ],
  },
  {
    id: "angebot",
    titel: "Angebot schreiben",
    wann: "Nach Bestandsaufnahme, innerhalb von drei Werktagen.",
    vorbemerkung: "Ein Angebot, das Streit vermeidet, nennt nicht nur was drin ist, sondern auch was nicht.",
    punkte: [
      { text: "Ausgangslage in zwei Sätzen beschreiben", warum: "Zeigt, dass ich zugehört habe." },
      { text: "Leistung klar benennen, mit Verweis auf den Katalog" },
      { text: "Was ausdrücklich NICHT enthalten ist", warum: "Der wichtigste Absatz. Verhindert die Erwartung, dass alles inklusive ist." },
      { text: "Was ich vom Kunden brauche, mit Frist", warum: "Texte, Bilder, Zugänge. Ohne Frist kommt nichts." },
      { text: "Microsoft-Lizenzkosten gesondert ausweisen", warum: "Die laufen weiter und sind nicht meine Leistung. Sonst steht es später als meine Rechnung da." },
      { text: "Zeitplan mit realistischen Terminen, Puffer eingerechnet" },
      { text: "Zahlungsweise: bei größeren Projekten 50 % bei Auftrag, 50 % bei Übergabe" },
      { text: "Hinweis § 19 UStG, keine Umsatzsteuer ausweisen", warum: "Als Kleinunternehmer. Steht sonst falsch in der Buchhaltung des Kunden." },
      { text: "Gültigkeit des Angebots: 30 Tage" },
      { text: "Einen Satz dazu, was passiert, wenn man nichts tut", warum: "Nicht drohen. Nur benennen." },
    ],
  },
  {
    id: "nachfassen",
    titel: "Angebot nachfassen",
    wann: "Sieben Werktage nach dem Angebot, wenn nichts kam.",
    vorbemerkung: "Anrufen, nicht mailen. Eine zweite Mail wird genauso ignoriert wie die erste.",
    punkte: [
      { text: "Nicht fragen „haben Sie es bekommen“", warum: "Klingt nach Kontrolle und lädt zu einer Ausrede ein." },
      { text: "Stattdessen: „Ich wollte hören, ob noch Fragen offen sind“" },
      { text: "Wenn unklar: anbieten, es gemeinsam durchzugehen" },
      { text: "Wenn zu teuer: nach dem Rahmen fragen, nicht sofort Rabatt geben", warum: "Lieber Umfang verkleinern als Preis senken. Sonst ist der Preis künftig verhandelbar." },
      { text: "Wenn kein Interesse: ruhig fragen, woran es lag", warum: "Die ehrlichste Rückmeldung, die man bekommt. Notieren." },
      { text: "Bei Vertröstung: konkreten Termin vereinbaren, wann ich wieder anrufe" },
      { text: "Nach dem zweiten Nachfassen loslassen", warum: "Dreimal hinterherlaufen kostet mehr, als der Auftrag wert ist." },
    ],
  },
];

/* -------------------------------------------------------------- Einwände */

export interface Einwand {
  satz: string;
  dahinter: string;
  antwort: string;
  nicht: string;
}

export const einwaende: Einwand[] = [
  {
    satz: "„Das ist mir zu teuer.“",
    dahinter: "Meist nicht der Preis, sondern fehlender Bezug. Er weiß nicht, wogegen er die Zahl halten soll.",
    antwort:
      "„Darf ich fragen, womit Sie es vergleichen? Zum Einordnen: Eine gefälschte Rechnung an einen Kunden kostet Sie den Auftrag und das Vertrauen. Die Absicherung kostet einmal 390 Euro.“",
    nicht: "Nicht sofort Rabatt anbieten. Wer einmal nachlässt, verhandelt künftig immer.",
  },
  {
    satz: "„Das macht mein Neffe.“",
    dahinter: "Loyalität und oft schlechtes Gewissen. Ein Angriff auf den Neffen ist ein Angriff auf ihn.",
    antwort:
      "„Gut, dann haben Sie jemanden. Soll ich einmal draufschauen, ob alles eingerichtet ist? Wenn ja, haben Sie Sicherheit. Wenn nicht, kann Ihr Neffe es mit meiner Liste nachholen.“",
    nicht: "Den Neffen nie schlechtmachen. Man verliert das Gespräch und den Kunden.",
  },
  {
    satz: "„Läuft doch alles, wir brauchen das nicht.“",
    dahinter: "Er sieht das Problem nicht, weil es unsichtbar ist. Bisher ist nichts passiert.",
    antwort:
      "„Das freut mich. Darf ich Ihnen in einer Minute zeigen, was ein Fremder über Ihre Domain sehen kann? Wenn alles in Ordnung ist, sage ich das auch.“",
    nicht: "Keine Angst machen und nichts übertreiben. Der Befund spricht für sich.",
  },
  {
    satz: "„Schicken Sie mir mal was, ich melde mich.“",
    dahinter: "Höfliche Verabschiedung. In neun von zehn Fällen meldet sich niemand.",
    antwort:
      "„Mache ich. Damit es nicht liegen bleibt: Ich rufe Donnerstag kurz an – passt Ihnen vormittags oder nachmittags besser?“",
    nicht: "Nicht mit „ich melde mich dann“ auflegen. Der Termin muss aus dem Gespräch kommen.",
  },
  {
    satz: "„Wir haben gerade keine Zeit dafür.“",
    dahinter: "Oft ehrlich. Handwerksbetriebe sind ausgelastet.",
    antwort:
      "„Verstehe ich. Der E-Mail-Schutz kostet Sie etwa zwanzig Minuten Ihrer Zeit, den Rest mache ich. Wollen wir einen Termin in vier Wochen setzen?“",
    nicht: "Nicht drängen. Termin in der Zukunft vereinbaren und im Kalender notieren.",
  },
  {
    satz: "„Können Sie mir garantieren, dass ich bei Google vorne stehe?“",
    dahinter: "Jemand hat ihm das versprochen – oder er hat es gelesen.",
    antwort:
      "„Nein, und wer das zusagt, sagt die Unwahrheit. Ich kann dafür sorgen, dass Google versteht, was Sie machen und wo. Ob Sie vorne stehen, entscheidet Google.“",
    nicht: "Niemals Platzierungen zusagen. Auch nicht „wahrscheinlich“.",
  },
  {
    satz: "„Was kostet das denn im Monat?“",
    dahinter: "Er denkt in laufenden Kosten, nicht in Projekten. Gutes Zeichen.",
    antwort:
      "„Zwei Teile: einmalig die Einrichtung, dann laufend die Betreuung ab 19 Euro je Mitarbeiter im Monat. Dazu kommen Microsofts Lizenzen, die gehen direkt an Microsoft.“",
    nicht: "Lizenzkosten nie in den eigenen Preis einrechnen. Das rächt sich bei der ersten Preiserhöhung von Microsoft.",
  },
];

/* --------------------------------------------------------------- Abläufe */

export const ablaeufe: Ablauf[] = [
  {
    id: "ablauf-email",
    titel: "Projektablauf: E-Mail-Schutz",
    fuer: "Das Einstiegsprodukt für 390 €.",
    dauer: "Zwei Stunden Arbeit, verteilt über fünf Wochen.",
    phasen: [
      {
        name: "1 · Befund",
        tor: "Der Kunde hat den Bericht gesehen und den Auftrag erteilt.",
        punkte: [
          { text: "Domain prüfen, Bericht erzeugen" },
          { text: "Befund in einfachen Worten erklären" },
          { text: "Auftrag schriftlich bestätigen lassen – E-Mail genügt" },
        ],
      },
      {
        name: "2 · Vorbereitung",
        tor: "Alle Absender sind bekannt, Zugänge liegen vor.",
        punkte: [
          { text: "Alle Dienste erfassen, die im Namen des Betriebs mailen", warum: "Buchhaltung, Shop, Newsletter, Webformular, Branchensoftware." },
          { text: "DNS-Zugang klären – wer hat ihn, funktioniert er" },
          { text: "Bei Microsoft 365: Admin-Zugang sicherstellen" },
        ],
      },
      {
        name: "3 · Einrichtung",
        tor: "SPF, DKIM und DMARC sind gesetzt und messbar aktiv.",
        punkte: [
          { text: "SPF setzen oder korrigieren, mit -all" },
          { text: "DKIM aktivieren, CNAMEs eintragen" },
          { text: "DMARC auf p=none mit rua= an den Kunden" },
          { text: "Nach einer Stunde nachmessen und dokumentieren" },
        ],
      },
      {
        name: "4 · Beobachtung",
        tor: "Vier Wochen vergangen, Berichte ausgewertet, kein legitimer Absender fällt durch.",
        punkte: [
          { text: "Termin für die Umstellung sofort in den Kalender setzen", warum: "Wird er nicht gesetzt, bleibt es auf p=none stehen – wie bei 32 % der Betriebe." },
          { text: "Berichte ansehen, unbekannte Absender klären" },
        ],
      },
      {
        name: "5 · Abschluss",
        tor: "p=quarantine ist aktiv, Nachweis ist übergeben, Rechnung ist raus.",
        punkte: [
          { text: "Auf p=quarantine stellen" },
          { text: "Vorher-Nachher-Nachweis an den Kunden" },
          { text: "Rechnung stellen" },
          { text: "Nächsten Schritt anbieten – meist IT-Betreuung oder Webseite" },
        ],
      },
    ],
  },
  {
    id: "ablauf-website",
    titel: "Projektablauf: Webseite",
    fuer: "Onepager, Firmenauftritt oder individuelle Lösung.",
    dauer: "Zwei bis fünf Wochen, abhängig vom Kunden.",
    phasen: [
      {
        name: "1 · Auftrag",
        tor: "Angebot angenommen, Anzahlung da, Termin steht.",
        punkte: [
          { text: "Umfang schriftlich festhalten: Seitenzahl, Korrekturläufe, Termin" },
          { text: "50 % Anzahlung bei Projekten über 1.000 €" },
          { text: "Impressumsangaben anfordern", warum: "Rechtsform, Inhaber, Steuernummer, Kammer." },
        ],
      },
      {
        name: "2 · Material",
        tor: "Bilder und Inhalte liegen vollständig vor.",
        punkte: [
          { text: "Bilder anfordern, Frist setzen", warum: "Hier bleiben die meisten Projekte liegen." },
          { text: "Wenn nach der Frist nichts kommt: Fototermin anbieten oder Projekt pausieren" },
          { text: "Texte schreiben oder aus einem Gespräch entwickeln" },
        ],
      },
      {
        name: "3 · Bau",
        tor: "Entwurf steht, Kunde hat ihn gesehen.",
        punkte: [
          { text: "Struktur und Seiten anlegen" },
          { text: "Als Vorschaulink zeigen, nicht als Bildschirmfoto" },
          { text: "Rückmeldungen gesammelt einholen, nicht einzeln" },
        ],
      },
      {
        name: "4 · Korrektur",
        tor: "Der vereinbarte Korrekturlauf ist abgeschlossen und freigegeben.",
        punkte: [
          { text: "Einen Korrekturlauf umsetzen" },
          { text: "Weitere Wünsche als Zusatzleistung anbieten, nicht stillschweigend machen" },
          { text: "Schriftliche Freigabe einholen" },
        ],
      },
      {
        name: "5 · Live",
        tor: "Seite ist erreichbar, rechtlich vollständig, bei Google eingereicht.",
        punkte: [
          { text: "Impressum und Datenschutz prüfen", warum: "Ohne diese nicht live gehen." },
          { text: "Domain verbinden, https prüfen, www-Weiterleitung" },
          { text: "Sitemap in der Search Console einreichen, Indexierung beantragen" },
          { text: "Google-Unternehmensprofil mit der Seite abgleichen" },
          { text: "Restzahlung stellen" },
        ],
      },
      {
        name: "6 · Danach",
        tor: "Wartung ist beauftragt oder ausdrücklich abgelehnt.",
        punkte: [
          { text: "Hosting und Wartung anbieten", warum: "Hier entsteht das wiederkehrende Geschäft." },
          { text: "Nach vier Wochen anrufen und fragen, ob Anfragen kommen" },
          { text: "Um eine Google-Bewertung bitten", warum: "Der beste Moment ist direkt nach der Übergabe." },
        ],
      },
    ],
  },
  {
    id: "ablauf-m365",
    titel: "Projektablauf: Umstellung auf Microsoft 365",
    fuer: "Starter, Wachstum oder Rundum-sorglos.",
    dauer: "Eine bis vier Wochen, je nach Ausgangslage.",
    phasen: [
      {
        name: "1 · Bestandsaufnahme",
        tor: "Ich weiß, was läuft, wo die Daten liegen und wer welches Gerät hat.",
        punkte: [
          { text: "Vor-Ort-Termin mit der Checkliste durchgehen" },
          { text: "Umstellungsweg bestimmen – siehe Reiter Microsoft 365" },
          { text: "Branchensoftware auf Verträglichkeit prüfen" },
        ],
      },
      {
        name: "2 · Vorbereitung",
        tor: "Mandant läuft, Domain ist verifiziert, Wartungsfenster steht.",
        punkte: [
          { text: "Lizenzen auf den Namen des Betriebs bestellen", warum: "Nie auf meinen Namen." },
          { text: "Mandant anlegen, Domain verifizieren" },
          { text: "Nutzer anlegen, Mehrfaktor von Anfang an aktivieren" },
          { text: "Wartungsfenster vereinbaren, meist Freitagnachmittag" },
        ],
      },
      {
        name: "3 · Migration",
        tor: "Alle Postfächer und Daten sind übernommen und geprüft.",
        punkte: [
          { text: "Testmigration mit zwei Postfächern" },
          { text: "Hauptmigration, Fortschritt dokumentieren" },
          { text: "Stichproben: Sind alte Mails, Kalender und Kontakte da?" },
        ],
      },
      {
        name: "4 · Umschaltung",
        tor: "MX zeigt auf Microsoft, E-Mail-Schutz ist aktiv, Testmail kommt an.",
        punkte: [
          { text: "MX umstellen" },
          { text: "SPF, DKIM, DMARC einrichten", warum: "Gehört immer dazu, nie separat anbieten." },
          { text: "Testmail in beide Richtungen, auch Spam-Ordner prüfen" },
          { text: "Geräte einrichten: Outlook auf PC und Handy je Person" },
        ],
      },
      {
        name: "5 · Übergabe",
        tor: "Einweisung gehalten, Zugänge dokumentiert, Betreuung geklärt.",
        punkte: [
          { text: "Einweisung vor Ort, eine Stunde, alle gemeinsam" },
          { text: "Kurze Anleitung dalassen – eine Seite, keine zwanzig" },
          { text: "Zugangsdaten übergeben und dokumentieren" },
          { text: "Betreuungsvertrag anbieten" },
          { text: "Alte Systeme erst nach vier Wochen abschalten" },
        ],
      },
    ],
  },
];
