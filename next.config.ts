import type { NextConfig } from "next";

/**
 * Content-Security-Policy.
 *
 * script-src braucht 'unsafe-inline', weil Next.js im App Router Inline-Skripte
 * für die Hydration einsetzt und das gtag-init-Skript inline läuft. Sauberer
 * wäre eine Nonce pro Request — die erzwingt aber eine Middleware und damit
 * dynamisches Rendering für jede Seite. Für eine statische Marketing-Seite ist
 * das ein schlechter Tausch, deshalb bewusst 'unsafe-inline'.
 *
 * Alles andere ist eng gefasst: kein Plugin-Content, keine fremde Einbettung,
 * Formulare nur an die eigene Domain.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  // Google Tag Manager / gtag wird nur nach Einwilligung geladen (siehe AnalyticsScripts).
  // Vercel Web Analytics lädt sein Skript je nach Umgebung von va.vercel-scripts.com.
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  // next/font/google lädt die Schriften zur Buildzeit herunter, sie kommen von der eigenen Domain.
  "font-src 'self' data:",
  "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.g.doubleclick.net",
  "frame-src https://www.googletagmanager.com https://td.doubleclick.net",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ");

const permissionsPolicy = [
  "accelerometer=()",
  "autoplay=()",
  "camera=()",
  "display-capture=()",
  "encrypted-media=()",
  "fullscreen=(self)",
  "geolocation=()",
  "gyroscope=()",
  "magnetometer=()",
  "microphone=()",
  "midi=()",
  "payment=()",
  "picture-in-picture=()",
  "usb=()",
  "xr-spatial-tracking=()",
].join(", ");

const securityHeaders = [
  {
    // Zwei Jahre, inklusive Subdomains. 'preload' bewusst weggelassen:
    // der Eintrag in die Browser-Preload-Liste ist nur schwer rückgängig zu machen.
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Ergänzt frame-ancestors für ältere Browser.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: permissionsPolicy },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  // Entfernt "X-Powered-By: Next.js" - verrät sonst unnötig die eingesetzte Technik.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.boch-solutions.de" }],
        destination: "https://boch-solutions.de/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
