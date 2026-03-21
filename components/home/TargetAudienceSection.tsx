"use client";

import { motion } from 'framer-motion';

export default function TargetAudienceSection() {
  const cards = [
    {
      title: "Handwerksbetriebe",
      icon: (
        <svg className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
      ),
      desc1: "Besonders für SHK, Elektrik, Ausbau und Service ist eine starke Website heute der Unterschied zwischen „wird irgendwie gefunden“ und „bekommt echte, lukrative Anfragen“.",
      desc2: "Gerade regional suchen Kunden zuerst online. Wer veraltet wirkt, verliert Vertrauen vor dem ersten Kontakt."
    },
    {
      title: "Regionale Unternehmen",
      icon: (
        <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
      ),
      desc1: "Für lokale Unternehmen zählt ein professioneller Auftritt enorm: Leistungen glasklar zeigen, Autorität aufbauen und Interessenten auf direktestem Weg zur Anfrage führen.",
      desc2: "Die Website muss erklären, warum man genau dich beauftragen sollte – in Münster, NRW oder deutschlandweit."
    },
    {
      title: "Ambitionierte Start-ups",
      icon: (
        <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
      ),
      desc1: "Junge Unternehmen brauchen ein digitales Fundament, das Skalierung zulässt. Die Website muss sofort höchst professionell wirken und Investoren sowie erste Kunden überzeugen.",
      desc2: "Nicht überladen, nicht kompliziert – sondern rasiermesserscharf, modern und auf massives Wachstum ausgelegt."
    }
  ];

  return (
    <section id="zielgruppen" className="relative w-full py-32 px-4 sm:px-6 bg-[#030303] overflow-hidden flex justify-center border-t border-white/5">
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-800/20 blur-[150px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="w-full max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-black text-slate-50 mb-6 tracking-tighter">
            Für wen wir arbeiten.
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Wir arbeiten mit Betrieben, die nicht einfach nur „online sein“ wollen,
            sondern gezielt wachsen und ihre Prozesse digitalisieren müssen.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative rounded-3xl p-[1px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative h-full bg-[#0a0a0a] rounded-[23px] p-10 flex flex-col items-start border border-white/5 group-hover:border-white/10 transition-colors z-10">
                <div className="w-14 h-14 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-center mb-8 shadow-lg">
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-50 mb-5">{card.title}</h3>
                <p className="text-slate-400 leading-relaxed mb-6 font-medium">
                  {card.desc1}
                </p>
                <p className="text-slate-500 text-sm leading-relaxed mt-auto">
                  {card.desc2}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
