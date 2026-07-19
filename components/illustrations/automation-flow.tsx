import { CheckCircle2, Inbox, Settings2, Zap } from "lucide-react";
import { cn } from "@/lib/cn";

const steps = [
  { icon: Inbox, label: "Anfrage" },
  { icon: Settings2, label: "Verarbeitung" },
  { icon: Zap, label: "Automatisiert" },
  { icon: CheckCircle2, label: "Erledigt" },
];

export function AutomationFlow({ className }: { className?: string }) {
  return (
    <div className={cn("relative animate-float", className)}>
      <svg
        viewBox="0 0 560 400"
        role="img"
        aria-label="Abstrakte Darstellung eines automatisierten Ablaufs von der Anfrage bis zur Erledigung"
        className="w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.35)]"
      >
        <defs>
          <linearGradient id="af-accent" x1="0" y1="0" x2="1" y2="0">
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

        <line
          x1="105"
          y1="190"
          x2="455"
          y2="190"
          stroke="url(#af-accent)"
          strokeWidth="2.5"
          strokeDasharray="2 12"
          strokeLinecap="round"
          opacity="0.7"
          className="animate-dash-flow"
        />

        {steps.map((step, i) => (
          <circle
            key={step.label}
            cx={105 + i * 116.7}
            cy="190"
            r="40"
            fill="var(--color-surface-elevated)"
            stroke={i === steps.length - 1 ? "url(#af-accent)" : "var(--color-border-strong)"}
            strokeWidth={i === steps.length - 1 ? 2 : 1}
          />
        ))}

        <rect x="60" y="266" width="440" height="70" rx="12" fill="var(--color-background)" stroke="var(--color-border)" />
        <rect x="84" y="286" width="140" height="9" rx="4.5" fill="var(--color-foreground)" opacity="0.7" />
        <rect x="84" y="304" width="240" height="8" rx="4" fill="var(--color-muted)" />
        <rect x="392" y="288" width="84" height="26" rx="13" fill="url(#af-accent)" opacity="0.9" />
      </svg>

      {steps.map((step, i) => (
        <div
          key={step.label}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
          style={{ left: `${((105 + i * 116.7) / 560) * 100}%`, top: `${(190 / 400) * 100}%` }}
        >
          <div
            className={cn(
              "flex size-9 items-center justify-center rounded-full",
              i === steps.length - 1 ? "text-accent-secondary" : "text-muted",
            )}
          >
            <step.icon className="size-5" />
          </div>
        </div>
      ))}

      {steps.map((step, i) => (
        <span
          key={`${step.label}-label`}
          className="absolute -translate-x-1/2 whitespace-nowrap text-xs font-medium text-muted"
          style={{ left: `${((105 + i * 116.7) / 560) * 100}%`, top: `${(240 / 400) * 100}%` }}
        >
          {step.label}
        </span>
      ))}
    </div>
  );
}
