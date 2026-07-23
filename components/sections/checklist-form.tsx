"use client";

import { useState, type FormEvent } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

type Status = "idle" | "submitting" | "success" | "error";

export function ChecklistForm() {
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [downloadUrl, setDownloadUrl] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent || status === "submitting") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/checkliste", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || "Anfrage fehlgeschlagen.");
      }

      setDownloadUrl(data.downloadUrl || "/downloads/it-sicherheits-checkliste.pdf");
      setStatus("success");
      form.reset();
      setConsent(false);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Anfrage fehlgeschlagen.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <Download className="mx-auto size-8 text-accent-secondary" />
        <h3 className="mt-4 font-display text-xl font-semibold text-foreground">Fast geschafft!</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Wir haben Ihnen die Checkliste zusätzlich per E-Mail zugeschickt. Sie können sie aber auch
          direkt hier herunterladen.
        </p>
        <a
          href={downloadUrl}
          download
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-secondary px-6 py-3 text-sm font-medium text-white transition-all hover:brightness-110"
        >
          <Download className="size-4" />
          Checkliste jetzt herunterladen
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-surface p-8">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground" htmlFor="name">
            Name <span className="text-accent-secondary">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full rounded-lg border border-border-strong bg-surface-elevated px-4 py-3 text-sm text-foreground placeholder:text-muted focus-visible:border-accent-secondary"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground" htmlFor="email">
            E-Mail <span className="text-accent-secondary">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-lg border border-border-strong bg-surface-elevated px-4 py-3 text-sm text-foreground placeholder:text-muted focus-visible:border-accent-secondary"
          />
        </div>

        <label className="flex items-start gap-3 text-sm text-muted">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            className="mt-1 size-4 shrink-0 rounded border-border-strong bg-surface-elevated accent-accent"
          />
          Ich stimme zu, dass meine Angaben zum Versand der Checkliste genutzt werden. Details in der{" "}
          <a href="/datenschutz" className="underline hover:text-foreground">
            Datenschutzerklärung
          </a>
          .
        </label>

        <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
          {status === "submitting" ? "Wird vorbereitet…" : "Checkliste kostenlos anfordern"}
        </Button>
        {status === "error" ? (
          <p className="text-sm text-red-400">
            {errorMessage || "Anfrage fehlgeschlagen."} Sie erreichen uns alternativ telefonisch oder per
            E-Mail.
          </p>
        ) : null}
      </div>
    </form>
  );
}
