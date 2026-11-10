import { cn } from "@/lib/cn";

interface WindowFrameProps {
  /** Text in der Titelzeile, z. B. eine Adresse oder ein App-Name. */
  title: string;
  /** Optionales Element rechts in der Titelzeile (Status-Badge o. Ä.). */
  badge?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  children: React.ReactNode;
}

/** Gemeinsamer Fensterrahmen für die Hero-Illustrationen der Leistungsseiten. */
export function WindowFrame({ title, badge, className, bodyClassName, children }: WindowFrameProps) {
  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border-strong bg-surface shadow-2xl shadow-black/30",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface-elevated px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="size-2.5 rounded-full bg-border-strong" />
        <span className="ml-2 truncate text-xs text-muted">{title}</span>
        {badge ? <span className="ml-auto">{badge}</span> : null}
      </div>
      <div className={cn("p-4", bodyClassName)}>{children}</div>
    </div>
  );
}

export function StatusPill({ children, tone = "green" }: { children: React.ReactNode; tone?: "green" | "amber" | "accent" }) {
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-[10px] font-medium",
        tone === "green" && "bg-green-500/15 text-green-500",
        tone === "amber" && "bg-amber-500/15 text-amber-500",
        tone === "accent" && "bg-accent-secondary/15 text-accent-secondary",
      )}
    >
      {children}
    </span>
  );
}
