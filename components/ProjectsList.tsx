"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
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
  color: string;
};

const PROJECTS: Project[] = [
  {
    slug: 'huesmann-leistungen',
    title: 'Huesmann Heizung & Sanitär',
    category: 'Handwerk',
    excerpt: 'Verkaufspsychologisch optimierte Leistungsseiten für Wärmepumpen und Badsanierung. Komplette Neuausrichtung der digitalen Leadgenerierung.',
    tags: ['Webdesign', 'SEO', 'LeadGen', 'Next.js'],
    metric: '+40% Anfragen-Qualität',
    before: '/Huesmannwebseite alt.png',
    after: '/Huesmannwebseite neu.png',
    color: 'from-blue-500/20 to-cyan-500/20'
  },
  {
    slug: 'onepager-hugo',
    title: 'Elias Vance Photography',
    category: 'Portfolio',
    excerpt: 'Minimalistische und hochkonvertierende Portfolio-Seite für einen High-End Fotografen. Maximaler Fokus auf großflächige Bildsprache und flüssige Animationen.',
    tags: ['Next.js', 'Framer Motion', 'Design'],
    metric: 'Maximaler Fokus auf Bilder',
    after: '/onepager.png',
    color: 'from-stone-500/20 to-neutral-500/20'
  },
  {
    slug: 'jb-os',
    title: 'JB OS Kundenportal',
    category: 'Software',
    excerpt: 'Custom-gebautes Kundenportal mit sicherer Authentifizierung, verschlüsselten Dokumenten, Rechnungs-Management und interaktivem Dashboard.',
    tags: ['React', 'Dashboard', 'SaaS', 'Backend'],
    metric: 'Prozesse zu 100% automatisiert',
    after: '/JB OS.png',
    color: 'from-indigo-500/20 to-purple-500/20'
  },
  {
    slug: 'dachdecker-weber',
    title: 'Dachdecker Weber',
    category: 'Handwerk',
    excerpt: 'Vollständiger Relaunch der Unternehmenswebsite mit integriertem Dach-Konfigurator zur Vorqualifizierung von Premium-Aufträgen.',
    tags: ['Webdesign', 'Local SEO', 'Konfigurator'],
    metric: 'Verdopplung der Sichtbarkeit',
    after: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop', // Beautiful house/roof
    color: 'from-orange-500/20 to-amber-500/20'
  },
  {
    slug: 'architektur-k',
    title: 'Studio K. Architektur',
    category: 'Agentur',
    excerpt: 'Eine immersive digitale Erfahrung für ein renommiertes Architekturbüro. Nutzung von WebGL und 3D-Rendern für maximale visuelle Dominanz.',
    tags: ['Webdesign', 'Branding', 'WebGL'],
    metric: 'Award Winning Design',
    after: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop', // Abstract architecture
    color: 'from-emerald-500/20 to-teal-500/20'
  }
];

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.2 1"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [150, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);

  const isEven = index % 2 === 0;

  return (
    <motion.div 
      ref={ref}
      style={{ y, opacity, scale }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center w-full mb-32 lg:mb-48`}
    >
      {/* Text Content */}
      <div className="w-full lg:w-5/12 flex flex-col items-start z-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md">
            {project.category}
          </span>
          {project.metric && (
            <span className="text-sky-400 font-bold text-sm tracking-wide">
              {project.metric}
            </span>
          )}
        </div>
        
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-[1.1] hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-white hover:to-slate-400 transition-all duration-300">
          {project.title}
        </h2>
        
        <p className="text-slate-400 text-lg leading-relaxed mb-8">
          {project.excerpt}
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          {project.tags.map(tag => (
            <span key={tag} className="text-xs font-semibold text-slate-500 uppercase tracking-wider bg-slate-900/50 px-3 py-1 rounded-md border border-white/5">
              #{tag}
            </span>
          ))}
        </div>

        <Link 
          href="/kontakt" 
          className="group relative inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white transition-all duration-300 bg-white/10 border border-white/20 rounded-full hover:bg-white hover:text-black overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            Projekt anfragen
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </span>
        </Link>
      </div>

      {/* Image/Visual Content */}
      <div className="w-full lg:w-7/12 relative group perspective-1000">
        <div className={`absolute inset-0 bg-gradient-to-tr ${project.color} blur-[100px] opacity-40 group-hover:opacity-60 transition-opacity duration-700 -z-10 rounded-full`}></div>
        
        <motion.div 
          whileHover={{ rotateY: isEven ? -5 : 5, rotateX: 5, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform-style-3d"
        >
          {project.before && project.after ? (
            <BeforeAfter beforeSrc={project.before} afterSrc={project.after} alt={project.title} />
          ) : (
            <Image 
              src={project.after} 
              alt={project.title} 
              fill 
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-top transition-transform duration-1000 group-hover:scale-110" 
            />
          )}
          
          {/* Glass Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none flex items-end p-8">
            <span className="text-white font-bold tracking-widest uppercase text-sm border-b border-white/30 pb-1">Ansicht vergrößern</span>
          </div>
        </motion.div>
      </div>

    </motion.div>
  );
}

export default function ProjectsList() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
      <div className="flex flex-col w-full mt-20">
        {PROJECTS.map((p, index) => (
          <ProjectRow key={p.slug} project={p} index={index} />
        ))}
      </div>
    </section>
  );
}
