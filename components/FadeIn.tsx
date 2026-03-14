"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  threshold?: number;
  rootMargin?: string;
  durationMs?: number;
  distance?: number;
  disable?: boolean;
};

function getInitialTransform(
  direction: FadeInProps["direction"],
  distance: number
) {
  switch (direction) {
    case "up":
      return `translate3d(0, ${distance}px, 0)`;
    case "down":
      return `translate3d(0, -${distance}px, 0)`;
    case "left":
      return `translate3d(${distance}px, 0, 0)`;
    case "right":
      return `translate3d(-${distance}px, 0, 0)`;
    case "none":
    default:
      return "translate3d(0, 0, 0)";
  }
}

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
  threshold = 0.12,
  rootMargin = "0px 0px -80px 0px",
  durationMs = 650,
  distance = 18,
  disable = false,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => setReduceMotion(media.matches);
    update();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  useEffect(() => {
    if (disable || reduceMotion) {
      setVisible(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [disable, reduceMotion, threshold, rootMargin]);

  const isShown = visible || disable || reduceMotion;
  const easing = "cubic-bezier(0.21, 0.47, 0.32, 0.98)";
  const initialTransform = getInitialTransform(direction, distance);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isShown ? 1 : 0,
        transform: isShown ? "translate3d(0, 0, 0)" : initialTransform,
        transition:
          disable || reduceMotion
            ? "none"
            : `opacity ${durationMs}ms ${easing} ${delay}s, transform ${durationMs}ms ${easing} ${delay}s`,
        willChange: isShown ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
