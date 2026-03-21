import FadeIn from '@/components/FadeIn';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum | JB Solutions',
  description: 'Impressum der Justin Boch Solutions. Werbeagentur und Webentwicklung aus Münster.',
};

export default function Impressum() {
  return (
    <main className="min-h-screen bg-slate-950 pt-40 pb-24 px-6 flex justify-center">
      <div className="max-w-3xl w-full text-slate-300">
        
        <FadeIn direction="up">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-12 tracking-tight">Impressum</h1>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.1}>
          <div className="space-y-8 leading-relaxed">
            
            <section>
              <h2 className="text-xl font-bold text-slate-50 mb-3">Angaben gemäß § 5 TMG</h2>
              <p>
                Justin Boch<br />
                JB Solutions<br />
                Königsberger Straße 174<br />
                48157 Münster<br />
                Deutschland
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-50 mb-3">Kontakt</h2>
              <p>
                Telefon: 0251 28069471<br />
                E-Mail: Kontakt@boch-solutions.de<br />
                Website: https://boch-solutions.de
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-50 mb-3">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
              <p>
                Justin Boch<br />
                Königsberger Straße 174<br />
                48157 Münster
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-50 mb-3">Umsatzsteuer</h2>
              <p>
                Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.
                {/* Falls du eine ID hast, lösche den Satz oben und nutze diesen: 
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE... */}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-50 mb-3">EU-Streitschlichtung</h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://ec.europa.eu/consumers/odr/</a>.<br />
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-50 mb-3">Verbraucher­streit­beilegung / Universal­schlichtungs­stelle</h2>
              <p>
                Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-50 mb-3">Haftung für Inhalte</h2>
              <p className="mb-4">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.
              </p>
              <p>
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-50 mb-3">Haftung für Links</h2>
              <p>
                Unsere Website enthält Links zu externen Websites Dritter. Auf deren Inhalte haben wir keinen Einfluss. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-50 mb-3">Urheberrecht</h2>
              <p>
                Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors.
              </p>
            </section>

          </div>
        </FadeIn>

      </div>
    </main>
  );
}