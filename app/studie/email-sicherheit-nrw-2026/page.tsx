import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, CheckCircle2, Database, ShieldAlert } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { CtaSection } from "@/components/sections/cta-section";
import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { company } from "@/lib/constants";
import {
  bezirke,
  branchen,
  einschraenkungen,
  handwerkBefunde,
  organisationen,
  prozent,
  studie,
  zahl,
} from "@/lib/studie";

const url = `${company.url}/studie/${studie.slug}`;

export const metadata: Metadata = {
  title: { absolute: "Studie: Jede zweite Firmen-E-Mail in NRW lässt sich fälschen" },
  description:
    "Untersuchung von 15.452 Unternehmen in NRW: Bei 54 Prozent kann ein Fremder E-Mails im Firmennamen verschicken. Alle Zahlen nach 14 Branchen, Methodik und Einschränkungen.",
  alternates: { canonical: `/studie/${studie.slug}` },
  openGraph: {
    type: "article",
    title: "Jede zweite Firmen-E-Mail in NRW lässt sich fälschen",
    description:
      "Eigene Untersuchung von 15.452 Unternehmen in Nordrhein-Westfalen, Oktober 2026. Alle Zahlen nach 14 Branchen.",
    url,
    publishedTime: studie.veroeffentlicht,
  },
};

/**
 * Datensatz-Auszeichnung. Für Redaktionen und Suchmaschinen ist entscheidend,
 * dass Erhebungszeitraum, Grundgesamtheit und Lizenz der Quelle maschinenlesbar
 * danebenstehen – sonst ist die Zahl zitierbar, aber nicht prüfbar.
 */
function DatasetJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: studie.titel,
    description:
      "Prüfung der öffentlichen E-Mail-Authentifizierung (SPF, DKIM, DMARC, MX) von 15.452 Unternehmen und Einrichtungen in Nordrhein-Westfalen aus 14 Branchen.",
    url,
    datePublished: studie.veroeffentlicht,
    temporalCoverage: `${studie.erhebungVon}/${studie.erhebungBis}`,
    spatialCoverage: { "@type": "Place", name: "Nordrhein-Westfalen, Deutschland" },
    creator: { "@type": "Organization", name: company.name, url: company.url },
    // CC BY 4.0, weil die Zitierhinweise auf dieser Seite genau das zusagen:
    // "Die Zahlen dürfen mit Quellenangabe frei verwendet werden."
    license: "https://creativecommons.org/licenses/by/4.0/",
    isBasedOn: {
      "@type": "Dataset",
      name: "OpenStreetMap",
      description:
        "Liste von Unternehmen mit Website in Nordrhein-Westfalen, als Grundgesamtheit für die Untersuchung erfasst über OpenStreetMap-Mitwirkende.",
      creator: { "@type": "Organization", name: "OpenStreetMap-Mitwirkende" },
      license: "https://opendatacommons.org/licenses/odbl/",
    },
    measurementTechnique: "Abfrage öffentlicher DNS-Einträge (SPF, DKIM, DMARC, MX)",
    variableMeasured: ["SPF", "DKIM", "DMARC", "MX"],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

const kernzahlen = [
  { wert: zahl(studie.domainsGesamt), label: "geprüfte Unternehmen", icon: Database },
  { wert: prozent(studie.kritischGesamtProzent), label: "mit kritischer Lücke", icon: ShieldAlert, warnung: true },
  { wert: prozent(studie.vollstaendigAbgesichertProzent), label: "vollständig abgesichert", icon: CheckCircle2 },
  { wert: String(studie.branchenAnzahl), label: "untersuchte Branchen", icon: AlertTriangle },
];

export default function StudiePage() {
  const maxQuote = Math.max(...branchen.map((b) => b.kritischProzent));

  return (
    <>
      <DatasetJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Start", url: company.url },
          { name: "Studie", url },
        ]}
      />

      <Hero
        breadcrumb={[{ name: "Start", href: "/" }, { name: "Studie E-Mail-Sicherheit NRW 2026" }]}
        eyebrow="Eigene Untersuchung · Oktober 2026"
        title="Jede zweite Firmen-E-Mail in NRW lässt sich fälschen"
        subtitle={
          <>
            Wir haben die öffentlichen E-Mail-Einstellungen von {zahl(studie.domainsGesamt)} Unternehmen
            und Einrichtungen in Nordrhein-Westfalen geprüft. Bei {prozent(studie.kritischGesamtProzent)}{" "}
            kann ein Fremder eine E-Mail im Firmennamen verschicken, ohne dass der empfangende Mailserver
            sie zuverlässig abweist.
          </>
        }
        actions={
          <>
            <Button href="/email-check" size="lg">
              Eigene Domain kostenlos prüfen
            </Button>
            <Button href="#methodik" variant="secondary" size="lg">
              Zur Methodik
            </Button>
          </>
        }
      />

      <Section className="border-t border-border">
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {kernzahlen.map((k, i) => (
            <Reveal key={k.label} delay={i * 80}>
              <Card className="h-full">
                <k.icon
                  className={`mb-3 size-6 ${k.warnung ? "text-accent-secondary" : "text-accent"}`}
                />
                <div className="font-display text-3xl font-bold text-foreground">{k.wert}</div>
                <div className="mt-1 text-sm text-muted">{k.label}</div>
              </Card>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">
          Von den {zahl(studie.domainsGesamt)} geprüften Domains zeigten {zahl(studie.mitMailbetrieb)} einen
          erkennbaren Mailbetrieb. Nur sie gingen in die Auswertung ein – alle Prozentwerte auf dieser
          Seite beziehen sich auf diese Gruppe.
        </p>
      </Section>

      <Section
        eyebrow="Alle Branchen"
        title="Wo die Lücken am größten sind"
        subtitle="Die Reihenfolge ist die eigentliche Aussage: Zwei Branchen zeigen, dass es geht."
        className="border-t border-border bg-surface/30"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted">
                <th className="py-3 pr-4 font-medium">Branche</th>
                <th className="py-3 pr-4 text-right font-medium">geprüft</th>
                <th className="py-3 font-medium">kritische Lücke</th>
              </tr>
            </thead>
            <tbody>
              {branchen.map((b) => (
                <tr
                  key={b.name}
                  className={`border-b border-border/60 ${b.istKernzielgruppe ? "bg-accent/5" : ""}`}
                >
                  <td
                    className={`py-3 pr-4 ${b.istKernzielgruppe ? "font-semibold text-foreground" : "text-muted"}`}
                  >
                    {b.name}
                  </td>
                  <td className="py-3 pr-4 text-right tabular-nums text-muted">{zahl(b.geprueft)}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="h-2 shrink-0 rounded-full bg-accent-secondary/70"
                        style={{ width: `${(b.kritischProzent / maxQuote) * 100}px` }}
                        aria-hidden="true"
                      />
                      <span className="tabular-nums font-medium text-foreground">
                        {prozent(b.kritischProzent)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
          Die naheliegende Vermutung, Handwerksbetriebe hingen bei der Digitalisierung hinterher,
          bestätigt sich nicht: Von 14 Branchen liegt das Handwerk auf Platz sieben. Berufsgruppen,
          deren Geschäft aus Schriftverkehr besteht, stehen schlechter da – bei Steuerberatern und
          Rechtsanwälten ist der Anteil höher als im Handwerk.
        </p>
      </Section>

      <Section
        eyebrow="Der wichtigste Einzelbefund"
        title="Eingerichtet und nie eingeschaltet"
        subtitle="Am schlechtesten stehen die Betriebe da, die angefangen und nicht beendet haben."
        className="border-t border-border"
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {handwerkBefunde.map((b, i) => (
            <Reveal key={b.titel} delay={i * 80}>
              <Card className={`h-full ${b.istKernbefund ? "border-accent-secondary/40" : ""}`}>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-2xl font-bold text-foreground">
                    {zahl(b.anzahl)}
                  </span>
                  <span className="text-sm text-muted">({prozent(b.prozent)})</span>
                </div>
                <div className="mt-1 font-medium text-foreground">{b.titel}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{b.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
          Alle Werte beziehen sich auf die {zahl(4410)} Handwerksbetriebe mit erkennbarem Mailbetrieb.
          Betriebe mit einer Regel auf „nur beobachten“ sind schlechter gestellt als jene ohne jeden
          Schutz, weil sie sich für geschützt halten. Am häufigsten tritt das Muster bei Werbe- und
          Webagenturen auf: Dort haben 37,5 % den Schutz eingerichtet und nicht scharf gestellt.
        </p>
      </Section>

      <Section
        eyebrow="Regionale Verteilung"
        title="Das Münsterland schneidet am schlechtesten ab"
        className="border-t border-border bg-surface/30"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted">
                <th className="py-3 pr-4 font-medium">Regierungsbezirk</th>
                <th className="py-3 pr-4 text-right font-medium">Betriebe</th>
                <th className="py-3 text-right font-medium">kritische Lücke</th>
              </tr>
            </thead>
            <tbody>
              {bezirke.map((b) => (
                <tr
                  key={b.name}
                  className={`border-b border-border/60 ${b.istEigenerBezirk ? "bg-accent/5" : ""}`}
                >
                  <td
                    className={`py-3 pr-4 ${b.istEigenerBezirk ? "font-semibold text-foreground" : "text-muted"}`}
                  >
                    {b.name}
                  </td>
                  <td className="py-3 pr-4 text-right tabular-nums text-muted">{zahl(b.betriebe)}</td>
                  <td
                    className={`py-3 text-right tabular-nums ${b.istEigenerBezirk ? "font-semibold text-foreground" : "text-muted"}`}
                  >
                    {prozent(b.kritischProzent)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
          Nach Gewerken stehen Maler und Zimmerer am schlechtesten da: bei beiden haben rund 62 Prozent
          eine kritische Lücke. Auch die Organisationen des Handwerks sind betroffen – von{" "}
          {organisationen.geprueft} Kammern, Kreishandwerkerschaften und Innungen in NRW haben{" "}
          {organisationen.kritisch} eine kritische Lücke. Vollständig abgesichert sind zwei:{" "}
          {organisationen.vollstaendigNamen.join(" und ")}. Diese Teilgruppe ist klein; die
          Größenordnung ist dennoch bemerkenswert, weil diese Einrichtungen ihre Mitglieder zur
          Digitalisierung beraten.
        </p>
      </Section>

      <Section
        eyebrow="Was das praktisch bedeutet"
        title="Der Schaden entsteht beim Kunden"
        className="border-t border-border"
      >
        <div className="max-w-3xl space-y-5 text-base leading-relaxed text-muted">
          <p>
            Üblich ist die gefälschte Rechnung: Sie trägt den Namen des Betriebs, bezieht sich auf einen
            echten Auftrag und nennt eine fremde Bankverbindung. Weder der Kunde noch sein
            E-Mail-Programm können den Unterschied erkennen, solange das Unternehmen die nötigen
            Einträge nicht veröffentlicht hat.
          </p>
          <p>
            Die nötigen Einträge heißen <strong className="font-semibold text-foreground">SPF</strong>,{" "}
            <strong className="font-semibold text-foreground">DKIM</strong> und{" "}
            <strong className="font-semibold text-foreground">DMARC</strong>. Sie werden einmal beim
            Domain-Anbieter hinterlegt und kosten im laufenden Betrieb nichts. Drei Schritte:
          </p>
          <ol className="list-decimal space-y-2 pl-5">
            <li>
              <strong className="font-semibold text-foreground">Prüfen lassen</strong>, ob alle drei
              Einträge vorhanden sind – der IT-Dienstleister kann das in wenigen Minuten beantworten.
            </li>
            <li>
              <strong className="font-semibold text-foreground">Fehlende Einträge ergänzen.</strong> Bei
              Microsoft 365 und Google Workspace ist die Funktion enthalten und muss nur aktiviert
              werden.
            </li>
            <li>
              <strong className="font-semibold text-foreground">DMARC scharf stellen.</strong> Bleibt die
              Regel auf „nur beobachten“, werden gefälschte Mails weiterhin zugestellt. Üblich ist ein
              Übergang von vier Wochen Beobachtung auf Abweisen.
            </li>
          </ol>
          <div className="rounded-xl border border-accent/30 bg-accent/5 p-6">
            <p className="text-foreground">
              Ob Ihre eigene Domain betroffen ist, sehen Sie in wenigen Sekunden im{" "}
              <Link href="/email-check" className="font-semibold underline hover:text-accent">
                kostenlosen E-Mail-Sicherheits-Check
              </Link>
              . Geprüft werden dieselben öffentlichen Einträge wie in dieser Untersuchung – ohne Zugriff
              auf Ihr Postfach.
            </p>
          </div>
        </div>
      </Section>

      <Section
        id="methodik"
        eyebrow="Methodik"
        title="Wie wir gemessen haben"
        className="scroll-mt-24 border-t border-border bg-surface/30"
      >
        <div className="max-w-3xl space-y-5 text-base leading-relaxed text-muted">
          <p>
            <strong className="font-semibold text-foreground">Grundgesamtheit.</strong> Ausgewertet wurden
            alle Unternehmen und Einrichtungen in Nordrhein-Westfalen, die in OpenStreetMap in einer der{" "}
            {studie.branchenAnzahl} geprüften Kategorien erfasst sind und dort eine Website hinterlegt
            haben – {zahl(studie.domainsGesamt)} eindeutige Domains. Erhebung am 14. und 15. Oktober 2026.
            Datenquelle: {studie.datenquelle}.
          </p>
          <p>
            <strong className="font-semibold text-foreground">Erhebung.</strong> Gelesen wurden
            ausschließlich öffentliche Einträge im Domain Name System – dieselben Angaben, die jeder
            Mailserver weltweit abfragt, bevor er eine Nachricht annimmt. Es wurde kein System
            angegriffen, keine Mail verschickt und kein Zugang verwendet. Einzelne Unternehmen werden
            nicht namentlich genannt.
          </p>
          <p>
            <strong className="font-semibold text-foreground">Was „kritische Lücke“ bedeutet.</strong> Ein
            Unternehmen gilt als kritisch, wenn SPF oder DMARC fehlen, widersprüchlich sind oder eine
            begonnene Einrichtung nachweislich unvollständig blieb. Beide Angaben stehen im DNS an
            festen, eindeutigen Stellen und sind von außen zweifelsfrei feststellbar.
          </p>

          <h3 className="pt-4 font-display text-xl font-bold text-foreground">
            Einschränkungen, die wir ausdrücklich benennen
          </h3>
          <ol className="list-decimal space-y-4 pl-5">
            {einschraenkungen.map((e) => (
              <li key={e.titel}>
                <strong className="font-semibold text-foreground">{e.titel}.</strong> {e.text}
              </li>
            ))}
          </ol>

          <p>
            <strong className="font-semibold text-foreground">Nachvollziehbarkeit.</strong> Die Prüfung
            lässt sich jederzeit wiederholen; die Methode ist im kostenlosen Selbsttest öffentlich
            nachvollziehbar. Die Ergebnisse je Unternehmen liegen vor und können Redaktionen in
            anonymisierter Form zur Prüfung zur Verfügung gestellt werden.
          </p>
        </div>
      </Section>

      <Section className="border-t border-border">
        <Container className="px-0">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <h3 className="font-display text-lg font-bold text-foreground">Diese Untersuchung zitieren</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {company.name}: „{studie.titel}“. Münster, Oktober 2026. Online verfügbar unter{" "}
                <span className="break-all text-foreground">{url}</span>
              </p>
              <p className="mt-3 text-sm text-muted">
                Die Zahlen dürfen mit Quellenangabe frei verwendet werden.
              </p>
            </Card>
            <Card>
              <h3 className="font-display text-lg font-bold text-foreground">Pressekontakt</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {company.owner}, {company.name}, Münster
                <br />
                <a href={company.phoneHref} className="hover:text-foreground">
                  {company.phone}
                </a>
                <br />
                <a href={company.emailHref} className="hover:text-foreground">
                  {company.email}
                </a>
              </p>
              <p className="mt-3 text-sm text-muted">
                Rohdaten und Einzelergebnisse stellen wir Redaktionen auf Anfrage in anonymisierter Form
                zur Verfügung.
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      <CtaSection
        title="Ist Ihre Domain betroffen?"
        subtitle="Der kostenlose E-Mail-Sicherheits-Check prüft dieselben Einträge wie diese Untersuchung – in wenigen Sekunden und ohne Zugriff auf Ihr Postfach."
      />
    </>
  );
}
