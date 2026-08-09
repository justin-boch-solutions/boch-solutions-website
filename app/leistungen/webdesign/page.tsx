import type { Metadata } from "next";
import Link from "next/link";
import { Check, Gauge, Rocket, ShieldCheck, ShoppingCart, Smartphone, Zap } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaSection } from "@/components/sections/cta-section";
import { ServiceIcon } from "@/components/sections/service-icon";
import { Card } from "@/components/ui/card";
import { HeroPhoto } from "@/components/ui/hero-photo";
import { company } from "@/lib/constants";
import { getRelatedServices, getServiceBySlug } from "@/lib/services";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/seo/json-ld";

const webdesign = getServiceBySlug("webdesign")!;
const related = getRelatedServices(webdesign);
const url = `${company.url}/leistungen/webdesign`;

export const metadata: Metadata = {
  title: "Webdesign",
  description:
    "Webdesign für Handwerksbetriebe: Onepager, High-End Firmenwebsite und Online-Shop – schnell, mobil-optimiert und auf Anfragen ausgelegt.",
  alternates: { canonical: "/leistungen/webdesign" },
};

const offerings = [
  {
    icon: Zap,
    name: "Onepager",
    tagline: "Schnell online, klarer Fokus",
    description:
      "Eine kompakte, einseitige Webseite mit klarer Botschaft und einer Handlungsaufforderung – ideal, um schnell online zu gehen oder eine einzelne Kampagne (z. B. eine Aktion oder Google-Ads-Landingpage) zu bewerben.",
    idealFor: [
      "Schneller Markteintritt oder Neuausrichtung",
      "Werbekampagnen mit einem klaren Angebot",
      "Betriebe, die zunächst kompakt starten wollen",
    ],
    features: [
      "Ein fokussierter Seitenaufbau statt verzettelter Navigation",
      "Klare Handlungsaufforderung (Anruf, Anfrage, Termin)",
      "Kurzfristig umsetzbar",
    ],
  },
  {
    icon: Rocket,
    name: "High-End Firmenwebsite",
    tagline: "Auf Kunden- und Mitarbeitergewinnung optimiert",
    description:
      "Eine vollständige Firmenwebsite mit allen Leistungen, Über-uns-Bereich und eigener Karriereseite – gebaut, um sowohl neue Kunden als auch dringend gesuchte Fachkräfte zu erreichen, nicht nur digital präsent zu sein.",
    idealFor: [
      "Betriebe mit mehreren Leistungen oder Gewerken",
      "Betriebe, die aktiv Personal suchen (Fachkräftemangel)",
      "Umfassende Neuausrichtung / Rebranding",
    ],
    features: [
      "Vollständige Leistungsübersicht mit eigenen Unterseiten",
      "Karriereseite zur Mitarbeitergewinnung",
      "Integriertes Google-Unternehmensprofil und SEO-Grundlagen",
      "Kontaktformular und klare Anfragewege je Leistung",
    ],
  },
  {
    icon: ShoppingCart,
    name: "E-Commerce & Online-Shop",
    tagline: "Hochperformant für den Produktverkauf",
    description:
      "Ein performanter Online-Shop für Betriebe, die Produkte, Ersatzteile oder Zubehör direkt verkaufen – mit Produktkatalog, Zahlungs- und Versandanbindung, auf derselben schnellen technischen Basis wie unsere übrigen Webseiten.",
    idealFor: [
      "Betriebe mit eigenem Produkt- oder Ersatzteilverkauf",
      "Zusätzlicher Vertriebskanal neben dem stationären Geschäft",
      "Betriebe, die Bestellprozesse digitalisieren wollen",
    ],
    features: [
      "Produktkatalog mit Kategorien und Suche",
      "Zahlungs- und Versandanbindung",
      "Schnelle Ladezeiten auch bei vielen Produkten",
    ],
  },
];

const qualityPoints = [
  {
    icon: Gauge,
    title: "Schnelle Ladezeiten",
    description: "Technisch moderne Umsetzung statt aufgeblähter Baukasten-Systeme – wichtig für Google und Besucher.",
  },
  {
    icon: Smartphone,
    title: "Mobil-optimiert",
    description: "Die meisten Anfragen kommen vom Smartphone – jede Seite wird zuerst für mobile Nutzung gebaut.",
  },
  {
    icon: ShieldCheck,
    title: "Sicher & gewartet",
    description: "Auf Wunsch mit laufender Wartung, Updates und Anbindung an Ihre Microsoft-365-Infrastruktur.",
  },
];

export default function WebdesignPage() {
  return (
    <>
      <ServiceJsonLd
        name="Webdesign für Handwerksbetriebe"
        description={metadata.description as string}
        url={url}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Startseite", url: company.url },
          { name: "Leistungen", url: `${company.url}/leistungen` },
          { name: "Webdesign", url },
        ]}
      />
      <FaqJsonLd faq={webdesign.faq} />

      <Hero
        eyebrow="Webdesign"
        title="Webseiten, die für Ihren Betrieb arbeiten"
        subtitle="Nicht nur ein digitales Aushängeschild, sondern eine Vertriebsmaschine für Anfragen und Mitarbeitende – von der kompakten Onepager bis zum Online-Shop, technisch modern und auf Ihr Gewerk zugeschnitten."
        visual={<HeroPhoto src="/images/hero/webdesign.jpg" alt="Bildschirm mit farbig hervorgehobenem Quellcode" />}
        breadcrumb={[
          { name: "Startseite", href: "/" },
          { name: "Leistungen", href: "/leistungen" },
          { name: "Webdesign" },
        ]}
      />

      <Section
        eyebrow="Drei Wege zur passenden Webseite"
        title="Onepager, Firmenwebsite oder Online-Shop"
        subtitle="Jeder Betrieb hat andere Anforderungen – deshalb bieten wir drei klar unterschiedliche Ausbaustufen statt einer Schablone."
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {offerings.map((offering) => (
            <Card key={offering.name} className="flex h-full flex-col">
              <div className="mb-4 inline-flex size-11 items-center justify-center rounded-lg bg-gradient-to-br from-accent/20 to-accent-secondary/20 text-accent-secondary">
                <offering.icon className="size-5" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground">{offering.name}</h3>
              <p className="mt-1 text-sm font-medium text-accent-secondary">{offering.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{offering.description}</p>

              <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted">Ideal für</p>
              <ul className="mt-2 space-y-1.5">
                {offering.idealFor.map((item) => (
                  <li key={item} className="text-sm text-muted">
                    · {item}
                  </li>
                ))}
              </ul>

              <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted">Inklusive</p>
              <ul className="mt-2 flex-1 space-y-1.5">
                {offering.features.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent-secondary" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Qualitätsversprechen"
        title="Was jede Webseite von uns mitbringt"
        className="border-t border-border bg-surface/30"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {qualityPoints.map((point) => (
            <div key={point.title} className="rounded-xl border border-border bg-surface p-6">
              <point.icon className="size-6 text-accent-secondary" />
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{point.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="FAQ" title="Fragen zu Webdesign">
        <FaqAccordion items={webdesign.faq} />
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
        title="Bereit für eine Webseite, die arbeitet?"
        subtitle="Im kostenlosen Strategie-Call klären wir, ob Onepager, Firmenwebsite oder Online-Shop zu Ihrem Betrieb passt."
      />
    </>
  );
}
