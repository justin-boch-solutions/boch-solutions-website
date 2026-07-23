// One-off generator for the "IT-Sicherheits-Checkliste" lead-magnet PDF.
// Run with: node scripts/generate-checklist-pdf.mjs
// Output is committed as a static asset under public/downloads/, so this
// script does not need to run at build or request time.
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { writeFile } from "node:fs/promises";

const PAGE_WIDTH = 595.28; // A4 at 72dpi
const PAGE_HEIGHT = 841.89;
const MARGIN = 56;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

const ACCENT = rgb(0.549, 0.322, 1); // #8c52ff
const INK = rgb(0.09, 0.1, 0.14);
const MUTED = rgb(0.4, 0.42, 0.48);

const items = [
  {
    title: "Automatisiertes Backup eingerichtet",
    detail: "Alle wichtigen Daten werden automatisch gesichert, nicht nur gelegentlich manuell.",
  },
  {
    title: "Mehrfaktor-Authentifizierung aktiv",
    detail: "Für E-Mail- und Systemzugänge ist eine zweite Bestätigung beim Anmelden aktiviert.",
  },
  {
    title: "Eigene Zugänge statt Sammelpasswort",
    detail: "Jede Person hat einen eigenen Account, kein geteiltes Passwort für mehrere Nutzer.",
  },
  {
    title: "E-Mail-Sicherheit technisch eingerichtet",
    detail: "SPF, DKIM und DMARC sind konfiguriert, damit E-Mails zuverlässig ankommen und nicht gefälscht werden können.",
  },
  {
    title: "Geräte verschlüsselt",
    detail: "Laptops und Mobilgeräte sind verschlüsselt, sodass Daten bei Verlust oder Diebstahl geschützt sind.",
  },
  {
    title: "Software wird regelmäßig aktualisiert",
    detail: "Betriebssystem und Programme erhalten zeitnah Sicherheitsupdates.",
  },
  {
    title: "Team kennt Phishing-Anzeichen",
    detail: "Mitarbeitende wissen, woran verdächtige E-Mails und Links zu erkennen sind.",
  },
  {
    title: "Zentrale Dateiablage",
    detail: "Wichtige Dokumente liegen zentral in der Cloud, nicht verstreut auf einzelnen Geräten.",
  },
  {
    title: "Zugriffsrechte klar geregelt",
    detail: "Nur Personen mit tatsächlichem Bedarf haben Zugriff auf sensible Daten.",
  },
  {
    title: "Notfallplan vorhanden",
    detail: "Es ist klar, was bei einem IT-Ausfall oder Cyberangriff zu tun ist und wer kontaktiert wird.",
  },
  {
    title: "Überblick über die Datenverarbeitung",
    detail: "Es gibt eine Übersicht, welche Kunden- und Mitarbeiterdaten wo verarbeitet werden.",
  },
  {
    title: "Fester IT-Ansprechpartner",
    detail: "Es gibt eine feste Anlaufstelle für IT-Fragen, statt wechselnder Hotlines.",
  },
];

function wrapText(text, font, size, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

async function main() {
  const pdf = await PDFDocument.create();
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const regular = await pdf.embedFont(StandardFonts.Helvetica);

  let page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = PAGE_HEIGHT - MARGIN;

  function newPageIfNeeded(spaceNeeded) {
    if (y - spaceNeeded < MARGIN + 60) {
      page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
      y = PAGE_HEIGHT - MARGIN;
    }
  }

  page.drawText("IT-Sicherheits-Checkliste", {
    x: MARGIN,
    y,
    size: 24,
    font: bold,
    color: INK,
  });
  y -= 20;
  page.drawText("für Handwerksbetriebe", { x: MARGIN, y, size: 16, font: regular, color: ACCENT });
  y -= 34;

  const introLines = wrapText(
    "Zwölf konkrete Punkte, mit denen Sie in wenigen Minuten einschätzen können, wie gut Ihr Betrieb " +
      "gegen die häufigsten IT-Risiken abgesichert ist. Häkchen setzen, offene Punkte priorisiert angehen.",
    regular,
    11,
    CONTENT_WIDTH,
  );
  for (const line of introLines) {
    page.drawText(line, { x: MARGIN, y, size: 11, font: regular, color: MUTED });
    y -= 16;
  }
  y -= 18;

  for (const [index, item] of items.entries()) {
    const detailLines = wrapText(item.detail, regular, 10.5, CONTENT_WIDTH - 36);
    const blockHeight = 20 + detailLines.length * 14 + 14;
    newPageIfNeeded(blockHeight);

    page.drawRectangle({
      x: MARGIN,
      y: y - 12,
      width: 12,
      height: 12,
      borderWidth: 1.2,
      borderColor: ACCENT,
      color: rgb(1, 1, 1),
    });

    page.drawText(`${index + 1}. ${item.title}`, {
      x: MARGIN + 24,
      y: y - 11,
      size: 12.5,
      font: bold,
      color: INK,
    });
    y -= 20;

    for (const line of detailLines) {
      page.drawText(line, { x: MARGIN + 24, y, size: 10.5, font: regular, color: MUTED });
      y -= 14;
    }
    y -= 14;
  }

  newPageIfNeeded(80);
  page.drawLine({
    start: { x: MARGIN, y },
    end: { x: PAGE_WIDTH - MARGIN, y },
    thickness: 1,
    color: rgb(0.85, 0.85, 0.88),
  });
  y -= 24;
  page.drawText("Unsicher, wo Sie anfangen sollen?", { x: MARGIN, y, size: 12, font: bold, color: INK });
  y -= 18;
  page.drawText(
    "JB Solutions – IT-Modernisierung für Handwerksbetriebe auf Basis von Microsoft 365.",
    { x: MARGIN, y, size: 10.5, font: regular, color: MUTED },
  );
  y -= 16;
  page.drawText("boch-solutions.de  ·  kontakt@boch-solutions.de  ·  +49 251 28069471", {
    x: MARGIN,
    y,
    size: 10.5,
    font: regular,
    color: MUTED,
  });

  const bytes = await pdf.save();
  await writeFile(new URL("../public/downloads/it-sicherheits-checkliste.pdf", import.meta.url), bytes);
  console.log("Checkliste-PDF erzeugt: public/downloads/it-sicherheits-checkliste.pdf");
}

main();
