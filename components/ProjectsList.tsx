"use client";
import { useMemo, useState } from 'react';
import ProjectCard from './ProjectCard';

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

const PROJECTS: Project[] = [
  {
    slug: 'jb-os',
    title: 'Digitales Kundenportal',
    category: 'SaaS Lösung',
    excerpt: 'Hochsicheres, maßgeschneidertes Dashboard für zentrale Kommunikation, Rechnungsverwaltung und Lead-Tracking mit Stripe-Integration.',
    tags: ['Next.js', 'Stripe', 'Postgres', 'TypeScript'],
    metric: '+32% Conversion | +250% MAU',
    before: '/messy_dashboard_mockup.png',
    after: '/JB OS.png',
  },
  {
    slug: 'huesmann',
    title: 'SHK-Betrieb Recruiting',
    category: 'Handwerk',
    excerpt: 'Kompletter Relaunch mit suchmaschinen-optimiertem Bewerber-Funnel, automatisiertem Lead-Scoring und CRM-Integration.',
    tags: ['Next.js', 'Tailwind', 'CRM API'],
    metric: '+45 Bewerber/Monat | +38% Anfragen',
    before: '/Huesmannwebseite alt.png',
    after: '/Huesmannwebseite.png',
  },
  {
    slug: 'real-estate',
    title: 'Vermarktungs-Onepager',
    category: 'Immobilien',
    excerpt: 'Performance-fokussierte Landingpage für Neubauprojekt mit 3D-Rundgang-Integration und automatisiertem Lead-Tracking.',
    tags: ['Next.js', '3D Tour', 'HubSpot CRM'],
    metric: '+28% Leads | 3.2s Ladezeit',
    before: '/old_website_mockup.png',
    after: '/real_estate_mockup.png',
  },
];

export default function ProjectsList() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('Alle');

  const categories = useMemo(() => ['Alle', ...Array.from(new Set(PROJECTS.map(p => p.category)))], []);

  const filtered = useMemo(() => {
    return PROJECTS.filter(p => {
      if (filter !== 'Alle' && p.category !== filter) return false;
      if (query && !(`${p.title} ${p.excerpt} ${p.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase()))) return false;
      return true;
    });
  }, [query, filter]);

  return (
    <section className="w-full max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="w-full md:w-2/3">
          <input
            aria-label="Projekte suchen"
            placeholder="Projekte suchen (z. B. Branche, Tech)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-slate-200"
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-3 py-2 rounded-full text-sm font-medium ${filter===c? 'bg-sky-500 text-slate-900':'bg-slate-800 text-slate-300'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-20">
        {filtered.map(p => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}
