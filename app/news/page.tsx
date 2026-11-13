import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { ArticleCard } from "@/components/sections/article-card";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "News",
  description:
    "Aktuelle Meldungen zu Microsoft 365, IT-Sicherheit und Störungen – eingeordnet für Handwerksbetriebe im Münsterland: Was passiert ist und was Sie jetzt tun sollten.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  const news = articles
    .filter((article) => article.news)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  return (
    <>
      <Hero
        eyebrow="News"
        title="Aktuelles aus Microsoft 365 und IT-Sicherheit"
        subtitle="Störungen, Sicherheitslücken und Änderungen, die Handwerksbetriebe betreffen – kurz eingeordnet, mit dem, was Sie konkret tun sollten."
        size="compact"
      />

      <Section>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((article, index) => (
            <ArticleCard key={article.slug} article={article} delay={(index % 3) * 90} />
          ))}
        </div>
        <p className="mt-12 text-center text-sm text-muted">
          Ausführliche Ratgeber finden Sie im{" "}
          <Link href="/magazin" className="underline hover:text-foreground">
            Magazin
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
