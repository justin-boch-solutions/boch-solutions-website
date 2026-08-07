import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { WebsiteCheckForm } from "@/components/sections/website-check-form";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "Website-Check",
  description:
    "Kostenloser Website-Check: Performance, SEO und technische Basis Ihrer Webseite in Sekunden geprüft – auf Basis von Google Lighthouse.",
  alternates: { canonical: "/website-check" },
};

export default function WebsiteCheckPage() {
  return (
    <>
      <Hero
        eyebrow="Kostenloser Check"
        title="Wie schnell und sichtbar ist Ihre Webseite wirklich?"
        subtitle="Wir prüfen Ihre Webseite mit Google Lighthouse auf Performance, SEO, Barrierefreiheit und technische Best Practices – und schicken Ihnen das Ergebnis direkt zu."
        size="compact"
      />
      <Section>
        <div className="mx-auto max-w-2xl">
          <WebsiteCheckForm />
        </div>
      </Section>
      <CtaSection
        title="Lieber direkt sprechen statt prüfen?"
        subtitle="Im kostenlosen Strategie-Call schauen wir gemeinsam auf Performance, SEO und die technische Basis Ihrer Webseite."
      />
    </>
  );
}
