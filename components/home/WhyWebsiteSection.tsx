"use client";

import { motion } from 'framer-motion';

export default function WhyWebsiteSection() {
  const points = [
    {
      title: "Sichtbarkeit",
      desc: "Eine saubere technische und inhaltliche Struktur sorgt dafür, dass Google dich versteht und genau den Leuten anzeigt, die jetzt sofort dein Angebot suchen.",
    },
    {
      title: "Vertrauen",
      desc: "Ein hochprofessioneller Auftritt verwandelt Skepsis in Sekundenabteilen in Interesse – und Interesse in konkrete Kontaktanfragen.",
    },
    {
      title: "Prozess-Struktur",
      desc: "Smarte Formulare und digitale Kundenbereiche filtern Anfragen vor und sparen dir täglich stundenlange E-Mail-Schlachten und Telefonate.",
    }
  ];

  return (
    <section id="warum-website" className="relative w-full py-32 px-4 sm:px-6 bg-black text-slate-50 overflow-hidden flex justify-center border-t border-white/5">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none -translate-y-1/2"></div>
      
      <div className="w-full max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Text Side */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col"
          >
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-xs text-indigo-400 uppercase tracking-widest font-bold w-max mb-8">
              Warum jetzt?
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 tracking-tighter leading-[1.1]">
              Der digitale <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">Status Quo.</span>
            </h2>
            <div className="space-y-6 text-lg text-slate-400 leading-relaxed font-medium">
              <p>
                Vor 10 Jahren reichte eine digitale Visitenkarte im Netz. Heute durchleuchten Kunden,
                Bewerber und Geschäftspartner dich online bis ins kleinste Detail, bevor sie überhaupt den Hörer in die Hand nehmen.
              </p>
              <p>
                Sie vergleichen dich mit 5 anderen Anbietern. Wenn dein Auftritt alt, kompliziert oder unstrukturiert wirkt, 
                hast du den Kunden schon verloren, bevor das Match überhaupt angefangen hat.
              </p>
              <p className="text-white font-bold p-4 bg-white/[0.03] border border-white/10 rounded-2xl">
                Deine Website ist nicht nur ein PDF im Netz – sie ist 24/7 dein bester Vertriebsmitarbeiter. Sie muss verkaufen.
              </p>
            </div>
          </motion.div>

          {/* Right Cards Side */}
          <div className="flex flex-col gap-6 relative">
             <div className="hidden lg:block absolute left-[30px] top-10 bottom-10 w-[1px] bg-gradient-to-b from-transparent via-indigo-500/50 to-transparent"></div>
             
             {points.map((point, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="relative flex items-start gap-6 group"
                >
                  <div className="hidden lg:flex w-16 h-16 rounded-full bg-black border border-white/10 items-center justify-center shrink-0 z-10 shadow-[0_0_20px_rgba(0,0,0,0.8)] relative">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full group-hover:scale-150 transition-transform duration-500 shadow-[0_0_15px_rgba(99,102,241,0.8)]"></div>
                  </div>
                  
                  <div className="bg-white/[0.02] border border-white/5 group-hover:border-white/15 group-hover:bg-white/[0.04] transition-all duration-300 rounded-[2rem] p-8 w-full backdrop-blur-md relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <h3 className="text-2xl font-bold text-slate-50 mb-3 relative z-10 group-hover:text-indigo-400 transition-colors">{point.title}</h3>
                    <p className="text-slate-400 text-[15px] leading-relaxed relative z-10">
                      {point.desc}
                    </p>
                  </div>
                </motion.div>
             ))}
          </div>

        </div>
      </div>
    </section>
  );
}
