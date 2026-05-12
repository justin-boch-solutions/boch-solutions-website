"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import TiltCard from '@/components/TiltCard';

export default function ServicesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  } as any;

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 40, damping: 15 } }
  } as any;

  return (
    <section id="leistungen" className="relative w-full py-32 px-4 sm:px-6 bg-black overflow-hidden flex justify-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[1000px] h-[600px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="w-full max-w-6xl relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/10 text-xs text-sky-400 uppercase tracking-widest font-bold">
            Arsenal
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-50 mb-6 tracking-tighter">
            Digitale <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">Vertriebsmaschinen.</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Keine Baukästen von der Stange. Wir bauen Performance-Systeme, die auf ein einziges Ziel ausgerichtet sind: Deinen Umsatz messbar zu steigern.
          </p>
        </motion.div>

        {/* BENTO BOX GRID */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]"
        >
          
          {/* Card 1: Onepager (Small) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-1 h-full">
            <Link href="/leistungen" className="block w-full h-full cursor-pointer">
              <TiltCard>
                <div className="relative group rounded-3xl p-[1px] h-full w-full">
                  <span className="absolute inset-0 bg-gradient-to-br from-sky-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></span>
                  <div className="relative h-full w-full bg-[#0a0a0a] rounded-[23px] p-8 flex flex-col items-start border border-white/5 group-hover:border-white/10 transition-colors z-10 overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-500/10 blur-[40px] rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
                    
                    <div className="w-14 h-14 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center mb-8 text-sky-400 group-hover:scale-110 transition-transform duration-300 pointer-events-none">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-50 mb-3 group-hover:text-sky-400 transition-colors pointer-events-none">Onepager</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8 pointer-events-none">
                      Schnell, kompakt und rasiermesserscharf. Ideal für Lead-Kampagnen.
                    </p>
                    <div className="mt-auto text-white text-xs font-bold tracking-widest uppercase flex items-center gap-2 group-hover:text-sky-400 transition-colors pointer-events-none">
                      Entdecken <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Link>
          </motion.div>

          {/* Card 2: Firmenwebsite (Large) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 h-full">
            <Link href="/leistungen" className="block w-full h-full cursor-pointer">
              <TiltCard>
                <div className="relative group rounded-3xl p-[1px] h-full w-full">
                  <span className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></span>
                  <div className="relative h-full w-full bg-[#0a0a0a] rounded-[23px] p-8 md:p-12 flex flex-col items-start border border-white/5 group-hover:border-white/10 transition-colors z-10 overflow-hidden">
                    <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    
                    <div className="w-14 h-14 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center mb-8 text-indigo-400 group-hover:scale-110 transition-transform duration-300 pointer-events-none">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-50 mb-4 group-hover:text-indigo-400 transition-colors pointer-events-none">High-End Firmenwebsite</h3>
                    <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-lg mb-8 pointer-events-none">
                      Dein digitales Imperium. Auf Kunden- und Mitarbeitergewinnung optimiert, um deine Marktführerschaft auch online zu zementieren.
                    </p>
                    <div className="mt-auto text-white text-xs font-bold tracking-widest uppercase flex items-center gap-2 group-hover:text-indigo-400 transition-colors pointer-events-none">
                      Details ansehen <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Link>
          </motion.div>

          {/* Card 3: Kundenportale (Large) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 h-full">
            <Link href="/leistungen" className="block w-full h-full cursor-pointer">
              <TiltCard>
                <div className="relative group rounded-3xl p-[1px] h-full w-full">
                  <span className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></span>
                  <div className="relative h-full w-full bg-[#0a0a0a] rounded-[23px] p-8 md:p-12 flex flex-col items-start border border-white/5 group-hover:border-white/10 transition-colors z-10 overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
                    
                    <div className="w-14 h-14 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center mb-8 text-emerald-400 group-hover:scale-110 transition-transform duration-300 pointer-events-none">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-50 mb-4 group-hover:text-emerald-400 transition-colors pointer-events-none">Software & Dashboards</h3>
                    <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-lg mb-8 pointer-events-none">
                      Maßgeschneiderte Web-Apps und Kundenportale, die komplexe Prozesse automatisieren und dir Zeit sparen.
                    </p>
                    <div className="mt-auto text-white text-xs font-bold tracking-widest uppercase flex items-center gap-2 group-hover:text-emerald-400 transition-colors pointer-events-none">
                      Systeme anzeigen <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Link>
          </motion.div>

          {/* Card 4: Wartung (Small) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-1 h-full">
            <Link href="/leistungen" className="block w-full h-full cursor-pointer">
              <TiltCard>
                <div className="relative group rounded-3xl p-[1px] h-full w-full">
                  <span className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></span>
                  <div className="relative h-full w-full bg-[#0a0a0a] rounded-[23px] p-8 flex flex-col items-start border border-white/5 group-hover:border-white/10 transition-colors z-10 overflow-hidden">
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/10 blur-[40px] rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
                    
                    <div className="w-14 h-14 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center mb-8 text-purple-400 group-hover:scale-110 transition-transform duration-300 pointer-events-none">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-50 mb-3 group-hover:text-purple-400 transition-colors pointer-events-none">Wartung</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8 pointer-events-none">
                      Absolute Sicherheit durch kontinuierliche Updates und technische Betreuung.
                    </p>
                    <div className="mt-auto text-white text-xs font-bold tracking-widest uppercase flex items-center gap-2 group-hover:text-purple-400 transition-colors pointer-events-none">
                      Schutz sichern <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Link>
          </motion.div>

          {/* Card 5: Local SEO (Small) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-1 h-full">
            <Link href="/leistungen" className="block w-full h-full cursor-pointer">
              <TiltCard>
                <div className="relative group rounded-3xl p-[1px] h-full w-full">
                  <span className="absolute inset-0 bg-gradient-to-br from-amber-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></span>
                  <div className="relative h-full w-full bg-[#0a0a0a] rounded-[23px] p-8 flex flex-col items-start border border-white/5 group-hover:border-white/10 transition-colors z-10 overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/10 blur-[40px] rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
                    
                    <div className="w-14 h-14 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center mb-8 text-amber-400 group-hover:scale-110 transition-transform duration-300 pointer-events-none">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-50 mb-3 group-hover:text-amber-400 transition-colors pointer-events-none">Local SEO</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8 pointer-events-none">
                      Regionale Dominanz auf Google für Handwerksbetriebe und Dienstleister.
                    </p>
                    <div className="mt-auto text-white text-xs font-bold tracking-widest uppercase flex items-center gap-2 group-hover:text-amber-400 transition-colors pointer-events-none">
                      Gefunden werden <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Link>
          </motion.div>

          {/* Card 6: E-Commerce (Large) */}
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 h-full">
            <Link href="/leistungen" className="block w-full h-full cursor-pointer">
              <TiltCard>
                <div className="relative group rounded-3xl p-[1px] h-full w-full">
                  <span className="absolute inset-0 bg-gradient-to-br from-rose-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></span>
                  <div className="relative h-full w-full bg-[#0a0a0a] rounded-[23px] p-8 md:p-12 flex flex-col items-start border border-white/5 group-hover:border-white/10 transition-colors z-10 overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>
                    
                    <div className="w-14 h-14 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center mb-8 text-rose-400 group-hover:scale-110 transition-transform duration-300 pointer-events-none">
                      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-50 mb-4 group-hover:text-rose-400 transition-colors pointer-events-none">E-Commerce & Online-Shops</h3>
                    <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-lg mb-8 pointer-events-none">
                      Hochperformante Online-Shops, konzipiert für maximale Conversion-Raten und reibungslose Einkaufserlebnisse.
                    </p>
                    <div className="mt-auto text-white text-xs font-bold tracking-widest uppercase flex items-center gap-2 group-hover:text-rose-400 transition-colors pointer-events-none">
                      Umsatz skalieren <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
