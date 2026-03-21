import FadeIn from '@/components/FadeIn';

export default function TargetAudienceSection() {
  return (
    <section id="zielgruppen" className="w-full flex justify-center py-24 px-6 border-t border-slate-900">
      <div className="w-full max-w-7xl">
        <FadeIn direction="up">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-50 mb-4 tracking-tight">
              Für wen diese Websites besonders sinnvoll sind
            </h2>
            <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
              Ich arbeite vor allem mit Betrieben und Unternehmen, die online nicht einfach nur „da sein“,
              sondern gezielt besser auftreten, besser gefunden werden und mehr passende Anfragen bekommen wollen.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FadeIn direction="up" delay={0.05}>
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl h-full">
              <h3 className="text-2xl font-bold text-slate-50 mb-4">Handwerksbetriebe</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                Besonders für SHK, Elektrik, Bau, Ausbau, Service und regionale Gewerke ist eine starke Website heute
                oft der Unterschied zwischen „wird irgendwie gefunden“ und „bekommt echte Anfragen“.
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                Gerade in Münster und NRW suchen viele Kunden zuerst online. Wer dort unklar, alt oder austauschbar wirkt,
                verliert Vertrauen oft schon vor dem ersten Kontakt.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl h-full">
              <h3 className="text-2xl font-bold text-slate-50 mb-4">Regionale Unternehmen</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                Für lokale und regionale Unternehmen zählt ein professioneller Auftritt genauso:
                Leistungen klar zeigen, Vertrauen aufbauen und Interessenten sauber zum nächsten Schritt führen.
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                Ob Münster, ganz NRW oder überregional in Deutschland – die Website muss erklären,
                warum man genau dich anfragen sollte.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={0.15}>
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl h-full">
              <h3 className="text-2xl font-bold text-slate-50 mb-4">Start-ups</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                Gerade junge Unternehmen brauchen oft eine Website, die schnell professionell wirkt,
                das Angebot verständlich macht und erste Anfragen oder Gespräche auslöst.
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                Nicht überladen, nicht kompliziert – sondern klar, modern und auf Wachstum ausgelegt.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
