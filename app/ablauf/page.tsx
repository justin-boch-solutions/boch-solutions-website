import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { ProcessSteps } from "@/components/sections/process-steps";
import { CtaSection } from "@/components/sections/cta-section";
import { RoadmapIllustration } from "@/components/illustrations/roadmap";

export const metadata: Metadata = {
  title: "Ablauf",
  description:
    "So läuft die Zusammenarbeit mit JB Solutions ab: Strategie-Call, Architektur-Planung, Umsetzung und laufende Skalierung & Wartung.",
  alternates: { canonical: "/ablauf" },
};

export default function AblaufPage() {
  return (
    <>
      <Hero
        eyebrow="Ablauf"
        title="Vier klare Phasen bis zur modernisierten IT"
        subtitle="Keine Blackbox: Sie wissen jederzeit, in welcher Phase Ihr Projekt steckt und was als Nächstes passiert."
        visual={<RoadmapIllustration />}
      />

      <Section>
        <ProcessSteps />
      </Section>

      <Section
        eyebrow="Transparenz"
        title="Was wir von Ihnen brauchen"
        subtitle="Damit die Umsetzung reibungslos läuft, benötigen wir zu Beginn ein kurzes Gespräch, Zugriff auf bestehende Zugangsdaten (Domain, aktueller E-Mail-Anbieter) und einen Ansprechpartner im Betrieb für Rückfragen. Den Rest übernehmen wir."
      />

      <CtaSection />
    </>
  );
}
