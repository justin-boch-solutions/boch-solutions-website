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
}

export const articleCategoryMeta: Record<ArticleCategory, { label: string; icon: string }> = {
  "microsoft-it": { label: "Microsoft & IT-Sicherheit", icon: "Cloud" },
  sichtbarkeit: { label: "Sichtbarkeit & SEO", icon: "TrendingUp" },
  digitalisierung: { label: "Digitalisierung", icon: "Workflow" },
};

export const articles: Article[] = [
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
    relatedSlugs: ["firmen-email-adresse-einrichten", "e-rechnungspflicht-handwerksbetriebe"],
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
    relatedSlugs: ["webdesign-handwerksbetriebe-worauf-achten", "geo-generative-engine-optimization-handwerk"],
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
    relatedSlugs: ["e-rechnungspflicht-handwerksbetriebe", "microsoft-365-statt-einzelloesungen"],
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
    relatedSlugs: ["was-kostet-website-handwerksbetrieb", "lokales-seo-handwerksbetriebe"],
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
