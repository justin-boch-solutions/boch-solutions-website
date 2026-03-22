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
    slug: 'huesmann-leistungen',
    title: 'SHK Leistungsseiten',
    category: 'Handwerk',
    excerpt: 'Verkaufspsychologisch optimierte Leistungsseiten für Wärmepumpen und Badsanierung.',
    tags: ['Webdesign', 'SEO', 'LeadGen'],
    metric: '+40% Anfragen-Qualität',
    before: '/Huesmannwebseite alt.png',
    after: '/Huesmannwebseite neu.png',
  },
  {
    slug: 'onepager-hugo',
    title: 'Fotograf Onepager',
    category: 'Portfolio',
    excerpt: 'Minimalistische und hochkonvertierende Portfolio-Seite für Fotografen, komplett neu erstellt (ohne altes Design).',
    tags: ['Next.js', 'Portfolio', 'Design'],
    metric: 'Maximaler Fokus auf Bilder',
    before: undefined,
    after: '/onepager.png',
  },
  {
    slug: 'jb-os',
    title: 'SaaS Kundenportal',
    category: 'Software',
    excerpt: 'Custom-gebautes Kundenportal mit Authentifizierung, verschlüsselten Dokumenten und Dashboard.',
    tags: ['Next.js', 'Dashboard', 'SaaS'],
    metric: 'Prozesse automatisiert',
    before: undefined,
    after: '/JB OS.png',
  }
];

export default function ProjectsList() {
  return (
    <section className="w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-20">
        {PROJECTS.map(p => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}
