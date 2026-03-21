import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

export default function QuickLinksSection() {
  return (
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
            <Link href="/leistungen" className="block bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:bg-slate-100 transition-colors h-full">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Leistungen</h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                Alle Angebote im Überblick – von Onepagern bis zu individuellen Weblösungen.
              </p>
            </Link>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <Link href="/faq" className="block bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:bg-slate-100 transition-colors h-full">
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
            <Link href="/kontakt" className="block bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:bg-slate-100 transition-colors h-full">
              <h3 className="text-xl font-bold text-slate-900 mb-3">Kontakt</h3>
              <p className="text-slate-700 text-sm leading-relaxed">
                Direkt anfragen und gemeinsam schauen, was für dein Unternehmen sinnvoll ist.
              </p>
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
