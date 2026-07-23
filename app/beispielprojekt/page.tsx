import type { Metadata } from "next";
import { AlertCircle, Check } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { CtaSection } from "@/components/sections/cta-section";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { company } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Beispielprojekt",
  description:
    "Ein anonymisiertes Beispielprojekt zeigt, wie eine IT-Modernisierung für einen Handwerksbetrieb typischerweise abläuft – von der Ausgangslage bis zum Ergebnis.",
  alternates: { canonical: "/beispielprojekt" },
  robots: { index: true, follow: true },
};

const ausgangslage = [
  "Geschäftliche E-Mails liefen über private Gmail-Adressen der Mitarbeitenden.",
  "Angebote und Aufmaße lagen verteilt auf einzelnen Laptops, ohne einheitliches Backup.",
  "Die Webseite war seit Jahren nicht aktualisiert und auf dem Smartphone kaum bedienbar.",
  "Bei „Elektriker in [Ort]“ tauchte der Betrieb bei Google nicht auf der ersten Seite auf.",
];

const massnahmen = [
  {
    phase: "Strategie-Call & Architektur-Planung",
    detail:
      "Bestandsaufnahme der aktuellen IT- und Web-Situation, gemeinsame Priorisierung: zuerst Microsoft 365 und Sicherheit, danach Sichtbarkeit.",
  },
  {
    phase: "Umsetzung – IT-Grundlage",
    detail:
      "Einrichtung von Microsoft 365 mit professionellen E-Mail-Adressen auf eigener Domain, zentraler Dateiablage und automatisiertem Backup.",
  },
  {
    phase: "Umsetzung – Sichtbarkeit",
    detail:
      "Neue, mobil optimierte Webseite, vollständig eingerichtetes und optimiertes Google-Unternehmensprofil, lokale SEO-Grundlagen.",
  },
  {
    phase: "Skalierung & Wartung",
    detail:
      "Laufende Betreuung mit festem Ansprechpartner, regelmäßige Updates und Sicherheitskontrollen, kontinuierliche SEO-Pflege.",
  },
];

const ergebnis = [
  "Zentrale, sichere IT-Basis statt verstreuter Einzellösungen – mit Backup und klaren Zugriffsrechten.",
  "Deutlich bessere Auffindbarkeit bei Google und im Google-Unternehmensprofil.",
  "Spürbar mehr Anfragen über die neue Webseite, statt fast ausschließlich über Mundpropaganda.",
  "Weniger Zeit im Büro für IT-Probleme und Verwaltung, mehr Zeit für das Kerngeschäft.",
];

export default function BeispielprojektPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Startseite", url: company.url },
          { name: "Beispielprojekt", url: `${company.url}/beispielprojekt` },
        ]}
      />

      <Hero
        eyebrow="Beispielprojekt"
        title="So könnte Ihr Projekt aussehen"
        subtitle="Ein typischer Ablauf, zusammengefasst aus wiederkehrenden Ausgangssituationen bei Handwerksbetrieben – zur Orientierung, bevor Ihre echten Referenzen hier stehen."
        size="compact"
      />

      <Section className="border-b border-border bg-surface/30">
        <div className="mx-auto flex max-w-3xl items-start gap-3 rounded-xl border border-border-strong bg-surface-elevated p-5 text-sm text-muted">
          <AlertCircle className="mt-0.5 size-5 shrink-0 text-accent-secondary" />
          <p>
            Dieses Beispiel ist eine <strong className="text-foreground">anonymisierte, zusammengefasste Darstellung</strong> typischer
            Projektabläufe – keine echte Kundenreferenz und kein konkreter, real existierender Betrieb.
          </p>
        </div>
      </Section>

      <Section eyebrow="Der Betrieb" title="Elektrobetrieb, 8 Mitarbeitende, Münsterland">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-xl font-semibold text-foreground">Ausgangslage</h3>
            <ul className="mt-6 space-y-4">
              {ausgangslage.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-secondary" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-foreground">Ergebnis</h3>
            <ul className="mt-6 space-y-4">
              {ergebnis.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent-secondary" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Ablauf"
        title="Die Maßnahmen im Detail"
        className="border-t border-border bg-surface/30"
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {massnahmen.map((item, index) => (
            <div key={item.phase} className="rounded-xl border border-border bg-surface p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent-secondary">
                Phase {index + 1}
              </p>
              <h3 className="mt-2 font-display font-semibold text-foreground">{item.phase}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaSection
        title="Wie würde das bei Ihnen aussehen?"
        subtitle="Im kostenlosen Strategie-Call schauen wir auf Ihre konkrete Ausgangslage – ganz ohne Schablone."
      />
    </>
  );
}
