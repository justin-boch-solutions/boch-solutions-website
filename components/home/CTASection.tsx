"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section className="relative w-full py-32 flex justify-center items-center overflow-hidden bg-black border-t border-white/5">
      {/* Core Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-sky-500/20 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-5xl text-center px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-12 md:p-24 backdrop-blur-2xl shadow-2xl relative overflow-hidden group"
        >
          {/* Inner Abstract Ring */}
          <div className="absolute -top-40 -right-40 w-96 h-96 border border-sky-500/20 rounded-full opacity-50 blur-[2px] group-hover:scale-150 transition-transform duration-1000"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 border border-indigo-500/20 rounded-full opacity-50 blur-[2px] group-hover:scale-150 transition-transform duration-1000"></div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter relative z-10">
            Bereit für die <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">Transformation?</span>
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto relative z-10 leading-relaxed">
            Lass uns in einem kurzen 15-Minuten-Call klären, wie viel Potenzial in deinem aktuellen digitalen Auftritt brachliegt. 100% kostenlos und ohne Sales-Druck.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative z-10">
            <Link href="/kontakt" className="relative group/btn rounded-full p-[2px] overflow-hidden shadow-[0_0_40px_rgba(14,165,233,0.3)] hover:shadow-[0_0_60px_rgba(14,165,233,0.5)] transition-shadow duration-500">
              <span className="absolute inset-0 bg-gradient-to-r from-sky-400 via-indigo-500 to-sky-400 opacity-80 group-hover/btn:opacity-100 blur-[1px]"></span>
              <div className="relative bg-black group-hover/btn:bg-slate-950 px-10 py-5 rounded-full flex items-center justify-center font-bold text-lg text-white transition-colors duration-300">
                Kostenlose Potenzialanalyse
              </div>
            </Link>

            <Link href="/faq" className="px-10 py-5 rounded-full border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white font-bold text-lg transition-all duration-300 flex items-center justify-center backdrop-blur-md">
              Erst FAQ lesen
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
