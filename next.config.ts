import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Dieser Schutz gilt für alle Seiten deines Projekts
        source: '/(.*)',
        headers: [
          {
            // Verhindert Clickjacking (niemand kann deine Seite unsichtbar überbauen)
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            // Verhindert, dass Browser den Datei-Typ erraten (XSS-Schutz)
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            // Kontrolliert, welche Infos beim Klicken auf externe Links mitgegeben werden
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            // Zwingt Browser, für ein Jahr nur noch über HTTPS mit deiner Seite zu sprechen
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;