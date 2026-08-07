import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { CtaSection } from "@/components/sections/cta-section";
import { stack, partners } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Agentur",
  description:
    "JB Solutions ist die IT- und Webdesign-Agentur von Justin Boch aus Münster – spezialisiert auf Microsoft-Technologie für Handwerksbetriebe.",
  alternates: { canonical: "/agentur" },
};

const values = [
  {
    title: "Ein Betrieb, ein Ansprechpartner",
    description:
      "Keine wechselnden Support-Tickets: Sie haben einen festen Ansprechpartner für IT, Webseite und Sichtbarkeit.",
  },
  {
    title: "Microsoft statt Insellösungen",
    description:
      "Wir setzen konsequent auf Microsoft 365 & Azure – eine Plattform, die skaliert, statt zehn Einzeltools zu verwalten.",
  },
  {
    title: "Verständlich statt Fachchinesisch",
    description:
      "Wir erklären, was wir tun und warum – damit Sie jederzeit verstehen, wofür Sie bezahlen.",
  },
];

export default function AgenturPage() {
  return (
    <>
      <Hero
        eyebrow="Agentur"
        title="JB Solutions – Justin Boch"
        subtitle="Ich unterstütze Handwerksbetriebe dabei, ihre IT auf ein modernes, sicheres Fundament zu stellen und online sichtbar zu werden – mit einem klaren Fokus auf Microsoft-Technologie statt vieler loser Einzellösungen."
      />

      <Section
        eyebrow="Warum dieser Fokus"
        title="Vom klassischen Webdesign zur Microsoft-IT für Handwerk"
        subtitle="JB Solutions hat sich aus der Webdesign- und Software-Arbeit für Handwerksbetriebe und regionale Unternehmen entwickelt. Dabei ist eines immer wieder deutlich geworden: Eine gute Webseite allein reicht nicht, wenn im Hintergrund die IT-Grundlage fehlt – unsichere E-Mails, kein Backup, keine klare Struktur. Deshalb liegt der Fokus heute konsequent auf Microsoft 365 & Azure als Basis, ergänzt um Sichtbarkeit (SEO, GEO, Google-Unternehmensprofil) und individuelle Software, wo Standardlösungen nicht ausreichen."
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="rounded-xl border border-border bg-surface p-6">
              <CheckCircle2 className="size-6 text-accent-secondary" />
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Technologie" title="Der eingesetzte Stack" subtitle="Microsoft-Technologie für Infrastruktur und Lizenzierung, moderne Web-Technologie für Webseiten und Software.">
        <div className="flex flex-wrap gap-3">
          {stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border-strong bg-surface-elevated px-4 py-2 text-sm text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Partner"
        title="Mit wem wir zusammenarbeiten"
        subtitle="Verlässliche Partner für Infrastruktur, Recht und Bildsprache – statt alles selbst zu erfinden."
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center rounded-xl border border-border bg-surface p-6 text-center transition-colors hover:border-accent-secondary/60"
            >
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-border-strong bg-surface-elevated">
                {partner.logo ? (
                  <Image src={partner.logo} alt={partner.name} width={56} height={56} className="h-full w-full object-contain" />
                ) : (
                  <span className="text-lg font-semibold text-accent-secondary">{partner.name.charAt(0)}</span>
                )}
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-foreground">{partner.name}</h3>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-accent-secondary">{partner.role}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{partner.description}</p>
            </a>
          ))}
        </div>
      </Section>

      <CtaSection
        title="Lernen wir uns kennen"
        subtitle="Im ersten Gespräch hören wir uns Ihre Situation an und sagen ehrlich, wo wir helfen können – und wo nicht."
      />
    </>
  );
}
