import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/sections/article-layout";
import { getArticleBySlug } from "@/lib/articles";

const article = getArticleBySlug("microsoft-365-stoerung-november-2026")!;

export const metadata: Metadata = {
  title: { absolute: article.seoTitle },
  description: article.metaDescription,
  alternates: { canonical: `/magazin/${article.slug}` },
};

const linkClass = "underline hover:text-foreground";

const sources = [
  { label: "ITdaily: Microsoft 365 still offline (laufend aktualisiert)", href: "https://itdaily.com/news/cloud/microsoft-365-outage-outlook-teams/" },
  { label: "CNBC: Widespread Microsoft outage takes down Outlook and other 365 services", href: "https://www.cnbc.com/2026/11/12/microsoft-outage-outlook-aws-google.html" },
  { label: "Tom's Guide: Live-Updates zum Ausfall", href: "https://www.tomsguide.com/news/live/microsoft-outlook-down-live-updates-outage-11-12-26" },
  { label: "GamePro: Microsoft-Dienste down – Live-Ticker", href: "https://www.gamepro.de/artikel/microsoft-dienste-down-live-ticker,3462980.html" },
];

export default function ArticlePage() {
  return (
    <ArticleLayout article={article}>
      <p className="rounded-xl border border-amber-500/40 bg-amber-500/5 px-4 py-3 text-sm">
        <strong>Stand: Freitag, 13. November 2026, vormittags.</strong> Die Störung ist noch nicht
        vollständig behoben. Den aktuellen Stand meldet Microsoft auf{" "}
        <a href="https://status.cloud.microsoft" className={linkClass} rel="noopener noreferrer" target="_blank">
          status.cloud.microsoft
        </a>
        .
      </p>

      <p>
        <strong>Kurz gesagt:</strong> Seit Donnerstag, dem 12. November, ist Microsofts E-Mail-Dienst
        Exchange Online in vielen Ländern gestört – und damit Outlook, der Kalender in Teams und
        weitere Microsoft-365-Dienste. Es handelt sich nach Angaben von Microsoft nicht um einen
        Hackerangriff. E-Mails gehen in der Regel nicht verloren, sondern kommen verspätet an. Das
        Wichtigste für Ihren Betrieb jetzt: nichts am eigenen Rechner verstellen, Wichtiges per
        Telefon klären und auf gefälschte „Störungs-Mails“ achten.
      </p>

      <h2>Was passiert ist</h2>
      <p>
        Die Probleme begannen am Donnerstagnachmittag deutscher Zeit bei Exchange Online, dem Dienst,
        der hinter den Firmenpostfächern in Microsoft 365 steckt. Innerhalb einer Stunde gingen beim
        Störungsportal Downdetector Meldungen aus 74 Ländern ein, gegen 19 Uhr waren es allein zu
        Outlook mehr als 130.000.
      </p>
      <p>
        Microsoft erklärte am Abend, die erhöhte Last komme nicht von mehr Datenverkehr, sondern
        daher, dass eine große Zahl von Servern unerwartet nicht verfügbar sei – deren Arbeit
        landete auf den übrigen Servern und überlastete sie. In der Nacht begann Microsoft, eine kurz
        zuvor vorgenommene Änderung an der Netzwerkkonfiguration zurückzunehmen, die zeitlich mit
        dem Beginn der Störung zusammenfällt. Ob sie die Ursache war, hat Microsoft noch nicht
        bestätigt.
      </p>
      <p>
        Am Freitagmorgen meldete Microsoft erste Anzeichen einer Stabilisierung, die Kapazität sei
        aber noch nicht wieder auf normalem Niveau. Einen Zeitpunkt für die vollständige
        Wiederherstellung gibt es bislang nicht.
      </p>

      <h2>Was betroffen ist – und was weiter funktioniert</h2>
      <p>Nach den Meldungen von Microsoft sind vor allem betroffen:</p>
      <ul>
        <li>
          <strong>Outlook und E-Mail:</strong> Postfächer laden nicht oder nur teilweise, im Web, in
          der App und auf dem Smartphone. Eingehende E-Mails kommen verzögert an.
        </li>
        <li>
          <strong>Teams-Kalender:</strong> Besprechungen lassen sich teils nicht planen oder anlegen.
        </li>
        <li>
          <strong>Weitere Dienste:</strong> Copilot, Planner, To Do, Intune sowie Teile des Admin
          Centers. Auch Programme, die auf den Outlook-Kalender zugreifen – etwa Terminbuchungs-Tools
          oder Videokonferenz-Anbieter –, melden Probleme.
        </li>
      </ul>
      <p>
        Weitgehend funktionieren laut Microsoft dagegen der <strong>Chat in Teams</strong>,{" "}
        <strong>Online-Besprechungen</strong> und der Zugriff auf <strong>Dateien in SharePoint und
        OneDrive</strong>. Wer intern dringend etwas abstimmen muss, kann also auf den Teams-Chat
        ausweichen.
      </p>

      <h2>Gehen E-Mails verloren?</h2>
      <p>
        In aller Regel nicht. Nimmt Exchange Online eine Nachricht nicht an, versucht der Server des
        Absenders die Zustellung nach einiger Zeit erneut – das ist bei E-Mail seit jeher so
        vorgesehen. Microsoft hat angekündigt, verzögerte Nachrichten nachzuliefern, und den Zeitraum
        dafür auf bis zu 48 Stunden verlängert.
      </p>
      <p>
        Ein Restrisiko bleibt: Manche Absender geben nach einer gewissen Zeit auf, dann erhalten sie
        eine Fehlermeldung, Sie aber nichts. Für Anfragen, Angebote und Auftragsbestätigungen, die
        gerade laufen, gilt deshalb: lieber einmal anrufen als zwei Tage auf eine Antwort warten.
      </p>

      <h2>Was Sie jetzt tun sollten</h2>
      <p>
        <strong>1. Nichts am eigenen Rechner verstellen.</strong> Die Störung liegt bei Microsoft. Ein
        gelöschtes Outlook-Profil, ein neu eingerichtetes Postfach oder ein geändertes Passwort
        lösen nichts – können aber dafür sorgen, dass Outlook auch dann nicht funktioniert, wenn
        Microsoft den Dienst wiederhergestellt hat. Bereits geladene E-Mails bleiben im
        Desktop-Outlook übrigens lesbar, weil sie dort zwischengespeichert sind.
      </p>
      <p>
        <strong>2. Den offiziellen Status prüfen.</strong> Ob die Störung noch läuft, sehen Sie auf{" "}
        <a href="https://status.cloud.microsoft" className={linkClass} rel="noopener noreferrer" target="_blank">
          status.cloud.microsoft
        </a>
        . Wer Zugriff auf das Microsoft 365 Admin Center hat, findet dort unter
        „Dienstintegrität“ die Vorfälle <strong>EX1550543</strong> und <strong>MO1550821</strong> mit
        den laufenden Updates.
      </p>
      <p>
        <strong>3. Wichtiges telefonisch klären.</strong> Kunden, die heute ein Angebot erwarten,
        Lieferanten mit offenen Bestellungen, Termine für Montag: ein kurzer Anruf erspart
        Missverständnisse. Intern funktioniert der Teams-Chat in den meisten Fällen weiter.
      </p>
      <p>
        <strong>4. Vorsicht vor gefälschten Störungs-Mails.</strong> Große Ausfälle sind ein
        beliebter Anlass für Betrüger. Typisch sind Nachrichten wie „Ihr Postfach muss nach der
        Störung neu bestätigt werden“ mit einem Link zu einer nachgebauten Anmeldeseite. Microsoft
        verschickt solche Aufforderungen nicht. Melden Sie sich nur über die Adressen an, die Sie
        selbst eintippen oder als Lesezeichen gespeichert haben.
      </p>
      <p>
        <strong>5. Nach der Störung kurz nachkontrollieren.</strong> Sobald wieder alles läuft:
        Prüfen Sie, ob Anfragen über Ihr Kontaktformular oder Ihre Info-Adresse aus den letzten
        Tagen angekommen sind, und fragen Sie bei Absendern nach, von denen Sie eine Antwort
        erwartet hätten.
      </p>

      <h2>Was der Ausfall für Ihren Betrieb bedeutet</h2>
      <p>
        Ein Ausfall dieser Größe ist selten, aber er zeigt: Auch die Cloud ist nicht unfehlbar.
        Microsoft sagt für Exchange Online eine Verfügbarkeit von 99,9 Prozent im Monat zu – das
        lässt rechnerisch gut 40 Minuten Ausfall im Monat zu, und ein Ereignis wie dieses liegt
        deutlich darüber. Trotzdem ist ein Postfach in Microsoft 365 für die meisten Betriebe
        zuverlässiger als ein eigener Server im Büro, der bei einem Defekt oft tagelang ausfällt und
        dann niemanden hat, der nachts daran arbeitet.
      </p>
      <p>Die richtige Konsequenz ist deshalb nicht der Wechsel, sondern ein kleiner Notfallplan:</p>
      <ul>
        <li>
          Eine <strong>aktuelle Telefonliste</strong> der wichtigsten Kunden, Lieferanten und
          Mitarbeitenden, die nicht nur in Outlook liegt.
        </li>
        <li>
          Eine <strong>unabhängige Sicherung</strong> der Postfächer und Dateien. Microsoft schützt
          vor dem Ausfall eines Rechenzentrums, aber nicht vor versehentlich gelöschten Daten oder
          einem gekaperten Konto.
        </li>
        <li>
          Eine <strong>feste Ansprechperson</strong>, die bei einer Störung schnell einordnet, ob das
          Problem bei Microsoft liegt oder im eigenen Betrieb – und Ihnen sagt, was zu tun ist.
        </li>
      </ul>
      <p>
        Genau das gehört bei uns zur{" "}
        <Link href="/leistungen/it-support-wartung" className={linkClass}>
          laufenden IT-Betreuung
        </Link>
        : Wir behalten den Microsoft-Status für unsere Kunden im Blick, melden uns bei Störungen von
        selbst und richten Sicherung und Notfallplan so ein, dass ein Ausfall wie dieser den Betrieb
        nicht lahmlegt. Mehr zur Grundlage lesen Sie auf unserer Seite zu{" "}
        <Link href="/leistungen/microsoft-365-azure" className={linkClass}>
          Microsoft 365 für Handwerksbetriebe
        </Link>
        .
      </p>

      <h2>Quellen</h2>
      <p className="text-sm">
        Wir aktualisieren diesen Artikel, sobald Microsoft die Störung für behoben erklärt oder die
        Ursache bestätigt. Grundlage sind die Statusmeldungen von Microsoft und die Berichte von:
      </p>
      <ul className="text-sm">
        {sources.map((source) => (
          <li key={source.href}>
            <a href={source.href} className={linkClass} rel="noopener noreferrer" target="_blank">
              {source.label}
            </a>
          </li>
        ))}
      </ul>
    </ArticleLayout>
  );
}
