"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/cn";
import { consentStore } from "@/lib/consent-store";

export const OPEN_SETTINGS_EVENT = "jb-open-cookie-settings";

export function CookieBanner() {
  const state = useSyncExternalStore(
    consentStore.subscribe,
    consentStore.getSnapshot,
    consentStore.getServerSnapshot,
  );
  const [forceOpen, setForceOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [statistics, setStatistics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [lastState, setLastState] = useState(state);

  if (state !== lastState) {
    setLastState(state);
    if (state.hasChosen) {
      setStatistics(state.statistics);
      setMarketing(state.marketing);
    }
  }

  useEffect(() => {
    function handleOpen() {
      setForceOpen(true);
      setShowDetails(true);
    }
    window.addEventListener(OPEN_SETTINGS_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, handleOpen);
  }, []);

  const isVisible = !state.hasChosen || forceOpen;
  if (!isVisible) return null;

  function saveSelection() {
    consentStore.set({ necessary: true, statistics, marketing });
    setForceOpen(false);
    setShowDetails(false);
  }

  function acceptAll() {
    consentStore.acceptAll();
    setForceOpen(false);
    setShowDetails(false);
  }

  function rejectAll() {
    consentStore.rejectAll();
    setForceOpen(false);
    setShowDetails(false);
  }

  return (
    <div
      data-theme="dark"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-border bg-background/95 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-4 px-6 py-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-accent-secondary" />
          <div>
            <p className="font-display text-sm font-semibold text-foreground">
              Wir respektieren Ihre Privatsphäre
            </p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Notwendige Cookies sind für den Betrieb der Seite erforderlich. Mit Ihrer Einwilligung
              nutzen wir zusätzlich Google Analytics und Google Ads, um die Seite zu verbessern und
              Werbung auszuwerten. Details finden Sie in unserer{" "}
              <a href="/datenschutz" className="underline hover:text-foreground">
                Datenschutzerklärung
              </a>
              .
            </p>
          </div>
        </div>

        {showDetails ? (
          <div className="grid grid-cols-1 gap-3 rounded-xl border border-border bg-surface p-4 sm:grid-cols-3">
            <label className="flex items-start gap-3 text-sm">
              <input type="checkbox" checked disabled className="mt-1 size-4 accent-accent" />
              <span>
                <span className="block font-medium text-foreground">Notwendig</span>
                <span className="text-xs text-muted">Immer aktiv, z. B. Theme-Einstellung.</span>
              </span>
            </label>
            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={statistics}
                onChange={(e) => setStatistics(e.target.checked)}
                className="mt-1 size-4 accent-accent"
              />
              <span>
                <span className="block font-medium text-foreground">Statistik</span>
                <span className="text-xs text-muted">Google Analytics.</span>
              </span>
            </label>
            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="mt-1 size-4 accent-accent"
              />
              <span>
                <span className="block font-medium text-foreground">Marketing</span>
                <span className="text-xs text-muted">Google Ads Conversion-Tracking.</span>
              </span>
            </label>
          </div>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <button
            onClick={acceptAll}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-accent to-accent-secondary px-5 py-2.5 text-sm font-medium text-white transition-all hover:brightness-110"
          >
            Alle akzeptieren
          </button>
          <button
            onClick={rejectAll}
            className="inline-flex items-center justify-center rounded-full border border-border-strong bg-surface-elevated px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent-secondary/60"
          >
            Nur notwendige
          </button>
          {showDetails ? (
            <button
              onClick={saveSelection}
              className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              Auswahl speichern
            </button>
          ) : (
            <button
              onClick={() => setShowDetails(true)}
              className={cn(
                "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-foreground underline-offset-4 hover:underline",
              )}
            >
              Einstellungen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
