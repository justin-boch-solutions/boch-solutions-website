import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { ServiceGrid } from "@/components/sections/service-grid";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaSection } from "@/components/sections/cta-section";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/seo/json-ld";
import { company } from "@/lib/constants";
import { getServiceBySlug, type Service } from "@/lib/services";
import { getTradeBySlug, trades } from "@/lib/trades";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return trades.map((trade) => ({ slug: trade.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const trade = getTradeBySlug(slug);
  if (!trade) return {};

  return {
    title: { absolute: `IT-Modernisierung für ${trade.name} | Münster` },
    description: `Microsoft 365, Website und Sichtbarkeit speziell für ${trade.name} im Münsterland – zugeschnitten auf die betrieblichen Besonderheiten Ihres Gewerks.`,
    alternates: { canonical: `/handwerk/${trade.slug}` },
  };
}

export default async function TradePage({ params }: PageProps) {
  const { slug } = await params;
  const trade = getTradeBySlug(slug);
  if (!trade) notFound();

  const url = `${company.url}/handwerk/${trade.slug}`;
  const highlightedServices = trade.highlightedSlugs
    .map((s) => getServiceBySlug(s))
    .filter((s): s is Service => Boolean(s));

  return (
    <>
      <ServiceJsonLd
        name={`IT-Modernisierung für ${trade.name}`}
        description={`Microsoft 365, Website und Sichtbarkeit speziell für ${trade.name} im Münsterland.`}
        url={url}
        areaServed={company.address.city}
        areaServedType="City"
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Startseite", url: company.url },
          { name: "Handwerk", url: `${company.url}/handwerk` },
          { name: trade.name, url },
        ]}
      />
      <FaqJsonLd faq={trade.faq} />

      <Hero
        eyebrow="Gewerk"
        title={`IT-Modernisierung für ${trade.name}`}
        subtitle={`Justin Boch ist gelernter Anlagenmechaniker SHK und kennt den Alltag im Handwerksbetrieb aus eigener Erfahrung. Darauf aufbauend modernisieren wir die IT von ${trade.dative} im Münsterland gezielt für die Besonderheiten Ihres Gewerks – nicht mit einer Lösung von der Stange.`}
        breadcrumb={[
          { name: "Startseite", href: "/" },
          { name: "Handwerk", href: "/handwerk" },
          { name: trade.name },
        ]}
        size="compact"
      />

      <Section
        eyebrow="Typische Herausforderungen"
        title={`Woran es bei ${trade.dative} am häufigsten hakt`}
        subtitle={`Drei betriebliche Besonderheiten, die bei ${trade.dative} immer wieder zu IT-Problemen führen, die eine allgemeine Lösung nicht löst.`}
      >
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {trade.challenges.map((challenge) => (
            <li key={challenge} className="rounded-xl border border-border bg-surface p-5 text-sm leading-relaxed text-muted">
              {challenge}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        eyebrow="Passende Leistungen"
        title={`Diese Leistungen bringen ${trade.name} am meisten`}
        subtitle={`Ausgewählt für die Besonderheiten Ihres Gewerks – natürlich stehen auch alle weiteren Leistungen zur Verfügung.`}
        className="border-t border-border bg-surface/30"
      >
        <ServiceGrid services={highlightedServices} />
      </Section>

      <Section eyebrow="FAQ" title={`Fragen von ${trade.dative}`}>
        <div className="mx-auto max-w-3xl">
          <FaqAccordion items={trade.faq} />
        </div>
      </Section>

      <CtaSection
        title={`Bereit für den nächsten Schritt als ${trade.singular}?`}
        subtitle="Im kostenlosen Strategie-Call besprechen wir, wo die größten Hebel für Ihren Betrieb liegen."
      />
    </>
  );
}
