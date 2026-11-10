import {
  Bot,
  Check,
  CheckCircle2,
  ClipboardList,
  Cloud,
  Euro,
  Globe,
  HardDrive,
  KeyRound,
  Laptop,
  Lock,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Printer,
  RefreshCw,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  TrendingDown,
  Users,
  Wrench,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { StatusPill, WindowFrame } from "@/components/illustrations/window-frame";

/*
 * Hero-Illustrationen je Leistung. Bewusst nachgebaute Oberflächen statt
 * Stockfotos: Sie zeigen, was der Kunde nach dem Projekt wirklich vor sich hat,
 * passen sich Hell/Dunkel an und kosten keine Ladezeit.
 * Keine Original-Logos von Microsoft oder Google – nur Farben und Begriffe.
 */

// ---------------------------------------------------------------------------
// Microsoft 365 & Azure: Übersicht mit Apps, Benutzern und Sicherheitswert
// ---------------------------------------------------------------------------

const m365Apps = [
  { label: "Outlook", letter: "O", color: "bg-[#0f6cbd]" },
  { label: "Teams", letter: "T", color: "bg-[#5b5fc7]" },
  { label: "OneDrive", letter: "D", color: "bg-[#0364b8]" },
  { label: "SharePoint", letter: "S", color: "bg-[#037b7f]" },
  { label: "Word", letter: "W", color: "bg-[#185abd]" },
  { label: "Excel", letter: "X", color: "bg-[#107c41]" },
];

export function Microsoft365Dashboard({ className }: { className?: string }) {
  return (
    <WindowFrame title="admin.microsoft.com · Übersicht" badge={<StatusPill>Alles in Ordnung</StatusPill>} className={className}>
      <p className="font-display text-sm font-semibold text-foreground">Guten Morgen, Herr Hausmann</p>
      <div className="mt-3 grid grid-cols-6 gap-2">
        {m365Apps.map((app) => (
          <div key={app.label} className="flex flex-col items-center gap-1">
            <span className={cn("flex size-8 items-center justify-center rounded-lg text-xs font-bold text-white shadow", app.color)}>
              {app.letter}
            </span>
            <span className="truncate text-[9px] text-muted">{app.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <Kpi icon={Users} label="Benutzer" value="12" />
        <Kpi icon={HardDrive} label="Speicher" value="38 %" />
        <Kpi icon={ShieldCheck} label="Sicherheit" value="86 %" />
      </div>

      <div className="mt-3 space-y-1.5">
        {[
          "MFA für alle Benutzer aktiv",
          "Geräte verwaltet: 9 Laptops, 12 Smartphones",
          "Tägliche Sicherung von Postfächern & OneDrive",
        ].map((line) => (
          <p key={line} className="flex items-center gap-2 rounded-lg border border-border bg-surface-elevated px-3 py-1.5 text-[11px] text-muted">
            <CheckCircle2 className="size-3.5 shrink-0 text-green-500" />
            {line}
          </p>
        ))}
      </div>
    </WindowFrame>
  );
}

function Kpi({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-surface-elevated p-2">
      <p className="flex items-center gap-1 text-[10px] text-muted">
        <Icon className="size-3 text-accent-secondary" />
        {label}
      </p>
      <p className="mt-0.5 font-display text-base font-semibold text-foreground">{value}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Microsoft-Lizenzierung: Lizenzübersicht mit Einsparung
// ---------------------------------------------------------------------------

// Beispielhafte Zuordnung ohne Preise: Microsoft ändert die Listenpreise
// regelmäßig, eine veraltete Zahl im Bild wäre schlimmer als keine.
const licenses = [
  { name: "Business Basic", who: "Monteure · nur E-Mail & Teams", used: 4, total: 4 },
  { name: "Business Standard", who: "Büro · Office-Apps", used: 6, total: 6 },
  { name: "Business Premium", who: "Geschäftsführung · Geräteverwaltung", used: 2, total: 2 },
  { name: "Business Standard", who: "ehemalige Mitarbeitende", used: 0, total: 3, removed: true },
];

export function LizenzierungIllustration({ className }: { className?: string }) {
  return (
    <WindowFrame title="Lizenzen · Abrechnung" className={className}>
      <p className="font-display text-sm font-semibold text-foreground">Ihre Lizenzen</p>
      <div className="mt-3 space-y-2">
        {licenses.map((l, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center justify-between gap-2 rounded-lg border px-3 py-2",
              l.removed ? "border-amber-500/40 bg-amber-500/5" : "border-border bg-surface-elevated",
            )}
          >
            <div className="min-w-0">
              <p className={cn("text-xs font-medium text-foreground", l.removed && "line-through opacity-60")}>{l.name}</p>
              <p className="truncate text-[10px] text-muted">{l.who}</p>
            </div>
            {l.removed ? (
              <StatusPill tone="amber">ungenutzt · gekündigt</StatusPill>
            ) : (
              <span className="shrink-0 text-[11px] text-muted">
                {l.used} / {l.total}
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-lg bg-gradient-to-r from-accent/15 to-accent-secondary/15 px-3 py-2 text-[11px] text-foreground">
        <TrendingDown className="size-4 text-accent-secondary" />
        <span>
          <strong>3 ungenutzte Lizenzen</strong> gefunden &middot; jeder hat den Plan, den er braucht
        </span>
      </div>
    </WindowFrame>
  );
}

// ---------------------------------------------------------------------------
// E-Mail-Optimierung & Migration: Postfach-Umzug + Absender-Schutz
// ---------------------------------------------------------------------------

export function EmailMigrationIllustration({ className }: { className?: string }) {
  return (
    <WindowFrame title="Postfach-Umzug · Exchange Online" badge={<StatusPill tone="accent">läuft</StatusPill>} className={className}>
      <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface-elevated p-3">
        <div className="flex items-center gap-2">
          <Server className="size-6 text-muted" />
          <div>
            <p className="text-[11px] font-medium text-foreground">Alter Anbieter</p>
            <p className="text-[10px] text-muted">IMAP · 3 Postfächer</p>
          </div>
        </div>
        <RefreshCw className="size-4 text-accent-secondary" />
        <div className="flex items-center gap-2">
          <Cloud className="size-6 text-accent-secondary" />
          <div>
            <p className="text-[11px] font-medium text-foreground">Microsoft 365</p>
            <p className="text-[10px] text-muted">Exchange Online</p>
          </div>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {[
          { box: "info@", pct: 100 },
          { box: "buero@", pct: 100 },
          { box: "m.hausmann@", pct: 82 },
        ].map((m) => (
          <div key={m.box}>
            <div className="flex justify-between text-[10px] text-muted">
              <span>{m.box}musterbetrieb.de</span>
              <span>{m.pct === 100 ? "fertig" : `${m.pct} %`}</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-border">
              <div className="h-full rounded-full bg-gradient-to-r from-accent to-accent-secondary" style={{ width: `${m.pct}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2">
        {["SPF", "DKIM", "DMARC"].map((rec) => (
          <div key={rec} className="flex items-center justify-center gap-1 rounded-lg border border-green-500/30 bg-green-500/5 py-1.5 text-[11px] font-medium text-foreground">
            <Check className="size-3 text-green-500" />
            {rec}
          </div>
        ))}
      </div>
    </WindowFrame>
  );
}

// ---------------------------------------------------------------------------
// Domain-Einrichtung: DNS-Einträge
// ---------------------------------------------------------------------------

const dnsRecords = [
  { type: "A", name: "@", value: "76.76.21.21" },
  { type: "CNAME", name: "www", value: "musterbetrieb.de" },
  { type: "MX", name: "@", value: "musterbetrieb-de.mail.protection…" },
  { type: "TXT", name: "@", value: "v=spf1 include:spf.protection…" },
  { type: "TXT", name: "_dmarc", value: "v=DMARC1; p=quarantine; …" },
];

export function DomainIllustration({ className }: { className?: string }) {
  return (
    <WindowFrame title="DNS-Verwaltung · musterbetrieb.de" badge={<StatusPill>verifiziert</StatusPill>} className={className}>
      <div className="flex items-center gap-2 rounded-full border border-border-strong bg-surface-elevated px-3 py-1.5">
        <Lock className="size-3.5 text-green-500" />
        <span className="text-xs text-foreground">https://musterbetrieb.de</span>
        <span className="ml-auto text-[10px] text-muted">SSL gültig</span>
      </div>
      <div className="mt-3 overflow-hidden rounded-lg border border-border">
        <div className="grid grid-cols-[52px_56px_1fr_16px] gap-2 bg-surface-elevated px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
          <span>Typ</span>
          <span>Name</span>
          <span>Wert</span>
          <span />
        </div>
        {dnsRecords.map((r, i) => (
          <div key={i} className="grid grid-cols-[52px_56px_1fr_16px] items-center gap-2 border-t border-border px-3 py-1.5 text-[11px]">
            <span className="font-mono font-semibold text-accent-secondary">{r.type}</span>
            <span className="font-mono text-foreground">{r.name}</span>
            <span className="truncate font-mono text-muted">{r.value}</span>
            <Check className="size-3 text-green-500" />
          </div>
        ))}
      </div>
      <p className="mt-3 flex items-center gap-2 text-[11px] text-muted">
        <Globe className="size-3.5 text-accent-secondary" />
        Domain, Website und E-Mail aus einer Hand eingerichtet
      </p>
    </WindowFrame>
  );
}

// ---------------------------------------------------------------------------
// IT-Support & Wartung: Geräteübersicht + Ticket
// ---------------------------------------------------------------------------

const devices = [
  { icon: Laptop, name: "Laptop Büro", status: "Aktuell", tone: "green" as const },
  { icon: Laptop, name: "Laptop Bauleitung", status: "Update heute 18 Uhr", tone: "amber" as const },
  { icon: Smartphone, name: "12 Smartphones", status: "Verwaltet", tone: "green" as const },
  { icon: Printer, name: "Drucker Werkstatt", status: "Online", tone: "green" as const },
];

export function SupportIllustration({ className }: { className?: string }) {
  return (
    <WindowFrame title="Wartung · Musterbetrieb" badge={<StatusPill>überwacht</StatusPill>} className={className}>
      <div className="grid grid-cols-2 gap-2">
        {devices.map((d) => (
          <div key={d.name} className="rounded-lg border border-border bg-surface-elevated p-2">
            <p className="flex items-center gap-1.5 text-[11px] font-medium text-foreground">
              <d.icon className="size-3.5 text-accent-secondary" />
              {d.name}
            </p>
            <div className="mt-1">
              <StatusPill tone={d.tone}>{d.status}</StatusPill>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-border-strong bg-surface-elevated p-3">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-xs font-medium text-foreground">
            <Wrench className="size-3.5 text-accent-secondary" />
            Ticket #214 · Scanner verbindet nicht
          </p>
          <StatusPill>gelöst</StatusPill>
        </div>
        <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
          Gemeldet 08:12 per WhatsApp &middot; per Fernwartung behoben 08:31
        </p>
      </div>
    </WindowFrame>
  );
}

// ---------------------------------------------------------------------------
// Cloud-Sicherheit, Backup & DSGVO
// ---------------------------------------------------------------------------

const securityChecks = [
  { icon: KeyRound, label: "Zwei-Faktor-Anmeldung", value: "12 / 12 Benutzer" },
  { icon: HardDrive, label: "Backup", value: "heute 02:00 · erfolgreich" },
  { icon: ShieldCheck, label: "Virenschutz & Updates", value: "alle Geräte aktuell" },
  { icon: ClipboardList, label: "AV-Vertrag & TOMs", value: "dokumentiert" },
];

export function SicherheitIllustration({ className }: { className?: string }) {
  const score = 92;
  return (
    <WindowFrame title="Sicherheitsübersicht" className={className}>
      <div className="flex items-center gap-4">
        <div
          className="relative flex size-20 shrink-0 items-center justify-center rounded-full"
          style={{ background: `conic-gradient(var(--accent-secondary) ${score * 3.6}deg, var(--border) 0deg)` }}
        >
          <div className="flex size-16 flex-col items-center justify-center rounded-full bg-surface">
            <span className="font-display text-lg font-bold text-foreground">{score}</span>
            <span className="text-[9px] text-muted">von 100</span>
          </div>
        </div>
        <div>
          <p className="font-display text-sm font-semibold text-foreground">Gut geschützt</p>
          <p className="mt-1 text-[11px] leading-relaxed text-muted">Daten liegen in deutschen Rechenzentren, Zugriffe sind abgesichert.</p>
        </div>
      </div>
      <div className="mt-3 space-y-1.5">
        {securityChecks.map((c) => (
          <div key={c.label} className="flex items-center justify-between rounded-lg border border-border bg-surface-elevated px-3 py-1.5">
            <span className="flex items-center gap-2 text-[11px] text-foreground">
              <c.icon className="size-3.5 text-accent-secondary" />
              {c.label}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-muted">
              <Check className="size-3 text-green-500" />
              {c.value}
            </span>
          </div>
        ))}
      </div>
    </WindowFrame>
  );
}

// ---------------------------------------------------------------------------
// SEO & GEO: Antwort eines KI-Assistenten, die den Betrieb empfiehlt
// ---------------------------------------------------------------------------

export function GeoIllustration({ className }: { className?: string }) {
  return (
    <WindowFrame title="KI-Assistent · Websuche" className={className}>
      <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-sm bg-accent/15 px-3 py-2 text-xs text-foreground">
        Welcher Elektriker in Münster macht auch Wallboxen?
      </div>
      <div className="mt-3 flex gap-2">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-secondary text-white">
          <Sparkles className="size-3.5" />
        </span>
        <div className="rounded-2xl rounded-tl-sm border border-border bg-surface-elevated px-3 py-2 text-[11px] leading-relaxed text-muted">
          Empfehlenswert ist <strong className="text-foreground">Elektro Musterbetrieb</strong> in Münster: Meisterbetrieb,
          Installation und Förderantrag für Wallboxen, 4,9 Sterne aus 128 Bewertungen.
          <div className="mt-2 flex flex-wrap gap-1">
            {["musterbetrieb.de", "Google Maps", "Handwerkskammer"].map((src, i) => (
              <span key={src} className="rounded-full border border-border-strong px-2 py-0.5 text-[9px] text-foreground">
                [{i + 1}] {src}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-border bg-surface-elevated p-2">
          <p className="flex items-center gap-1 text-[10px] text-muted">
            <Bot className="size-3 text-accent-secondary" />
            Nennungen in KI-Antworten
          </p>
          <p className="font-display text-base font-semibold text-foreground">↑ 3×</p>
        </div>
        <div className="rounded-lg border border-border bg-surface-elevated p-2">
          <p className="flex items-center gap-1 text-[10px] text-muted">
            <Globe className="size-3 text-accent-secondary" />
            Google-Position
          </p>
          <p className="font-display text-base font-semibold text-foreground">Platz 2</p>
        </div>
      </div>
    </WindowFrame>
  );
}

// ---------------------------------------------------------------------------
// Google-Unternehmensprofil: Profilkarte mit Karte, Bewertungen, Aktionen
// ---------------------------------------------------------------------------

export function UnternehmensprofilIllustration({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border-strong bg-white shadow-2xl shadow-black/30",
        className,
      )}
    >
      {/* Kartenausschnitt */}
      <div className="relative h-[38%] overflow-hidden bg-[#e8eef3]">
        <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(90deg,#fff_2px,transparent_2px),linear-gradient(#fff_2px,transparent_2px)] [background-size:44px_44px]" />
        <div className="absolute left-[10%] top-[55%] h-3 w-[80%] -rotate-6 rounded-full bg-[#fde68a]" />
        <div className="absolute left-[55%] top-0 h-full w-3 rotate-12 rounded-full bg-white" />
        <div className="absolute left-1/2 top-[30%] -translate-x-1/2 text-[#ea4335] drop-shadow">
          <MapPin className="size-8 fill-[#ea4335] text-white" />
        </div>
      </div>
      <div className="p-4 text-black">
        <p className="text-sm font-semibold">Dachdeckerei Musterbetrieb</p>
        <div className="mt-0.5 flex items-center gap-1 text-[11px] text-black/60">
          <span className="font-medium text-black/80">4,9</span>
          <span className="flex">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="size-3 fill-amber-400 text-amber-400" />
            ))}
          </span>
          <span>(87) &middot; Dachdecker in Münster</span>
        </div>
        <p className="mt-1 text-[11px] text-green-700">Geöffnet &middot; schließt um 17:00</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            { icon: Phone, label: "Anrufen" },
            { icon: Navigation, label: "Route" },
            { icon: Globe, label: "Website" },
          ].map((a) => (
            <span key={a.label} className="flex flex-col items-center gap-1 rounded-lg border border-black/10 py-1.5 text-[10px] text-[#1a73e8]">
              <a.icon className="size-3.5" />
              {a.label}
            </span>
          ))}
        </div>
        <div className="mt-3 rounded-lg bg-black/[0.04] p-2 text-[10px] leading-relaxed text-black/70">
          „Schnell vor Ort nach dem Sturm, sauber gearbeitet und faires Angebot.“ &middot; ★★★★★
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Individuelle Software: Auftrags-App auf dem Tablet
// ---------------------------------------------------------------------------

const jobs = [
  { id: "A-1042", title: "Badsanierung Fam. Klein", status: "Heute 8:00", tone: "accent" as const },
  { id: "A-1039", title: "Heizungswartung Gartenstr. 4", status: "Erledigt", tone: "green" as const },
  { id: "A-1037", title: "Aufmaß Dachrinne Lindenweg", status: "Material fehlt", tone: "amber" as const },
];

export function SoftwareIllustration({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl border border-border-strong bg-gradient-to-br from-accent/10 via-surface to-accent-secondary/10 shadow-2xl shadow-black/30",
        className,
      )}
    >
      <div className="w-[82%] rounded-[1.4rem] border-[6px] border-neutral-800 bg-surface shadow-2xl">
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <p className="font-display text-xs font-semibold text-foreground">Aufträge</p>
          <span className="rounded-full bg-accent px-2 py-0.5 text-[9px] font-medium text-white">+ Neu</span>
        </div>
        <div className="space-y-1.5 p-3">
          {jobs.map((j) => (
            <div key={j.id} className="flex items-center justify-between rounded-lg border border-border bg-surface-elevated px-3 py-2">
              <div>
                <p className="text-[11px] font-medium text-foreground">{j.title}</p>
                <p className="text-[9px] text-muted">{j.id}</p>
              </div>
              <StatusPill tone={j.tone}>{j.status}</StatusPill>
            </div>
          ))}
          <div className="flex items-center justify-between rounded-lg border border-dashed border-border-strong px-3 py-2">
            <span className="text-[10px] text-muted">Unterschrift Kunde</span>
            <svg viewBox="0 0 80 20" className="h-4 w-20 text-foreground" aria-hidden>
              <path d="M2 14 C10 2, 16 18, 24 10 S36 4, 42 12 S56 16, 62 6 S74 10, 78 8" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>
        </div>
        <div className="flex items-center justify-around border-t border-border px-4 py-1.5 text-[9px] text-muted">
          <span className="text-accent-secondary">Aufträge</span>
          <span>Kalender</span>
          <span>Material</span>
          <span className="flex items-center gap-0.5">
            <Euro className="size-2.5" />
            Rechnung
          </span>
        </div>
      </div>
      <div className="absolute bottom-[5%] right-[4%] flex items-center gap-1.5 rounded-lg border border-border-strong bg-surface-elevated/95 px-2.5 py-1.5 text-[10px] text-muted shadow-lg">
        <Mail className="size-3 text-accent-secondary" />
        Rechnung automatisch versendet
      </div>
    </div>
  );
}
