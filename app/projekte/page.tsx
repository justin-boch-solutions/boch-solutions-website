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
      <div className="text-center max-w-5xl mb-32 md:mb-48 text-slate-50 relative z-10 w-full flex flex-col items-center mt-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-sky-500/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
        <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
        
        <div className="inline-flex items-center gap-2 mb-10 px-6 py-2.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-xs text-sky-400 uppercase tracking-widest font-black shadow-[0_0_30px_rgba(14,165,233,0.15)]">
          Ausgewählte Arbeiten
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter mb-10 leading-[1.0]">
          Ergebnisse, <br className="hidden md:block" />die <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent drop-shadow-2xl">überzeugen.</span>
        </h1>
        
        <p className="text-xl md:text-3xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium">
          Wir bauen keine digitalen Kunstwerke. Wir entwickeln messerscharfe Vertriebsmaschinen, die auf Autopilot Anfragen generieren.
        </p>
      </div>

      {/* Inject User's Interactive ProjectsList */}
      <div className="w-full relative z-10">
        <ProjectsList />
      </div>

    </main>
  );
}