import PerformanceCalculator from '@/components/performance/PerformanceCalculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kostenloser Performance-Check | Boch Solutions',
  description: 'Analysiere deine Website auf versteckte Fehler und Conversion-Killer. Jetzt kostenlos testen.',
};

export default function PerformanceCheckPage() {
  return (
    <main className="min-h-screen bg-black pt-32 pb-20 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-sky-500/10 blur-[120px] rounded-full"></div>
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="w-full max-w-4xl mx-auto z-10 flex flex-col items-center">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/10 text-xs text-sky-400 font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
            Instagram Ads Special
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Verlierst du <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">täglich Kunden?</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            90% der Webseiten sind zu langsam oder konvertieren schlecht. Finde jetzt heraus, wo deine Seite Schwächen hat und wie viel Umsatz du auf der Strecke lässt.
          </p>
        </div>

        <PerformanceCalculator />
        
        <div className="mt-16 text-center text-slate-500 text-sm max-w-xl">
          <p>
            Dieser Performance-Check analysiert technische Faktoren deiner Website (u.a. Ladezeiten und Struktur) und gibt dir konkrete Handlungsempfehlungen für mehr Umsatz.
          </p>
        </div>
      </div>
    </main>
  );
}
