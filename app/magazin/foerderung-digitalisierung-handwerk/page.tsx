import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/sections/article-layout";
import { getArticleBySlug } from "@/lib/articles";

const article = getArticleBySlug("foerderung-digitalisierung-handwerk")!;

export const metadata: Metadata = {
  title: { absolute: article.seoTitle },
  description: article.metaDescription,
  alternates: { canonical: `/magazin/${article.slug}` },
};

export default function ArticlePage() {
  return (
    <ArticleLayout article={article}>
      <p>
        <strong>Kurz gesagt:</strong> Für Digitalisierung im Handwerk gibt es Zuschüsse, aber sie
        folgen zwei Regeln, an denen die meisten Anträge scheitern. Erstens: Der Antrag muss
        <strong> vor</strong> dem Auftrag gestellt sein. Zweitens: Programme laufen in befristeten
        Aufrufen, und wenn der Topf leer ist, ist er leer – auch mitten in der Frist.
      </p>

      <h2>Die Regel, die den meisten das Geld kostet</h2>
      <p>
        Förderung gibt es in aller Regel nur für Vorhaben, die zum Zeitpunkt der Bewilligung noch
        nicht begonnen haben. Als Beginn gilt dabei nicht der Baustart, sondern bereits die
        verbindliche Bestellung oder Auftragserteilung. Wer die Software kauft und danach den Antrag
        stellt, bekommt nichts – unabhängig davon, wie förderfähig das Vorhaben inhaltlich gewesen
        wäre.
      </p>
      <p>
        Praktisch heißt das: Erst Angebot einholen, dann Antrag stellen, Bewilligung abwarten, dann
        beauftragen. Zwischen Antrag und Bewilligung vergehen je nach Programm Wochen bis Monate. Wer
        es eilig hat, sollte ehrlich rechnen, ob sich das Warten gegenüber dem Zuschuss lohnt.
      </p>

      <h2>Welche Arten von Förderung es gibt</h2>
      <p>
        <strong>Beratungsförderung.</strong> Bezuschusst wird nicht die Software, sondern externe
        Beratung – also die Analyse Ihrer Abläufe und die Vorbereitung einer Lösung. Abgerechnet wird
        meist pro Beratungstag mit einer Obergrenze.
      </p>
      <p>
        <strong>Investitionszuschuss.</strong> Ein Anteil der Investitionskosten wird erstattet,
        üblicherweise 30 bis 50 Prozent bis zu einem Höchstbetrag. Hier wird oft unterschieden, ob
        Sie etwas für den eigenen Betrieb einführen oder ein marktfähiges digitales Produkt
        entwickeln – diese Unterscheidung entscheidet regelmäßig über die Förderfähigkeit.
      </p>
      <p>
        <strong>Zinsgünstige Kredite.</strong> Kein geschenktes Geld, aber bessere Konditionen als
        bei der Hausbank. Für größere Vorhaben oft relevanter als der Zuschuss.
      </p>

      <h2>Wer überhaupt antragsberechtigt ist</h2>
      <p>
        Die meisten Programme richten sich an kleine und mittlere Unternehmen nach EU-Definition –
        weniger als 250 Beschäftigte und entweder höchstens 50 Millionen Euro Jahresumsatz oder
        höchstens 43 Millionen Euro Bilanzsumme. Nahezu jeder Handwerksbetrieb fällt darunter. Bei
        Landesprogrammen kommt ein Sitz oder eine Betriebsstätte im jeweiligen Bundesland hinzu.
      </p>

      <h2>Was Sie vorbereiten sollten</h2>
      <p>
        Unabhängig vom Programm brauchen Sie fast immer dieselben Dinge. Eine kurze Beschreibung des
        Vorhabens: Was soll digitalisiert werden, welches Problem löst es, was ändert sich im Betrieb.
        Ein belastbares Angebot des Dienstleisters mit Leistungsumfang und Preis – kein grober
        Richtwert. Die Eckdaten des Betriebs, also Beschäftigtenzahl, Umsatz und Rechtsform. Und
        einen groben Zeitplan.
      </p>
      <p>
        Wer das in der Schublade hat, kann innerhalb weniger Tage einen Antrag stellen, sobald ein
        Aufruf öffnet. Genau darauf kommt es an, wie der nächste Abschnitt zeigt.
      </p>

      <h2>Stand im Oktober 2026 – und warum er gleich wieder anders sein kann</h2>
      <p>
        In Nordrhein-Westfalen läuft das Programm <strong>Mittelstand Innovativ &amp; Digital
        (MID)</strong>, seit Januar 2026 über die NRW.BANK. Der Teil <em>MID – Digitale Prozesse</em>
        fördert externe Beratung zur Digitalisierung interner Abläufe mit bis zu 500 Euro je
        Beratungstag und höchstens 15.000 Euro je Unternehmen.
      </p>
      <p>
        <strong>Aktuell ist dieser Aufruf geschlossen.</strong> Die Antragsfrist war vom 7. September
        bis 1. Dezember 2026 angesetzt, die maximale Antragszahl wurde aber so schnell erreicht, dass
        das Portal vorzeitig schloss. Anträge sind derzeit nicht möglich; ein neuer Aufruf im Jahr
        2027 ist denkbar, aber nicht zugesagt. Beim Teil <em>MID – Digitalisierung</em> ist zum Januar
        2026 zusätzlich der Schwerpunkt auf unternehmensinterne Maßnahmen entfallen.
      </p>
      <p>
        Genau das ist der Grund, warum Vorbereitung mehr wert ist als Recherche: Diese Aufrufe werden
        selten lange im Voraus angekündigt und sind manchmal nach Tagen voll.
      </p>

      <h2>Wo Sie den aktuellen Stand wirklich prüfen</h2>
      <p>
        Verlassen Sie sich nicht auf Übersichtsartikel – auch nicht auf diesen. Die verlässlichen
        Quellen sind die <strong>Förderdatenbank des Bundes</strong> unter foerderdatenbank.de, die
        Seiten der Förderbank Ihres Bundeslandes, und vor allem Ihre <strong>Handwerkskammer</strong>.
        Dort gibt es kostenlose Betriebsberatung, die genau diese Frage beantwortet und weiß, was
        gerade offen ist.
      </p>
      <p>
        Der Weg über die Kammer ist für die meisten Betriebe der effizienteste: Sie beschreiben Ihr
        Vorhaben einmal und bekommen gesagt, ob und wo es passt – statt sich durch Programme zu
        arbeiten, die vielleicht gar nicht auf Sie zugeschnitten sind.
      </p>

      <h2>Eine ehrliche Einordnung zum Schluss</h2>
      <p>
        Förderung ist ein angenehmer Zuschuss, aber ein schlechter Grund für ein Vorhaben. Wenn sich
        eine Maßnahme nur mit Zuschuss rechnet, rechnet sie sich meistens gar nicht. Umgekehrt
        sollten Sie ein Vorhaben, das sich ohnehin trägt, nicht wegen eines geschlossenen Portals auf
        unbestimmte Zeit verschieben.
      </p>
      <p>
        Dieser Beitrag ist eine Orientierung, keine Förderberatung, und der Stand oben ist
        datumsabhängig. Womit sich ein Einstieg ohne Förderung lohnt, steht im Beitrag{" "}
        <Link href="/magazin/digitalisierung-handwerk-zeit-sparen" className="underline hover:text-foreground">
          Digitalisierung im Handwerk
        </Link>
        , und was unsere Leistungen kosten, sehen Sie offen auf der{" "}
        <Link href="/pakete" className="underline hover:text-foreground">
          Seite zu Paketen und Preisen
        </Link>{" "}
        – das brauchen Sie ohnehin als belastbares Angebot für jeden Antrag.
      </p>
    </ArticleLayout>
  );
}
