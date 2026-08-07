import { CalendarCheck, ChevronDown, Mail, Send } from "lucide-react";
import { cn } from "@/lib/cn";

const steps = [
  {
    icon: Mail,
    title: "Wenn eine neue Anfrage eintrifft",
    subtitle: "Auslöser · Outlook",
  },
  {
    icon: CalendarCheck,
    title: "Termin im Kalender anlegen",
    subtitle: "Aktion · Microsoft 365",
  },
  {
    icon: Send,
    title: "Bestätigung an Kunden senden",
    subtitle: "Aktion · Automatisiert",
  },
];

export function AutomationFlow({ className }: { className?: string }) {
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
        <span className="ml-2 truncate text-xs text-muted">Power Automate &middot; Flow</span>
        <span className="ml-auto rounded-full bg-green-500/15 px-2 py-0.5 text-[10px] font-medium text-green-400">
          Aktiv
        </span>
      </div>

      <div className="flex flex-col items-center gap-1 p-4">
        {steps.map((step, i) => (
          <div key={step.title} className="flex w-full flex-col items-center">
            <div className="flex w-full max-w-xs items-center gap-3 rounded-xl border border-border-strong bg-surface-elevated p-3 shadow-sm">
              <div
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-lg",
                  i === steps.length - 1
                    ? "bg-gradient-to-br from-accent to-accent-secondary text-white"
                    : "bg-accent/15 text-accent-secondary",
                )}
              >
                <step.icon className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-foreground">{step.title}</p>
                <p className="text-[10px] text-muted">{step.subtitle}</p>
              </div>
            </div>
            {i < steps.length - 1 ? <ChevronDown className="my-1 size-4 text-muted" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
