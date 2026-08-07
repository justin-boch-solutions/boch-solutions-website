import { MapPin, Star } from "lucide-react";
import { cn } from "@/lib/cn";
import { GlowOrb } from "@/components/ui/glass-panel";

const results = [
  { highlighted: true, width: 78 },
  { highlighted: false, width: 62 },
  { highlighted: false, width: 68 },
];

export function SearchRankIllustration({ className }: { className?: string }) {
  return (
    <div className={cn("relative animate-float", className)}>
      <GlowOrb className="left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 bg-accent-secondary/20" />

      <svg
        viewBox="0 0 560 400"
        role="img"
        aria-label="Abstrakte Darstellung eines Suchergebnisses mit dem eigenen Betrieb auf Platz eins"
        className="relative w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.35)]"
      >
        <defs>
          <linearGradient id="sr-accent" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-accent)" />
            <stop offset="100%" stopColor="var(--color-accent-secondary)" />
          </linearGradient>
        </defs>

        <rect
          x="1"
          y="1"
          width="558"
          height="398"
          rx="18"
          fill="var(--color-surface)"
          stroke="var(--color-border-strong)"
        />

        {/* Browser-Chrome-Punkte */}
        <circle cx="24" cy="17" r="4" fill="var(--color-border-strong)" />
        <circle cx="38" cy="17" r="4" fill="var(--color-border-strong)" />
        <circle cx="52" cy="17" r="4" fill="var(--color-border-strong)" />

        <rect x="32" y="32" width="496" height="44" rx="22" fill="var(--color-background)" stroke="var(--color-border)" />
        <circle cx="58" cy="54" r="9" fill="none" stroke="url(#sr-accent)" strokeWidth="2.5" />
        <line x1="65" y1="61" x2="72" y2="68" stroke="url(#sr-accent)" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="86" y="48" width="180" height="12" rx="6" fill="var(--color-muted)" opacity="0.5" />

        {results.map((result, i) => (
          <g key={i} transform={`translate(32, ${112 + i * 84})`}>
            <rect
              width="496"
              height="68"
              rx="14"
              fill={result.highlighted ? "var(--color-surface-elevated)" : "transparent"}
              stroke={result.highlighted ? "url(#sr-accent)" : "var(--color-border)"}
              strokeWidth={result.highlighted ? 2 : 1}
              className={result.highlighted ? "animate-soft-pulse" : undefined}
            />
            {result.highlighted ? (
              <g transform="translate(20, 34)">
                <circle r="16" fill="url(#sr-accent)" />
                <circle r="16" fill="none" stroke="var(--color-accent-secondary)" strokeWidth="1.5" opacity="0.5" />
              </g>
            ) : (
              <circle cx="34" cy="34" r="14" fill="var(--color-border)" opacity="0.7" />
            )}
            <rect x="60" y="18" width={result.width * 3} height="10" rx="5" fill="var(--color-foreground)" opacity={result.highlighted ? 0.95 : 0.6} />
            <rect x="60" y="38" width={result.width * 2.2} height="8" rx="4" fill="var(--color-muted)" opacity={result.highlighted ? 0.9 : 0.55} />
          </g>
        ))}
      </svg>

      <div
        className="pointer-events-none absolute flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent to-accent-secondary px-3 py-1.5 text-xs font-semibold text-white shadow-[0_10px_30px_-8px_var(--color-accent)]"
        style={{ left: "84%", top: "22%" }}
      >
        <Star className="size-3.5 fill-white" />
        Platz 1
      </div>
      <div
        className="pointer-events-none absolute flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border-strong bg-surface-elevated text-accent-secondary shadow-lg"
        style={{ left: "3%", top: "2%" }}
      >
        <MapPin className="size-4" />
      </div>
    </div>
  );
}
