import type { Metadata } from "next";
import { Section } from "@/components/sections/section";
import { CookieSettingsLink } from "@/components/consent/cookie-settings-link";
import { addressLine, company } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: false, follow: true },
};

export default function DatenschutzPage() {
  return (
    <Section eyebrow="Rechtliches" title="Datenschutzerklärung" className="pt-32">
      <div className="max-w-2xl space-y-10 text-sm leading-relaxed text-muted">
        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-foreground">
            1. Datenschutz auf einen Blick
          </h2>
          <p className="font-medium text-foreground">Allgemeine Hinweise</p>
          <p className="mt-2">
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
            personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten
            sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche
            Informationen entnehmen Sie der unter diesem Text aufgeführten Datenschutzerklärung.
          </p>
          <p className="mt-4 font-medium text-foreground">Wer ist verantwortlich für die Datenerfassung?</p>
          <p className="mt-2">
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
            Kontaktdaten finden Sie im Abschnitt „Hinweis zur verantwortlichen Stelle&rdquo; weiter unten.
          </p>
          <p className="mt-4 font-medium text-foreground">Wie erfassen wir Ihre Daten?</p>
          <p className="mt-2">
            Zum einen dadurch, dass Sie uns diese mitteilen – etwa Daten, die Sie in unser
            Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim
            Besuch der Website erfasst, vor allem technische Daten (z. B. Browser, Betriebssystem,
            Uhrzeit des Seitenaufrufs).
          </p>
          <p className="mt-4 font-medium text-foreground">Wofür nutzen wir Ihre Daten?</p>
          <p className="mt-2">
            Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu
            gewährleisten. Andere Daten – sofern Sie eingewilligt haben – werden zur Analyse Ihres
            Nutzerverhaltens und zur Auswertung von Werbemaßnahmen verwendet.
          </p>
          <p className="mt-4 font-medium text-foreground">Welche Rechte haben Sie bezüglich Ihrer Daten?</p>
          <p className="mt-2">
            Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck
            Ihrer gespeicherten personenbezogenen Daten zu erhalten, sowie ein Recht auf Berichtigung
            oder Löschung dieser Daten. Erteilte Einwilligungen können Sie jederzeit für die Zukunft
            widerrufen – u. a. über die{" "}
            <CookieSettingsLink className="underline hover:text-foreground" />. Außerdem steht Ihnen ein
            Recht auf Einschränkung der Verarbeitung sowie ein Beschwerderecht bei der zuständigen
            Aufsichtsbehörde zu.
          </p>
        </div>

        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-foreground">2. Hosting</h2>
          <p className="font-medium text-foreground">Vercel</p>
          <p className="mt-2">
            Wir hosten die Inhalte unserer Website bei Vercel. Anbieter ist die Vercel Inc., 340 S Lemon
            Ave #4133, Walnut, CA 91789, USA (nachfolgend „Vercel&rdquo;). Wenn Sie unsere Website
            besuchen, erfasst Vercel verschiedene Logfiles inklusive Ihrer IP-Adresse. Details entnehmen
            Sie der Datenschutzerklärung von Vercel:{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              vercel.com/legal/privacy-policy
            </a>
            .
          </p>
          <p className="mt-2">
            Die Verwendung von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein
            berechtigtes Interesse an einer möglichst zuverlässigen und performanten Darstellung unserer
            Website. Da Vercel Daten auch in die USA übertragen kann, stützen wir die Datenübertragung
            auf die Standardvertragsklauseln der EU-Kommission.
          </p>
        </div>

        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-foreground">
            3. Allgemeine Hinweise und Pflichtinformationen
          </h2>
          <p className="font-medium text-foreground">Datenschutz</p>
          <p className="mt-2">
            Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen
            Datenschutzvorschriften sowie dieser Datenschutzerklärung. Wir weisen darauf hin, dass die
            Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken
            aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht
            möglich.
          </p>

          <p className="mt-4 font-medium text-foreground">Hinweis zur verantwortlichen Stelle</p>
          <p className="mt-2">
            Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
            <br />
            {company.owner} – {company.name}
            <br />
            {addressLine}
            <br />
            Telefon: {company.phone}
            <br />
            E-Mail: {company.email}
          </p>

          <p className="mt-4 font-medium text-foreground">Speicherdauer</p>
          <p className="mt-2">
            Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde,
            verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung
            entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung
            widerrufen, werden Ihre Daten gelöscht, sofern keine anderen rechtlich zulässigen Gründe für
            die Speicherung bestehen (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen).
          </p>

          <p className="mt-4 font-medium text-foreground">Rechtsgrundlagen der Datenverarbeitung</p>
          <p className="mt-2">
            Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre Daten auf
            Grundlage von Art. 6 Abs. 1 lit. a DSGVO. Sofern Sie in die Speicherung von Cookies oder den
            Zugriff auf Informationen in Ihrem Endgerät eingewilligt haben, erfolgt die Verarbeitung
            zusätzlich auf Grundlage von § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar.
            Sind Ihre Daten zur Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen
            erforderlich, verarbeiten wir sie auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO. Die
            Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses nach Art. 6 Abs.
            1 lit. f DSGVO erfolgen.
          </p>

          <p className="mt-4 font-medium text-foreground">Empfänger von personenbezogenen Daten</p>
          <p className="mt-2">
            Wir geben personenbezogene Daten nur dann an externe Stellen weiter, wenn dies zur
            Vertragserfüllung erforderlich ist, wenn wir gesetzlich hierzu verpflichtet sind, wenn wir
            ein berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO an der Weitergabe haben oder eine
            sonstige Rechtsgrundlage dies erlaubt. Beim Einsatz von Auftragsverarbeitern (z. B. Vercel,
            Resend, Google) geben wir personenbezogene Daten nur auf Grundlage eines gültigen Vertrags
            über Auftragsverarbeitung weiter.
          </p>

          <p className="mt-4 font-medium text-foreground">Widerruf Ihrer Einwilligung zur Datenverarbeitung</p>
          <p className="mt-2">
            Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie
            können eine bereits erteilte Einwilligung jederzeit widerrufen, z. B. über die{" "}
            <CookieSettingsLink className="underline hover:text-foreground" />. Die Rechtmäßigkeit der bis
            zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
          </p>

          <p className="mt-4 font-medium text-foreground">Widerspruchsrecht (Art. 21 DSGVO)</p>
          <p className="mt-2">
            Sofern die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt,
            haben Sie jederzeit das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben,
            gegen die Verarbeitung Widerspruch einzulegen. Werden Ihre Daten verarbeitet, um Direktwerbung
            zu betreiben, haben Sie das Recht, jederzeit Widerspruch gegen die Verarbeitung zu diesem
            Zweck einzulegen.
          </p>

          <p className="mt-4 font-medium text-foreground">Beschwerderecht bei der zuständigen Aufsichtsbehörde</p>
          <p className="mt-2">
            Im Falle von Verstößen gegen die DSGVO steht Betroffenen ein Beschwerderecht bei einer
            Aufsichtsbehörde zu, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres
            Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes.
          </p>

          <p className="mt-4 font-medium text-foreground">Recht auf Datenübertragbarkeit</p>
          <p className="mt-2">
            Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines
            Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen,
            maschinenlesbaren Format aushändigen zu lassen.
          </p>

          <p className="mt-4 font-medium text-foreground">Auskunft, Berichtigung, Löschung und Einschränkung</p>
          <p className="mt-2">
            Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf
            unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten sowie ggf. ein Recht
            auf Berichtigung, Löschung oder Einschränkung der Verarbeitung dieser Daten. Wenden Sie sich
            hierzu jederzeit an {company.email}.
          </p>

          <p className="mt-4 font-medium text-foreground">SSL-/TLS-Verschlüsselung</p>
          <p className="mt-2">
            Diese Seite nutzt aus Sicherheitsgründen eine SSL-/TLS-Verschlüsselung. Eine verschlüsselte
            Verbindung erkennen Sie daran, dass die Adresszeile Ihres Browsers von „http://&rdquo; auf
            „https://&rdquo; wechselt und an dem Schloss-Symbol in der Browserzeile.
          </p>

          <p className="mt-4 font-medium text-foreground">Widerspruch gegen Werbe-E-Mails</p>
          <p className="mt-2">
            Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung
            von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit
            widersprochen. Wir behalten uns ausdrücklich rechtliche Schritte im Falle unverlangter
            Zusendung von Werbeinformationen vor.
          </p>
        </div>

        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-foreground">
            4. Datenerfassung auf dieser Website
          </h2>
          <p className="font-medium text-foreground">Cookies</p>
          <p className="mt-2">
            Unsere Website verwendet Cookies. Technisch notwendige Cookies (z. B. zum Speichern Ihrer
            Theme- und Cookie-Einstellung) werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gesetzt;
            wir haben ein berechtigtes Interesse an einer technisch fehlerfreien Bereitstellung unserer
            Dienste. Cookies von Google Analytics und Google Ads werden ausschließlich gesetzt, wenn Sie
            hierzu über unseren Cookie-Banner eingewilligt haben (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1
            TDDDG). Ihre Einwilligung ist jederzeit über die{" "}
            <CookieSettingsLink className="underline hover:text-foreground" /> widerrufbar. Solange Sie
            keine Auswahl getroffen haben, werden keine nicht notwendigen Cookies gesetzt.
          </p>

          <p className="mt-4 font-medium text-foreground">Kontaktformular</p>
          <p className="mt-2">
            Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
            Formular (Name, Firma, E-Mail-Adresse, optional Telefonnummer, Branche, Anliegen und
            Nachricht) zur Bearbeitung Ihrer Anfrage per E-Mail an uns übermittelt und dort gespeichert.
            Für den technischen Versand nutzen wir den E-Mail-Dienstleister Resend (Resend, Inc., USA)
            als Auftragsverarbeiter; die Inhalte werden dabei ausschließlich zur Zustellung der E-Mail
            verarbeitet. Details entnehmen Sie der Datenschutzerklärung von Resend:{" "}
            <a
              href="https://resend.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              resend.com/legal/privacy-policy
            </a>
            . Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage
            mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher
            Maßnahmen erforderlich ist, andernfalls auf Grundlage unseres berechtigten Interesses an der
            effektiven Bearbeitung Ihrer Anfrage (Art. 6 Abs. 1 lit. f DSGVO). Die von Ihnen eingegebenen
            Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern oder der Zweck für die
            Datenspeicherung entfällt; gesetzliche Aufbewahrungsfristen bleiben unberührt.
          </p>

          <p className="mt-4 font-medium text-foreground">Anfrage per E-Mail, Telefon oder WhatsApp</p>
          <p className="mt-2">
            Wenn Sie uns per E-Mail, Telefon oder WhatsApp kontaktieren, wird Ihre Anfrage inklusive
            aller daraus hervorgehenden personenbezogenen Daten zum Zwecke der Bearbeitung Ihres
            Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre
            Einwilligung weiter. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b bzw. f
            DSGVO. Die Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern oder der Zweck für
            die Speicherung entfällt; gesetzliche Aufbewahrungsfristen bleiben unberührt.
          </p>
        </div>

        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-foreground">
            5. Analyse-Tools und Werbung
          </h2>
          <p className="font-medium text-foreground">Vercel Web Analytics</p>
          <p className="mt-2">
            Wir nutzen Vercel Web Analytics zur Auswertung des Besucherverhaltens (z. B. Seitenaufrufe,
            Herkunftsseite, ungefährer Standort auf Länder-/Regionsebene). Anbieter ist die Vercel Inc.
            (Anschrift siehe oben, Abschnitt „Hosting&rdquo;). Der Dienst arbeitet nach Angaben von Vercel
            ohne Cookies und ohne Wiedererkennung einzelner Besucher über mehrere Sitzungen hinweg; eine
            Zuordnung zu einer konkreten Person ist uns nicht möglich. Die Verarbeitung erfolgt auf
            Grundlage unseres berechtigten Interesses an der statistischen Analyse und Optimierung
            unseres Webangebots (Art. 6 Abs. 1 lit. f DSGVO) und ist daher nicht von Ihrer Einwilligung
            über den Cookie-Banner abhängig. Details:{" "}
            <a
              href="https://vercel.com/docs/analytics/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              vercel.com/docs/analytics/privacy-policy
            </a>
            .
          </p>

          <p className="mt-4 font-medium text-foreground">Google Analytics</p>
          <p className="mt-2">
            Diese Website nutzt, sofern Sie eingewilligt haben, Google Analytics, einen
            Webanalysedienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland
            (nachfolgend „Google&rdquo;). Google Analytics ermöglicht es uns, das Verhalten der
            Websitebesucher zu analysieren (z. B. Seitenaufrufe, Verweildauer, verwendete
            Betriebssysteme, Herkunft der Nutzer). Dabei können Cookies oder vergleichbare
            Wiedererkennungstechnologien zum Einsatz kommen; die erfassten Informationen werden in der
            Regel an einen Server von Google in den USA übertragen und dort gespeichert. Die Nutzung
            erfolgt ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 25
            Abs. 1 TDDDG), die Sie jederzeit über die{" "}
            <CookieSettingsLink className="underline hover:text-foreground" /> widerrufen können. Die
            Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt.
            Weitere Informationen finden Sie in der Datenschutzerklärung von Google:{" "}
            <a
              href="https://policies.google.com/privacy?hl=de"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              policies.google.com/privacy
            </a>
            .
          </p>

          <p className="mt-4 font-medium text-foreground">Google Ads</p>
          <p className="mt-2">
            Wir verwenden, sofern Sie eingewilligt haben, Google Ads, ein Online-Werbeprogramm der
            Google Ireland Limited (Anschrift siehe oben). Google Ads ermöglicht es uns, Werbeanzeigen in
            der Google-Suchmaschine oder auf Drittwebseiten auszuspielen und die Wirksamkeit dieser
            Anzeigen anhand von Conversion-Daten auszuwerten. Die Nutzung erfolgt ausschließlich auf
            Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG), die Sie
            jederzeit über die <CookieSettingsLink className="underline hover:text-foreground" />{" "}
            widerrufen können. Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der
            EU-Kommission gestützt.
          </p>
        </div>

        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-foreground">6. Kommunikation via WhatsApp</h2>
          <p>
            Für die Kommunikation mit Interessenten und Kunden bieten wir optional den Instant-Messaging-
            Dienst WhatsApp an. Anbieter ist die WhatsApp Ireland Limited, Merrion Road, Dublin 4, D04
            X2K5, Irland. Wenn Sie uns über den auf dieser Website bereitgestellten WhatsApp-Link
            kontaktieren, erhält WhatsApp Zugriff auf die dabei anfallenden Metadaten (z. B. Absender,
            Empfänger, Zeitpunkt) sowie die Kommunikationsinhalte gemäß den eigenen Nutzungsbedingungen
            von WhatsApp. Wir weisen darauf hin, dass WhatsApp nach eigener Aussage personenbezogene Daten
            mit seiner in den USA ansässigen Konzernmutter Meta teilt. Der Einsatz erfolgt auf Grundlage
            unseres berechtigten Interesses an einer schnellen und unkomplizierten Kommunikation mit
            Interessenten und Kunden (Art. 6 Abs. 1 lit. f DSGVO); die Kontaktaufnahme über WhatsApp ist
            freiwillig, alternativ erreichen Sie uns per Telefon, E-Mail oder Kontaktformular. Weitere
            Informationen finden Sie in der Datenschutzrichtlinie von WhatsApp:{" "}
            <a
              href="https://www.whatsapp.com/legal/#privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              whatsapp.com/legal/#privacy-policy
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-foreground">7. Schriftarten</h2>
          <p>
            Diese Website nutzt die Schriftarten „Inter&rdquo; und „Space Grotesk&rdquo;. Die
            Schriftdateien werden beim Build der Website lokal eingebunden (Self-Hosting); es findet
            keine Verbindung zu Google-Servern beim Aufruf der Seite statt.
          </p>
        </div>
      </div>
    </Section>
  );
}
