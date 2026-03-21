import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

export default function ServicesSection() {
  return (
    <section id="leistungen" className="w-full flex justify-center py-24 px-6 border-t border-slate-900">
      <div className="w-full max-w-7xl">
        <FadeIn direction="up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-50 mb-4 tracking-tight">
              Was ich für dich umsetzen kann
            </h2>
            <p className="text-slate-300 text-lg max-w-3xl mx-auto">
              Keine Baukästen von der Stange. Sondern Lösungen, die zu deinem Betrieb, deinem Angebot und deinem aktuellen Stand passen.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FadeIn direction="up" delay={0.05}>
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:bg-slate-900 transition-colors group h-full flex flex-col">
              <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center mb-6 text-sky-400 group-hover:scale-110 transition-transform font-bold">
                01
              </div>
              <h3 className="text-xl font-bold text-slate-50 mb-3">Onepager</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-grow">
                Schnell, kompakt und klar. Ideal für lokale Angebote, erste Werbekampagnen oder einen sauberen Start mit Fokus auf Kontakt.
              </p>
              <Link href="/leistungen" className="text-sky-400 text-sm font-bold flex items-center gap-2 group-hover:text-sky-300">
                Mehr erfahren <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:bg-slate-900 transition-colors group h-full flex flex-col">
              <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center mb-6 text-sky-400 group-hover:scale-110 transition-transform font-bold">
                02
              </div>
              <h3 className="text-xl font-bold text-slate-50 mb-3">Firmenwebsite</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-grow">
                Dein digitales Aushängeschild mit klarer Struktur, starker Wirkung und verständlichen Leistungsseiten für Kunden und Bewerber.
              </p>
              <Link href="/leistungen" className="text-sky-400 text-sm font-bold flex items-center gap-2 group-hover:text-sky-300">
                Mehr erfahren <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.15}>
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:bg-slate-900 transition-colors group h-full flex flex-col">
              <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center mb-6 text-sky-400 group-hover:scale-110 transition-transform font-bold">
                03
              </div>
              <h3 className="text-xl font-bold text-slate-50 mb-3">Kundenportale</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-grow">
                Wenn Standardseiten nicht mehr reichen: individuelle Portale und Weblösungen, die Abläufe vereinfachen und Prozesse digitaler machen.
              </p>
              <Link href="/leistungen" className="text-sky-400 text-sm font-bold flex items-center gap-2 group-hover:text-sky-300">
                Mehr erfahren <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl hover:bg-slate-900 transition-colors group h-full flex flex-col">
              <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center mb-6 text-sky-400 group-hover:scale-110 transition-transform font-bold">
                04
              </div>
              <h3 className="text-xl font-bold text-slate-50 mb-3">Wartung & Betreuung</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6 flex-grow">
                Updates, Sicherheit, technische Pflege und Weiterentwicklung – damit deine Website nicht nur online ist, sondern sauber läuft.
              </p>
              <Link href="/leistungen" className="text-sky-400 text-sm font-bold flex items-center gap-2 group-hover:text-sky-300">
                Mehr erfahren <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
