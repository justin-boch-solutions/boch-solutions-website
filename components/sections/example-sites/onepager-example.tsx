"use client";

import { useRef, useState, type FormEvent } from "react";
import { ChevronDown, Send, Star } from "lucide-react";
import { BrowserFrame } from "./browser-frame";

const stats = [
  { value: "25+", label: "Jahre Erfahrung" },
  { value: "24h", label: "Notdienst" },
  { value: "500+", label: "Projekte" },
];

const leistungen = [
  { label: "Elektroinstallation", detail: "Neubau, Altbau, Zählerschrank" },
  { label: "Smart Home", detail: "Beleuchtung, Heizung, Steuerung per App" },
  { label: "24h-Notdienst", detail: "Störungen, Ausfälle, akute Gefahr" },
];

const bewertungen = [
  { name: "Familie K.", quote: "Innerhalb einer Stunde da, sauber gearbeitet." },
  { name: "Praxis Dr. M.", quote: "Termin gehalten, fair abgerechnet." },
];

const faq = [
  {
    question: "Wie schnell sind Sie bei einem Notfall vor Ort?",
    answer: "Im Stadtgebiet Münster in der Regel innerhalb von 60 Minuten, rund um die Uhr.",
  },
  {
    question: "Übernehmen Sie auch kleinere Aufträge?",
    answer: "Ja, von der einzelnen Steckdose bis zur kompletten Hausinstallation.",
  },
  {
    question: "Bieten Sie Festpreise an?",
    answer: "Bei klar umrissenen Aufträgen ja – nach kurzer Vor-Ort-Einschätzung.",
  },
];

export function OnepagerExample() {
  const leistungenRef = useRef<HTMLDivElement>(null);
  const kontaktRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);

  function scrollTo(ref: React.RefObject<HTMLDivElement | null>) {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <BrowserFrame url="elektro-vogt-beispiel.de" height="560px">
      <div className="flex items-center justify-between bg-neutral-950 px-6 py-4 text-white">
        <span className="text-sm font-bold tracking-[0.15em]">VOGT</span>
        <button
          onClick={() => scrollTo(kontaktRef)}
          className="rounded-full bg-amber-500 px-4 py-1.5 text-xs font-semibold text-neutral-950"
        >
          Termin anfragen
        </button>
      </div>

      <div className="relative overflow-hidden bg-neutral-950 px-6 pb-14 pt-8 text-white">
        <div className="pointer-events-none absolute -right-12 -top-16 size-64 rounded-full bg-amber-500/20 blur-3xl" />
        <p className="relative text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
          Elektriker · Münster
        </p>
        <h2 className="relative mt-4 text-[2.75rem] font-black leading-[0.95] tracking-tight">
          Strom,
          <br />
          der
          <br />
          <span className="text-amber-400">läuft.</span>
        </h2>
      </div>

      <div className="grid grid-cols-3 divide-x divide-neutral-200 border-b border-neutral-200 bg-white">
        {stats.map((stat) => (
          <div key={stat.label} className="px-2 py-6 text-center">
            <p className="font-[family-name:var(--font-space-mono)] text-2xl font-bold text-neutral-900">
              {stat.value}
            </p>
            <p className="mt-1 text-[11px] text-neutral-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div ref={leistungenRef} className="bg-white px-6 py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">Leistungen</p>
        <div className="mt-5 divide-y divide-neutral-100">
          {leistungen.map((item, index) => (
            <div key={item.label} className="flex items-baseline gap-4 py-4">
              <span className="font-[family-name:var(--font-space-mono)] text-sm text-neutral-300">
                0{index + 1}
              </span>
              <div>
                <p className="text-base font-semibold text-neutral-900">{item.label}</p>
                <p className="mt-0.5 text-xs text-neutral-500">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-neutral-100 px-6 py-14">
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-sm font-semibold text-neutral-900">4.9 · 42 Bewertungen</p>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {bewertungen.map((item) => (
            <div key={item.name} className="rounded-lg border border-neutral-200 bg-white p-4">
              <p className="text-sm italic text-neutral-600">„{item.quote}“</p>
              <p className="mt-2 text-xs text-neutral-400">{item.name}, Beispiel-Bewertung</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white px-6 py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">Fragen</p>
        <div className="mt-5 divide-y divide-neutral-200 rounded-xl border border-neutral-200">
          {faq.map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <div key={item.question}>
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium text-neutral-900"
                >
                  {item.question}
                  <ChevronDown className={`size-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen ? <p className="px-4 pb-3 text-sm text-neutral-600">{item.answer}</p> : null}
              </div>
            );
          })}
        </div>
      </div>

      <div ref={kontaktRef} className="bg-neutral-950 px-6 py-14 text-white">
        <p className="text-xl font-bold">Rufen Sie an, wir sind in 60 Minuten da.</p>
        <p className="mt-1 text-sm text-neutral-400">0251 000000 · Musterweg 12, 48157 Münster (Beispiel)</p>

        {sent ? (
          <p className="mt-6 rounded-lg bg-emerald-500/15 px-4 py-3 text-sm text-emerald-300">
            Danke! Ihre Nachricht ist angekommen (Beispiel-Formular, es wurde nichts versendet).
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Ihr Name"
              required
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm placeholder:text-neutral-500 sm:w-1/3"
            />
            <input
              type="text"
              placeholder="Kurz Ihr Anliegen"
              required
              className="w-full flex-1 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm placeholder:text-neutral-500"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-neutral-950"
            >
              <Send className="size-4" />
              Senden
            </button>
          </form>
        )}
      </div>
    </BrowserFrame>
  );
}
