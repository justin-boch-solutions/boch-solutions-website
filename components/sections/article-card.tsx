import Link from "next/link";
import { Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { ServiceIcon } from "@/components/sections/service-icon";
import { articleCategoryMeta, formatArticleDate, type Article } from "@/lib/articles";

export function ArticleCard({ article, delay = 0 }: { article: Article; delay?: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <Link href={`/magazin/${article.slug}`} className="block h-full">
        <Card className="flex h-full flex-col">
          <div className="mb-4 inline-flex size-11 items-center justify-center rounded-lg bg-gradient-to-br from-accent/20 to-accent-secondary/20 text-accent-secondary">
            <ServiceIcon name={article.icon} className="size-5" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-secondary">
            {articleCategoryMeta[article.category].label}
          </p>
          <h3 className="mt-2 font-display text-lg font-semibold text-foreground">{article.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{article.excerpt}</p>
          <div className="mt-4 flex items-center gap-3 text-xs text-muted">
            <time dateTime={article.publishedAt}>{formatArticleDate(article.publishedAt)}</time>
            <span aria-hidden>·</span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" />
              {article.readingMinutes} Min. Lesezeit
            </span>
          </div>
        </Card>
      </Link>
    </Reveal>
  );
}
