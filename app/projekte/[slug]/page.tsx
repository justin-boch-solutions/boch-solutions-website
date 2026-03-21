import Link from 'next/link';
import BeforeAfter from '@/components/BeforeAfter';

type Props = { params: { slug: string } };

export default function CaseStudy({ params }: Props) {
  const { slug } = params;

  const caseStudies: { [key: string]: any } = {
    'huesmann': {
      title: 'SHK-Betrieb Recruiting — Von 5 zu 50+ Bewerbungen/Monat',
      challenge: 'Ein mittelständischer SHK-Betrieb mit 15 Mitarbeitern konnte trotz guter Handwerksqualität keine Fachkräfte rekrutieren. Die alte Website war veraltet, nicht responsive und hatte keine Bewerbungsmöglichkeit. Sie verloren ca. 3–4 potenzielle Mitarbeiter/Monat an die Konkurrenz.',
      solution: 'Kompletter Relaunch mit modernem Design, SEO-Optimierung, intuitiver Bewerbungsform, automatisiertem Lead-Scoring und direkter CRM-Integration. Jede Bewerbung wird sofort per Email + SMS notifiziert. KPIs live im Dashboard verfolgbar.',
      testimonial: '„Endlich bekommen wir die Bewerbungen, die wir brauchen. Die Website lädt schnell, ist schön und die Bewerber haben keine Hürden mehr. Das hat unseren Rekrutierungsprozess komplett verändert." — Thomas M., Inhaber',
      results: ['+45 Bewerber/Monat', '+38% Anfragen', '92% Mobile-Anteil', '2.1s Load Time'],
      tech: ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'HubSpot API', 'PostgreSQL', 'Nodemailer'],
      before: '/Huesmannwebseite-before.svg',
      after: '/Huesmannwebseite.png',
    },
    'real-estate': {
      title: 'Immobilien Onepager — 28% Lead-Steigerung in 6 Wochen',
      challenge: 'Ein Bauträger hatte ein Neubauprojekt, aber die alte Landingpage war langsam, hatte keine 3D-Präsentation und das Follow-up war manuell. Sie verloren potenzielle Käufer bereits nach 3 Sekunden.',
      solution: 'Neue Performance-fokussierte Seite mit integriertem 3D-Rundgang, Lead-Capture-Forms, automatisiertem Nurturing und Lighthouse-Score von 95+. Jeder Lead wird automatisch qualifiziert und ins CRM übertragen.',
      testimonial: '„Der 3D-Rundgang hat die Interessenten überzeugt, bevor sie überhaupt vorbeigekommen sind. Die Seite ist unglaublich schnell, und wir sparen täglich 2 Stunden manuelle Follow-ups." — Julia K., Projektleiterin',
      results: ['+28% Leads', '3.2s Load-Zeit', '95 Lighthouse Score', '+42% Conversion Rate'],
      tech: ['Next.js 16', 'Matterport 3D', 'Vercel CDN', 'HubSpot CRM', 'Stripe Webhooks'],
      before: '/real_estate_before.svg',
      after: '/real_estate_mockup.png',
    },
    'jb-os': {
      title: 'SaaS Portal — Sichere Kundenverwaltung mit Automation',
      challenge: 'Ein Dienstleistungsunternehmen mit 200+ Kunden verwaltete Kommunikation, Rechnungen und Anfragen per Email und Excel. Das war fehleranfällig, teuer und langsam. Kunden fragten nach Transparenz.',
      solution: 'Custom-gebautes Kundenportal mit Authentifizierung, verschlüsselten Dokumenten, Rechnungs-Automation via Stripe und interaktivem Dashboard. Jeder Kunde sieht seinen Status live, keine Email-Chats mehr nötig.',
      testimonial: '„Das Portal hat unsere Kundenzufriedenheit um 40% gesteigert. Sie wissen immer, was mit ihrem Projekt passiert — und wir haben endlich einen Single Source of Truth." — Robert Z., Geschäftsführer',
      results: ['+32% Conversion', '+250% MAU', '-20h Admin-Zeit/Woche', '99.9% Uptime'],
      tech: ['Next.js', 'TypeScript', 'Tailwind', 'PostgreSQL', 'Stripe API', 'NextAuth.js'],
      before: '/JB OS-before.svg',
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
          <BeforeAfter beforeSrc={example.before} afterSrc={example.after} alt={example.title} />
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
