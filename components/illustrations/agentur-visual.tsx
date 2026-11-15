import { MapPin, MessageCircle, Phone, Video } from "lucide-react";
import { cn } from "@/lib/cn";
import { company } from "@/lib/constants";

/*
 * Hero-Motiv der Agentur-Seite. Bewusst kein KI-Foto: Hier geht es um die
 * echte Person – ein erfundenes Gesicht wäre irreführend. Sobald ein echtes
 * Foto von Justin Boch vorliegt, ersetzt es diese Karte.
 */

function Stage({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border-strong bg-gradient-to-br from-accent/10 via-surface to-accent-secondary/10 shadow-2xl shadow-black/30",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function AgenturVisual({ className }: { className?: string }) {
  return (
    <Stage className={cn("flex items-center justify-center", className)}>
      <div className="w-[78%] rounded-2xl border border-border-strong bg-surface-elevated p-5 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-secondary font-display text-xl font-bold text-white ring-4 ring-accent/20">
            JB
          </div>
          <div>
            <p className="font-display text-base font-semibold text-foreground">Justin Boch</p>
            <p className="text-[11px] text-muted">Gelernter Anlagenmechaniker SHK</p>
            <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted">
              <MapPin className="size-3 text-accent-secondary" />
              {company.address.city}
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {["Microsoft 365", "Webdesign", "SEO & GEO", "Software"].map((tag) => (
            <span key={tag} className="rounded-full border border-border-strong px-2 py-0.5 text-[10px] text-foreground">
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-muted">
          „Ein Ansprechpartner für IT, Website und Sichtbarkeit – der weiß, wie es auf der Baustelle zugeht.“
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { icon: Phone, label: "Anrufen" },
            { icon: MessageCircle, label: "WhatsApp" },
            { icon: Video, label: "Teams" },
          ].map((a) => (
            <span key={a.label} className="flex flex-col items-center gap-1 rounded-lg border border-border bg-surface py-2 text-[10px] text-foreground">
              <a.icon className="size-3.5 text-accent-secondary" />
              {a.label}
            </span>
          ))}
        </div>
      </div>
    </Stage>
  );
}
