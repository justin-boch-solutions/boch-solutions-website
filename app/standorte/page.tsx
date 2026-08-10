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
    "Justin Boch - Solutions arbeitet deutschlandweit – persönlich vor Ort besonders präsent in Münster und im Münsterland: Telgte, Greven, Nottuln, Havixbeck und Senden.",
  alternates: { canonical: "/standorte" },
};

export default function StandortePage() {
  return (
    <>
      <Hero
        eyebrow="Regionale Nähe"
        title="Persönlich vor Ort in Münster und im Münsterland"
        subtitle="Wir arbeiten deutschlandweit – die meisten Leistungen lassen sich komplett remote umsetzen. In unserer Heimatregion rund um Münster kommen wir zusätzlich gerne persönlich vorbei."
        size="compact"
      />

      <Section
        eyebrow="Einzugsgebiet"
        title="Unsere Nachbarschaft"
        subtitle="Diese Orte liegen besonders nah an unserem Sitz in Münster – Vor-Ort-Termine sind dort unkompliziert möglich. Weiter weg? Kein Problem, dann arbeiten wir remote zusammen."
      >
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
