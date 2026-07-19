import { cn } from "@/lib/cn";

export function Card({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "group relative rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-secondary/40 hover:shadow-[0_16px_40px_-20px_var(--color-accent-secondary)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
