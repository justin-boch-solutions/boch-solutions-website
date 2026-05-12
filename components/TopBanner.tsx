"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function TopBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="w-full bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 text-white overflow-hidden relative z-[100]"
        >
          <div className="absolute inset-0 bg-white opacity-5 mix-blend-overlay pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8 flex items-center justify-between relative z-10">
            <div className="flex-1 flex flex-wrap items-center justify-center text-xs sm:text-sm font-medium tracking-wide">
              <span className="mr-2 animate-pulse">🔥</span>
              <span className="hidden sm:inline opacity-90">Limitierte Frühlings-Aktion: </span>
              <strong className="font-black mx-1 tracking-wider">Kostenlose Erstberatung + 20% Rabatt</strong>
              <span className="opacity-90 hidden md:inline">auf dein erstes Web-Projekt!</span>
              
              <Link 
                href="/kontakt?mode=project" 
                className="ml-0 sm:ml-4 mt-2 sm:mt-0 inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white text-indigo-900 hover:bg-slate-100 transition-colors text-[10px] sm:text-xs font-black uppercase tracking-widest shadow-lg shadow-black/20"
              >
                Angebot sichern <span className="ml-1">→</span>
              </Link>
            </div>
            
            <button 
              onClick={() => setIsVisible(false)}
              className="flex-shrink-0 ml-4 p-1.5 rounded-full hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Banner schließen"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
