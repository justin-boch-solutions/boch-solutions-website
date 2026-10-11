"use client";

import { useState, type FormEvent } from "react";
import { AlertTriangle, CheckCircle2, Loader2, Mail, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatEuro, pricing } from "@/lib/constants";
import { fireConfettiRain } from "@/lib/confetti";

type Severity = "ok" | "warn" | "critical";

interface Finding {
  id: string;
  severity: Severity;
  title: string;
  consequence: string;
  detail: string;
}

interface Report {
  domain: string;
  provider: string | null;
  isMicrosoft365: boolean;
  findings: Finding[];
  verdict: "sauber" | "lueckenhaft" | "kritisch" | "unbekannt";
  criticalCount: number;
  warnCount: number;
}

type Status = "idle" | "submitting" | "success" | "error";

const severityStyles: Record<Severity, { border: string; text: string; label: string }> = {
  ok: { border: "border-green-400/40", text: "text-green-400", label: "In Ordnung" },
  warn: { border: "border-yellow-400/40", text: "text-yellow-400", label: "Lücke" },
  critical: { border: "border-red-400/40", text: "text-red-400", label: "Kritisch" },
};

const verdictHeadline: Record<Report["verdict"], string> = {
  sauber: "Sauber eingerichtet",
  lueckenhaft: "Es gibt Lücken",
  kritisch: "Ihre Domain ist angreifbar",
  unbekannt: "Keine Einträge abrufbar",
};

const inputClass =
  "w-full rounded-lg border border-border-strong bg-surface-elevated px-4 py-3 text-sm text-foreground placeholder:text-muted focus-visible:border-accent-secondary disabled:opacity-60";

export function EmailCheckForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [report, setReport] = useState<Report | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/email-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error || "Prüfung fehlgeschlagen.");

      setReport(data.report);
      setStatus("success");
      if (data.report?.verdict === "sauber") fireConfettiRain();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Prüfung fehlgeschlagen.");
    }
  }

  if (status === "success" && report) {
    const needsWork = report.criticalCount > 0 || report.warnCount > 0;
    const VerdictIcon = report.verdict === "sauber" ? CheckCircle2 : report.verdict === "kritisch" ? ShieldAlert : AlertTriangle;
    const verdictColor =
      report.verdict === "sauber" ? "text-green-400" : report.verdict === "kritisch" ? "text-red-400" : "text-yellow-400";

    return (
      <div className="rounded-2xl border border-border bg-surface p-8 sm:p-10">
        <div className="text-center">
          <VerdictIcon className={`mx-auto size-10 ${verdictColor}`} />
          <h3 className="mt-4 font-display text-2xl font-bold text-foreground">{verdictHeadline[report.verdict]}</h3>
          <p className="mt-2 text-sm text-muted">
            {report.domain}
            {report.provider ? ` · E-Mail läuft über ${report.provider}` : " · kein MX-Eintrag gefunden"}
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {report.findings.map((finding) => {
            const style = severityStyles[finding.severity];
            return (
              <div key={finding.id} className={`rounded-xl border bg-surface-elevated p-5 ${style.border}`}>
                <p className={`text-xs font-bold uppercase tracking-[0.12em] ${style.text}`}>{style.label}</p>
                <p className="mt-2 font-medium text-foreground">{finding.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{finding.consequence}</p>
                <p className="mt-3 break-all font-mono text-xs leading-relaxed text-muted/70">{finding.detail}</p>
              </div>
            );
          })}
        </div>

        {needsWork ? (
          <div className="mt-8 rounded-xl border border-accent-secondary/40 bg-surface-elevated p-6">
            <p className="font-display text-lg font-bold text-foreground">Soll ich das beheben?</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Ich richte SPF, DKIM und DMARC für Ihre Domain korrekt ein, beobachte vier Wochen die Berichte und ziehe den
              Schutz dann auf die strenge Stufe. Danach erhalten Sie denselben Bericht noch einmal – als Nachweis.
            </p>
            <p className="mt-3 text-sm font-semibold text-foreground">
              Festpreis {formatEuro(pricing.emailProtection)} · kein Betriebsausfall
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button href="/kontakt" size="lg">
                Beheben lassen
              </Button>
              <Button href="/leistungen/email-optimierung" variant="secondary" size="lg">
                Erst Details lesen
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-8 flex justify-center">
            <Button href="/kontakt" size="lg">
              Kostenlosen Strategie-Call vereinbaren
            </Button>
          </div>
        )}

        <div className="mt-8 flex items-center justify-center gap-2 rounded-xl border border-border-strong bg-surface-elevated p-4 text-sm text-accent-secondary">
          <Mail className="size-4 shrink-0" />
          Den Bericht haben wir Ihnen zusätzlich per E-Mail geschickt.
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-muted">
          Geprüft wurden ausschließlich öffentlich abrufbare DNS-Einträge Ihrer Domain. Es wurde kein Zugriff auf
          Postfächer, Server oder Inhalte genommen.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-8 sm:p-10">
      <form onSubmit={handleSubmit}>
        <input type="text" name="hp_confirm" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="domain"
            placeholder="Ihre Domain (z. B. meine-firma.de)"
            required
            disabled={status === "submitting"}
            className={inputClass}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              autoComplete="name"
              disabled={status === "submitting"}
              className={inputClass}
            />
            <input
              type="email"
              name="email"
              placeholder="E-Mail"
              required
              autoComplete="email"
              disabled={status === "submitting"}
              className={inputClass}
            />
          </div>
          <input
            type="text"
            name="firma"
            placeholder="Firma (optional)"
            autoComplete="organization"
            disabled={status === "submitting"}
            className={inputClass}
          />
        </div>

        <div className="mt-6 flex flex-col items-center gap-4">
          <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
            {status === "submitting" ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Wird geprüft…
              </>
            ) : (
              "E-Mail-Sicherheit kostenlos prüfen"
            )}
          </Button>
          {status === "error" ? <p className="text-sm text-red-400">{errorMessage}</p> : null}
          <p className="text-center text-xs text-muted">
            Wir prüfen nur öffentliche DNS-Einträge – kein Zugriff auf Ihr Postfach. Details in der{" "}
            <a href="/datenschutz" className="underline hover:text-foreground">
              Datenschutzerklärung
            </a>
            .
          </p>
        </div>
      </form>
    </div>
  );
}
