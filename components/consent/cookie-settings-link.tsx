"use client";

import { OPEN_SETTINGS_EVENT } from "@/components/consent/cookie-banner";

export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}
      className={className}
    >
      Cookie-Einstellungen
    </button>
  );
}
