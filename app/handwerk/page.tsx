import type { Metadata } from "next";
import Link from "next/link";
import { Hammer } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { Card } from "@/components/ui/card";
import { CtaSection } from "@/components/sections/cta-section";
import { trades } from "@/lib/trades";

export const metadata: Metadata = {
  title: "IT-Modernisierung nach Gewerk",
  description:
    "Microsoft 365, Website und Sichtbarkeit – zugeschnitten auf die betrieblichen Besonderheiten von SHK, Elektro, Dachdecker, Maler und Tischlerei.",
  alternates: { canonical: "/handwerk" },
};

export default function HandwerkPage() {
  return (
    <>
      <Hero
        eyebrow="Gewerk statt Lösung von der Stange"
        title="IT-Modernisierung, zugeschnitten auf Ihr Gewerk"
        subtitle="Ein SHK-Notdienst braucht andere IT als eine Tischlerei mit Maßanfertigungen. Justin Boch ist gelernter Anlagenmechaniker SHK und kennt diese Unterschiede aus eigener Erfahrung auf der Baustelle."
        size="compact"
      />

      <Section
        eyebrow="Gewerke"
        title="Wählen Sie Ihr Gewerk"
        subtitle="Jede Seite geht auf die betrieblichen Besonderheiten des jeweiligen Gewerks ein und empfiehlt die dafür passenden Leistungen."
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {trades.map((trade) => (
            <Link key={trade.slug} href={`/handwerk/${trade.slug}`} className="block h-full">
              <Card className="flex h-full flex-col">
                <div className="mb-4 inline-flex size-11 items-center justify-center rounded-lg bg-gradient-to-br from-accent/20 to-accent-secondary/20 text-accent-secondary">
                  <Hammer className="size-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{trade.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{trade.challenges[0]}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <CtaSection
        title="Ihr Gewerk ist nicht dabei?"
        subtitle="Sprechen Sie uns trotzdem an – die meisten Leistungen lassen sich auf jedes Handwerksgewerk zuschneiden."
      />
    </>
  );
}
