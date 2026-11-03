import { Gauge, Search, ShieldAlert, ShieldCheck, type LucideIcon } from "lucide-react";

export interface Tool {
  href: string;
  label: string;
  /** Kurz, im Fragestil – funktioniert sowohl im Menü als auch als Startseiten-Karte. */
  description: string;
  icon: LucideIcon;
  /** Eine Zeile mehr Kontext, nur für die Startseiten-Karten, nicht fürs Menü. */
  longDescription: string;
}

export const tools: Tool[] = [
  {
    href: "/email-check",
    label: "E-Mail-Sicherheits-Check",
    description: "Kann jemand in Ihrem Namen Rechnungen verschicken?",
    longDescription:
      "Prüft SPF, DKIM und DMARC Ihrer Domain – die drei Einträge, die Rechnungsbetrug per gefälschter Absenderadresse verhindern.",
    icon: ShieldAlert,
  },
  {
    href: "/it-check",
    label: "IT-Check",
    description: "Kostenloser Selbsttest: Wie zukunftsfähig ist Ihre IT?",
    longDescription:
      "Zehn Fragen zu E-Mail, Backup, Geräten und Sicherheit – in zwei Minuten mit konkreter Einschätzung statt Bauchgefühl.",
    icon: Gauge,
  },
  {
    href: "/website-check",
    label: "Website-Check",
    description: "Performance, SEO & technische Basis Ihrer Webseite prüfen.",
    longDescription:
      "Ladezeit, mobile Darstellung und SEO-Grundlagen Ihrer Webseite auf einen Blick – mit Ampel-Bewertung je Kriterium.",
    icon: Search,
  },
  {
    href: "/sicherheits-check",
    label: "Sicherheits-Check",
    description: "php2shell, offene Dateien und Sicherheits-Header Ihrer Website.",
    longDescription:
      "Prüft Ihre Website von außen auf die aktuelle php2shell-Lücke, offenliegende .env-Dateien und fehlende Sicherheits-Header.",
    icon: ShieldCheck,
  },
];
