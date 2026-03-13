import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

export default function Agentur() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center pt-32 pb-24 px-6 overflow-hidden">
      
      {/* Hero Bereich */}
      <div className="text-center max-w-3xl mb-24 text-slate-50">
        <FadeIn direction="up">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-slate-800 bg-slate-900/50 text-xs text-slate-400 uppercase tracking-widest font-semibold">
            Über JB Solutions
          </div>
        </FadeIn>
        <FadeIn direction="up" delay={0.1}>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Ehrliches Handwerk im <span className="text-sky-500">digitalen Raum.</span>
          </h1>
        </FadeIn>
        <FadeIn direction="up" delay={0.2}>
          <p className="text-lg text-slate-400">
            Die meisten Webdesign-Agenturen reden viel und liefern wenig. Wir sprechen deine Sprache, halten unsere Zusagen und bauen dir einen Internetauftritt, auf den du dich verlassen kannst.
          </p>
        </FadeIn>
      </div>

      {/* Philosophie / Werte - Grid */}
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 mb-24">
        <FadeIn direction="up" delay={0.1}>
          <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-3xl h-full hover:bg-slate-900 transition-colors">
            <div className="w-12 h-12 bg-sky-500/10 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-50 mb-4">Ergebnisse statt Kunst</h3>
            <p className="text-slate-400 leading-relaxed">
              Deine neue Website muss keine Design-Preise gewinnen. Sie muss deinen Terminkalender füllen und Bewerber anziehen. Wir konzentrieren uns zu 100 % auf das, was messbar funktioniert.
            </p>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <div className="bg-slate-900/40 border border-slate-800 p-10 rounded-3xl h-full hover:bg-slate-900 transition-colors">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-50 mb-4">Ein fester Ansprechpartner</h3>
            <p className="text-slate-400 leading-relaxed">
              Keine Warteschleifen, keine wechselnden Projektmanager. Wenn du eine Frage hast oder etwas geändert werden muss, rufst du an und erreichst genau die Person, die deine Seite gebaut hat.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Gründer Bereich (Münster Fokus) */}
      <div className="w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-16 shadow-2xl flex flex-col md:flex-row items-center gap-16 mb-24 relative overflow-hidden">
        {/* Dekorativer Hintergrund */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 rounded-full blur-3xl"></div>
        
        <FadeIn direction="right" delay={0.2} className="w-full md:w-5/12">
          {/* Dein Bild (Aktuell edler Platzhalter, später echtes Foto) */}
          <div className="aspect-[4/5] rounded-2xl bg-slate-950 border border-slate-700 flex flex-col items-center justify-center overflow-hidden relative shadow-inner w-full">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px]"></div>
            <div className="z-10 text-center px-6">
              <svg className="w-12 h-12 text-slate-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Portrait Justin Boch</p>
            </div>
          </div>
        </FadeIn>
        
        <FadeIn direction="left" delay={0.4} className="w-full md:w-7/12 relative z-10">
          <h2 className="text-4xl font-bold mb-6 tracking-tight text-slate-50">Lokal verwurzelt. <br/><span className="text-sky-500">Digital voraus.</span></h2>
          <p className="text-lg text-slate-400 mb-6 leading-relaxed">
            Hallo, ich bin Justin Boch. In den letzten Jahren habe ich immer wieder gesehen, wie Betriebe viel Geld für Websites verbrennen, die am Ende verstauben und keinen einzigen Kunden bringen.
          </p>
          <p className="text-lg text-slate-400 mb-8 leading-relaxed">
            Das muss nicht so sein. Aus Münster heraus betreue ich Unternehmen im gesamten DACH-Raum. Mein Ansatz ist simpel: Ich baue dir ein digitales Fundament, das dir Arbeit abnimmt, statt neue zu schaffen. Transparent, fair und auf Augenhöhe.
          </p>
          
          <div className="flex items-center gap-6">
            <Link href="/de/kontakt" className="px-6 py-3 bg-sky-500 text-slate-950 font-bold rounded-md hover:bg-sky-400 transition-colors">
              Direkt Kontakt aufnehmen
            </Link>
            <div className="flex items-center gap-2 text-slate-300 font-medium">
              <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Standort Münster
            </div>
          </div>
        </FadeIn>
      </div>

    </main>
  );
}