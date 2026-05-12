import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

export default function ProblemSolutionSection() {
  return (
    <section className="relative w-full flex justify-center py-32 px-6 overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[150px] pointer-events-none -translate-y-1/2"></div>
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-7xl relative z-10">
        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
          <FadeIn direction="right">
            <div>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-8 tracking-tight text-white leading-tight">
                Eine Website muss heute mehr können als nur gut aussehen.
              </h2>

              <p className="text-lg md:text-xl text-slate-200 mb-6 leading-relaxed font-medium">
                Viele Websites sehen ordentlich aus, liefern aber in der Praxis zu wenig:
                zu wenig Anfragen, zu wenig Bewerbungen, zu wenig Vertrauen und zu wenig klare Führung
                für potenzielle Kunden. <span className="text-white font-bold">Genau da setze ich an.</span>
              </p>

              <p className="text-lg text-slate-300 mb-10 leading-relaxed">
                Statt digitaler Visitenkarten baue ich Websites, die Leistungen verständlich zeigen,
                regional besser gefunden werden und Besuchern einen klaren nächsten Schritt geben.
                Das ist für Handwerksbetriebe in Münster genauso wichtig wie für Unternehmen in NRW
                oder Start-ups mit Kunden in ganz Deutschland.
              </p>

              <ul className="space-y-6 mb-12">
                {[
                  {
                    num: "1",
                    title: "Mehr qualifizierte Anfragen",
                    desc: "Nicht einfach nur mehr Klicks, sondern klarere Anfragen von Leuten, die wirklich zu deinem Angebot passen."
                  },
                  {
                    num: "2",
                    title: "Bessere Bewerber & Azubis",
                    desc: "Eine klare Karriereseite und ein moderner Auftritt machen oft mehr aus als jede alte Standardanzeige."
                  },
                  {
                    num: "3",
                    title: "Weniger Rückfragen, weniger Chaos",
                    desc: "Saubere Inhalte, klare Struktur und durchdachte Formulare sparen dir Zeit im Alltag."
                  }
                ].map((item, idx) => (
                  <li key={idx} className="group flex items-start gap-5 p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-sky-500/30 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-sky-500/10">
                    <div className="w-12 h-12 shrink-0 rounded-full bg-gradient-to-br from-sky-500/20 to-indigo-500/20 border border-sky-400/30 text-sky-300 flex items-center justify-center font-bold text-xl shadow-[0_0_20px_rgba(56,189,248,0.2)] group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all duration-300">
                      {item.num}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-xl group-hover:text-sky-300 transition-colors">{item.title}</h3>
                      <p className="text-base text-slate-300 mt-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-8 items-center">
                <Link
                  href="/leistungen"
                  className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-full font-bold hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300"
                >
                  Leistungen ansehen 
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
                <Link
                  href="/faq"
                  className="group flex items-center gap-2 text-slate-200 font-bold hover:text-white transition-colors"
                >
                  <span className="relative overflow-hidden">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">Häufige Fragen</span>
                    <span className="absolute inset-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-sky-400">Häufige Fragen</span>
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform text-sky-400">→</span>
                </Link>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <div className="relative group perspective-1000">
              {/* Animated Border Glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              
              <div className="bg-slate-900/80 backdrop-blur-3xl rounded-[2.5rem] p-10 md:p-12 border border-white/10 h-full flex flex-col justify-center relative shadow-2xl overflow-hidden transform transition-all duration-500 group-hover:border-white/20">
                {/* Internal Glow Background */}
                <div className="absolute -top-32 -right-32 w-80 h-80 bg-sky-500/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-sky-400/30 transition-colors duration-500"></div>
                <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none group-hover:bg-indigo-400/30 transition-colors duration-500"></div>

                <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6 relative z-10 tracking-tight">
                  Warum Justin Boch Solutions?
                </h3>

                <p className="text-slate-200 mb-10 relative z-10 leading-relaxed text-lg font-medium">
                  Ich arbeite nicht mit aufgeblasenem Agentur-Gerede, sondern direkt, sauber und praxisnah.
                  Du bekommst keinen anonymen Prozess, sondern einen festen Ansprechpartner, der zuhört,
                  mitdenkt und die Website auf dein Ziel ausrichtet.
                </p>

                <div className="space-y-6 mb-12 relative z-10">
                  {[
                    "Klare Kommunikation statt technischer Nebelkerzen",
                    "Fokus auf Ergebnisse: Anfragen, Bewerbungen, Vertrauen",
                    "Saubere Umsetzung für Münster, NRW und ganz Deutschland",
                    "Design, Technik und Weiterentwicklung aus einer Hand"
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-4 group/item">
                      <div className="relative mt-1">
                        <div className="w-3 h-3 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.8)] group-hover/item:scale-125 transition-transform duration-300"></div>
                        <div className="absolute inset-0 w-3 h-3 rounded-full bg-sky-400 animate-ping opacity-40"></div>
                      </div>
                      <p className="text-white text-lg font-medium group-hover/item:text-sky-100 transition-colors">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-6 relative z-10 mt-auto pt-8 border-t border-white/10">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-sky-500 to-indigo-500 rounded-full blur-md opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center font-black text-2xl text-white border-2 border-sky-400 relative z-10">
                      JB
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-white text-xl">Justin Boch</p>
                    <p className="text-base text-sky-300 font-semibold uppercase tracking-wider mt-1">Gründer & Experte</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
