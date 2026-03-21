import FadeIn from '@/components/FadeIn';

export default function WhyWebsiteSection() {
  return (
    <section id="warum-website" className="w-full flex justify-center py-24 px-6 bg-white text-slate-950">
      <div className="w-full max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <FadeIn direction="right">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Warum eine gute Website heute geschäftlich relevant ist
              </h2>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                Früher reichte oft eine digitale Visitenkarte. Heute informieren sich Kunden,
                Bewerber und Geschäftspartner zuerst online. Sie vergleichen, prüfen Referenzen,
                schauen auf Leistungen, Öffnungszeiten, Kontaktwege und den Gesamteindruck.
              </p>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                Genau deshalb ist eine Website nicht nur „nice to have“, sondern Teil von Vertrieb,
                Vertrauen und Mitarbeitergewinnung. Wer hier schwach aufgestellt ist, verliert oft,
                bevor überhaupt ein Gespräch entsteht.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed">
                Eine gute Website hilft dir dabei, bei Google sichtbar zu sein, professionell zu wirken,
                Anfragen vorzufiltern und Interessenten direkt weiterzuführen – egal ob lokal in Münster,
                regional in NRW oder deutschlandweit.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <div className="grid gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 mb-2">Mehr Sichtbarkeit</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Klare Seitenstruktur, passende Inhalte und saubere Technik helfen dabei,
                  bei Google besser verstanden und gefunden zu werden.
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 mb-2">Mehr Vertrauen</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Ein sauberer Auftritt macht aus Skepsis schneller Interesse – und aus Interesse eher Kontakt.
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 mb-2">Mehr Struktur im Alltag</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Gute Inhalte und smarte Formulare sparen Rückfragen und bringen dir schneller die Infos,
                  die du wirklich brauchst.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
