"use client";

import { cn } from "@/lib/cn";

export function Card({ className, children, onMouseMove, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "spotlight-card group relative rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-secondary/40 hover:shadow-[0_16px_40px_-20px_var(--color-accent-secondary)]",
        className,
      )}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--spotlight-x", `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty("--spotlight-y", `${event.clientY - rect.top}px`);
        onMouseMove?.(event);
      }}
      {...props}
    >
      {children}
    </div>
  );
}
