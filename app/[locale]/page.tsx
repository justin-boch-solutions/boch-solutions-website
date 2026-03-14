import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full bg-slate-950 overflow-hidden">
      {/* 1. HERO SEKTION – bewusst ohne FadeIn für besseres LCP */}
      <section className="w-full flex justify-center pt-32 pb-24 px-6 border-b border-slate-900 relative">
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="text-center max-w-5xl text-slate-50 relative z-10">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-slate-800 bg-slate-900/50 text-xs text-sky-300 uppercase tracking-widest font-semibold">
            Webdesign für Handwerk, Unternehmen und Start-ups in Münster, NRW und ganz Deutschland
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Webdesign, das <span className="text-sky-400">Anfragen, Bewerbungen und Vertrauen</span> bringt.
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Ich entwickle moderne Websites für Handwerksbetriebe, regionale Unternehmen und ambitionierte Start-ups.
            Der Fokus liegt auf klarer Struktur, besserer Sichtbarkeit bei Google, mehr qualifizierten Anfragen
            und einem professionellen Auftritt in Münster, NRW und deutschlandweit.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <Link
              href="/de/kontakt"
              className="w-full sm:w-auto px-8 py-4 rounded-md bg-sky-500 text-slate-950 font-bold text-lg hover:bg-sky-400 transition-all shadow-[0_0_20px_rgba(14,165,233,0.2)]"
            >
              Kostenlose Potenzialanalyse
            </Link>
            <Link
              href="#zielgruppen"
              className="w-full sm:w-auto px-8 py-4 rounded-md border border-slate-800 bg-slate-900/50 text-slate-200 font-medium hover:bg-slate-800 hover:text-slate-50 transition-colors"
            >
              Für wen das sinnvoll ist
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm font-medium text-slate-300">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Direkt aus Münster
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Projekte in NRW & Deutschland
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Fester Ansprechpartner statt Hotline
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM / LÖSUNG */}
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
                      <h4 className="font-bold text-slate-900">Mehr qualifizierte Anfragen</h4>
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
                      <h4 className="font-bold text-slate-900">Bessere Bewerber & Azubis</h4>
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
                      <h4 className="font-bold text-slate-900">Weniger Rückfragen, weniger Chaos</h4>
                      <p className="text-sm text-slate-700 mt-1">
                        Saubere Inhalte, klare Struktur und durchdachte Formulare sparen dir Zeit im Alltag.
                      </p>
                    </div>
                  </li>
                </ul>

                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/de/leistungen"
                    className="text-sky-700 font-semibold hover:text-sky-600 transition-colors"
                  >
                    Leistungen ansehen →
                  </Link>
                  <Link
                    href="/de/faq"
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

      {/* 3. ZIELGRUPPEN / SEO SUBSTANZ */}
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

      {/* 4. WARUM EINE STARKE WEBSITE WICHTIG IST */}
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

      {/* 5. PROZESS */}
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

      {/* 6. LEISTUNGEN */}
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
                <Link href="/de/leistungen" className="text-sky-400 text-sm font-bold flex items-center gap-2 group-hover:text-sky-300">
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
                <Link href="/de/leistungen" className="text-sky-400 text-sm font-bold flex items-center gap-2 group-hover:text-sky-300">
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
                <Link href="/de/leistungen" className="text-sky-400 text-sm font-bold flex items-center gap-2 group-hover:text-sky-300">
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
                <Link href="/de/leistungen" className="text-sky-400 text-sm font-bold flex items-center gap-2 group-hover:text-sky-300">
                  Mehr erfahren <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 7. INTERNE LINKS / ORIENTIERUNG */}
      <section className="w-full flex justify-center py-20 px-6 bg-white text-slate-950 border-t border-slate-200">
        <div className="w-full max-w-7xl">
          <FadeIn direction="up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                Mehr Orientierung auf einen Blick
              </h2>
              <p className="text-slate-700 text-lg max-w-2xl mx-auto">
                Du willst nicht lange suchen? Hier kommst du direkt zu den wichtigsten Bereichen.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FadeIn direction="up" delay={0.05}>
              <Link href="/de/leistungen" className="block bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:bg-slate-100 transition-colors h-full">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Leistungen</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Alle Angebote im Überblick – von Onepagern bis zu individuellen Weblösungen.
                </p>
              </Link>
            </FadeIn>

            <FadeIn direction="up" delay={0.1}>
              <Link href="/de/faq" className="block bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:bg-slate-100 transition-colors h-full">
                <h3 className="text-xl font-bold text-slate-900 mb-3">FAQ</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Antworten auf wichtige Fragen zu Ablauf, Kosten, Betreuung und Umsetzung.
                </p>
              </Link>
            </FadeIn>

            <FadeIn direction="up" delay={0.15}>
              <Link href="#prozess" className="block bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:bg-slate-100 transition-colors h-full">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Zusammenarbeit</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  So läuft ein Projekt ab – klar, direkt und ohne unnötige Umwege.
                </p>
              </Link>
            </FadeIn>

            <FadeIn direction="up" delay={0.2}>
              <Link href="/de/kontakt" className="block bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:bg-slate-100 transition-colors h-full">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Kontakt</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  Direkt anfragen und gemeinsam schauen, was für dein Unternehmen sinnvoll ist.
                </p>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section className="w-full flex justify-center py-20 px-6 bg-sky-500 text-slate-950 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>

        <FadeIn direction="up">
          <div className="w-full max-w-4xl text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Klingt nach dem, was du suchst?
            </h2>
            <p className="text-lg font-medium mb-10">
              Dann lass uns in einem kurzen Gespräch klären, ob und wie ich dir bei deiner Website helfen kann.
              Ohne Druck, aber mit klarem Blick auf Nutzen und Aufwand.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/de/kontakt"
                className="inline-block px-10 py-4 rounded-md bg-slate-950 text-sky-400 font-bold text-lg hover:bg-slate-900 transition-all hover:scale-105 shadow-2xl"
              >
                Jetzt unverbindlich anfragen
              </Link>
              <Link
                href="/de/faq"
                className="inline-block px-10 py-4 rounded-md border border-slate-900 text-slate-950 font-bold text-lg hover:bg-sky-400 transition-all"
              >
                Erst FAQ ansehen
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
