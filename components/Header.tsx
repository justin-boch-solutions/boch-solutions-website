"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* DEIN ECHTES LOGO NACHGEBAUT (Farbverlauf + Layout) */}
        <Link href="/de" className="flex flex-col group mt-1" onClick={closeMenu}>
          {/* JUSTIN BOCH mit Farbverlauf Pink zu Blau */}
          <span className="text-2xl md:text-3xl font-serif font-bold tracking-widest bg-gradient-to-r from-rose-400 to-sky-400 bg-clip-text text-transparent leading-none">
            JUSTIN BOCH
          </span>
          {/* Untere Zeile: Linie + Solutions */}
          <div className="flex items-center mt-1">
            {/* Farbverlauf-Linie */}
            <div className="h-[3px] w-[55%] bg-gradient-to-r from-rose-400 to-sky-400 rounded-full"></div>
            {/* Solutions Text */}
            <span className="text-sm font-serif font-bold text-slate-100 ml-2 leading-none">
              Solutions
            </span>
          </div>
        </Link>

        {/* NAVIGATION DESKTOP */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="/de" className="hover:text-sky-400 transition-colors">Startseite</Link>
          <Link href="/de/leistungen" className="hover:text-sky-400 transition-colors">Leistungen</Link>
          <Link href="/de/projekte" className="hover:text-sky-400 transition-colors">Projekte</Link>
          <Link href="/de/agentur" className="hover:text-sky-400 transition-colors">Agentur</Link>
          <Link href="/de/ablauf" className="hover:text-sky-400 transition-colors">Ablauf</Link>
          <Link href="/de/faq" className="hover:text-sky-400 transition-colors">FAQ</Link>
        </nav>

        {/* ACTION BUTTON DESKTOP */}
        <div className="hidden md:flex items-center gap-4">
          <Link 
            href="/de/kontakt" 
            className="px-5 py-2.5 rounded-md bg-sky-500 text-slate-950 text-sm font-bold hover:bg-sky-400 transition-colors shadow-[0_0_15px_rgba(14,165,233,0.3)]"
          >
            Anfrage senden
          </Link>
        </div>

        {/* HAMBURGER BUTTON MOBILE */}
        <button 
          className="md:hidden p-2 text-slate-300 hover:text-sky-400 focus:outline-none transition-colors" 
          onClick={toggleMenu}
          aria-label="Menü umschalten"
        >
          {isOpen ? (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          ) : (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          )}
        </button>

      </div>

      {/* MOBILE DROPDOWN MENÜ */}
      <div className={`md:hidden absolute top-20 left-0 w-full bg-slate-950 border-b border-slate-800 shadow-2xl transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="flex flex-col px-6 py-6 space-y-2 text-base font-medium text-slate-300">
          <Link href="/de" onClick={closeMenu} className="block py-3 hover:text-sky-400 transition-colors border-b border-slate-800/50">Startseite</Link>
          <Link href="/de/leistungen" onClick={closeMenu} className="block py-3 hover:text-sky-400 transition-colors border-b border-slate-800/50">Leistungen</Link>
          <Link href="/de/projekte" onClick={closeMenu} className="block py-3 hover:text-sky-400 transition-colors border-b border-slate-800/50">Projekte</Link>
          <Link href="/de/agentur" onClick={closeMenu} className="block py-3 hover:text-sky-400 transition-colors border-b border-slate-800/50">Agentur</Link>
          <Link href="/de/ablauf" onClick={closeMenu} className="block py-3 hover:text-sky-400 transition-colors border-b border-slate-800/50">Ablauf</Link>
          <Link href="/de/faq" onClick={closeMenu} className="block py-3 hover:text-sky-400 transition-colors border-b border-slate-800/50">FAQ</Link>
          <div className="pt-6">
            <Link href="/de/kontakt" onClick={closeMenu} className="w-full block text-center px-5 py-4 rounded-md bg-sky-500 text-slate-950 text-base font-bold hover:bg-sky-400 transition-colors">Anfrage senden</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}