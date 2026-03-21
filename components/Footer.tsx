"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  function openCookieSettings() {
    window.dispatchEvent(new Event("open-cookie-settings"));
  }

  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-8 text-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* 1. Marke / Kurzprofil */}
          <div>
            <Link href="/" className="flex flex-col mb-6">
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

            <p className="text-slate-300 leading-relaxed">
              Ich entwickle Websites und digitale Lösungen für Handwerksbetriebe,
              Unternehmen und Start-ups. Klar strukturiert, technisch sauber und
              auf echte Anfragen ausgelegt.
            </p>
          </div>

          {/* 2. Navigation */}
          <div>
            <h3 className="text-slate-50 font-semibold mb-4">Navigation</h3>
            <ul className="space-y-3 text-slate-300">
              <li>
                <Link href="/" className="hover:text-sky-300 transition-colors">
                  Startseite
                </Link>
              </li>
              <li>
                <Link href="/agentur" className="hover:text-sky-300 transition-colors">
                  Agentur
                </Link>
              </li>
              <li>
                <Link href="/ablauf" className="hover:text-sky-300 transition-colors">
                  Ablauf
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-sky-300 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Leistungen */}
          <div>
            <h3 className="text-slate-50 font-semibold mb-4">Leistungen</h3>
            <ul className="space-y-3 text-slate-300">
              <li>
                <Link href="/leistungen" className="hover:text-sky-300 transition-colors">
                  Firmenwebsite
                </Link>
              </li>
              <li>
                <Link href="/leistungen" className="hover:text-sky-300 transition-colors">
                  Onepager
                </Link>
              </li>
              <li>
                <Link href="/leistungen" className="hover:text-sky-300 transition-colors">
                  Individuelle Weblösungen
                </Link>
              </li>
              <li>
                <Link href="/leistungen" className="hover:text-sky-300 transition-colors">
                  Hosting & Wartung
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Kontakt */}
          <div>
            <h3 className="text-slate-50 font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-3 text-slate-300">
              <li>
                <Link href="/kontakt" className="hover:text-sky-300 transition-colors">
                  Projekt anfragen
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-sky-300 transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.contact.phoneResponse}`}
                  className="hover:text-sky-300 transition-colors"
                >
                  {siteConfig.contact.phoneDisplayMobile}
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 rounded-md border border-slate-700 hover:bg-slate-900 text-slate-200 transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between pt-8 border-t border-slate-800 text-slate-400 gap-4">
          <div className="text-center lg:text-left">
            © {currentYear} {siteConfig.name}. Alle Rechte vorbehalten.
          </div>

          <div className="flex flex-wrap justify-center lg:justify-end items-center gap-4 md:gap-6">
            <Link href="/impressum" className="hover:text-slate-200 transition-colors">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-slate-200 transition-colors">
              Datenschutz
            </Link>
            <Link href="/agb" className="hover:text-slate-200 transition-colors">
              Allgemeine Geschäftsbedingungen
            </Link>
            <button
              type="button"
              onClick={openCookieSettings}
              className="hover:text-slate-200 transition-colors cursor-pointer text-left"
            >
              Cookie-Einstellungen
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
