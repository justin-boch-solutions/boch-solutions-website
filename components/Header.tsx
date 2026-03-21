"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const phoneHref = `tel:${siteConfig.contact.phoneResponse}`;
  const phoneDisplayDesktop = siteConfig.contact.phoneDisplayDesktop;
  const phoneDisplayMobile = siteConfig.contact.phoneDisplayMobile;

  function toggleMenu() {
    setIsOpen((prev) => !prev);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="fixed top-0 inset-x-0 w-full z-50 flex justify-center px-4 pt-6 pointer-events-none">
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full max-w-6xl rounded-[2rem] border transition-all duration-500 flex items-center justify-between px-6 lg:px-8 py-3 pointer-events-auto
          ${scrolled 
            ? "bg-black/40 backdrop-blur-2xl border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5)]" 
            : "bg-black/20 backdrop-blur-md border-transparent hover:bg-black/40 hover:border-white/[0.05]"}`}
      >
        {/* LOGO */}
        <Link href="/" className="flex flex-col group z-50 relative" onClick={closeMenu}>
          <div className="absolute -inset-4 bg-rose-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <span className="text-2xl md:text-3xl font-serif font-bold tracking-widest bg-gradient-to-r from-rose-400 to-sky-400 bg-clip-text text-transparent leading-none relative z-10 transition-transform group-hover:scale-105 duration-500">
            JUSTIN BOCH
          </span>
          <div className="flex items-center mt-1 relative z-10">
            <div className="h-[3px] w-[55%] bg-gradient-to-r from-rose-400 to-sky-400 rounded-full group-hover:w-[70%] transition-all duration-500"></div>
            <span className="text-[13px] font-serif font-bold text-slate-100 ml-2 leading-none tracking-wide">
              Solutions
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] font-semibold text-slate-300 tracking-wider uppercase">
          {['Leistungen', 'Projekte', 'Agentur', 'Ablauf', 'FAQ'].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} className="relative group overflow-hidden py-1">
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">{item}</span>
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-sky-500 -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            </Link>
          ))}
        </nav>

        {/* DESKTOP CTA */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href={phoneHref}
            className="flex items-center gap-2 text-slate-300 hover:text-white text-sm font-bold transition-colors group"
            aria-label={`Telefon ${phoneDisplayDesktop}`}
          >
            <svg className="w-4 h-4 text-sky-500 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {phoneDisplayDesktop}
          </a>

          <Link
            href="/kontakt"
            className="relative px-6 py-2.5 rounded-full bg-white text-black text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform duration-300 overflow-hidden group shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-sky-400 to-indigo-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            Starten
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          type="button"
          className="md:hidden p-2 text-white outline-none z-50 relative"
          onClick={toggleMenu}
        >
          <div className="w-6 flex flex-col items-end gap-1.5">
            <motion.span 
              animate={isOpen ? { rotate: 45, y: 8, backgroundColor: "#38bdf8" } : { rotate: 0, y: 0, backgroundColor: "#ffffff" }}
              className="w-full h-[2px] block transition-colors"
            ></motion.span>
            <motion.span 
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-4 h-[2px] bg-white block transition-all"
            ></motion.span>
            <motion.span 
              animate={isOpen ? { rotate: -45, y: -8, width: "100%", backgroundColor: "#38bdf8" } : { rotate: 0, y: 0, width: "100%", backgroundColor: "#ffffff" }}
              className="w-full h-[2px] block transition-colors"
            ></motion.span>
          </div>
        </button>
      </motion.div>

      {/* MOBILE FULLSCREEN OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl flex flex-col pt-32 px-6 pb-8 border-b border-white/10 pointer-events-auto"
          >
            <nav className="flex flex-col space-y-6 text-2xl font-black text-slate-100 tracking-wide">
              {['Startseite', 'Leistungen', 'Projekte', 'Agentur', 'Ablauf', 'FAQ'].map((item, i) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  key={item}
                >
                  <Link
                    href={item === 'Startseite' ? '/' : `/${item.toLowerCase()}`}
                    onClick={closeMenu}
                    className="block hover:text-sky-400 transition-colors"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-12 mt-8 border-t border-white/10 flex flex-col gap-6"
              >
                <a
                  href={phoneHref}
                  className="flex items-center gap-4 text-slate-300 text-lg font-bold"
                >
                  <div className="w-10 h-10 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-500 border border-sky-500/20">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  {phoneDisplayMobile}
                </a>

                <Link
                  href="/kontakt"
                  onClick={closeMenu}
                  className="w-full text-center py-5 rounded-2xl bg-white text-black text-lg font-black uppercase tracking-widest hover:scale-[1.02] transition-transform"
                >
                  Jetzt Starten
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
