"use client";

import { useRef, useState, type FormEvent } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Menu, Send, Star, X } from "lucide-react";
import { BrowserFrame } from "./browser-frame";

const leistungen = [
  { label: "Steildach & Flachdach", detail: "Neueindeckung, Umbau, Erweiterung" },
  { label: "Sanierung & Reparatur", detail: "Sturmschäden, Undichtigkeiten, Wartung" },
  { label: "Dämmung & Energieeffizienz", detail: "Aufsparren-, Zwischensparrendämmung" },
  { label: "Gewerbe & Großprojekte", detail: "Industriehallen, Mehrfamilienhäuser" },
];

const referenzen = [
  { title: "Einfamilienhaus, Steildach", tag: "Neueindeckung" },
  { title: "Mehrfamilienhaus, Flachdach", tag: "Sanierung" },
  { title: "Lagerhalle, Gewerbe", tag: "Großprojekt" },
];

const team = [
  { initials: "MN", name: "M. Nowak", role: "Geschäftsführung" },
  { initials: "TB", name: "T. Berger", role: "Bauleitung" },
  { initials: "SK", name: "S. Krüger", role: "Meisterin" },
  { initials: "JF", name: "J. Fischer", role: "Auszubildender" },
];

const testimonials = [
  { quote: "Schnell, sauber, termintreu – genau wie versprochen.", name: "Beispiel-Bewertung" },
  { quote: "Von der Beratung bis zur Abnahme alles aus einer Hand.", name: "Beispiel-Bewertung" },
  { quote: "Auch bei einem Sturmschaden am selben Tag noch vor Ort.", name: "Beispiel-Bewertung" },
];

const jobs = [
  { title: "Dachdecker (m/w/d)", detail: "Vollzeit, ab sofort, mit Berufserfahrung oder Quereinstieg." },
  { title: "Auszubildende:r Dachdecker:in", detail: "Ausbildungsstart jährlich zum August." },
];

export function FirmenwebsiteExample() {
  const leistungenRef = useRef<HTMLDivElement>(null);
  const referenzenRef = useRef<HTMLDivElement>(null);
  const karriereRef = useRef<HTMLDivElement>(null);
  const kontaktRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [openJob, setOpenJob] = useState<number | null>(null);
  const [sent, setSent] = useState(false);

  function scrollTo(ref: React.RefObject<HTMLDivElement | null>) {
    setMenuOpen(false);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  const testimonial = testimonials[testimonialIndex];

  return (
    <BrowserFrame url="dachdecker-nowak-beispiel.de" height="600px">
      <nav className="sticky top-0 z-10 border-b border-white/10 bg-slate-900 text-white">
        <div className="flex items-center justify-between px-6 py-4">
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
          <button onClick={() => setMenuOpen((v) => !v)} className="sm:hidden" aria-label="Menü öffnen">
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {menuOpen ? (
          <div className="flex flex-col gap-1 border-t border-white/10 px-6 py-3 text-sm sm:hidden">
            <button onClick={() => scrollTo(leistungenRef)} className="py-1.5 text-left hover:text-sky-300">
              Leistungen
            </button>
            <button onClick={() => scrollTo(referenzenRef)} className="py-1.5 text-left hover:text-sky-300">
              Referenzen
            </button>
            <button onClick={() => scrollTo(karriereRef)} className="py-1.5 text-left hover:text-sky-300">
              Karriere
            </button>
            <button onClick={() => scrollTo(kontaktRef)} className="py-1.5 text-left hover:text-sky-300">
              Kontakt
            </button>
          </div>
        ) : null}
      </nav>

      <div className="relative overflow-hidden bg-slate-900 px-6 py-16 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "18px 18px" }}
        />
        <p className="relative text-xs font-semibold uppercase tracking-[0.3em] text-sky-400">
          Dachdeckerbetrieb seit 1987
        </p>
        <h2 className="relative mt-4 max-w-sm text-4xl font-bold leading-tight">Ihr Dach in besten Händen.</h2>
        <p className="relative mt-4 max-w-xs text-sm text-slate-300">
          Steildach, Flachdach, Sanierung und Notfall-Reparaturen – für Privat und Gewerbe.
        </p>
        <button className="relative mt-7 rounded-full bg-sky-400 px-5 py-2.5 text-sm font-semibold text-slate-900">
          Angebot anfordern
        </button>

        <div className="relative mt-10 inline-flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
          <p className="font-[family-name:var(--font-space-mono)] text-3xl font-bold text-sky-400">4.9</p>
          <div>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-3 fill-sky-400 text-sky-400" />
              ))}
            </div>
            <p className="text-xs text-slate-400">120+ Bewertungen</p>
          </div>
        </div>
      </div>

      <div ref={leistungenRef} className="bg-white px-6 py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">Leistungen</p>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {leistungen.map((item) => (
            <div key={item.label} className="border-l-2 border-sky-400 pl-4">
              <p className="text-sm font-semibold text-neutral-900">{item.label}</p>
              <p className="mt-0.5 text-xs text-neutral-500">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div ref={referenzenRef} className="bg-slate-50 px-6 py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">Referenzprojekte</p>
        <div className="mt-5 space-y-2">
          {referenzen.map((item) => (
            <div
              key={item.title}
              className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3"
            >
              <p className="text-sm font-medium text-neutral-900">{item.title}</p>
              <span className="rounded-full bg-sky-50 px-2.5 py-1 text-[11px] font-medium text-sky-700">
                {item.tag}
              </span>
            </div>
          ))}
        </div>

        <div className="relative mt-8 rounded-xl bg-slate-900 p-6 text-white">
          <p className="font-[family-name:var(--font-space-mono)] text-4xl leading-none text-sky-400/40">„</p>
          <p className="-mt-4 text-lg font-medium italic leading-snug">{testimonial.quote}</p>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-slate-400">{testimonial.name}, kein echtes Zitat</p>
            <div className="flex gap-2">
              <button
                onClick={() => setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
                aria-label="Vorherige Bewertung"
                className="flex size-7 items-center justify-center rounded-full border border-white/15 text-slate-300"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={() => setTestimonialIndex((i) => (i + 1) % testimonials.length)}
                aria-label="Nächste Bewertung"
                className="flex size-7 items-center justify-center rounded-full border border-white/15 text-slate-300"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white px-6 py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">Unser Team</p>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                {member.initials}
              </div>
              <p className="mt-2 text-xs font-medium text-neutral-900">{member.name}</p>
              <p className="text-xs text-neutral-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div ref={karriereRef} className="bg-sky-50 px-6 py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">Karriere</p>
        <h3 className="mt-2 text-lg font-bold text-neutral-900">Wir stellen ein!</h3>
        <div className="mt-5 divide-y divide-sky-100 rounded-xl border border-sky-100 bg-white">
          {jobs.map((job, index) => {
            const isOpen = openJob === index;
            return (
              <div key={job.title}>
                <button
                  onClick={() => setOpenJob(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm font-medium text-neutral-900"
                >
                  {job.title}
                  <ChevronDown className={`size-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen ? <p className="px-4 pb-3 text-sm text-neutral-600">{job.detail}</p> : null}
              </div>
            );
          })}
        </div>
      </div>

      <div ref={kontaktRef} className="bg-slate-900 px-6 py-14 text-white">
        <p className="text-sm">0251 000000 · info@nowak-dach-beispiel.de</p>
        <p className="mt-1 text-xs text-slate-400">Nowak Dach GmbH · Beispieladresse, Münster</p>

        {sent ? (
          <p className="mt-6 rounded-lg bg-emerald-500/15 px-4 py-3 text-sm text-emerald-300">
            Danke! Ihre Anfrage ist angekommen (Beispiel-Formular, es wurde nichts versendet).
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              placeholder="Ihr Name"
              required
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm placeholder:text-slate-400 sm:w-1/3"
            />
            <input
              type="text"
              placeholder="Kurz Ihr Anliegen"
              required
              className="w-full flex-1 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-lg bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-900"
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
