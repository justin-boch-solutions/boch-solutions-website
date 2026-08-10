import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { ArticleCard } from "@/components/sections/article-card";
import { articleCategoryMeta, articles, getArticlesByCategory, type ArticleCategory } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Magazin",
  description:
    "Praxisnahe Artikel zu Microsoft 365, IT-Sicherheit, lokalem SEO, GEO-Optimierung und Digitalisierung für Handwerksbetriebe – vom Team von Justin Boch - Solutions.",
  alternates: {
    canonical: "/magazin",
    types: { "application/rss+xml": "/magazin/feed.xml" },
  },
};

const categories: ArticleCategory[] = ["microsoft-it", "sichtbarkeit", "digitalisierung"];

export default function MagazinPage() {
  const sorted = [...articles].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  return (
    <>
      <Hero
        eyebrow="Magazin"
        title="Praxiswissen für digitale Handwerksbetriebe"
        subtitle="Konkrete Artikel zu Microsoft 365, IT-Sicherheit, lokaler Sichtbarkeit und Digitalisierung – ohne Buzzword-Overload, geschrieben für Handwerksbetriebe."
      />

      <Section eyebrow="Neueste Artikel" title="Alle Artikel">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((article, index) => (
            <ArticleCard key={article.slug} article={article} delay={(index % 3) * 90} />
          ))}
        </div>
      </Section>

      {categories.map((category) => {
        const items = getArticlesByCategory(category);
        if (items.length === 0) return null;
        return (
          <Section
            key={category}
            eyebrow="Themenbereich"
            title={articleCategoryMeta[category].label}
            className="border-t border-border bg-surface/30"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((article, index) => (
                <ArticleCard key={article.slug} article={article} delay={(index % 3) * 90} />
              ))}
            </div>
          </Section>
        );
      })}

      <p className="pb-16 text-center text-sm text-muted">
        Neue Artikel auch per{" "}
        <a href="/magazin/feed.xml" className="underline hover:text-foreground">
          RSS-Feed
        </a>
        .
      </p>
    </>
  );
}
