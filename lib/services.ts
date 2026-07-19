export type ServiceCluster = "infrastruktur" | "sichtbarkeit" | "digitalisierung";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Service {
  slug: string;
  cluster: ServiceCluster;
  name: string;
  shortName: string;
  icon: string;
  shortDescription: string;
  heroSummary: string;
  problem: string[];
  solution: string[];
  audience: string[];
  faq: FaqItem[];
  relatedSlugs: string[];
}

export const clusterMeta: Record<ServiceCluster, { label: string; description: string }> = {
  infrastruktur: {
    label: "Microsoft-Infrastruktur & Sicherheit",
    description:
      "Die technische Basis Ihres Betriebs: E-Mail, Lizenzen, Domain, Support und Sicherheit – alles auf Microsoft-Technologie aufgebaut.",
  },
  sichtbarkeit: {
    label: "Sichtbarkeit & Wachstum",
    description:
      "Damit Kundschaft Sie bei Google und in der KI-Suche findet – und Ihre Webseite überzeugt, sobald sie da ist.",
  },
  digitalisierung: {
    label: "Digitalisierung & Automatisierung",
    description:
      "Individuelle Software und automatisierte Abläufe, die Ihrem Team Zeit im Tagesgeschäft zurückgeben.",
  },
};

export const services: Service[] = [
  {
    slug: "microsoft-365-azure",
    cluster: "infrastruktur",
    name: "Microsoft 365 & Azure für Handwerksbetriebe",
    shortName: "Microsoft 365 & Azure",
    icon: "Cloud",
    shortDescription:
      "Einrichtung und Modernisierung Ihrer IT-Infrastruktur auf Basis von Microsoft 365 und Azure – von E-Mail bis Teams-Telefonie.",
    heroSummary:
      "Microsoft 365 & Azure für Handwerksbetriebe bedeutet: eine zentrale, sichere IT-Umgebung für E-Mail, Dateien, Termine und Kommunikation, eingerichtet und betreut von JB Solutions – statt verstreuter Insellösungen auf Baustellen-Laptop, privatem Handy und altem Server.",
    problem: [
      "IT ist über Jahre gewachsen: alte Server, private E-Mail-Postfächer, keine zentrale Ablage.",
      "Mitarbeitende auf der Baustelle haben keinen verlässlichen Zugriff auf Aufträge, Pläne oder Termine.",
      "Bei Ausfall eines Rechners sind Daten unwiederbringlich weg, es gibt kein Backup-Konzept.",
    ],
    solution: [
      "Einrichtung von Microsoft 365 (Exchange, OneDrive, SharePoint, Teams) passend zur Betriebsgröße.",
      "Zentrale Nutzerverwaltung mit Azure Active Directory / Entra ID – ein Login für alles.",
      "Microsoft Teams als Telefonie- und Kommunikationslösung für Büro und Baustelle.",
      "Automatisierte Backups und Wiederherstellungskonzept für alle Firmendaten.",
      "Einrichtung auf Mobilgeräten, damit Baustellenteams von unterwegs auf Pläne und Aufträge zugreifen.",
    ],
    audience: [
      "Betriebe mit veralteter oder gewachsener IT ohne klare Struktur",
      "Betriebe, die Büro und Baustelle digital verbinden wollen",
      "Betriebe ohne eigene IT-Abteilung, die einen verlässlichen Partner suchen",
    ],
    faq: [
      {
        question: "Ist Microsoft 365 auch für einen kleinen Handwerksbetrieb mit 3–5 Mitarbeitenden sinnvoll?",
        answer:
          "Ja. Microsoft 365 skaliert nach Nutzerzahl und Lizenzmodell, sodass auch kleine Betriebe eine professionelle, sichere IT-Umgebung erhalten, ohne einen eigenen Server betreiben zu müssen.",
      },
      {
        question: "Müssen wir während der Umstellung den Betrieb unterbrechen?",
        answer:
          "Nein. Die Einrichtung erfolgt schrittweise und in Abstimmung mit Ihrem Arbeitsalltag, sodass Sie während der Umsetzung normal weiterarbeiten können.",
      },
      {
        question: "Was passiert mit unseren bisherigen Daten und E-Mails?",
        answer:
          "Bestehende Daten, Postfächer und Dateien werden im Rahmen der Einrichtung sauber in die neue Microsoft-365-Umgebung migriert, nichts geht verloren.",
      },
    ],
    relatedSlugs: ["microsoft-lizenzierung", "email-optimierung", "it-support-wartung"],
  },
  {
    slug: "microsoft-lizenzierung",
    cluster: "infrastruktur",
    name: "Microsoft-Lizenzierung",
    shortName: "Microsoft-Lizenzierung",
    icon: "BadgeCheck",
    shortDescription:
      "Beratung und Beschaffung der passenden Microsoft-365-Lizenzen – ohne Überzahlung für Funktionen, die niemand nutzt.",
    heroSummary:
      "Microsoft-Lizenzierung durch JB Solutions bedeutet: Sie erhalten genau die Microsoft-365-Business-Lizenzen, die zu Betriebsgröße, Nutzung und Budget Ihres Handwerksbetriebs passen, mit laufender Anpassung statt einmaligem Verkauf.",
    problem: [
      "Unklarheit, welches Microsoft-365-Paket (Business Basic, Standard, Premium) tatsächlich benötigt wird.",
      "Bereits vorhandene Lizenzen werden nicht vollständig genutzt oder sind falsch zugeordnet.",
      "Keine Übersicht über laufende Kosten pro Mitarbeitendem und Kündigungsfristen.",
    ],
    solution: [
      "Bedarfsanalyse: welche Funktionen (E-Mail, Office-Apps, Teams-Telefonie, erweiterte Sicherheit) wirklich gebraucht werden.",
      "Beschaffung und Verwaltung der passenden Lizenzen über einen Microsoft-Partnerkanal.",
      "Laufende Anpassung bei Mitarbeiterwechsel, Wachstum oder saisonalen Schwankungen.",
      "Transparente Kostenübersicht statt versteckter Zusatzgebühren.",
    ],
    audience: [
      "Betriebe, die aktuell privat oder ohne klares Lizenzmodell arbeiten",
      "Betriebe mit wachsendem Team und unklarer Lizenzstruktur",
      "Betriebe, die Kosten prüfen und optimieren wollen",
    ],
    faq: [
      {
        question: "Welches Microsoft-365-Paket passt zu einem Handwerksbetrieb?",
        answer:
          "Das hängt von Teamgröße, Mobilarbeit und Sicherheitsanforderungen ab. In der Bedarfsanalyse ermitteln wir gemeinsam, ob Business Basic, Standard oder Premium sinnvoll ist – häufig reicht für Baustellenteams weniger, als Anbieter zunächst vorschlagen.",
      },
      {
        question: "Können Lizenzen später angepasst oder gekündigt werden?",
        answer:
          "Ja, Lizenzen lassen sich bei Bedarf hoch- oder herunterstufen. Wir behalten die Laufzeiten im Blick, damit keine unnötigen Kosten entstehen.",
      },
    ],
    relatedSlugs: ["microsoft-365-azure", "it-support-wartung", "cloud-sicherheit-dsgvo"],
  },
  {
    slug: "email-optimierung",
    cluster: "infrastruktur",
    name: "E-Mail-Optimierung & Migration",
    shortName: "E-Mail-Optimierung",
    icon: "Mail",
    shortDescription:
      "Professionelle E-Mail-Adressen auf der eigenen Domain, sichere Zustellung und saubere Migration alter Postfächer.",
    heroSummary:
      "E-Mail-Optimierung durch JB Solutions bedeutet: professionelle Adressen wie name@ihrbetrieb.de über Microsoft 365 Exchange, korrekt eingerichtete Zustellsicherheit (SPF, DKIM, DMARC) und eine saubere Migration bestehender Postfächer ohne Datenverlust.",
    problem: [
      "Geschäftliche Anfragen laufen über private Gmail- oder Web.de-Adressen.",
      "E-Mails landen bei Kunden im Spam-Ordner, weil technische Sicherheitseinstellungen fehlen.",
      "Beim Ausscheiden von Mitarbeitenden gehen E-Mail-Verläufe und Kundenkontakte verloren.",
    ],
    solution: [
      "Einrichtung professioneller E-Mail-Adressen auf Ihrer eigenen Domain über Microsoft 365 Exchange.",
      "Konfiguration von SPF, DKIM und DMARC für zuverlässige Zustellung ohne Spam-Einstufung.",
      "Migration bestehender Postfächer, Kontakte und E-Mail-Verläufe.",
      "Gemeinsame Postfächer und Verteiler für Büro, Vertrieb und Bauleitung.",
      "Mobile Einrichtung, damit E-Mails auch unterwegs zuverlässig ankommen.",
    ],
    audience: [
      "Betriebe mit privaten oder freien E-Mail-Adressen im Geschäftsverkehr",
      "Betriebe mit Zustellproblemen (Spam-Ordner, verzögerte Zustellung)",
      "Betriebe im Wechsel des E-Mail-Anbieters",
    ],
    faq: [
      {
        question: "Gehen bei der Migration alte E-Mails verloren?",
        answer:
          "Nein. Bestehende Postfächer, Ordnerstrukturen und Kontakte werden im Rahmen der Migration übernommen. Wir prüfen den Erfolg vor Abschluss der Umstellung.",
      },
      {
        question: "Warum landen unsere E-Mails aktuell oft im Spam?",
        answer:
          "Meist fehlen technische Einträge (SPF, DKIM, DMARC) im Domain-Verzeichnis, die E-Mail-Anbietern die Echtheit Ihrer Nachrichten bestätigen. Wir richten diese korrekt ein.",
      },
    ],
    relatedSlugs: ["domain-einrichtung", "microsoft-365-azure", "cloud-sicherheit-dsgvo"],
  },
  {
    slug: "domain-einrichtung",
    cluster: "infrastruktur",
    name: "Domain-Einrichtung",
    shortName: "Domain-Einrichtung",
    icon: "Globe",
    shortDescription:
      "Registrierung, Umzug und technische Einrichtung Ihrer Wunsch-Domain – als Basis für Webseite, E-Mail und Google-Auffindbarkeit.",
    heroSummary:
      "Domain-Einrichtung durch JB Solutions bedeutet: Registrierung oder Umzug Ihrer Firmendomain, korrekte DNS-Konfiguration für Webseite und E-Mail sowie eine Struktur, die dauerhaft in Ihrem Besitz bleibt statt beim Webdesigner zu verwaiten.",
    problem: [
      "Die Domain liegt noch bei einem früheren Dienstleister ohne eigenen Zugriff.",
      "DNS-Einstellungen sind unübersichtlich, Webseite und E-Mail laufen über verschiedene, nicht abgestimmte Anbieter.",
      "Unsicherheit, welche Domain-Endung (.de, .com) für den Betrieb sinnvoll ist.",
    ],
    solution: [
      "Registrierung neuer Domains oder Übernahme bestehender Domains mit vollem Zugriff für Sie.",
      "Saubere DNS-Konfiguration, abgestimmt auf Webseite, E-Mail und weitere Dienste.",
      "Einrichtung von Subdomains bei Bedarf (z. B. für Kundenportale oder Software).",
      "Dokumentation aller Zugangsdaten, damit Sie jederzeit selbst Zugriff haben.",
    ],
    audience: [
      "Betriebe ohne eigene Domain oder mit Domain bei einem alten Anbieter",
      "Betriebe im Wechsel von Webdesigner oder Hosting-Anbieter",
      "Betriebe, die Webseite und E-Mail technisch sauber verbinden wollen",
    ],
    faq: [
      {
        question: "Wem gehört die Domain nach der Einrichtung?",
        answer:
          "Die Domain wird ausschließlich auf Ihren Namen bzw. Ihren Betrieb registriert. Sie erhalten alle Zugangsdaten und behalten die volle Kontrolle.",
      },
      {
        question: "Können wir eine bestehende Domain einfach übernehmen?",
        answer:
          "Ja, ein Domain-Umzug (Transfer) zu einem neuen Anbieter ist in der Regel ohne Unterbrechung von Webseite oder E-Mail möglich, wenn er sauber vorbereitet wird.",
      },
    ],
    relatedSlugs: ["email-optimierung", "webdesign", "seo-geo-optimierung"],
  },
  {
    slug: "it-support-wartung",
    cluster: "infrastruktur",
    name: "IT-Support & Wartung",
    shortName: "IT-Support & Wartung",
    icon: "LifeBuoy",
    shortDescription:
      "Laufende Betreuung Ihrer Microsoft-Infrastruktur, Updates, Mitarbeiterschulungen und ein fester Ansprechpartner statt Hotline-Warteschleife.",
    heroSummary:
      "IT-Support & Wartung durch JB Solutions bedeutet: ein fester, persönlich erreichbarer Ansprechpartner für alle Fragen rund um Microsoft 365, Geräte und Software Ihres Betriebs, inklusive laufender Updates und Mitarbeiterschulungen.",
    problem: [
      "Bei IT-Problemen gibt es keinen festen Ansprechpartner, nur wechselnde Hotlines.",
      "Updates und Sicherheitspatches werden nicht regelmäßig eingespielt.",
      "Neue Mitarbeitende wissen nicht, wie Teams, Outlook oder gemeinsame Dateien funktionieren.",
    ],
    solution: [
      "Fester persönlicher Ansprechpartner für alle IT-Fragen im Betrieb.",
      "Laufende Wartung: Updates, Sicherheitspatches, Funktionskontrolle der Microsoft-365-Umgebung.",
      "Einrichtung von Microsoft-Teams-Telefonie und mobilen Geräten für neue Mitarbeitende.",
      "Kurze Schulungen zu Outlook, Teams, OneDrive & Co. für Büro- und Baustellenteam.",
      "Priorisierte Reaktionszeiten bei akuten Störungen statt allgemeiner Warteschleife.",
    ],
    audience: [
      "Betriebe ohne eigene IT-Abteilung",
      "Betriebe, die häufig neue Mitarbeitende einarbeiten",
      "Betriebe, die planbare statt reaktive IT-Betreuung wollen",
    ],
    faq: [
      {
        question: "Ist IT-Support auch für sehr kleine Teams sinnvoll?",
        answer:
          "Ja, gerade kleine Teams ohne eigene IT-Kenntnisse profitieren von einem festen Ansprechpartner, der Probleme löst, bevor sie den Betrieb ausbremsen.",
      },
      {
        question: "Wie schnell reagieren Sie bei einer Störung?",
        answer:
          "Akute Störungen werden priorisiert behandelt. Genaue Reaktionszeiten stimmen wir individuell mit Ihnen ab, abgestimmt auf die Bedeutung des betroffenen Systems für Ihren Betrieb.",
      },
    ],
    relatedSlugs: ["microsoft-365-azure", "cloud-sicherheit-dsgvo", "microsoft-lizenzierung"],
  },
  {
    slug: "cloud-sicherheit-dsgvo",
    cluster: "infrastruktur",
    name: "Cloud-Sicherheit, Backup & DSGVO",
    shortName: "Cloud-Sicherheit & DSGVO",
    icon: "ShieldCheck",
    shortDescription:
      "Backup-Konzept, Schutz vor Cyberangriffen mit Microsoft Defender und eine IT-Struktur, die die DSGVO-Anforderungen an Ihren Betrieb erfüllt.",
    heroSummary:
      "Cloud-Sicherheit, Backup & DSGVO durch JB Solutions bedeutet: automatisierte Backups, Schutz vor Phishing und Ransomware über Microsoft Defender sowie eine Dokumentation, die Ihre IT-Struktur DSGVO-konform macht – wichtig, sobald Kunden- oder Mitarbeiterdaten verarbeitet werden.",
    problem: [
      "Kein Backup-Konzept – bei Geräteausfall oder Ransomware-Angriff drohen Datenverlust und Stillstand.",
      "Unsicherheit, ob die aktuelle IT-Nutzung DSGVO-Anforderungen erfüllt.",
      "Mitarbeitende erkennen Phishing-Mails nicht und öffnen versehentlich gefährliche Anhänge.",
    ],
    solution: [
      "Einrichtung automatisierter Backups für E-Mails, Dateien und Kundendaten.",
      "Aktivierung und Konfiguration von Microsoft Defender gegen Phishing, Ransomware und Malware.",
      "Dokumentation der Datenverarbeitung und technischer Maßnahmen für Ihre DSGVO-Unterlagen.",
      "Sensibilisierung des Teams für sicheren Umgang mit E-Mails und Zugangsdaten.",
      "Mehrstufige Anmeldung (Multi-Faktor-Authentifizierung) für alle Nutzerkonten.",
    ],
    audience: [
      "Betriebe, die Kunden- oder Mitarbeiterdaten digital verarbeiten",
      "Betriebe ohne bestehendes Backup-Konzept",
      "Betriebe, die sich gegen Cyberangriffe absichern wollen",
    ],
    faq: [
      {
        question: "Ist mein Betrieb überhaupt von der DSGVO betroffen?",
        answer:
          "In der Regel ja, sobald Kunden-, Mitarbeiter- oder Bewerberdaten elektronisch verarbeitet werden – etwa in E-Mail, Terminplanung oder Angebotssoftware. Wir prüfen gemeinsam mit Ihnen, welche technischen Maßnahmen für Ihren Betrieb sinnvoll sind. Eine rechtliche Beratung zur vollständigen DSGVO-Compliance ersetzt dies nicht.",
      },
      {
        question: "Was passiert, wenn ein Laptop gestohlen wird oder ausfällt?",
        answer:
          "Mit eingerichtetem Backup und zentraler Cloud-Ablage sind Ihre Daten nicht auf dem einzelnen Gerät gespeichert, sondern sicher in Microsoft 365 hinterlegt und schnell wiederherstellbar.",
      },
    ],
    relatedSlugs: ["microsoft-365-azure", "it-support-wartung", "email-optimierung"],
  },
  {
    slug: "seo-geo-optimierung",
    cluster: "sichtbarkeit",
    name: "SEO & GEO-Optimierung",
    shortName: "SEO & GEO",
    icon: "TrendingUp",
    shortDescription:
      "Sichtbarkeit bei Google und in KI-Antwortmaschinen wie ChatGPT, Copilot und Gemini – für Suchanfragen wie 'Elektriker in der Nähe'.",
    heroSummary:
      "SEO & GEO-Optimierung durch JB Solutions bedeutet: Ihre Webseite wird sowohl für klassische Google-Suche (SEO) als auch für KI-gestützte Antwortmaschinen wie ChatGPT, Microsoft Copilot und Google Gemini (GEO – Generative Engine Optimization) sichtbar und zitierfähig aufbereitet.",
    problem: [
      "Bei der Google-Suche nach 'Handwerker in [Ort]' taucht der eigene Betrieb nicht oder erst spät auf.",
      "Immer mehr Menschen fragen KI-Assistenten statt Google – ohne strukturierte Inhalte werden Sie dort gar nicht erst genannt.",
      "Die Webseite ist technisch nicht auf lokale Suchanfragen optimiert (fehlende Ortsangaben, Ladezeiten, Struktur).",
    ],
    solution: [
      "Technische SEO-Grundlagen: Seitenstruktur, Ladezeit, mobile Darstellung, saubere Überschriften.",
      "Lokale SEO mit klarem Bezug zu Einzugsgebiet, Orten und Leistungen Ihres Betriebs.",
      "GEO-Optimierung: klar strukturierte, zitierfähige Inhalte, die von KI-Antwortmaschinen erkannt und wiedergegeben werden können.",
      "Strukturierte Daten (Schema.org) für Google und KI-Systeme, damit Leistungen und Standort korrekt erkannt werden.",
      "Laufendes Monitoring von Sichtbarkeit und Suchanfragen.",
    ],
    audience: [
      "Betriebe, die online kaum gefunden werden",
      "Betriebe mit regionalem Einzugsgebiet, die dort führend sichtbar sein wollen",
      "Betriebe, die für die wachsende KI-Suche vorbereitet sein wollen",
    ],
    faq: [
      {
        question: "Was ist der Unterschied zwischen SEO und GEO?",
        answer:
          "SEO (Suchmaschinenoptimierung) sorgt dafür, dass Ihre Webseite in klassischen Google-Ergebnissen gut platziert ist. GEO (Generative Engine Optimization) sorgt zusätzlich dafür, dass KI-Antwortmaschinen wie ChatGPT, Copilot oder Gemini Ihren Betrieb bei passenden Fragen als Quelle nennen.",
      },
      {
        question: "Wie lange dauert es, bis SEO-Maßnahmen wirken?",
        answer:
          "Erste technische Verbesserungen wirken meist innerhalb weniger Wochen, spürbare Platzierungsverbesserungen bei umkämpften Suchbegriffen brauchen in der Regel mehrere Monate kontinuierlicher Arbeit.",
      },
    ],
    relatedSlugs: ["google-unternehmensprofil", "webdesign", "domain-einrichtung"],
  },
  {
    slug: "google-unternehmensprofil",
    cluster: "sichtbarkeit",
    name: "Google-Unternehmensprofil-Optimierung",
    shortName: "Google-Unternehmensprofil",
    icon: "MapPin",
    shortDescription:
      "Vollständige Einrichtung und laufende Pflege Ihres Google-Unternehmensprofils – entscheidend für die 'Handwerker in meiner Nähe'-Suche.",
    heroSummary:
      "Google-Unternehmensprofil-Optimierung durch JB Solutions bedeutet: ein vollständig eingerichtetes, korrekt kategorisiertes und laufend gepflegtes Google-Profil, das in der Kartenansicht und lokalen Suche zuverlässig gefunden wird.",
    problem: [
      "Das Google-Profil ist unvollständig, unbestätigt oder gar nicht vorhanden.",
      "Öffnungszeiten, Leistungen oder Fotos sind veraltet oder fehlen ganz.",
      "Bewertungen werden nicht beantwortet, obwohl sie kaufentscheidend sind.",
    ],
    solution: [
      "Einrichtung oder Übernahme und Verifizierung des Google-Unternehmensprofils.",
      "Vollständige, korrekte Kategorisierung und Leistungsbeschreibung für Ihr Gewerk.",
      "Hinterlegung aktueller Öffnungszeiten, Einzugsgebiet, Fotos und Kontaktwegen.",
      "Konzept für den Umgang mit Kundenbewertungen, inklusive Antwortvorlagen.",
      "Regelmäßige Beiträge und Aktualisierungen, damit das Profil aktiv bleibt.",
    ],
    audience: [
      "Betriebe ohne oder mit unvollständigem Google-Profil",
      "Betriebe, die auf lokale Laufkundschaft und Notfallanfragen angewiesen sind",
      "Betriebe, die mehr aus vorhandenen Bewertungen herausholen wollen",
    ],
    faq: [
      {
        question: "Kostet ein Google-Unternehmensprofil etwas?",
        answer:
          "Das Profil selbst ist bei Google kostenlos. Unser Leistung besteht in der professionellen Einrichtung, Optimierung und laufenden Pflege, damit es tatsächlich Kunden bringt.",
      },
      {
        question: "Wie wichtig sind Bewertungen wirklich?",
        answer:
          "Sehr wichtig: Bei der lokalen Handwerkersuche vergleichen Kunden meist mehrere Profile direkt nebeneinander, Bewertungsanzahl und -qualität sind dabei häufig das ausschlaggebende Kriterium.",
      },
    ],
    relatedSlugs: ["seo-geo-optimierung", "webdesign", "domain-einrichtung"],
  },
  {
    slug: "webdesign",
    cluster: "sichtbarkeit",
    name: "Webdesign für Handwerksbetriebe",
    shortName: "Webdesign",
    icon: "LayoutTemplate",
    shortDescription:
      "Moderne, schnelle Webseiten, die Vertrauen schaffen und Anfragen generieren – von der Onepager bis zur vollständigen Firmenwebsite.",
    heroSummary:
      "Webdesign durch JB Solutions bedeutet: eine moderne, schnell ladende Webseite, die Ihren Betrieb professionell darstellt und gezielt darauf ausgelegt ist, Kunden- und Mitarbeiteranfragen zu generieren, statt nur digital zu existieren.",
    problem: [
      "Die bestehende Webseite ist veraltet, langsam oder auf dem Smartphone kaum bedienbar.",
      "Interessenten finden keine klare Übersicht der Leistungen oder Kontaktmöglichkeiten.",
      "Die Webseite wirkt nicht mehr zeitgemäß und schreckt potenzielle Kunden eher ab.",
    ],
    solution: [
      "Individuelles Webdesign, abgestimmt auf Gewerk, Zielgruppe und Leistungsspektrum.",
      "Technisch moderne Umsetzung (schnelle Ladezeiten, mobile Darstellung, klare Struktur).",
      "Klare Handlungsaufforderungen (Anfrage, Anruf, Termin), damit Besucher zu Anfragen werden.",
      "Integration von Google-Unternehmensprofil, SEO-Grundlagen und Kontaktformular.",
      "Von der kompakten Onepager bis zur umfangreichen Firmenwebsite mit Mitarbeitergewinnung.",
    ],
    audience: [
      "Betriebe mit veralteter oder fehlender Webseite",
      "Betriebe, die aktiv neue Kunden und Mitarbeitende über die Webseite gewinnen wollen",
      "Betriebe im Rahmen einer umfassenden Neuausrichtung (Rebranding)",
    ],
    faq: [
      {
        question: "Wie lange dauert die Erstellung einer neuen Webseite?",
        answer:
          "Je nach Umfang – von der kompakten Onepager bis zur umfangreichen Firmenwebsite mit mehreren Unterseiten – variiert der Zeitrahmen. Im Strategie-Call nennen wir Ihnen eine konkrete Einschätzung für Ihr Projekt.",
      },
      {
        question: "Kann ich die Webseite später selbst aktualisieren?",
        answer:
          "Je nach gewähltem Aufbau ist eine einfache Pflege von Texten und Bildern möglich. Für größere Änderungen und laufende technische Betreuung steht Ihnen unser Wartungs-Service zur Seite.",
      },
      {
        question: "Onepager, Firmenwebsite oder Online-Shop – was passt zu meinem Betrieb?",
        answer:
          "Eine Onepager eignet sich für eine schnelle, fokussierte Präsenz oder eine einzelne Kampagne. Eine High-End Firmenwebsite lohnt sich, wenn Sie Ihr komplettes Leistungsspektrum zeigen und aktiv Kunden sowie Mitarbeitende gewinnen wollen. Ein Online-Shop ist sinnvoll, wenn Sie Produkte oder Ersatzteile direkt online verkaufen möchten. Im Strategie-Call ordnen wir das gemeinsam ein.",
      },
      {
        question: "Verkaufen Sie auch Online-Shops für Handwerksbetriebe?",
        answer:
          "Ja. Für Betriebe, die Produkte, Ersatzteile oder Zubehör verkaufen, richten wir einen performanten Online-Shop mit Produktkatalog, Zahlungs- und Versandanbindung ein – technisch auf derselben modernen Basis wie unsere übrigen Webseiten.",
      },
    ],
    relatedSlugs: ["seo-geo-optimierung", "google-unternehmensprofil", "domain-einrichtung"],
  },
  {
    slug: "individuelle-software",
    cluster: "digitalisierung",
    name: "Individuelle Softwarelösungen",
    shortName: "Individuelle Software",
    icon: "Code2",
    shortDescription:
      "Maßgeschneiderte Software und Kundenportale für Abläufe, die keine Standardlösung abbildet – etwa Terminbuchung oder digitale Angebote.",
    heroSummary:
      "Individuelle Softwarelösungen durch JB Solutions bedeutet: maßgeschneiderte Web-Anwendungen und Kundenportale für betriebliche Abläufe, die mit Standardsoftware nicht sauber lösbar sind, aufgebaut auf Microsoft-Technologie und in Ihre bestehende IT integriert.",
    problem: [
      "Bestimmte betriebliche Abläufe laufen noch auf Papier, Excel-Listen oder unpassenden Standardprogrammen.",
      "Kunden können Termine oder Anfragen nur telefonisch stellen, was Büro und Bauleitung zusätzlich bindet.",
      "Standardsoftware bildet die eigenen Prozesse (z. B. Aufmaß, Angebot, Materialbestellung) nicht ab.",
    ],
    solution: [
      "Online-Terminbuchung, mit der Kunden selbstständig passende Termine wählen können.",
      "Digitale Angebots- und Rechnungsprozesse, abgestimmt auf Ihre bestehenden Abläufe.",
      "Kundenportale zur Einsicht von Auftragsstatus, Dokumenten oder Rechnungen.",
      "Maßgeschneiderte interne Tools und Dashboards für Planung, Material oder Personal.",
      "Integration in Ihre bestehende Microsoft-365-Umgebung statt isolierter Zusatzsoftware.",
    ],
    audience: [
      "Betriebe mit individuellen Abläufen, die Standardsoftware nicht abdeckt",
      "Betriebe mit hohem Telefon- und Verwaltungsaufwand im Büro",
      "Betriebe, die Kunden einen digitalen Self-Service bieten wollen",
    ],
    faq: [
      {
        question: "Lohnt sich individuelle Software für einen mittelständischen Handwerksbetrieb?",
        answer:
          "Wenn wiederkehrende Abläufe (Terminvergabe, Angebote, Auftragsverfolgung) aktuell viel manuelle Zeit kosten, amortisiert sich eine gezielte, schlanke Lösung meist schnell durch eingesparte Büro- und Telefonzeit.",
      },
      {
        question: "Muss die komplette Verwaltung ersetzt werden?",
        answer:
          "Nein. Individuelle Software wird gezielt für einzelne Abläufe entwickelt und in Ihre bestehende Microsoft-365-Umgebung integriert, statt bestehende Systeme komplett zu ersetzen.",
      },
    ],
    relatedSlugs: ["prozessautomatisierung", "webdesign", "microsoft-365-azure"],
  },
  {
    slug: "prozessautomatisierung",
    cluster: "digitalisierung",
    name: "Prozessautomatisierung mit Power Automate",
    shortName: "Prozessautomatisierung",
    icon: "Workflow",
    shortDescription:
      "Wiederkehrende Büroaufgaben automatisiert mit Microsoft Power Automate – von Anfrage-Weiterleitung bis Terminerinnerung.",
    heroSummary:
      "Prozessautomatisierung durch JB Solutions bedeutet: wiederkehrende, manuelle Büroaufgaben werden mit Microsoft Power Automate automatisiert, sodass Ihr Team sich auf Kunden und Baustellen statt auf Verwaltungsroutine konzentrieren kann.",
    problem: [
      "Anfragen über Webseite, E-Mail und Telefon werden manuell in verschiedene Systeme übertragen.",
      "Terminerinnerungen, Angebotsnachfassung oder Materialbestellungen laufen komplett manuell.",
      "Wiederkehrende Abläufe binden Zeit, die im Büro an anderer Stelle fehlt.",
    ],
    solution: [
      "Automatische Weiterleitung und Kategorisierung eingehender Kundenanfragen.",
      "Automatisierte Erinnerungen für Termine, Angebote und Wartungsintervalle.",
      "Verknüpfung von Formularen, E-Mail und Microsoft-365-Tools ohne manuelle Zwischenschritte.",
      "Automatisierte Dokumentenablage (z. B. Rechnungen, Aufmaße) in der richtigen Struktur.",
      "Schulung des Teams im Umgang mit den neuen automatisierten Abläufen.",
    ],
    audience: [
      "Betriebe mit hohem Anteil wiederkehrender, manueller Büroarbeit",
      "Betriebe mit mehreren Standorten oder Ansprechpartnern, die abgestimmt werden müssen",
      "Betriebe, die Wachstum ohne proportional wachsenden Verwaltungsaufwand anstreben",
    ],
    faq: [
      {
        question: "Was ist Microsoft Power Automate?",
        answer:
          "Power Automate ist ein Microsoft-Werkzeug zur Automatisierung von Abläufen zwischen verschiedenen Programmen und Diensten – zum Beispiel, um eine neue Anfrage automatisch per E-Mail zu bestätigen und im Kalender einzutragen.",
      },
      {
        question: "Brauchen wir dafür zusätzliche Software-Lizenzen?",
        answer:
          "Grundfunktionen sind häufig bereits in bestehenden Microsoft-365-Plänen enthalten. Bei umfangreicheren Automatisierungen prüfen wir gemeinsam, ob eine Erweiterung sinnvoll ist, und beziehen das in die Lizenzberatung mit ein.",
      },
    ],
    relatedSlugs: ["individuelle-software", "microsoft-365-azure", "it-support-wartung"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getServicesByCluster(cluster: ServiceCluster): Service[] {
  return services.filter((service) => service.cluster === cluster);
}

export function getRelatedServices(service: Service): Service[] {
  return service.relatedSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is Service => Boolean(s));
}
