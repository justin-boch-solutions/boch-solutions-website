import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/sections/article-layout";
import { getArticleBySlug } from "@/lib/articles";
import { formatEuro, pricing } from "@/lib/constants";

const article = getArticleBySlug("website-ki-baukasten-oder-profi")!;

export const metadata: Metadata = {
  title: { absolute: article.seoTitle },
  description: article.metaDescription,
  alternates: { canonical: `/magazin/${article.slug}` },
};

export default function ArticlePage() {
  return (
    <ArticleLayout article={article}>
      <p>
        <strong>Kurz gesagt:</strong> Für einen Ein-Mann-Betrieb, der überhaupt erst einmal im Netz
        auffindbar sein will, ist ein Baukasten eine vernünftige Entscheidung. Für einen Betrieb, der
        über die Website Aufträge und Mitarbeiter gewinnen soll, wird er an drei konkreten Stellen
        teuer. Hier stehen beide Seiten.
      </p>

      <h2>Was Baukästen inzwischen wirklich können</h2>
      <p>
        Die Zeiten, in denen Baukasten-Websites sofort als solche zu erkennen waren, sind vorbei. Die
        Vorlagen sind ordentlich gestaltet, funktionieren auf dem Handy und liefern Kontaktformular,
        Bildergalerie und Öffnungszeiten mit. Mit einem KI-Assistenten steht ein erster Entwurf in
        einer halben Stunde. Für monatlich etwa zehn bis dreißig Euro ist das eine reale Leistung,
        und es wäre unredlich, das kleinzureden.
      </p>
      <p>
        Wenn Ihr Ziel ist, dass jemand Sie findet, Ihre Nummer sieht und anruft – und Sie nicht vorhaben,
        über Google aktiv neue Kundschaft zu gewinnen –, dann reicht das aus. Diesen Betrieben raten
        wir ehrlich zum Baukasten statt zu einem Auftrag bei uns.
      </p>

      <h2>Wo es anfängt zu klemmen</h2>
      <p>
        <strong>Erstens: Seiten für einzelne Leistungen und Orte.</strong> Wer bei Google für eine
        bestimmte Leistung in einer bestimmten Stadt gefunden werden will, braucht dafür jeweils eine
        eigene Seite mit eigenem Titel und eigenem Text. Baukästen können das technisch meistens, aber
        der Aufwand liegt komplett bei Ihnen – und genau diese Arbeit bleibt erfahrungsgemäß liegen.
        Eine schöne Website, die niemand findet, bringt keine Anfragen.
      </p>
      <p>
        <strong>Zweitens: Ladezeit auf dem Handy.</strong> Baukästen laden viel mit, was Ihre Seite
        nicht braucht. Auf dem Schreibtisch merkt man das nicht, im Transporter mit schlechtem Empfang
        schon. Und genau dort öffnen Ihre Kunden die Seite.
      </p>
      <p>
        <strong>Drittens: alles, was über eine Website hinausgeht.</strong> Terminbuchung, ein Portal
        für Kunden, eine Anbindung an Ihre Handwerkersoftware, digitale Angebote. An dem Punkt endet
        der Baukasten, und Sie fangen von vorne an – was die vermeintliche Ersparnis aufzehrt.
      </p>

      <h2>Die Rechnung über fünf Jahre</h2>
      <p>
        Ein Baukasten für 20 Euro im Monat kostet über fünf Jahre rund 1.200 Euro. Ein kompakter
        Auftritt vom Dienstleister beginnt bei {formatEuro(pricing.onepager)} zuzüglich Hosting ab{" "}
        {formatEuro(pricing.hosting)} monatlich – über fünf Jahre also ungefähr das Doppelte. Der
        Unterschied ist real, aber kleiner, als die Monatspreise vermuten lassen.
      </p>
      <p>
        Entscheidend ist deshalb nicht der Preis, sondern ob die Website etwas einbringt. Ein
        einziger zusätzlicher Auftrag im Jahr trägt bei den meisten Gewerken die gesamten Kosten. Ein
        Betrieb ohne Auftragsmangel braucht diesen Hebel nicht. Ein Betrieb, der Mitarbeiter sucht
        oder in ein neues Gebiet wachsen will, schon.
      </p>

      <h2>Drei Dinge, die bei beiden Wegen gelten</h2>
      <p>
        <strong>Die Domain muss Ihnen gehören.</strong> Nicht dem Baukasten, nicht der Agentur. Prüfen
        Sie, auf wen sie registriert ist – das ist der Punkt, an dem ein Wechsel später scheitert oder
        teuer wird.
      </p>
      <p>
        <strong>Ihre Inhalte müssen exportierbar sein.</strong> Fragen Sie vorher, wie Sie an Texte
        und Bilder kommen, wenn Sie den Anbieter wechseln.
      </p>
      <p>
        <strong>Das Google-Unternehmensprofil ist wichtiger als die Website.</strong> Für die Suche
        nach einem Handwerker in der Nähe entscheidet es meist stärker über Sichtbarkeit als die
        Website selbst – und es ist kostenlos. Wer sparen will, fängt dort an, nicht bei der Website.
      </p>

      <h2>Die ehrliche Zusammenfassung</h2>
      <p>
        Baukasten, wenn Sie sichtbar sein wollen und Ihre Auftragslage stimmt. Dienstleister, wenn die
        Website arbeiten soll – mehrere Leistungsseiten, Bewerber ansprechen, Wachstum in ein neues
        Gebiet, oder etwas, das über eine reine Website hinausgeht.
      </p>
      <p>
        Wenn Sie unsicher sind, welcher Fall auf Sie zutrifft: Die Preise stehen offen in unserem
        Beitrag{" "}
        <Link href="/magazin/was-kostet-website-handwerksbetrieb" className="underline hover:text-foreground">
          Was kostet eine Website für einen Handwerksbetrieb
        </Link>
        , und was eine Handwerker-Website inhaltlich leisten muss, steht unter{" "}
        <Link href="/magazin/webdesign-handwerksbetriebe-worauf-achten" className="underline hover:text-foreground">
          Webdesign für Handwerksbetriebe
        </Link>
        .
      </p>
    </ArticleLayout>
  );
}
