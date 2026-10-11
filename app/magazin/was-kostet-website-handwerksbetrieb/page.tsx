import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/sections/article-layout";
import { getArticleBySlug } from "@/lib/articles";
import { formatEuro, pricing } from "@/lib/constants";

const article = getArticleBySlug("was-kostet-website-handwerksbetrieb")!;

export const metadata: Metadata = {
  title: { absolute: article.seoTitle },
  description: article.metaDescription,
  alternates: { canonical: `/magazin/${article.slug}` },
};

export default function ArticlePage() {
  return (
    <ArticleLayout article={article}>
      <p>
        <strong>Kurz gesagt:</strong> Eine Website für einen Handwerksbetrieb beginnt bei etwa{" "}
        {formatEuro(pricing.onepager)} für einen kompakten Auftritt auf einer Seite und bei rund{" "}
        {formatEuro(pricing.firmenauftritt)} für einen vollständigen Firmenauftritt mit mehreren
        Unterseiten. Dazu kommen laufende Kosten ab {formatEuro(pricing.hosting)} im Monat für
        Hosting. Was den Preis innerhalb dieser Spanne bestimmt, steht weiter unten.
      </p>

      <h2>Warum fast niemand Preise nennt</h2>
      <p>
        Wer nach Preisen für eine Website sucht, landet meistens bei „Preis auf Anfrage&rdquo;. Das
        hat einen nachvollziehbaren Grund: Der Aufwand hängt wirklich vom Umfang ab, und ein
        pauschaler Preis trifft im Zweifel beide Seiten falsch. Für Sie als Betrieb ist das trotzdem
        unbefriedigend, weil Sie vor dem ersten Gespräch nicht einschätzen können, ob Sie über 2.000
        oder über 20.000 Euro reden.
      </p>
      <p>
        Deshalb hier konkrete Startpreise. Sie gelten für einen Betrieb üblicher Größe und
        verschieben sich mit dem Umfang – aber Sie wissen, woran Sie sind.
      </p>

      <h2>Die drei üblichen Größenordnungen</h2>
      <p>
        <strong>Kompakter Auftritt auf einer Seite, ab {formatEuro(pricing.onepager)}.</strong> Alle
        wichtigen Informationen auf einer scrollbaren Seite: Leistungen, Einzugsgebiet,
        Ansprechpartner, Kontaktformular. Sinnvoll für kleine Betriebe, die bisher gar nicht oder nur
        mit einem veralteten Auftritt im Netz sind und schnell etwas Vorzeigbares brauchen.
      </p>
      <p>
        <strong>Vollständiger Firmenauftritt, ab {formatEuro(pricing.firmenauftritt)}.</strong> Mehrere
        Unterseiten für einzelne Leistungen, Referenzen, Team und Stellenangebote. Das ist der
        Normalfall für Betriebe ab etwa zehn Mitarbeitenden – vor allem, weil sich nur so Seiten für
        einzelne Leistungen und Orte bauen lassen, die bei Google überhaupt eine Chance haben.
      </p>
      <p>
        <strong>Individuelle Lösung, ab {formatEuro(pricing.individuell)}.</strong> Sobald etwas
        dazukommt, das kein Standardbaukasten abbildet: Kundenportal, Terminbuchung, Anbindung an die
        Handwerkersoftware, digitale Angebote. Hier zählt nur, was ausdrücklich im Angebot steht.
      </p>

      <h2>Die vier Faktoren, die den Preis treiben</h2>
      <p>
        <strong>1. Anzahl der Unterseiten.</strong> Der mit Abstand größte Hebel. Jede zusätzliche
        Seite bedeutet Struktur, Text, Bilder und Abstimmung. Üblich sind{" "}
        {formatEuro(pricing.extraSubpage[0])} bis {formatEuro(pricing.extraSubpage[1])} pro
        zusätzlicher Standardseite.
      </p>
      <p>
        <strong>2. Wer die Texte schreibt.</strong> In fast keinem Angebot ist Texterstellung
        enthalten – ein Punkt, der regelmäßig für Ärger sorgt. Entweder liefern Sie die Inhalte, oder
        es wird gesondert beauftragt. Fragen Sie das vorher ab.
      </p>
      <p>
        <strong>3. Bilder.</strong> Eigene Fotos von Ihren Baustellen, Ihrem Team und Ihren Fahrzeugen
        wirken bei Handwerksbetrieben deutlich besser als Stockfotos – kosten aber einen Fototermin.
        Zuschnitt und Optimierung vorhandener Bilder liegen bei {formatEuro(pricing.imageCare[0])} bis{" "}
        {formatEuro(pricing.imageCare[1])}.
      </p>
      <p>
        <strong>4. Sonderfunktionen.</strong> Terminbuchung, Mitarbeiterportal, Shop für Ersatzteile.
        Alles, was über ein Kontaktformular hinausgeht, ist Projektarbeit und sollte vorher schriftlich
        abgegrenzt sein.
      </p>

      <h2>Die laufenden Kosten, die oft untergehen</h2>
      <p>
        Eine Website ist kein einmaliger Kauf. Sie braucht Hosting, SSL-Zertifikat, Backups und
        technische Updates, sonst wird sie innerhalb weniger Jahre zum Sicherheitsrisiko. Realistisch
        sind {formatEuro(pricing.hosting)} im Monat für Hosting und ab{" "}
        {formatEuro(pricing.maintenanceBasic)} im Monat für Wartung. Dazu die Domain, die direkt beim
        Registrar anfällt.
      </p>
      <p>
        Achten Sie bei Wartungsangeboten auf eine klare Zeitgrenze. „Wartung inklusive&rdquo; ohne
        Angabe, wie viele Minuten im Monat enthalten sind, führt zwangsläufig zu Streit – entweder
        bekommen Sie weniger als erwartet, oder Ihr Dienstleister arbeitet unbezahlt und verliert die
        Lust.
      </p>

      <h2>Woran Sie ein unseriöses Angebot erkennen</h2>
      <p>
        Vorsicht bei Angeboten mit niedrigem Einstiegspreis und langer Mindestlaufzeit, bei denen die
        Website Ihnen am Ende nicht gehört. Fragen Sie konkret: Wem gehört die Domain? Komme ich an
        meine Inhalte, wenn ich wechsle? Was kostet die Übergabe? Ein seriöser Anbieter beantwortet
        das ohne Zögern.
      </p>
      <p>
        Genauso skeptisch sollten Sie bei Ranking-Garantien sein. Niemand kann einen Platz bei Google
        zusichern, und wer es verspricht, verkauft Ihnen etwas, das er nicht liefern kann.
      </p>

      <h2>Was es bei uns kostet</h2>
      <p>
        Unsere Startpreise stehen offen auf der{" "}
        <Link href="/pakete" className="underline hover:text-foreground">
          Seite zu Paketen und Preisen
        </Link>{" "}
        – einschließlich der laufenden Leistungen und des Stundensatzes für alles, was außerhalb des
        Pakets liegt. Was in Ihrem Fall zusammenkommt, hängt von Umfang und Betriebsgröße ab; die
        Größenordnung können Sie aber vorher einschätzen.
      </p>
      <p>
        Mehr dazu, woran eine Handwerker-Website inhaltlich scheitert oder gelingt, steht im Beitrag{" "}
        <Link href="/magazin/webdesign-handwerksbetriebe-worauf-achten" className="underline hover:text-foreground">
          Webdesign für Handwerksbetriebe
        </Link>
        .
      </p>
    </ArticleLayout>
  );
}
