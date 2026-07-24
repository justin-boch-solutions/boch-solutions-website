import { MapPin, Phone, Route, Star } from "lucide-react";
import { cn } from "@/lib/cn";

export function GoogleProfileMockup({ className }: { className?: string }) {
  return (
    <div className={cn("relative animate-float", className)}>
      <svg
        viewBox="0 0 560 400"
        role="img"
        aria-label="Abstrakte Darstellung eines vollständig gepflegten Google-Unternehmensprofils"
        className="w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.35)]"
      >
        <defs>
          <linearGradient id="gp-accent" x1="0" y1="0" x2="1" y2="1">
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

        <rect x="18" y="18" width="524" height="92" rx="12" fill="url(#gp-accent)" opacity="0.22" />

        <circle cx="66" cy="122" r="30" fill="var(--color-surface-elevated)" stroke="var(--color-border-strong)" strokeWidth="2" />
        <circle cx="66" cy="122" r="14" fill="url(#gp-accent)" opacity="0.5" />

        <rect x="112" y="118" width="200" height="16" rx="8" fill="var(--color-foreground)" opacity="0.85" />
        <rect x="112" y="142" width="140" height="10" rx="5" fill="var(--color-muted)" />

        <rect x="32" y="196" width="180" height="9" rx="4.5" fill="var(--color-muted)" />
        <rect x="32" y="220" width="260" height="9" rx="4.5" fill="var(--color-muted)" />

        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${32 + i * 176}, 256)`}>
            <rect width="152" height="76" rx="14" fill="var(--color-surface-elevated)" stroke="var(--color-border)" />
            <circle cx="76" cy="30" r="14" fill="url(#gp-accent)" opacity="0.4" />
            <rect x="46" y="52" width="60" height="8" rx="4" fill="var(--color-muted)" />
          </g>
        ))}
      </svg>

      <div
        className="pointer-events-none absolute flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent to-accent-secondary px-3 py-1.5 text-xs font-semibold text-white shadow-lg"
        style={{ left: "70%", top: "10%" }}
      >
        <Star className="size-3.5 fill-white" />
        4.9 (128)
      </div>
      <div
        className="pointer-events-none absolute flex items-center gap-1.5 rounded-full border border-border-strong bg-surface-elevated px-3 py-1.5 text-xs font-medium text-accent-secondary shadow-lg"
        style={{ left: "5%", top: "46%" }}
      >
        <MapPin className="size-3.5" />
        Geöffnet
      </div>
      <div
        className="pointer-events-none absolute flex size-9 items-center justify-center rounded-full border border-border-strong bg-surface-elevated text-accent-secondary shadow-lg"
        style={{ left: "9%", top: "66.5%" }}
      >
        <Route className="size-4" />
      </div>
      <div
        className="pointer-events-none absolute flex size-9 items-center justify-center rounded-full border border-border-strong bg-surface-elevated text-accent-secondary shadow-lg"
        style={{ left: "40.5%", top: "66.5%" }}
      >
        <Phone className="size-4" />
      </div>
    </div>
  );
}
