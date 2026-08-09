"use client";

import { useEffect, useRef } from "react";
import { triggerEasterEgg } from "@/components/easter-eggs/easter-egg-fx";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function KonamiCode() {
  const progress = useRef(0);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const expected = SEQUENCE[progress.current];
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;

      if (key === expected) {
        progress.current += 1;
        if (progress.current === SEQUENCE.length) {
          triggerEasterEgg("Konami-Code aktiviert – Sie hätten wohl auch unseren IT-Check bestanden!");
          progress.current = 0;
        }
      } else {
        progress.current = key === SEQUENCE[0] ? 1 : 0;
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return null;
}
