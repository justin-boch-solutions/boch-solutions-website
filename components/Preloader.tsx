"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prüfe, ob der User die Seite schon einmal besucht hat (Session Storage)
    const hasVisited = sessionStorage.getItem("hasVisitedJB");
    
    if (hasVisited) {
      setIsLoading(false);
      return;
    }

    // Wenn nicht, spiele die 2.5 Sekunden lange Intro-Animation ab
    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("hasVisitedJB", "true");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#020617] overflow-hidden"
        >
          {/* Ambient Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sky-500/10 blur-[100px] rounded-full"></div>

          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center"
            >
              <span className="text-4xl md:text-6xl font-serif font-black tracking-[0.2em] bg-gradient-to-r from-rose-400 to-sky-400 bg-clip-text text-transparent leading-none">
                JUSTIN BOCH
              </span>
              
              <div className="flex items-center justify-center mt-3 overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: "circOut" }}
                  className="flex items-center"
                >
                  <div className="h-[2px] w-16 bg-gradient-to-r from-rose-400 to-sky-400 rounded-full mr-4"></div>
                  <span className="text-lg md:text-xl font-serif font-bold text-slate-100 tracking-[0.3em] uppercase">
                    Solutions
                  </span>
                  <div className="h-[2px] w-16 bg-gradient-to-r from-sky-400 to-rose-400 rounded-full ml-4"></div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Loading Progress Bar */}
            <div className="mt-12 w-48 h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-rose-400 via-indigo-400 to-sky-400"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
