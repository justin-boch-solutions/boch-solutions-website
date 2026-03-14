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
        
        {/* LOGO */}
        <Link href="/de" className="flex flex-col group mt-1" onClick={closeMenu}>
          <span className="text-2xl md:text-3xl font-serif font-bold tracking-widest bg-gradient-to-r from-rose-400 to-sky-400 bg-clip-text text-transparent leading-none">
            JUSTIN BOCH
          </span>
          <div className="flex items-center mt-1">
            <div className="h-[3px] w-[55%] bg-gradient-to-r from-rose-400 to-sky-400 rounded-full"></div>
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

        {/* ACTION BUTTONS DESKTOP */}
        <div className="hidden md:flex items-center gap-6">
          {/* NEU: Klickbare Telefonnummer direkt im Header */}
          <a 
            href="tel:+4915100000000" 
            className="flex items-center gap-2 text-slate-300 hover:text-sky-400 text-sm font-bold transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            +49 251 28069471
          </a>
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
      <div className={`md:hidden absolute top-20 left-0 w-full bg-slate-950 border-b border-slate-800 shadow-2xl transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <nav className="flex flex-col px-6 py-6 space-y-2 text-base font-medium text-slate-300">
          <Link href="/de" onClick={closeMenu} className="block py-3 hover:text-sky-400 transition-colors border-b border-slate-800/50">Startseite</Link>
          <Link href="/de/leistungen" onClick={closeMenu} className="block py-3 hover:text-sky-400 transition-colors border-b border-slate-800/50">Leistungen</Link>
          <Link href="/de/projekte" onClick={closeMenu} className="block py-3 hover:text-sky-400 transition-colors border-b border-slate-800/50">Projekte</Link>
          <Link href="/de/agentur" onClick={closeMenu} className="block py-3 hover:text-sky-400 transition-colors border-b border-slate-800/50">Agentur</Link>
          <Link href="/de/ablauf" onClick={closeMenu} className="block py-3 hover:text-sky-400 transition-colors border-b border-slate-800/50">Ablauf</Link>
          <Link href="/de/faq" onClick={closeMenu} className="block py-3 hover:text-sky-400 transition-colors border-b border-slate-800/50">FAQ</Link>
          
          <div className="pt-6 pb-2 space-y-4">
            {/* NEU: Telefonnummer auch im mobilen Menü direkt klickbar */}
            <a 
              href="tel:+4925128069471" 
              className="flex items-center justify-center gap-2 w-full text-slate-300 hover:text-sky-400 text-base font-bold transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              +49 251 280 694 71
            </a>
            <Link href="/de/kontakt" onClick={closeMenu} className="w-full block text-center px-5 py-4 rounded-md bg-sky-500 text-slate-950 text-base font-bold hover:bg-sky-400 transition-colors">Anfrage senden</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}