import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

interface SectionProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  eyebrow?: string;
  title?: React.ReactNode;
  /** Seiten ohne <Hero> (z. B. Impressum) haben sonst gar kein h1 auf der Seite. */
  titleAs?: "h1" | "h2";
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  containerClassName?: string;
}

export function Section({
  eyebrow,
  title,
  titleAs: TitleTag = "h2",
  subtitle,
  align = "left",
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  const hasHeader = eyebrow || title || subtitle;

  return (
    <section className={cn("py-20 md:py-28", className)} {...props}>
      <Container className={containerClassName}>
        {hasHeader ? (
          <Reveal
            className={cn(
              "mb-12 max-w-3xl md:mb-16",
              align === "center" && "mx-auto text-center",
            )}
          >
            {eyebrow ? (
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent-secondary">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <TitleTag className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {title}
              </TitleTag>
            ) : null}
            {subtitle ? <p className="mt-4 text-lg leading-relaxed text-muted">{subtitle}</p> : null}
          </Reveal>
        ) : null}
        <Reveal delay={100}>{children}</Reveal>
      </Container>
    </section>
  );
}
