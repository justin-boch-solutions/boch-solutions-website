/**
 * Macht aus presse/pressemitteilung-email-sicherheit.md zwei Dateien:
 *
 *   presse/pressemitteilung.html   – A4-Layout mit Logo, im Browser mit Cmd+P
 *                                    als PDF zu sichern
 *   presse/pressemitteilung-word.html – schlichte Fassung, aus der textutil
 *                                    das .docx erzeugt (siehe README im Ordner)
 *
 * Der Markdown-Teil ist bewusst klein gehalten: Er kennt genau die Konstrukte,
 * die in der Pressemitteilung vorkommen. Kommt etwas Neues dazu, bricht es hier
 * sichtbar und nicht still im fertigen PDF.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { logoInline } from "./logo-hell.ts";

const basis = dirname(fileURLToPath(import.meta.url));
const wurzel = join(basis, "..");
const quelle = join(wurzel, "presse", "pressemitteilung-email-sicherheit.md");

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Fett und Code innerhalb einer Zeile. Reihenfolge: erst escapen, dann Auszeichnung. */
function inline(s: string): string {
  return esc(s)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function markdownZuHtml(md: string): string {
  const zeilen = md.split("\n");
  let leadGesetzt = false;
  const aus: string[] = [];
  let i = 0;

  while (i < zeilen.length) {
    const z = zeilen[i];

    if (!z.trim()) {
      i++;
      continue;
    }

    // Tabelle: Kopfzeile, Trennzeile, dann Datenzeilen
    if (z.startsWith("|") && zeilen[i + 1]?.startsWith("|") && /^\|[\s:|-]+\|$/.test(zeilen[i + 1])) {
      const zellen = (r: string) =>
        r.slice(1, -1).split("|").map((c) => c.trim());
      const kopf = zellen(z);
      i += 2;
      const koerper: string[][] = [];
      while (i < zeilen.length && zeilen[i].startsWith("|")) {
        koerper.push(zellen(zeilen[i]));
        i++;
      }
      aus.push(
        "<table><thead><tr>" +
          kopf.map((c) => `<th>${inline(c)}</th>`).join("") +
          "</tr></thead><tbody>" +
          koerper
            .map((r) => "<tr>" + r.map((c) => `<td>${inline(c)}</td>`).join("") + "</tr>")
            .join("") +
          "</tbody></table>",
      );
      continue;
    }

    // Liste
    if (/^[-*] /.test(z) || /^\d+\. /.test(z)) {
      const geordnet = /^\d+\. /.test(z);
      const punkte: string[] = [];
      while (i < zeilen.length && (/^[-*] /.test(zeilen[i]) || /^\d+\. /.test(zeilen[i]))) {
        punkte.push(zeilen[i].replace(/^([-*]|\d+\.) /, ""));
        i++;
      }
      const t = geordnet ? "ol" : "ul";
      aus.push(`<${t}>` + punkte.map((p) => `<li>${inline(p)}</li>`).join("") + `</${t}>`);
      continue;
    }

    const h = z.match(/^(#{1,4}) (.+)$/);
    if (h) {
      const tiefe = h[1].length;
      // "# Pressemitteilung" wird zur Kopfzeile, nicht zur Überschrift
      if (tiefe === 1) aus.push(`<p class="kennung">${inline(h[2])}</p>`);
      else if (tiefe === 2) aus.push(`<h1>${inline(h[2])}</h1>`);
      else aus.push(`<h2>${inline(h[2])}</h2>`);
      i++;
      continue;
    }

    // Absatz: bis zur nächsten Leerzeile oder zum nächsten Block.
    // Achtung: Der Marker muss ein echter Blockanfang sein – "**fett**" beginnt
    // ebenfalls mit "*" und darf hier nicht als Liste gelten, sonst kommt die
    // Schleife nie voran.
    const BLOCKANFANG = /^(#{1,4} |\||[-*] |\d+\. )/;
    const teile: string[] = [];
    while (i < zeilen.length && zeilen[i].trim() && !BLOCKANFANG.test(zeilen[i])) {
      teile.push(zeilen[i].trim());
      i++;
    }
    if (!teile.length) {
      // Nichts erkannt und nichts verbraucht – lieber laut scheitern als hängen.
      throw new Error(`Unbekannte Zeile ${i + 1}: ${zeilen[i].slice(0, 60)}`);
    }
    {
      const text = teile.join(" ");
      // Komplett fett gesetzte Absätze haben drei Rollen: der erste ist der
      // Lead, spätere sind Merksätze – außer sie enden mit Doppelpunkt, dann
      // leiten sie nur eine Liste ein und bleiben normaler Fließtext.
      let klasse = "";
      if (/^\*\*.+\*\*$/.test(text) && !text.trimEnd().endsWith(":**")) {
        klasse = leadGesetzt ? " class=\"merksatz\"" : " class=\"lead\"";
        leadGesetzt = true;
      }
      aus.push(`<p${klasse}>${inline(text)}</p>`);
    }
  }

  return aus.join("\n");
}

/**
 * Das Datum der Kopfzeile ist der Tag der Veröffentlichung, nicht der Tag, an
 * dem der Text entstand – deshalb steht im Markdown nur {{DATUM}} und hier
 * wird beim Erzeugen das heutige Datum eingesetzt. Das Erhebungsdatum in der
 * Methodik bleibt davon unberührt: Es ist eine Datenangabe, keine Aktualität.
 */
const MONATE = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
const heute = new Date();
const datum = `${heute.getDate()}. ${MONATE[heute.getMonth()]} ${heute.getFullYear()}`;

const rumpf = markdownZuHtml(readFileSync(quelle, "utf8").replaceAll("{{DATUM}}", datum));
const logo = logoInline(wurzel);

const DRUCK = `<!doctype html>
<html lang="de"><head><meta charset="utf-8">
<title>Pressemitteilung – Justin Boch - Solutions</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  @page { size: A4; margin: 20mm 18mm 18mm 18mm; }
  * { box-sizing: border-box; }
  body {
    margin: 0; font-family: Inter, -apple-system, Helvetica, sans-serif;
    font-size: 10.2pt; line-height: 1.55; color: #15181d;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  .blatt { max-width: 174mm; margin: 0 auto; padding: 14mm 0; }
  @media print { .blatt { padding: 0; max-width: none; } }

  .kopf {
    display: flex; align-items: flex-end; justify-content: space-between;
    border-bottom: 1.6pt solid #15181d; padding-bottom: 4mm; margin-bottom: 9mm;
  }
  .kopf .logo { width: 44mm; height: auto; display: block; }
  .kennung {
    margin: 0; font-size: 8.4pt; font-weight: 700; letter-spacing: .18em;
    text-transform: uppercase; color: #5b6472;
  }

  h1 {
    font-size: 19pt; line-height: 1.22; font-weight: 700;
    margin: 0 0 5mm; letter-spacing: -.01em;
  }
  h2 {
    font-size: 11.4pt; font-weight: 700; margin: 8mm 0 2.5mm;
    page-break-after: avoid; break-after: avoid;
  }
  p { margin: 0 0 3.2mm; hyphens: auto; }
  p.lead {
    font-size: 11.4pt; line-height: 1.5; font-weight: 600;
    margin-bottom: 6mm; color: #22272f;
  }
  p.merksatz {
    margin: 4mm 0 4.5mm; padding: 2.6mm 0 2.6mm 4mm;
    border-left: 2.2pt solid #15181d; background: #f7f8fa;
    font-weight: 600; page-break-inside: avoid; break-inside: avoid;
  }
  strong { font-weight: 700; }
  ul, ol { margin: 0 0 3.6mm; padding-left: 5mm; }
  li { margin-bottom: 1.4mm; }

  table {
    width: 100%; border-collapse: collapse; margin: 3mm 0 5mm;
    font-size: 9.4pt; page-break-inside: avoid; break-inside: avoid;
  }
  th {
    text-align: left; font-weight: 700; padding: 1.8mm 2.5mm;
    border-bottom: 1.1pt solid #15181d; background: #f4f5f7;
  }
  td { padding: 1.6mm 2.5mm; border-bottom: .4pt solid #d8dce2; }
  th:not(:first-child), td:not(:first-child) { text-align: right; }

  .fuss {
    margin-top: 10mm; padding-top: 3.5mm; border-top: .6pt solid #c8cdd4;
    font-size: 8.6pt; color: #5b6472;
  }
</style></head>
<body><div class="blatt">
  <div class="kopf">
    ${logo}
    <p class="kennung">Pressemitteilung</p>
  </div>
  ${rumpf.replace('<p class="kennung">Pressemitteilung</p>', "")}
  <p class="fuss">Justin Boch - Solutions · Münster · 0251 28069471 · kontakt@boch-solutions.de · boch-solutions.de</p>
</div></body></html>`;

// Schlichte Fassung für textutil: keine @page-Regeln, keine Flexbox, kein Base64-SVG.
const WORD = `<!doctype html><html lang="de"><head><meta charset="utf-8">
<title>Pressemitteilung</title>
<style>
  body { font-family: Helvetica, Arial, sans-serif; font-size: 11pt; color: #15181d; line-height: 1.5; }
  h1 { font-size: 18pt; }
  h2 { font-size: 12pt; }
  p.kennung { font-size: 9pt; letter-spacing: 2px; color: #5b6472; }
  p.lead { font-size: 12pt; font-weight: bold; }
  table { border-collapse: collapse; width: 100%; font-size: 10pt; }
  th { text-align: left; border-bottom: 1px solid #15181d; padding: 4px 6px; background: #f4f5f7; }
  td { border-bottom: 1px solid #d8dce2; padding: 4px 6px; }
</style></head><body>
${rumpf}
<hr>
<p>Justin Boch - Solutions · Münster · 0251 28069471 · kontakt@boch-solutions.de · boch-solutions.de</p>
</body></html>`;

writeFileSync(join(wurzel, "presse", "pressemitteilung.html"), DRUCK);
writeFileSync(join(wurzel, "presse", "pressemitteilung-word.html"), WORD);
console.log("geschrieben: presse/pressemitteilung.html und presse/pressemitteilung-word.html");
