import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { CtaSection } from "@/components/sections/cta-section";
import { HeroPhoto } from "@/components/ui/hero-photo";
import { stack } from "@/lib/constants";

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
        visual={<HeroPhoto src="/images/hero/agentur.jpg" alt="Modernes, aufgeräumtes Arbeitszimmer mit Schreibtisch und Bildschirm" />}
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

      <CtaSection
        title="Lernen wir uns kennen"
        subtitle="Im ersten Gespräch hören wir uns Ihre Situation an und sagen ehrlich, wo wir helfen können – und wo nicht."
      />
    </>
  );
}
