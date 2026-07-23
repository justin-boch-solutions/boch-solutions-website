import type { Metadata } from "next";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { Card } from "@/components/ui/card";
import { CtaSection } from "@/components/sections/cta-section";
import { locations } from "@/lib/locations";

export const metadata: Metadata = {
  title: "Standorte",
  description:
    "IT-Modernisierung, SEO/GEO und Webdesign für Handwerksbetriebe in Münster und im Münsterland – Telgte, Greven, Nottuln, Havixbeck und Senden.",
  alternates: { canonical: "/standorte" },
};

export default function StandortePage() {
  return (
    <>
      <Hero
        eyebrow="Standorte"
        title="Vor Ort in Münster und im Münsterland"
        subtitle="Von Münster aus betreuen wir Handwerksbetriebe in der ganzen Region – persönlich vor Ort oder remote, ganz wie es für Ihren Betrieb passt."
        size="compact"
      />

      <Section eyebrow="Einzugsgebiet" title="Unsere Region">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <Link key={location.slug} href={`/standorte/${location.slug}`} className="block h-full">
              <Card className="flex h-full flex-col">
                <div className="mb-4 inline-flex size-11 items-center justify-center rounded-lg bg-gradient-to-br from-accent/20 to-accent-secondary/20 text-accent-secondary">
                  <MapPin className="size-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{location.name}</h3>
                <p className="mt-1 text-xs text-muted">
                  rund {location.distanceKm} km {location.direction} von Münster
                </p>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{location.blurb}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <CtaSection
        title="Ihr Ort ist nicht dabei?"
        subtitle="Sprechen Sie uns trotzdem an – vieles lässt sich remote umsetzen, Vor-Ort-Termine sind auch außerhalb der genannten Orte möglich."
      />
    </>
  );
}
