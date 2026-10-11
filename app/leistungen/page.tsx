import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { ServiceGrid } from "@/components/sections/service-grid";
import { CtaSection } from "@/components/sections/cta-section";
import { clusterMeta, getServicesByCluster, type ServiceCluster } from "@/lib/services";

export const metadata: Metadata = {
  title: "Leistungen",
  description:
    "Elf Leistungen für Handwerksbetriebe aus einer Hand: Microsoft 365, E-Mail und Domain, IT-Support, lokale Sichtbarkeit, Webdesign und individuelle Software.",
  alternates: { canonical: "/leistungen" },
};

const clusters: ServiceCluster[] = ["infrastruktur", "sichtbarkeit", "digitalisierung"];

export default function LeistungenPage() {
  return (
    <>
      <Hero
        eyebrow="Leistungen"
        title="Alles, was Ihr Betrieb für moderne IT braucht"
        subtitle="Elf Leistungen, gebündelt in drei Bereichen: Infrastruktur & Sicherheit, Sichtbarkeit & Wachstum sowie Digitalisierung & Automatisierung – einzeln buchbar oder als Gesamtpaket."
      />

      {clusters.map((cluster) => (
        <Section
          key={cluster}
          eyebrow="Leistungsbereich"
          title={clusterMeta[cluster].label}
          subtitle={clusterMeta[cluster].description}
        >
          <ServiceGrid services={getServicesByCluster(cluster)} />
        </Section>
      ))}

      <CtaSection />
    </>
  );
}
