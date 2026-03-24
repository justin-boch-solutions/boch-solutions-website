import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://boch-solutions.de';

  // --- DYNAMISCHE PROJEKTE ---
  // Hier sind exakt deine vier aktuellen Case-Study-Slugs hinterlegt.
  // Wenn du in Zukunft ein neues Projekt hinzufügst, trägst du den Slug einfach hier mit ein!
  const projectSlugs = [
    'huesmann',
    'huesmann-leistungen',
    'onepager-hugo',
    'jb-os'
  ];

  const projectUrls = projectSlugs.map((slug) => ({
    url: `${baseUrl}/projekte/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    // --- 1. TIER: DIE WICHTIGSTEN SEITEN (Prio 1.0 - 0.9) ---
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0, 
    },
    {
      url: `${baseUrl}/leistungen`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projekte`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },

    // --- DEINE PROJEKTE (Automatisch eingefügt) ---
    ...projectUrls,

    // --- 2. TIER: VERTRAUEN & CONVERSION (Prio 0.8 - 0.7) ---
    {
      url: `${baseUrl}/agentur`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/ablauf`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // --- 3. TIER: RECHTLICHES (Prio 0.3) ---
    {
      url: `${baseUrl}/impressum`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/datenschutz`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/agb`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    }
  ];
}