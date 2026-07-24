"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

interface TypewriterSegment {
  text: string;
  className?: string;
}

interface TypewriterProps {
  segments: TypewriterSegment[];
  speed?: number;
  startDelay?: number;
  className?: string;
}

export function Typewriter({ segments, speed = 35, startDelay = 300, className }: TypewriterProps) {
  const fullText = segments.map((segment) => segment.text).join("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const increment = prefersReduced ? fullText.length : 1;
    const interval = prefersReduced ? 0 : speed;

    let i = 0;
    let timeout: ReturnType<typeof setTimeout>;

    function step() {
      i = Math.min(i + increment, fullText.length);
      setCount(i);
      if (i < fullText.length) {
        timeout = setTimeout(step, interval);
      }
    }

    timeout = setTimeout(step, prefersReduced ? 0 : startDelay);
    return () => clearTimeout(timeout);
  }, [fullText, speed, startDelay]);

  const { nodes } = segments.reduce<{ nodes: React.ReactNode[]; remaining: number }>(
    (acc, segment, index) => {
      const take = Math.max(0, Math.min(segment.text.length, acc.remaining));
      return {
        nodes: [
          ...acc.nodes,
          <span key={index} className={segment.className}>
            {segment.text.slice(0, take)}
          </span>,
        ],
        remaining: acc.remaining - take,
      };
    },
    { nodes: [], remaining: count },
  );

  const lastNode = nodes[nodes.length - 1];
  const leadingNodes = nodes.slice(0, -1);

  return (
    <span className={className} aria-label={fullText}>
      <span aria-hidden="true">
        {leadingNodes}
        <span className="whitespace-nowrap">
          {lastNode}
          <span
            className={cn(
              "ml-1 inline-block h-[0.85em] w-[3px] translate-y-[0.1em] animate-soft-pulse bg-accent-secondary align-middle",
            )}
          />
        </span>
      </span>
    </span>
  );
}
