import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CtaSection } from "@/components/sections/cta-section";
import { FaqJsonLd } from "@/components/seo/json-ld";
import type { FaqItem } from "@/lib/services";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Häufig gestellte Fragen zu IT-Modernisierung, Microsoft 365, DSGVO, SEO/GEO, Kosten und Ablauf für Handwerksbetriebe – beantwortet von JB Solutions.",
  alternates: { canonical: "/faq" },
};

const categories: { title: string; items: FaqItem[] }[] = [
  {
    title: "Allgemein",
    items: [
      {
        question: "Ist mein Betrieb zu klein für Microsoft 365 und professionelle IT?",
        answer:
          "Nein. Microsoft-365-Lizenzen und die begleitenden Leistungen skalieren nach Nutzerzahl. Auch Betriebe mit 2–3 Mitarbeitenden profitieren von einer zentralen, sicheren E-Mail- und Dateiverwaltung, ohne einen eigenen Server zu benötigen.",
      },
      {
        question: "Arbeiten Sie nur mit Betrieben in Münster?",
        answer:
          "Der Standort ist Münster, viele Leistungen (Microsoft-365-Einrichtung, Webdesign, SEO) lassen sich jedoch remote umsetzen. Vor-Ort-Termine sind im Umkreis von Münster möglich, sprechen Sie uns bei Bedarf einfach an.",
      },
      {
        question: "Muss ich meinen bisherigen IT-Dienstleister kündigen?",
        answer:
          "Das entscheiden Sie. Viele Betriebe lassen bestehende Verträge auslaufen, während wir die neue Struktur aufbauen. Wir stimmen den Übergang so ab, dass es keine Lücke in Ihrer IT-Betreuung gibt.",
      },
      {
        question: "Ich bin bereits Kunde – wie erreiche ich Sie am schnellsten?",
        answer:
          "Über unsere Support-Seite mit direktem Draht per Telefon, WhatsApp oder E-Mail. Mit einem laufenden Wartungsvertrag haben Sie zusätzlich priorisierte Reaktionszeiten.",
      },
    ],
  },
  {
    title: "Microsoft 365 & IT-Sicherheit",
    items: [
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
        question: "Bieten Sie auch laufende Betreuung nach der Einrichtung an?",
        answer:
          "Ja. IT-Support & Wartung ist eine eigene Leistung mit festem Ansprechpartner, laufenden Updates und Sicherheitskontrollen – ideal in Kombination mit den Paketen Wachstum oder Rundum-sorglos.",
      },
      {
        question: "Schulen Sie auch unser Team im Umgang mit Microsoft 365?",
        answer:
          "Ja, kurze praxisnahe Schulungen zu Outlook, Teams, OneDrive & Co. sind Teil von IT-Support & Wartung – gerade für neue Mitarbeitende oder beim Umstieg von einer alten Struktur hilfreich.",
      },
    ],
  },
  {
    title: "Sichtbarkeit: SEO & GEO",
    items: [
      {
        question: "Was ist GEO-Optimierung und warum brauche ich das?",
        answer:
          "GEO steht für Generative Engine Optimization – die Optimierung für KI-Antwortmaschinen wie ChatGPT, Microsoft Copilot oder Google Gemini. Immer mehr potenzielle Kunden stellen dort statt bei Google direkt Fragen wie „Welcher Elektriker in [Ort] ist empfehlenswert?“. GEO sorgt dafür, dass Ihr Betrieb in solchen Antworten genannt wird.",
      },
      {
        question: "Was ist ein Google-Unternehmensprofil und brauche ich eins?",
        answer:
          "Das Google-Unternehmensprofil ist der Eintrag, der bei der Suche und in Google Maps mit Öffnungszeiten, Bewertungen und Kontaktdaten erscheint. Für die „Handwerker in meiner Nähe“-Suche ist es oft entscheidender als die Webseite selbst – ein vollständiges, gepflegtes Profil sollte jeder lokal tätige Betrieb haben.",
      },
      {
        question: "Wie schnell sieht man Ergebnisse bei SEO und GEO?",
        answer:
          "Technische Verbesserungen wirken meist innerhalb weniger Wochen. Spürbare Platzierungsverbesserungen bei umkämpften Suchbegriffen brauchen in der Regel mehrere Monate kontinuierlicher Arbeit – beides ist ein laufender Prozess, kein einmaliges Projekt.",
      },
    ],
  },
  {
    title: "Kosten & Ablauf",
    items: [
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
        question: "Kann ich einzelne Leistungen buchen, oder nur ein komplettes Paket?",
        answer:
          "Jede Leistung ist grundsätzlich einzeln buchbar. Die Pakete Starter, Wachstum und Rundum-sorglos bündeln zusammengehörige Leistungen zu einem sinnvollen Gesamtpaket, sind aber kein Muss – im Strategie-Call stellen wir zusammen, was für Ihren Betrieb passt.",
      },
    ],
  },
];

const allFaq = categories.flatMap((category) => category.items);

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd faq={allFaq} />
      <Hero
        eyebrow="FAQ"
        title="Häufig gestellte Fragen"
        subtitle="Antworten auf die Fragen, die uns von Handwerksbetrieben am häufigsten gestellt werden – gegliedert nach Thema."
      />

      {categories.map((category) => (
        <Section key={category.title} eyebrow="Thema" title={category.title}>
          <div className="mx-auto max-w-3xl">
            <FaqAccordion items={category.items} />
          </div>
        </Section>
      ))}

      <Section eyebrow="Weiterlesen" title="Mehr Hintergrundwissen im Magazin" className="border-t border-border bg-surface/30">
        <p className="max-w-2xl text-muted">
          Für ausführlichere Erklärungen zu Themen wie GEO, lokalem SEO oder IT-Sicherheit lohnt sich ein
          Blick in unser{" "}
          <Link href="/magazin" className="underline hover:text-foreground">
            Magazin
          </Link>
          .
        </p>
      </Section>

      <CtaSection
        title="Frage nicht dabei?"
        subtitle="Melden Sie sich direkt – im persönlichen Gespräch klären wir alles Weitere."
      />
    </>
  );
}
