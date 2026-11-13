import Link from "next/link";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import type { Article } from "@/lib/articles";

/**
 * Hinweisleiste ganz oben auf der Startseite für eine aktuelle Meldung.
 * Erscheint nur, wenn app/page.tsx eine Meldung übergibt – zum Abschalten dort
 * die Konstante auf null setzen.
 */
export function NewsBanner({ article, label }: { article: Article; label: string }) {
  return (
    <div className="border-b border-amber-500/30 bg-amber-500/10">
      <Container size="wide">
        <Link
          href={`/magazin/${article.slug}`}
          className="group flex items-center gap-3 py-3 text-sm text-foreground"
        >
          <AlertTriangle className="size-4 shrink-0 text-amber-500" />
          <span className="min-w-0 flex-1">
            <span className="font-semibold">{label}</span>{" "}
            <span className="text-muted">Was betroffen ist und was Ihr Betrieb jetzt tun sollte.</span>
          </span>
          <span className="hidden shrink-0 items-center gap-1 font-medium text-accent-secondary group-hover:underline sm:inline-flex">
            Zum Artikel <ArrowRight className="size-4" />
          </span>
          <ArrowRight className="size-4 shrink-0 text-accent-secondary sm:hidden" />
        </Link>
      </Container>
    </div>
  );
}
