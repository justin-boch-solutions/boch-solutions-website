export interface Trade {
  slug: string;
  /** Pluralform, z. B. "SHK-Betriebe" – für Überschriften und Aufzählungen. */
  name: string;
  /** Singular, z. B. "SHK-Betrieb" – für Sätze wie "als SHK-Betrieb". */
  singular: string;
  /** Dativ Plural, z. B. "SHK-Betrieben" – für "bei …" / "von …" / "Fragen von …". */
  dative: string;
  /** Die zwei bis drei betrieblichen Besonderheiten, die IT-Bedarf wirklich anders machen. */
  challenges: string[];
  /** Service-Slugs aus lib/services.ts, die für dieses Gewerk am relevantesten sind. */
  highlightedSlugs: string[];
  faq: { question: string; answer: string }[];
}

export const trades: Trade[] = [
  {
    slug: "shk",
    name: "SHK-Betriebe",
    singular: "SHK-Betrieb",
    dative: "SHK-Betrieben",
    challenges: [
      "Notdienst-Anrufe müssen auch abends und am Wochenende ankommen, nicht erst montags im Büro abgehört werden.",
      "Wartungsverträge mit wiederkehrenden Terminen laufen oft noch auf Papier oder im Kopf des Chefs statt automatisiert.",
      "Angebote und Aufmaße vor Ort werden häufig auf Zetteln erfasst und erst abends ins System übertragen.",
    ],
    highlightedSlugs: ["teams-telefonie", "prozessautomatisierung", "google-unternehmensprofil"],
    faq: [
      {
        question: "Lässt sich der Notdienst-Anruf auch auf das Handy des Monteurs weiterleiten?",
        answer:
          "Ja. Mit Teams-Telefonie landet ein Anruf auf der Festnetznummer gleichzeitig auf PC, Diensthandy und optional Tischtelefon – auch außerhalb der Bürozeiten, inklusive Anrufliste, falls doch einmal niemand abnehmen kann.",
      },
      {
        question: "Können wiederkehrende Wartungstermine automatisch erinnert werden?",
        answer:
          "Ja, über Prozessautomatisierung mit Microsoft Power Automate lassen sich Erinnerungen für fällige Wartungsverträge automatisch auslösen, statt dass jemand manuell eine Liste durchgeht.",
      },
    ],
  },
  {
    slug: "elektro",
    name: "Elektrobetriebe",
    singular: "Elektrobetrieb",
    dative: "Elektrobetrieben",
    challenges: [
      "Prüfprotokolle (E-Check) und Zählerstände werden oft auf Papier erfasst statt digital abgelegt und wiederfindbar zu sein.",
      "Neue Leistungen wie Wallbox-Installation oder PV-Anschluss finden sich auf vielen Websites gar nicht als eigene Seite.",
      "Mehrere Baustellen parallel laufen ohne zentrale Übersicht, wer gerade wo welches Material braucht.",
    ],
    highlightedSlugs: ["individuelle-software", "webdesign", "seo-geo-optimierung"],
    faq: [
      {
        question: "Können Prüfprotokolle und Dokumentationen digital statt auf Papier geführt werden?",
        answer:
          "Ja. Je nach Umfang reicht eine strukturierte Ablage in Microsoft 365, bei höherem Aufwand lohnt sich individuelle Software, die Protokolle direkt mit dem jeweiligen Auftrag verknüpft.",
      },
      {
        question: "Lohnt sich eine eigene Seite für Wallbox- oder PV-Installationen?",
        answer:
          "Ja, deutlich. Wer nach „Wallbox Installation Münster” oder „Elektriker PV-Anschluss” sucht, landet eher auf einer eigenen Leistungsseite dazu als auf einer allgemeinen „Elektroinstallation”-Seite ohne diese Begriffe.",
      },
    ],
  },
  {
    slug: "dachdecker",
    name: "Dachdeckerbetriebe",
    singular: "Dachdeckerbetrieb",
    dative: "Dachdeckerbetrieben",
    challenges: [
      "Nach Sturm oder Unwetter kommen viele Anfragen gleichzeitig, oft mit der Erwartung einer schnellen Reaktion.",
      "Fotodokumentation von Schäden für Versicherungen landet verstreut auf mehreren Handys statt an einem Ort.",
      "Termine hängen stark vom Wetter ab und müssen kurzfristig umdisponiert werden können.",
    ],
    highlightedSlugs: ["webdesign", "teams-telefonie", "microsoft-365-azure"],
    faq: [
      {
        question: "Wie reagiere ich auf einen plötzlichen Anfrage-Schub nach einem Sturm?",
        answer:
          "Mit Teams-Telefonie gehen Anrufe gleichzeitig bei mehreren Mitarbeitenden ein statt nur an einer Stelle zu verhungern, und ein vollständiges Google-Unternehmensprofil sorgt dafür, dass Betroffene Sie überhaupt finden, wenn sie gerade danach suchen.",
      },
      {
        question: "Wie bekomme ich Schadensfotos von der Baustelle zentral und sicher abgelegt?",
        answer:
          "Über eine gemeinsame Microsoft-365-Dateiablage landen Fotos direkt im richtigen Auftragsordner statt verteilt auf einzelnen Handys – abrufbar für alle Berechtigten, auch für die Kommunikation mit Versicherungen.",
      },
    ],
  },
  {
    slug: "maler",
    name: "Malerbetriebe",
    singular: "Malerbetrieb",
    dative: "Malerbetrieben",
    challenges: [
      "Viele kleinere Aufträge bedeuten viele Angebote – ohne Vorlage und Automatisierung kostet das überproportional Zeit.",
      "Referenzfotos fertiger Arbeiten fehlen auf der Website oft komplett, dabei entscheiden sie häufig über die Anfrage.",
      "Mitarbeitergewinnung ist schwierig, wenn der Internetauftritt nicht zeigt, wie der Betrieb wirklich arbeitet.",
    ],
    highlightedSlugs: ["webdesign", "seo-geo-optimierung", "prozessautomatisierung"],
    faq: [
      {
        question: "Warum sollten Referenzfotos auf der eigenen Website stehen statt nur bei Google oder Facebook?",
        answer:
          "Weil eine eigene Referenzgalerie Besucher direkt zur Kontaktaufnahme führt, statt sie auf eine andere Plattform abwandern zu lassen – und weil sie zusätzlich zur Google-Bewertung ein zweites, selbst kontrolliertes Vertrauenssignal ist.",
      },
      {
        question: "Lässt sich die Angebotserstellung bei vielen kleinen Aufträgen beschleunigen?",
        answer:
          "Teilweise ja: Wiederkehrende Textbausteine und automatisierte Erinnerungen für Nachfassen bei offenen Angeboten lassen sich über Prozessautomatisierung einrichten und sparen bei hoher Stückzahl spürbar Zeit.",
      },
    ],
  },
  {
    slug: "tischler",
    name: "Tischlereien & Schreinereien",
    singular: "Tischlerei",
    dative: "Tischlereien & Schreinereien",
    challenges: [
      "Individuelle Maßanfertigungen brauchen genaue Aufmaße, Entwürfe und Materiallisten je Auftrag statt einer Standard-Checkliste.",
      "Die Werkstatt braucht andere IT-Anforderungen als das Büro, trotzdem laufen oft beide auf derselben unpassenden Lösung.",
      "Fertige Möbelstücke und Maßanfertigungen werden auf der eigenen Website selten als Referenz gezeigt.",
    ],
    highlightedSlugs: ["individuelle-software", "webdesign", "microsoft-365-azure"],
    faq: [
      {
        question: "Lohnt sich individuelle Software für die Auftrags- und Materialverwaltung?",
        answer:
          "Bei wiederkehrenden, aber jeweils individuellen Maßanfertigungen schon – eine auf den eigenen Ablauf zugeschnittene Lösung bildet Aufmaß, Materialliste und Auftragsstatus an einer Stelle ab, statt mehrere lose Dokumente zu pflegen.",
      },
      {
        question: "Wie zeige ich fertige Maßanfertigungen am besten auf der eigenen Website?",
        answer:
          "Über eine eigene Referenzgalerie mit echten, selbst gefertigten Stücken statt Stockfotos – das ist bei individueller Tischlerarbeit oft der entscheidende Unterschied zwischen Anfrage und Absprung.",
      },
    ],
  },
];

export function getTradeBySlug(slug: string): Trade | undefined {
  return trades.find((trade) => trade.slug === slug);
}
