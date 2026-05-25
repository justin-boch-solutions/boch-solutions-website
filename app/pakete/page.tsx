import Link from 'next/link';
import FadeIn from '@/components/FadeIn';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pakete & Bundles | JB Solutions',
  description: 'Unsere maßgeschneiderten Leistungspakete für deinen digitalen Erfolg. Von Starter-Paketen bis hin zu Custom Software & Apps.',
  alternates: {
    canonical: 'https://boch-solutions.de/pakete',
  },
};

const packages = [
  {
    title: 'Digitaler Startschuss',
    subtitle: 'Für Kunden ohne Website',
    description: 'Das perfekte Paket für den digitalen Einstieg. Wir sorgen dafür, dass du auf Google gefunden wirst und professionell kommunizierst.',
    features: [
      'Einrichtung Google My Business Profil',
      'Einrichtung Google Search Console',
      'Professionelles E-Mail-Setup (Microsoft 365)',
      'Digitale Visitenkarte für dein Unternehmen'
    ],
    highlight: false
  },
  {
    title: 'Performance & SEO Audit',
    subtitle: 'Für bestehende Websites',
    description: 'Wir analysieren deine bestehende Website bis ins kleinste Detail und zeigen dir, wo du aktuell Kunden und Umsatz verlierst.',
    features: [
      'Kompletter technischer SEO-Check',
      'Tiefenanalyse der Ladezeiten & Performance',
      'Identifikation von Conversion-Killern',
      'Konkreter Maßnahmenkatalog zur Verbesserung'
    ],
    highlight: true // Visuell hervorheben
  },
  {
    title: 'Custom Software & App',
    subtitle: 'Die Premium-Lösung',
    description: 'Wenn Standard-Software nicht reicht. Wir entwickeln deine individuelle Plattform oder App von Grund auf nach deinen Wünschen.',
    features: [
      'Individuelle Softwareentwicklung (nach Maß)',
      'Eigene, hochsichere Datenbank',
      'Setup & Hosting auf dediziertem Hetzner Server',
      'Release als App für Apple iOS, Android & Windows'
    ],
    highlight: false
  },
  {
    title: 'Rundum-Sorglos Wartung',
    subtitle: 'Für maximale Sicherheit',
    description: 'Lehn dich zurück. Wir kümmern uns um die technische Instandhaltung, Sicherheit und Updates deiner digitalen Präsenz.',
    features: [
      'Premium Cloud-Hosting',
      'Wöchentliche Updates & Backups',
      'Proaktive Security-Checks',
      'Bevorzugter Premium Support'
    ],
    highlight: false
  }
];

export default function Pakete() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center pt-32 pb-24 px-6 overflow-hidden">
      
      {/* Header Bereich */}
      <div className="text-center max-w-3xl mb-20 text-slate-50">
        <FadeIn direction="up">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 text-xs text-sky-400 uppercase tracking-widest font-semibold">
            Unsere Pakete
          </div>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.1}>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Lösungen für deinen <span className="text-sky-500">Bedarf.</span>
          </h1>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.2}>
          <p className="text-lg text-slate-400">
            Finde das passende Paket für deine aktuelle Situation. Egal ob du komplett neu startest oder deine bestehenden Prozesse auf das nächste Level heben willst.
          </p>
        </FadeIn>
      </div>

      {/* Pakete Grid */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {packages.map((pkg, index) => (
          <FadeIn key={index} direction="up" delay={0.1 * index}>
            <div className={`h-full relative bg-slate-900/50 border rounded-3xl p-8 flex flex-col transition-all hover:-translate-y-2 hover:shadow-2xl ${
              pkg.highlight 
                ? 'border-sky-500/50 shadow-sky-900/20' 
                : 'border-slate-800 hover:border-slate-700'
            }`}>
              {pkg.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sky-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                  Beliebteste Wahl
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-sky-500 text-sm font-bold uppercase tracking-wider mb-2">{pkg.subtitle}</h3>
                <h2 className="text-2xl font-bold text-slate-50 mb-4">{pkg.title}</h2>
                <p className="text-slate-400 text-sm leading-relaxed">{pkg.description}</p>
              </div>

              <div className="mb-8 flex-grow">
                <ul className="space-y-4">
                  {pkg.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3 text-slate-300 text-sm">
                      <svg className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <div className="text-center py-4 mb-4 rounded-xl bg-slate-950/50 border border-slate-800">
                  <span className="text-slate-300 font-medium">Preis auf Anfrage</span>
                </div>
                <Link 
                  href="/kontakt" 
                  className={`block w-full text-center py-4 rounded-xl font-bold transition-colors ${
                    pkg.highlight
                      ? 'bg-sky-500 text-white hover:bg-sky-400'
                      : 'bg-white text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  Jetzt anfragen
                </Link>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* CTA Section für Pakete */}
      <div className="mt-24 w-full max-w-4xl text-center">
        <FadeIn direction="up">
          <h2 className="text-3xl font-bold text-slate-50 mb-6">Dein Wunschpaket ist nicht dabei?</h2>
          <p className="text-slate-400 mb-8 text-lg">
            Kein Problem. Wir stellen dir gerne ein komplett individuelles Paket zusammen, das zu 100% auf deine Anforderungen zugeschnitten ist.
          </p>
          <Link href="/kontakt" className="inline-block bg-transparent border-2 border-slate-700 text-slate-50 font-bold py-4 px-8 rounded-xl hover:bg-slate-800 transition-colors">
            Individuelles Angebot anfordern
          </Link>
        </FadeIn>
      </div>

    </main>
  );
}
