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
  { label: "Hardwareluxx: Weltweite Microsoft-365-Störung", href: "https://www.hardwareluxx.de/index.php/news/software/browser-und-internet/70963-weltweite-microsoft-365-stoerung-outlook-teams-und-copilot-seit-donnerstag.html" },
  { label: "epifive: Microsoft 365 Outage Nov 2026 – Resolved, Cause, Next Steps", href: "https://www.epifive.com/blog/microsoft-365-outage-november-2026-what-to-do" },
  { label: "GamePro: Microsoft-Dienste down – Live-Ticker", href: "https://www.gamepro.de/artikel/microsoft-dienste-down-live-ticker,3462980.html" },
];

export default function ArticlePage() {
  return (
    <ArticleLayout article={article}>
      <p className="rounded-xl border border-green-500/40 bg-green-500/5 px-4 py-3 text-sm">
        <strong>Update vom 15. November 2026: Die Störung ist behoben.</strong> Microsoft hat den
        Dienst in der Nacht zum Samstag, 14. November, vollständig wiederhergestellt und den
        Rückstau an E-Mails abgearbeitet. Die Ursache ist vorläufig benannt, den ausführlichen
        Abschlussbericht hat Microsoft für die kommenden Werktage angekündigt.
      </p>

      <p>
        <strong>Kurz gesagt:</strong> Von Donnerstag, dem 12. November, bis in die Nacht zum Samstag
        war Microsofts E-Mail-Dienst Exchange Online in vielen Ländern gestört – und damit Outlook,
        der Kalender in Teams und weitere Microsoft-365-Dienste. Ein Hackerangriff war es nicht,
        sondern ein Fehler in Microsofts Netzwerk. E-Mails sind in der Regel nicht verloren
        gegangen, sondern verspätet angekommen. Was Sie jetzt noch tun sollten: kurz prüfen, ob in
        den zwei Tagen etwas Wichtiges untergegangen ist.
      </p>

      <h2>Was passiert ist</h2>
      <p>
        Die Probleme begannen am Donnerstagnachmittag deutscher Zeit bei Exchange Online, dem Dienst,
        der hinter den Firmenpostfächern in Microsoft 365 steckt. Innerhalb einer Stunde gingen beim
        Störungsportal Downdetector Meldungen aus 74 Ländern ein, gegen 19 Uhr waren es allein zu
        Outlook mehr als 130.000.
      </p>
      <p>
        Betroffen waren vor allem Outlook im Web, in der App und auf dem Smartphone, der Kalender in
        Teams, Copilot, Planner, To Do und Intune. Auch Programme, die auf den Outlook-Kalender
        zugreifen – etwa Terminbuchungs-Tools oder Videokonferenz-Anbieter –, meldeten Probleme.
        Weitgehend funktionierten dagegen der Chat in Teams, Online-Besprechungen und Dateien in
        SharePoint und OneDrive.
      </p>
      <p>
        Die Wiederherstellung zog sich hin: Neu gestartete Server fielen unter der Last sofort
        wieder aus. Erst am späten Freitagabend meldete Microsoft eine stabile Erholung, in der Nacht
        zum Samstag galt der Dienst als vollständig wiederhergestellt. Insgesamt dauerte die Störung
        damit gut anderthalb Tage.
      </p>

      <h2>Was die Ursache war</h2>
      <p>
        Nach der vorläufigen Analyse von Microsoft lag der Fehler in einem früheren Ausbau der
        Netzwerkkapazität. Er blieb zunächst unbemerkt und trat erst zutage, als Microsoft später
        eine weitere Änderung am Netzwerk vornahm. Daraufhin fiel eine große Zahl von
        Exchange-Online-Servern aus, die übrigen mussten deren Arbeit mit übernehmen – und ein
        Prozess, der auf ihnen die verschlüsselten Verbindungen aufbaut, war damit überlastet.
      </p>
      <p>
        Microsoft betont, dass es keine Hinweise auf einen Angriff gibt. Einen vorläufigen
        Abschlussbericht hat das Unternehmen innerhalb von zwei Werktagen angekündigt, den
        endgültigen innerhalb von fünf. Wir ergänzen diesen Artikel, falls sich daraus etwas Neues
        für Betriebe ergibt.
      </p>

      <h2>Sind E-Mails verloren gegangen?</h2>
      <p>
        In aller Regel nicht. Nimmt Exchange Online eine Nachricht nicht an, versucht der Server des
        Absenders die Zustellung nach einiger Zeit erneut – das ist bei E-Mail seit jeher so
        vorgesehen. Microsoft hat den Rückstau nach eigenen Angaben abgearbeitet.
      </p>
      <p>
        Ein Restrisiko bleibt: Manche Absender geben nach einer gewissen Zeit auf. Dann haben sie
        eine Fehlermeldung bekommen, Sie aber nichts. Das betrifft vor allem automatische
        Nachrichten von Shops, Portalen und Kontaktformularen, die keinen zweiten Anlauf nehmen.
      </p>

      <h2>Was Sie jetzt noch tun sollten</h2>
      <p>
        <strong>1. Eingänge vom 12. und 13. November prüfen.</strong> Sind Anfragen über Ihr
        Kontaktformular oder Ihre Info-Adresse angekommen? Fehlt eine erwartete Rechnung, eine
        Bestellbestätigung oder die Antwort auf ein Angebot? Bei Lücken lieber einmal nachfragen.
      </p>
      <p>
        <strong>2. Termine kontrollieren.</strong> Wer in dieser Zeit Besprechungen in Teams oder
        Outlook angelegt hat, sollte prüfen, ob die Einladungen wirklich verschickt wurden und im
        Kalender der Teilnehmer stehen.
      </p>
      <p>
        <strong>3. Hängengebliebene Geräte neu starten.</strong> Läuft Outlook auf einem Rechner
        oder Smartphone immer noch nicht, reicht oft ein Neustart oder ein manuelles Abrufen. Wurde
        während der Störung das Outlook-Profil gelöscht, ein Konto neu eingerichtet oder das
        Passwort geändert, liegt das Problem meist dort – das sollte sich jemand ansehen, der das
        Postfach kennt.
      </p>
      <p>
        <strong>4. Weiter vorsichtig bei „Störungs-Mails“ bleiben.</strong> Große Ausfälle sind ein
        beliebter Anlass für Betrüger, und solche Nachrichten kommen oft noch Tage später: „Ihr
        Postfach muss nach der Störung neu bestätigt werden“, mit Link zu einer nachgebauten
        Anmeldeseite. Microsoft verschickt solche Aufforderungen nicht. Melden Sie sich nur über
        Adressen an, die Sie selbst eintippen oder als Lesezeichen gespeichert haben.
      </p>

      <h2>Was der Ausfall für Ihren Betrieb bedeutet</h2>
      <p>
        Ein Ausfall dieser Größe ist selten, aber er zeigt: Auch die Cloud ist nicht unfehlbar.
        Microsoft sagt für Exchange Online eine Verfügbarkeit von 99,9 Prozent im Monat zu – das
        lässt rechnerisch gut 40 Minuten Ausfall im Monat zu, und anderthalb Tage liegen weit
        darüber. Trotzdem ist ein Postfach in Microsoft 365 für die meisten Betriebe
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
        Grundlage sind die Statusmeldungen von Microsoft (Vorfälle EX1550543 und MO1550821) und die
        Berichte von:
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
