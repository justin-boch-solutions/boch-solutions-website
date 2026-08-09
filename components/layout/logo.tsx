"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { triggerEasterEgg } from "@/components/easter-eggs/easter-egg-fx";

const CLICKS_REQUIRED = 5;
const CLICK_WINDOW_MS = 2000;

export function Logo({
  className,
  size = "default",
}: {
  className?: string;
  size?: "default" | "large";
}) {
  const [isSpinning, setIsSpinning] = useState(false);
  const clickCount = useRef(0);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleClick() {
    clickCount.current += 1;

    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => {
      clickCount.current = 0;
    }, CLICK_WINDOW_MS);

    if (clickCount.current >= CLICKS_REQUIRED) {
      clickCount.current = 0;
      setIsSpinning(true);
      triggerEasterEgg("Fleißiges Klicken – genau die Energie, die wir mögen!");
      setTimeout(() => setIsSpinning(false), 600);
    }
  }

  return (
    <Link
      href="/"
      onClick={handleClick}
      className={cn("inline-flex items-center transition-transform duration-200 hover:scale-[1.03]", className)}
      aria-label="JB Solutions – Startseite"
    >
      <Image
        src="/images/logo.svg"
        alt="Justin Boch Solutions"
        width={430}
        height={200}
        priority
        unoptimized
        className={cn(
          "w-auto",
          size === "large" ? "h-16 sm:h-20" : "h-12 sm:h-14",
          isSpinning && "animate-spin-once",
        )}
      />
    </Link>
  );
}
