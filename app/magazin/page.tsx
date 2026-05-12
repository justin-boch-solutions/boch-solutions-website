import { Metadata } from 'next';
import Link from 'next/link';
import { articles } from '@/lib/articles';

export const metadata: Metadata = {
  title: 'SEO Magazin | Ratgeber für Handwerker & Agenturen | JB Solutions',
  description: 'Aktuelle Artikel über Webdesign, Next.js, Local SEO und wie Handwerksbetriebe online planbar Neukunden gewinnen.',
  alternates: {
    canonical: 'https://boch-solutions.de/magazin',
  },
};

export default function MagazinPage() {
  return (
    <main className="flex flex-col items-center w-full bg-[#020617] min-h-screen pt-32 pb-24 px-4 sm:px-6">
      
      {/* Header Section */}
      <div className="w-full max-w-7xl mb-16 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
          Dein Wissen für <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400">
            Digitale Dominanz
          </span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
          Lies unsere neuesten Artikel über Performance, Design und Strategien, um deinen Betrieb in eine digitale Vertriebsmaschine zu verwandeln.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article) => (
          <Link 
            key={article.slug} 
            href={`/magazin/${article.slug}`}
            className="group relative flex flex-col justify-between p-8 rounded-3xl bg-slate-900/50 border border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] overflow-hidden h-full"
          >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 transition-colors duration-500 pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6 text-sm font-bold tracking-widest uppercase">
                <span className="text-indigo-400 bg-indigo-400/10 px-3 py-1 rounded-full">{article.category}</span>
                <span className="text-slate-500">{article.readTime}</span>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-300 transition-colors">
                {article.title}
              </h2>
              
              <p className="text-slate-400 line-clamp-3 mb-8">
                {article.excerpt}
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between mt-auto pt-6 border-t border-white/10">
              <span className="text-sm text-slate-500">{article.date}</span>
              <span className="text-indigo-400 font-bold group-hover:translate-x-1 transition-transform flex items-center">
                Artikel lesen <span className="ml-1">→</span>
              </span>
            </div>
          </Link>
        ))}
      </div>

    </main>
  );
}
