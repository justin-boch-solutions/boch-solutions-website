import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/sections/article-layout";
import { getArticleBySlug } from "@/lib/articles";

const article = getArticleBySlug("e-rechnungspflicht-handwerksbetriebe")!;

export const metadata: Metadata = {
  title: { absolute: article.seoTitle },
  description: article.metaDescription,
  alternates: { canonical: `/magazin/${article.slug}` },
};

export default function ArticlePage() {
  return (
    <ArticleLayout article={article}>
      <p>
        <strong>Kurz gesagt:</strong> Empfangen müssen Sie E-Rechnungen bereits seit dem 1. Januar
        2025 – ohne Ausnahme und ohne Übergangsfrist. Selbst verschicken müssen Sie sie ab dem 1.
        Januar 2027, wenn Ihr Gesamtumsatz im Vorjahr über 800.000 Euro lag, und spätestens ab dem 1.
        Januar 2028 unabhängig vom Umsatz.
      </p>
      <p>
        Für einen Betrieb mit 15 Mitarbeitenden ist die 800.000-Euro-Grenze schnell erreicht. Das
        heißt: Für viele Handwerksbetriebe beginnt die Versandpflicht <strong>zum kommenden
        Jahreswechsel</strong>, und maßgeblich ist der Umsatz des laufenden Jahres 2026.
      </p>

      <h2>Ein PDF ist keine E-Rechnung</h2>
      <p>
        Das ist das häufigste Missverständnis. Eine PDF-Rechnung per E-Mail ist im Sinne des Gesetzes
        eine „sonstige Rechnung&rdquo; – elektronisch verschickt, aber keine E-Rechnung. Gemeint ist
        ein strukturierter Datensatz nach der europäischen Norm EN 16931, den Software automatisch
        auslesen kann. In Deutschland sind das vor allem zwei Formate:
      </p>
      <p>
        <strong>XRechnung</strong> ist eine reine XML-Datei. Sie lässt sich ohne passendes Programm
        kaum lesen, ist aber maschinell eindeutig auswertbar. <strong>ZUGFeRD</strong> ist ein
        Mischformat: eine PDF-Datei, in der die strukturierten Daten eingebettet sind. Für Menschen
        sieht es aus wie eine normale Rechnung, für die Buchhaltungssoftware ist es ein Datensatz.
        Für Handwerksbetriebe ist ZUGFeRD meist der angenehmere Weg, weil Ihre Kundschaft weiterhin
        etwas Lesbares bekommt.
      </p>

      <h2>Welche Frist für wen gilt</h2>
      <p>
        <strong>Seit 1. Januar 2025 – Empfang, für alle.</strong> Jedes Unternehmen muss E-Rechnungen
        entgegennehmen können. Es gibt dafür keine Übergangsfrist und keine Ausnahme nach
        Betriebsgröße. Laut Bundesfinanzministerium genügt dafür zunächst ein E-Mail-Postfach – mehr
        ist formal nicht verlangt.
      </p>
      <p>
        <strong>Ab 1. Januar 2027 – Versand für größere Betriebe.</strong> Wer im Vorjahr mehr als
        800.000 Euro Gesamtumsatz hatte, muss an andere Unternehmen im Inland E-Rechnungen stellen.
        Wichtig: Gemeint ist der <em>Gesamtumsatz</em>, nicht nur der Umsatz mit Geschäftskunden und
        nicht nur der inländische.
      </p>
      <p>
        <strong>Ab 1. Januar 2028 – Versand für alle.</strong> Dann entfällt die Umsatzgrenze.
      </p>

      <h2>Wer nicht betroffen ist</h2>
      <p>
        <strong>Rechnungen an Privatkunden.</strong> Die Pflicht gilt nur zwischen Unternehmen im
        Inland. Ein Dachdecker, der überwiegend für Privathaushalte arbeitet, ist beim Versand kaum
        betroffen – beim Empfang von Lieferantenrechnungen dagegen schon.
      </p>
      <p>
        <strong>Kleinbetragsrechnungen bis 250 Euro brutto.</strong> Die dürfen weiter als Papier-
        oder PDF-Rechnung gestellt werden.
      </p>
      <p>
        <strong>Kleinunternehmer nach § 19 UStG.</strong> Sie sind dauerhaft vom <em>Ausstellen</em>
        befreit – das ist keine Übergangsfrist, sondern eine feste Ausnahme. <em>Empfangen</em> müssen
        aber auch sie.
      </p>

      <h2>Was technisch wirklich nötig ist</h2>
      <p>
        Hier wird oft zu groß gedacht. Für den Empfang braucht es kein System für mehrere tausend
        Euro. Nötig sind drei Dinge, und zwei davon haben die meisten Betriebe schon.
      </p>
      <p>
        <strong>Eine feste Rechnungsadresse.</strong> Ein Postfach wie rechnung@ihrbetrieb.de, das
        nicht auf einen einzelnen Mitarbeiter läuft. Wenn Eingangsrechnungen im privaten Postfach des
        Chefs landen, ist das spätestens bei Urlaub oder Krankheit ein Problem – und bei einem
        Ausscheiden ein größeres.
      </p>
      <p>
        <strong>Etwas, das XML lesen kann.</strong> Jede gängige Handwerker- oder
        Buchhaltungssoftware kann das inzwischen, ebenso Ihr Lohn- oder Steuerbüro. Fragen Sie dort
        zuerst nach, bevor Sie etwas Neues kaufen – in vielen Fällen ist die Funktion bereits
        enthalten und nur nicht eingeschaltet.
      </p>
      <p>
        <strong>Eine geordnete Ablage.</strong> Die strukturierte Datei selbst muss unverändert und
        maschinell auswertbar aufbewahrt werden. Ein Ausdruck reicht nicht, und ein Screenshot erst
        recht nicht. Wie lange genau aufbewahrt werden muss, klären Sie bitte mit Ihrem Steuerberater
        – die Fristen wurden zuletzt geändert und die Angaben dazu gehen auseinander.
      </p>

      <h2>Der Punkt, den Betriebe unterschätzen</h2>
      <p>
        Die Empfangspflicht gilt seit fast zwei Jahren, und viele Betriebe erfüllen sie faktisch
        nicht sauber: Eingangsrechnungen landen in privaten Postfächern, werden ausgedruckt, abgeheftet
        und die Originaldatei verschwindet. Das fällt erst bei einer Prüfung auf.
      </p>
      <p>
        Wer das jetzt in Ordnung bringt, erledigt die Vorbereitung auf 2027 gleich mit – denn eine
        funktionierende Rechnungsadresse, eine saubere Ablage und ein Programm, das die Formate
        beherrscht, braucht man für beide Richtungen.
      </p>

      <h2>Was wir dazu beitragen</h2>
      <p>
        Die steuerliche Seite gehört zu Ihrem Steuerberater – dieser Beitrag ist eine Einordnung,
        keine Steuerberatung. Unser Teil ist die technische Grundlage: eine feste Rechnungsadresse auf
        Ihrer eigenen Domain, Postfächer, die nicht an Personen hängen, und eine strukturierte Ablage
        in Microsoft 365, auf die auch bei Urlaub und Krankheit jemand zugreifen kann.
      </p>
      <p>
        Mehr dazu auf unseren Seiten zu{" "}
        <Link href="/leistungen/email-optimierung" className="underline hover:text-foreground">
          E-Mail-Optimierung
        </Link>{" "}
        und{" "}
        <Link href="/leistungen/microsoft-365-azure" className="underline hover:text-foreground">
          Microsoft 365 &amp; Azure
        </Link>
        . Wie eine eigene Rechnungsadresse eingerichtet wird und worauf es dabei ankommt, steht im
        Beitrag{" "}
        <Link href="/magazin/firmen-email-adresse-einrichten" className="underline hover:text-foreground">
          Firmen-E-Mail-Adresse einrichten
        </Link>
        .
      </p>
    </ArticleLayout>
  );
}
