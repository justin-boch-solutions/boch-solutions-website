import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

export default function Ablauf() {
  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center pt-32 pb-24 px-6 overflow-hidden">
      
      {/* Hero Bereich (Neue, klare Texte) */}
      <div className="text-center max-w-3xl mb-24 text-slate-50">
        <FadeIn direction="up">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-slate-800 bg-slate-900/50 text-xs text-slate-400 uppercase tracking-widest font-semibold">
            Der Prozess
          </div>
        </FadeIn>
        <FadeIn direction="up" delay={0.1}>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            So einfach läuft die <span className="text-sky-500">Zusammenarbeit.</span>
          </h1>
        </FadeIn>
        <FadeIn direction="up" delay={0.2}>
          <p className="text-lg text-slate-400">
            Du steckst im Tagesgeschäft. Wir in der Technik. Unser Prozess ist so aufgebaut, dass er dich minimal Zeit kostet. Wir arbeiten nicht mit Bauchgefühl, sondern nach einem festen System.
          </p>
        </FadeIn>
      </div>

      {/* Die Timeline (Dein edles Layout + Neue Texte + Zeit-Badges) */}
      <div className="w-full max-w-4xl relative">
        
        {/* Die vertikale Linie in der Mitte (nur auf Desktop sichtbar) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-800 -translate-x-1/2"></div>

        <div className="space-y-16 md:space-y-24 relative z-10">
          
          {/* SCHRITT 1 */}
          <FadeIn direction="up" delay={0.1}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
              <div className="md:w-1/2 md:text-right order-2 md:order-1 flex flex-col md:items-end">
                <h3 className="text-2xl font-bold text-slate-50 mb-4">1. Das 15-Minuten Erstgespräch</h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Wir lernen uns entspannt kennen (telefonisch oder per Video). Du erzählst uns von deinen aktuellen Herausforderungen. Wir sagen dir ehrlich, ob und wie wir dir helfen können. Kein Verkaufsdruck.
                </p>
                <div className="inline-flex items-center gap-2 text-sm text-emerald-500 font-medium bg-emerald-500/10 px-3 py-1.5 rounded-md">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Dein Zeitaufwand: 15 Minuten
                </div>
              </div>
              {/* Der Kreis in der Mitte */}
              <div className="w-16 h-16 rounded-2xl bg-slate-950 border-2 border-sky-500 text-sky-500 flex items-center justify-center text-xl font-bold shrink-0 order-1 md:order-2 shadow-[0_0_15px_rgba(14,165,233,0.3)] z-10">
                01
              </div>
              <div className="md:w-1/2 order-3 hidden md:block"></div>
            </div>
          </FadeIn>

          {/* SCHRITT 2 */}
          <FadeIn direction="up" delay={0.2}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
              <div className="md:w-1/2 hidden md:block order-1"></div>
              {/* Der Kreis in der Mitte */}
              <div className="w-16 h-16 rounded-2xl bg-slate-950 border-2 border-slate-700 text-slate-500 flex items-center justify-center text-xl font-bold shrink-0 order-1 md:order-2 z-10">
                02
              </div>
              <div className="md:w-1/2 order-2 md:order-3 flex flex-col md:items-start">
                <h3 className="text-2xl font-bold text-slate-50 mb-4">2. Strategie & Angebot</h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Wenn es passt, erarbeiten wir ein Konzept. Wir schauen uns an, was deine Konkurrenz macht und wie wir dich besser positionieren. Du erhältst ein klares, transparentes Festpreisangebot. Keine versteckten Kosten.
                </p>
                <div className="inline-flex items-center gap-2 text-sm text-emerald-500 font-medium bg-emerald-500/10 px-3 py-1.5 rounded-md">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Dein Zeitaufwand: 30 Minuten
                </div>
              </div>
            </div>
          </FadeIn>

          {/* SCHRITT 3 */}
          <FadeIn direction="up" delay={0.3}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
              <div className="md:w-1/2 md:text-right order-2 md:order-1 flex flex-col md:items-end">
                <h3 className="text-2xl font-bold text-slate-50 mb-4">3. Wir bauen. Du lehnst dich zurück.</h3>
                <p className="text-slate-400 leading-relaxed mb-4">
                  Nachdem du uns ein paar Infos geschickt hast, legen wir los. Design, Texte, Programmierung – wir machen alles fertig. Über einen Link kannst du den Fortschritt ansehen und den Entwurf bequem abnicken.
                </p>
                <div className="inline-flex items-center gap-2 text-sm text-emerald-500 font-medium bg-emerald-500/10 px-3 py-1.5 rounded-md">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Dein Zeitaufwand: Fast 0
                </div>
              </div>
              {/* Der Kreis in der Mitte */}
              <div className="w-16 h-16 rounded-2xl bg-slate-950 border-2 border-slate-700 text-slate-500 flex items-center justify-center text-xl font-bold shrink-0 order-1 md:order-2 z-10">
                03
              </div>
              <div className="md:w-1/2 order-3 hidden md:block"></div>
            </div>
          </FadeIn>

          {/* SCHRITT 4 */}
          <FadeIn direction="up" delay={0.4}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
              <div className="md:w-1/2 hidden md:block order-1"></div>
              {/* Der Kreis in der Mitte */}
              <div className="w-16 h-16 rounded-2xl bg-sky-500 text-slate-950 flex items-center justify-center text-xl font-bold shrink-0 order-1 md:order-2 shadow-[0_0_20px_rgba(14,165,233,0.4)] z-10">
                04
              </div>
              <div className="md:w-1/2 order-2 md:order-3 flex flex-col md:items-start">
                <h3 className="text-2xl font-bold text-slate-50 mb-4">4. Live-Gang & Betreuung</h3>
                <p className="text-slate-400 leading-relaxed">
                  Wir schalten das System live und testen die Performance. Ab dem ersten Tag fängt das System an, für dich zu arbeiten. Wenn du möchtest, kümmern wir uns im Anschluss dauerhaft um Updates, Sicherheit und Pflege.
                </p>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>

      {/* CTA Box unten (Dein horizontales Design, animiert) */}
      <FadeIn direction="up">
        <div className="w-full max-w-4xl mt-32 bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 text-center flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="text-left md:w-2/3">
            <h2 className="text-2xl font-bold text-slate-50 mb-2">Bereit für Schritt 1?</h2>
            <p className="text-slate-400">Lass uns herausfinden, ob wir dir helfen können. 100% kostenlos und unverbindlich.</p>
          </div>
          <div className="md:w-1/3 flex justify-end w-full">
            <Link href="/de/kontakt" className="w-full md:w-auto text-center px-8 py-4 rounded-md bg-sky-500 text-slate-950 font-bold text-lg hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/20">
              Termin vereinbaren
            </Link>
          </div>
        </div>
      </FadeIn>

    </main>
  );
}