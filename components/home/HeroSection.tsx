import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="w-full flex justify-center pt-32 pb-24 px-6 border-b border-slate-900 relative">
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="text-center max-w-5xl text-slate-50 relative z-10">
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-slate-800 bg-slate-900/50 text-xs text-sky-300 uppercase tracking-widest font-semibold">
          Webdesign für Handwerk, Unternehmen und Start-ups in Münster, NRW und ganz Deutschland
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
          Webdesign, das <span className="text-sky-400">Anfragen, Bewerbungen und Vertrauen</span> bringt.
        </h1>

        <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Ich entwickle moderne Websites für Handwerksbetriebe, regionale Unternehmen und ambitionierte Start-ups.
          Der Fokus liegt auf klarer Struktur, besserer Sichtbarkeit bei Google, mehr qualifizierten Anfragen
          und einem professionellen Auftritt in Münster, NRW und deutschlandweit.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <Link
            href="/kontakt"
            className="w-full sm:w-auto px-8 py-4 rounded-md bg-sky-500 text-slate-950 font-bold text-lg hover:bg-sky-400 transition-all shadow-[0_0_20px_rgba(14,165,233,0.2)]"
          >
            Kostenlose Potenzialanalyse
          </Link>
          <Link
            href="#zielgruppen"
            className="w-full sm:w-auto px-8 py-4 rounded-md border border-slate-800 bg-slate-900/50 text-slate-200 font-medium hover:bg-slate-800 hover:text-slate-50 transition-colors"
          >
            Für wen das sinnvoll ist
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm font-medium text-slate-300">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Direkt aus Münster
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Projekte in NRW & Deutschland
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Fester Ansprechpartner statt Hotline
          </div>
        </div>
      </div>
    </section>
  );
}
