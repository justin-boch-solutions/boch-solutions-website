import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

export default function ProblemSolutionSection() {
  return (
    <section className="w-full flex justify-center py-24 px-6 bg-white text-slate-950">
      <div className="w-full max-w-7xl">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <FadeIn direction="right">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                Eine Website muss heute mehr können als nur gut aussehen.
              </h2>

              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                Viele Websites sehen ordentlich aus, liefern aber in der Praxis zu wenig:
                zu wenig Anfragen, zu wenig Bewerbungen, zu wenig Vertrauen und zu wenig klare Führung
                für potenzielle Kunden. Genau da setze ich an.
              </p>

              <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                Statt digitaler Visitenkarten baue ich Websites, die Leistungen verständlich zeigen,
                regional besser gefunden werden und Besuchern einen klaren nächsten Schritt geben.
                Das ist für Handwerksbetriebe in Münster genauso wichtig wie für Unternehmen in NRW
                oder Start-ups mit Kunden in ganz Deutschland.
              </p>

              <ul className="space-y-5 mb-8">
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 shrink-0 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Mehr qualifizierte Anfragen</h3>
                    <p className="text-sm text-slate-700 mt-1">
                      Nicht einfach nur mehr Klicks, sondern klarere Anfragen von Leuten, die wirklich zu deinem Angebot passen.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 shrink-0 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Bessere Bewerber & Azubis</h3>
                    <p className="text-sm text-slate-700 mt-1">
                      Eine klare Karriereseite und ein moderner Auftritt machen oft mehr aus als jede alte Standardanzeige.
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 shrink-0 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Weniger Rückfragen, weniger Chaos</h3>
                    <p className="text-sm text-slate-700 mt-1">
                      Saubere Inhalte, klare Struktur und durchdachte Formulare sparen dir Zeit im Alltag.
                    </p>
                  </div>
                </li>
              </ul>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/leistungen"
                  className="text-sky-700 font-semibold hover:text-sky-600 transition-colors"
                >
                  Leistungen ansehen →
                </Link>
                <Link
                  href="/faq"
                  className="text-slate-800 font-semibold hover:text-slate-950 transition-colors"
                >
                  Häufige Fragen →
                </Link>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <div className="bg-slate-50 rounded-3xl p-10 border border-slate-200 h-full flex flex-col justify-center relative shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-bl-full -z-0"></div>

              <h3 className="text-2xl font-bold text-slate-900 mb-6 relative z-10">
                Warum Justin Boch Solutions?
              </h3>

              <p className="text-slate-700 mb-6 relative z-10 leading-relaxed">
                Ich arbeite nicht mit aufgeblasenem Agentur-Gerede, sondern direkt, sauber und praxisnah.
                Du bekommst keinen anonymen Prozess, sondern einen festen Ansprechpartner, der zuhört,
                mitdenkt und die Website auf dein Ziel ausrichtet.
              </p>

              <div className="space-y-4 mb-8 relative z-10">
                <div className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-500 mt-2"></div>
                  <p className="text-slate-800 text-sm">
                    Klare Kommunikation statt technischer Nebelkerzen
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-500 mt-2"></div>
                  <p className="text-slate-800 text-sm">
                    Fokus auf Ergebnisse: Anfragen, Bewerbungen, Vertrauen
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-500 mt-2"></div>
                  <p className="text-slate-800 text-sm">
                    Saubere Umsetzung für Münster, NRW und Projekte in ganz Deutschland
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-500 mt-2"></div>
                  <p className="text-slate-800 text-sm">
                    Design, Technik und Weiterentwicklung aus einer Hand
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600 border-2 border-white shadow-sm">
                  JB
                </div>
                <div>
                  <p className="font-bold text-slate-900">Justin Boch</p>
                  <p className="text-sm text-slate-600">Gründer & direkter Ansprechpartner</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
