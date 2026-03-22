import Link from 'next/link';
import BeforeAfter from '@/components/BeforeAfter';

type Props = { params: Promise<{ slug: string }> };

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;

  const caseStudies: { [key: string]: any } = {
    'huesmann': {
      title: 'SHK-Betrieb Recruiting — Vom Fachkräftemangel zur vollen Warteliste',
      challenge: 'Der Handwerksbetrieb wuchs extrem schnell, aber es fehlte an qualifizierten Anlagenmechanikern. Die alte Website war eine reine "digitale Visitenkarte", nicht smartphone-optimiert und Interessenten mussten mühsam PDF-Lebensläufe per Email schicken – ein absoluter Conversion-Killer im modernen Recruiting.',
      solution: 'Wir haben eine hochmoderne Employer-Branding-Plattform entwickelt. Der Fokus liegt komplett auf der mobilen Nutzererfahrung. Über einen interaktiven 60-Sekunden-Bewerberfunnel können Fachkräfte nun problemlos auf dem Smartphone, ohne Anschreiben oder Lebenslauf, ihre Erstanfrage stellen.',
      testimonial: '„Wir hätten niemals gedacht, dass eine optimierte Website unser Personalproblem löst. Innerhalb der ersten 4 Wochen hatten wir 12 qualifizierte Bewerbungen von Anlagenmechanikern auf dem Tisch. Der Funnel ist ein Gamechanger." — Huesmann Geschäftsführung',
      results: ['+350% Bewerbungen', '60s Funnel-Dauer', '95% Mobile-Anteil', '1.8s Ladezeit'],
      tech: ['Next.js 16', 'Framer Motion', 'Tailwind CSS', 'Funnel-Logik'],
      before: '/Huesmannleistungenn alt.png',
      after: '/Huesmannleistungen neu.png',
    },
    'huesmann-leistungen': {
      title: 'Digitale Leistungsseiten — Klare Positionierung im Handwerk',
      challenge: 'Kunden wussten bei Huesmann oft nicht genau, welche Dienstleistungen (z.B. Wärmepumpen vs. klassische Heizung) konkret angeboten wurden. Die alten Unterseiten bestanden aus langen, unübersichtlichen Textblöcken ohne klare Handlungsaufforderung (Call-to-Action).',
      solution: 'Komplettes Redesign der Service-Seiten: Jede Leistung erhielt eine strukturierte Landingpage, die exakt auf die psychologischen Kaufmotive der Zielgruppe zugeschnitten ist. Vertrauenselemente (Siegel, Rezensionen) und sticky CTA-Buttons führen den Nutzer direkt zur Kontaktanfrage.',
      testimonial: '„Seit dem Redesign rufen die Kunden viel gezielter an und wissen bereits über unsere Wärmepumpen-Angebote Bescheid. Die Qualität der Anfragen ist massiv gestiegen." — Huesmann Leitung Kundenservice',
      results: ['+40% Konversionsrate', '-28% Absprungrate', 'SEO Top 3 lokal', '100% Barrierefrei'],
      tech: ['Next.js', 'Tailwind CSS', 'Local-SEO Strategie'],
      before: '/Huesmannleistungenn alt.png',
      after: '/Huesmannleistungen neu.png',
    },
    'onepager-hugo': {
      title: 'Fotografen Portfolio Onepager — Digitales Aushängeschild',
      challenge: 'Der Fotograf "Hugo / Dzirksts Studio" wollte seine Marke online professionell präsentieren, um hochpreisige Aufträge (Hochzeiten, Corporate) zu generieren. Eine einfache Instagram-Seite reichte dafür nicht mehr aus.',
      solution: 'Wir haben einen extrem cleanen und minimalistischen Onepager (Komplett neu erstellt) designt und entwickelt. Der Fokus liegt zu 100% auf den Bildern und einer glasklaren Kontaktmöglichkeit.',
      testimonial: '„Die neue Website sieht unglaublich hochwertig aus und spiegelt genau meine Leidenschaft und Qualität wider. Die ersten Premium-Kunden haben sich direkt über das Formular gemeldet." — Hugo',
      results: ['+60% Anfragen', '100% Neudesign', 'Perfekte Ladezeit', 'Desktop & Mobile'],
      tech: ['Next.js 16', 'Framer Motion', 'Tailwind CSS'],
      before: undefined,
      after: '/onepager.png',
      secondAfter: '/onepagerbild 2.png',
    },
    'jb-os': {
      title: 'SaaS Portal — Sichere Kundenverwaltung mit Automation',
      challenge: 'Ein Dienstleistungsunternehmen mit 200+ Kunden verwaltete Kommunikation, Rechnungen und Anfragen per Email und Excel. Das war fehleranfällig, teuer und langsam. Kunden fragten nach Transparenz.',
      solution: 'Custom-gebautes Kundenportal mit Authentifizierung, verschlüsselten Dokumenten, Rechnungs-Automation via Stripe und interaktivem Dashboard. Jeder Kunde sieht seinen Status live, keine Email-Chats mehr nötig.',
      testimonial: '„Das Portal hat unsere Kundenzufriedenheit um 40% gesteigert. Sie wissen immer, was mit ihrem Projekt passiert — und wir haben endlich einen Single Source of Truth." — Robert Z., Geschäftsführer',
      results: ['+32% Conversion', '+250% MAU', '-20h Admin-Zeit/Woche', '99.9% Uptime'],
      tech: ['Next.js', 'TypeScript', 'Tailwind', 'PostgreSQL', 'Stripe API', 'NextAuth.js'],
      before: undefined,
      after: '/JB OS.png',
    },
  };
  const example = caseStudies[slug] || caseStudies['huesmann'];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto mb-10">
        <Link href="/projekte" className="text-sky-400">← Zurück zu Projekten</Link>
        <h1 className="text-4xl font-bold mt-6 mb-4">{example.title}</h1>
        <div className="flex gap-4 items-center mb-8 flex-wrap">
          {example.results.map((r: string) => (
            <span key={r} className="bg-slate-800 px-4 py-2 rounded-md text-sm font-semibold text-slate-200">{r}</span>
          ))}
        </div>
        <blockquote className="border-l-4 border-sky-400 pl-4 mb-8 text-slate-300 italic">{example.testimonial}</blockquote>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Das Problem</h2>
          <p className="text-slate-300 mb-10">{example.challenge}</p>

          <h2 className="text-2xl font-bold mb-4">Unsere Lösung</h2>
          <p className="text-slate-300 mb-10">{example.solution}</p>

          <h3 className="text-xl font-semibold mb-3">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {example.tech.map((t: string) => (
              <span key={t} className="bg-sky-500/10 text-sky-400 px-3 py-1 rounded-md text-sm border border-sky-500/20">{t}</span>
            ))}
          </div>
        </div>

        <div>
          {example.secondAfter ? (
            <div className="flex flex-col gap-6">
              <img src={example.after} alt={example.title} className="w-full rounded-2xl shadow-2xl border border-white/10 opacity-90 hover:opacity-100 transition-opacity duration-700 mx-auto cursor-pointer" />
              <img src={example.secondAfter} alt={example.title + ' Detail'} className="w-full rounded-2xl shadow-2xl border border-white/10 opacity-90 hover:opacity-100 transition-opacity duration-700 mx-auto cursor-pointer" />
            </div>
          ) : example.after && example.before ? (
            <BeforeAfter beforeSrc={example.before} afterSrc={example.after} alt={example.title} />
          ) : example.after ? (
            <img src={example.after} alt={example.title} className="w-full rounded-2xl shadow-2xl border border-white/10 opacity-90 hover:opacity-100 transition-opacity duration-700 mx-auto" />
          ) : (
            <div className="w-full aspect-video bg-slate-900 rounded-2xl flex flex-col items-center justify-center border border-slate-800 text-slate-700">
              <svg className="w-16 h-16 text-slate-800 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <span className="font-semibold text-xl">Bilder folgen in Kürze</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-10 mb-16">
        <h2 className="text-2xl font-bold mb-4">Ergebnis</h2>
        <p className="text-slate-300 mb-6">Nach der Implementierung zeigten sich schnell messbare Verbesserungen:</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {example.results.map((r: string) => (
            <div key={r} className="text-center">
              <p className="text-2xl font-bold text-sky-400">{r.split('|')[0].split(' ')[0]}</p>
              <p className="text-sm text-slate-400">{r.split(' ').slice(1).join(' ')}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-6">Ähnliche Ergebnisse auch für dein Projekt?</h2>
        <Link href="/kontakt" className="inline-block px-12 py-4 rounded-full bg-sky-500 text-slate-950 font-bold hover:bg-sky-400 transition">
          Lass uns darüber sprechen
        </Link>
      </div>
    </main>
  );
}
