import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/sections/article-layout";
import { getArticleBySlug } from "@/lib/articles";

const article = getArticleBySlug("php2shell-sicherheitsluecke-webseite")!;

export const metadata: Metadata = {
  title: { absolute: article.seoTitle },
  description: article.metaDescription,
  alternates: { canonical: `/magazin/${article.slug}` },
};

export default function ArticlePage() {
  return (
    <ArticleLayout article={article}>
      <p>
        <strong>Kurz gesagt:</strong> Am 21. Oktober 2026 wurden zwei kritische Sicherheitslücken in
        PHP veröffentlicht, zusammengefasst unter dem Namen <em>php2shell</em>. Angreifer können über
        sie fremden Code auf einem Webserver ausführen – ohne Passwort, ohne Anmeldung, aus der Ferne.
        Betroffen sind sämtliche PHP-Versionen der letzten zwanzig Jahre. Wer eine Webseite hat,
        sollte heute klären, ob sie aktualisiert wurde.
      </p>

      <h2>Warum das fast jede Webseite betrifft</h2>
      <p>
        PHP ist die Programmiersprache, in der ein großer Teil des Webs geschrieben ist. WordPress
        läuft darauf, TYPO3, Joomla, die meisten Shopsysteme und unzählige Baukästen. Wenn Ihre
        Webseite nicht gerade von Grund auf anders gebaut wurde, steht die Wahrscheinlichkeit hoch,
        dass im Hintergrund PHP arbeitet.
      </p>
      <p>
        Die beiden Fehler stecken an Stellen, die bei jedem Seitenaufruf beteiligt sind: in der
        Speicherverwaltung (<strong>CVE-2026-109618</strong>) und in der Fehlerbehandlung
        (<strong>CVE-2026-109619</strong>). Beide sind mit einem CVSS-Wert von 9,2 als kritisch
        eingestuft – die Skala endet bei 10.
      </p>
      <p>
        Ein Angriff braucht keine Zugangsdaten. Er funktioniert, indem sehr viele Anfragen an den
        Server geschickt werden, bis der Fehler auslöst. Die Entdecker von Calif haben gezeigt, wie
        sie auf diesem Weg in 38 Sekunden Befehle auf einem fremden Webserver ausführen. Cloudflare
        beobachtet nach Angaben von Reuters bereits Millionen von Angriffsversuchen.
      </p>

      <h2>Was das praktisch bedeutet</h2>
      <p>
        Wer einen Webserver übernimmt, kann mehr als die Seite verunstalten. Üblich ist, dass die
        Seite unauffällig weiterläuft und im Hintergrund Schadsoftware an Besucher ausliefert,
        Weiterleitungen auf fremde Shops eingebaut werden oder der Server als Versandstation für
        Spam dient. Auffällig wird es meist erst, wenn Google die Seite als gefährlich markiert –
        und dann sehen Ihre Kunden eine rote Warnseite statt Ihres Betriebs.
      </p>
      <p>
        Deshalb haben in den vergangenen Tagen zahlreiche Anbieter ihre Seiten vorübergehend
        abgeschaltet, statt das Risiko zu tragen.
      </p>

      <h2>Drei Dinge, die Sie prüfen sollten</h2>
      <p>
        <strong>1. Ihre Webseite.</strong> Wenn Ihre Seite bei einem Anbieter wie IONOS, Strato oder
        einer Agentur liegt, ist das Einspielen der Updates deren Aufgabe. Verlassen Sie sich nicht
        stillschweigend darauf, sondern fragen Sie nach. Eine Mail genügt: <em>„Ist unser Webhosting
        gegen die PHP-Lücken CVE-2026-109618 und CVE-2026-109619 aktualisiert?“</em> Wer darauf
        innerhalb eines Tages keine klare Antwort gibt, hat ein anderes Problem als diese Lücke.
      </p>
      <p>
        Die abgesicherten Versionen sind PHP 8.5.12, 8.4.27, 8.3.36 und 8.2.35. Läuft Ihre Seite auf
        einer älteren Reihe – etwa PHP 7 oder gar 5 –, gibt es dafür keine Aktualisierung mehr. Dann
        ist nicht das Update das Thema, sondern dass die Seite seit Jahren ohne Sicherheitspflege
        läuft.
      </p>
      <p>
        <strong>2. Das Gerät im Büro, an das niemand denkt.</strong> Dieser Punkt wird am häufigsten
        übersehen. Viele Netzwerkspeicher – die Kästen von Synology oder QNAP, auf denen Pläne,
        Angebote und Fotos liegen – haben eine Weboberfläche, die ebenfalls auf PHP aufsetzt.
        Dasselbe gilt für manche Router und Überwachungskameras. Ist so ein Gerät aus dem Internet
        erreichbar, ist es angreifbar. Prüfen Sie in der Softwareverwaltung des Geräts auf Updates.
      </p>
      <p>
        <strong>3. Ob Ihre Seite noch sauber ist.</strong> Wurde Ihre Seite in den letzten Tagen nicht
        aktualisiert, reicht ein Update möglicherweise nicht. Wer schon drin war, bleibt es meist
        auch nach dem Patch. Anzeichen sind unbekannte Dateien im Webverzeichnis, neue
        Administratorkonten oder plötzlich langsame Ladezeiten.
      </p>

      <h2>Wer nicht betroffen ist</h2>
      <p>
        Seiten ohne PHP. Dazu gehören Auftritte, die als statische Seiten ausgeliefert werden – etwa
        mit Next.js, Astro oder Hugo gebaut und bei einem Anbieter wie Vercel oder Netlify gehostet.
        Dort wird beim Aufruf kein Programm auf einem Server ausgeführt, sondern eine fertige Datei
        ausgeliefert. Was nicht läuft, kann nicht übernommen werden.
      </p>
      <p>
        Das ist kein Argument gegen PHP – die Sprache treibt einen großen Teil des Webs an und wird
        aktiv gepflegt; die Updates standen am Tag der Veröffentlichung bereit. Es ist ein Hinweis
        darauf, dass die Bauweise einer Webseite darüber mitentscheidet, wie viel Wartung sie
        dauerhaft braucht. Eine Seite mit Datenbank und Anmeldebereich braucht beides: regelmäßige
        Pflege und jemanden, der bei so einer Meldung innerhalb eines Tages reagiert.
      </p>
      <p>
        Die Webseite, auf der Sie diesen Text lesen, enthält kein PHP. Für uns war der 21. Oktober
        ein Tag wie jeder andere – nicht, weil wir klüger wären, sondern weil wir an dieser Stelle
        eine andere Bauweise gewählt haben.
      </p>

      <h2>Was zu tun ist</h2>
      <ul>
        <li>Beim Hoster oder der Agentur nachfragen, ob aktualisiert wurde – heute, nicht nächste Woche.</li>
        <li>Netzwerkspeicher, Router und Kameras mit Weboberfläche auf Updates prüfen.</li>
        <li>Läuft die Seite auf PHP 7 oder älter: Das ist kein Update-Fall, sondern ein Grundproblem.</li>
        <li>Nach dem Update kontrollieren, ob die Seite normal läuft und nichts Fremdes dazugekommen ist.</li>
      </ul>
      <p>
        Wenn Sie nicht wissen, worauf Ihre Webseite läuft oder wer sie betreut, ist das ein eigener
        Befund – und der häufigste, dem wir begegnen. Wir sehen uns das an und sagen Ihnen, woran Sie
        sind. Schreiben Sie uns über{" "}
        <Link href="/kontakt">das Kontaktformular</Link> oder prüfen Sie zuerst Ihre{" "}
        <Link href="/email-check">E-Mail-Einstellungen</Link> – das dauert eine Minute und ist der
        zweite Punkt, an dem die meisten Betriebe offen stehen.
      </p>

      <h2>Quellen</h2>
      <p>
        Die technischen Angaben in diesem Text stammen aus der Berichterstattung von heise security
        vom 21. und 22. Oktober 2026 sowie aus den Veröffentlichungen des PHP-Projekts. Stand dieses
        Artikels: 22. Oktober 2026. Die Lage kann sich kurzfristig ändern.
      </p>
    </ArticleLayout>
  );
}
