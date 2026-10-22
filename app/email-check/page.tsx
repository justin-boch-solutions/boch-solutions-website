import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { EmailCheckForm } from "@/components/sections/email-check-form";
import { CtaSection } from "@/components/sections/cta-section";
import { prozent, studie, zahl } from "@/lib/studie";

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
      <Section className="border-t border-border bg-surface/30">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base leading-relaxed text-muted">
            Dieselbe Prüfung haben wir für {zahl(studie.domainsGesamt)} Unternehmen in
            Nordrhein-Westfalen durchgeführt. Ergebnis: Bei {prozent(studie.kritischGesamtProzent)}{" "}
            lassen sich E-Mails im Firmennamen fälschen.{" "}
            <Link
              href={`/studie/${studie.slug}`}
              className="font-semibold text-foreground underline hover:text-accent"
            >
              Alle Zahlen nach 14 Branchen
            </Link>
          </p>
        </div>
      </Section>
      <CtaSection
        title="Lieber direkt sprechen?"
        subtitle="Im kostenlosen Strategie-Call schauen wir gemeinsam auf E-Mail, Microsoft 365 und die technische Basis Ihres Betriebs."
      />
    </>
  );
}
