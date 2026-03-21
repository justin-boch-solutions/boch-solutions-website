import FadeIn from '@/components/FadeIn';

export default function ProcessSection() {
  return (
    <section id="prozess" className="w-full flex justify-center py-24 px-6 border-t border-slate-900">
      <div className="w-full max-w-7xl">
        <FadeIn direction="up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-50 mb-4 tracking-tight">
              So läuft die Zusammenarbeit ab
            </h2>
            <p className="text-slate-300 text-lg max-w-3xl mx-auto">
              Kein komplizierter Agenturprozess mit fünf Zwischenebenen. Sondern klar, direkt und verständlich.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <FadeIn direction="up" delay={0.05}>
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 h-full">
              <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center mb-6 text-sky-400 font-bold">
                01
              </div>
              <h3 className="text-xl font-bold text-slate-50 mb-3">Kennenlernen</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                In einem kurzen Gespräch klären wir, was du brauchst, wo aktuell Probleme liegen und welches Ziel die Website erfüllen soll.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 h-full">
              <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center mb-6 text-sky-400 font-bold">
                02
              </div>
              <h3 className="text-xl font-bold text-slate-50 mb-3">Struktur & Konzept</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Ich plane Aufbau, Inhalte, Nutzerführung und die wichtigsten Seiten so, dass sie nicht nur gut aussehen, sondern auch funktionieren.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.15}>
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 h-full">
              <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center mb-6 text-sky-400 font-bold">
                03
              </div>
              <h3 className="text-xl font-bold text-slate-50 mb-3">Umsetzung</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Danach wird die Website sauber entwickelt, auf Mobilgeräten geprüft und technisch so aufgebaut, dass sie schnell und modern läuft.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.2}>
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 h-full">
              <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center mb-6 text-sky-400 font-bold">
                04
              </div>
              <h3 className="text-xl font-bold text-slate-50 mb-3">Livegang & Betreuung</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Nach dem Go-live ist nicht Schluss. Auf Wunsch begleite ich Wartung, Anpassungen und Weiterentwicklung direkt mit.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
