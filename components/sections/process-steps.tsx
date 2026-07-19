import { processPhases } from "@/lib/constants";

export function ProcessSteps() {
  return (
    <div className="relative grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      <div
        aria-hidden
        className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-border-strong to-transparent lg:block"
      />
      {processPhases.map((phase) => (
        <div key={phase.number} className="relative">
          <span className="font-display text-4xl font-bold text-transparent [-webkit-text-stroke:1.5px_var(--color-border-strong)]">
            {phase.number}
          </span>
          <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{phase.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{phase.description}</p>
          <p className="mt-3 text-xs font-medium uppercase tracking-wide text-accent-secondary">
            {phase.forYou}
          </p>
        </div>
      ))}
    </div>
  );
}
