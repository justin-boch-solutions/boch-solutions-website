import {
  AlertTriangle,
  BellRing,
  Calendar,
  Camera,
  Check,
  CheckCircle2,
  ClipboardCheck,
  CloudLightning,
  FileText,
  MapPin,
  MessageCircle,
  Phone,
  PhoneIncoming,
  Plug,
  Ruler,
  Send,
  Star,
  Video,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { company, formatEuro, pricing } from "@/lib/constants";
import { StatusPill, WindowFrame } from "@/components/illustrations/window-frame";

/*
 * Hero-Motive für Agentur, Ablauf, Pakete, Webdesign und die Gewerkseiten.
 * Wie bei den Leistungsseiten nachgebaute Oberflächen statt Stockfotos:
 * Sie zeigen das jeweilige Thema konkret und passen sich Hell/Dunkel an.
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

function PhoneShell({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("overflow-hidden rounded-[1.6rem] border-[5px] border-neutral-800 bg-surface shadow-2xl", className)}>
      <div className="mx-auto mt-1.5 h-1.5 w-12 rounded-full bg-neutral-800" />
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Agentur: der persönliche Ansprechpartner
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Ablauf: Projektübersicht mit den vier Phasen
// ---------------------------------------------------------------------------

const phases = [
  { title: "Strategie-Call", note: "30 Min. · kostenlos", state: "done" },
  { title: "Architektur-Planung", note: "Bestandsaufnahme & Plan", state: "done" },
  { title: "Umsetzung", note: "Postfächer, Geräte, Website", state: "active" },
  { title: "Skalierung & Wartung", note: "laufende Betreuung", state: "next" },
] as const;

export function AblaufVisual({ className }: { className?: string }) {
  return (
    <WindowFrame title="Projekt · Musterbetrieb GmbH" badge={<StatusPill tone="accent">Phase 3 von 4</StatusPill>} className={className}>
      <div className="h-1.5 overflow-hidden rounded-full bg-border">
        <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-accent to-accent-secondary" />
      </div>
      <ol className="mt-4 space-y-2">
        {phases.map((p, i) => (
          <li
            key={p.title}
            className={cn(
              "flex items-center gap-3 rounded-lg border px-3 py-2",
              p.state === "active" ? "border-accent-secondary/60 bg-accent-secondary/10" : "border-border bg-surface-elevated",
              p.state === "next" && "opacity-60",
            )}
          >
            <span
              className={cn(
                "flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold",
                p.state === "done" && "bg-green-500/15 text-green-500",
                p.state === "active" && "bg-accent-secondary text-white",
                p.state === "next" && "border border-border-strong text-muted",
              )}
            >
              {p.state === "done" ? <Check className="size-3.5" /> : i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-foreground">{p.title}</p>
              <p className="text-[10px] text-muted">{p.note}</p>
            </div>
            {p.state === "active" ? <StatusPill tone="accent">läuft</StatusPill> : null}
          </li>
        ))}
      </ol>
      <p className="mt-3 flex items-center gap-2 text-[11px] text-muted">
        <Calendar className="size-3.5 text-accent-secondary" />
        Nächster Termin: Umstellung der Postfächer, Freitag 16 Uhr
      </p>
    </WindowFrame>
  );
}

// ---------------------------------------------------------------------------
// Pakete: ein Angebot mit Festpreis
// ---------------------------------------------------------------------------

export function PaketeVisual({ className }: { className?: string }) {
  const items = [
    `Microsoft 365 für bis zu ${pricing.starterSeats} Arbeitsplätze`,
    "E-Mail-Schutz (SPF, DKIM, DMARC)",
    "Geräte eingerichtet & abgesichert",
    "Einweisung im Betrieb",
  ];
  return (
    <Stage className={cn("flex items-center justify-center", className)}>
      <div className="relative w-[70%] rotate-[-2deg] rounded-xl bg-white p-5 text-black shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wide text-black/50">Angebot Nr. 2026-118</p>
            <p className="mt-0.5 text-sm font-semibold">Paket „Starter“</p>
          </div>
          <FileText className="size-5 text-black/30" />
        </div>
        <ul className="mt-4 space-y-1.5">
          {items.map((item) => (
            <li key={item} className="flex items-center gap-2 text-[11px] text-black/70">
              <CheckCircle2 className="size-3.5 shrink-0 text-[#0891b2]" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-end justify-between border-t border-black/10 pt-3">
          <span className="text-[10px] text-black/50">Festpreis, einmalig</span>
          <span className="text-lg font-bold">ab {formatEuro(pricing.starter)}</span>
        </div>
        <div className="absolute -bottom-3 -left-3 rotate-[-6deg] bg-white rounded-md border-2 border-green-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-green-600">
          Keine versteckten Kosten
        </div>
      </div>
    </Stage>
  );
}

// ---------------------------------------------------------------------------
// Webdesign: Handwerker-Website auf Laptop und Handy
// ---------------------------------------------------------------------------

export function WebdesignVisual({ className }: { className?: string }) {
  return (
    <Stage className={className}>
      {/* Laptop */}
      <div className="absolute left-[5%] top-[10%] w-[72%]">
        <div className="overflow-hidden rounded-t-lg border-[5px] border-b-0 border-neutral-800 bg-white">
          <div className="flex items-center justify-between bg-white px-3 py-1.5 text-[8px] text-black/70">
            <span className="font-bold text-[#b45309]">DACHDECKEREI MUSTERBETRIEB</span>
            <span className="flex gap-2">
              <span>Leistungen</span>
              <span>Referenzen</span>
              <span>Karriere</span>
            </span>
          </div>
          <div className="relative bg-gradient-to-br from-[#78350f] via-[#b45309] to-[#f59e0b] px-4 py-5 text-white">
            <p className="text-[8px] uppercase tracking-wide opacity-80">Meisterbetrieb in Münster</p>
            <p className="mt-1 text-sm font-bold leading-tight">Ihr Dach in besten Händen.</p>
            <p className="mt-1 text-[8px] opacity-90">Neueindeckung, Sanierung, Sturmschäden – schnell vor Ort.</p>
            <span className="mt-2 inline-block rounded bg-white px-2 py-1 text-[8px] font-semibold text-[#b45309]">Anfrage senden</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5 bg-white p-2">
            {["from-slate-500 to-slate-700", "from-red-800 to-red-600", "from-stone-500 to-stone-700"].map((g) => (
              <div key={g} className={cn("h-7 rounded bg-gradient-to-br", g)} />
            ))}
          </div>
        </div>
        <div className="h-2 rounded-b-md bg-neutral-700" />
        <div className="mx-auto h-1 w-1/3 rounded-b bg-neutral-600" />
      </div>

      {/* Handy */}
      <PhoneShell className="absolute bottom-[6%] right-[5%] w-[26%]">
        <div className="bg-gradient-to-br from-[#78350f] to-[#f59e0b] px-2 py-3 text-white">
          <p className="text-[7px] font-bold">MUSTERBETRIEB</p>
          <p className="mt-1 text-[9px] font-bold leading-tight">Ihr Dach in besten Händen.</p>
        </div>
        <div className="space-y-1 p-2">
          <span className="flex items-center justify-center gap-1 rounded bg-[#b45309] py-1 text-[8px] font-semibold text-white">
            <Phone className="size-2.5" /> Anrufen
          </span>
          <span className="flex items-center justify-center gap-0.5 text-[8px] text-amber-500">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="size-2 fill-amber-400 text-amber-400" />
            ))}
          </span>
        </div>
      </PhoneShell>

      <div className="absolute right-[4%] top-[6%] flex items-center gap-1.5 rounded-lg border border-border-strong bg-surface-elevated/95 px-2.5 py-1.5 text-[10px] text-muted shadow-lg">
        <Zap className="size-3 text-accent-secondary" />
        Ladezeit 0,8 s
      </div>
    </Stage>
  );
}

// ---------------------------------------------------------------------------
// Gewerke
// ---------------------------------------------------------------------------

/** SHK: Notdienst-Anruf am Wochenende landet direkt auf dem Handy des Monteurs. */
function ShkVisual() {
  return (
    <Stage className="flex items-center justify-center gap-[6%]">
      <PhoneShell className="w-[36%]">
        <div className="flex flex-col items-center bg-gradient-to-b from-[#1e293b] to-[#0f172a] px-3 pb-4 pt-5 text-white">
          <p className="text-[9px] opacity-70">Samstag, 21:47</p>
          <PhoneIncoming className="mt-3 size-6 text-green-400" />
          <p className="mt-2 text-[11px] font-semibold">Notdienst-Leitung</p>
          <p className="text-[9px] opacity-70">Weitergeleitet von 0251 …-0</p>
          <p className="mt-2 rounded bg-white/10 px-2 py-1 text-center text-[9px]">„Heizung ausgefallen, kein Warmwasser“</p>
          <div className="mt-4 flex gap-6">
            <span className="flex size-8 items-center justify-center rounded-full bg-red-500">
              <Phone className="size-3.5 rotate-[135deg]" />
            </span>
            <span className="flex size-8 items-center justify-center rounded-full bg-green-500">
              <Phone className="size-3.5" />
            </span>
          </div>
        </div>
      </PhoneShell>
      <div className="w-[44%] space-y-2">
        <div className="rounded-lg border border-border-strong bg-surface-elevated p-2.5 shadow-lg">
          <p className="flex items-center gap-1.5 text-[11px] font-medium text-foreground">
            <BellRing className="size-3.5 text-accent-secondary" />
            Wartung fällig
          </p>
          <p className="mt-1 text-[10px] text-muted">Gastherme Fam. Becker · Erinnerung automatisch verschickt</p>
        </div>
        <div className="rounded-lg border border-border-strong bg-surface-elevated p-2.5 shadow-lg">
          <p className="flex items-center gap-1.5 text-[11px] font-medium text-foreground">
            <Ruler className="size-3.5 text-accent-secondary" />
            Aufmaß Bad, OG
          </p>
          <p className="mt-1 text-[10px] text-muted">vor Ort erfasst · direkt im Büro sichtbar</p>
        </div>
      </div>
    </Stage>
  );
}

/** Elektro: digitales E-Check-Protokoll und Wallbox-Anfrage. */
function ElektroVisual() {
  const checks = ["Sichtprüfung", "Isolationswiderstand", "Schleifenimpedanz", "RCD-Auslösung"];
  return (
    <WindowFrame title="E-Check · Bürogebäude Hafenweg 12" badge={<StatusPill>bestanden</StatusPill>}>
      <div className="space-y-1.5">
        {checks.map((c) => (
          <div key={c} className="flex items-center justify-between rounded-lg border border-border bg-surface-elevated px-3 py-1.5">
            <span className="flex items-center gap-2 text-[11px] text-foreground">
              <ClipboardCheck className="size-3.5 text-accent-secondary" />
              {c}
            </span>
            <Check className="size-3.5 text-green-500" />
          </div>
        ))}
      </div>
      <p className="mt-2 text-[10px] text-muted">Protokoll als PDF abgelegt · Nächste Prüfung: 11/2027</p>
      <div className="mt-3 flex items-center gap-3 rounded-xl border border-accent-secondary/50 bg-accent-secondary/10 p-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent-secondary text-white">
          <Plug className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] font-medium text-foreground">Neue Anfrage: Wallbox 11 kW</p>
          <p className="truncate text-[10px] text-muted">über die Seite „Wallbox-Installation Münster“</p>
        </div>
      </div>
    </WindowFrame>
  );
}

/** Dachdecker: nach dem Sturm viele Anfragen mit Fotos an einem Ort. */
function DachdeckerVisual() {
  const requests = [
    { name: "Fam. Schulte, Gievenbeck", photos: 3, urgent: true },
    { name: "Bäckerei Kröger, Hiltrup", photos: 5, urgent: true },
    { name: "Hr. Wessels, Kinderhaus", photos: 2, urgent: false },
  ];
  return (
    <WindowFrame title="Anfragen · Sturmschäden" badge={<StatusPill tone="amber">12 neu seit gestern</StatusPill>}>
      <p className="flex items-center gap-2 rounded-lg bg-amber-500/10 px-3 py-1.5 text-[11px] text-foreground">
        <CloudLightning className="size-3.5 text-amber-500" />
        Sturmwarnung Münsterland · automatische Eingangsbestätigung aktiv
      </p>
      <div className="mt-3 space-y-2">
        {requests.map((r) => (
          <div key={r.name} className="flex items-center gap-3 rounded-lg border border-border bg-surface-elevated p-2">
            <div className="grid shrink-0 grid-cols-2 gap-0.5">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={cn("size-3.5 rounded-sm", i % 2 ? "bg-red-900/60" : "bg-slate-500/60")} />
              ))}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[11px] font-medium text-foreground">{r.name}</p>
              <p className="flex items-center gap-1 text-[10px] text-muted">
                <Camera className="size-3" />
                {r.photos} Fotos für die Versicherung
              </p>
            </div>
            {r.urgent ? <AlertTriangle className="size-3.5 shrink-0 text-amber-500" /> : null}
          </div>
        ))}
      </div>
    </WindowFrame>
  );
}

/** Maler: Referenzgalerie auf der Website und Angebot aus der Vorlage. */
function MalerVisual() {
  const rooms = [
    { label: "Wohnzimmer, Kalkputz", color: "bg-[#c8b8a0]" },
    { label: "Fassade, Altbau", color: "bg-[#8aa39b]" },
    { label: "Treppenhaus", color: "bg-[#d9c7a3]" },
    { label: "Kinderzimmer", color: "bg-[#a9c4dc]" },
  ];
  return (
    <WindowFrame title="malerbetrieb-muster.de/referenzen">
      <div className="grid grid-cols-2 gap-2">
        {rooms.map((r) => (
          <div key={r.label} className="overflow-hidden rounded-lg border border-border">
            <div className={cn("relative h-12", r.color)}>
              <div className="absolute bottom-0 left-0 h-3 w-full bg-black/10" />
              <div className="absolute left-[15%] top-[20%] h-5 w-4 rounded-sm bg-white/50" />
            </div>
            <p className="bg-surface-elevated px-2 py-1 text-[10px] text-foreground">{r.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl border border-border-strong bg-surface-elevated px-3 py-2">
        <span className="flex items-center gap-2 text-[11px] text-foreground">
          <Send className="size-3.5 text-accent-secondary" />
          Angebot „Innenanstrich 3 Räume“ aus Vorlage
        </span>
        <StatusPill>versendet</StatusPill>
      </div>
    </WindowFrame>
  );
}

/** Tischler: Entwurf mit Maßen und Materialliste je Auftrag. */
function TischlerVisual() {
  return (
    <WindowFrame title="Auftrag T-0412 · Einbauschrank Flur" bodyClassName="grid grid-cols-[1.2fr_1fr] gap-3">
      <div className="rounded-lg border border-border bg-surface-elevated p-2">
        <svg viewBox="0 0 160 140" className="h-full w-full text-foreground" aria-hidden>
          <rect x="25" y="15" width="110" height="105" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <line x1="80" y1="15" x2="80" y2="120" stroke="currentColor" strokeWidth="1" />
          <line x1="25" y1="85" x2="135" y2="85" stroke="currentColor" strokeWidth="1" />
          <circle cx="74" cy="50" r="1.8" fill="currentColor" />
          <circle cx="86" cy="50" r="1.8" fill="currentColor" />
          <line x1="25" y1="130" x2="135" y2="130" stroke="var(--accent-secondary)" strokeWidth="1" />
          <text x="80" y="138" textAnchor="middle" fontSize="8" fill="var(--accent-secondary)">
            1.840 mm
          </text>
          <line x1="12" y1="15" x2="12" y2="120" stroke="var(--accent-secondary)" strokeWidth="1" />
          <text x="9" y="70" textAnchor="middle" fontSize="8" fill="var(--accent-secondary)" transform="rotate(-90 9 70)">
            2.380 mm
          </text>
        </svg>
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="text-[11px] font-semibold text-foreground">Materialliste</p>
        {[
          ["Eiche furniert 19 mm", "4 Pl."],
          ["Rückwand HDF 8 mm", "2 Pl."],
          ["Topfbänder 110°", "8 St."],
          ["Griffleisten Eiche", "2 St."],
        ].map(([m, q]) => (
          <div key={m} className="flex justify-between gap-2 rounded border border-border bg-surface-elevated px-2 py-1 text-[10px]">
            <span className="truncate text-foreground">{m}</span>
            <span className="shrink-0 text-muted">{q}</span>
          </div>
        ))}
        <span className="mt-auto">
          <StatusPill tone="accent">an Werkstatt übergeben</StatusPill>
        </span>
      </div>
    </WindowFrame>
  );
}

export const tradeVisuals: Record<string, React.ReactNode> = {
  shk: <ShkVisual />,
  elektro: <ElektroVisual />,
  dachdecker: <DachdeckerVisual />,
  maler: <MalerVisual />,
  tischler: <TischlerVisual />,
};
