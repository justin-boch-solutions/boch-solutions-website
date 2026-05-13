"use client";

import { motion } from 'framer-motion';

type TechItem = {
  name: string;
  src: string;
  glow: string;
  icon?: any;
};

const TECHNOLOGIES: TechItem[] = [
  { name: 'Next.js', src: 'https://cdn.simpleicons.org/nextdotjs/white', glow: 'rgba(255,255,255,0.2)' },
  { name: 'React', src: 'https://cdn.simpleicons.org/react/61DAFB', glow: 'rgba(97,218,251,0.2)' },
  { name: 'TypeScript', src: 'https://cdn.simpleicons.org/typescript/3178C6', glow: 'rgba(49,120,198,0.2)' },
  { name: 'Tailwind', src: 'https://cdn.simpleicons.org/tailwindcss/06B6D4', glow: 'rgba(6,182,212,0.2)' },
  { name: 'Vercel', src: 'https://cdn.simpleicons.org/vercel/white', glow: 'rgba(255,255,255,0.2)' },
  { 
    name: 'Figma', 
    src: 'https://www.vectorlogo.zone/logos/figma/figma-icon.svg',
    glow: 'rgba(242,78,30,0.2)'
  },
  { name: 'Node.js', src: 'https://cdn.simpleicons.org/nodedotjs/339933', glow: 'rgba(51,153,51,0.2)' },
];

export default function TechStackMarquee() {
  return (
    <section className="relative w-full py-16 bg-[#020617] overflow-hidden border-t border-b border-white/5 z-20">
      
      {/* Edge Fades for smooth entry/exit */}
      <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none"></div>

      <div className="text-center mb-16">
        <h3 className="text-sm font-black tracking-[0.3em] uppercase text-slate-500">Premium Tech Stack</h3>
      </div>

      <div className="flex w-full">
        {/* Infinite Scroll Container */}
        <motion.div 
          className="flex whitespace-nowrap gap-16 pr-16 items-center shrink-0"
          animate={{ x: [0, -1456] }} 
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 35,
          }}
          style={{ width: "max-content" }}
        >
          {/* First Set */}
          {TECHNOLOGIES.map((tech, idx) => (
            <div key={idx} className="flex flex-col items-center gap-8 group">
              <div className="relative">
                {/* Dynamischer Farb-Glow hinter der Box */}
                <div 
                  className="absolute -inset-2 rounded-full blur-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundColor: tech.glow }}
                ></div>
                
                {/* Die Premium Glaskachel (Frontal, sauber, perfektes Premium-Understatement) */}
                <motion.div 
                  className="w-24 h-24 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center relative overflow-hidden backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
                >
                  {/* Subtle innere Reflexion für den Glas-Look */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-50"></div>

                  <div className="relative z-10 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                    {tech.icon ? tech.icon : (
                      <img 
                        src={tech.src} 
                        alt={tech.name} 
                        className="w-12 h-12 object-contain filter drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]" 
                      />
                    )}
                  </div>
                </motion.div>
              </div>
              <span className="text-sm font-bold tracking-widest uppercase text-slate-500 group-hover:text-white transition-colors">{tech.name}</span>
            </div>
          ))}

          {/* Second Set (Duplicate for Loop) */}
          {TECHNOLOGIES.map((tech, idx) => (
            <div key={`dup-${idx}`} className="flex flex-col items-center gap-8 group">
              <div className="relative">
                <div 
                  className="absolute -inset-2 rounded-full blur-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundColor: tech.glow }}
                ></div>
                <motion.div 
                  className="w-24 h-24 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center relative overflow-hidden backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-50"></div>
                  <div className="relative z-10 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                    {tech.icon ? tech.icon : (
                      <img src={tech.src} alt={tech.name} className="w-12 h-12 object-contain filter drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]" />
                    )}
                  </div>
                </motion.div>
              </div>
              <span className="text-sm font-bold tracking-widest uppercase text-slate-500 group-hover:text-white transition-colors">{tech.name}</span>
            </div>
          ))}

           {/* Third Set */}
           {TECHNOLOGIES.map((tech, idx) => (
            <div key={`dup2-${idx}`} className="flex flex-col items-center gap-8 group">
              <div className="relative">
                <div 
                  className="absolute -inset-2 rounded-full blur-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ backgroundColor: tech.glow }}
                ></div>
                <motion.div 
                  className="w-24 h-24 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center relative overflow-hidden backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-50"></div>
                  <div className="relative z-10 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                    {tech.icon ? tech.icon : (
                      <img src={tech.src} alt={tech.name} className="w-12 h-12 object-contain filter drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]" />
                    )}
                  </div>
                </motion.div>
              </div>
              <span className="text-sm font-bold tracking-widest uppercase text-slate-500 group-hover:text-white transition-colors">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
