import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { CtaSection } from "@/components/sections/cta-section";
import { ReferenzDetail, VorherNachher } from "@/components/sections/referenz-showcase";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { company } from "@/lib/constants";
import { referenzen } from "@/lib/referenzen";

export const metadata: Metadata = {
  title: "Referenzen: Websites für Handwerk & Betriebe",
  description:
    "Echte Kundenprojekte von Justin Boch - Solutions: die Website des SHK-Fachbetriebs Huesmann aus Altenberge und die mehrsprachige Plattform von Dzirksts Studio.",
  alternates: { canonical: "/referenzen" },
};

export default function ReferenzenPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Startseite", url: company.url },
          { name: "Referenzen", url: `${company.url}/referenzen` },
        ]}
      />
      <Hero
        eyebrow="Referenzen"
        title="Echte Projekte statt Beispiele"
        subtitle="Zwei Websites, die wir konzipiert, gestaltet und umgesetzt haben – beide sind online und lassen sich direkt anschauen."
        breadcrumb={[{ name: "Startseite", href: "/" }, { name: "Referenzen" }]}
        size="compact"
      />

      {referenzen.map((referenz, index) => (
        <Section
          key={referenz.slug}
          id={referenz.slug}
          className={index % 2 ? "border-t border-border bg-surface/30" : "border-t border-border"}
        >
          <ReferenzDetail referenz={referenz} reverse={index % 2 === 1} />
          <VorherNachher referenz={referenz} />
        </Section>
      ))}

      <CtaSection
        title="Ihr Betrieb als nächste Referenz?"
        subtitle="Im kostenlosen Strategie-Call schauen wir auf Ihre heutige Website und klären, was eine neue für Sie leisten müsste."
      />
    </>
  );
}
