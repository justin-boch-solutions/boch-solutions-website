"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { company } from "@/lib/constants";
import { services } from "@/lib/services";

const branchen = ["SHK (Sanitär, Heizung, Klima)", "Elektro", "Ausbau & Trockenbau", "Bau & Dach", "Sonstiges Gewerk"];

export function ContactForm() {
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!consent) return;

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString() ?? "";
    const firma = formData.get("firma")?.toString() ?? "";
    const branche = formData.get("branche")?.toString() ?? "";
    const anliegen = formData.get("anliegen")?.toString() ?? "";
    const nachricht = formData.get("nachricht")?.toString() ?? "";
    const telefon = formData.get("telefon")?.toString() ?? "";

    const body = [
      `Name: ${name}`,
      `Firma: ${firma}`,
      `Branche: ${branche}`,
      `Telefon: ${telefon}`,
      `Anliegen: ${anliegen}`,
      "",
      nachricht,
    ].join("\n");

    const mailto = `${company.emailHref}?subject=${encodeURIComponent(
      `Anfrage über die Webseite – ${firma || name}`,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Field label="Name" name="name" required autoComplete="name" />
      <Field label="Firma" name="firma" required autoComplete="organization" />
      <Field label="Telefon" name="telefon" type="tel" autoComplete="tel" />
      <SelectField label="Branche" name="branche" options={branchen} />
      <SelectField
        label="Anliegen"
        name="anliegen"
        className="sm:col-span-2"
        options={services.map((s) => s.shortName)}
      />
      <div className="sm:col-span-2">
        <label className="mb-2 block text-sm font-medium text-foreground" htmlFor="nachricht">
          Nachricht
        </label>
        <textarea
          id="nachricht"
          name="nachricht"
          rows={5}
          className="w-full rounded-lg border border-border-strong bg-surface-elevated px-4 py-3 text-sm text-foreground placeholder:text-muted focus-visible:border-accent-secondary"
          placeholder="Erzählen Sie uns kurz von Ihrem Betrieb und Ihrem Anliegen."
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-muted sm:col-span-2">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-1 size-4 shrink-0 rounded border-border-strong bg-surface-elevated accent-accent"
        />
        Ich stimme zu, dass meine Angaben zur Bearbeitung meiner Anfrage genutzt werden. Details in der{" "}
        <a href="/datenschutz" className="underline hover:text-foreground">
          Datenschutzerklärung
        </a>
        .
      </label>

      <div className="sm:col-span-2">
        <Button type="submit" size="lg">
          Anfrage senden
        </Button>
        {submitted ? (
          <p className="mt-3 text-sm text-accent-secondary">
            Ihr E-Mail-Programm öffnet sich mit der vorausgefüllten Anfrage – bitte einfach absenden.
          </p>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-foreground" htmlFor={name}>
        {label} {required ? <span className="text-accent-secondary">*</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-lg border border-border-strong bg-surface-elevated px-4 py-3 text-sm text-foreground placeholder:text-muted focus-visible:border-accent-secondary"
      />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  className,
}: {
  label: string;
  name: string;
  options: string[];
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-medium text-foreground" htmlFor={name}>
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="w-full rounded-lg border border-border-strong bg-surface-elevated px-4 py-3 text-sm text-foreground focus-visible:border-accent-secondary"
        defaultValue=""
      >
        <option value="" disabled>
          Bitte auswählen
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
