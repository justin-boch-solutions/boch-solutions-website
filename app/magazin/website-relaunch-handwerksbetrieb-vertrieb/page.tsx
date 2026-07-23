import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/sections/article-layout";
import { getArticleBySlug } from "@/lib/articles";

const article = getArticleBySlug("website-relaunch-handwerksbetrieb-vertrieb")!;

export const metadata: Metadata = {
  title: article.title,
  description: article.excerpt,
  alternates: { canonical: `/magazin/${article.slug}` },
};

export default function ArticlePage() {
  return (
    <ArticleLayout article={article}>
      <p>
        <strong>Kurz gesagt:</strong> Eine neue Webseite allein bringt noch keine Anfragen. Ob ein
        Relaunch tatsächlich mehr Kunden bringt, entscheidet sich an ein paar konkreten Bausteinen –
        nicht am Design allein.
      </p>

      <h2>Warum „schöner&rdquo; nicht automatisch „erfolgreicher&rdquo; bedeutet</h2>
      <p>
        Viele Relaunches konzentrieren sich auf die Optik: neues Logo, moderne Farben, aktuelle Fotos.
        Das ist nicht falsch, reicht aber nicht aus, wenn Besucher trotzdem nicht wissen, was sie als
        Nächstes tun sollen, oder die Seite auf dem Smartphone langsam lädt. Eine Webseite, die
        tatsächlich Anfragen generiert, braucht neben einem klaren Design auch eine klare Struktur und
        technische Grundlagen, die stimmen.
      </p>

      <h2>Die Bausteine, die wirklich zählen</h2>
      <p>
        <strong>Klare Handlungsaufforderung.</strong> Auf jeder Seite sollte für Besucher eindeutig
        erkennbar sein, wie sie Kontakt aufnehmen können – ein Anruf-Button, ein Kontaktformular, eine
        WhatsApp-Nummer. Wenn Besucher erst suchen müssen, springen viele einfach zum nächsten
        Suchergebnis.
      </p>
      <p>
        <strong>Ladezeit und mobile Darstellung.</strong> Die meisten Anfragen kommen heute vom
        Smartphone. Eine Seite, die auf dem Handy langsam lädt oder sich schlecht bedienen lässt, kostet
        Anfragen, bevor Besucher überhaupt Ihre Leistungen gesehen haben.
      </p>
      <p>
        <strong>Vollständige Leistungsübersicht.</strong> Wenn Besucher nicht auf den ersten Blick
        erkennen, ob ihr konkretes Anliegen zu Ihrem Angebot passt, fragen sie lieber woanders an. Eigene
        Unterseiten je Leistung helfen zusätzlich auch bei der Google-Sichtbarkeit.
      </p>
      <p>
        <strong>Vertrauenssignale.</strong> Standort, echte Kontaktdaten, Referenzen sobald vorhanden und
        ein Bezug zur Region schaffen Vertrauen – besonders im Handwerk, wo Kunden jemanden ins Haus
        lassen.
      </p>

      <h2>Ein oft unterschätzter Punkt: die Zeit danach</h2>
      <p>
        Eine Webseite ist kein einmaliges Projekt, das nach dem Launch abgeschlossen ist. Inhalte
        veralten, technische Anforderungen ändern sich, und ohne laufende Pflege verliert auch eine gut
        gestartete Seite mit der Zeit an Sichtbarkeit. Wer Relaunch und laufende Betreuung von Anfang an
        zusammendenkt, spart sich einen zweiten Relaunch in ein paar Jahren.
      </p>
      <p>
        Mehr dazu auf unserer{" "}
        <Link href="/leistungen/webdesign" className="underline hover:text-foreground">
          Webdesign-Seite
        </Link>
        .
      </p>
    </ArticleLayout>
  );
}
