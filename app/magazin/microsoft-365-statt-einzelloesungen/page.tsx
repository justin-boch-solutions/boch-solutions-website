import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/sections/article-layout";
import { getArticleBySlug } from "@/lib/articles";

const article = getArticleBySlug("microsoft-365-statt-einzelloesungen")!;

export const metadata: Metadata = {
  title: article.title,
  description: article.excerpt,
  alternates: { canonical: `/magazin/${article.slug}` },
};

export default function ArticlePage() {
  return (
    <ArticleLayout article={article}>
      <p>
        <strong>Kurz gesagt:</strong> Viele Handwerksbetriebe arbeiten mit einer IT, die über Jahre aus
        Einzellösungen gewachsen ist – privates E-Mail-Postfach, Excel-Terminplan, WhatsApp fürs Team,
        ein alter Server im Büro. Microsoft 365 ersetzt diese Insellösungen durch eine gemeinsame,
        zentral verwaltete Umgebung für E-Mail, Dateien, Termine und Kommunikation – mit spürbar
        weniger Verwaltungsaufwand im Alltag.
      </p>

      <h2>Das Problem: eine IT, die niemand geplant hat</h2>
      <p>
        Kaum ein Handwerksbetrieb startet mit einem durchdachten IT-Konzept. Meistens entsteht die
        Struktur nebenbei: Ein Mitarbeiter richtet ein Gmail-Postfach ein, ein anderer legt Dateien auf
        seinem privaten Laptop ab, Termine werden im Kopf oder auf Zetteln koordiniert. Das funktioniert
        eine Weile – bis ein Laptop ausfällt, ein Mitarbeiter den Betrieb verlässt und mit ihm wichtige
        Kundenkontakte, oder eine Rechnung im Spam-Ordner eines Kunden landet, weil die E-Mail-Adresse
        keine ordentliche Zustellsicherheit hat.
      </p>
      <p>
        Das eigentliche Problem ist dabei selten eine einzelne fehlende Funktion, sondern die fehlende
        gemeinsame Basis: Jedes Werkzeug hat seine eigene Anmeldung, seine eigene Ablage, seine eigenen
        Regeln. Für den Büroalltag bedeutet das ständiges Suchen, Nachfragen und doppelte Arbeit.
      </p>

      <h2>Was sich mit Microsoft 365 konkret ändert</h2>
      <p>
        Microsoft 365 bündelt E-Mail (Exchange), Dateiablage (OneDrive/SharePoint), Kommunikation
        (Teams) und Office-Programme in einer Umgebung mit einem einzigen Login pro Mitarbeitendem.
        Praktisch heißt das:
      </p>
      <ul>
        <li>
          Ein Dokument liegt an einem Ort und ist von Büro, Baustelle und Homeoffice aus über dasselbe
          Konto erreichbar – nicht auf drei verschiedenen Laptops in drei Versionen.
        </li>
        <li>
          Scheidet ein Mitarbeitender aus, bleiben E-Mails, Kontakte und Dateien im Unternehmen statt im
          privaten Postfach zu verschwinden.
        </li>
        <li>
          Neue Mitarbeitende bekommen ein Konto und haben sofort Zugriff auf das, was sie brauchen –
          ohne dass jemand manuell fünf verschiedene Zugänge einrichten muss.
        </li>
      </ul>

      <h2>Ist das nicht nur etwas für große Unternehmen?</h2>
      <p>
        Diese Sorge hören wir oft – zurecht, wenn man an klassische, teure Server-Infrastruktur denkt.
        Microsoft 365 ist aber nutzerbasiert lizenziert: Sie zahlen pro Mitarbeitendem, nicht pro
        Server. Ein Betrieb mit drei oder fünf Mitarbeitenden profitiert von derselben Struktur wie ein
        großes Unternehmen, ohne einen eigenen Server betreiben oder warten zu müssen. Die Einrichtung
        lässt sich zudem schrittweise angehen – man muss nicht alles auf einmal umstellen.
      </p>

      <h2>Der pragmatische erste Schritt</h2>
      <p>
        Der sinnvollste Einstieg ist selten „alles gleichzeitig&rdquo;, sondern eine kurze
        Bestandsaufnahme: Welche E-Mail-Adressen, Dateiablagen und Kommunikationswege sind aktuell im
        Einsatz, und wo entsteht der meiste Reibungsverlust? Darauf aufbauend lässt sich eine
        Microsoft-365-Struktur planen, die zur tatsächlichen Betriebsgröße passt – nicht zu einer
        Vorlage von der Stange.
      </p>
      <p>
        Mehr zur konkreten Einrichtung finden Sie auf unserer Leistungsseite zu{" "}
        <Link href="/leistungen/microsoft-365-azure" className="underline hover:text-foreground">
          Microsoft 365 &amp; Azure
        </Link>
        .
      </p>
    </ArticleLayout>
  );
}
