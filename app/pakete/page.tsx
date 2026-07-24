import type { Metadata } from "next";
import { Check, Rocket, Sparkles, TrendingUp } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { CtaSection } from "@/components/sections/cta-section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { HeroPhoto } from "@/components/ui/hero-photo";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Pakete",
  description:
    "Drei Pakete für die IT-Modernisierung von Handwerksbetrieben: Starter, Wachstum und Rundum-sorglos – abgestimmt auf Ihren Betrieb, Preis auf Anfrage.",
  alternates: { canonical: "/pakete" },
};

const pakete = [
  {
    name: "Starter",
    icon: Rocket,
    tagline: "Die digitale Grundlage",
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
    description: "Für Betriebe, die zusätzlich zur IT-Grundlage aktiv neue Kunden gewinnen wollen.",
    highlighted: true,
    features: [
      "Alles aus Starter",
      "Moderne Firmenwebsite mit SEO-Grundlagen",
      "Google-Unternehmensprofil-Optimierung",
      "SEO- & GEO-Optimierung für lokale Sichtbarkeit",
      "Laufender IT-Support & Wartung",
    ],
  },
  {
    name: "Rundum-sorglos",
    icon: Sparkles,
    tagline: "Digitalisierter Gesamtbetrieb",
    description: "Für Betriebe, die IT, Sichtbarkeit und individuelle Prozesse aus einer Hand wollen.",
    highlighted: false,
    features: [
      "Alles aus Wachstum",
      "Individuelle Software & Kundenportale",
      "Prozessautomatisierung mit Power Automate",
      "Cloud-Sicherheit, Backup & DSGVO-Dokumentation",
      "Priorisierter Support mit festem Ansprechpartner",
    ],
  },
];

export default function PaketePage() {
  return (
    <>
      <Hero
        eyebrow="Pakete"
        title="Drei Wege zur modernisierten IT"
        subtitle="Jeder Betrieb ist anders – deshalb nennen wir hier bewusst keine pauschalen Preise. Im Strategie-Call stellen wir gemeinsam zusammen, was zu Ihrer Größe, Ihrem Budget und Ihren Zielen passt."
        visual={<HeroPhoto src="/images/hero/pakete.jpg" alt="Dashboard mit Kennzahlen-Kacheln auf einem Bildschirm" />}
      />

      <Section>
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
                <p className="text-lg font-semibold text-foreground">Preis auf Anfrage</p>
                <p className="mt-1 text-xs text-muted">Abgestimmt auf Betriebsgröße und Umfang</p>
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

      <CtaSection
        title="Nicht sicher, welches Paket passt?"
        subtitle="Kein Problem – im kostenlosen Strategie-Call finden wir das gemeinsam heraus."
      />
    </>
  );
}
