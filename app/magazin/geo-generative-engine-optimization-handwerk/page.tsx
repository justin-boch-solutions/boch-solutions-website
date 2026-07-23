import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/sections/article-layout";
import { getArticleBySlug } from "@/lib/articles";

const article = getArticleBySlug("geo-generative-engine-optimization-handwerk")!;

export const metadata: Metadata = {
  title: article.title,
  description: article.excerpt,
  alternates: { canonical: `/magazin/${article.slug}` },
};

export default function ArticlePage() {
  return (
    <ArticleLayout article={article}>
      <p>
        <strong>Kurz gesagt:</strong> GEO steht für Generative Engine Optimization – die Optimierung
        dafür, dass KI-Antwortmaschinen wie ChatGPT, Microsoft Copilot oder Google Gemini einen Betrieb
        bei passenden Fragen als Antwort nennen. Für Handwerksbetriebe wird das zunehmend relevant, weil
        immer mehr Menschen solche Assistenten statt einer klassischen Google-Suche nutzen.
      </p>

      <h2>Was GEO von klassischem SEO unterscheidet</h2>
      <p>
        Klassisches SEO optimiert dafür, in einer Liste von Suchergebnissen möglichst weit oben zu
        erscheinen – der Nutzer entscheidet selbst, welches Ergebnis er anklickt. Bei einer Anfrage an
        einen KI-Assistenten gibt es dagegen meist nur eine formulierte Antwort, in der ein oder wenige
        Betriebe konkret genannt werden. Es geht also nicht mehr nur darum, gefunden zu werden, sondern
        darum, in der Antwort selbst vorzukommen.
      </p>

      <h2>Woher KI-Assistenten ihre Informationen nehmen</h2>
      <p>
        Generative Antwortmaschinen stützen sich auf eine Kombination aus trainierten Daten und, je
        nach System, aktuellen Websuchen. Dabei bevorzugen sie Inhalte, die klar strukturiert und
        eindeutig belegbar sind: kurze, faktische Aussagen statt Marketing-Prosa, saubere Überschriften,
        echte Aufzählungen statt Fließtext-Wüsten und konsistente Angaben zu Standort, Leistungen und
        Kontaktmöglichkeiten über verschiedene Quellen hinweg.
      </p>

      <h2>Was Handwerksbetriebe konkret tun können</h2>
      <ul>
        <li>
          Jede Leistungsseite sollte mit einem kurzen, klar formulierten Absatz beginnen, der die
          Leistung und die Zielgruppe in ein bis zwei Sätzen zusammenfasst – genau das zitieren
          KI-Systeme am ehesten.
        </li>
        <li>
          Häufig gestellte Fragen sollten in natürlicher Sprache beantwortet werden, so wie ein Kunde
          sie tatsächlich stellen würde – nicht als Werbetext.
        </li>
        <li>
          Name, Adresse und Telefonnummer sollten auf der Webseite, im Google-Unternehmensprofil und in
          Branchenverzeichnissen exakt übereinstimmen, da Widersprüche Vertrauen kosten.
        </li>
        <li>
          Strukturierte Daten (Schema.org) helfen sowohl klassischen Suchmaschinen als auch KI-Systemen,
          Leistungen, Standort und Bewertungen korrekt einzuordnen.
        </li>
      </ul>

      <h2>Ersetzt GEO klassisches SEO?</h2>
      <p>
        Nein – beide ergänzen sich. Die klassische Google-Suche bleibt für die meisten Handwerksbetriebe
        weiterhin die wichtigste Quelle für Anfragen. GEO ist ein zusätzlicher Kanal, der in den
        kommenden Jahren an Bedeutung gewinnen wird und mit denselben Grundlagen (klare Inhalte,
        korrekte Daten, echtes Vertrauen) einhergeht wie gutes SEO ohnehin schon.
      </p>
      <p>
        Mehr dazu auf unserer Leistungsseite zu{" "}
        <Link href="/leistungen/seo-geo-optimierung" className="underline hover:text-foreground">
          SEO &amp; GEO-Optimierung
        </Link>
        .
      </p>
    </ArticleLayout>
  );
}
