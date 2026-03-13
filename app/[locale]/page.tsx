import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full bg-slate-950 overflow-hidden">
      
      {/* 1. HERO SEKTION (Klar, bodenständig, nutzenorientiert) */}
      <section className="w-full flex justify-center pt-32 pb-24 px-6 border-b border-slate-900 relative">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="text-center max-w-4xl text-slate-50 relative z-10">
          <FadeIn direction="up" delay={0.1}>
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-slate-800 bg-slate-900/50 text-xs text-sky-400 uppercase tracking-widest font-semibold">
              Webdesign für Handwerk & Start-ups
            </div>
          </FadeIn>
          
          <FadeIn direction="up" delay={0.2}>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
              Wir bauen Websites, die <span className="text-sky-500">planbar Anfragen bringen.</span>
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={0.3}>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Kein Agentur-Bla-Bla. Wir bauen Websites für Handwerksbetriebe und Unternehmen, die mehr Anfragen und bessere Bewerber gewinnen wollen. Für mehr Sichtbarkeit, bessere Bewerber und echte Neukunden.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
              <Link href="/de/kontakt" className="w-full sm:w-auto px-8 py-4 rounded-md bg-sky-500 text-slate-950 font-bold text-lg hover:bg-sky-400 transition-all shadow-[0_0_20px_rgba(14,165,233,0.2)]">
                Kostenlose Potenzialanalyse
              </Link>
              <Link href="#leistungen" className="w-full sm:w-auto px-8 py-4 rounded-md border border-slate-800 bg-slate-900/50 text-slate-300 font-medium hover:bg-slate-800 hover:text-slate-50 transition-colors">
                So können wir helfen
              </Link>
            </div>
          </FadeIn>

          {/* NEU: Trust-Anker direkt im Sichtfeld */}
          <FadeIn direction="up" delay={0.5}>
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm font-medium text-slate-500">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Lokal in Münster
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Fokus auf Handwerk
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Fester Ansprechpartner
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. PROBLEM / LÖSUNG (Weniger Technik, mehr Kunden-Schmerz) */}
      <section className="w-full flex justify-center py-24 px-6 bg-white text-slate-950">
        <div className="w-full max-w-7xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            <FadeIn direction="right">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                  Eine schöne Website allein reicht heute nicht mehr.
                </h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  Viele Betriebe haben Websites, die wie digitale Visitenkarten aussehen – aber niemanden dazu bringen, zum Hörer zu greifen. Wir ändern das. Wir machen aus deiner Website deinen besten Vertriebsmitarbeiter, der 24/7 arbeitet.
                </p>
                
                <ul className="space-y-5 mb-8">
                  <li className="flex items-start gap-4">
                    <div className="w-8 h-8 shrink-0 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-bold">1</div>
                    <div>
                      <h4 className="font-bold text-slate-900">Fachkräfte & Azubis finden</h4>
                      <p className="text-sm text-slate-600 mt-1">Statt teurer Zeitungsanzeigen bewerben sich gute Leute direkt über dein neues Portal.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-8 h-8 shrink-0 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-bold">2</div>
                    <div>
                      <h4 className="font-bold text-slate-900">Gezielte Neukunden</h4>
                      <p className="text-sm text-slate-600 mt-1">Du wirst bei Google gefunden und Anfragen werden vorab gefiltert. Keine Zeitverschwendung mehr.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-8 h-8 shrink-0 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-bold">3</div>
                    <div>
                      <h4 className="font-bold text-slate-900">Weniger Büroaufwand</h4>
                      <p className="text-sm text-slate-600 mt-1">Kontaktformulare, die mitdenken und dir alle wichtigen Infos sofort sauber aufs Handy schicken.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              {/* Hier ersetzen wir den Platzhalter-Kasten durch eine Vertrauens-Box */}
              <div className="bg-slate-50 rounded-3xl p-10 border border-slate-200 h-full flex flex-col justify-center relative shadow-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-bl-full -z-0"></div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6 relative z-10">Warum Justin Boch Solutions?</h3>
                <p className="text-slate-600 mb-8 relative z-10 leading-relaxed">
                  "Wir wissen, dass du auf der Baustelle oder im Betrieb steckst und keine Zeit für langes IT-Fachchinesisch hast. Du brauchst jemanden, der zuhört, das Problem versteht und eine Lösung baut, die funktioniert. Genau das tun wir."
                </p>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-14 h-14 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-400 border-2 border-white shadow-sm">
                    JB
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Justin Boch</p>
                    <p className="text-sm text-slate-500">Gründer & Ansprechpartner</p>
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* 3. LEISTUNGEN (Nutzen-Fokusiert) */}
      <section id="leistungen" className="w-full flex justify-center py-24 px-6 border-t border-slate-900">
        <div className="w-full max-w-7xl">
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-slate-50 mb-4 tracking-tight">Was wir für dich tun können</h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">Keine Baukästen von der Stange. Wir bauen exakt das, was dein Betrieb aktuell braucht, um den nächsten Schritt zu machen.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FadeIn direction="up" delay={0.1}>
              <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:bg-slate-900 transition-colors group h-full flex flex-col">
                <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center mb-6 text-sky-500 group-hover:scale-110 transition-transform font-bold">01</div>
                <h3 className="text-xl font-bold text-slate-50 mb-3">Onepager</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">Schnell, kompakt und direkt auf den Punkt. Ideal, wenn du schnell Handwerker suchst oder eine gezielte Werbekampagne startest.</p>
                <Link href="/de/leistungen" className="text-sky-500 text-sm font-bold flex items-center gap-2 group-hover:text-sky-400">Mehr erfahren <span className="group-hover:translate-x-1 transition-transform">→</span></Link>
              </div>
            </FadeIn>
            
            <FadeIn direction="up" delay={0.2}>
              <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:bg-slate-900 transition-colors group h-full flex flex-col">
                <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center mb-6 text-sky-500 group-hover:scale-110 transition-transform font-bold">02</div>
                <h3 className="text-xl font-bold text-slate-50 mb-3">Firmenwebsite</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">Dein professionelles Aushängeschild im Netz. Strukturiert deine Leistungen so, dass Kunden sofort Vertrauen fassen und anfragen.</p>
                <Link href="/de/leistungen" className="text-sky-500 text-sm font-bold flex items-center gap-2 group-hover:text-sky-400">Mehr erfahren <span className="group-hover:translate-x-1 transition-transform">→</span></Link>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.3}>
              <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:bg-slate-900 transition-colors group h-full flex flex-col">
                <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center mb-6 text-sky-500 group-hover:scale-110 transition-transform font-bold">03</div>
                <h3 className="text-xl font-bold text-slate-50 mb-3">Kundenportale</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">Wenn normale Websites nicht mehr reichen. Wir programmieren individuelle Dashboards, um deine internen Abläufe zu erleichtern.</p>
                <Link href="/de/leistungen" className="text-sky-500 text-sm font-bold flex items-center gap-2 group-hover:text-sky-400">Mehr erfahren <span className="group-hover:translate-x-1 transition-transform">→</span></Link>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.4}>
              <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:bg-slate-900 transition-colors group h-full flex flex-col">
                <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center mb-6 text-sky-500 group-hover:scale-110 transition-transform font-bold">04</div>
                <h3 className="text-xl font-bold text-slate-50 mb-3">Sorglos-Wartung</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">Du kümmerst dich um dein Gewerk, wir uns um die Technik. Server, Updates und Sicherheit übernehmen wir komplett.</p>
                <Link href="/de/leistungen" className="text-sky-500 text-sm font-bold flex items-center gap-2 group-hover:text-sky-400">Mehr erfahren <span className="group-hover:translate-x-1 transition-transform">→</span></Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="w-full flex justify-center py-20 px-6 bg-sky-500 text-slate-950 relative overflow-hidden">
        {/* Dekorativer Hintergrund-Kreis */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
        <FadeIn direction="up">
          <div className="w-full max-w-4xl text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Klingt nach dem, was du suchst?</h2>
            <p className="text-lg font-medium mb-10 opacity-90">Lass uns in einem kurzen, entspannten Telefonat herausfinden, ob und wie wir dir helfen können. Ohne Verkaufsdruck.</p>
            <Link href="/de/kontakt" className="inline-block px-10 py-4 rounded-md bg-slate-950 text-sky-500 font-bold text-lg hover:bg-slate-900 transition-all hover:scale-105 shadow-2xl">
              Jetzt unverbindlich anfragen
            </Link>
          </div>
        </FadeIn>
      </section>

    </main>
  );
}