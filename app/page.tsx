import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Cloud, Lock, Rocket, SearchX, ShoppingCart, Zap } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { TrustStrip } from "@/components/sections/trust-strip";
import { ServiceGrid } from "@/components/sections/service-grid";
import { ProcessSteps } from "@/components/sections/process-steps";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaSection } from "@/components/sections/cta-section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { CloudDiagram } from "@/components/illustrations/cloud-diagram";
import { getServiceBySlug } from "@/lib/services";

export const metadata: Metadata = {
  title: "IT-Modernisierung für Handwerksbetriebe mit Microsoft 365",
  description:
    "JB Solutions modernisiert die IT von Handwerksbetrieben auf Basis von Microsoft 365 & Azure – inklusive SEO/GEO, Google-Unternehmensprofil, Webdesign und individueller Software. Standort Münster.",
  alternates: { canonical: "/" },
};

const painPoints = [
  {
    icon: Cloud,
    title: "Veraltete, verstreute IT",
    description:
      "Alter Server, private E-Mail-Adressen, kein Backup – gewachsene IT-Strukturen bremsen den Alltag statt ihn zu erleichtern.",
  },
  {
    icon: SearchX,
    title: "Unsichtbar bei Google & KI-Suche",
    description:
      "Wer bei 'Handwerker in [Ort]' nicht auftaucht und in ChatGPT & Co. nicht genannt wird, verliert Anfragen an sichtbarere Betriebe.",
  },
  {
    icon: Lock,
    title: "Unsichere E-Mail & Daten",
    description:
      "Fehlende Backups, unsichere Postfächer und keine klare DSGVO-Struktur sind ein wachsendes Risiko für jeden Betrieb.",
  },
];

const highlightedSlugs = [
  "microsoft-365-azure",
  "email-optimierung",
  "seo-geo-optimierung",
  "google-unternehmensprofil",
  "domain-einrichtung",
  "individuelle-software",
];

const webdesignOfferings = [
  {
    icon: Zap,
    name: "Onepager",
    description: "Kompakt, schnell online – für den fokussierten Auftritt oder eine Kampagne.",
  },
  {
    icon: Rocket,
    name: "Firmenwebsite",
    description: "Vollständiger Auftritt für Kunden- und Mitarbeitergewinnung.",
  },
  {
    icon: ShoppingCart,
    name: "Online-Shop",
    description: "Für Betriebe, die Produkte oder Ersatzteile direkt verkaufen.",
  },
];

const faqTeaser = [
  {
    question: "Ist das auch für einen kleinen Handwerksbetrieb sinnvoll?",
    answer:
      "Ja. Microsoft 365 und die begleitenden Leistungen skalieren nach Betriebsgröße – auch mit 3–5 Mitarbeitenden erhalten Sie eine professionelle, sichere IT-Umgebung ohne eigenen Server.",
  },
  {
    question: "Was ist GEO-Optimierung?",
    answer:
      "GEO (Generative Engine Optimization) sorgt dafür, dass KI-Antwortmaschinen wie ChatGPT, Copilot oder Gemini Ihren Betrieb bei passenden Fragen als Quelle nennen – zusätzlich zur klassischen Google-Suche.",
  },
  {
    question: "Müssen wir während der Umstellung den Betrieb unterbrechen?",
    answer:
      "Nein. Die Einrichtung erfolgt schrittweise und abgestimmt auf Ihren Arbeitsalltag, sodass Sie durchgehend normal weiterarbeiten können.",
  },
];

export default function Home() {
  const highlighted = highlightedSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <Hero
        eyebrow="IT-Modernisierung für Handwerksbetriebe"
        title={
          <>
            Ihr Betrieb, modernisiert mit{" "}
            <span className="text-gradient-animated">Microsoft-Technologie.</span>
          </>
        }
        subtitle="Wir richten Microsoft 365 & Azure, professionelle E-Mail, Domain und Lizenzen für Ihren Handwerksbetrieb ein – und sorgen mit SEO, GEO-Optimierung und Google-Unternehmensprofil dafür, dass Kunden Sie auch finden."
        actions={
          <>
            <Button href="/kontakt" size="lg">
              Kostenlosen Strategie-Call vereinbaren
            </Button>
            <Button href="/leistungen" variant="secondary" size="lg">
              Leistungen ansehen
            </Button>
          </>
        }
      />

      <TrustStrip />

      <Section
        eyebrow="Bekannte Probleme"
        title="Woran es bei den meisten Handwerksbetrieben hakt"
        subtitle="Drei Muster, die uns bei Handwerksbetrieben immer wieder begegnen – und die sich mit der richtigen Microsoft-Infrastruktur gezielt beheben lassen."
      >
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {painPoints.map((point, index) => (
            <Reveal key={point.title} delay={index * 100}>
              <Card>
                <div className="mb-4 inline-flex size-11 items-center justify-center rounded-lg bg-gradient-to-br from-accent/20 to-accent-secondary/20 text-accent-secondary">
                  <point.icon className="size-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{point.description}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <section className="border-t border-border bg-gradient-to-r from-accent/10 via-transparent to-accent-secondary/10 py-14">
        <Container className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="font-display text-xl font-semibold text-foreground">Wie zukunftsfähig ist Ihre IT?</p>
            <p className="mt-1 text-sm text-muted">
              Kostenloser Selbsttest in 2 Minuten – mit sofortiger Einschätzung für Ihren Betrieb.
            </p>
          </div>
          <Button href="/it-check" size="lg" className="shrink-0">
            Jetzt IT-Check machen
          </Button>
        </Container>
      </section>

      <Section
        eyebrow="Webdesign"
        title="Webseiten, die für Ihren Betrieb arbeiten"
        subtitle="Nicht nur ein digitales Aushängeschild, sondern eine Vertriebsmaschine für Anfragen und Mitarbeitende – von der kompakten Onepager bis zum Online-Shop."
        className="border-t border-border bg-surface/30"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {webdesignOfferings.map((offering, index) => (
            <Reveal
              key={offering.name}
              delay={index * 100}
              className="rounded-xl border border-border bg-surface p-6"
            >
              <div className="mb-4 inline-flex size-11 items-center justify-center rounded-lg bg-gradient-to-br from-accent/20 to-accent-secondary/20 text-accent-secondary">
                <offering.icon className="size-5" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{offering.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{offering.description}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Button href="/leistungen/webdesign" size="lg">
            Mehr zu Webdesign
          </Button>
        </div>
      </Section>

      <Section
        eyebrow="Leistungen"
        title="Alles aus einer Hand, aufgebaut auf Microsoft"
        subtitle="Von der IT-Grundlage bis zur individuellen Software – sechs Leistungen, mit denen Handwerksbetriebe am häufigsten starten."
      >
        <ServiceGrid services={highlighted} />
        <div className="mt-10">
          <Link
            href="/leistungen"
            className="inline-flex items-center gap-2 font-medium text-foreground hover:text-accent-secondary"
          >
            Alle 11 Leistungen im Überblick <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>

      <Section
        eyebrow="Warum Microsoft"
        title="Eine Plattform statt zehn Insellösungen"
        subtitle="Microsoft 365 & Azure bilden E-Mail, Dateien, Kommunikation, Sicherheit und Automatisierung in einer einzigen, gut abgesicherten Umgebung ab – statt vieler einzelner Tools, die niemand im Betrieb wirklich überblickt."
      >
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div className="hidden lg:block">
            <CloudDiagram />
          </div>
          <div className="grid grid-cols-1 gap-6 rounded-2xl border border-border bg-surface p-8 sm:grid-cols-3 lg:grid-cols-1">
            <div>
              <p className="font-display text-3xl font-bold text-gradient">1</p>
              <p className="mt-2 text-sm text-muted">
                zentrale Anmeldung für E-Mail, Dateien, Teams-Telefonie und mobile Geräte
              </p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-gradient">DSGVO</p>
              <p className="mt-2 text-sm text-muted">
                bewusste Einrichtung inkl. Backup, Defender und Dokumentation
              </p>
            </div>
            <div>
              <p className="font-display text-3xl font-bold text-gradient">1:1</p>
              <p className="mt-2 text-sm text-muted">
                persönliche Betreuung statt anonymer Support-Hotline
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Ablauf"
        title="So läuft die Zusammenarbeit ab"
        subtitle="Vier klare Phasen, von der ersten Einschätzung bis zur laufenden Betreuung."
      >
        <ProcessSteps />
        <div className="mt-10">
          <Link
            href="/ablauf"
            className="inline-flex items-center gap-2 font-medium text-foreground hover:text-accent-secondary"
          >
            Ablauf im Detail <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>

      <Section
        eyebrow="Fragen"
        title="Häufig gestellte Fragen"
        subtitle="Die wichtigsten Antworten – die vollständige Liste finden Sie auf unserer FAQ-Seite."
      >
        <FaqAccordion items={faqTeaser} />
        <div className="mt-10">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 font-medium text-foreground hover:text-accent-secondary"
          >
            Alle Fragen ansehen <ArrowRight className="size-4" />
          </Link>
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
