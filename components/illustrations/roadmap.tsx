import { Compass, PhoneCall, Settings2, TrendingUp } from "lucide-react";
import { cn } from "@/lib/cn";

const points = [
  { x: 90, y: 320, icon: PhoneCall, label: "Strategie-Call" },
  { x: 230, y: 230, icon: Compass, label: "Architektur" },
  { x: 370, y: 150, icon: Settings2, label: "Umsetzung" },
  { x: 490, y: 80, icon: TrendingUp, label: "Skalierung" },
];

export function RoadmapIllustration({ className }: { className?: string }) {
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");

  return (
    <div className={cn("relative animate-float", className)}>
      <svg
        viewBox="0 0 560 400"
        role="img"
        aria-label="Abstrakte Darstellung der vier Ablaufphasen als aufsteigender Weg"
        className="w-full drop-shadow-[0_30px_60px_rgba(0,0,0,0.35)]"
      >
        <defs>
          <linearGradient id="rm-accent" x1="0" y1="1" x2="1" y2="0">
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

        <path
          d={path}
          fill="none"
          stroke="url(#rm-accent)"
          strokeWidth="2.5"
          strokeDasharray="2 12"
          strokeLinecap="round"
          opacity="0.7"
          className="animate-dash-flow"
        />

        {points.map((p, i) => (
          <circle
            key={p.label}
            cx={p.x}
            cy={p.y}
            r="34"
            fill="var(--color-surface-elevated)"
            stroke={i === points.length - 1 ? "url(#rm-accent)" : "var(--color-border-strong)"}
            strokeWidth={i === points.length - 1 ? 2 : 1}
          />
        ))}

        {points.map((p, i) => (
          <text
            key={`${p.label}-num`}
            x={p.x}
            y={p.y - 50}
            textAnchor="middle"
            className="font-display"
            fontSize="13"
            fill="var(--color-muted)"
          >
            {`0${i + 1}`}
          </text>
        ))}
      </svg>

      {points.map((p) => (
        <div
          key={p.label}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center text-muted"
          style={{ left: `${(p.x / 560) * 100}%`, top: `${(p.y / 400) * 100}%` }}
        >
          <p.icon className="size-5" />
        </div>
      ))}

      {points.map((p) => (
        <span
          key={`${p.label}-label`}
          className="absolute -translate-x-1/2 whitespace-nowrap text-xs font-medium text-muted"
          style={{ left: `${(p.x / 560) * 100}%`, top: `${((p.y + 46) / 400) * 100}%` }}
        >
          {p.label}
        </span>
      ))}
    </div>
  );
}
