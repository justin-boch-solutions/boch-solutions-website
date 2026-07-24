"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, Mail, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/ui/count-up";
import { company } from "@/lib/constants";
import { getServiceBySlug, type Service } from "@/lib/services";

interface QuizOption {
  label: string;
  points: number;
}

interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

const questions: QuizQuestion[] = [
  {
    question: "Wie verwalten Sie aktuell Ihre geschäftlichen E-Mails?",
    options: [
      { label: "Private Adresse (Gmail, Web.de, GMX …)", points: 0 },
      { label: "Eigene Domain, über einen einfachen Web-Hoster", points: 1 },
      { label: "Eigene Domain über Microsoft 365 / Exchange", points: 2 },
    ],
  },
  {
    question: "Was passiert, wenn ein Laptop oder Rechner im Büro ausfällt oder gestohlen wird?",
    options: [
      { label: "Die Daten darauf sind vermutlich weg", points: 0 },
      { label: "Es gibt ein unregelmäßiges, manuelles Backup", points: 1 },
      { label: "Automatisiertes Cloud-Backup, Daten sind schnell wiederherstellbar", points: 2 },
    ],
  },
  {
    question: "Wo liegen Ihre wichtigsten Dateien (Angebote, Aufmaße, Verträge)?",
    options: [
      { label: "Verteilt auf mehreren Rechnern, USB-Sticks oder E-Mail-Anhängen", points: 0 },
      { label: "Auf einem gemeinsamen Laufwerk oder Server im Büro", points: 1 },
      { label: "Zentral in der Cloud, von überall erreichbar", points: 2 },
    ],
  },
  {
    question: "Wie leicht finden neue Kunden Sie bei Google?",
    options: [
      { label: "Kaum – bei „Handwerker in [Ort]“ tauchen wir nicht auf", points: 0 },
      { label: "Wir sind zu finden, aber das Google-Profil ist unvollständig oder veraltet", points: 1 },
      { label: "Gut – vollständiges, gepflegtes Google-Profil mit Bewertungen", points: 2 },
    ],
  },
  {
    question: "Wie aktuell ist Ihre Webseite?",
    options: [
      { label: "Keine Webseite oder seit Jahren nicht aktualisiert", points: 0 },
      { label: "Vorhanden, aber auf dem Smartphone schwer bedienbar", points: 1 },
      { label: "Modern, schnell und mobil optimiert", points: 2 },
    ],
  },
  {
    question: "Wie melden sich Mitarbeitende an E-Mail und Systemen an?",
    options: [
      { label: "Ein gemeinsames Passwort für mehrere Personen", points: 0 },
      { label: "Eigene Zugänge, aber ohne Zwei-Faktor-Anmeldung", points: 1 },
      { label: "Eigene Zugänge mit Zwei-Faktor-Authentifizierung", points: 2 },
    ],
  },
];

interface ResultTier {
  minScore: number;
  title: string;
  description: string;
  serviceSlugs: string[];
}

const tiers: ResultTier[] = [
  {
    minScore: 0,
    title: "Dringender Handlungsbedarf",
    description:
      "Ihre aktuelle IT-Struktur birgt reale Risiken – bei einem Geräteausfall, einer Phishing-Mail oder einer Kontrolle könnte es teuer werden. Das lässt sich gezielt und ohne Betriebsunterbrechung beheben.",
    serviceSlugs: ["cloud-sicherheit-dsgvo", "microsoft-365-azure"],
  },
  {
    minScore: 5,
    title: "Solide Basis, aber Luft nach oben",
    description:
      "Die Grundlagen stehen, es gibt aber einzelne Lücken, die sich mit überschaubarem Aufwand schließen lassen – für mehr Sicherheit und weniger Reibung im Alltag.",
    serviceSlugs: ["it-support-wartung", "seo-geo-optimierung"],
  },
  {
    minScore: 9,
    title: "Gut aufgestellt",
    description:
      "Ihre IT-Basis ist solide. Jetzt lohnt sich der Blick auf Feinschliff: mehr Sichtbarkeit bei Google & KI-Suche und automatisierte Abläufe, die zusätzlich Zeit sparen.",
    serviceSlugs: ["seo-geo-optimierung", "prozessautomatisierung"],
  },
];

function getTier(score: number): ResultTier {
  return [...tiers].reverse().find((tier) => score >= tier.minScore) ?? tiers[0];
}

export function ItCheckQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const isResult = step === questions.length;

  function selectOption(points: number) {
    const next = [...answers];
    next[step] = points;
    setAnswers(next);
    setStep(step + 1);
  }

  function reset() {
    setAnswers([]);
    setStep(0);
  }

  if (isResult) {
    const score = answers.reduce((sum, points) => sum + points, 0);
    const maxScore = questions.length * 2;
    const tier = getTier(score);
    const services = tier.serviceSlugs
      .map((slug) => getServiceBySlug(slug))
      .filter((s): s is Service => s !== undefined);

    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-secondary">Ihr Ergebnis</p>
        <p className="mt-3 font-display text-3xl font-bold text-foreground">
          <CountUp value={score} /> / {maxScore} Punkten
        </p>
        <h3 className="mt-4 font-display text-2xl font-bold text-foreground">{tier.title}</h3>
        <p className="mx-auto mt-3 max-w-xl text-muted">{tier.description}</p>

        <div className="mt-8 grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/leistungen/${service.slug}`}
              className="group rounded-xl border border-border bg-surface-elevated p-5 transition-colors hover:border-accent-secondary/40"
            >
              <p className="font-medium text-foreground">{service.shortName}</p>
              <p className="mt-1 text-sm text-muted">{service.shortDescription}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
          <Button href="/kontakt" size="lg">
            Kostenlosen Strategie-Call vereinbaren
          </Button>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground"
          >
            <RotateCcw className="size-4" />
            Test wiederholen
          </button>
        </div>

        <ResultEmailForm score={score} maxScore={maxScore} tier={tier} services={services} />
      </div>
    );
  }

  const current = questions[step];

  return (
    <div className="rounded-2xl border border-border bg-surface p-8 sm:p-10">
      <div className="mb-6 flex items-center justify-between text-sm text-muted">
        <span>
          Frage {step + 1} von {questions.length}
        </span>
        <span>{Math.round((step / questions.length) * 100)}%</span>
      </div>
      <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-surface-elevated">
        <div
          className="h-full rounded-full bg-gradient-to-r from-accent to-accent-secondary transition-all duration-300"
          style={{ width: `${(step / questions.length) * 100}%` }}
        />
      </div>

      <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">{current.question}</h3>

      <div className="mt-6 flex flex-col gap-3">
        {current.options.map((option) => (
          <button
            key={option.label}
            onClick={() => selectOption(option.points)}
            className="group flex items-center justify-between gap-4 rounded-xl border border-border-strong bg-surface-elevated px-5 py-4 text-left text-sm text-foreground transition-colors hover:border-accent-secondary/60 hover:bg-surface-elevated/80"
          >
            {option.label}
            <ArrowRight className="size-4 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent-secondary" />
          </button>
        ))}
      </div>
    </div>
  );
}

type Status = "idle" | "submitting" | "success" | "error";

function ResultEmailForm({
  score,
  maxScore,
  tier,
  services,
}: {
  score: number;
  maxScore: number;
  tier: ResultTier;
  services: Service[];
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      ...Object.fromEntries(formData.entries()),
      score,
      maxScore,
      tierTitle: tier.title,
      tierDescription: tier.description,
      recommendations: services.map((service) => ({
        name: service.shortName,
        url: `${company.url}/leistungen/${service.slug}`,
      })),
    };

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/it-check-ergebnis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.error || "Senden fehlgeschlagen.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Senden fehlgeschlagen.");
    }
  }

  if (status === "success") {
    return (
      <div className="mt-10 flex items-center justify-center gap-2 rounded-xl border border-border-strong bg-surface-elevated p-5 text-sm text-accent-secondary">
        <Mail className="size-4 shrink-0" />
        Ihr Ergebnis ist unterwegs zu Ihrer E-Mail-Adresse.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 border-t border-border pt-8 text-left">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <p className="text-center font-medium text-foreground">Ergebnis per E-Mail erhalten</p>
      <p className="mx-auto mt-1 max-w-sm text-center text-sm text-muted">
        Wir schicken Ihnen Ihr persönliches Ergebnis mit den Empfehlungen oben zum Nachlesen zu.
      </p>

      <div className="mx-auto mt-5 grid max-w-lg grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          autoComplete="name"
          className="w-full rounded-lg border border-border-strong bg-surface-elevated px-4 py-3 text-sm text-foreground placeholder:text-muted focus-visible:border-accent-secondary"
        />
        <input
          type="email"
          name="email"
          placeholder="E-Mail"
          required
          autoComplete="email"
          className="w-full rounded-lg border border-border-strong bg-surface-elevated px-4 py-3 text-sm text-foreground placeholder:text-muted focus-visible:border-accent-secondary"
        />
      </div>

      <div className="mx-auto mt-5 flex max-w-lg flex-col items-center gap-4">
        <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-auto">
          {status === "submitting" ? "Wird gesendet…" : "Ergebnis zusenden"}
        </Button>
        {status === "error" ? (
          <p className="text-sm text-red-400">{errorMessage || "Senden fehlgeschlagen."}</p>
        ) : null}
        <p className="text-center text-xs text-muted">
          Details in der{" "}
          <a href="/datenschutz" className="underline hover:text-foreground">
            Datenschutzerklärung
          </a>
          .
        </p>
      </div>
    </form>
  );
}
