import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    // Wichtig: Hier deine echte Domain eintragen!
    sitemap: 'https://justin-boch-solutions.de/sitemap.xml',
  };
}