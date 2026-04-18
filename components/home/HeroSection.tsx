"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[100svh] flex flex-col justify-center items-center px-4 pt-40 pb-20 overflow-hidden">
      {/* Abstract Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] md:w-[1200px] h-[500px] bg-sky-500/15 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 md:right-1/4 w-[400px] md:w-[600px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none translate-y-1/4"></div>
      
      {/* Subtle Grid Pattern - Using radial gradient as fallback if grid.svg missing */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

      <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10 w-full mt-24 sm:mt-16 md:mt-0">
        {/* Top Badge */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-xl mb-10 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500 shadow-[0_0_10px_rgba(56,189,248,1)]"></span>
          </span>
          <span className="text-xs font-bold tracking-[0.2em] text-sky-100 uppercase">Limitierte Kapazitäten für Q3</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black tracking-tighter mb-8 leading-[1.05]"
        >
          <span className="text-white drop-shadow-2xl">Webseiten, die</span><br />
          <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-sky-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(56,189,248,0.2)] pb-2 relative inline-block">
            Umsatz generieren.
            {/* Underline Glow */}
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-400 to-transparent opacity-50 blur-sm"></span>
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg sm:text-xl md:text-2xl text-slate-400 max-w-3xl mb-14 leading-relaxed font-medium"
        >
          Wir bauen keine digitalen Kunstwerke. Wir entwickeln messerscharfe Vertriebsmaschinen für Handwerksbetriebe und Start-ups, die auf Autopilot Anfragen bringen.
        </motion.p>

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
        >
          <Link href="/kontakt" className="relative group overflow-hidden rounded-full p-[2px]">
             {/* Gradient glow border */}
             <span className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-sky-400 opacity-70 group-hover:opacity-100 blur-[2px] transition-opacity duration-300"></span>
             <span className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-sky-400"></span>
             
             {/* Inner dark button */}
             <div className="relative bg-black group-hover:bg-slate-950 transition-colors px-10 py-5 rounded-full flex items-center justify-center gap-3">
               <span className="bg-gradient-to-r from-sky-300 to-indigo-300 bg-clip-text text-transparent font-black tracking-widest uppercase text-sm">Potenzialanalyse starten</span>
               <svg className="w-5 h-5 text-indigo-300 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
               </svg>
             </div>
          </Link>

          <Link href="/projekte" className="px-10 py-5 rounded-full bg-white/[0.03] border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-bold text-sm tracking-widest uppercase transition-all duration-300 flex items-center justify-center backdrop-blur-xl shadow-[0_0_20px_rgba(255,255,255,0.02)]">
            Referenzen ansehen
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-24 pt-12 border-t border-white/5 w-full max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-4"
        >
          <div className="flex flex-col items-center justify-center gap-3 text-slate-400 group">
             <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-sky-500/10 group-hover:text-sky-400 group-hover:border-sky-500/20 transition-all duration-300">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
             </div>
             <span className="text-sm font-semibold tracking-wide">Direkt aus Münster</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 text-slate-400 group">
             <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 group-hover:border-emerald-500/20 transition-all duration-300">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             </div>
             <span className="text-sm font-semibold tracking-wide">Projekte in DACH</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 text-slate-400 group">
             <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-500/10 group-hover:text-purple-400 group-hover:border-purple-500/20 transition-all duration-300">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
             </div>
             <span className="text-sm font-semibold tracking-wide">100% In-House</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
