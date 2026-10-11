import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/sections/article-layout";
import { getArticleBySlug } from "@/lib/articles";

const article = getArticleBySlug("digitale-unterschrift-handwerk")!;

export const metadata: Metadata = {
  title: { absolute: article.seoTitle },
  description: article.metaDescription,
  alternates: { canonical: `/magazin/${article.slug}` },
};

export default function ArticlePage() {
  return (
    <ArticleLayout article={article}>
      <p>
        <strong>Kurz gesagt:</strong> Die Dokumente, mit denen ein Handwerksbetrieb täglich zu tun
        hat – Angebot, Auftragsbestätigung, Abnahmeprotokoll, Stundenzettel – sind gesetzlich
        formfrei. Dafür genügt eine einfache elektronische Unterschrift, etwa mit dem Finger auf dem
        Tablet. Teure Signaturdienste brauchen Sie dafür nicht.
      </p>
      <p>
        Bei zwei Dokumenten funktioniert es umgekehrt gar nicht: Eine Kündigung eines
        Arbeitsverhältnisses und eine Bürgschaft müssen auf Papier unterschrieben werden. Dort ist
        die elektronische Form gesetzlich ausdrücklich ausgeschlossen – auch mit der teuersten
        Software.
      </p>

      <h2>Die drei Stufen, kurz erklärt</h2>
      <p>
        Die europäische eIDAS-Verordnung kennt drei Arten elektronischer Unterschriften. Der
        Unterschied liegt nicht darin, ob sie gültig sind, sondern darin, wie gut sich im Streitfall
        beweisen lässt, wer unterschrieben hat.
      </p>
      <p>
        <strong>Einfache elektronische Signatur.</strong> Der Namenszug auf dem Tablet, das
        eingescannte Unterschriftsbild, das Häkchen im Formular. Rechtlich wirksam überall dort, wo
        das Gesetz keine besondere Form verlangt – also bei den allermeisten Handwerksdokumenten.
      </p>
      <p>
        <strong>Fortgeschrittene elektronische Signatur.</strong> Eindeutig einer Person zugeordnet,
        und nachträgliche Änderungen am Dokument werden erkennbar. Deutlich bessere Beweislage, ohne
        dass sich der Unterzeichner amtlich ausweisen muss.
      </p>
      <p>
        <strong>Qualifizierte elektronische Signatur.</strong> Die höchste Stufe, der
        handschriftlichen Unterschrift rechtlich gleichgestellt. Sie erfordert eine vorherige
        Identitätsprüfung bei einem zugelassenen Anbieter und kostet entsprechend. Nötig ist sie nur,
        wenn das Gesetz ausdrücklich Schriftform verlangt.
      </p>

      <h2>Was Sie im Betriebsalltag digital unterschreiben lassen können</h2>
      <p>
        Der Werkvertrag – also das, was Sie mit Ihrer Kundschaft abschließen – ist formfrei. Er war es
        schon immer und ist es geblieben. Angebot, Auftragsbestätigung und Nachträge ebenfalls.
        Praktisch heißt das: Ein Kunde, der auf dem Tablet unterschreibt, hat genauso wirksam
        zugestimmt wie mit Kugelschreiber auf Papier.
      </p>
      <p>
        Besonders nützlich ist das beim <strong>Abnahmeprotokoll</strong>. Die Abnahme setzt
        Gewährleistungsfristen in Gang und entscheidet über die Fälligkeit Ihrer Rechnung – und genau
        dieses Dokument geht im Alltag am häufigsten verloren oder wird gar nicht erst erstellt. Ein
        auf der Baustelle unterschriebenes Protokoll, das sofort im Betrieb landet, ist handfester
        Nutzen, unabhängig von jeder Digitalisierungsdebatte.
      </p>

      <h2>Wo es nicht geht</h2>
      <p>
        <strong>Kündigung eines Arbeitsverhältnisses.</strong> Das Gesetz verlangt Schriftform und
        schließt die elektronische Form ausdrücklich aus. Eine per Mail oder mit Signaturdienst
        verschickte Kündigung ist unwirksam – ein Fehler, der einen Betrieb teuer zu stehen kommt.
      </p>
      <p>
        <strong>Bürgschaft.</strong> Ebenfalls Schriftform, ebenfalls elektronische Form
        ausgeschlossen. Für Betriebe relevant, die Gewährleistungsbürgschaften stellen.
      </p>
      <p>
        Bei Arbeitsverträgen und Befristungen wurden die Formvorschriften zuletzt mehrfach geändert.
        Bevor Sie dort auf digitale Unterschriften umstellen, klären Sie den aktuellen Stand mit
        Ihrem Steuer- oder Rechtsberater – dieser Beitrag ist eine Einordnung, keine Rechtsberatung.
      </p>

      <h2>Gültigkeit und Beweiskraft sind zwei verschiedene Dinge</h2>
      <p>
        Das wird regelmäßig verwechselt. Eine einfache Unterschrift auf dem Tablet ist
        <em> gültig</em>. Bestreitet der Kunde später, unterschrieben zu haben, müssen Sie es aber
        <em> beweisen</em> – und ein Unterschriftsbild allein ist ein schwacher Beweis.
      </p>
      <p>
        Für den Alltag reicht das trotzdem fast immer, weil kaum jemand eine Abnahme bestreitet, bei
        der Foto, Zeitstempel und Protokoll zusammenpassen. Bei großen Aufträgen oder bei Kundschaft,
        mit der es schon einmal Ärger gab, ist die fortgeschrittene Signatur die ruhigere
        Entscheidung.
      </p>

      <h2>Was Sie dafür brauchen</h2>
      <p>
        Für die einfache Variante: ein Tablet, eine App, die das Dokument erzeugt und die
        Unterschrift einfängt, und eine Ablage, in der das fertige Dokument automatisch landet. Viele
        Handwerkerprogramme können das bereits – fragen Sie dort zuerst nach, bevor Sie etwas
        Zusätzliches kaufen.
      </p>
      <p>
        Der entscheidende Teil ist nicht die Unterschrift, sondern was danach passiert. Wenn das
        unterschriebene Protokoll als Foto im privaten Handy des Monteurs bleibt, haben Sie nichts
        gewonnen. Es muss ohne Zutun im Betrieb ankommen, auffindbar und für alle Berechtigten
        zugänglich.
      </p>
      <p>
        Wie so eine Ablage aufgebaut wird, steht im Beitrag{" "}
        <Link href="/magazin/digitalisierung-handwerk-zeit-sparen" className="underline hover:text-foreground">
          Digitalisierung im Handwerk
        </Link>
        . Wenn kein Standardprogramm Ihren Ablauf abbildet, finden Sie mehr unter{" "}
        <Link href="/leistungen/individuelle-software" className="underline hover:text-foreground">
          individuelle Software
        </Link>
        .
      </p>
    </ArticleLayout>
  );
}
