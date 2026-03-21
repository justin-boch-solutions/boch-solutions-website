"use client";

import { motion } from "framer-motion";

export default function ProcessSection() {
  const steps = [
    {
      num: "01",
      title: "Strategie-Call",
      desc: "In einem kurzen, direkten Gespräch decken wir auf, wo du Geld liegen lässt und welches Ziel das neue System erfüllen muss.",
    },
    {
      num: "02",
      title: "Architektur",
      desc: "Wir planen das Fundament: Aufbau, Inhalte und Nutzerführung. Alles ist kompromisslos auf Conversion und Vertrauen ausgerichtet.",
    },
    {
      num: "03",
      title: "Entwicklung",
      desc: "Wir bauen deine Vertriebsmaschine. Blitzschnell, technisch einwandfrei und zu 100% auf mobilen Endgeräten optimiert.",
    },
    {
      num: "04",
      title: "Skalierung",
      desc: "Nach dem Livegang lassen wir dich nicht im Regen stehen. Wir warten das System und treiben deine digitale Skalierung weiter voran.",
    },
  ];

  return (
    <section id="prozess" className="relative w-full py-32 px-4 sm:px-6 bg-[#030303] overflow-hidden flex justify-center">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-500/5 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      
      <div className="w-full max-w-5xl relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/10 text-xs text-sky-400 uppercase tracking-widest font-bold">
            Blueprint
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-50 mb-6 tracking-tighter">
            Ein System, das <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">funktioniert.</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Wir verschwenden keine Zeit mit endlosen Feedbackschleifen. Unser Prozess ist auf Geschwindigkeit und messbare Ergebnisse getrimmt.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Glowing Center Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-sky-500/50 to-transparent -translate-x-1/2"></div>
          {/* Glowing Left Line (Mobile) */}
          <div className="md:hidden absolute left-[27px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-sky-500/50 to-transparent"></div>

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div 
                  key={step.num}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className={`flex flex-col items-start md:items-center relative w-full ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  
                  {/* Step Connector Node */}
                  <div className="absolute left-[8px] md:left-1/2 top-0 md:top-1/2 -mt-[5px] md:-mt-[15px] -translate-x-[0px] md:-translate-x-1/2 w-[38px] h-[38px] md:w-[46px] md:h-[46px] rounded-full bg-black border border-white/10 flex items-center justify-center z-20 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
                     <div className="w-[18px] h-[18px] md:w-[22px] md:h-[22px] bg-sky-500 rounded-full shadow-[0_0_15px_rgba(56,189,248,1)]"></div>
                  </div>

                  {/* Content Container */}
                  <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                    <div className="bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-500 rounded-[2rem] p-8 md:p-10 backdrop-blur-md relative group">
                       <span className={`absolute -top-6 ${isEven ? 'md:right-10 left-8 md:left-auto' : 'left-8'} text-7xl font-black text-white/[0.03] group-hover:text-sky-500/10 transition-colors z-0 pointer-events-none`}>
                         {step.num}
                       </span>
                       
                       <div className="relative z-10">
                         <h3 className="text-2xl font-bold text-slate-50 mb-4 tracking-wide group-hover:text-sky-400 transition-colors">{step.title}</h3>
                         <p className="text-slate-400 leading-relaxed text-[15px]">{step.desc}</p>
                       </div>
                    </div>
                  </div>

                  {/* Empty Spacer */}
                  <div className="hidden md:block w-1/2"></div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
