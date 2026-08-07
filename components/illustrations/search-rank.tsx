import { MapPin, Search, Star } from "lucide-react";
import { cn } from "@/lib/cn";

const competitors = [
  { title: "Mustermann Handwerk GmbH", url: "mustermann-handwerk.de" },
  { title: "Betrieb Schmidt & Söhne", url: "schmidt-soehne.de" },
];

export function SearchRankIllustration({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border-strong bg-white shadow-2xl shadow-black/30",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-black/10 bg-[#f8f9fa] px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-black/15" />
        <span className="size-2.5 rounded-full bg-black/15" />
        <span className="size-2.5 rounded-full bg-black/15" />
        <span className="ml-2 truncate text-xs text-black/50">google.com/search</span>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-3 rounded-full border border-black/15 bg-white px-4 py-2 shadow-sm">
          <Search className="size-4 shrink-0 text-black/40" />
          <span className="truncate text-sm text-black/70">elektriker münster notdienst</span>
        </div>

        <div className="mt-4 rounded-xl border-2 border-accent-secondary bg-[#f0fbfc] p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-start gap-2">
              <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-secondary text-white">
                <MapPin className="size-3.5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1a0dab]">Elektro Musterbetrieb Münster</p>
                <div className="mt-0.5 flex items-center gap-1 text-[11px] text-black/60">
                  <span className="font-medium text-black/80">4.9</span>
                  <span className="flex text-amber-400">
                    {"★★★★★".split("").map((s, i) => (
                      <Star key={i} className="size-2.5 fill-amber-400" />
                    ))}
                  </span>
                  <span>(128)</span>
                </div>
                <p className="mt-0.5 text-[11px] text-black/50">Elektrobetrieb · Münster · Geöffnet</p>
              </div>
            </div>
            <span className="shrink-0 rounded-full bg-accent-secondary px-2 py-1 text-[10px] font-semibold text-white">
              Platz 1
            </span>
          </div>
        </div>

        <div className="mt-3 space-y-3">
          {competitors.map((c) => (
            <div key={c.url} className="opacity-60">
              <p className="text-[11px] text-[#006621]">{c.url}</p>
              <p className="text-sm text-[#1a0dab]">{c.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
