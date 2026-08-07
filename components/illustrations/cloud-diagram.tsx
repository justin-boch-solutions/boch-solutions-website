import { Cloud, Globe, HardDrive, Mail, ShieldCheck, Users } from "lucide-react";
import { cn } from "@/lib/cn";
import { GlowOrb } from "@/components/ui/glass-panel";

const nodes = [
  { icon: Mail, label: "Mail", x: 50, y: 14.6 },
  { icon: HardDrive, label: "Dateien", x: 83.7, y: 39.1 },
  { icon: Users, label: "Teams", x: 70.8, y: 78.6 },
  { icon: ShieldCheck, label: "Sicherheit", x: 29.2, y: 78.6 },
  { icon: Globe, label: "Domain", x: 16.3, y: 39.1 },
];

export function CloudDiagram({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-square w-full animate-float", className)}>
      <GlowOrb className="left-1/2 top-1/2 size-64 -translate-x-1/2 -translate-y-1/2 bg-accent/30" />

      <svg
        viewBox="0 0 480 480"
        role="img"
        aria-label="Diagramm: Microsoft-365-Cloud verbindet Mail, Dateien, Teams, Sicherheit und Domain"
        className="absolute inset-0 h-full w-full drop-shadow-[0_25px_50px_rgba(0,0,0,0.4)]"
      >
        <defs>
          <linearGradient id="cd-accent" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-accent)" />
            <stop offset="100%" stopColor="var(--color-accent-secondary)" />
          </linearGradient>
          <radialGradient id="cd-center-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {nodes.map((node) => (
          <line
            key={node.label}
            x1="240"
            y1="240"
            x2={(node.x / 100) * 480}
            y2={(node.y / 100) * 480}
            stroke="url(#cd-accent)"
            strokeWidth="2"
            strokeDasharray="2 10"
            strokeLinecap="round"
            opacity="0.6"
            className="animate-dash-flow"
          />
        ))}

        <circle cx="240" cy="240" r="92" fill="url(#cd-center-glow)" />
        <circle cx="240" cy="240" r="56" fill="var(--color-surface)" stroke="url(#cd-accent)" strokeWidth="2" className="animate-soft-pulse" />

        {nodes.map((node) => (
          <circle
            key={node.label}
            cx={(node.x / 100) * 480}
            cy={(node.y / 100) * 480}
            r="38"
            fill="var(--color-surface-elevated)"
            stroke="var(--color-border-strong)"
          />
        ))}
      </svg>

      <div
        className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-secondary p-3.5 shadow-[0_0_30px_-4px_var(--color-accent)]"
        style={{ left: "50%", top: "50%" }}
      >
        <Cloud className="size-8 text-white" />
      </div>

      {nodes.map((node) => (
        <div
          key={node.label}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
        >
          <div className="flex size-9 items-center justify-center rounded-full border border-border-strong bg-surface-elevated text-accent-secondary shadow-[0_8px_20px_-6px_rgba(0,0,0,0.6)]">
            <node.icon className="size-4" />
          </div>
          <span className="whitespace-nowrap text-xs font-medium text-muted">{node.label}</span>
        </div>
      ))}
    </div>
  );
}
