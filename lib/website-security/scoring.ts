import type { Finding, Severity } from "./types";

/**
 * Abzüge je Fund. Bewusst hart bei kritischen Funden: eine ungepatchte
 * php2shell-Instanz soll nie eine gute Note bekommen, egal wie sauber der Rest ist.
 */
const PENALTY: Record<Severity, number> = {
  critical: 40,
  high: 18,
  medium: 8,
  low: 3,
  info: 0,
  ok: 0,
};

export function scoreFor(findings: Finding[]): number {
  const raw = findings.reduce((acc, f) => acc - PENALTY[f.severity], 100);
  return Math.max(0, Math.min(100, raw));
}

export function gradeFor(score: number): "A" | "B" | "C" | "D" | "E" | "F" {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 65) return "C";
  if (score >= 50) return "D";
  if (score >= 35) return "E";
  return "F";
}

export function countBySeverity(findings: Finding[]): Record<Severity, number> {
  const counts: Record<Severity, number> = {
    critical: 0, high: 0, medium: 0, low: 0, info: 0, ok: 0,
  };
  for (const f of findings) counts[f.severity] += 1;
  return counts;
}

export const SEVERITY_LABEL: Record<Severity, string> = {
  critical: "Kritisch",
  high: "Hoch",
  medium: "Mittel",
  low: "Gering",
  info: "Hinweis",
  ok: "In Ordnung",
};

export const CATEGORY_LABEL = {
  laufzeit: "Server & Laufzeit",
  php2shell: "php2shell",
  header: "Sicherheits-Header",
  transport: "Verschlüsselung",
  cookies: "Cookies",
  exposition: "Offenliegende Dateien",
  stack: "Organisatorisches",
} as const;
