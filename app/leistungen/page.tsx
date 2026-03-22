import Link from 'next/link';
// WICHTIG: Hier holen wir uns den Animations-Baustein
import FadeIn from '@/components/FadeIn';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Leistungen | JB Solutions',
  description: 'Maßgeschneiderte Weblösungen: Onepager, conversion-optimierte Firmenwebsites, komplexe Kundenportale und sicheres Premium-Hosting.',
};

export default function Leistungen() {
  return (
    // overflow-hidden hinzugefügt, damit von der Seite einfliegende Elemente keinen horizontalen Scrollbalken machen
    <main className="min-h-screen bg-slate-950 flex flex-col items-center pt-32 pb-24 px-6 overflow-hidden">
      
      {/* Header Bereich - Kommt von unten */}
      <div className="text-center max-w-3xl mb-20 text-slate-50">
        <FadeIn direction="up">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-slate-800 bg-slate-900/50 text-xs text-slate-400 uppercase tracking-widest font-semibold">
            Unser Arsenal
          </div>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.1}>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Digitale Maßarbeit für deinen <span className="text-sky-500">Erfolg.</span>
          </h1>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.2}>
          <p className="text-lg text-slate-400">
            Wir verkaufen keine Standard-Themes. Wir entwickeln strategische Werkzeuge, die dein Unternehmen digital sichtbar machen, Prozesse automatisieren und Kunden gewinnen.
          </p>
        </FadeIn>
      </div>

      {/* Leistungs-Grid */}
      <div className="w-full max-w-6xl space-y-12">
        
        {/* LEISTUNG 1: Onepager - Kommt von LINKS */}
        <FadeIn direction="left">
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center hover:bg-slate-900/60 transition-colors">
            <div className="md:w-1/2">
              <div className="w-14 h-14 bg-slate-950 border border-slate-700 rounded-2xl flex items-center justify-center mb-6 text-sky-500 font-bold text-xl">
                01
              </div>
              <h2 className="text-3xl font-bold text-slate-50 mb-4">Onepager / Landingpage</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Kompakt, blitzschnell und messerscharf auf ein Ziel fokussiert. Perfekt für Handwerksbetriebe, die Handwerker oder Azubis suchen, oder für gezielte Werbekampagnen. Der Besucher wird ohne Ablenkung direkt zur Kontaktaufnahme geführt.
              </p>
              <div className="inline-block px-4 py-2 rounded-md bg-slate-950 border border-slate-800 text-sm text-slate-300 font-medium">
                Investition: Individuell nach Aufwand
              </div>
            </div>
            {/* HIER IST DEIN NEUER BLOCK */}
            <div className="md:w-1/2 bg-slate-950 rounded-2xl p-8 border border-slate-800 w-full">
              <h3 className="text-lg font-bold text-slate-50 mb-6">Das ist drin:</h3>
              <ul className="space-y-4">
                {[
                  'klare Struktur für Anfragen',
                  'optimiert für Smartphones',
                  'schnelle Ladezeiten',
                  'einfache Kontaktmöglichkeiten'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <svg className="w-6 h-6 text-sky-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>

        {/* LEISTUNG 2: Firmenwebsite - Kommt von RECHTS */}
        <FadeIn direction="right">
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row-reverse gap-12 items-center hover:bg-slate-900/60 transition-colors">
            <div className="md:w-1/2">
              <div className="w-14 h-14 bg-slate-950 border border-slate-700 rounded-2xl flex items-center justify-center mb-6 text-sky-500 font-bold text-xl">
                02
              </div>
              <h2 className="text-3xl font-bold text-slate-50 mb-4">Firmenwebsite</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Dein digitales Hauptquartier. Eine mehrseitige, SEO-optimierte Präsenz, die deine Marke massiv stärkt und Vertrauen bei Neukunden aufbaut. Wir strukturieren deine Leistungen so, dass sie verstanden und gekauft werden.
              </p>
              <div className="inline-block px-4 py-2 rounded-md bg-slate-950 border border-slate-800 text-sm text-slate-300 font-medium">
                Investition: Individuell nach Umfang
              </div>
            </div>
            <div className="md:w-1/2 bg-slate-950 rounded-2xl p-8 border border-slate-800 w-full">
              <h3 className="text-lg font-bold text-slate-50 mb-6">Das ist drin:</h3>
              <ul className="space-y-4">
                {['Mehrere Unterseiten (Leistungen, Über uns, etc.)', 'Suchmaschinenoptimierung (SEO) Basis', 'Dynamische Inhalte (z.B. Blog oder Projekte)', 'Performance-Optimierung für schnelle Ladezeiten'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <svg className="w-6 h-6 text-sky-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>

        {/* LEISTUNG 3: Individuelle Weblösung - Kommt von LINKS */}
        <FadeIn direction="left">
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center hover:bg-slate-900/60 transition-colors">
            <div className="md:w-1/2">
              <div className="w-14 h-14 bg-slate-950 border border-slate-700 rounded-2xl flex items-center justify-center mb-6 text-sky-500 font-bold text-xl">
                03
              </div>
              <h2 className="text-3xl font-bold text-slate-50 mb-4">Individuelle Weblösungen</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Wenn Standard-Software nicht mehr reicht. Wir programmieren maßgeschneiderte Kundenportale, Dashboards (wie das JB OS Pro) oder interne Tools, die exakt auf deine Unternehmensprozesse abgestimmt sind.
              </p>
              <div className="inline-block px-4 py-2 rounded-md bg-slate-950 border border-slate-800 text-sm text-slate-300 font-medium">
                Investition: Nach detaillierter Spezifikation
              </div>
            </div>
            <div className="md:w-1/2 bg-slate-950 rounded-2xl p-8 border border-slate-800 w-full">
              <h3 className="text-lg font-bold text-slate-50 mb-6">Das ist drin:</h3>
              <ul className="space-y-4">
                {['Komplett eigene Code-Basis (Next.js, React)', 'Anbindung an Datenbanken & APIs', 'Sichere Login- & Kundenbereiche', 'Skalierbar für tausende Nutzer'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <svg className="w-6 h-6 text-sky-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>

        {/* LEISTUNG 4: Hosting & Wartung - Kommt von RECHTS */}
        <FadeIn direction="right">
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row-reverse gap-12 items-center hover:bg-slate-900/60 transition-colors">
            <div className="md:w-1/2">
              <div className="w-14 h-14 bg-slate-950 border border-slate-700 rounded-2xl flex items-center justify-center mb-6 text-sky-500 font-bold text-xl">
                04
              </div>
              <h2 className="text-3xl font-bold text-slate-50 mb-4">Hosting & Wartung</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                Deine Website muss immer erreichbar, sicher und aktuell sein. Wir übernehmen das komplette technische Management im Hintergrund, damit du dich zu 100% auf dein Kerngeschäft konzentrieren kannst.
              </p>
              <div className="inline-block px-4 py-2 rounded-md bg-slate-950 border border-slate-800 text-sm text-slate-300 font-medium">
                Investition: Monatliche Pauschale
              </div>
            </div>
            <div className="md:w-1/2 bg-slate-950 rounded-2xl p-8 border border-slate-800 w-full">
              <h3 className="text-lg font-bold text-slate-50 mb-6">Das ist drin:</h3>
              <ul className="space-y-4">
                {['High-Speed Server Architektur', 'Automatische Sicherheits-Updates', 'Regelmäßige Backups deiner Daten', 'Technischer Premium-Support'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300">
                    <svg className="w-6 h-6 text-sky-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FadeIn>

      </div>

      {/* Zusatzleistungen - Kommt von unten */}
      <FadeIn direction="up">
        <div className="w-full max-w-6xl mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-4">Zusatzleistungen & Technik</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Alles, was dein digitales Fundament noch professioneller, sicherer und messbarer macht.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 transition-colors">
              <h3 className="text-xl font-bold text-slate-50 mb-3">Basis & Local SEO</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Technische und inhaltliche Grundoptimierung für Meta-Daten und maximale lokale Auffindbarkeit in deiner Region.</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 transition-colors">
              <h3 className="text-xl font-bold text-slate-50 mb-3">Google Firmenprofil</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Technische Einbindung und Grundeinrichtung deines Google My Business Profils für direkte Kartenanzeige.</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 transition-colors">
              <h3 className="text-xl font-bold text-slate-50 mb-3">Business E-Mail Setup</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Einrichtung professioneller E-Mail-Adressen (Inklusive Apple Mail / Outlook Anbindung für deine Endgeräte).</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 transition-colors">
              <h3 className="text-xl font-bold text-slate-50 mb-3">Cookie- & Analytics-Tech</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Rechtssichere technische Einbindung deines Cookie-Banners und sauberer Aufbau aller erforderlichen Analyse-Tools.</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 transition-colors">
              <h3 className="text-xl font-bold text-slate-50 mb-3">Domain & DNS Setup</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Ummeldung, Neuregistrierung und exakte technische DNS-Routing Einrichtung deiner Wunschdomain.</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 transition-colors">
              <h3 className="text-xl font-bold text-slate-50 mb-3">Performance & Bildpflege</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Webgerechte Optimierung, Zuschnitt und Einbindung riesiger Datenmengen ohne Verlust wertvoller Ladezeiten.</p>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Call to Action unten - Kommt von unten */}
      <FadeIn direction="up">
        <div className="w-full max-w-4xl mt-24 text-center bg-sky-500 rounded-3xl p-10 md:p-16 shadow-2xl shadow-sky-500/20">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-950 mb-6">Unschlüssig, was du brauchst?</h2>
          <p className="text-slate-900 text-lg mb-8 max-w-2xl mx-auto font-medium">
            Lass uns in einem kurzen, unverbindlichen Gespräch herausfinden, welche Lösung für deine aktuelle Situation den größten Hebel bietet.
          </p>
          <Link href="/kontakt" className="inline-block px-8 py-4 rounded-md bg-slate-950 text-sky-500 font-bold text-lg hover:bg-slate-900 transition-colors shadow-lg">
            Kostenlose Potenzialanalyse sichern
          </Link>
        </div>
      </FadeIn>

    </main>
  );
}