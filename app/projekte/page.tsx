import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Referenzen & Projekte | JB Solutions',
  description: 'Unsere erfolgreichsten Kundenprojekte. Überzeuge dich von unseren conversion-starken Websites, Onepagern und komplexen Dashboards.',
};

export default function Projekte() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center pt-32 pb-24 px-6 overflow-hidden selection:bg-sky-500/30">
      
      {/* Hero Bereich */}
      <div className="text-center max-w-4xl mb-24 text-slate-50 relative z-10 mt-8">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sky-500/20 blur-[100px] rounded-full pointer-events-none -z-10"></div>
        <FadeIn direction="up">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-xs text-sky-400 uppercase tracking-widest font-semibold backdrop-blur-sm shadow-[0_0_15px_rgba(14,165,233,0.15)]">
            Beweise statt Behauptungen
          </div>
        </FadeIn>
        <FadeIn direction="up" delay={0.1}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            Ergebnisse in <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">Aktion.</span>
          </h1>
        </FadeIn>
        <FadeIn direction="up" delay={0.2}>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Wir bauen keine Kunstwerke für Design-Awards. Hier siehst du Fallstudien von Systemen, die exakt das tun, wofür sie bezahlt wurden: Probleme lösen und deinen Umsatz steigern.
          </p>
        </FadeIn>
      </div>

      {/* Premium Bento Grid - Projekte */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-32 relative z-10">
        
        {/* PROJEKT 1: Flaggschiff (Volle Breite) */}
        <FadeIn direction="up" delay={0.1} className="md:col-span-2">
          <div className="group relative flex flex-col lg:flex-row bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-sky-500/50 transition-all duration-500 shadow-xl">
            {/* Glow Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="w-full lg:w-3/5 aspect-video lg:aspect-auto bg-slate-950 relative overflow-hidden flex items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-800">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:20px_20px]"></div>
              <Image 
                src="/JB OS.png" 
                alt="JB OS Pro Kundenportal" 
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
            </div>

            <div className="p-8 lg:p-16 flex flex-col justify-center w-full lg:w-2/5 z-10 bg-slate-900/80 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-bold uppercase tracking-wider border border-sky-500/20">SaaS Lösung</span>
                <span className="text-slate-500 text-sm font-medium">B2B Portal</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold text-slate-50 mb-6 group-hover:text-sky-400 transition-colors">Digitales Kundenportal</h3>
              
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Entwicklung eines komplett maßgeschneiderten, hochsicheren Dashboards für die zentrale Kommunikation und automatisierte Rechnungsstellung bei einem Dienstleistungsunternehmen.
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {['Next.js', 'Tailwind', 'Stripe API', 'PostgreSQL'].map(tag => (
                  <span key={tag} className="text-xs font-medium text-slate-300 bg-slate-800 px-3 py-1.5 rounded-md border border-slate-700">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto">
                <Link href="/kontakt" className="inline-flex items-center gap-2 text-sky-400 font-bold hover:text-sky-300 transition-colors group/link text-lg">
                  Eigenes Portal anfragen 
                  <span className="group-hover/link:translate-x-2 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* PROJEKT 2: Handwerker (Halbe Breite) */}
        <FadeIn direction="up" delay={0.2}>
          <div className="group relative flex flex-col bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-amber-500/50 transition-all duration-500 h-full shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="w-full aspect-video min-h-[300px] bg-slate-950 relative overflow-hidden flex items-center justify-center border-b border-slate-800">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px]"></div>
              <Image 
                src="/Huesmannwebseite.png" 
                alt="Hüsmann Website" 
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
            </div>

            <div className="p-8 lg:p-10 flex flex-col flex-grow z-10 bg-slate-900/80 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-wider border border-amber-500/20">Handwerk</span>
              </div>
              <h3 className="text-3xl font-bold text-slate-50 mb-4 group-hover:text-amber-500 transition-colors">SHK-Betrieb Recruiting</h3>
              
              <p className="text-slate-400 text-base leading-relaxed flex-grow mb-8">
                Relaunch der Firmenpräsenz mit starkem Fokus auf Anlagenmechaniker. Integriertes Bewerber-Funnel System zur unkomplizierten Online-Bewerbung.
              </p>

              <div className="mt-auto">
                <Link href="/kontakt" className="inline-flex items-center gap-2 text-amber-500 font-bold hover:text-amber-400 transition-colors group/link pb-1 border-b border-transparent hover:border-amber-400">
                  Konzept besprechen 
                  <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* PROJEKT 3: Startup (Halbe Breite) */}
        <FadeIn direction="up" delay={0.3}>
          <div className="group relative flex flex-col bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:border-emerald-500/50 transition-all duration-500 h-full shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="w-full aspect-video min-h-[300px] bg-slate-950 relative overflow-hidden flex items-center justify-center border-b border-slate-800">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]"></div>
              <Image 
                src="/real_estate_mockup.png" 
                alt="Immobilien Onepager Mockup" 
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
            </div>

            <div className="p-8 lg:p-10 flex flex-col flex-grow z-10 bg-slate-900/80 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-wider border border-emerald-500/20">Immobilien</span>
              </div>
              <h3 className="text-3xl font-bold text-slate-50 mb-4 group-hover:text-emerald-500 transition-colors">Vermarktungs-Onepager</h3>
              
              <p className="text-slate-400 text-base leading-relaxed flex-grow mb-8">
                Auf Performance getrimmte Landingpage für ein Neubauprojekt. Integration von 3D-Rundgängen und direkter Anbindung der Leads ans CRM.
              </p>

              <div className="mt-auto">
                <Link href="/kontakt" className="inline-flex items-center gap-2 text-emerald-500 font-bold hover:text-emerald-400 transition-colors group/link pb-1 border-b border-transparent hover:border-emerald-400">
                  Onepager anfragen
                  <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>

      </div>

      {/* CTA Box unten */}
      <FadeIn direction="up">
        <div className="w-full max-w-5xl text-center relative pointer-events-none mb-10 mx-auto px-4">
           {/* Decorative glow behind CTA */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[150%] max-w-[800px] bg-sky-500/10 blur-[120px] rounded-full -z-10"></div>
           
           <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-12 lg:p-20 shadow-2xl pointer-events-auto relative overflow-hidden">
             {/* Subtile Streifen im Button-Wrapper */}
             <div className="absolute inset-0 opacity-10 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#38bdf8_10px,#38bdf8_11px)]"></div>
             
             <div className="relative z-10">
               <div className="w-20 h-20 bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-[0_0_30px_rgba(14,165,233,0.15)]">
                 <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
               </div>
               <h2 className="text-4xl md:text-5xl font-bold text-slate-50 mb-8 tracking-tight">Klingt nach dem, was du brauchst?</h2>
               <p className="text-slate-300 mb-12 text-xl max-w-2xl mx-auto leading-relaxed">
                 Hör auf, Geld für digitale Visitenkarten zu verbrennen, die nichts bringen. Lass uns ein System für deinen Betrieb aufsetzen, das messbare Ergebnisse liefert.
               </p>
               <Link href="/kontakt" className="inline-block px-12 py-5 rounded-full bg-sky-500 text-slate-950 font-bold text-xl hover:bg-sky-400 transition-all duration-300 shadow-[0_0_40px_rgba(14,165,233,0.3)] hover:shadow-[0_0_60px_rgba(14,165,233,0.5)] hover:-translate-y-1">
                 Jetzt Erstgespräch sichern
               </Link>
             </div>
           </div>
        </div>
      </FadeIn>

    </main>
  );
}