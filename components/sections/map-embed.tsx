"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { addressLine, company } from "@/lib/constants";

export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        title={`Anfahrt zu ${company.name}`}
        src={`https://www.google.com/maps?q=${encodeURIComponent(addressLine)}&z=15&output=embed`}
        className="h-full min-h-[280px] w-full rounded-2xl border border-border"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-surface p-8 text-center">
      <MapPin className="size-8 text-accent-secondary" />
      <div>
        <p className="font-medium text-foreground">Unser Standort in Münster</p>
        <p className="mt-1 text-sm text-muted">
          Beim Laden der Karte wird eine Verbindung zu Google Maps aufgebaut und es können Cookies von
          Google gesetzt werden.
        </p>
      </div>
      <button
        type="button"
        onClick={() => setLoaded(true)}
        className="inline-flex items-center justify-center rounded-full border border-border-strong bg-surface-elevated px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent-secondary/60"
      >
        Karte laden
      </button>
    </div>
  );
}
