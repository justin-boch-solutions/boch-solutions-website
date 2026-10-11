import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { ServiceGrid } from "@/components/sections/service-grid";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaSection } from "@/components/sections/cta-section";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/seo/json-ld";
import { company } from "@/lib/constants";
import { services } from "@/lib/services";
import { getLocationBySlug, locations } from "@/lib/locations";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return {};

  return {
    title: { absolute: `IT und Webdesign für Handwerksbetriebe in ${location.name}` },
    description: `Microsoft 365, SEO/GEO, Google-Unternehmensprofil und Webdesign für Handwerksbetriebe in ${location.name} – betreut von Justin Boch - Solutions aus Münster.`,
    alternates: { canonical: `/standorte/${location.slug}` },
  };
}

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) notFound();

  const url = `${company.url}/standorte/${location.slug}`;

  // Am eigenen Standort ergibt "liegt rund 0 km entfernt" keinen Sinn.
  const lage = location.isHeadquarters
    ? `${location.name} ist unser eigener Standort – kurze Wege, Vor-Ort-Termine ohne Anfahrtsaufwand.`
    : `${location.name} liegt rund ${location.distanceKm} km ${location.direction} von unserem Standort Münster entfernt.`;

  const faq = [
    {
      question: `Betreuen Sie Handwerksbetriebe auch in ${location.name}?`,
      answer: location.isHeadquarters
        ? `Ja – ${location.name} ist unser Sitz. Vor-Ort-Termine sind hier jederzeit möglich, ebenso eine vollständig remote umgesetzte IT-Modernisierung.`
        : `Ja. ${lage} Vor-Ort-Termine sind dort ebenso möglich wie eine vollständig remote umgesetzte IT-Modernisierung.`,
    },
    {
      question: "Ist mein Betrieb zu klein für Microsoft 365 und professionelle IT?",
      answer:
        "Nein. Microsoft-365-Lizenzen und die begleitenden Leistungen skalieren nach Nutzerzahl. Auch Betriebe mit 2–3 Mitarbeitenden profitieren von einer zentralen, sicheren E-Mail- und Dateiverwaltung, ohne einen eigenen Server zu benötigen.",
    },
    {
      question: `Wie werde ich in ${location.name} bei Google besser gefunden?`,
      answer: `Über ein vollständig gepflegtes Google-Unternehmensprofil, lokale SEO-Signale mit klarem Bezug zu ${location.name} und der Region sowie eine technisch saubere Webseite – alles Teil unserer SEO- & GEO-Optimierung.`,
    },
  ];

  return (
    <>
      <ServiceJsonLd
        name="IT-Modernisierung für Handwerksbetriebe"
        description={`Microsoft 365, SEO/GEO, Google-Unternehmensprofil und Webdesign für Handwerksbetriebe in ${location.name}.`}
        url={url}
        areaServed={location.name}
        areaServedType="City"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Startseite", url: company.url },
          { name: "Standorte", url: `${company.url}/standorte` },
          { name: location.name, url },
        ]}
      />
      <FaqJsonLd faq={faq} />

      <Hero
        eyebrow="Standort"
        title={`IT-Modernisierung für Handwerksbetriebe in ${location.name}`}
        subtitle={`${lage} Wir modernisieren die IT von Handwerksbetrieben ${location.isHeadquarters ? "hier" : "dort"} auf Basis von Microsoft 365 – vor Ort oder remote – und bauen Webseiten, die Anfragen und Mitarbeitende bringen.`}
        breadcrumb={[
          { name: "Startseite", href: "/" },
          { name: "Standorte", href: "/standorte" },
          { name: location.name },
        ]}
        size="compact"
      />

      <Section
        eyebrow={location.name}
        title={`Handwerk in ${location.name}`}
        subtitle={`${location.blurb} Besonders stark vertreten: ${location.schwerpunkt}.`}
      />

      <Section
        eyebrow="Leistungen"
        title={`Unsere Leistungen für Betriebe in ${location.name}`}
        subtitle={`Von der Microsoft-365-Grundlage über die laufende EDV-Betreuung bis zur individuellen Software – für Betriebe in ${location.name} aus einer Hand.`}
        className="border-t border-border bg-surface/30"
      >
        <ServiceGrid services={services} />
      </Section>

      <Section eyebrow="FAQ" title={`Fragen zu ${location.name}`}>
        <div className="mx-auto max-w-3xl">
          <FaqAccordion items={faq} />
        </div>
      </Section>

      <CtaSection
        title={`Bereit für den nächsten Schritt in ${location.name}?`}
        subtitle="Im kostenlosen Strategie-Call besprechen wir, wo die größten Hebel für Ihren Betrieb liegen."
      />
    </>
  );
}
