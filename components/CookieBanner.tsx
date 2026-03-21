"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type CookiePreferences = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "cookie-consent";

const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

function parseStoredConsent(value: string | null): CookiePreferences | null {
  if (!value) return null;

  try {
    const parsed = JSON.parse(value);

    return {
      essential: true,
      analytics: !!parsed?.analytics,
      marketing: !!parsed?.marketing,
    };
  } catch {
    return null;
  }
}

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [hasDecided, setHasDecided] = useState(false);
  const [preferences, setPreferences] =
    useState<CookiePreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    setMounted(true);

    let timer: ReturnType<typeof setTimeout> | null = null;

    const stored = parseStoredConsent(localStorage.getItem(STORAGE_KEY));

    if (stored) {
      setPreferences(stored);
      setHasDecided(true);
    } else {
      timer = setTimeout(() => {
        setIsVisible(true);
      }, 800);
    }

    const handleOpenSettings = () => {
      setIsVisible(true);
      setShowDetails(true);
    };

    window.addEventListener("open-cookie-settings", handleOpenSettings);

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("open-cookie-settings", handleOpenSettings);
    };
  }, []);

  function saveConsent(nextPreferences: CookiePreferences) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPreferences));
    setPreferences(nextPreferences);
    setIsVisible(false);
    setShowDetails(false);
    setHasDecided(true);
    window.dispatchEvent(new Event("cookie-consent-updated"));
  }

  function acceptAll() {
    saveConsent({
      essential: true,
      analytics: true,
      marketing: true,
    });
  }

  function acceptEssential() {
    saveConsent({
      essential: true,
      analytics: false,
      marketing: false,
    });
  }

  function saveCustom() {
    saveConsent(preferences);
  }

  function togglePreference(key: "analytics" | "marketing") {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  if (!mounted) return null;

  if (!isVisible) {
    return hasDecided ? (
      <button
        onClick={() => {
          setIsVisible(true);
          setShowDetails(true);
        }}
        className="fixed bottom-6 left-6 z-40 bg-slate-900 border border-slate-700 text-slate-200 p-3 rounded-full shadow-lg hover:bg-slate-800 hover:text-sky-300 transition-all duration-300"
        aria-label="Cookie-Einstellungen"
        type="button"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </button>
    ) : null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-500 to-rose-400" />

        <div className="p-6 md:p-8 overflow-y-auto">
          <h3 className="text-xl font-bold text-slate-50 mb-3 flex items-center gap-2">
            Privatsphäre-Einstellungen <span className="text-2xl">🍪</span>
          </h3>

          <p className="text-sm text-slate-300 mb-6 leading-relaxed">
            Ich nutze Cookies, um dir ein sauberes Nutzungserlebnis zu bieten.
            Einige sind technisch notwendig, andere helfen bei Statistik und
            Optimierung. Deine Wahl kannst du jederzeit im{" "}
            <Link
              href="/datenschutz"
              className="text-sky-300 hover:text-sky-200 underline decoration-sky-500/40 underline-offset-2"
            >
              Datenschutz
            </Link>{" "}
            anpassen.
          </p>

          {showDetails && (
            <div className="space-y-4 mb-8 border-t border-slate-800 pt-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h4 className="text-slate-100 font-bold text-sm">Notwendig</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Erforderlich für die Grundfunktionen der Website.
                  </p>
                </div>
                <div
                  className="relative inline-flex h-6 w-11 items-center rounded-full bg-sky-500 opacity-60 cursor-not-allowed"
                  aria-hidden="true"
                >
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                </div>
              </div>

              <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-800/70">
                <div className="pr-4">
                  <h4 className="text-slate-100 font-bold text-sm">
                    Statistiken
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Hilft zu verstehen, wie Besucher die Seite nutzen.
                  </p>
                </div>
                <button
                  onClick={() => togglePreference("analytics")}
                  type="button"
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                    preferences.analytics ? "bg-sky-500" : "bg-slate-700"
                  }`}
                  aria-pressed={preferences.analytics}
                  aria-label="Statistik-Cookies umschalten"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.analytics ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-800/70">
                <div className="pr-4">
                  <h4 className="text-slate-100 font-bold text-sm">Marketing</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Für spätere Werbe- oder Remarketing-Funktionen.
                  </p>
                </div>
                <button
                  onClick={() => togglePreference("marketing")}
                  type="button"
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                    preferences.marketing ? "bg-sky-500" : "bg-slate-700"
                  }`}
                  aria-pressed={preferences.marketing}
                  aria-label="Marketing-Cookies umschalten"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.marketing ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-2">
            <button
              onClick={acceptAll}
              type="button"
              className="w-full sm:w-auto flex-1 bg-sky-500 text-slate-950 font-bold py-3 px-4 rounded-lg hover:bg-sky-400 transition-colors text-sm shadow-[0_0_15px_rgba(14,165,233,0.3)] order-1 sm:order-3"
            >
              Alle akzeptieren
            </button>

            {showDetails ? (
              <button
                onClick={saveCustom}
                type="button"
                className="w-full sm:w-auto flex-1 bg-slate-800 text-slate-100 font-medium py-3 px-4 rounded-lg hover:bg-slate-700 transition-colors text-sm order-2"
              >
                Auswahl speichern
              </button>
            ) : (
              <button
                onClick={() => setShowDetails(true)}
                type="button"
                className="w-full sm:w-auto flex-1 bg-slate-800 text-slate-100 font-medium py-3 px-4 rounded-lg hover:bg-slate-700 transition-colors text-sm order-2"
              >
                Einstellungen
              </button>
            )}

            {!showDetails && (
              <button
                onClick={acceptEssential}
                type="button"
                className="w-full sm:w-auto flex-1 bg-slate-950 border border-slate-700 text-slate-200 font-medium py-3 px-4 rounded-lg hover:text-white hover:bg-slate-900 transition-colors text-sm order-3 sm:order-1"
              >
                Nur notwendige
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
