import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

export default function Projekte() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center pt-32 pb-24 px-6 overflow-hidden">
      
      {/* Hero Bereich */}
      <div className="text-center max-w-3xl mb-24 text-slate-50">
        <FadeIn direction="up">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-slate-800 bg-slate-900/50 text-xs text-slate-400 uppercase tracking-widest font-semibold">
            Beweise statt Behauptungen
          </div>
        </FadeIn>
        <FadeIn direction="up" delay={0.1}>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Systeme in <span className="text-sky-500">Aktion.</span>
          </h1>
        </FadeIn>
        <FadeIn direction="up" delay={0.2}>
          <p className="text-lg text-slate-400">
            Wir bauen keine Kunstwerke für Design-Awards. Hier siehst du Fallstudien und Live-Demos von Systemen, die exakt das tun, wofür sie bezahlt wurden: Probleme lösen und Geld einbringen.
          </p>
        </FadeIn>
      </div>

      {/* Projekte Grid */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-24">
        
        {/* PROJEKT 1: JB OS Pro (Markenfarbe: SKY / BLAU) */}
        <FadeIn direction="up" delay={0.1} className="h-full">
          <div className="group flex flex-col bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden hover:border-sky-500/50 transition-all duration-500 h-full">
            
            {/* Abstraktes Cover */}
            <div className="w-full aspect-video bg-slate-900 relative overflow-hidden flex items-center justify-center border-b border-slate-800">
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px]"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
              <div className="z-10 px-6 py-2 border border-sky-500/30 bg-sky-500/10 rounded-full text-sky-400 font-bold tracking-widest uppercase text-sm backdrop-blur-sm group-hover:scale-105 transition-transform duration-500">
                Fallstudie: Software
              </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-slate-50 mb-6 group-hover:text-sky-400 transition-colors">Kundenportal "JB OS Pro"</h3>
              
              <div className="space-y-4 flex-grow mb-8 text-sm">
                <div>
                  <span className="text-slate-500 font-bold uppercase tracking-wider text-xs block mb-1">Ausgangslage</span>
                  <p className="text-slate-300">Unübersichtliche Kommunikation über E-Mail und WhatsApp. Fehlender Überblick über Rechnungen und Projektstände.</p>
                </div>
                <div>
                  <span className="text-sky-500 font-bold uppercase tracking-wider text-xs block mb-1">Unsere Lösung</span>
                  <p className="text-slate-300">Entwicklung eines maßgeschneiderten, sicheren Dashboards (Next.js) für zentrale Kommunikation und automatisierte Rechnungsstellung.</p>
                </div>
                <div>
                  <span className="text-emerald-500 font-bold uppercase tracking-wider text-xs block mb-1">Ergebnis</span>
                  <p className="text-slate-300">Massive Zeitersparnis im Büro-Alltag. Höhere Kundenzufriedenheit durch 100% Transparenz in Echtzeit.</p>
                </div>
              </div>

              {/* ACTION BUTTONS: Anfrage + Demo */}
              <div className="flex flex-wrap items-center gap-4 mt-auto pt-6 border-t border-slate-800/50">
                <Link href="/de/kontakt" className="inline-flex items-center gap-2 text-sky-400 font-bold hover:text-sky-300 transition-colors">
                  System anfragen 
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
                {/* HIER DEN LINK ZUR ECHTEN DEMO EINTRAGEN */}
                <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-sky-500/10 text-sky-400 font-bold hover:bg-sky-500/20 transition-colors text-sm ml-auto">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  Live Demo ansehen
                </a>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* PROJEKT 2: Handwerker (Markenfarbe: AMBER / ORANGE) */}
        <FadeIn direction="up" delay={0.2} className="h-full">
          <div className="group flex flex-col bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden hover:border-amber-500/50 transition-all duration-500 h-full">
            
            <div className="w-full aspect-video bg-slate-900 relative overflow-hidden flex items-center justify-center border-b border-slate-800">
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px]"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
              <div className="z-10 px-6 py-2 border border-amber-500/30 bg-amber-500/10 rounded-full text-amber-500 font-bold tracking-widest uppercase text-sm backdrop-blur-sm group-hover:scale-105 transition-transform duration-500">
                Fallstudie: Handwerk
              </div>
            </div>

            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-bold text-slate-50 mb-6 group-hover:text-amber-500 transition-colors">SHK-Betrieb Website</h3>
              
              <div className="space-y-4 flex-grow mb-8 text-sm">
                <div>
                  <span className="text-slate-500 font-bold uppercase tracking-wider text-xs block mb-1">Ausgangslage</span>
                  <p className="text-slate-300">Eine veraltete Website, die keine Neukunden brachte. Der Betrieb bekam nur unqualifizierte Anfragen, die viel Zeit kosteten.</p>
                </div>
                <div>
                  <span className="text-amber-500 font-bold uppercase tracking-wider text-xs block mb-1">Unsere Lösung</span>
                  <p className="text-slate-300">Kompletter Relaunch der Website mit Fokus auf Wärmepumpen. Integration eines automatisierten Fragebogens zur Vorqualifizierung.</p>
                </div>
                <div>
                  <span className="text-emerald-500 font-bold uppercase tracking-wider text-xs block mb-1">Ergebnis</span>
                  <p className="text-slate-300">Die Anfragen sind jetzt vorab gefiltert. Der Betrieb spricht nur noch mit Kunden, die echtes Interesse und Budget haben.</p>
                </div>
              </div>

              {/* ACTION BUTTONS: Anfrage + Demo */}
              <div className="flex flex-wrap items-center gap-4 mt-auto pt-6 border-t border-slate-800/50">
                <Link href="/de/kontakt" className="inline-flex items-center gap-2 text-amber-500 font-bold hover:text-amber-400 transition-colors">
                  Website anfragen 
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Link>
                {/* HIER DEN LINK ZUR ECHTEN DEMO EINTRAGEN */}
                <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-amber-500/10 text-amber-500 font-bold hover:bg-amber-500/20 transition-colors text-sm ml-auto">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  Live Demo ansehen
                </a>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* PROJEKT 3: SaaS Start-up (Markenfarbe: EMERALD / GRÜN) */}
        <FadeIn direction="up" delay={0.3} className="h-full md:col-span-2 lg:col-span-1 lg:col-start-1 lg:col-end-3 max-w-2xl mx-auto w-full">
          <div className="group flex flex-col bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden hover:border-emerald-500/50 transition-all duration-500 h-full">
            
            <div className="w-full aspect-video md:aspect-[21/9] bg-slate-900 relative overflow-hidden flex items-center justify-center border-b border-slate-800">
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
              <div className="z-10 px-6 py-2 border border-emerald-500/30 bg-emerald-500/10 rounded-full text-emerald-500 font-bold tracking-widest uppercase text-sm backdrop-blur-sm group-hover:scale-105 transition-transform duration-500">
                Fallstudie: Start-up
              </div>
            </div>

            <div className="p-8 flex flex-col md:flex-row gap-8 flex-grow">
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold text-slate-50 mb-6 group-hover:text-emerald-500 transition-colors">Start-up Onepager</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="text-slate-500 font-bold uppercase tracking-wider text-xs block mb-1">Ausgangslage</span>
                    <p className="text-slate-300">Teurer Social-Media-Traffic verpuffte, weil die Zielseite zu kompliziert war und die Besucher verwirrte.</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 flex flex-col justify-between">
                <div className="space-y-4 text-sm mb-8">
                  <div>
                    <span className="text-emerald-500 font-bold uppercase tracking-wider text-xs block mb-1">Unsere Lösung</span>
                    <p className="text-slate-300">Ein laserfokussierter Onepager ohne Ablenkungen. Blitzschnelle Ladezeiten und starke Call-to-Actions.</p>
                  </div>
                  <div>
                    <span className="text-sky-500 font-bold uppercase tracking-wider text-xs block mb-1">Ergebnis</span>
                    <p className="text-slate-300">Signifikant günstigere Lead-Preise und eine messbar höhere Conversion-Rate der Werbekampagne.</p>
                  </div>
                </div>
                
                {/* ACTION BUTTONS: Anfrage + Demo */}
                <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 pt-4 border-t border-slate-800/50">
                  <Link href="/de/kontakt" className="inline-flex items-center gap-2 text-emerald-500 font-bold hover:text-emerald-400 transition-colors">
                    Onepager anfragen 
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </Link>
                  {/* HIER DEN LINK ZUR ECHTEN DEMO EINTRAGEN */}
                  <a href="#" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-500/10 text-emerald-500 font-bold hover:bg-emerald-500/20 transition-colors text-sm sm:ml-auto">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

      </div>

      {/* CTA Box unten */}
      <FadeIn direction="up">
        <div className="w-full max-w-3xl text-center bg-slate-900 border border-slate-800 rounded-3xl p-10 md:p-16">
          <h2 className="text-3xl font-bold text-slate-50 mb-6">Lass uns dein Problem lösen.</h2>
          <p className="text-slate-400 mb-8 text-lg">Hör auf, Geld für Websites zu verbrennen, die nichts bringen. Wir bauen dir ein System, das messbare Ergebnisse liefert.</p>
          <Link href="/de/kontakt" className="inline-block px-10 py-4 rounded-md bg-sky-500 text-slate-950 font-bold text-lg hover:bg-sky-400 transition-colors shadow-[0_0_20px_rgba(14,165,233,0.3)]">
            Kostenlose Potenzialanalyse
          </Link>
        </div>
      </FadeIn>

    </main>
  );
}