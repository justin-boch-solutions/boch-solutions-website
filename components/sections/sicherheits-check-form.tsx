"use client";

import { useState, type FormEvent } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Info,
  Loader2,
  Mail,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEVERITY_LABEL } from "@/lib/website-security/scoring";
import type { Finding, ScanResult, Severity } from "@/lib/website-security/types";

type Status = "idle" | "scanning" | "success" | "error";
type ReportStatus = "idle" | "sending" | "sent" | "error";

const severityStyles: Record<Severity, { border: string; text: string; dot: string }> = {
  critical: { border: "border-red-400/40", text: "text-red-400", dot: "bg-red-400" },
  high: { border: "border-orange-400/40", text: "text-orange-400", dot: "bg-orange-400" },
  medium: { border: "border-yellow-400/40", text: "text-yellow-400", dot: "bg-yellow-400" },
  low: { border: "border-sky-400/40", text: "text-sky-400", dot: "bg-sky-400" },
  info: { border: "border-border-strong", text: "text-muted", dot: "bg-muted" },
  ok: { border: "border-green-400/40", text: "text-green-400", dot: "bg-green-400" },
};

const gradeStyles: Record<string, string> = {
  A: "border-green-400/40 text-green-400",
  B: "border-green-400/40 text-green-400",
  C: "border-yellow-400/40 text-yellow-400",
  D: "border-orange-400/40 text-orange-400",
  E: "border-red-400/40 text-red-400",
  F: "border-red-400/40 text-red-400",
};

const inputClass =
  "w-full rounded-lg border border-border-strong bg-surface-elevated px-4 py-3 text-sm text-foreground placeholder:text-muted focus-visible:border-accent-secondary disabled:opacity-60";

function FindingItem({ finding }: { finding: Finding }) {
  const style = severityStyles[finding.severity];
  const [open, setOpen] = useState(finding.severity === "critical");
  const expandable = finding.severity !== "ok" && (Boolean(finding.impact) || finding.actions.length > 0);

  return (
    <div className={`rounded-xl border bg-surface-elevated ${style.border}`}>
      <button
        type="button"
        onClick={() => expandable && setOpen((v) => !v)}
        aria-expanded={expandable ? open : undefined}
        className={`flex w-full items-start gap-3 p-5 text-left ${expandable ? "" : "cursor-default"}`}
      >
        <span className={`mt-1.5 size-2 shrink-0 rounded-full ${style.dot}`} aria-hidden />
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <span className={`text-xs font-bold uppercase tracking-[0.12em] ${style.text}`}>
              {SEVERITY_LABEL[finding.severity]}
            </span>
            {finding.cves?.map((cve) => (
              <span key={cve} className="rounded bg-surface px-1.5 py-0.5 font-mono text-[10px] text-muted">
                {cve}
              </span>
            ))}
          </span>
          <span className="mt-2 block font-medium text-foreground">{finding.title}</span>
          <span className="mt-2 block text-sm leading-relaxed text-muted">{finding.evidence}</span>
        </span>
        {expandable ? (
          <ChevronDown
            className={`mt-1 size-4 shrink-0 text-muted transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden
          />
        ) : null}
      </button>

      {expandable && open ? (
        <div className="border-t border-border px-5 pb-5 pt-4">
          {finding.impact ? (
            <>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">Warum das zählt</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{finding.impact}</p>
            </>
          ) : null}

          {finding.actions.length > 0 ? (
            <>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-muted">
                Was jetzt zu tun ist
              </p>
              <ol className="mt-3 space-y-2.5">
                {finding.actions.map((action, index) => (
                  <li key={index} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-surface text-[11px] font-bold text-accent-secondary">
                      {index + 1}
                    </span>
                    <span>{action}</span>
                  </li>
                ))}
              </ol>
            </>
          ) : null}

          {finding.references?.length ? (
            <div className="mt-5 border-t border-border pt-4">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">Quellen</p>
              <ul className="mt-2 space-y-1">
                {finding.references.map((reference) => (
                  <li key={reference.url}>
                    <a
                      href={reference.url}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="text-sm text-accent-secondary underline hover:text-foreground"
                    >
                      {reference.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

export function SicherheitsCheckForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [report, setReport] = useState<ScanResult | null>(null);
  const [consent, setConsent] = useState(false);

  const [reportStatus, setReportStatus] = useState<ReportStatus>("idle");
  const [reportError, setReportError] = useState("");

  async function handleScan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "scanning") return;

    const formData = new FormData(event.currentTarget);
    const domain = String(formData.get("domain") ?? "").trim();

    if (!domain) {
      setStatus("error");
      setErrorMessage("Bitte geben Sie eine Domain ein.");
      return;
    }
    if (!consent) {
      setStatus("error");
      setErrorMessage("Bitte bestätigen Sie, dass Sie zur Prüfung dieser Domain berechtigt sind.");
      return;
    }

    setStatus("scanning");
    setErrorMessage("");
    setReportStatus("idle");

    try {
      const response = await fetch("/api/sicherheits-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain, consent: true, hp_confirm: formData.get("hp_confirm") ?? "" }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error || "Die Prüfung ist fehlgeschlagen.");

      setReport(data.report as ScanResult);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Die Prüfung ist fehlgeschlagen.");
    }
  }

  async function handleReport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!report || reportStatus === "sending") return;

    const formData = new FormData(event.currentTarget);
    setReportStatus("sending");
    setReportError("");

    try {
      const response = await fetch("/api/sicherheits-check", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(formData.get("email") ?? ""),
          name: String(formData.get("name") ?? ""),
          hp_confirm: formData.get("hp_confirm") ?? "",
          report,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error || "Versand fehlgeschlagen.");
      setReportStatus("sent");
    } catch (error) {
      setReportStatus("error");
      setReportError(error instanceof Error ? error.message : "Versand fehlgeschlagen.");
    }
  }

  if (status === "success" && report) {
    const problems = report.findings.filter((f) => f.severity !== "ok");
    const positives = report.findings.filter((f) => f.severity === "ok");
    const criticalCount = report.counts.critical;
    const VerdictIcon = criticalCount > 0 ? ShieldAlert : problems.length > 0 ? AlertTriangle : ShieldCheck;
    const verdictColor =
      criticalCount > 0 ? "text-red-400" : problems.length > 0 ? "text-yellow-400" : "text-green-400";

    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-surface p-8 sm:p-10">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:text-left">
            <div
              className={`flex size-24 shrink-0 flex-col items-center justify-center rounded-2xl border bg-surface-elevated ${gradeStyles[report.grade]}`}
            >
              <span className="font-display text-4xl font-bold leading-none">{report.grade}</span>
              <span className="mt-1 text-xs font-medium opacity-70">{report.score}/100</span>
            </div>

            <div className="min-w-0 flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center gap-2 sm:justify-start">
                <VerdictIcon className={`size-5 shrink-0 ${verdictColor}`} aria-hidden />
                <h3 className="truncate font-display text-xl font-bold text-foreground">
                  {report.target.hostname}
                </h3>
              </div>
              <p className="mt-1 text-sm text-muted">
                Geprüft am{" "}
                {new Date(report.scannedAt).toLocaleString("de-DE", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}{" "}
                · {(report.durationMs / 1000).toFixed(1)} s
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs sm:justify-start">
                {(["critical", "high", "medium", "low", "ok"] as const)
                  .filter((s) => report.counts[s] > 0)
                  .map((s) => (
                    <span
                      key={s}
                      className={`rounded-full border bg-surface-elevated px-2.5 py-1 font-semibold ${severityStyles[s].border} ${severityStyles[s].text}`}
                    >
                      {report.counts[s]} {SEVERITY_LABEL[s].toLowerCase()}
                    </span>
                  ))}
              </div>
            </div>
          </div>

          {report.fingerprint.phpVersion ||
          report.fingerprint.cms ||
          report.fingerprint.server ||
          report.fingerprint.nodeHint ? (
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6 text-sm md:grid-cols-4">
              {report.fingerprint.phpVersion ? (
                <div>
                  <dt className="text-xs uppercase tracking-[0.12em] text-muted">PHP</dt>
                  <dd className="mt-1 font-mono text-foreground">{report.fingerprint.phpVersion}</dd>
                </div>
              ) : null}
              {report.fingerprint.cms ? (
                <div>
                  <dt className="text-xs uppercase tracking-[0.12em] text-muted">System</dt>
                  <dd className="mt-1 text-foreground">{report.fingerprint.cms}</dd>
                </div>
              ) : null}
              {report.fingerprint.server ? (
                <div>
                  <dt className="text-xs uppercase tracking-[0.12em] text-muted">Server</dt>
                  <dd className="mt-1 truncate text-foreground">{report.fingerprint.server}</dd>
                </div>
              ) : null}
              {report.fingerprint.nodeHint ? (
                <div>
                  <dt className="text-xs uppercase tracking-[0.12em] text-muted">Node.js</dt>
                  <dd className="mt-1 truncate text-foreground">{report.fingerprint.nodeHint}</dd>
                </div>
              ) : null}
            </dl>
          ) : null}
        </div>

        {problems.length > 0 ? (
          <div>
            <h3 className="mb-4 font-display text-lg font-bold text-foreground">
              {problems.length} Punkt{problems.length === 1 ? "" : "e"} mit Handlungsbedarf
            </h3>
            <div className="space-y-3">
              {problems.map((finding) => (
                <FindingItem key={finding.id} finding={finding} />
              ))}
            </div>
          </div>
        ) : null}

        {positives.length > 0 ? (
          <div>
            <h3 className="mb-4 font-display text-lg font-bold text-foreground">Das ist bereits in Ordnung</h3>
            <div className="space-y-3">
              {positives.map((finding) => (
                <FindingItem key={finding.id} finding={finding} />
              ))}
            </div>
          </div>
        ) : null}

        {report.skipped.length > 0 ? (
          <p className="flex items-start gap-2 text-xs leading-relaxed text-muted">
            <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
            Nicht abschließend prüfbar: {report.skipped.map((s) => s.id).join(", ")} (
            {report.skipped[0].reason}).
          </p>
        ) : null}

        <div className="rounded-2xl border border-accent-secondary/40 bg-surface-elevated p-6 sm:p-8">
          {reportStatus === "sent" ? (
            <div className="flex items-center justify-center gap-2 text-sm text-accent-secondary">
              <Mail className="size-4 shrink-0" aria-hidden />
              Der Bericht ist unterwegs. Falls nichts ankommt, bitte auch den Spam-Ordner prüfen.
            </div>
          ) : (
            <>
              <p className="font-display text-lg font-bold text-foreground">
                Bericht zum Weiterleiten an Ihren Hoster
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Sie erhalten alle Funde mit den konkreten Handlungsschritten per E-Mail – so, dass Ihr
                Hoster oder Ihre Agentur direkt damit arbeiten kann.
              </p>
              <form onSubmit={handleReport} className="mt-5">
                <input
                  type="text"
                  name="hp_confirm"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input type="text" name="name" placeholder="Name (optional)" autoComplete="name" className={inputClass} />
                  <input
                    type="email"
                    name="email"
                    placeholder="E-Mail"
                    required
                    autoComplete="email"
                    className={inputClass}
                  />
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <Button type="submit" disabled={reportStatus === "sending"}>
                    {reportStatus === "sending" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Wird gesendet…
                      </>
                    ) : (
                      "Bericht zusenden"
                    )}
                  </Button>
                  {reportStatus === "error" ? <p className="text-sm text-red-400">{reportError}</p> : null}
                </div>
                <p className="mt-3 text-xs text-muted">
                  Nur für den Versand dieses Berichts. Kein Newsletter, keine Weitergabe. Details in der{" "}
                  <a href="/datenschutz" className="underline hover:text-foreground">
                    Datenschutzerklärung
                  </a>
                  .
                </p>
              </form>
            </>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/kontakt" size="lg">
            Funde gemeinsam abarbeiten
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => {
              setStatus("idle");
              setReport(null);
              setConsent(false);
            }}
          >
            Weitere Domain prüfen
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-8 sm:p-10">
      <form onSubmit={handleScan}>
        <input type="text" name="hp_confirm" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

        <input
          type="text"
          name="domain"
          inputMode="url"
          placeholder="Ihre Domain (z. B. meine-firma.de)"
          required
          disabled={status === "scanning"}
          className={inputClass}
        />

        <label className="mt-4 flex cursor-pointer items-start gap-3 text-sm text-muted">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            disabled={status === "scanning"}
            className="mt-0.5 size-4 shrink-0 rounded border-border-strong bg-surface-elevated accent-accent-secondary"
          />
          <span>Ich betreibe diese Domain oder habe die Erlaubnis, sie prüfen zu lassen.</span>
        </label>

        <div className="mt-6 flex flex-col items-center gap-4">
          <Button type="submit" size="lg" disabled={status === "scanning"} className="w-full sm:w-auto">
            {status === "scanning" ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Wird geprüft…
              </>
            ) : (
              "Website kostenlos prüfen"
            )}
          </Button>
          {status === "error" ? <p className="text-sm text-red-400">{errorMessage}</p> : null}
          <p className="text-center text-xs leading-relaxed text-muted">
            Wir rufen Ihre Startseite und einige Standardpfade ganz normal auf und werten die Antworten
            aus. Es werden keine Schwachstellen ausgenutzt und keine Daten verändert.
          </p>
        </div>
      </form>
    </div>
  );
}
