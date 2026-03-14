"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const phoneHref = "tel:+4925128069471";
  const phoneDisplayDesktop = "+49 251 28069471";
  const phoneDisplayMobile = "+49 251 280 694 71";

  function toggleMenu() {
    setIsOpen((prev) => !prev);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-slate-950/95 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
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

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-200">
          <Link href="/de" className="hover:text-sky-300 transition-colors">
            Startseite
          </Link>
          <Link href="/de/leistungen" className="hover:text-sky-300 transition-colors">
            Leistungen
          </Link>
          <Link href="/de/projekte" className="hover:text-sky-300 transition-colors">
            Projekte
          </Link>
          <Link href="/de/agentur" className="hover:text-sky-300 transition-colors">
            Agentur
          </Link>
          <Link href="/de/ablauf" className="hover:text-sky-300 transition-colors">
            Ablauf
          </Link>
          <Link href="/de/faq" className="hover:text-sky-300 transition-colors">
            FAQ
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <a
            href={phoneHref}
            className="flex items-center gap-2 text-slate-200 hover:text-sky-300 text-sm font-bold transition-colors"
            aria-label={`Telefon ${phoneDisplayDesktop}`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            {phoneDisplayDesktop}
          </a>

          <Link
            href="/de/kontakt"
            className="px-5 py-2.5 rounded-md bg-sky-500 text-slate-950 text-sm font-bold hover:bg-sky-400 transition-colors shadow-[0_0_15px_rgba(14,165,233,0.25)]"
          >
            Anfrage senden
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden p-2 text-slate-200 hover:text-sky-300 focus:outline-none transition-colors"
          onClick={toggleMenu}
          aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden absolute top-20 left-0 w-full bg-slate-950 border-b border-slate-800 shadow-2xl"
        >
          <nav className="flex flex-col px-6 py-6 space-y-2 text-base font-medium text-slate-200">
            <Link
              href="/de"
              onClick={closeMenu}
              className="block py-3 hover:text-sky-300 transition-colors border-b border-slate-800/60"
            >
              Startseite
            </Link>
            <Link
              href="/de/leistungen"
              onClick={closeMenu}
              className="block py-3 hover:text-sky-300 transition-colors border-b border-slate-800/60"
            >
              Leistungen
            </Link>
            <Link
              href="/de/projekte"
              onClick={closeMenu}
              className="block py-3 hover:text-sky-300 transition-colors border-b border-slate-800/60"
            >
              Projekte
            </Link>
            <Link
              href="/de/agentur"
              onClick={closeMenu}
              className="block py-3 hover:text-sky-300 transition-colors border-b border-slate-800/60"
            >
              Agentur
            </Link>
            <Link
              href="/de/ablauf"
              onClick={closeMenu}
              className="block py-3 hover:text-sky-300 transition-colors border-b border-slate-800/60"
            >
              Ablauf
            </Link>
            <Link
              href="/de/faq"
              onClick={closeMenu}
              className="block py-3 hover:text-sky-300 transition-colors border-b border-slate-800/60"
            >
              FAQ
            </Link>

            <div className="pt-6 pb-2 space-y-4">
              <a
                href={phoneHref}
                className="flex items-center justify-center gap-2 w-full text-slate-200 hover:text-sky-300 text-base font-bold transition-colors"
                aria-label={`Telefon ${phoneDisplayMobile}`}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {phoneDisplayMobile}
              </a>

              <Link
                href="/de/kontakt"
                onClick={closeMenu}
                className="w-full block text-center px-5 py-4 rounded-md bg-sky-500 text-slate-950 text-base font-bold hover:bg-sky-400 transition-colors"
              >
                Anfrage senden
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
