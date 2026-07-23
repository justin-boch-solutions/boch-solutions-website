import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/sections/article-layout";
import { getArticleBySlug } from "@/lib/articles";

const article = getArticleBySlug("lokales-seo-handwerksbetriebe")!;

export const metadata: Metadata = {
  title: article.title,
  description: article.excerpt,
  alternates: { canonical: `/magazin/${article.slug}` },
};

export default function ArticlePage() {
  return (
    <ArticleLayout article={article}>
      <p>
        <strong>Kurz gesagt:</strong> Die meisten Anfragen an Handwerksbetriebe beginnen heute mit
        einer Google-Suche wie „Elektriker in [Ort]&rdquo; oder „Heizungsnotdienst in der Nähe&rdquo;.
        Lokales SEO sorgt dafür, dass Ihr Betrieb bei genau diesen Suchanfragen erscheint – auf der
        Landkarte, in den organischen Ergebnissen und in den Google-Bewertungen.
      </p>

      <h2>Warum lokales SEO für Handwerksbetriebe anders funktioniert</h2>
      <p>
        Klassisches SEO zielt oft auf bundesweite Suchbegriffe. Für einen Handwerksbetrieb ist das
        selten relevant – entscheidend ist, bei Suchanfragen mit Ortsbezug im eigenen Einzugsgebiet
        sichtbar zu sein. Google berücksichtigt dabei drei Hauptfaktoren: die Relevanz Ihrer Webseite
        und Ihres Google-Unternehmensprofils für die Suchanfrage, die Entfernung zum Suchenden und wie
        vertrauenswürdig Ihr Betrieb anhand von Bewertungen und Informationen wirkt.
      </p>

      <h2>Die drei Hebel mit dem größten Effekt</h2>
      <p>
        <strong>1. Ein vollständiges, aktuelles Google-Unternehmensprofil.</strong> Korrekte Kategorie,
        vollständige Leistungsbeschreibung, aktuelle Öffnungszeiten und regelmäßige Fotos sind die
        Basis. Ein unvollständiges oder unbestätigtes Profil ist der häufigste Grund, warum Betriebe in
        der Kartenansicht gar nicht erst auftauchen.
      </p>
      <p>
        <strong>2. Echte Kundenbewertungen mit Reaktion.</strong> Bewertungsanzahl und -qualität fließen
        direkt in die lokale Platzierung ein und sind für Kunden das wichtigste Vergleichskriterium
        zwischen mehreren Betrieben in der Trefferliste. Auf Bewertungen zu antworten – auch auf
        kritische – signalisiert zusätzlich Seriosität.
      </p>
      <p>
        <strong>3. Eine Webseite mit klarem Orts- und Leistungsbezug.</strong> Wenn auf der Webseite
        explizit steht, welche Leistungen in welchem Einzugsgebiet angeboten werden, kann Google diesen
        Bezug klar herstellen. Eine reine „Wir sind ein Handwerksbetrieb&rdquo;-Startseite ohne
        Ortsangaben liefert dagegen wenig Anhaltspunkte.
      </p>

      <h2>Ein häufiges Missverständnis</h2>
      <p>
        Viele Betriebe erwarten, dass allein eine neue Webseite die Sichtbarkeit verbessert. In der
        Praxis ist das Google-Unternehmensprofil für die lokale „Handwerker in der Nähe&rdquo;-Suche
        meist wichtiger als die Webseite selbst – beide zusammen ergeben aber deutlich mehr als jedes
        für sich allein, weil Google Konsistenz zwischen beiden Quellen als Vertrauenssignal wertet.
      </p>

      <h2>Was realistisch zu erwarten ist</h2>
      <p>
        Technische Verbesserungen an Webseite und Profil zeigen erste Wirkung oft innerhalb weniger
        Wochen. Spürbare Platzierungsverbesserungen bei umkämpften Suchbegriffen brauchen dagegen in
        der Regel mehrere Monate kontinuierlicher Arbeit – lokales SEO ist ein laufender Prozess, kein
        einmaliges Projekt.
      </p>
      <p>
        Mehr dazu auf unseren Leistungsseiten zu{" "}
        <Link href="/leistungen/seo-geo-optimierung" className="underline hover:text-foreground">
          SEO &amp; GEO-Optimierung
        </Link>{" "}
        und{" "}
        <Link href="/leistungen/google-unternehmensprofil" className="underline hover:text-foreground">
          Google-Unternehmensprofil-Optimierung
        </Link>
        .
      </p>
    </ArticleLayout>
  );
}
