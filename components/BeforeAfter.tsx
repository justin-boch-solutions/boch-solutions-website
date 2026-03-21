"use client";
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type Props = {
  beforeSrc: string;
  afterSrc: string;
  alt?: string;
  className?: string;
};

export default function BeforeAfter({ beforeSrc, afterSrc, alt = '', className = '' }: Props) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);

  const clamp = (v: number) => Math.max(0, Math.min(100, v));

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const percent = clamp(((e.clientX - rect.left) / rect.width) * 100);
      setPos(Number(percent.toFixed(2)));
    };

    const onPointerUp = () => {
      draggingRef.current = false;
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  const startDrag = (e: React.PointerEvent) => {
    draggingRef.current = true;
    (e.target as Element).setPointerCapture(e.pointerId);
  };

  const onHandleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setPos((p) => clamp(p - 2));
    if (e.key === 'ArrowRight') setPos((p) => clamp(p + 2));
    if (e.key === 'Home') setPos(0);
    if (e.key === 'End') setPos(100);
    if (e.key === 'PageUp') setPos((p) => clamp(p + 10));
    if (e.key === 'PageDown') setPos((p) => clamp(p - 10));
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div ref={containerRef} className="relative w-full overflow-hidden rounded-2xl">
        <Image
          src={afterSrc}
          alt={alt}
          width={1200}
          height={675}
          className="w-full h-full object-cover block"
        />

        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <Image
            src={beforeSrc}
            alt={alt}
            width={1200}
            height={675}
            className="w-full h-full object-cover block"
          />
        </div>

        <div
          className="absolute top-0 bottom-0 w-[1px] bg-white/50 shadow-md pointer-events-none transition-all"
          style={{ left: `${pos}%`, transform: 'translateX(-0.5px)' }}
        />

        <div
            role="slider"
            tabIndex={0}
            aria-label="Vorher/Nachher Schieber"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pos)}
            aria-valuetext={`${Math.round(pos)}% Vorher sichtbar`}
            onKeyDown={onHandleKey}
            onPointerDown={startDrag}
            style={{ left: `${pos}%` }}
            className="absolute -translate-x-5 -translate-y-5 top-1"
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="rounded-full bg-white/95 p-1 shadow border border-slate-700">
              <path d="M8 6L4 12L8 18" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 6L20 12L16 18" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
      </div>

      <input
        aria-label="Vorher Nachher"
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="w-full mt-3 accent-sky-500"
      />
    </div>
  );
}
