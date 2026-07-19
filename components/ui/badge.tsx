import { cn } from "@/lib/cn";

export function Badge({ className, children, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface-elevated px-3.5 py-1.5 text-xs font-medium uppercase tracking-wider text-muted",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
