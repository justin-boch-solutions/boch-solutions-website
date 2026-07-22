import { Star } from "lucide-react";
import { cn } from "@/lib/cn";

const bars = [
  { x: 70, width: 110, top: 250, label: "Starter", highlighted: false, rows: 3 },
  { x: 225, width: 110, top: 150, label: "Wachstum", highlighted: true, rows: 5 },
  { x: 380, width: 110, top: 90, label: "Rundum-sorglos", highlighted: false, rows: 6 },
];

const baseline = 340;

export function PackageTiersIllustration({ className }: { className?: string }) {
  return (
    <div className={cn("relative animate-float", className)}>
      <svg
        viewBox="0 0 560 400"
        role="img"
        aria-label="Abstrakte Darstellung dreier ansteigender Paketstufen"
        className="w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.35)]"
      >
        <defs>
          <linearGradient id="pt-accent" x1="0" y1="1" x2="0" y2="0">
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

        <line x1="40" y1={baseline} x2="520" y2={baseline} stroke="var(--color-border)" />

        {bars.map((bar) => (
          <g key={bar.label}>
            <rect
              x={bar.x}
              y={bar.top}
              width={bar.width}
              height={baseline - bar.top}
              rx="12"
              fill={bar.highlighted ? "var(--color-surface-elevated)" : "var(--color-surface)"}
              stroke={bar.highlighted ? "url(#pt-accent)" : "var(--color-border-strong)"}
              strokeWidth={bar.highlighted ? 2 : 1}
              className={bar.highlighted ? "animate-soft-pulse" : undefined}
            />
            {Array.from({ length: bar.rows }).map((_, rowIndex) => (
              <rect
                key={rowIndex}
                x={bar.x + 16}
                y={bar.top + 24 + rowIndex * 20}
                width={bar.width - 32}
                height="6"
                rx="3"
                fill={bar.highlighted ? "url(#pt-accent)" : "var(--color-border-strong)"}
                opacity={bar.highlighted ? 0.8 : 0.6}
              />
            ))}
          </g>
        ))}
      </svg>

      <div
        className="pointer-events-none absolute flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent to-accent-secondary px-3 py-1.5 text-xs font-semibold text-white shadow-lg"
        style={{ left: `${((225 + 55) / 560) * 100}%`, top: `${(120 / 400) * 100}%`, transform: "translate(-50%, -50%)" }}
      >
        <Star className="size-3.5 fill-white" />
        Meistgewählt
      </div>

      {bars.map((bar) => (
        <span
          key={`${bar.label}-label`}
          className="absolute -translate-x-1/2 whitespace-nowrap text-xs font-medium text-muted"
          style={{ left: `${((bar.x + bar.width / 2) / 560) * 100}%`, top: `${((baseline + 20) / 400) * 100}%` }}
        >
          {bar.label}
        </span>
      ))}
    </div>
  );
}
