import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/sections/article-layout";
import { getArticleBySlug } from "@/lib/articles";

const article = getArticleBySlug("ki-im-handwerksbetrieb")!;

export const metadata: Metadata = {
  title: { absolute: article.seoTitle },
  description: article.metaDescription,
  alternates: { canonical: `/magazin/${article.slug}` },
};

export default function ArticlePage() {
  return (
    <ArticleLayout article={article}>
      <p>
        <strong>Kurz gesagt:</strong> Für einen Handwerksbetrieb lohnt sich KI heute vor allem dort,
        wo geschrieben und sortiert wird – nicht dort, wo gerechnet oder entschieden wird. Die
        nützlichen Einsätze sind unspektakulär und sparen trotzdem jede Woche Zeit. Die
        spektakulären kosten Geld und liefern selten.
      </p>

      <h2>Was heute schon funktioniert</h2>
      <p>
        <strong>Angebots- und Kundentexte formulieren.</strong> Die Leistung steht in Stichworten
        fest, die Formulierung dauert trotzdem zwanzig Minuten. Ein Sprachmodell macht aus
        Stichpunkten einen ordentlichen Text, den Sie noch anpassen. Das gilt genauso für
        Absagen, Terminverschiebungen, Mahnungen und Stellenanzeigen – alles Schreibarbeit, die
        niemand gerne macht und die trotzdem gut klingen soll.
      </p>
      <p>
        <strong>Sprachnotizen in Text umwandeln.</strong> Aufmaß auf der Baustelle ins Handy
        sprechen, als Text im Büro ankommen lassen. Die Spracherkennung ist inzwischen zuverlässig
        genug, auch bei Lärm und Dialekt. Das ersetzt den Zettel, der im Transporter liegen bleibt.
      </p>
      <p>
        <strong>Lange Dokumente zusammenfassen.</strong> Ausschreibungsunterlagen, Herstellerhinweise,
        Verträge: Eine Zusammenfassung mit den wichtigsten Punkten spart das erste Durchlesen. Die
        Entscheidung treffen Sie danach selbst – aber Sie wissen schneller, ob sich das Dokument
        überhaupt lohnt.
      </p>

      <h2>Was sich heute nicht lohnt</h2>
      <p>
        <strong>Automatische Kalkulation und Preisfindung.</strong> Ein Sprachmodell rechnet nicht, es
        formuliert. Es wirkt überzeugend und liegt bei Zahlen regelmäßig daneben. Für Kalkulation
        gibt es Handwerkersoftware, und die rechnet richtig.
      </p>
      <p>
        <strong>Telefonassistenten, die Anrufe annehmen.</strong> Die Werbung verspricht, dass kein
        Auftrag mehr durch verpasste Anrufe verloren geht. In der Praxis merken Anrufer sofort, dass
        sie mit einer Maschine sprechen, und legen auf – gerade ältere Kundschaft und gerade im
        Notfall. Ein Mensch, der zuverlässig zurückruft, ist derzeit das bessere System.
      </p>
      <p>
        <strong>Fertige KI-Lösungen für das Handwerk von der Stange.</strong> Viele davon sind eine
        Oberfläche um dieselben Sprachmodelle, die Sie ohnehin nutzen können – zum Vielfachen des
        Preises. Fragen Sie vor jedem Abschluss, was das Produkt kann, das ein normales
        Sprachmodell nicht kann.
      </p>

      <h2>Die Frage, die vorher geklärt sein muss</h2>
      <p>
        Sobald Sie Kundendaten, Angebote oder Verträge in ein KI-Werkzeug geben, verlassen diese
        Daten Ihren Betrieb. Das ist nicht automatisch ein Problem, aber es muss bewusst entschieden
        werden – und bei personenbezogenen Daten brauchen Sie eine saubere Grundlage.
      </p>
      <p>
        Praktisch gibt es zwei Wege. Entweder Sie nutzen ausschließlich Werkzeuge, die vertraglich
        zusichern, dass Ihre Eingaben nicht zum Training verwendet werden und in Europa verarbeitet
        werden – das bieten die Geschäftsvarianten der großen Anbieter, so auch Microsoft Copilot
        innerhalb eines Microsoft-365-Vertrags. Oder Sie legen fest, dass nur anonymisierte Inhalte
        hineingehen: Leistungstext ja, Kundenname und Adresse nein.
      </p>
      <p>
        Der dritte Weg, den manche Anbieter bewerben – ein eigenes Modell auf einem Rechner im
        Betrieb –, ist für die allermeisten Handwerksbetriebe technisch und finanziell nicht
        sinnvoll. Die Hardware kostet mehr als der gesamte Nutzen.
      </p>

      <h2>Ein realistischer erster Schritt</h2>
      <p>
        Nehmen Sie eine einzige wiederkehrende Schreibaufgabe – zum Beispiel die Standardantwort auf
        Anfragen, die nicht ins Gebiet passen – und lassen Sie sie einmal formulieren. Wenn das vier
        Wochen lang Zeit spart, nehmen Sie die nächste dazu. Was Sie nicht brauchen, ist ein
        KI-Projekt. Was Sie brauchen, ist eine Aufgabe weniger.
      </p>
      <p>
        Wichtiger als jedes KI-Werkzeug bleibt übrigens die Grundlage darunter: Wenn Angebote auf drei
        verschiedenen Rechnern liegen und E-Mails im privaten Postfach, hilft auch die beste
        Automatisierung nicht. Wo man dafür sinnvoll anfängt, steht im Beitrag{" "}
        <Link href="/magazin/digitalisierung-handwerk-zeit-sparen" className="underline hover:text-foreground">
          Digitalisierung im Handwerk
        </Link>
        .
      </p>
      <p>
        Wenn Sie prüfen möchten, was sich in Ihrem Betrieb automatisieren lässt, finden Sie mehr
        dazu unter{" "}
        <Link href="/leistungen/prozessautomatisierung" className="underline hover:text-foreground">
          Prozessautomatisierung
        </Link>
        .
      </p>
    </ArticleLayout>
  );
}
