"use client";

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8 text-sm">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Haupt-Grid für die 4 Spalten */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* 1. Marke / Kurzprofil */}
          <div>
            <Link href="/de" className="flex flex-col group mb-6">
              <span className="text-2xl font-serif font-bold tracking-widest bg-gradient-to-r from-rose-400 to-sky-400 bg-clip-text text-transparent leading-none">
                JUSTIN BOCH
              </span>
              <div className="flex items-center mt-1">
                <div className="h-[3px] w-[55%] bg-gradient-to-r from-rose-400 to-sky-400 rounded-full"></div>
                <span className="text-sm font-serif font-bold text-slate-100 ml-2 leading-none">
                  Solutions
                </span>
              </div>
            </Link>
            <p className="text-slate-400 leading-relaxed">
              Wir bauen digitale Vertriebsmaschinen für Handwerksbetriebe und Start-ups. Planbare Neukunden durch intelligente Web- und Softwarelösungen.
            </p>
          </div>

          {/* 2. Navigation */}
          <div>
            <h3 className="text-slate-50 font-semibold mb-4">Navigation</h3>
            <ul className="space-y-3 text-slate-400">
              <li><Link href="/de" className="hover:text-sky-400 transition-colors">Startseite</Link></li>
              <li><Link href="/de/agentur" className="hover:text-sky-400 transition-colors">Agentur</Link></li>
              <li><Link href="/de/ablauf" className="hover:text-sky-400 transition-colors">Ablauf</Link></li>
              <li><Link href="/de/faq" className="hover:text-sky-400 transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* 3. Leistungsüberblick */}
          <div>
            <h3 className="text-slate-50 font-semibold mb-4">Leistungen</h3>
            <ul className="space-y-3 text-slate-400">
              <li><Link href="/de/leistungen" className="hover:text-sky-400 transition-colors">Firmenwebsite</Link></li>
              <li><Link href="/de/leistungen" className="hover:text-sky-400 transition-colors">Onepager</Link></li>
              <li><Link href="/de/leistungen" className="hover:text-sky-400 transition-colors">Individuelle Weblösungen</Link></li>
              <li><Link href="/de/leistungen" className="hover:text-sky-400 transition-colors">Hosting & Wartung</Link></li>
            </ul>
          </div>

          {/* 4. Kontakt */}
          <div>
            <h3 className="text-slate-50 font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-3 text-slate-400">
              <li>
                <Link href="/de/kontakt" className="hover:text-sky-400 transition-colors">
                  Projekt anfragen
                </Link>
              </li>
              <li>
                <a href="mailto:Kontakt@boch-solutions.de" className="hover:text-sky-400 transition-colors">
                  Kontakt@boch-solutions.de
                </a>
              </li>
              {/* NEUER Klickbarer Telefon-Link */}
              <li>
                <a href="tel:+4925128069471" className="hover:text-sky-400 transition-colors">
                  +49 251 280 694 71
                </a>
              </li>
              <li className="pt-2">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="inline-block px-4 py-2 rounded-md border border-slate-800 hover:bg-slate-900 text-slate-300 transition-colors">
                  Instagram
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Unterer Bereich: Rechtliches, Copyright */}
        <div className="flex flex-col lg:flex-row items-center justify-between pt-8 border-t border-slate-900 text-slate-500 gap-4">
          
          {/* Copyright */}
          <div className="text-center lg:text-left">
            © {currentYear} Justin Boch Solutions. Alle Rechte vorbehalten.
          </div>

          {/* Rechtliches */}
          <div className="flex flex-wrap justify-center lg:justify-end items-center gap-4 md:gap-6">
            <Link href="/de/impressum" className="hover:text-slate-300 transition-colors">Impressum</Link>
            <Link href="/de/datenschutz" className="hover:text-slate-300 transition-colors">Datenschutz</Link>
            <Link href="/de/agb" className="hover:text-slate-300 transition-colors">Allgemeine Geschäftsbedingungen</Link>
            <button 
              onClick={() => window.dispatchEvent(new Event('open-cookie-settings'))}
              className="hover:text-slate-300 transition-colors cursor-pointer text-left"
            >
              Cookie-Einstellungen
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}