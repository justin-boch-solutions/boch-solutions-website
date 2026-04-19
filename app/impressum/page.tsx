import FadeIn from '@/components/FadeIn';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum | JB Solutions',
  description: 'Offizielles Impressum der Justin Boch Solutions, Webdesign Agentur aus Münster. Finden Sie hier alle rechtlichen Angaben und Kontaktdaten zum Anbieter dieser Website.',
  alternates: {
    canonical: 'https://boch-solutions.de/impressum',
  },
};

export default function Impressum() {
  return (
    <main className="min-h-screen bg-black pt-40 pb-24 px-4 sm:px-6 flex justify-center selection:bg-sky-500/30">
      <div className="max-w-3xl w-full text-slate-300 relative z-10">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-sky-500/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

        <FadeIn direction="up">
          <h1 className="text-4xl md:text-5xl font-black text-slate-50 mb-16 tracking-tighter">Impressum</h1>
        </FadeIn>
        
        <div className="space-y-12 leading-relaxed">
            
            <section>
              <p className="text-lg text-slate-300">
                Justin Boch<br />
                Musterladen (Einzelunternehmer)<br />
                Königsberger Str. 174<br />
                48157 Münster
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4 tracking-tight">Kontakt</h2>
              <p className="text-slate-400">
                Telefon: +49 (0) 25128069471<br />
                E-Mail: kontakt@boch-solutions.de
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4 tracking-tight">Redaktionell verantwortlich</h2>
              <p className="text-slate-400">
                Justin Boch - Solutions<br />
                Königsberger Str. 174<br />
                48157 Münster
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4 tracking-tight">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
              <p className="text-slate-400">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

          </div>

      </div>
    </main>
  );
}