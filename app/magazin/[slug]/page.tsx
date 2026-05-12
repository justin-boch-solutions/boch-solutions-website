import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { articles, getArticleBySlug } from '@/lib/articles';

// Generiere statische Seiten zur Build-Time für maximale SEO-Performance
export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

// Dynamische Meta-Tags für jeden Artikel (Google liebt das)
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);
  
  if (!article) {
    return { title: 'Artikel nicht gefunden' };
  }

  return {
    title: `${article.seoMetadata.title} | JB Solutions`,
    description: article.seoMetadata.description,
    keywords: article.seoMetadata.keywords,
    alternates: {
      canonical: `https://boch-solutions.de/magazin/${article.slug}`,
    },
    openGraph: {
      title: article.seoMetadata.title,
      description: article.seoMetadata.description,
      type: 'article',
      publishedTime: article.date,
    }
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="flex flex-col items-center w-full bg-[#020617] min-h-screen pt-32 pb-24 px-4 sm:px-6 relative">
      
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <article className="w-full max-w-3xl relative z-10">
        
        {/* Back Button */}
        <Link 
          href="/magazin" 
          className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-12 font-medium"
        >
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Zurück zur Übersicht
        </Link>

        {/* Article Header */}
        <header className="mb-16">
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm font-bold tracking-widest uppercase text-slate-400">
            <span className="text-indigo-400 bg-indigo-400/10 px-3 py-1 rounded-full">{article.category}</span>
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime} Lesezeit</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-8 tracking-tight leading-[1.1]">
            {article.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-medium">
            {article.excerpt}
          </p>
        </header>

        {/* Article Content (Prose Styling without Plugin) */}
        <div 
          className="w-full max-w-none text-lg md:text-xl
                     [&>h2]:text-3xl [&>h2]:font-black [&>h2]:text-white [&>h2]:mt-16 [&>h2]:mb-6 [&>h2]:pb-4 [&>h2]:border-b [&>h2]:border-white/10 [&>h2]:tracking-tight
                     [&>h3]:text-2xl [&>h3]:font-black [&>h3]:text-white [&>h3]:mt-12 [&>h3]:mb-4 [&>h3]:tracking-tight
                     [&>p]:text-slate-300 [&>p]:leading-relaxed [&>p]:mb-8
                     [&>ul]:text-slate-300 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-8 [&>ul>li]:mb-3 [&>ul>li>strong]:text-white
                     [&>ol]:text-slate-300 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-8 [&>ol>li]:mb-3 [&>ol>li>strong]:text-white"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Article Footer CTA */}
        <div className="mt-24 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-900/50 to-slate-900/50 border border-indigo-500/20 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Bereit für deine eigene Vertriebsmaschine?</h3>
          <p className="text-slate-400 mb-8 max-w-lg mx-auto">
            Lass uns unverbindlich darüber sprechen, wie wir diese Strategien für deinen Betrieb umsetzen können.
          </p>
          <Link 
            href="/kontakt?mode=project" 
            className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold text-white transition-all duration-300 bg-indigo-600 rounded-full hover:bg-indigo-500 hover:scale-105"
          >
            Kostenlose Potenzialanalyse anfragen
          </Link>
        </div>

      </article>
    </main>
  );
}
