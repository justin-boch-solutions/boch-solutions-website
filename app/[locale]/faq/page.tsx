"use client";

import { useState } from 'react';
import Link from 'next/link';
import FadeIn from '@/components/FadeIn';

const faqs = [
  {
    question: "Was kostet eine Website oder ein System bei euch?",
    answer: "Wir haben keine starren Preislisten, weil jeder Betrieb andere Anforderungen hat. Ein hochkonvertierender Onepager startet bei einem anderen Budget als ein komplexes Kundenportal. In unserem kostenlosen Erstgespräch stecken wir den Rahmen ab und du bekommst im Anschluss ein transparentes Festpreisangebot. Keine versteckten Kosten."
  },
  {
    question: "Mein Neffe macht das für 500€. Warum sollte ich euch buchen?",
    answer: "Wenn dein Ziel ist, einfach nur 'irgendwie im Internet zu stehen', ist dein Neffe die richtige Wahl. Wenn du aber möchtest, dass deine Website planbar Neukunden oder Fachkräfte für deinen Betrieb generiert, brauchst du ein System, das auf Verkauf und Sichtbarkeit optimiert ist. Wir bauen dir keine digitale Visitenkarte, sondern deinen besten Vertriebsmitarbeiter."
  },
  {
    question: "Wie viel Zeit muss ich selbst in das Projekt investieren?",
    answer: "So wenig wie möglich. Du bist Experte in deinem Gewerk, wir in unserem. Wir brauchen zu Beginn ein 15-minütiges Gespräch, um deine Ziele zu verstehen, und ab und zu Feedback an wichtigen Meilensteinen. Den gesamten Rest – Konzept, Design, Texte, Programmierung und Technik – übernehmen wir."
  },
  {
    question: "Wie lange dauert die Umsetzung?",
    answer: "Das hängt vom Umfang ab. Ein Onepager kann oft innerhalb von 2 bis 4 Wochen live gehen. Für eine umfassende Firmenwebsite oder ein individuelles System planen wir in der Regel 4 bis 8 Wochen ein. Qualität und saubere Prozesse stehen dabei immer vor Schnelligkeit."
  },
  {
    question: "Wer schreibt eigentlich die Texte für die Website?",
    answer: "Wir. Du musst dir abends nach Feierabend keine Werbetexte aus den Fingern saugen. Wir interviewen dich kurz, verstehen dein Angebot und schreiben dann Texte, die deine Zielgruppe überzeugen und bei Google ranken. Du musst sie am Ende nur noch abnicken."
  },
  {
    question: "Ich habe keine professionellen Bilder von meinem Betrieb. Was nun?",
    answer: "Das ist kein Problem. Wir können entweder mit extrem hochwertigen Lizenzbildern (Stockfotos) arbeiten, die wir an dein Branding anpassen, oder wir vermitteln dir einen professionellen Fotografen aus unserem Netzwerk, der deinen Betrieb ins perfekte Licht rückt."
  },
  {
    question: "Gehört die Website danach wirklich mir?",
    answer: "Zu 100 %. Es gibt bei uns keine Knebelverträge, bei denen wir die Website 'als Geisel' halten. Sobald das Projekt abgeschlossen und bezahlt ist, gehört alles dir – vom Code bis zur Domain."
  },
  {
    question: "Werde ich mit der neuen Seite bei Google auf Platz 1 gefunden?",
    answer: "Wer dir pauschal Platz 1 verspricht, lügt. Was wir aber garantieren: Wir bauen deine Website technisch und inhaltlich genau so auf, wie Google es liebt (Stichwort: Local SEO). Dadurch schieben wir dich in deiner Region für deine wichtigsten Suchbegriffe massiv nach oben."
  },
  {
    question: "Kümmert ihr euch auch um das Hosting und die Domain?",
    answer: "Ja, wir bieten dir das absolute Rundum-Sorglos-Paket. Wir registrieren deine Wunschdomain, richten schnelle und sichere Server ein und kümmern uns um die SSL-Verschlüsselung."
  },
  {
    question: "Kann ich später selbst kleine Änderungen an der Website vornehmen?",
    answer: "Absolut. Wir bauen unsere Systeme so auf, dass du (oder eine Bürokraft) Texte und Bilder ganz einfach selbst austauschen kannst. Du bekommst dafür von uns eine kurze Einweisung. Für alles andere sind wir weiterhin erreichbar."
  },
  {
    question: "Könnt ihr auch meine bestehende Website einfach nur 'ein bisschen hübscher' machen?",
    answer: "Nein. Wir flicken keine kaputten Systeme. Eine schlechte technische Basis lässt sich nicht mit ein bisschen Farbe retten. Wir bauen Projekte von Grund auf neu auf, damit sie extrem schnell laden und messbar Anfragen bringen."
  },
  {
    question: "Ist die neue Website auch für Handys (Smartphones) optimiert?",
    answer: "Das ist heute absolute Pflicht. Über 70 % der Suchanfragen nach Handwerkern passieren auf dem Smartphone. Deine Website wird von uns 'Mobile-First' entwickelt, sieht also auf jedem Handy perfekt aus und lädt blitzschnell."
  },
  {
    question: "Arbeitet ihr ausschließlich mit Handwerksbetrieben?",
    answer: "Unser Fokus liegt auf dem Handwerk und auf Start-ups. In diesen Branchen kennen wir die Prozesse und die Zielgruppen am besten. Wenn du aus einer anderen Branche kommst, aber unser Ansatz zu dir passt, sprich uns einfach an."
  },
  {
    question: "Macht ihr auch Social Media oder Google Ads für mich?",
    answer: "Wir bauen das perfekte digitale Fundament (die Website). Wenn du danach Traffic durch Werbung brauchst, bauen wir dir die passenden, hochkonvertierenden Landingpages dafür. Für das reine Schalten der Anzeigen arbeiten wir auf Wunsch mit spezialisierten Partneragenturen zusammen."
  },
  {
    question: "Was passiert, wenn die Website mal abstürzt oder gehackt wird?",
    answer: "Wenn du unser Wartungspaket buchst, überwachen wir deine Website 24/7. Wir spielen regelmäßig Sicherheitsupdates ein und machen Backups. Sollte jemals etwas passieren, sind wir proaktiv dran und stellen das System sofort wieder her."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col items-center pt-32 pb-24 px-6 overflow-hidden">
      
      {/* Hero Bereich */}
      <div className="text-center max-w-3xl mb-20 text-slate-50">
        <FadeIn direction="up">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-slate-800 bg-slate-900/50 text-xs text-slate-400 uppercase tracking-widest font-semibold">
            Klartext
          </div>
        </FadeIn>
        <FadeIn direction="up" delay={0.1}>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Häufige <span className="text-sky-500">Fragen.</span>
          </h1>
        </FadeIn>
        <FadeIn direction="up" delay={0.2}>
          <p className="text-lg text-slate-400">
            Keine Geheimnisse, kein Fachchinesisch. Hier sind die ehrlichen Antworten auf die Fragen, die uns am häufigsten gestellt werden.
          </p>
        </FadeIn>
      </div>

      {/* FAQ Akkordeon Liste */}
      <div className="w-full max-w-3xl space-y-4 mb-24">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          
          return (
            <FadeIn key={index} direction="up" delay={0.05 * (index + 1)}>
              <div 
                className={`border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-slate-900/80 shadow-lg shadow-sky-500/5' : 'bg-slate-900/30 hover:bg-slate-900/50'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left px-6 py-6 flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className={`text-lg font-bold transition-colors ${isOpen ? 'text-sky-400' : 'text-slate-50'}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'bg-sky-500/20 text-sky-400 rotate-180' : 'bg-slate-800 text-slate-400'}`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                
                <div 
                  className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-slate-400 leading-relaxed pt-2 border-t border-slate-800/50">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>

      {/* CTA Box */}
      <FadeIn direction="up">
        <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 text-center text-slate-50 shadow-2xl">
          <h2 className="text-2xl font-bold mb-4">Deine Frage war nicht dabei?</h2>
          <p className="text-slate-400 mb-8 font-medium">
            Lass uns einfach kurz telefonieren. Wir klären dein Anliegen völlig unverbindlich in 5 Minuten.
          </p>
          <Link href="/de/kontakt" className="inline-block px-8 py-4 rounded-md bg-sky-500 text-slate-950 font-bold hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/20">
            Schreib uns eine Nachricht
          </Link>
        </div>
      </FadeIn>

    </main>
  );
}