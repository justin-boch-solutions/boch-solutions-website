import { cn } from "@/lib/cn";

export function AvatarBadge({ className }: { className?: string }) {
  return (
    <div className={cn("relative mx-auto flex aspect-square w-full max-w-[280px] items-center justify-center", className)}>
      <div className="absolute inset-0 animate-soft-pulse rounded-full bg-gradient-to-br from-accent to-accent-secondary opacity-20 blur-2xl" />
      <svg viewBox="0 0 280 280" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="avatar-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-accent)" />
            <stop offset="100%" stopColor="var(--color-accent-secondary)" />
          </linearGradient>
        </defs>
        <circle
          cx="140"
          cy="140"
          r="128"
          fill="none"
          stroke="url(#avatar-ring)"
          strokeWidth="2"
          strokeDasharray="3 9"
          strokeLinecap="round"
          className="animate-dash-flow"
        />
      </svg>

      <div className="relative flex size-[220px] items-center justify-center rounded-full border border-border-strong bg-surface">
        <span className="font-display bg-gradient-to-br from-accent to-accent-secondary bg-clip-text text-6xl font-bold text-transparent">
          JB
        </span>
      </div>
    </div>
  );
}
