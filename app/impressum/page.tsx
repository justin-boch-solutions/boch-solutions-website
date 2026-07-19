import type { Metadata } from "next";
import { Section } from "@/components/sections/section";
import { addressLine, company } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return (
    <Section eyebrow="Rechtliches" title="Impressum" className="pt-32">
      <div className="max-w-2xl space-y-8 text-sm leading-relaxed text-muted">
        <div>
          <h2 className="mb-2 font-display text-lg font-semibold text-foreground">
            Angaben gemäß § 5 TMG
          </h2>
          <p>
            {company.owner}
            <br />
            {company.legalForm} „{company.name}&rdquo;
            <br />
            {addressLine}
            <br />
            Deutschland
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-display text-lg font-semibold text-foreground">Kontakt</h2>
          <p>
            Telefon: {company.phone}
            <br />
            E-Mail: {company.email}
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-display text-lg font-semibold text-foreground">
            Umsatzsteuer-ID
          </h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
            <br />
            {company.vatId}
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-display text-lg font-semibold text-foreground">
            Redaktionell verantwortlich
          </h2>
          <p>
            {company.legalName}
            <br />
            {addressLine}
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-display text-lg font-semibold text-foreground">
            Verbraucherstreitbeilegung / Universalschlichtungsstelle
          </h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>

        <div>
          <h2 className="mb-2 font-display text-lg font-semibold text-foreground">Haftung für Inhalte</h2>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach
            den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
            jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
            überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
            hinweisen.
          </p>
        </div>
      </div>
    </Section>
  );
}
