import { Clock } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { ArticleCard } from "@/components/sections/article-card";
import { ReadingProgressRail } from "@/components/sections/reading-progress-rail";
import { CtaSection } from "@/components/sections/cta-section";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { articleCategoryMeta, formatArticleDate, getRelatedArticles, type Article } from "@/lib/articles";
import { company } from "@/lib/constants";

export function ArticleLayout({ article, children }: { article: Article; children: React.ReactNode }) {
  const related = getRelatedArticles(article);
  const url = `${company.url}/magazin/${article.slug}`;

  return (
    <>
      <ArticleJsonLd
        title={article.title}
        description={article.excerpt}
        url={url}
        datePublished={article.publishedAt}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Startseite", url: company.url },
          { name: "Magazin", url: `${company.url}/magazin` },
          { name: article.title, url },
        ]}
      />

      <Hero
        eyebrow={articleCategoryMeta[article.category].label}
        title={article.title}
        subtitle={article.excerpt}
        breadcrumb={[
          { name: "Startseite", href: "/" },
          { name: "Magazin", href: "/magazin" },
          { name: article.title },
        ]}
        size="compact"
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 flex items-center gap-3 text-sm text-muted">
            <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
            <span aria-hidden>·</span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" />
              {article.readingMinutes} Min. Lesezeit
            </span>
          </div>

          <ReadingProgressRail className="space-y-5 text-base leading-relaxed text-muted [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2:first-child]:mt-0 [&_li]:leading-relaxed [&_p]:text-base [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
            {children}
          </ReadingProgressRail>
        </div>
      </Section>

      {related.length ? (
        <Section eyebrow="Weiterlesen" title="Das könnte Sie auch interessieren" className="border-t border-border bg-surface/30">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {related.map((relatedArticle, index) => (
              <ArticleCard key={relatedArticle.slug} article={relatedArticle} delay={index * 100} />
            ))}
          </div>
        </Section>
      ) : null}

      <CtaSection />
    </>
  );
}
