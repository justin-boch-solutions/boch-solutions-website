import type { Metadata } from "next";
import { Check, Rocket, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { CtaSection } from "@/components/sections/cta-section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { HeroPhoto } from "@/components/ui/hero-photo";
import { formatEuro, priceNote, pricing } from "@/lib/constants";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Pakete & Preise",
  description: `Preise für Handwerksbetriebe: E-Mail-Schutz ${formatEuro(pricing.emailProtection)} Festpreis, Microsoft-365-Grundlage ab ${formatEuro(pricing.starter)}, Betreuung ab ${formatEuro(pricing.itCareBasic)} je Nutzer.`,
  alternates: { canonical: "/pakete" },
};

const entryPackage = {
  name: "E-Mail-Schutz",
  price: formatEuro(pricing.emailProtection),
  priceLabel: "Festpreis, keine laufenden Kosten",
  description:
    "Der kleinste sinnvolle Einstieg. Danach kann niemand mehr unbemerkt E-Mails in Ihrem Namen verschicken, Ihre Angebote landen seltener im Spam-Ordner – und Sie wissen schriftlich, wie es sonst um Ihr Microsoft-Konto steht.",
  included: [
    "Prüfung von SPF, DKIM und DMARC Ihrer Domain",
    "Korrekte Einrichtung aller drei Einträge",
    "Vier Wochen Auswertung der Missbrauchs-Berichte",
    "Anhebung auf die strenge Schutzstufe",
    "Nachweis-Bericht vorher und nachher",
    "Schriftlicher Kurzbefund Ihres Microsoft-365-Kontos",
  ],
  excluded: [
    "Umzug bestehender Postfächer",
    `Einrichtung auf Endgeräten (29–49 ${"€"} pro Gerät)`,
    "Umsetzung der Punkte aus dem Kurzbefund",
  ],
};

const pakete = [
  {
    name: "Starter",
    icon: Rocket,
    tagline: "Die digitale Grundlage",
    price: `ab ${formatEuro(pricing.starter)}`,
    priceHint: `für bis zu ${pricing.starterSeats} Arbeitsplätze · jeder weitere ${formatEuro(pricing.starterAdditionalSeat)}`,
    monthlyHint: null,
    description: "Für Betriebe, die ihre IT erstmals auf eine professionelle, sichere Basis stellen wollen.",
    highlighted: false,
    features: [
      "Einrichtung Microsoft 365 (E-Mail, OneDrive, Teams)",
      "Domain-Einrichtung oder -Umzug",
      "Professionelle E-Mail-Adressen inkl. Zustellsicherheit",
      "Beratung zur passenden Microsoft-Lizenzierung",
      "Basis-Backup-Konzept",
    ],
  },
  {
    name: "Wachstum",
    icon: TrendingUp,
    tagline: "Sichtbar werden, IT gefestigt",
    price: `ab ${formatEuro(pricing.growth)}`,
    priceHint: "einmalig, abhängig von Betriebsgröße und Umfang",
    monthlyHint: `Laufende Betreuung ab ${formatEuro(pricing.itCareBasic)} pro Nutzer und Monat`,
    description: "Für Betriebe, die zusätzlich zur IT-Grundlage aktiv neue Kunden gewinnen wollen.",
    highlighted: true,
    features: [
      "Alles aus Starter",
      "Moderne Firmenwebsite mit SEO-Grundlagen",
      "Google-Unternehmensprofil-Optimierung",
      "SEO- & GEO-Optimierung für lokale Sichtbarkeit",
      "Einrichtung der laufenden IT-Betreuung",
    ],
  },
  {
    name: "Rundum-sorglos",
    icon: Sparkles,
    tagline: "Digitalisierter Gesamtbetrieb",
    price: `ab ${formatEuro(pricing.fullService)}`,
    priceHint: "einmalig, abhängig von Betriebsgröße und Umfang",
    monthlyHint: `Laufende Betreuung ab ${formatEuro(pricing.itCarePlus)} pro Nutzer und Monat`,
    description: "Für Betriebe, die IT, Sichtbarkeit und individuelle Prozesse aus einer Hand wollen.",
    highlighted: false,
    features: [
      "Alles aus Wachstum",
      "Individuelle Software & Kundenportale",
      "Prozessautomatisierung mit Power Automate",
      "Cloud-Sicherheit, Backup & DSGVO-Dokumentation",
      "Priorisierte Bearbeitung in der IT-Betreuung",
    ],
  },
];

const laufendeGruppen = [
  {
    title: "IT-Betreuung",
    subtitle: "Pro Nutzer und Monat – das, was nach der Einrichtung weiterläuft.",
    items: [
      {
        name: "Basis",
        price: `${formatEuro(pricing.itCareBasic)} / Nutzer / Monat`,
        note: "Postfächer, Lizenzverwaltung, Updates und ein fester Ansprechpartner statt Hotline",
      },
      {
        name: "Plus",
        price: `${formatEuro(pricing.itCarePlus)} / Nutzer / Monat`,
        note: "zusätzlich Backup, Geräteverwaltung und Pflege der Zwei-Faktor-Anmeldung",
      },
    ],
  },
  {
    title: "Website",
    subtitle: "Pro Website und Monat, mit klaren Zeitgrenzen statt unbegrenzter Änderungen.",
    items: [
      { name: "Hosting", price: `${formatEuro(pricing.hosting)} / Monat`, note: "1 Website, SSL, Backups" },
      {
        name: "Wartung Basic",
        price: `${formatEuro(pricing.maintenanceBasic)} / Monat`,
        note: "technische Pflege, kleine Anpassungen bis 15 Minuten im Monat",
      },
      {
        name: "Wartung Standard",
        price: `${formatEuro(pricing.maintenanceStandard)} / Monat`,
        note: "erweiterte Routinepflege, Anpassungen bis 30 Minuten im Monat",
      },
      {
        name: "Wartung Business",
        price: `${formatEuro(pricing.maintenanceBusiness)} / Monat`,
        note: "engere Begleitung, Anpassungen bis 60 Minuten im Monat",
      },
    ],
  },
];

export default function PaketePage() {
  return (
    <>
      <Hero
        eyebrow="Pakete & Preise"
        title="Was es kostet, steht hier"
        subtitle="Keine Preise auf Anfrage. Sie sehen, womit Sie rechnen müssen, bevor Sie mit mir sprechen – vom kleinen Festpreis-Einstieg bis zum digitalisierten Gesamtbetrieb."
        visual={<HeroPhoto src="/images/hero/pakete.jpg" alt="Glasfaser-Patchpanel mit mehreren farbigen Kabelsträngen" />}
      />

      <Section
        eyebrow="Einstieg"
        title="Klein anfangen, schnell etwas davon haben"
        subtitle="Die meisten Betriebe wollen nicht ihre ganze IT umstellen, sondern erst einmal sehen, ob die Zusammenarbeit passt. Dafür ist dieses Paket gedacht."
      >
        <Reveal className="rounded-2xl border border-accent-secondary/60 bg-surface p-8 shadow-[0_0_60px_-15px_var(--color-accent-secondary)] sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <div className="inline-flex size-11 items-center justify-center rounded-lg bg-gradient-to-br from-accent/20 to-accent-secondary/20 text-accent-secondary">
                  <ShieldCheck className="size-5" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground">{entryPackage.name}</h3>
              </div>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">{entryPackage.description}</p>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {entryPackage.included.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm text-muted">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent-secondary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-muted">Nicht enthalten</p>
              <ul className="mt-2 space-y-1">
                {entryPackage.excluded.map((item) => (
                  <li key={item} className="text-sm text-muted/80">
                    – {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="shrink-0 rounded-xl border border-border bg-surface-elevated p-6 text-center lg:w-64">
              <p className="font-display text-4xl font-bold text-foreground">{entryPackage.price}</p>
              <p className="mt-2 text-xs leading-relaxed text-muted">{entryPackage.priceLabel}</p>
              <Button href="/email-check" size="lg" className="mt-6 w-full">
                Erst kostenlos prüfen
              </Button>
              <Button href="/kontakt" variant="secondary" size="md" className="mt-3 w-full">
                Direkt beauftragen
              </Button>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section
        eyebrow="Pakete"
        title="Drei Wege zur modernisierten IT"
        subtitle="Startpreise für einen Betrieb üblicher Größe. Was Ihr Betrieb genau braucht, hängt von Mitarbeiterzahl, Geräten und Umfang ab – deshalb sind es Startpreise und keine Festpreise."
        className="border-t border-border bg-surface/30"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {pakete.map((paket, index) => (
            <Reveal
              key={paket.name}
              delay={index * 100}
              className={cn(
                "flex flex-col rounded-2xl border p-8",
                paket.highlighted
                  ? "border-accent-secondary/60 bg-surface shadow-[0_0_60px_-15px_var(--color-accent-secondary)]"
                  : "border-border bg-surface",
              )}
            >
              <div className="mb-5 flex items-center justify-between">
                <div className="inline-flex size-11 items-center justify-center rounded-lg bg-gradient-to-br from-accent/20 to-accent-secondary/20 text-accent-secondary">
                  <paket.icon className="size-5" />
                </div>
                {paket.highlighted ? (
                  <span className="inline-flex w-fit items-center rounded-full bg-gradient-to-r from-accent to-accent-secondary px-3 py-1 text-xs font-semibold text-white">
                    Meistgewählt
                  </span>
                ) : null}
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">{paket.name}</h3>
              <p className="mt-1 text-sm font-medium text-accent-secondary">{paket.tagline}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{paket.description}</p>

              <ul className="mt-6 flex-1 space-y-3">
                {paket.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-sm text-muted">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent-secondary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-border pt-6">
                <p className="font-display text-2xl font-bold text-foreground">{paket.price}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{paket.priceHint}</p>
                {paket.monthlyHint ? (
                  <p className="mt-2 text-xs font-medium leading-relaxed text-accent-secondary">{paket.monthlyHint}</p>
                ) : null}
                <Button
                  href="/kontakt"
                  variant={paket.highlighted ? "primary" : "secondary"}
                  className="mt-5 w-full"
                >
                  Angebot anfragen
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Laufende Leistungen"
        title="Was monatlich dazukommt"
        subtitle="Die Einrichtung ist einmalig, die Betreuung läuft weiter. Beides ist bewusst getrennt, damit Sie sehen, wofür Sie dauerhaft zahlen."
        className="border-t border-border"
      >
        <div className="grid gap-8 lg:grid-cols-2">
          {laufendeGruppen.map((gruppe) => (
            <Reveal key={gruppe.title}>
              <h3 className="font-display text-xl font-bold text-foreground">{gruppe.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{gruppe.subtitle}</p>

              <div className="mt-5 overflow-hidden rounded-2xl border border-border">
                {gruppe.items.map((item, index) => (
                  <div
                    key={item.name}
                    className={cn(
                      "flex flex-col gap-1 bg-surface p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6",
                      index > 0 && "border-t border-border",
                    )}
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="mt-0.5 text-sm leading-relaxed text-muted">{item.note}</p>
                    </div>
                    <p className="shrink-0 font-display text-base font-semibold text-foreground">{item.price}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 flex flex-col gap-1 rounded-2xl border border-border bg-surface p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div>
            <p className="font-medium text-foreground">Änderungen nach Aufwand</p>
            <p className="mt-0.5 text-sm text-muted">Alles außerhalb von Paket und Betreuung</p>
          </div>
          <p className="shrink-0 font-display text-base font-semibold text-foreground">
            {formatEuro(pricing.hourly)} / Stunde
          </p>
        </Reveal>

        <p className="mt-6 text-sm leading-relaxed text-muted">{priceNote}</p>
      </Section>

      <CtaSection
        title="Nicht sicher, welches Paket passt?"
        subtitle="Fangen Sie mit dem kostenlosen E-Mail-Check an – danach wissen Sie, ob überhaupt etwas zu tun ist."
      />
    </>
  );
}
