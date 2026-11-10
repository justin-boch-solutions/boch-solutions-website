import { Mic, MonitorUp, Phone, PhoneOff, Video } from "lucide-react";
import { cn } from "@/lib/cn";

const keypad = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

/**
 * Arbeitsplatz mit Monitor (laufendes Teams-Telefonat) und Tischtelefon,
 * das an derselben Teams-Nummer hängt – genau das, was die Leistung verkauft:
 * eine Rufnummer, am PC, am Tischtelefon und am Handy.
 */
export function TeamsTelefonieIllustration({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border-strong bg-gradient-to-b from-surface to-surface-elevated shadow-2xl shadow-black/30",
        className,
      )}
    >
      {/* Monitor */}
      <div className="absolute left-[6%] top-[7%] w-[66%]">
        <div className="overflow-hidden rounded-lg border-4 border-neutral-800 bg-[#1f1f2e] shadow-xl">
          <div className="flex items-center justify-between bg-[#292940] px-3 py-1.5">
            <span className="text-[10px] font-medium text-white/80">Anruf &middot; 04:12</span>
            <span className="flex items-center gap-1 text-[9px] text-green-400">
              <span className="size-1.5 rounded-full bg-green-400" />
              Verbunden
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1.5 px-3 py-4">
            <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-blue text-lg font-semibold text-white ring-4 ring-accent/30">
              KM
            </div>
            <p className="text-xs font-medium text-white">Kunde Müller</p>
            <p className="text-[10px] text-white/60">+49 251 123 45 67 &middot; Rückruf Angebot Bad</p>
          </div>
          <div className="flex items-center justify-center gap-2 bg-[#292940] px-3 py-2">
            {[Video, Mic, MonitorUp].map((Icon, i) => (
              <span key={i} className="flex size-6 items-center justify-center rounded-full bg-white/10 text-white/80">
                <Icon className="size-3" />
              </span>
            ))}
            <span className="flex size-6 items-center justify-center rounded-full bg-red-500 text-white">
              <PhoneOff className="size-3" />
            </span>
          </div>
        </div>
        {/* Standfuß */}
        <div className="mx-auto h-4 w-6 bg-neutral-700" />
        <div className="mx-auto h-1.5 w-20 rounded-full bg-neutral-700" />
      </div>

      {/* Tischtelefon */}
      <div className="absolute bottom-[4%] right-[4%] w-[30%] rotate-[-4deg]">
        <div className="relative rounded-xl border border-neutral-700 bg-neutral-800 p-2.5 shadow-xl">
          {/* Hörer */}
          <div className="absolute -left-2 top-2 bottom-2 w-4 rounded-full bg-neutral-900 shadow-md" />
          <div className="ml-3">
            <div className="rounded-md bg-[#cfe9ec] px-2 py-1.5 text-neutral-900">
              <p className="text-[9px] font-semibold">Teams &middot; Leitung 1</p>
              <p className="text-[8px] opacity-70">0251 98 76 54-0</p>
              <p className="mt-0.5 flex items-center gap-1 text-[8px] font-medium text-green-700">
                <Phone className="size-2" />
                Kunde Müller 04:12
              </p>
            </div>
            <div className="mt-2 grid grid-cols-3 gap-1">
              {keypad.map((key) => (
                <span
                  key={key}
                  className="flex h-3.5 items-center justify-center rounded-sm bg-neutral-700 text-[7px] text-white/70"
                >
                  {key}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hinweis: dieselbe Nummer überall */}
      <div className="absolute right-[4%] top-[7%] flex w-[24%] flex-col gap-1 rounded-lg border border-border-strong bg-surface-elevated/95 px-3 py-2 text-[10px] leading-snug text-muted shadow-lg">
        <Phone className="size-3.5 text-accent-secondary" />
        <span>
          <strong className="text-foreground">Eine Nummer</strong> für PC, Tischtelefon und Handy
        </span>
      </div>
    </div>
  );
}
