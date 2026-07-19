import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { ContactForm } from "@/components/sections/contact-form";
import { addressLine, company } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontaktieren Sie JB Solutions für eine kostenlose Erstberatung zur IT-Modernisierung Ihres Handwerksbetriebs. Standort Münster.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <>
      <Hero
        eyebrow="Kontakt"
        title="Lassen Sie uns über Ihren Betrieb sprechen"
        subtitle="Schreiben Sie uns, rufen Sie an, oder nutzen Sie das Formular – im ersten, kostenlosen Gespräch schauen wir gemeinsam, wo die größten Hebel für Ihre IT und Sichtbarkeit liegen."
        size="compact"
      />

      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-surface p-6">
              <h2 className="font-display text-lg font-semibold text-foreground">Direkter Kontakt</h2>
              <div className="mt-4 space-y-4 text-sm">
                <a href={company.phoneHref} className="flex items-center gap-3 text-muted hover:text-foreground">
                  <Phone className="size-5 text-accent-secondary" />
                  {company.phone}
                </a>
                <a href={company.emailHref} className="flex items-center gap-3 text-muted hover:text-foreground">
                  <Mail className="size-5 text-accent-secondary" />
                  {company.email}
                </a>
                <p className="flex items-center gap-3 text-muted">
                  <MapPin className="size-5 shrink-0 text-accent-secondary" />
                  {addressLine}
                </p>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-surface p-6">
              <h2 className="font-display text-lg font-semibold text-foreground">Kostenloser Strategie-Call</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                15–30 Minuten, telefonisch oder vor Ort in Münster und Umgebung. Danach wissen Sie, ob
                und wie wir zusammenpassen – ganz ohne Verpflichtung.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
