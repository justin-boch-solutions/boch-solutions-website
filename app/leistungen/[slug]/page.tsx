import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaSection } from "@/components/sections/cta-section";
import { ServiceIcon } from "@/components/sections/service-icon";
import { Card } from "@/components/ui/card";
import { CloudDiagram } from "@/components/illustrations/cloud-diagram";
import { SearchRankIllustration } from "@/components/illustrations/search-rank";
import { AutomationFlow } from "@/components/illustrations/automation-flow";
import { company } from "@/lib/constants";
import {
  clusterMeta,
  getRelatedServices,
  getServiceBySlug,
  services,
  type ServiceCluster,
} from "@/lib/services";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/seo/json-ld";

// Desktop-only hero illustration per cluster, so every service page has a
// visual instead of empty hero space (webdesign has its own bespoke page).
const clusterVisuals: Record<ServiceCluster, React.ReactNode> = {
  infrastruktur: <CloudDiagram />,
  sichtbarkeit: <SearchRankIllustration />,
  digitalisierung: <AutomationFlow />,
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Slugs with a dedicated, custom-built page under app/leistungen/<slug>/page.tsx
// instead of this generic template (Next.js routes the static segment first,
// this exclusion just keeps generateStaticParams/build output clean).
const CUSTOM_PAGE_SLUGS = new Set(["webdesign"]);

export function generateStaticParams() {
  return services
    .filter((service) => !CUSTOM_PAGE_SLUGS.has(service.slug))
    .map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return {
    title: service.shortName,
    description: service.shortDescription,
    alternates: { canonical: `/leistungen/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  if (CUSTOM_PAGE_SLUGS.has(slug)) notFound();
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = getRelatedServices(service);
  const url = `${company.url}/leistungen/${service.slug}`;

  return (
    <>
      <ServiceJsonLd name={service.name} description={service.shortDescription} url={url} />
      <BreadcrumbJsonLd
        items={[
          { name: "Startseite", url: company.url },
          { name: "Leistungen", url: `${company.url}/leistungen` },
          { name: service.shortName, url },
        ]}
      />
      <FaqJsonLd faq={service.faq} />

      <Hero
        eyebrow={clusterMeta[service.cluster].label}
        title={service.name}
        subtitle={service.heroSummary}
        visual={clusterVisuals[service.cluster]}
        breadcrumb={[
          { name: "Startseite", href: "/" },
          { name: "Leistungen", href: "/leistungen" },
          { name: service.shortName },
        ]}
        size="compact"
      />

      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Das Problem</h2>
            <ul className="mt-6 space-y-4">
              {service.problem.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-secondary" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Unsere Lösung</h2>
            <ul className="mt-6 space-y-4">
              {service.solution.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent-secondary" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Für wen geeignet"
        title="Passt das zu Ihrem Betrieb?"
        className="border-t border-border bg-surface/30"
      >
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {service.audience.map((point) => (
            <li key={point} className="rounded-xl border border-border bg-surface p-5 text-sm text-muted">
              {point}
            </li>
          ))}
        </ul>
      </Section>

      <Section eyebrow="FAQ" title={`Fragen zu ${service.shortName}`}>
        <FaqAccordion items={service.faq} />
      </Section>

      {related.length ? (
        <Section eyebrow="Weiterlesen" title="Passende Leistungen">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {related.map((r) => (
              <Link key={r.slug} href={`/leistungen/${r.slug}`}>
                <Card className="h-full">
                  <div className="mb-3 inline-flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-accent/20 to-accent-secondary/20 text-accent-secondary">
                    <ServiceIcon name={r.icon} className="size-5" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground">{r.shortName}</h3>
                  <p className="mt-2 text-sm text-muted">{r.shortDescription}</p>
                </Card>
              </Link>
            ))}
          </div>
        </Section>
      ) : null}

      <CtaSection
        title={`Bereit für ${service.shortName}?`}
        subtitle="Im kostenlosen Strategie-Call klären wir, was für Ihren Betrieb konkret sinnvoll ist."
      />
    </>
  );
}
