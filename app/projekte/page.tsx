import ProjectsList from '@/components/ProjectsList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Webdesign Projekte & Referenzen | Webagentur Münster',
  description: 'Entdecke unsere erfolgreichen Webdesign-Projekte. Wir entwickeln als Agentur aus Münster deutschlandweit conversion-starke Websites und digitale Systeme.',
  alternates: {
    canonical: 'https://boch-solutions.de/projekte',
  },
  openGraph: {
    title: 'Unsere Webdesign Projekte | Justin Boch Solutions',
    description: 'Überzeuge dich von unseren Ergebnissen. Conversion-starke Websites, Onepager und individuelle Dashboards für Unternehmen.',
    url: 'https://boch-solutions.de/projekte',
    type: 'website',
  },
};

export default function Projekte() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center pt-40 pb-24 px-4 sm:px-6 overflow-hidden selection:bg-sky-500/30">
      
      {/* Hero Bereich */}
      <div className="text-center max-w-4xl mb-24 text-slate-50 relative z-10 w-full flex flex-col items-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-sky-500/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
        
        <div className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border border-sky-500/20 bg-sky-500/10 text-xs text-sky-400 uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(14,165,233,0.1)]">
          Unsere Arbeiten
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter mb-8 leading-[1.05]">
          Ergebnisse, <br className="hidden md:block" />die <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent drop-shadow-2xl">überzeugen.</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
          Keine leeren Versprechungen, sondern bewiesene Systeme. Entdecke, wie wir Unternehmen mit messerscharfem Design digital nach vorne bringen.
        </p>
      </div>

      {/* Inject User's Interactive ProjectsList */}
      <div className="w-full relative z-10">
        <ProjectsList />
      </div>

    </main>
  );
}