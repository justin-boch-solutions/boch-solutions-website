import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { ItCheckQuiz } from "@/components/sections/it-check-quiz";
import { CtaSection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "IT-Check",
  description:
    "Kostenloser Selbsttest: Wie zukunftsfähig ist die IT Ihres Handwerksbetriebs? 6 kurze Fragen, sofortiges Ergebnis mit konkreten nächsten Schritten.",
  alternates: { canonical: "/it-check" },
};

export default function ItCheckPage() {
  return (
    <>
      <Hero
        eyebrow="Selbsttest"
        title="Wie zukunftsfähig ist Ihre IT?"
        subtitle="6 kurze Fragen, direkt im Browser beantwortet – am Ende erhalten Sie eine Einschätzung und konkrete nächste Schritte für Ihren Betrieb."
        size="compact"
      />
      <Section>
        <div className="mx-auto max-w-2xl">
          <ItCheckQuiz />
        </div>
      </Section>
      <CtaSection
        title="Lieber direkt sprechen statt testen?"
        subtitle="Im kostenlosen Strategie-Call schauen wir gemeinsam auf die aktuelle IT-Situation Ihres Betriebs."
      />
    </>
  );
}
