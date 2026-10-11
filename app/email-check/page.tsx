import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { EmailCheckForm } from "@/components/sections/email-check-form";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "E-Mail-Sicherheits-Check",
  description:
    "Kostenloser Check: Kann jemand in Ihrem Namen Rechnungen verschicken? Wir prüfen SPF, DKIM und DMARC Ihrer Domain – ohne Zugriff auf Ihr Postfach.",
  alternates: { canonical: "/email-check" },
};

export default function EmailCheckPage() {
  return (
    <>
      <Hero
        eyebrow="Kostenloser Check"
        title="Kann jemand in Ihrem Namen Rechnungen verschicken?"
        subtitle="Bei den meisten Handwerksbetrieben lautet die Antwort ja – und niemand hat es ihnen gesagt. Wir prüfen die drei öffentlichen Einträge Ihrer Domain, die das verhindern, und erklären das Ergebnis ohne Fachbegriffe."
        size="compact"
      />
      <Section>
        <div className="mx-auto max-w-2xl">
          <EmailCheckForm />
        </div>
      </Section>
      <CtaSection
        title="Lieber direkt sprechen?"
        subtitle="Im kostenlosen Strategie-Call schauen wir gemeinsam auf E-Mail, Microsoft 365 und die technische Basis Ihres Betriebs."
      />
    </>
  );
}
