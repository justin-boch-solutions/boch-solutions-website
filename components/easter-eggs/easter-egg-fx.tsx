"use client";

import { useEffect, useState } from "react";
import { PartyPopper } from "lucide-react";
import { fireConfetti } from "@/lib/confetti";

export const EASTER_EGG_EVENT = "jb:easter-egg";

export function EasterEggFx() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    function handle(event: Event) {
      const detail = (event as CustomEvent<string>).detail;
      fireConfetti();
      setMessage(detail || "Gefunden!");
      window.setTimeout(() => setMessage(null), 3200);
    }

    window.addEventListener(EASTER_EGG_EVENT, handle);
    return () => window.removeEventListener(EASTER_EGG_EVENT, handle);
  }, []);

  if (!message) return null;

  return (
    <div
      className="animate-toast-in fixed left-1/2 top-6 z-[9999] flex -translate-x-1/2 items-center gap-2 rounded-full border border-border-strong bg-surface-elevated px-4 py-2.5 text-sm font-medium text-foreground shadow-2xl shadow-black/40"
      role="status"
    >
      <PartyPopper className="size-4 text-accent-secondary" />
      {message}
    </div>
  );
}

export function triggerEasterEgg(message: string) {
  window.dispatchEvent(new CustomEvent(EASTER_EGG_EVENT, { detail: message }));
}
