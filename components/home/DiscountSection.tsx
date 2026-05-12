"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DiscountSection() {
  // Simulierter Countdown (48 Stunden)
  const [timeLeft, setTimeLeft] = useState({
    hours: 47,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full py-24 sm:py-32 px-4 sm:px-6 bg-[#020617] overflow-hidden flex justify-center border-t border-white/5">
      
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"></div>
      
      {/* Riesiger strahlender Hintergrund */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-500/20 via-fuchsia-500/10 to-transparent blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-5xl relative z-10">
        
        {/* Schwebendes Ticket / Badge */}
        <motion.div 
          animate={{ y: [0, -15, 0], rotateZ: [5, 2, 5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-12 -right-6 lg:-right-12 z-20 hidden md:flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-600 shadow-[0_0_50px_rgba(244,63,94,0.5)] border-4 border-slate-900"
        >
          <div className="text-center text-white transform -rotate-12">
            <span className="block text-3xl font-black leading-none">-20%</span>
            <span className="block text-xs font-bold uppercase tracking-widest mt-1">Deal</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2.5rem] bg-slate-900/50 backdrop-blur-3xl overflow-hidden shadow-2xl p-[1px]"
        >
          {/* Animated Gradient Border Layer */}
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 animate-[spin_4s_linear_infinite] opacity-50 blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 opacity-20"></div>

          {/* Inner Content Layer */}
          <div className="relative rounded-[2.5rem] bg-slate-950/90 h-full p-8 sm:p-12 md:p-16 lg:p-20 text-center flex flex-col items-center">
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
              className="inline-flex items-center gap-2 mb-8 px-6 py-2 rounded-full border border-rose-500/50 bg-rose-500/20 text-xs sm:text-sm text-rose-300 uppercase tracking-widest font-black shadow-[0_0_20px_rgba(244,63,94,0.3)]"
            >
              <span className="relative flex h-3 w-3 mr-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
              </span>
              Limitierter VIP-Deal
            </motion.div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
              Sichere dir das <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-400 to-indigo-400">
                Ultimate Bundle
              </span>
            </h2>
            
            {/* The Countdown Timer */}
            <div className="flex gap-4 sm:gap-6 my-10">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-3xl sm:text-4xl font-black text-white shadow-inner">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <span className="text-xs uppercase tracking-widest text-slate-500 mt-2 font-bold">Stunden</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-slate-700 mt-3">:</div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-3xl sm:text-4xl font-black text-white shadow-inner">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <span className="text-xs uppercase tracking-widest text-slate-500 mt-2 font-bold">Minuten</span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-slate-700 mt-3">:</div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-900 border border-rose-500/30 flex items-center justify-center text-3xl sm:text-4xl font-black text-rose-400 shadow-[inset_0_0_20px_rgba(244,63,94,0.2)]">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <span className="text-xs uppercase tracking-widest text-rose-500/70 mt-2 font-bold">Sekunden</span>
              </div>
            </div>

            {/* Offer Stack / Value Breakdown */}
            <div className="w-full max-w-2xl bg-white/5 rounded-2xl p-6 sm:p-8 mb-12 border border-white/5 text-left">
              <h3 className="text-white font-bold text-lg mb-4 text-center">Was in diesem Deal enthalten ist:</h3>
              <ul className="space-y-3">
                <li className="flex items-center text-slate-300">
                  <svg className="w-5 h-5 text-rose-400 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  <span><strong>20% Rabatt</strong> auf dein gesamtes Web-Projekt</span>
                </li>
                <li className="flex items-center text-slate-300">
                  <svg className="w-5 h-5 text-rose-400 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  <span>Kostenlose strategische Potenzialanalyse <span className="text-slate-500 line-through text-sm ml-2">Wert: 199€</span></span>
                </li>
                <li className="flex items-center text-slate-300">
                  <svg className="w-5 h-5 text-rose-400 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                  <span>Kostenloses On-Page SEO Setup <span className="text-slate-500 line-through text-sm ml-2">Wert: 350€</span></span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
              <Link 
                href="/kontakt?mode=project" 
                className="group relative w-full sm:w-auto inline-flex items-center justify-center px-12 py-5 text-base font-black text-white transition-all duration-300 bg-rose-600 rounded-full hover:bg-rose-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(244,63,94,0.6)] overflow-hidden"
              >
                Deal jetzt blockieren
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
