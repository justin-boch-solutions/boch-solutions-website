import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";
import { GlowOrb } from "@/components/ui/glass-panel";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";

interface HeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  actions?: React.ReactNode;
  align?: "left" | "center";
  size?: "default" | "compact";
  className?: string;
}

export function Hero({
  eyebrow,
  title,
  subtitle,
  actions,
  align = "left",
  size = "default",
  className,
}: HeroProps) {
  return (
    <div className={cn("relative overflow-hidden border-b border-border bg-grid", className)}>
      <GlowOrb className="left-1/4 top-0 size-[420px] -translate-x-1/2 bg-accent/30 animate-drift" />
      <GlowOrb className="right-0 top-20 size-[360px] translate-x-1/3 bg-accent-secondary/20 animate-drift-reverse" />
      <Container
        className={cn(
          "relative",
          size === "default" ? "py-24 md:py-32" : "py-16 md:py-20",
          align === "center" && "text-center",
        )}
      >
        <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto")}>
          {eyebrow ? (
            <Badge className={cn("mb-6", align === "center" && "mx-auto")}>{eyebrow}</Badge>
          ) : null}
          <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{subtitle}</p>
          {actions ? (
            <div className={cn("mt-10 flex flex-wrap gap-4", align === "center" && "justify-center")}>
              {actions}
            </div>
          ) : null}
        </Reveal>
      </Container>
    </div>
  );
}
