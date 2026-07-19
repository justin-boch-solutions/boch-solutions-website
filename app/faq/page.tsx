import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaSection } from "@/components/sections/cta-section";
import { FaqJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Häufig gestellte Fragen zu IT-Modernisierung, Microsoft 365, SEO/GEO und Webdesign für Handwerksbetriebe – beantwortet von JB Solutions.",
};

const faq = [
  {
    question: "Ist mein Betrieb zu klein für Microsoft 365 und professionelle IT?",
    answer:
      "Nein. Microsoft-365-Lizenzen und die begleitenden Leistungen skalieren nach Nutzerzahl. Auch Betriebe mit 2–3 Mitarbeitenden profitieren von einer zentralen, sicheren E-Mail- und Dateiverwaltung, ohne einen eigenen Server zu benötigen.",
  },
  {
    question: "Was kostet die IT-Modernisierung?",
    answer:
      "Das hängt stark von Betriebsgröße, aktueller IT-Situation und gewünschtem Umfang ab. Wir nennen deshalb bewusst keine pauschalen Preise, sondern erarbeiten im kostenlosen Strategie-Call ein passendes Angebot. Details zu Leistungsumfängen finden Sie auf der Pakete-Seite.",
  },
  {
    question: "Wie lange dauert die Umstellung auf Microsoft 365?",
    answer:
      "Eine Basis-Einrichtung ist häufig innerhalb weniger Tage abgeschlossen. Umfangreichere Projekte mit Migration bestehender Daten, Webseite und individueller Software planen wir gemeinsam mit realistischem Zeitrahmen im Architektur-Planungs-Schritt.",
  },
  {
    question: "Ist Microsoft 365 DSGVO-konform nutzbar?",
    answer:
      "Microsoft bietet für Geschäftskunden Möglichkeiten zur DSGVO-konformen Konfiguration (u. a. EU-Datenspeicherung, Auftragsverarbeitungsvertrag mit Microsoft). Wir richten die technischen Einstellungen entsprechend ein und dokumentieren die Maßnahmen. Eine abschließende rechtliche Bewertung für Ihren Betrieb ersetzt dies nicht.",
  },
  {
    question: "Was passiert mit unseren alten E-Mails und Daten bei der Migration?",
    answer:
      "Bestehende Postfächer, Kontakte und Dateien werden im Rahmen der Einrichtung in die neue Microsoft-365-Umgebung übernommen. Wir prüfen die vollständige Übernahme, bevor alte Systeme abgeschaltet werden.",
  },
  {
    question: "Was ist GEO-Optimierung und warum brauche ich das?",
    answer:
      "GEO steht für Generative Engine Optimization – die Optimierung für KI-Antwortmaschinen wie ChatGPT, Microsoft Copilot oder Google Gemini. Immer mehr potenzielle Kunden stellen dort statt bei Google direkt Fragen wie 'Welcher Elektriker in [Ort] ist empfehlenswert?'. GEO sorgt dafür, dass Ihr Betrieb in solchen Antworten genannt wird.",
  },
  {
    question: "Muss ich meinen bisherigen IT-Dienstleister kündigen?",
    answer:
      "Das entscheiden Sie. Viele Betriebe lassen bestehende Verträge auslaufen, während wir die neue Struktur aufbauen. Wir stimmen den Übergang so ab, dass es keine Lücke in Ihrer IT-Betreuung gibt.",
  },
  {
    question: "Bieten Sie auch laufende Betreuung nach der Einrichtung an?",
    answer:
      "Ja. IT-Support & Wartung ist eine eigene Leistung mit festem Ansprechpartner, laufenden Updates und Sicherheitskontrollen – ideal in Kombination mit den Pakten Wachstum oder Rundum-sorglos.",
  },
  {
    question: "Arbeiten Sie nur mit Betrieben in Münster?",
    answer:
      "Der Standort ist Münster, viele Leistungen (Microsoft-365-Einrichtung, Webdesign, SEO) lassen sich jedoch remote umsetzen. Vor-Ort-Termine sind im Umkreis von Münster möglich, sprechen Sie uns bei Bedarf einfach an.",
  },
];

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd faq={faq} />
      <Hero
        eyebrow="FAQ"
        title="Häufig gestellte Fragen"
        subtitle="Antworten auf die Fragen, die uns von Handwerksbetrieben am häufigsten gestellt werden."
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <FaqAccordion items={faq} />
        </div>
      </Section>

      <CtaSection
        title="Frage nicht dabei?"
        subtitle="Melden Sie sich direkt – im persönlichen Gespräch klären wir alles Weitere."
      />
    </>
  );
}
