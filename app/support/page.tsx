import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Mail, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { ContactForm } from "@/components/sections/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { company } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Support für Bestandskunden von Justin Boch - Solutions: schneller Draht per Telefon, WhatsApp oder E-Mail für Fragen zu Microsoft 365, Webseite oder laufender Betreuung.",
  alternates: { canonical: "/support" },
  robots: { index: false, follow: true },
};

const channels = [
  {
    icon: Phone,
    title: "Telefon",
    description: "Für dringende Anliegen der schnellste Weg – werktags erreichbar.",
    action: company.phone,
    href: company.phoneHref,
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Kurze Fragen, Screenshots oder schnelle Rückmeldungen zwischendurch.",
    action: company.whatsapp,
    href: company.whatsappHref,
    external: true,
  },
  {
    icon: Mail,
    title: "E-Mail",
    description: "Für ausführlichere Anliegen oder wenn Sie Unterlagen mitschicken möchten.",
    action: company.email,
    href: company.emailHref,
  },
];

export default function SupportPage() {
  return (
    <>
      <Hero
        eyebrow="Support"
        title="Support für Bestandskunden"
        subtitle="Sie sind bereits Kunde bei uns und haben eine Frage zu Ihrer Microsoft-365-Umgebung, Ihrer Webseite oder einem laufenden Projekt? Hier erreichen Sie uns am schnellsten."
        size="compact"
      />

      <Section>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {channels.map((channel, index) => (
            <Reveal key={channel.title} delay={index * 100}>
              <a
                href={channel.href}
                target={channel.external ? "_blank" : undefined}
                rel={channel.external ? "noopener noreferrer" : undefined}
                className="block h-full rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent-secondary/50"
              >
                <div className="mb-4 inline-flex size-11 items-center justify-center rounded-lg bg-gradient-to-br from-accent/20 to-accent-secondary/20 text-accent-secondary">
                  <channel.icon className="size-5" />
                </div>
                <h2 className="font-display text-lg font-semibold text-foreground">{channel.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{channel.description}</p>
                <p className="mt-4 text-sm font-medium text-accent-secondary">{channel.action}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Gut zu wissen"
        title="Was Sie für eine schnelle Bearbeitung bereithalten können"
        className="border-t border-border bg-surface/30"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface p-6">
            <Clock className="size-6 text-accent-secondary" />
            <h3 className="mt-4 font-display text-lg font-semibold text-foreground">Kurz beschreiben, was passiert</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Was genau funktioniert nicht wie erwartet, seit wann, und auf welchem Gerät? Das hilft uns,
              schneller einzugrenzen, wo das Problem liegt.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-6">
            <ShieldCheck className="size-6 text-accent-secondary" />
            <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
              Haben Sie eine laufende Betreuung?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Mit{" "}
              <Link href="/leistungen/it-support-wartung" className="underline hover:text-foreground">
                IT-Support &amp; Wartung
              </Link>{" "}
              haben Sie einen festen Ansprechpartner und priorisierte Reaktionszeiten. Ohne laufenden
              Vertrag kümmern wir uns trotzdem gerne – im Rahmen der freien Kapazität.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Anfrage" title="Support-Anfrage senden">
        <div className="max-w-2xl rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
