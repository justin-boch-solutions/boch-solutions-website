import type { Metadata } from "next";
import { Inter, Space_Grotesk, Space_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { company } from "@/lib/constants";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { CookieBanner } from "@/components/consent/cookie-banner";
import { AnalyticsScripts } from "@/components/consent/analytics-scripts";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { BackToTop } from "@/components/ui/back-to-top";
import { StickyMobileCta } from "@/components/layout/sticky-mobile-cta";
import { EasterEggFx } from "@/components/easter-eggs/easter-egg-fx";
import { KonamiCode } from "@/components/easter-eggs/konami-code";
import { ConsoleGreeting } from "@/components/easter-eggs/console-greeting";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  weight: ["700"],
  subsets: ["latin"],
  // "optional": monospace vs. the sans-serif fallback have very different
  // character widths, so swapping fonts after paint reflows the hero
  // headline (a real CLS source we measured). "optional" avoids the swap
  // instead of just approximating its metrics.
  display: "optional",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: `${company.name} – ${company.tagline}`,
    template: `%s | ${company.name}`,
  },
  description:
    "Justin Boch - Solutions modernisiert die IT von Handwerksbetrieben auf Basis von Microsoft 365 & Azure – inklusive SEO/GEO, Google-Unternehmensprofil, Webdesign und individueller Software.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: company.name,
    title: `${company.name} – ${company.tagline}`,
    description:
      "IT-Modernisierung, Sichtbarkeit und individuelle Software für Handwerksbetriebe – auf Basis von Microsoft-Technologie.",
    url: company.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.name} – ${company.tagline}`,
    description:
      "IT-Modernisierung, Sichtbarkeit und individuelle Software für Handwerksbetriebe – auf Basis von Microsoft-Technologie.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${spaceMono.variable}`}
    >
      <body className="min-h-screen bg-background pb-14 font-sans text-foreground antialiased lg:pb-0">
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('jb-theme');if(t==='light')document.documentElement.setAttribute('data-theme','light');}catch(e){}})();`}
        </Script>
        <OrganizationJsonLd />
        <ScrollProgress />
        <Header />
        <main>{children}</main>
        <Footer />
        <BackToTop />
        <StickyMobileCta />
        <CookieBanner />
        <AnalyticsScripts />
        <Analytics />
        <EasterEggFx />
        <KonamiCode />
        <ConsoleGreeting />
      </body>
    </html>
  );
}
