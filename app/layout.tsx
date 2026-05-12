import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientFloatingUi from "@/components/ClientFloatingUi";
import TopBanner from "@/components/TopBanner";
import Preloader from "@/components/Preloader";

const outfit = Outfit({ 
  subsets: ["latin"], 
  variable: "--font-outfit" 
});

export const metadata: Metadata = {
  metadataBase: new URL("https://boch-solutions.de"),
  title: "JB Solutions | Webdesign & digitale Systeme in Münster",
  description:
    "Agentur in Münster für digitale Skalierung. Wir bauen hochkonvertierende Landingpages, Firmenwebsites und Kundenportale für Handwerk und Start-ups.",
  keywords: [
    "Webdesign Münster",
    "Website erstellen lassen Münster",
    "Webdesign Agentur NRW",
    "Lead Generierung Handwerk",
    "Handwerker Website",
    "Next.js Entwickler Deutschland",
    "Digitale Skalierung",
    "Justin Boch",
    "E-Commerce Agentur Münster",
    "Online-Shop erstellen lassen",
    "Local SEO Handwerker",
    "Google Ranking verbessern"
  ],
  openGraph: {
    title: "JB Solutions | Webdesign & Vertriebsmaschinen (Münster)",
    description:
      "Planbare Neukunden durch intelligente Web- und Softwarelösungen. Lokal in Münster, aktiv in ganz Deutschland.",
    url: "https://boch-solutions.de",
    siteName: "JB Solutions",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "JB Solutions Vorschaubild",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "JB Solutions",
    image: "https://boch-solutions.de/og-image.png",
    "@id": "https://boch-solutions.de",
    url: "https://boch-solutions.de",
    telephone: "+4925128069471",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Münster",
      addressRegion: "Nordrhein-Westfalen",
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 51.9606649,
      longitude: 7.6261347,
    },
    areaServed: [
      "Münster",
      "Nordrhein-Westfalen",
      "Deutschland",
      "Österreich",
      "Schweiz",
    ],
    priceRange: "$$$",
    description:
      "Agentur für digitale Vertriebsmaschinen, Webdesign und Softwareentwicklung für Handwerksbetriebe und Start-ups.",
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Premium Webdesign",
          description: "Entwicklung hochkonvertierender Websites für mehr Anfragen."
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "E-Commerce & Online-Shops",
          description: "Erstellung von hochperformanten Online-Shops mit Shopify und WooCommerce."
        }
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Local SEO Optimierung",
          description: "Regionale Suchmaschinenoptimierung für Handwerker und Dienstleister."
        }
      }
    ]
  };

  return (
    <html lang="de">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${outfit.variable} font-sans bg-[#020617] text-slate-50 antialiased flex flex-col min-h-screen selection:bg-sky-500/30`}>
        <Preloader />
        <TopBanner />
        <Header />

        <div className="flex-grow">{children}</div>

        <Footer />
        <ClientFloatingUi />
      </body>
    </html>
  );
}
