import type { Metadata } from "next";
import { Section } from "@/components/sections/section";
import { addressLine, company } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: false, follow: true },
};

export default function DatenschutzPage() {
  return (
    <Section eyebrow="Rechtliches" title="Datenschutzerklärung" className="pt-32">
      <div className="mb-10 rounded-xl border border-accent/40 bg-accent/10 p-5 text-sm text-foreground">
        Hinweis: Dieser Entwurf beschreibt den technischen Stand der Webseite (kein Tracking, keine
        Cookies, Kontaktformular ohne serverseitige Speicherung, Hosting über Vercel). Er sollte vor
        Veröffentlichung rechtlich geprüft und bei Änderungen (z. B. Einbindung von Analyse-Tools)
        aktualisiert werden.
      </div>

      <div className="max-w-2xl space-y-8 text-sm leading-relaxed text-muted">
        <div>
          <h2 className="mb-2 font-display text-lg font-semibold text-foreground">
            1. Verantwortlicher
          </h2>
          <p>
            {company.owner}, {company.legalForm} „{company.name}&rdquo;
            <br />
            {addressLine}
            <br />
            E-Mail: {company.email}
            <br />
            Telefon: {company.phone}
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-display text-lg font-semibold text-foreground">
            2. Hosting & Server-Log-Dateien
          </h2>
          <p>
            Diese Webseite wird über Vercel gehostet. Beim Aufruf der Seite erhebt der Hosting-Anbieter
            automatisch technische Informationen (sogenannte Server-Log-Dateien), die Ihr Browser
            übermittelt, etwa Browsertyp, Betriebssystem, Referrer-URL, IP-Adresse und Uhrzeit der
            Anfrage. Diese Daten dienen der technischen Bereitstellung und Absicherung der Webseite und
            werden nicht mit anderen Datenquellen zusammengeführt.
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-display text-lg font-semibold text-foreground">3. Schriftarten</h2>
          <p>
            Diese Webseite nutzt die Schriftarten „Inter&rdquo; und „Space Grotesk&rdquo;. Die Schriftdateien werden
            beim Build der Webseite lokal eingebunden (Self-Hosting), es findet keine Verbindung zu
            Google-Servern beim Aufruf der Seite statt.
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-display text-lg font-semibold text-foreground">
            4. Kontaktformular
          </h2>
          <p>
            Das Kontaktformular öffnet beim Absenden Ihr lokales E-Mail-Programm mit einer
            vorausgefüllten Nachricht an {company.email}. Die eingegebenen Daten werden dabei nicht an
            unseren Webserver übertragen oder dort gespeichert, sondern erst mit dem tatsächlichen
            Versand der E-Mail durch Sie an uns übermittelt und anschließend zur Bearbeitung Ihrer
            Anfrage verarbeitet (Art. 6 Abs. 1 lit. b DSGVO).
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-display text-lg font-semibold text-foreground">
            5. Cookies & Tracking
          </h2>
          <p>
            Diese Webseite setzt aktuell keine Cookies zu Analyse- oder Marketingzwecken ein und
            verwendet keine Tracking- oder Analyse-Tools. Sollte sich dies zukünftig ändern, wird diese
            Erklärung entsprechend aktualisiert.
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-display text-lg font-semibold text-foreground">
            6. Ihre Rechte
          </h2>
          <p>
            Sie haben das Recht auf Auskunft, Berichtigung, Löschung oder Einschränkung der Verarbeitung
            Ihrer personenbezogenen Daten sowie ein Recht auf Datenübertragbarkeit und Widerspruch gegen
            die Verarbeitung. Wenden Sie sich hierzu an {company.email}. Zudem steht Ihnen ein
            Beschwerderecht bei der zuständigen Datenschutzaufsichtsbehörde zu.
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-display text-lg font-semibold text-foreground">
            7. SSL-/TLS-Verschlüsselung
          </h2>
          <p>
            Diese Seite nutzt aus Sicherheitsgründen eine SSL-/TLS-Verschlüsselung. Eine verschlüsselte
            Verbindung erkennen Sie an „https://&rdquo; in der Adresszeile Ihres Browsers.
          </p>
        </div>
      </div>
    </Section>
  );
}
