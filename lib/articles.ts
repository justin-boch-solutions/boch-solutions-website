export type ArticleCategory = "microsoft-it" | "sichtbarkeit" | "digitalisierung";

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
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
    excerpt:
      "Privates Gmail-Postfach, Excel-Terminplan, WhatsApp fürs Team: Viele Handwerksbetriebe arbeiten mit einer gewachsenen IT aus Einzellösungen. Warum eine gemeinsame Microsoft-365-Basis langfristig weniger Aufwand macht.",
    category: "microsoft-it",
    publishedAt: "2026-05-04",
    readingMinutes: 6,
    icon: "Cloud",
    relatedSlugs: ["it-sicherheit-handwerksbetriebe-fehler", "digitalisierung-handwerk-zeit-sparen"],
  },
  {
    slug: "it-sicherheit-handwerksbetriebe-fehler",
    title: "IT-Sicherheit für Handwerksbetriebe: 5 häufige Fehler und wie man sie vermeidet",
    excerpt:
      "Handwerksbetriebe sind für Cyberkriminelle ein lohnendes Ziel, weil die IT oft historisch gewachsen und ungesichert ist. Die fünf häufigsten Sicherheitslücken – und was dagegen wirklich hilft.",
    category: "microsoft-it",
    publishedAt: "2026-05-18",
    readingMinutes: 7,
    icon: "ShieldCheck",
    relatedSlugs: ["microsoft-365-statt-einzelloesungen", "website-relaunch-handwerksbetrieb-vertrieb"],
  },
  {
    slug: "lokales-seo-handwerksbetriebe",
    title: "Lokales SEO für Handwerksbetriebe: So werden Sie bei „Handwerker in [Ort]“ gefunden",
    excerpt:
      "Die meisten Kundenanfragen im Handwerk beginnen heute mit einer Google-Suche in der eigenen Region. Was lokales SEO konkret bedeutet und mit welchen Hebeln Handwerksbetriebe realistisch mehr Sichtbarkeit erreichen.",
    category: "sichtbarkeit",
    publishedAt: "2026-06-01",
    readingMinutes: 7,
    icon: "MapPin",
    relatedSlugs: ["geo-generative-engine-optimization-handwerk", "website-relaunch-handwerksbetrieb-vertrieb"],
  },
  {
    slug: "geo-generative-engine-optimization-handwerk",
    title: "GEO erklärt: Wie Handwerksbetriebe in ChatGPT, Copilot und Gemini empfohlen werden",
    excerpt:
      "Immer mehr Menschen fragen KI-Assistenten statt Google. Was Generative Engine Optimization (GEO) ist, warum sie sich von klassischem SEO unterscheidet und wie Handwerksbetriebe dort sichtbar werden.",
    category: "sichtbarkeit",
    publishedAt: "2026-06-15",
    readingMinutes: 6,
    icon: "Sparkles",
    relatedSlugs: ["lokales-seo-handwerksbetriebe", "microsoft-365-statt-einzelloesungen"],
  },
  {
    slug: "digitalisierung-handwerk-zeit-sparen",
    title: "Digitalisierung im Handwerk: Drei Schritte, mit denen Betriebe am meisten Zeit sparen",
    excerpt:
      "Digitalisierung klingt nach großem Projekt – dabei sparen oft drei gezielte Schritte im Büroalltag am meisten Zeit. Ein realistischer Fahrplan ohne Buzzword-Overload.",
    category: "digitalisierung",
    publishedAt: "2026-06-29",
    readingMinutes: 6,
    icon: "Workflow",
    relatedSlugs: ["microsoft-365-statt-einzelloesungen", "website-relaunch-handwerksbetrieb-vertrieb"],
  },
  {
    slug: "website-relaunch-handwerksbetrieb-vertrieb",
    title: "Website-Relaunch für Handwerksbetriebe: Was eine Webseite wirklich zur Vertriebsmaschine macht",
    excerpt:
      "Eine neue Webseite allein bringt noch keine Anfragen. Welche Bausteine tatsächlich darüber entscheiden, ob Besucher zu Kunden werden – und worauf Handwerksbetriebe bei einem Relaunch achten sollten.",
    category: "digitalisierung",
    publishedAt: "2026-07-13",
    readingMinutes: 7,
    icon: "LayoutTemplate",
    relatedSlugs: ["lokales-seo-handwerksbetriebe", "it-sicherheit-handwerksbetriebe-fehler"],
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
