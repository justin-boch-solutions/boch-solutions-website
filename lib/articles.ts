import type { FaqItem } from "@/lib/services";

export type ArticleCategory = "microsoft-it" | "sichtbarkeit" | "digitalisierung";

export interface Article {
  slug: string;
  title: string;
  /** Kurzform fürs <title>-Tag (≤60 Zeichen). Die Überschrift auf der Seite bleibt `title`. */
  seoTitle: string;
  excerpt: string;
  /** Kurzfassung fürs <meta description>, höchstens ~155 Zeichen – sonst schneidet Google ab. */
  metaDescription: string;
  category: ArticleCategory;
  publishedAt: string; // ISO date
  readingMinutes: number;
  icon: string;
  relatedSlugs: string[];
  /** 2–3 Fragen, die der Artikeltext selbst schon beantwortet – für FaqJsonLd und die sichtbare FAQ-Box. */
  faq: FaqItem[];
}

export const articleCategoryMeta: Record<ArticleCategory, { label: string; icon: string }> = {
  "microsoft-it": { label: "Microsoft & IT-Sicherheit", icon: "Cloud" },
  sichtbarkeit: { label: "Sichtbarkeit & SEO", icon: "TrendingUp" },
  digitalisierung: { label: "Digitalisierung", icon: "Workflow" },
};

export const articles: Article[] = [
  {
    slug: "handwerksbetrieb-modernisieren",
    title: "Handwerksbetrieb modernisieren: Der Fahrplan für IT, Website und Sichtbarkeit",
    seoTitle: "Handwerksbetrieb modernisieren: Der Fahrplan",
    metaDescription:
      "Wie Sie Ihren Handwerksbetrieb modernisieren: IT-Grundlage, Website und Sichtbarkeit in der richtigen Reihenfolge – mit konkreten Schritten statt Buzzwords.",
    excerpt:
      "Von der E-Mail-Sicherheit über Microsoft 365 bis zur Website, die bei Google gefunden wird: Ein Handwerksunternehmen zu modernisieren klingt nach einem riesigen Projekt. Tatsächlich ergibt es sich aus fünf Schritten, in der richtigen Reihenfolge angegangen.",
    category: "digitalisierung",
    publishedAt: "2026-11-04",
    readingMinutes: 9,
    icon: "TrendingUp",
    relatedSlugs: ["digitalisierung-handwerk-zeit-sparen", "lokales-seo-handwerksbetriebe"],
    faq: [
      {
        question: "Wo sollte ich bei der Modernisierung meines Handwerksbetriebs anfangen?",
        answer:
          "Bei der IT-Grundlage: E-Mail-Sicherheit und eine gemeinsame Microsoft-365-Basis statt verstreuter Einzellösungen. Erst wenn dieses Fundament steht, zahlen sich Website, Sichtbarkeit und Automatisierung wirklich aus – auf einer wackligen IT gebaut, bringen sie weniger.",
      },
      {
        question: "Wie lange dauert es, bis eine Modernisierung sich spürbar auswirkt?",
        answer:
          "Die IT-Grundlage steht meist innerhalb weniger Wochen. Eine neue Website braucht je nach Umfang vier bis acht Wochen, lokales SEO zeigt erste Effekte in der Regel nach zwei bis drei Monaten. Nach etwa einem halben Jahr ist ein Betrieb insgesamt spürbar moderner aufgestellt, ohne dass der Betrieb währenddessen pausieren muss.",
      },
      {
        question: "Was kostet die Modernisierung eines Handwerksbetriebs insgesamt?",
        answer:
          "Das hängt vom Startpunkt ab: Die IT-Grundlage beginnt bei 390 Euro für den E-Mail-Schutz, ein IT-Starter-Paket bei 890 Euro, eine neue Website ab 1.190 Euro, laufende Betreuung ab 19 Euro pro Nutzer und Monat. Der Fahrplan lässt sich modular umsetzen – Sie zahlen also nicht alles auf einmal.",
      },
    ],
  },
  {
    slug: "microsoft-365-statt-einzelloesungen",
    title: "Warum Handwerksbetriebe auf Microsoft 365 statt Einzellösungen setzen sollten",
    seoTitle: "Microsoft 365 statt Einzellösungen im Handwerk",
    metaDescription:
      "Privates Postfach, Excel-Plan, WhatsApp fürs Team: Warum eine gemeinsame Microsoft-365-Basis Handwerksbetrieben langfristig Arbeit spart.",
    excerpt:
      "Privates Gmail-Postfach, Excel-Terminplan, WhatsApp fürs Team: Viele Handwerksbetriebe arbeiten mit einer gewachsenen IT aus Einzellösungen. Warum eine gemeinsame Microsoft-365-Basis langfristig weniger Aufwand macht.",
    category: "microsoft-it",
    publishedAt: "2026-05-04",
    readingMinutes: 6,
    icon: "Cloud",
    relatedSlugs: ["handwerksbetrieb-modernisieren", "firmen-email-adresse-einrichten"],
    faq: [
      {
        question:
          "Lohnt sich Microsoft 365 auch für einen kleinen Handwerksbetrieb mit nur drei oder fünf Mitarbeitenden?",
        answer:
          "Ja, denn Microsoft 365 wird pro Mitarbeitendem lizenziert, nicht pro Server. Ein kleiner Betrieb profitiert von derselben zentralen Struktur wie ein großes Unternehmen, ohne eigene Server-Infrastruktur betreiben oder warten zu müssen. Die Einrichtung lässt sich außerdem schrittweise angehen.",
      },
      {
        question: "Was passiert mit E-Mails und Dateien, wenn ein Mitarbeiter den Betrieb verlässt?",
        answer:
          "Bei privaten Postfächern oder persönlichen Laptops gehen E-Mails, Kontakte und Dateien oft mit dem Mitarbeitenden verloren. In Microsoft 365 liegen Dokumente und Postfächer dagegen zentral im Unternehmenskonto und bleiben beim Betrieb, auch wenn jemand ausscheidet.",
      },
      {
        question: "Wie fängt man am besten mit der Umstellung auf Microsoft 365 an?",
        answer:
          "Der sinnvollste Einstieg ist eine kurze Bestandsaufnahme: Welche E-Mail-Adressen, Dateiablagen und Kommunikationswege sind aktuell im Einsatz und wo entsteht der meiste Reibungsverlust. Darauf aufbauend lässt sich eine Struktur planen, die zur tatsächlichen Betriebsgröße passt, statt alles auf einmal umzustellen.",
      },
    ],
  },
  {
    slug: "php2shell-sicherheitsluecke-webseite",
    title: "php2shell: Die PHP-Lücke, wegen der gerade Webseiten offline gehen",
    seoTitle: "php2shell: Was Betriebe jetzt tun müssen",
    metaDescription:
      "Zwei kritische PHP-Lücken erlauben seit dem 21. Oktober 2026 die Übernahme von Webservern. Was Handwerksbetriebe prüfen müssen – und wer nicht betroffen ist.",
    excerpt:
      "Seit dem 21. Oktober 2026 sind zwei kritische Lücken in PHP öffentlich. Angreifer können Webserver ohne Anmeldung übernehmen, Cloudflare zählt Millionen Versuche. Betroffen ist fast jede Webseite der letzten zwanzig Jahre – und oft auch das Gerät im Büro, an das niemand denkt.",
    category: "microsoft-it",
    publishedAt: "2026-10-22",
    readingMinutes: 6,
    icon: "ShieldCheck",
    relatedSlugs: ["it-sicherheit-handwerksbetriebe-fehler", "webdesign-handwerksbetriebe-worauf-achten"],
    faq: [
      {
        question: "Ist meine Website von der php2shell-Sicherheitslücke betroffen?",
        answer:
          "Betroffen sind alle Webseiten, die auf PHP laufen, also unter anderem WordPress, TYPO3, Joomla und die meisten Shopsysteme und Baukästen. Seiten, die als rein statische Dateien ausgeliefert werden, etwa mit Next.js, Astro oder Hugo gebaut, nutzen kein PHP und sind nicht betroffen.",
      },
      {
        question: "Reicht es, die PHP-Lücke jetzt einfach zu aktualisieren?",
        answer:
          "Ein Update auf die abgesicherten Versionen PHP 8.5.12, 8.4.27, 8.3.36 oder 8.2.35 schließt die Lücke, schützt aber nicht vor einem bereits erfolgten Einbruch. Wurde die Seite in den letzten Tagen nicht aktualisiert, sollte zusätzlich auf unbekannte Dateien, neue Administratorkonten oder plötzlich langsame Ladezeiten geprüft werden.",
      },
      {
        question: "Was kann im schlimmsten Fall passieren, wenn mein Webserver übernommen wird?",
        answer:
          "Angreifer können mehr als nur die Seite verunstalten: Die Seite kann unauffällig weiterlaufen und im Hintergrund Schadsoftware an Besucher ausliefern, auf fremde Shops weiterleiten oder als Versandstation für Spam dienen. Oft fällt das erst auf, wenn Google die Seite als gefährlich markiert und Kunden eine Warnseite sehen.",
      },
    ],
  },
  {
    slug: "domain-rechnung-betrug-erkennen",
    title: "Die Rechnung für Ihre Domain, die keine ist",
    seoTitle: "Gefälschte Domain-Rechnungen erkennen",
    metaDescription:
      "Gefälschte Domain-Rechnungen und Eintragungsangebote treffen Handwerksbetriebe regelmäßig. Woran Sie sie erkennen und was Sie tun, wenn Sie gezahlt haben.",
    excerpt:
      "Ein Schreiben sieht aus wie eine Rechnung Ihres Domain-Anbieters, nennt Ihre echte Internetadresse und droht mit Abschaltung. Es ist keine Rechnung – und wer das Kleingedruckte liest, findet den Beweis in einem einzigen Satz.",
    category: "digitalisierung",
    publishedAt: "2026-10-22",
    readingMinutes: 6,
    icon: "Mail",
    relatedSlugs: ["it-sicherheit-handwerksbetriebe-fehler", "firmen-email-adresse-einrichten"],
    faq: [
      {
        question: "Woher haben Betrüger meine Daten für eine gefälschte Domain-Rechnung?",
        answer:
          "Die Daten sind frei verfügbar: Bei der Domain-Registrierung werden Name und Anschrift hinterlegt, und das gesetzlich vorgeschriebene Impressum auf der eigenen Webseite nennt beides ohnehin. Es braucht also keinen Einbruch, sondern nur jemanden, der öffentliche Verzeichnisse abschreibt.",
      },
      {
        question: "Wie erkenne ich in zwei Minuten, ob eine Domain-Rechnung echt ist?",
        answer:
          "Vergleichen Sie den Absender mit Ihrem tatsächlichen Vertragspartner, den Sie auf Ihrer letzten Kontoabbuchung finden. Lesen Sie außerdem das Kleingedruckte zu Ende, da dort bei unseriösen Angeboten oft ein Satz wie „Mit der Zahlung nehmen Sie unser Angebot an“ steht, und achten Sie auf ungewöhnliche Zahlungswege wie eine Überweisung auf ein unbekanntes Konto.",
      },
      {
        question: "Ich habe schon auf eine gefälschte Domain-Rechnung gezahlt, was kann ich jetzt tun?",
        answer:
          "Bei einer Lastschrift können Sie innerhalb von acht Wochen bei Ihrer Bank widersprechen, bei einer Überweisung ist das Geld meist weg. Widersprechen Sie schriftlich, fordern Sie das Geld zurück, zahlen Sie keine Folgerechnungen und melden Sie den Vorgang der Verbraucherzentrale.",
      },
    ],
  },
  {
    slug: "it-sicherheit-handwerksbetriebe-fehler",
    title: "IT-Sicherheit für Handwerksbetriebe: 5 häufige Fehler und wie man sie vermeidet",
    seoTitle: "IT-Sicherheit im Handwerk: 5 häufige Fehler",
    metaDescription:
      "Die fünf häufigsten Sicherheitslücken in Handwerksbetrieben – vom fehlenden Backup bis zu gefälschten Mails im eigenen Namen – und was hilft.",
    excerpt:
      "Handwerksbetriebe sind für Cyberkriminelle ein lohnendes Ziel, weil die IT oft historisch gewachsen und ungesichert ist. Die fünf häufigsten Sicherheitslücken – und was dagegen wirklich hilft.",
    category: "microsoft-it",
    publishedAt: "2026-05-18",
    readingMinutes: 7,
    icon: "ShieldCheck",
    relatedSlugs: ["firmen-email-adresse-einrichten", "microsoft-365-statt-einzelloesungen"],
    faq: [
      {
        question: "Welche IT-Sicherheitsfehler kommen bei Handwerksbetrieben am häufigsten vor?",
        answer:
          "In der Praxis sehen wir immer wieder fünf Fehler: fehlende oder ungetestete Backups, geteilte Passwörter für mehrere Konten, keine Mehrfaktor-Authentifizierung, Mitarbeitende, die Phishing-Mails nicht erkennen, und Software, die nicht regelmäßig aktualisiert wird.",
      },
      {
        question: "Reicht eine externe Festplatte als Backup für meinen Betrieb aus?",
        answer:
          "In der Praxis zeigt sich im Ernstfall oft, dass solche Backups Monate alt sind, nicht alle wichtigen Daten abdecken oder sich gar nicht mehr einspielen lassen. Eine automatisierte, regelmäßig geprüfte Cloud-Sicherung, etwa über Microsoft 365, schließt diese Lücke zuverlässiger.",
      },
      {
        question: "Wie leicht lassen sich E-Mails im Namen meiner Firma fälschen?",
        answer:
          "Nach einer eigenen Untersuchung von 15.452 Unternehmen in Nordrhein-Westfalen im Oktober 2026 lassen sich bei 54,3 Prozent E-Mails im Firmennamen fälschen, im Handwerk bei 55,7 Prozent. Ursache sind fehlende Einträge in der eigenen Domain, die sich mit einem kostenlosen E-Mail-Sicherheits-Check prüfen lassen.",
      },
    ],
  },
  {
    slug: "lokales-seo-handwerksbetriebe",
    title: "Lokales SEO für Handwerksbetriebe: So werden Sie bei „Handwerker in [Ort]“ gefunden",
    seoTitle: "Lokales SEO für Handwerksbetriebe erklärt",
    metaDescription:
      "So werden Handwerksbetriebe bei „Handwerker in [Ort]“ gefunden: die drei Hebel mit dem größten Effekt und was realistisch zu erwarten ist.",
    excerpt:
      "Die meisten Kundenanfragen im Handwerk beginnen heute mit einer Google-Suche in der eigenen Region. Was lokales SEO konkret bedeutet und mit welchen Hebeln Handwerksbetriebe realistisch mehr Sichtbarkeit erreichen.",
    category: "sichtbarkeit",
    publishedAt: "2026-06-01",
    readingMinutes: 7,
    icon: "MapPin",
    relatedSlugs: ["handwerksbetrieb-modernisieren", "webdesign-handwerksbetriebe-worauf-achten"],
    faq: [
      {
        question: "Welche drei Faktoren entscheiden über die lokale Sichtbarkeit meines Handwerksbetriebs bei Google?",
        answer:
          "Google berücksichtigt vor allem die Relevanz von Webseite und Google-Unternehmensprofil für die Suchanfrage, die Entfernung zum Suchenden und wie vertrauenswürdig der Betrieb anhand von Bewertungen und Informationen wirkt. Ein vollständiges Google-Unternehmensprofil, echte Kundenbewertungen und eine Webseite mit klarem Orts- und Leistungsbezug haben dabei den größten Effekt.",
      },
      {
        question: "Reicht eine neue Webseite allein, um bei Google besser gefunden zu werden?",
        answer:
          "Nein, für die lokale „Handwerker in der Nähe“-Suche ist das Google-Unternehmensprofil meist wichtiger als die Webseite selbst. Beide Quellen zusammen wirken aber deutlich stärker, weil Google Konsistenz zwischen ihnen als Vertrauenssignal wertet.",
      },
      {
        question: "Wie lange dauert es, bis lokales SEO erste Ergebnisse zeigt?",
        answer:
          "Technische Verbesserungen an Webseite und Google-Unternehmensprofil zeigen oft innerhalb weniger Wochen erste Wirkung. Spürbare Platzierungsverbesserungen bei umkämpften Suchbegriffen brauchen dagegen in der Regel mehrere Monate kontinuierlicher Arbeit.",
      },
    ],
  },
  {
    slug: "geo-generative-engine-optimization-handwerk",
    title: "GEO erklärt: Wie Handwerksbetriebe in ChatGPT, Copilot und Gemini empfohlen werden",
    seoTitle: "GEO: In ChatGPT und Copilot empfohlen werden",
    metaDescription:
      "Wie Handwerksbetriebe in ChatGPT, Copilot und Gemini als Quelle genannt werden – und worin sich GEO von klassischem SEO unterscheidet.",
    excerpt:
      "Immer mehr Menschen fragen KI-Assistenten statt Google. Was Generative Engine Optimization (GEO) ist, warum sie sich von klassischem SEO unterscheidet und wie Handwerksbetriebe dort sichtbar werden.",
    category: "sichtbarkeit",
    publishedAt: "2026-06-15",
    readingMinutes: 6,
    icon: "Sparkles",
    relatedSlugs: ["lokales-seo-handwerksbetriebe", "webdesign-handwerksbetriebe-worauf-achten"],
    faq: [
      {
        question: "Was ist GEO und wie unterscheidet es sich von klassischem SEO?",
        answer:
          "GEO steht für Generative Engine Optimization und optimiert dafür, dass KI-Antwortmaschinen wie ChatGPT, Microsoft Copilot oder Google Gemini einen Betrieb bei passenden Fragen konkret als Antwort nennen. Anders als beim klassischen SEO, wo Nutzer selbst ein Ergebnis aus einer Liste auswählen, gibt es bei einer KI-Anfrage meist nur eine formulierte Antwort mit wenigen genannten Betrieben.",
      },
      {
        question: "Was sollten Handwerksbetriebe konkret tun, um in KI-Antworten vorzukommen?",
        answer:
          "Leistungsseiten sollten mit einem kurzen, klaren Absatz beginnen, der Leistung und Zielgruppe zusammenfasst, und häufige Fragen in natürlicher Sprache beantworten statt als Werbetext. Name, Adresse und Telefonnummer sollten auf Webseite, Google-Unternehmensprofil und in Branchenverzeichnissen exakt übereinstimmen, und strukturierte Daten nach Schema.org helfen zusätzlich bei der korrekten Einordnung.",
      },
      {
        question: "Muss ich mich jetzt zwischen klassischem SEO und GEO entscheiden?",
        answer:
          "Nein, beide ergänzen sich. Die klassische Google-Suche bleibt für die meisten Handwerksbetriebe weiterhin die wichtigste Quelle für Anfragen, während GEO ein zusätzlicher Kanal ist, der auf denselben Grundlagen wie gutes SEO aufbaut: klare Inhalte, korrekte Daten und echtes Vertrauen.",
      },
    ],
  },
  {
    slug: "digitalisierung-handwerk-zeit-sparen",
    title: "Digitalisierung im Handwerk: Drei Schritte, mit denen Betriebe am meisten Zeit sparen",
    seoTitle: "Digitalisierung im Handwerk: 3 Schritte",
    metaDescription:
      "Drei Schritte, mit denen Handwerksbetriebe im Büroalltag am meisten Zeit sparen – ein realistischer Fahrplan ohne Buzzwords.",
    excerpt:
      "Digitalisierung klingt nach großem Projekt – dabei sparen oft drei gezielte Schritte im Büroalltag am meisten Zeit. Ein realistischer Fahrplan ohne Buzzword-Overload.",
    category: "digitalisierung",
    publishedAt: "2026-06-29",
    readingMinutes: 6,
    icon: "Workflow",
    relatedSlugs: ["handwerksbetrieb-modernisieren", "e-rechnungspflicht-handwerksbetriebe"],
    faq: [
      {
        question: "Mit welchem Schritt sollte ich bei der Digitalisierung meines Handwerksbetriebs anfangen?",
        answer:
          "Am meisten Zeit sparen meist drei gezielte Schritte: Anfragen automatisch erfassen statt manuell zu übertragen, wiederkehrende Erinnerungen automatisieren und Dokumente zentral statt verteilt auf mehreren Geräten ablegen. Diese Schritte lassen sich unabhängig voneinander einführen, bauen aber aufeinander auf, weshalb ein kleiner Anfang sinnvoller ist als ein großes Alles-auf-einmal-Projekt.",
      },
      {
        question: "Wie hilft Automatisierung bei eingehenden Kundenanfragen?",
        answer:
          "Eine automatische Weiterleitung und Kategorisierung eingehender Anfragen, etwa mit Microsoft Power Automate, übernimmt das manuelle Übertragen aus Telefon, E-Mail und Kontaktformular in Kalender oder Auftragsliste und reduziert dabei gleich Übertragungsfehler.",
      },
      {
        question: "Warum reicht eine Ablage auf dem Laptop für Rechnungen nicht mehr aus?",
        answer:
          "Bei Eingangsrechnungen ist eine strukturierte, unveränderte Speicherung inzwischen vorgeschrieben, ein Ausdruck genügt nicht. Eine zentrale, automatisierte Ablage in der richtigen Ordnerstruktur, etwa über Microsoft 365, macht Dokumente für alle Berechtigten sofort auffindbar, auch von der Baustelle aus.",
      },
    ],
  },
  {
    slug: "website-relaunch-handwerksbetrieb-vertrieb",
    title: "Website-Relaunch für Handwerksbetriebe: Was eine Webseite wirklich zur Vertriebsmaschine macht",
    seoTitle: "Website-Relaunch für Handwerksbetriebe",
    metaDescription:
      "Eine neue Webseite allein bringt keine Anfragen. Welche Bausteine darüber entscheiden, ob Besucher eines Handwerksbetriebs zu Kunden werden.",
    excerpt:
      "Eine neue Webseite allein bringt noch keine Anfragen. Welche Bausteine tatsächlich darüber entscheiden, ob Besucher zu Kunden werden – und worauf Handwerksbetriebe bei einem Relaunch achten sollten.",
    category: "digitalisierung",
    publishedAt: "2026-07-13",
    readingMinutes: 7,
    icon: "LayoutTemplate",
    relatedSlugs: ["was-kostet-website-handwerksbetrieb", "website-ki-baukasten-oder-profi"],
    faq: [
      {
        question: "Warum bringt ein hübscherer Website-Relaunch nicht automatisch mehr Anfragen?",
        answer:
          "Viele Relaunches konzentrieren sich nur auf die Optik wie neues Logo, Farben und Fotos. Das reicht nicht, wenn Besucher trotzdem nicht wissen, was sie als Nächstes tun sollen, oder die Seite auf dem Smartphone langsam lädt – es braucht zusätzlich eine klare Struktur und stimmige technische Grundlagen.",
      },
      {
        question: "Welche Bausteine sorgen dafür, dass ein Website-Relaunch tatsächlich mehr Kunden bringt?",
        answer:
          "Entscheidend sind eine klare Handlungsaufforderung wie Anruf-Button oder Kontaktformular, schnelle Ladezeit und gute mobile Darstellung, eine vollständige Leistungsübersicht mit eigenen Unterseiten je Leistung sowie Vertrauenssignale wie Standort, echte Kontaktdaten und Referenzen.",
      },
      {
        question: "Ist eine Website nach dem Relaunch fertig?",
        answer:
          "Nein, eine Webseite ist kein einmaliges Projekt. Inhalte veralten und technische Anforderungen ändern sich, sodass eine Seite ohne laufende Pflege mit der Zeit wieder an Sichtbarkeit verliert.",
      },
    ],
  },
  {
    slug: "was-kostet-website-handwerksbetrieb",
    title: "Was kostet eine Website für einen Handwerksbetrieb? Preise und was sie bestimmt",
    seoTitle: "Was kostet eine Website für Handwerksbetriebe?",
    metaDescription:
      "Konkrete Startpreise für eine Handwerker-Website, die vier Faktoren, die den Preis treiben, und die laufenden Kosten, die oft verschwiegen werden.",
    excerpt:
      "Die häufigste Frage vor dem Auftrag – und die am seltensten beantwortete. Konkrete Startpreise, die vier Faktoren, die den Preis wirklich treiben, und die laufenden Kosten, die viele Angebote verschweigen.",
    category: "sichtbarkeit",
    publishedAt: "2026-10-11",
    readingMinutes: 7,
    icon: "BadgeCheck",
    relatedSlugs: ["webdesign-handwerksbetriebe-worauf-achten", "website-relaunch-handwerksbetrieb-vertrieb"],
    faq: [
      {
        question: "Was kostet eine Website für einen Handwerksbetrieb?",
        answer:
          "Ein kompakter Auftritt auf einer Seite beginnt bei etwa 1.190 Euro, ein vollständiger Firmenauftritt mit mehreren Unterseiten bei rund 2.490 Euro, und individuelle Lösungen mit Sonderfunktionen bei etwa 3.490 Euro. Dazu kommen laufende Kosten ab rund 10 Euro im Monat für Hosting.",
      },
      {
        question: "Welche Faktoren treiben den Preis einer Handwerker-Website am stärksten?",
        answer:
          "Der größte Hebel ist die Anzahl der Unterseiten, da jede zusätzliche Seite Struktur, Text, Bilder und Abstimmung bedeutet und mit 149 bis 299 Euro pro Seite zu Buche schlägt. Hinzu kommen, wer die Texte schreibt, ob eigene Fotos oder Stockfotos verwendet werden und Sonderfunktionen wie Terminbuchung oder ein Kundenportal.",
      },
      {
        question: "Welche laufenden Kosten fallen nach dem Launch einer Website noch an?",
        answer:
          "Eine Website braucht dauerhaft Hosting ab etwa 10 Euro im Monat, Wartung ab rund 20 Euro im Monat sowie die jährliche Domain-Gebühr beim Registrar. Ohne diese laufende Pflege wird eine Website innerhalb weniger Jahre zu einem Sicherheitsrisiko.",
      },
    ],
  },
  {
    slug: "webdesign-handwerksbetriebe-worauf-achten",
    title: "Webdesign für Handwerksbetriebe: Worauf es bei einer Handwerker-Website wirklich ankommt",
    seoTitle: "Webdesign für Handwerksbetriebe: Worauf achten?",
    metaDescription:
      "Eine Handwerker-Website soll Anfragen bringen und Mitarbeiter gewinnen. Woran die meisten scheitern und welche Bausteine den Unterschied machen.",
    excerpt:
      "Eine Website für einen Handwerksbetrieb hat zwei Aufgaben: Anfragen bringen und Mitarbeiter gewinnen. Woran die meisten Handwerker-Websites scheitern und welche Bausteine den Unterschied machen.",
    category: "sichtbarkeit",
    publishedAt: "2026-10-11",
    readingMinutes: 7,
    icon: "LayoutTemplate",
    relatedSlugs: ["handwerksbetrieb-modernisieren", "was-kostet-website-handwerksbetrieb"],
    faq: [
      {
        question: "Welche Aufgabe wird bei einer Handwerker-Website am häufigsten vergessen?",
        answer:
          "Fast immer wird vergessen, dass eine Website nicht nur Anfragen bringen, sondern auch Mitarbeiter gewinnen soll. Betriebe, die händeringend Gesellen suchen, haben oft keine einzige Zeile dazu auf ihrer Seite, obwohl auch Gesellen und Azubis die Website prüfen.",
      },
      {
        question: "Woran erkenne ich, ob meine Website für Handy-Besucher gut genug funktioniert?",
        answer:
          "Ein einfacher Test: Öffnen Sie Ihre Website auf dem Handy und stoppen Sie die Zeit, bis Sie Ihre eigene Telefonnummer antippen konnten. Dauert das länger als fünf Sekunden, ist das ein dringendes Problem, denn der größte Teil der Besucher kommt vom Smartphone, oft mit schlechtem Empfang auf der Baustelle.",
      },
      {
        question: "Warum braucht jede Leistung eine eigene Unterseite statt einer gemeinsamen Übersichtsseite?",
        answer:
          "Eine Sammelseite „Unsere Leistungen“ mit mehreren Stichpunkten hat bei Google kaum eine Chance. Wer nach einer bestimmten Leistung in seiner Stadt sucht, findet nur Seiten, die genau diese Leistung eigenständig behandeln.",
      },
    ],
  },
  {
    slug: "website-ki-baukasten-oder-profi",
    title: "Website vom KI-Baukasten oder vom Profi? Eine ehrliche Einordnung",
    seoTitle: "KI-Baukasten oder Profi? Website im Vergleich",
    metaDescription:
      "Wann ein KI-Baukasten für Handwerksbetriebe wirklich reicht, wann er teuer wird – und woran Sie den Unterschied vorher erkennen.",
    excerpt:
      "KI-Baukästen bauen in Minuten eine Website – für manche Betriebe reicht das wirklich. Wann ein Baukasten die richtige Wahl ist, wann er teuer wird und woran man den Unterschied vorher erkennt.",
    category: "sichtbarkeit",
    publishedAt: "2026-10-11",
    readingMinutes: 6,
    icon: "Sparkles",
    relatedSlugs: ["was-kostet-website-handwerksbetrieb", "webdesign-handwerksbetriebe-worauf-achten"],
    faq: [
      {
        question: "Reicht ein KI-Baukasten für meine Handwerker-Website aus?",
        answer:
          "Für einen Ein-Mann-Betrieb, der nur auffindbar sein und eine Telefonnummer zeigen will, ohne aktiv über Google neue Kunden zu gewinnen, ist ein Baukasten für etwa 10 bis 30 Euro im Monat eine vernünftige, ehrliche Lösung. Sobald die Website aktiv Aufträge oder Mitarbeiter gewinnen soll, klemmt es bei einzelnen Leistungsseiten, der Ladezeit auf dem Handy und bei Funktionen über eine reine Website hinaus.",
      },
      {
        question: "Lohnt sich finanziell eher ein Baukasten oder eine Website vom Dienstleister?",
        answer:
          "Über fünf Jahre kostet ein Baukasten für 20 Euro im Monat etwa 1.200 Euro, ein kompakter Auftritt vom Dienstleister ab 1.190 Euro zuzüglich Hosting etwa das Doppelte. Entscheidend ist aber nicht der Preis, sondern ob die Website Aufträge einbringt, denn ein zusätzlicher Auftrag im Jahr trägt bei den meisten Gewerken bereits die gesamten Kosten.",
      },
      {
        question: "Worauf sollte ich bei jedem Website-Anbieter achten, egal ob Baukasten oder Dienstleister?",
        answer:
          "Prüfen Sie, dass die Domain Ihnen selbst gehört und nicht dem Baukasten oder der Agentur, und fragen Sie vorher, wie Sie bei einem Wechsel an Ihre Texte und Bilder kommen. Außerdem ist das Google-Unternehmensprofil für die lokale Suche oft wichtiger als die Website selbst und zusätzlich kostenlos.",
      },
    ],
  },
  {
    slug: "firmen-email-adresse-einrichten",
    title: "Firmen-E-Mail-Adresse einrichten: Was kleine Betriebe vorher wissen sollten",
    seoTitle: "Firmen-E-Mail-Adresse einrichten: Anleitung",
    metaDescription:
      "Was eine E-Mail-Adresse auf eigener Domain kostet und welche drei Einträge darüber entscheiden, ob Ihre Angebote im Spam-Ordner landen.",
    excerpt:
      "Eine E-Mail-Adresse auf der eigenen Domain ist schnell angelegt – und genauso schnell falsch eingerichtet. Was es kostet, welche drei Einträge über die Zustellung entscheiden und warum ein GMX-Postfach im Geschäftsverkehr ein Risiko ist.",
    category: "microsoft-it",
    publishedAt: "2026-10-11",
    readingMinutes: 7,
    icon: "Mail",
    relatedSlugs: ["microsoft-365-statt-einzelloesungen", "it-sicherheit-handwerksbetriebe-fehler"],
    faq: [
      {
        question: "Warum ist ein GMX- oder T-Online-Postfach für den Geschäftsbetrieb ungünstig?",
        answer:
          "Eine solche Adresse gehört Ihnen nicht persönlich: Scheidet der Mitarbeiter aus, auf dessen Namen das Postfach läuft, ist der gesamte Schriftverkehr samt Angeboten und Terminen weg. Zusätzlich wirkt sie im Vergleich schwächer als eine Firmendomain und lässt sich nicht mit SPF, DKIM und DMARC absichern.",
      },
      {
        question: "Was sind SPF, DKIM und DMARC und warum braucht meine Firmen-E-Mail diese Einträge?",
        answer:
          "SPF legt fest, welche Server in Ihrem Namen E-Mails verschicken dürfen, DKIM versieht Mails mit einer digitalen Signatur, die Fälschungen erkennbar macht, und DMARC bestimmt, was mit gefälschten Mails passiert und liefert Missbrauchsberichte. Fehlen diese Einträge, kann jeder Fremde Mails mit Ihrer Firmenadresse als Absender verschicken, zum Beispiel eine Rechnung mit falscher Bankverbindung.",
      },
      {
        question: "Wie teuer und aufwendig ist die Einrichtung einer eigenen Firmen-E-Mail-Adresse?",
        answer:
          "Die Domain selbst kostet wenige Euro im Jahr, Postfächer liegen bei ein bis drei Euro pro Monat beim Hoster oder sind in Microsoft 365 enthalten. Die einmalige Einrichtung von Domain und Adressen liegt zwischen 79 und 149 Euro, wobei die vollständige Absicherung mit DMARC über zwei bis vier Wochen Beobachtung läuft, damit keine legitimen Mails verloren gehen.",
      },
    ],
  },
  {
    slug: "e-rechnungspflicht-handwerksbetriebe",
    title: "E-Rechnungspflicht: Was Handwerksbetriebe bis 2027 und 2028 umstellen müssen",
    seoTitle: "E-Rechnungspflicht 2027 und 2028 im Handwerk",
    metaDescription:
      "Empfangen Pflicht seit 2025, Versand ab 2027 über 800.000 Euro Umsatz, ab 2028 für alle. Welche Frist für Ihren Betrieb gilt und was nötig ist.",
    excerpt:
      "Empfangen müssen Sie E-Rechnungen schon seit 2025. Ab Januar 2027 müssen Betriebe mit mehr als 800.000 Euro Vorjahresumsatz auch selbst welche verschicken, ab 2028 alle. Welche Fristen für wen gelten, warum ein PDF keine E-Rechnung ist und was technisch wirklich nötig ist.",
    category: "digitalisierung",
    publishedAt: "2026-10-11",
    readingMinutes: 8,
    icon: "Workflow",
    relatedSlugs: ["digitalisierung-handwerk-zeit-sparen", "microsoft-365-statt-einzelloesungen"],
    faq: [
      {
        question: "Ab wann muss mein Handwerksbetrieb E-Rechnungen empfangen und versenden können?",
        answer:
          "Empfangen müssen Sie E-Rechnungen bereits seit dem 1. Januar 2025, ohne Ausnahme und ohne Übergangsfrist. Selbst verschicken müssen Sie sie ab dem 1. Januar 2027, wenn Ihr Gesamtumsatz im Vorjahr über 800.000 Euro lag, und spätestens ab dem 1. Januar 2028 unabhängig vom Umsatz.",
      },
      {
        question: "Ist eine normale PDF-Rechnung per E-Mail bereits eine E-Rechnung?",
        answer:
          "Nein, eine PDF-Rechnung per E-Mail gilt rechtlich als „sonstige Rechnung“ und nicht als E-Rechnung. Eine echte E-Rechnung ist ein strukturierter Datensatz nach der europäischen Norm EN 16931, in Deutschland meist als XRechnung oder als ZUGFeRD-Mischformat mit eingebetteten Daten in einer lesbaren PDF-Datei.",
      },
      {
        question: "Wer ist von der E-Rechnungspflicht ausgenommen?",
        answer:
          "Ausgenommen sind Rechnungen an Privatkunden, da die Pflicht nur zwischen Unternehmen im Inland gilt, sowie Kleinbetragsrechnungen bis 250 Euro brutto. Kleinunternehmer nach Paragraf 19 UStG sind dauerhaft vom Ausstellen befreit, müssen E-Rechnungen aber trotzdem empfangen können.",
      },
    ],
  },
  {
    slug: "ki-im-handwerksbetrieb",
    title: "KI im Handwerksbetrieb: Was sich heute wirklich lohnt – und was nicht",
    seoTitle: "KI im Handwerksbetrieb: Was sich wirklich lohnt",
    excerpt:
      "Zwischen Werbeversprechen und Alltag liegt eine große Lücke. Drei Einsätze, die in einem Handwerksbetrieb heute schon Zeit sparen, drei die es nicht tun – und die Datenschutzfrage, die vorher geklärt sein muss.",
    metaDescription:
      "Welche KI-Anwendungen einem Handwerksbetrieb heute wirklich Zeit sparen, welche nicht – und was beim Datenschutz vorher geklärt sein muss.",
    category: "digitalisierung",
    publishedAt: "2026-10-11",
    readingMinutes: 7,
    icon: "Sparkles",
    relatedSlugs: ["digitalisierung-handwerk-zeit-sparen", "microsoft-365-statt-einzelloesungen"],
    faq: [
      {
        question: "Wofür lohnt sich KI in einem Handwerksbetrieb heute wirklich?",
        answer:
          "Am meisten bringt KI dort, wo geschrieben und sortiert wird: Angebots- und Kundentexte formulieren, Sprachnotizen von der Baustelle in Text umwandeln und lange Dokumente wie Ausschreibungsunterlagen zusammenfassen. Das sind unspektakuläre Einsätze, die trotzdem jede Woche Zeit sparen.",
      },
      {
        question: "Sollte ich KI für die Kalkulation von Angeboten oder als Telefonassistenten einsetzen?",
        answer:
          "Nein, ein Sprachmodell rechnet nicht, es formuliert, und liegt bei Zahlen regelmäßig daneben – dafür ist Handwerkersoftware die richtige Wahl. Telefonassistenten merken Anrufer meist sofort als Maschine und legen auf, besonders im Notfall, weshalb ein Mensch, der zurückruft, aktuell das bessere System ist.",
      },
      {
        question: "Was muss ich beim Datenschutz beachten, bevor ich KI-Werkzeuge im Betrieb einsetze?",
        answer:
          "Sobald Kundendaten, Angebote oder Verträge in ein KI-Werkzeug eingegeben werden, verlassen diese Daten den Betrieb, was bei personenbezogenen Daten eine saubere Grundlage braucht. Sinnvoll sind entweder Geschäftsvarianten großer Anbieter mit vertraglicher Zusicherung zur Verarbeitung in Europa, etwa Microsoft Copilot im Microsoft-365-Vertrag, oder die Regel, nur anonymisierte Inhalte einzugeben.",
      },
    ],
  },
  {
    slug: "digitale-unterschrift-handwerk",
    title: "Digitale Unterschrift im Handwerk: Was rechtsgültig ist und was nicht",
    seoTitle: "Digitale Unterschrift im Handwerk: rechtsgültig?",
    excerpt:
      "Angebot, Auftragsbestätigung und Abnahmeprotokoll lassen sich auf dem Tablet unterschreiben – und das ist rechtlich unkomplizierter, als die meisten denken. Bei zwei Dokumenten geht es dagegen gar nicht, auch nicht mit teurer Software.",
    metaDescription:
      "Welche Dokumente im Handwerk digital unterschrieben werden dürfen, welche drei Signaturstufen es gibt und wo die elektronische Form gesetzlich ausgeschlossen ist.",
    category: "digitalisierung",
    publishedAt: "2026-10-11",
    readingMinutes: 7,
    icon: "BadgeCheck",
    relatedSlugs: ["ki-im-handwerksbetrieb", "digitalisierung-handwerk-zeit-sparen"],
    faq: [
      {
        question: "Welche Dokumente darf ich im Handwerksbetrieb digital unterschreiben lassen?",
        answer:
          "Angebot, Auftragsbestätigung, Abnahmeprotokoll und Stundenzettel sind gesetzlich formfrei, dafür genügt eine einfache elektronische Signatur, etwa mit dem Finger auf dem Tablet. Auch der Werkvertrag mit der Kundschaft war schon immer formfrei und lässt sich digital genauso wirksam abschließen wie auf Papier.",
      },
      {
        question: "Bei welchen Dokumenten funktioniert eine digitale Unterschrift gar nicht?",
        answer:
          "Die Kündigung eines Arbeitsverhältnisses und eine Bürgschaft müssen zwingend auf Papier unterschrieben werden, da das Gesetz dort die elektronische Form ausdrücklich ausschließt. Eine per Mail oder Signaturdienst verschickte Kündigung ist deshalb unwirksam.",
      },
      {
        question: "Ist eine einfache elektronische Unterschrift auf dem Tablet im Streitfall genug Beweis?",
        answer:
          "Gültigkeit und Beweiskraft sind zwei verschiedene Dinge: Eine einfache Signatur ist rechtlich gültig, aber bestreitet der Kunde später die Unterschrift, ist ein bloßes Unterschriftsbild ein schwacher Beweis. Für den Alltag reicht das fast immer, bei großen Aufträgen oder schwierigerer Kundschaft ist die fortgeschrittene elektronische Signatur die ruhigere Wahl.",
      },
    ],
  },
  {
    slug: "foerderung-digitalisierung-handwerk",
    title: "Förderung für Digitalisierung im Handwerk: Wie es funktioniert und was Betriebe falsch machen",
    seoTitle: "Digitalisierung im Handwerk: Förderung beantragen",
    excerpt:
      "Der teuerste Fehler passiert vor dem Antrag: Wer den Auftrag schon erteilt hat, bekommt in der Regel nichts mehr. Wie Förderung grundsätzlich abläuft, was Sie vorbereiten sollten und wo Sie den aktuellen Stand prüfen.",
    metaDescription:
      "Wie Digitalisierungsförderung im Handwerk abläuft, warum der Antrag vor dem Auftrag kommen muss und wo Sie den aktuellen Stand der Programme prüfen.",
    category: "digitalisierung",
    publishedAt: "2026-10-11",
    readingMinutes: 7,
    icon: "TrendingUp",
    relatedSlugs: ["digitalisierung-handwerk-zeit-sparen", "ki-im-handwerksbetrieb"],
    faq: [
      {
        question: "Was ist der häufigste Fehler, durch den Handwerksbetriebe ihre Digitalisierungsförderung verlieren?",
        answer:
          "Der Antrag muss vor der verbindlichen Bestellung oder Auftragserteilung gestellt sein, denn als Vorhabensbeginn gilt bereits der Auftrag, nicht der eigentliche Baustart. Wer zuerst beauftragt und erst danach den Antrag stellt, bekommt nichts, egal wie förderfähig das Vorhaben inhaltlich gewesen wäre.",
      },
      {
        question: "Welche Arten von Förderung gibt es für die Digitalisierung im Handwerk?",
        answer:
          "Es gibt Beratungsförderung, die externe Beratung statt der Software selbst bezuschusst, Investitionszuschüsse, die üblicherweise 30 bis 50 Prozent der Investitionskosten bis zu einem Höchstbetrag erstatten, sowie zinsgünstige Kredite mit besseren Konditionen als bei der Hausbank.",
      },
      {
        question: "Welche Unterlagen brauche ich, um schnell einen Förderantrag stellen zu können?",
        answer:
          "Nötig sind eine kurze Beschreibung des Vorhabens, ein belastbares Angebot des Dienstleisters mit Leistungsumfang und Preis, die Eckdaten des Betriebs wie Beschäftigtenzahl, Umsatz und Rechtsform, sowie ein grober Zeitplan. Wer das vorbereitet hat, kann innerhalb weniger Tage einen Antrag stellen, sobald ein Förderaufruf öffnet, da diese oft schnell wieder schließen.",
      },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(category: ArticleCategory): Article[] {
  return articles.filter((article) => article.category === category);
}

export function getRelatedArticles(article: Article): Article[] {
  return article.relatedSlugs
    .map((slug) => getArticleBySlug(slug))
    .filter((a): a is Article => Boolean(a));
}

export function formatArticleDate(iso: string): string {
  return new Date(iso).toLocaleDateString("de-DE", { year: "numeric", month: "long", day: "numeric" });
}
