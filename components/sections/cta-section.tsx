import { Container } from "@/components/ui/container";
import { GlowOrb } from "@/components/ui/glass-panel";
import { ParallaxLayer } from "@/components/ui/parallax-layer";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { company } from "@/lib/constants";

interface CtaSectionProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
}

export function CtaSection({
  title = "Bereit, Ihre IT auf den neuesten Stand zu bringen?",
  subtitle = "Im kostenlosen Strategie-Call besprechen wir, wo die größten Hebel für Ihren Betrieb liegen.",
}: CtaSectionProps) {
  return (
    <section className="relative overflow-hidden border-t border-border py-20 md:py-28">
      <ParallaxLayer speed={0.05} className="pointer-events-none absolute inset-0">
        <GlowOrb className="left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 bg-accent/20 animate-drift" />
      </ParallaxLayer>
      <Container className="relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">{subtitle}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/kontakt" size="lg">
              Kostenlosen Strategie-Call vereinbaren
            </Button>
            <Button href={company.phoneHref} variant="secondary" size="lg">
              {company.phone}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
