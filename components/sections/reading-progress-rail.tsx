"use client";

import { useEffect, useRef } from "react";

interface ReadingProgressRailProps {
  children: React.ReactNode;
  className?: string;
}

export function ReadingProgressRail({ children, className }: ReadingProgressRailProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    const fill = fillRef.current;
    if (!content || !fill) return;

    let raf = 0;

    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (!content || !fill) return;
        const rect = content.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : rect.top < 0 ? 1 : 0;
        fill.style.transform = `scaleY(${progress})`;
      });
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        aria-hidden
        className="fixed right-6 top-1/2 z-30 hidden h-48 w-1 -translate-y-1/2 overflow-hidden rounded-full bg-surface-elevated lg:block"
      >
        <div
          ref={fillRef}
          className="w-full origin-top scale-y-0 rounded-full bg-gradient-to-b from-accent to-accent-secondary transition-transform duration-150 ease-out"
          style={{ height: "100%" }}
        />
      </div>
      <div ref={contentRef} className={className}>
        {children}
      </div>
    </>
  );
}
