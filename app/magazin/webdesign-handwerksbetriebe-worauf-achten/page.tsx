import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/sections/article-layout";
import { getArticleBySlug } from "@/lib/articles";

const article = getArticleBySlug("webdesign-handwerksbetriebe-worauf-achten")!;

export const metadata: Metadata = {
  title: { absolute: article.seoTitle },
  description: article.metaDescription,
  alternates: { canonical: `/magazin/${article.slug}` },
};

export default function ArticlePage() {
  return (
    <ArticleLayout article={article}>
      <p>
        <strong>Kurz gesagt:</strong> Eine Website für einen Handwerksbetrieb hat zwei Aufgaben, und
        die zweite wird fast immer vergessen. Sie soll Anfragen bringen – und sie soll Mitarbeiter
        gewinnen. Betriebe, die händeringend Gesellen suchen, haben oft keine einzige Zeile dazu auf
        ihrer Seite.
      </p>

      <h2>Wer Ihre Website tatsächlich öffnet</h2>
      <p>
        Drei Gruppen, mit sehr unterschiedlichen Absichten. Erstens: jemand mit einem akuten Problem,
        meist auf dem Handy, der wissen will, ob Sie zuständig sind und wie er Sie erreicht. Zweitens:
        jemand, der ein größeres Vorhaben plant und mehrere Betriebe vergleicht. Drittens: ein
        Geselle oder Azubi, der schaut, ob der Laden etwas taugt.
      </p>
      <p>
        Die meisten Handwerker-Websites bedienen nur die zweite Gruppe – viel Text über das
        Unternehmen, Gründungsjahr, Werte. Die erste Gruppe springt ab, weil sie die Telefonnummer
        nicht findet. Die dritte findet gar nichts.
      </p>

      <h2>Die Bausteine, die wirklich etwas ändern</h2>
      <p>
        <strong>Erreichbarkeit, ohne zu suchen.</strong> Telefonnummer sichtbar im oberen Bereich, als
        Link antippbar, nicht als Bild. Auf dem Handy gehört ein fester Anruf-Knopf an den unteren
        Bildschirmrand. Das klingt banal und ist der häufigste Grund für verlorene Anfragen.
      </p>
      <p>
        <strong>Eigene Seite je Leistung.</strong> Eine Sammelseite „Unsere Leistungen&rdquo; mit zehn
        Stichpunkten hat bei Google keine Chance. Wer nach einer bestimmten Leistung in seiner Stadt
        sucht, findet nur Seiten, die genau diese Leistung behandeln. Das ist gleichzeitig der Grund,
        warum ein Onepager irgendwann an seine Grenze stößt.
      </p>
      <p>
        <strong>Echte Bilder statt Stockfotos.</strong> Kein anderes Gewerk profitiert so stark von
        eigenen Fotos: das eigene Team, die eigenen Fahrzeuge, fertige Arbeiten. Ein Vorher-Nachher
        einer echten Baustelle überzeugt mehr als jeder Werbetext, und es beweist, dass es den Betrieb
        wirklich gibt.
      </p>
      <p>
        <strong>Eine Seite für Bewerber.</strong> Wer Fachkräfte sucht, braucht eine Unterseite, die
        nicht wie eine Stellenanzeige klingt: Wie sieht ein Arbeitstag aus, was für Fahrzeuge und
        Werkzeug gibt es, wie läuft die Einarbeitung, wer ist der Ansprechpartner. Mit Foto. Viele
        Betriebe stecken fünfstellige Beträge in Personalsuche und haben null Zeilen dazu auf der
        eigenen Seite.
      </p>
      <p>
        <strong>Orts- und Gebietsbezug im Text.</strong> Wenn nirgends steht, in welchen Orten Sie
        arbeiten, kann Google den Bezug nicht herstellen. Das ist kein Trick, sondern eine Information,
        die Ihre Kundschaft ohnehin sucht.
      </p>

      <h2>Technisch: zwei Dinge, der Rest ist Beiwerk</h2>
      <p>
        <strong>Das Handy ist der Normalfall, nicht die Ausnahme.</strong> Der größte Teil der
        Besucher kommt vom Telefon, oft mit schlechtem Empfang im Transporter oder auf der Baustelle.
        Eine Seite, die am Schreibtisch gut aussieht und auf dem Handy acht Sekunden lädt, verliert
        genau die Anfragen, die am dringendsten sind.
      </p>
      <p>
        <strong>HTTPS muss sauber funktionieren.</strong> Ohne gültiges Zertifikat warnen Browser mit
        einem Hinweis, der jeden Laien sofort abschreckt. Prüfen Sie dabei auch die Adresse ohne
        „www&rdquo; – es kommt häufiger vor, dass nur eine der beiden Varianten korrekt eingerichtet
        ist und die andere eine Fehlermeldung zeigt, ohne dass es jemandem auffällt.
      </p>

      <h2>Der häufigste Denkfehler</h2>
      <p>
        Viele Betriebe erwarten, dass eine neue Website von allein Anfragen bringt. Sie ist aber nur
        das Ziel – die Besucher müssen erst einmal kommen. Für die lokale Suche ist das
        Google-Unternehmensprofil meist sogar wichtiger als die Website selbst. Beides zusammen wirkt
        deutlich stärker als jedes für sich, weil Google die Übereinstimmung zwischen beiden Quellen
        als Vertrauenssignal wertet. Mehr dazu im Beitrag zu{" "}
        <Link href="/magazin/lokales-seo-handwerksbetriebe" className="underline hover:text-foreground">
          lokalem SEO für Handwerksbetriebe
        </Link>
        .
      </p>

      <h2>Ein ehrlicher Test für Ihre jetzige Seite</h2>
      <p>
        Nehmen Sie Ihr Handy, öffnen Sie Ihre Website und stoppen Sie die Zeit, bis Sie Ihre eigene
        Telefonnummer antippen konnten. Wenn das länger als fünf Sekunden dauert, haben Sie Ihr
        dringendstes Problem gefunden – und es ist kein Designproblem.
      </p>
      <p>
        Was die Umsetzung kostet, steht im Beitrag{" "}
        <Link href="/magazin/was-kostet-website-handwerksbetrieb" className="underline hover:text-foreground">
          Was kostet eine Website für einen Handwerksbetrieb
        </Link>
        , und unsere Leistungen dazu finden Sie unter{" "}
        <Link href="/leistungen/webdesign" className="underline hover:text-foreground">
          Webdesign
        </Link>
        .
      </p>
    </ArticleLayout>
  );
}
