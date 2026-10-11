/**
 * Erzeugt LEISTUNGSKATALOG.md aus lib/leistungen.ts.
 * Aufruf: npm run katalog
 *
 * Nie die Markdown-Datei von Hand bearbeiten – sie wird bei jedem Lauf überschrieben.
 * Preise ändern: lib/constants.ts (pricing). Beschreibungen: lib/leistungen.ts.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { formatEuro, priceNote, pricing } from "../lib/constants.ts";
import {
  gruppenMeta,
  jahrespreis,
  leistungen,
  leistungenNachGruppe,
  monatspreis,
  preisText,
  type Gruppe,
  type Leistung,
} from "../lib/leistungen.ts";

const REIHENFOLGE: Gruppe[] = [
  "einstieg",
  "it-pakete",
  "it-betreuung",
  "website-pakete",
  "website-laufend",
  "zusatz",
  "support",
];

const heute = new Date().toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });

function detail(leistung: Leistung): string {
  const monat = monatspreis(leistung);
  const jahr = jahrespreis(leistung);

  const zeilen = [
    `### ${leistung.name}`,
    "",
    leistung.kurz,
    "",
    `| | |`,
    `|---|---|`,
    `| **Preis** | ${preisText(leistung)} |`,
  ];

  if (monat !== null && jahr !== null) {
    zeilen.push(`| **Im Monat** | ${formatEuro(monat)} |`);
    zeilen.push(`| **Im Jahr** | ${formatEuro(jahr)} bei Vorauszahlung (statt ${formatEuro(monat * 12)}) |`);
  } else {
    zeilen.push(`| **Im Monat** | – |`);
    zeilen.push(`| **Im Jahr** | – (einmalige Leistung) |`);
  }

  zeilen.push("", "**Enthalten**", "");
  for (const punkt of leistung.enthalten) zeilen.push(`- ${punkt}`);

  zeilen.push("", "**Nicht enthalten**", "");
  for (const punkt of leistung.nichtEnthalten) zeilen.push(`- ${punkt}`);

  if (leistung.hinweis) {
    zeilen.push("", `> **Intern:** ${leistung.hinweis}`);
  }

  zeilen.push("");
  return zeilen.join("\n");
}

function uebersicht(): string {
  const zeilen = [
    "| Leistung | Preis | Im Monat | Im Jahr |",
    "|---|---|---|---|",
  ];
  for (const gruppe of REIHENFOLGE) {
    const eintraege = leistungenNachGruppe(gruppe);
    if (eintraege.length === 0) continue;
    zeilen.push(`| **${gruppenMeta[gruppe].label}** | | | |`);
    for (const leistung of eintraege) {
      const monat = monatspreis(leistung);
      const jahr = jahrespreis(leistung);
      zeilen.push(
        `| ${leistung.name} | ${preisText(leistung)} | ${monat === null ? "–" : formatEuro(monat)} | ${jahr === null ? "–" : formatEuro(jahr)} |`,
      );
    }
  }
  return zeilen.join("\n");
}

const abschnitte = REIHENFOLGE.filter((g) => leistungenNachGruppe(g).length > 0).map((gruppe) => {
  const meta = gruppenMeta[gruppe];
  return [
    `## ${meta.label}`,
    "",
    `_${meta.beschreibung}_`,
    "",
    leistungenNachGruppe(gruppe).map(detail).join("\n"),
  ].join("\n");
});

const inhalt = `# Leistungskatalog

_Erzeugt am ${heute} aus \`lib/leistungen.ts\` – nicht von Hand bearbeiten._
_Preise ändern in \`lib/constants.ts\` (\`pricing\`), dann \`npm run katalog\` ausführen._

${priceNote}

Jahrespreise gelten bei Vorauszahlung und entsprechen ${pricing.yearlyFactor} Monatsbeiträgen
(${12 - pricing.yearlyFactor} Monate geschenkt). Diesen Faktor steuert \`pricing.yearlyFactor\`.

## Alles auf einen Blick

${uebersicht()}

---

${abschnitte.join("\n---\n\n")}`;

const ziel = join(import.meta.dirname, "..", "LEISTUNGSKATALOG.md");
writeFileSync(ziel, inhalt, "utf8");
console.log(`LEISTUNGSKATALOG.md geschrieben – ${leistungen.length} Leistungen.`);
