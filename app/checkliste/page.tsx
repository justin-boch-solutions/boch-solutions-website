import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { ChecklistForm } from "@/components/sections/checklist-form";

export const metadata: Metadata = {
  title: "IT-Sicherheits-Checkliste",
  description:
    "Kostenlose Checkliste: 12 konkrete Punkte, um die IT-Sicherheit Ihres Handwerksbetriebs selbst einzuschätzen – als PDF direkt zum Download.",
  alternates: { canonical: "/checkliste" },
};

const points = [
  "12 konkrete Punkte zum Abhaken – kein Fachchinesisch",
  "In 5 Minuten durchgehbar, direkt auf dem eigenen Betrieb anwendbar",
  "Als PDF zum Ausdrucken oder Weiterleiten ans Team",
];

export default function ChecklistePage() {
  return (
    <>
      <Hero
        eyebrow="Kostenlose Checkliste"
        title="IT-Sicherheits-Checkliste für Handwerksbetriebe"
        subtitle="12 konkrete Punkte, mit denen Sie in wenigen Minuten einschätzen können, wie gut Ihr Betrieb gegen die häufigsten IT-Risiken abgesichert ist."
        size="compact"
      />

      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="font-display text-2xl font-bold text-foreground">Was Sie bekommen</h2>
            <ul className="mt-6 space-y-4">
              {points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <ShieldCheck className="mt-0.5 size-5 shrink-0 text-accent-secondary" />
                  {point}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm leading-relaxed text-muted">
              Mehr Hintergrund zu einzelnen Punkten finden Sie in unserem{" "}
              <a href="/magazin/it-sicherheit-handwerksbetriebe-fehler" className="underline hover:text-foreground">
                Magazin-Artikel zu IT-Sicherheit
              </a>
              .
            </p>
          </div>

          <ChecklistForm />
        </div>
      </Section>
    </>
  );
}
