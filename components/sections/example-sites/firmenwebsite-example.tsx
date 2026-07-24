"use client";

import { useRef } from "react";
import { Award, Hammer, Home, Users } from "lucide-react";
import { BrowserFrame } from "./browser-frame";

const leistungen = [
  { icon: Home, label: "Steildach & Flachdach" },
  { icon: Hammer, label: "Sanierung & Reparatur" },
  { icon: Award, label: "Dämmung & Energieeffizienz" },
  { icon: Users, label: "Gewerbe & Großprojekte" },
];

export function FirmenwebsiteExample() {
  const leistungenRef = useRef<HTMLDivElement>(null);
  const referenzenRef = useRef<HTMLDivElement>(null);
  const karriereRef = useRef<HTMLDivElement>(null);
  const kontaktRef = useRef<HTMLDivElement>(null);

  function scrollTo(ref: React.RefObject<HTMLDivElement | null>) {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <BrowserFrame url="dachdecker-nowak-beispiel.de">
      <nav className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-slate-900 px-6 py-4 text-white">
        <span className="font-bold">Nowak Dach GmbH</span>
        <div className="hidden gap-5 text-sm sm:flex">
          <button onClick={() => scrollTo(leistungenRef)} className="hover:text-sky-300">
            Leistungen
          </button>
          <button onClick={() => scrollTo(referenzenRef)} className="hover:text-sky-300">
            Referenzen
          </button>
          <button onClick={() => scrollTo(karriereRef)} className="hover:text-sky-300">
            Karriere
          </button>
          <button onClick={() => scrollTo(kontaktRef)} className="hover:text-sky-300">
            Kontakt
          </button>
        </div>
      </nav>

      <div className="bg-gradient-to-br from-slate-800 to-slate-600 px-6 py-16 text-white">
        <p className="text-xs font-semibold uppercase tracking-wider text-sky-300">Dachdeckerbetrieb seit 1987</p>
        <h2 className="mt-3 text-3xl font-bold">Ihr Dach in besten Händen.</h2>
        <p className="mt-3 max-w-sm text-sm text-slate-200">
          Steildach, Flachdach, Sanierung und Notfall-Reparaturen – für Privat und Gewerbe.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="rounded-full bg-sky-400 px-5 py-2.5 text-sm font-semibold text-slate-900">
            Angebot anfordern
          </button>
          <button className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white">
            Referenzen ansehen
          </button>
        </div>
      </div>

      <div ref={leistungenRef} className="bg-white px-6 py-14">
        <h3 className="text-lg font-bold text-neutral-900">Leistungen</h3>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {leistungen.map((item) => (
            <div key={item.label} className="flex items-center gap-3 rounded-xl border border-neutral-200 p-4">
              <item.icon className="size-5 shrink-0 text-sky-600" />
              <p className="text-sm font-medium text-neutral-900">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div ref={referenzenRef} className="bg-neutral-100 px-6 py-14">
        <h3 className="text-lg font-bold text-neutral-900">Was Kunden sagen</h3>
        <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-5">
          <p className="text-sm italic text-neutral-600">„Schnell, sauber, termintreu – genau wie versprochen.“</p>
          <p className="mt-2 text-xs text-neutral-400">Beispiel-Bewertung, kein echtes Zitat</p>
        </div>
      </div>

      <div ref={karriereRef} className="bg-white px-6 py-14">
        <div className="rounded-xl bg-sky-50 p-6">
          <h3 className="text-lg font-bold text-neutral-900">Wir stellen ein!</h3>
          <p className="mt-2 text-sm text-neutral-600">Dachdecker (m/w/d) und Auszubildende gesucht.</p>
          <button className="mt-4 rounded-full bg-slate-900 px-5 py-2 text-xs font-semibold text-white">
            Offene Stellen
          </button>
        </div>
      </div>

      <div ref={kontaktRef} className="flex flex-col items-start gap-2 bg-slate-900 px-6 py-10 text-white">
        <p className="text-sm">0251 000000 · info@nowak-dach-beispiel.de</p>
        <p className="text-xs text-slate-400">Nowak Dach GmbH · Beispieladresse, Münster</p>
      </div>
    </BrowserFrame>
  );
}
