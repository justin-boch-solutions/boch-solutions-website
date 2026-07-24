"use client";

import { useRef } from "react";
import { Home, Phone, ShieldAlert, Zap } from "lucide-react";
import { BrowserFrame } from "./browser-frame";

const leistungen = [
  { icon: Zap, label: "Elektroinstallation" },
  { icon: Home, label: "Smart Home" },
  { icon: ShieldAlert, label: "24h-Notdienst" },
];

export function OnepagerExample() {
  const leistungenRef = useRef<HTMLDivElement>(null);
  const ueberUnsRef = useRef<HTMLDivElement>(null);
  const kontaktRef = useRef<HTMLDivElement>(null);

  function scrollTo(ref: React.RefObject<HTMLDivElement | null>) {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <BrowserFrame url="elektro-vogt-beispiel.de">
      <nav className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-amber-950 px-6 py-4 text-white">
        <span className="font-bold">Elektro Vogt</span>
        <div className="hidden gap-5 text-sm sm:flex">
          <button onClick={() => scrollTo(leistungenRef)} className="hover:text-amber-300">
            Leistungen
          </button>
          <button onClick={() => scrollTo(ueberUnsRef)} className="hover:text-amber-300">
            Über uns
          </button>
          <button onClick={() => scrollTo(kontaktRef)} className="hover:text-amber-300">
            Kontakt
          </button>
        </div>
      </nav>

      <div className="bg-gradient-to-br from-amber-900 to-amber-700 px-6 py-16 text-white">
        <p className="text-xs font-semibold uppercase tracking-wider text-amber-200">Elektriker in Münster</p>
        <h2 className="mt-3 text-3xl font-bold">Strom, der einfach läuft.</h2>
        <p className="mt-3 max-w-sm text-sm text-amber-100">
          Elektroinstallation, Smart Home und Notdienst – zuverlässig, schnell, aus einer Hand.
        </p>
        <button className="mt-6 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-amber-900">
          Termin anfragen
        </button>
      </div>

      <div ref={leistungenRef} className="bg-white px-6 py-14">
        <h3 className="text-lg font-bold text-neutral-900">Unsere Leistungen</h3>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {leistungen.map((item) => (
            <div key={item.label} className="rounded-xl border border-neutral-200 p-5">
              <item.icon className="size-6 text-amber-600" />
              <p className="mt-3 text-sm font-medium text-neutral-900">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div ref={ueberUnsRef} className="bg-neutral-100 px-6 py-14">
        <h3 className="text-lg font-bold text-neutral-900">Über uns</h3>
        <p className="mt-3 max-w-md text-sm text-neutral-600">
          Familienbetrieb seit 1998, drei feste Monteure, immer erreichbar für Notfälle in Münster und Umgebung.
        </p>
      </div>

      <div ref={kontaktRef} className="flex flex-col items-start gap-3 bg-neutral-900 px-6 py-10 text-white">
        <p className="flex items-center gap-2 text-sm">
          <Phone className="size-4" /> 0251 000000
        </p>
        <p className="text-xs text-neutral-400">Elektro Vogt · Musterweg 12 · 48157 Münster (Beispiel)</p>
      </div>
    </BrowserFrame>
  );
}
