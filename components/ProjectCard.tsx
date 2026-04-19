"use client";
import Link from 'next/link';
import BeforeAfter from './BeforeAfter';

type Project = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  tags: string[];
  metric?: string;
  before?: string;
  after: string;
};

import { motion } from 'framer-motion';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px" }}
      transition={{ duration: 0.8 }}
      className="group/card relative flex flex-col bg-[#050505] border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-white/10 shadow-2xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
      
      <div className="p-8 lg:p-10 flex flex-col z-10 bg-transparent relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 blur-[40px] rounded-full group-hover/card:scale-150 transition-transform duration-700 pointer-events-none"></div>
        
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="px-4 py-1.5 rounded-full bg-white/[0.03] text-sky-400 text-[10px] font-bold uppercase tracking-[0.2em] border border-white/10 backdrop-blur-md">{project.category}</span>
            {project.metric && <span className="text-sm font-semibold text-slate-300 drop-shadow-md">{project.metric}</span>}
          </div>
        </div>

        <h3 className="text-3xl font-bold text-slate-50 mb-4 group-hover/card:text-sky-400 transition-colors drop-shadow-lg">{project.title}</h3>
        <p className="text-slate-400 text-[15px] mb-8 font-medium leading-relaxed flex-grow">{project.excerpt}</p>

        <div className="mt-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 justify-between">
          <Link href={`/projekte/${project.slug}`} className="inline-flex items-center gap-2 text-white font-bold text-sm uppercase tracking-widest hover:text-sky-400 transition-colors group/link border-b border-transparent hover:border-sky-400 pb-1">
            Case Study
            <span className="group-hover/link:translate-x-1 transition-transform">→</span>
          </Link>

          <Link href="/kontakt" className="inline-flex items-center justify-center gap-2 bg-white text-black font-black px-6 py-3 rounded-full hover:scale-[1.02] hover:bg-sky-50 transition-all text-xs uppercase tracking-widest cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Ergebnis-Call
          </Link>
        </div>
      </div>

      <div className="w-full aspect-video min-h-[300px] bg-[#020202] relative overflow-hidden border-t border-white/5 flex items-center justify-center">
        {project.after && project.before ? (
          <BeforeAfter beforeSrc={project.before} afterSrc={project.after} alt={project.title} />
        ) : project.after ? (
          <Image src={project.after} alt={project.title} fill sizes="(max-width: 768px) 100vw, 50vw" priority className="object-cover object-top opacity-90 hover:opacity-100 transition-opacity duration-700" />
        ) : (
          <div className="text-slate-700 font-bold text-lg flex flex-col items-center gap-3">
            <svg className="w-10 h-10 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span>Bilder folgen in Kürze</span>
          </div>
        )}
      </div>
    </motion.article>
  );
}
