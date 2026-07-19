import { cn } from "@/lib/cn";

export function BrowserMockup({ className }: { className?: string }) {
  return (
    <div className={cn("animate-float", className)}>
      <svg
        viewBox="0 0 560 400"
        role="img"
        aria-label="Abstrakte Darstellung einer modernen, mobil-optimierten Webseite"
        className="w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.35)]"
      >
        <defs>
          <linearGradient id="bm-accent" x1="0" y1="0" x2="1" y2="1">
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

        <line x1="1" y1="44" x2="559" y2="44" stroke="var(--color-border)" />
        <circle cx="24" cy="22" r="5" fill="var(--color-border-strong)" />
        <circle cx="44" cy="22" r="5" fill="var(--color-border-strong)" />
        <circle cx="64" cy="22" r="5" fill="var(--color-border-strong)" />
        <rect x="96" y="14" width="280" height="16" rx="8" fill="var(--color-background)" stroke="var(--color-border)" />

        <rect x="32" y="80" width="220" height="16" rx="8" fill="var(--color-foreground)" opacity="0.85" />
        <rect x="32" y="104" width="160" height="16" rx="8" fill="var(--color-foreground)" opacity="0.85" />
        <rect x="32" y="140" width="200" height="9" rx="4.5" fill="var(--color-muted)" />
        <rect x="32" y="158" width="150" height="9" rx="4.5" fill="var(--color-muted)" />

        <g className="animate-soft-pulse">
          <rect x="32" y="188" width="132" height="34" rx="17" fill="url(#bm-accent)" />
        </g>

        <rect x="330" y="70" width="198" height="150" rx="14" fill="url(#bm-accent)" opacity="0.16" />
        <circle cx="429" cy="145" r="46" fill="url(#bm-accent)" opacity="0.35" />

        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${32 + i * 176}, 254)`}>
            <rect width="152" height="100" rx="12" fill="var(--color-surface-elevated)" stroke="var(--color-border)" />
            <circle cx="26" cy="28" r="12" fill="url(#bm-accent)" opacity="0.4" />
            <rect x="16" y="52" width="120" height="8" rx="4" fill="var(--color-foreground)" opacity="0.7" />
            <rect x="16" y="68" width="90" height="8" rx="4" fill="var(--color-muted)" />
          </g>
        ))}
      </svg>
    </div>
  );
}
