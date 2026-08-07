"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/ui/count-up";

interface Scores {
  performance: number;
  seo: number;
  accessibility: number;
  bestPractices: number;
}

interface Metrics {
  lcp: string | null;
  cls: string | null;
  tbt: string | null;
  fcp: string | null;
}

interface Recommendation {
  name: string;
  url: string;
}

interface CheckResult {
  scores: Scores;
  metrics: Metrics;
  hostname: string;
  recommendations: Recommendation[];
}

type Status = "idle" | "submitting" | "success" | "error";

const scoreLabels: { key: keyof Scores; label: string }[] = [
  { key: "performance", label: "Performance" },
  { key: "seo", label: "SEO" },
  { key: "accessibility", label: "Barrierefreiheit" },
  { key: "bestPractices", label: "Best Practices" },
];

function scoreColorClass(score: number): string {
  if (score >= 90) return "text-green-400 border-green-400/40";
  if (score >= 50) return "text-yellow-400 border-yellow-400/40";
  return "text-red-400 border-red-400/40";
}

export function WebsiteCheckForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/website-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || "Prüfung fehlgeschlagen.");
      }

      setResult(data);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Prüfung fehlgeschlagen.");
    }
  }

  if (status === "success" && result) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-secondary">Ihr Ergebnis</p>
        <h3 className="mt-3 font-display text-2xl font-bold text-foreground">{result.hostname}</h3>

        <div className="mx-auto mt-8 grid max-w-lg grid-cols-2 gap-6 sm:grid-cols-4">
          {scoreLabels.map(({ key, label }) => (
            <div key={key} className="flex flex-col items-center gap-2">
              <div
                className={`flex size-16 items-center justify-center rounded-full border-2 font-display text-xl font-bold ${scoreColorClass(result.scores[key])}`}
              >
                <CountUp value={result.scores[key]} />
              </div>
              <p className="text-xs text-muted">{label}</p>
            </div>
          ))}
        </div>

        {result.recommendations.length > 0 ? (
          <div className="mx-auto mt-10 grid max-w-xl grid-cols-1 gap-4 text-left sm:grid-cols-2">
            {result.recommendations.map((rec) => (
              <Link
                key={rec.url}
                href={rec.url}
                className="group rounded-xl border border-border bg-surface-elevated p-5 transition-colors hover:border-accent-secondary/40"
              >
                <p className="font-medium text-foreground">{rec.name}</p>
                <p className="mt-1 text-sm text-muted">Details ansehen</p>
              </Link>
            ))}
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
          <Button href="/kontakt" size="lg">
            Kostenlosen Strategie-Call vereinbaren
          </Button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 rounded-xl border border-border-strong bg-surface-elevated p-4 text-sm text-accent-secondary">
          <Mail className="size-4 shrink-0" />
          Das Ergebnis haben wir Ihnen zusätzlich per E-Mail geschickt.
        </div>
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
            name="website"
            placeholder="Ihre Website-Adresse (z. B. meine-firma.de)"
            required
            disabled={status === "submitting"}
            className="w-full rounded-lg border border-border-strong bg-surface-elevated px-4 py-3 text-sm text-foreground placeholder:text-muted focus-visible:border-accent-secondary disabled:opacity-60"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              autoComplete="name"
              disabled={status === "submitting"}
              className="w-full rounded-lg border border-border-strong bg-surface-elevated px-4 py-3 text-sm text-foreground placeholder:text-muted focus-visible:border-accent-secondary disabled:opacity-60"
            />
            <input
              type="email"
              name="email"
              placeholder="E-Mail"
              required
              autoComplete="email"
              disabled={status === "submitting"}
              className="w-full rounded-lg border border-border-strong bg-surface-elevated px-4 py-3 text-sm text-foreground placeholder:text-muted focus-visible:border-accent-secondary disabled:opacity-60"
            />
          </div>
          <input
            type="text"
            name="firma"
            placeholder="Firma (optional)"
            autoComplete="organization"
            disabled={status === "submitting"}
            className="w-full rounded-lg border border-border-strong bg-surface-elevated px-4 py-3 text-sm text-foreground placeholder:text-muted focus-visible:border-accent-secondary disabled:opacity-60"
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
              "Jetzt kostenlos prüfen"
            )}
          </Button>
          {status === "submitting" ? (
            <p className="text-center text-sm text-muted">Das kann bis zu 30 Sekunden dauern.</p>
          ) : null}
          {status === "error" ? <p className="text-sm text-red-400">{errorMessage}</p> : null}
          <p className="text-center text-xs text-muted">
            Details in der{" "}
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
