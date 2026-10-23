export type Severity = "critical" | "high" | "medium" | "low" | "info" | "ok";

export type CheckCategory =
  | "laufzeit"
  | "php2shell"
  | "header"
  | "transport"
  | "cookies"
  | "exposition"
  | "stack";

export interface Finding {
  /** Stabile ID, wird für Anker und Report-Sortierung genutzt. */
  id: string;
  category: CheckCategory;
  severity: Severity;
  /** Kurze Ueberschrift, z.B. "PHP-Version ist nicht gegen PHP2Shell gepatcht". */
  title: string;
  /** Was wurde konkret beobachtet. Immer faktisch, nie geraten. */
  evidence: string;
  /** Warum das ein Problem ist, in Kundensprache. */
  impact: string;
  /** Was jetzt zu tun ist, Schritt für Schritt. */
  actions: string[];
  /** Quellenangaben, z.B. BSI-Dokument oder CVE. */
  references?: { label: string; url: string }[];
  /** Nur gesetzt, wenn der Check eine CVE adressiert. */
  cves?: string[];
}

export interface ScanTarget {
  /** Eingabe des Nutzers, normalisiert. */
  input: string;
  /** Endgültig geprüftes Origin, z.B. https://example.de */
  origin: string;
  hostname: string;
}

export interface ScanResult {
  target: ScanTarget;
  scannedAt: string;
  durationMs: number;
  score: number;
  grade: "A" | "B" | "C" | "D" | "E" | "F";
  findings: Finding[];
  counts: Record<Severity, number>;
  /** Technik, die wir am Ziel erkannt haben. Rein informativ. */
  fingerprint: {
    server?: string;
    poweredBy?: string;
    phpVersion?: string;
    nodeHint?: string;
    cms?: string;
  };
  /** Checks, die nicht laufen konnten (z.B. Timeout). */
  skipped: { id: string; reason: string }[];
}

export interface ScanError {
  error: string;
  detail?: string;
}
