import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

export default function CTASection() {
  return (
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
              href="/kontakt"
              className="inline-block px-10 py-4 rounded-md bg-slate-950 text-sky-400 font-bold text-lg hover:bg-slate-900 transition-all hover:scale-105 shadow-2xl"
            >
              Jetzt unverbindlich anfragen
            </Link>
            <Link
              href="/faq"
              className="inline-block px-10 py-4 rounded-md border border-slate-900 text-slate-950 font-bold text-lg hover:bg-sky-400 transition-all"
            >
              Erst FAQ ansehen
            </Link>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
