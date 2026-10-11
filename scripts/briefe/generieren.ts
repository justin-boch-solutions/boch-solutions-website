/**
 * Erzeugt druckfertige Briefe (DIN A4) aus scripts/briefe/empfaenger.json.
 *
 * Aufruf:   npm run briefe
 * Ergebnis: scripts/briefe/ausgabe/briefe.html  → im Browser öffnen, Strg/Cmd+P.
 *
 * Grundsatz: Die Befunde werden bei jedem Lauf live geprüft. Im Brief steht nie
 * etwas, das im Moment des Drucks nicht stimmt – hat ein Betrieb seinen Fehler
 * zwischenzeitlich behoben, verschwindet der Punkt automatisch aus seinem Brief.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { checkEmailSecurity, type EmailSecurityReport } from "../../lib/email-security.ts";
import { company, formatEuro, pricing } from "../../lib/constants.ts";
import { logoFuerHellenHintergrund } from "../logo-hell.ts";
import { pruefeWebseiten, type WebBefund } from "./website-check.ts";
import { analysiereSeite, type SeitenBefund } from "./seiten-analyse.ts";

interface Empfaenger {
  domain: string; firma: string; strasse: string; plz: string; ort: string;
  anrede: string; variante: "A" | "B";
}

const basis = join(import.meta.dirname);
const empfaenger: Empfaenger[] = JSON.parse(readFileSync(join(basis, "empfaenger.json"), "utf8"));
/** Für den Druck auf weißem Papier – siehe scripts/logo-hell.ts. */
const logo = Buffer.from(
  logoFuerHellenHintergrund(join(basis, "..", "..")).svg,
  "utf8",
).toString("base64");

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const heute = new Date().toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });

/** Fehlende Pflichtfelder sichtbar machen, statt sie stillschweigend leer zu drucken. */
const PFLICHT: (keyof Empfaenger)[] = ["firma", "strasse", "plz", "ort", "anrede"];
function feld(e: Empfaenger, k: keyof Empfaenger): string {
  const v = (e[k] ?? "").toString().trim();
  return v ? esc(v) : `<span class="luecke">[${k} fehlt]</span>`;
}

/** Kopfbereich mit Logo und Absender – auf beiden Seiten gleich. */
function kopf(): string {
  return `
  <header class="briefkopf">
    <img class="logo" alt="${esc(company.name)}" src="data:image/svg+xml;base64,${logo}">
    <div class="absender">
      <strong>${esc(company.name)}</strong><br>
      ${esc(company.owner)}<br>
      ${esc(company.address.street)}<br>
      ${esc(company.address.zip)} ${esc(company.address.city)}<br>
      <span class="abstand"></span>
      ${esc(company.phone)}<br>
      ${esc(company.email)}<br>
      ${esc(company.domain)}
    </div>
  </header>`;
}

function fuss(seite: number): string {
  return `
  <footer class="fuss">
    Geprüft wurden ausschließlich öffentlich abrufbare Angaben zu Ihrer Domain am ${heute}. Auf Postfächer, Server oder Inhalte wurde zu keinem Zeitpunkt zugegriffen.
    Wenn Sie keine Post von mir wünschen, genügt eine kurze Nachricht an ${esc(company.email)}.
    <span class="fuss-firma">${esc(company.legalName)} · ${esc(company.owner)} · ${esc(company.address.street)}, ${esc(company.address.zip)} ${esc(company.address.city)}${company.vatId ? ` · USt-IdNr. ${esc(company.vatId)}` : ""} · Seite ${seite} von 3</span>
  </footer>`;
}

/** Seite 1: Anschrift, E-Mail-Befund, Angebot. */
function seiteEins(e: Empfaenger, r: EmailSecurityReport): string {
  const offen = r.findings.filter((f) => f.severity !== "ok");

  const einstieg = e.variante === "A"
    ? `ich habe heute geprüft, was über Ihre Domain <strong>${esc(e.domain)}</strong> öffentlich im Internet einsehbar ist. Dabei ist mir aufgefallen: Derzeit kann <strong>jeder Fremde E-Mails verschicken, die als Absender Ihre Firmenadresse tragen.</strong> Zum Beispiel eine Rechnung an Ihre Kundschaft – mit einer fremden Bankverbindung.`
    : `ich habe heute geprüft, was über Ihre Domain <strong>${esc(e.domain)}</strong> öffentlich im Internet einsehbar ist. Dabei ist mir aufgefallen: Ihre E-Mails gehen ohne digitale Signatur raus. <strong>Angebote landen dadurch häufiger im Spam-Ordner Ihrer Kundschaft</strong> – ohne dass Sie oder der Empfänger etwas davon merken.`;

  const m365 = r.isMicrosoft365
    ? `<div class="hinweis"><strong>Das Besondere an Ihrem Fall:</strong> Sie arbeiten bereits mit Microsoft 365. Der Schutz, der hier fehlt, ist in Ihrem Vertrag <strong>enthalten und bezahlt</strong> – er wurde bei der Einrichtung nur nie eingeschaltet. Das war bei fast allen Betrieben so, die ich in Münster geprüft habe.</div>`
    : "";

  return `
<section class="seite">
  <div class="marken" aria-hidden="true"><i class="falz1"></i><i class="loch"></i><i class="falz2"></i></div>
  ${kopf()}
  <div class="ruecksender">${esc(company.name)} · ${esc(company.address.street)} · ${esc(company.address.zip)} ${esc(company.address.city)}</div>
  <div class="anschrift">
    ${feld(e, "firma")}<br>
    ${feld(e, "strasse")}<br>
    ${feld(e, "plz")} ${feld(e, "ort")}
  </div>
  <div class="datum">Münster, ${heute}</div>

  <h1>${
    offen.length === 1
      ? `Ein Punkt an Ihrer E-Mail-Einrichtung, der Sie ${e.variante === "A" ? "Geld" : "Aufträge"} kosten kann`
      : `${offen.length} Punkte an Ihrer E-Mail-Einrichtung, die Sie ${e.variante === "A" ? "Geld" : "Aufträge"} kosten können`
  }</h1>

  <p>${feld(e, "anrede")},</p>
  <p>${einstieg}</p>

  <div class="befund">
    <div class="befund-kopf">E-Mail-Befund für ${esc(e.domain)} · ${heute}</div>
    ${offen.map((f) => `
      <div class="punkt">
        <div class="punkt-titel">${esc(f.title)}</div>
        <div class="punkt-detail">${esc(f.detail)}</div>
      </div>`).join("")}
  </div>

  ${m365}

  <p>Ich habe das bei meiner eigenen Domain vor Kurzem in Ordnung gebracht und kann Ihnen den Nachweis vorher und nachher zeigen. Für Ihren Betrieb wäre es ein Festpreis von <strong>${esc(formatEuro(pricing.emailProtection))}</strong>, ohne Betriebsunterbrechung: Ich richte die fehlenden Einträge ein, werte vier Wochen die Berichte aus und ziehe den Schutz dann auf die strenge Stufe.</p>

  <p class="weiter">Auf den nächsten beiden Seiten: Ihre Webseite – und was ich vorschlagen würde. →</p>
  ${fuss(1)}
</section>`;
}

/** Seite 2: Alles, was an der Webseite auffällt – Messung und Inhalt zusammen. */
function seiteZwei(e: Empfaenger, w: WebBefund | undefined, a: SeitenBefund | undefined): string {
  const werte = w?.werte;
  const note = (n: number) => (n >= 90 ? "gut" : n >= 50 ? "mittel" : "schwach");

  const tabelle = werte
    ? `<table class="noten">
        <tr>
          ${[["Ladezeit Handy", werte.performance], ["Technisches SEO", werte.seo], ["Barrierefreiheit", werte.barrierefreiheit], ["Technische Praxis", werte.praxis]]
            .map(([l, n]) => `<td><div class="note note-${note(n as number)}">${n}</div><div class="note-label">${l}</div></td>`).join("")}
        </tr>
      </table>
      ${w?.lcp ? `<p class="messwert">Bis der Hauptinhalt auf dem Handy steht, vergehen <strong>${esc(w.lcp)}</strong>. Alles über 2,5 Sekunden wertet Google als zu langsam.</p>` : ""}`
    : `<p>Die automatische Messung Ihrer Webseite schlug fehl – das kann an einer Weiterleitung oder einer Schutzeinstellung liegen. Ich schaue gern manuell darauf.</p>`;

  // Technische und inhaltliche Befunde zusammenführen, höchstens fünf, damit die
  // Seite nicht überläuft und der Brief nicht zur Mängelliste wird.
  const technisch = (w?.hinweise ?? []).map((h) => ({ titel: "", text: h }));
  const inhaltlich = a?.punkte ?? [];
  const alle = [...inhaltlich, ...technisch].slice(0, 5);

  const liste = alle.length
    ? `<div class="befund befund-web">
         <div class="befund-kopf">Was mir aufgefallen ist</div>
         ${alle.map((x) => `<div class="punkt">${x.titel ? `<div class="punkt-titel">${esc(x.titel)}</div>` : ""}<div class="punkt-text">${esc(x.text)}</div></div>`).join("")}
       </div>`
    : `<div class="hinweis"><strong>Ihre Webseite ist technisch und inhaltlich in Ordnung.</strong> Hier sehe ich keinen dringenden Handlungsbedarf – das ist seltener, als Sie vielleicht denken.</div>`;

  return `
<section class="seite">
  <div class="marken" aria-hidden="true"><i class="falz1"></i><i class="loch"></i><i class="falz2"></i></div>
  ${kopf()}
  <h2 class="seite2-titel">Ihre Webseite: ${esc(e.domain)}</h2>
  <p>Weil ich ohnehin schon hingeschaut habe, hier das Ergebnis derselben Messung, die Google selbst verwendet – aufgerufen wie von einem Handy mit normaler Mobilfunkverbindung. 100 ist das Beste, was erreichbar ist.</p>
  ${tabelle}
  ${liste}
  <p class="weiter">Was ich daraus machen würde, steht auf der nächsten Seite. →</p>
  ${fuss(2)}
</section>`;
}

/** Seite 3: Vorschlag, Preise, Abschluss. Steht unabhängig von der Befundlage. */
function seiteDrei(e: Empfaenger, a: SeitenBefund | undefined): string {
  const keineKarriere = (a?.punkte ?? []).some((p) => p.titel.includes("Bewerber"));

  return `
<section class="seite">
  <div class="marken" aria-hidden="true"><i class="falz1"></i><i class="loch"></i><i class="falz2"></i></div>
  ${kopf()}
  <h2 class="seite2-titel">Was eine Webseite für einen Handwerksbetrieb leisten muss</h2>

  <p>Die meisten Angebote drehen sich um Gestaltung. Aus meiner Sicht hat eine Handwerker-Webseite aber vor allem zwei Aufgaben – und die zweite wird fast immer vergessen.</p>

  <div class="aufgabe">
    <div class="aufgabe-nr">1</div>
    <div>
      <div class="aufgabe-titel">Anfragen bringen</div>
      <div class="aufgabe-text">Dafür braucht es eine eigene Seite je Leistung und Einzugsgebiet – sonst treten Sie bei jeder Suche mit derselben Startseite an –, eine Telefonnummer, die auf dem Handy antippbar ist, und ein gepflegtes Google-Unternehmensprofil. Für die Suche nach einem Handwerker in der Nähe zählt das Profil oft mehr als die Webseite selbst.</div>
    </div>
  </div>

  <div class="aufgabe">
    <div class="aufgabe-nr">2</div>
    <div>
      <div class="aufgabe-titel">Mitarbeiter gewinnen</div>
      <div class="aufgabe-text">${keineKarriere
        ? "Bei Ihnen finde ich dazu nichts. Wer heute eine Stelle sucht, schaut sich den Betrieb vorher im Netz an – und was er dort nicht findet, spricht gegen Sie. Eine Seite, die zeigt wie ein Arbeitstag aussieht, welche Fahrzeuge und Werkzeuge es gibt und wer der Ansprechpartner ist, kostet einen Bruchteil einer Stellenanzeige und wirkt dauerhaft."
        : "Sie haben dazu bereits etwas auf der Seite – das ist mehr, als die meisten Betriebe haben. Der Unterschied liegt dann in der Ausführung: Ein Arbeitstag, Fahrzeuge und Werkzeug, ein Ansprechpartner mit Foto überzeugen deutlich mehr als eine abgetippte Stellenanzeige."}</div>
    </div>
  </div>

  <h2 class="seite3-titel">Wie ich vorgehen würde</h2>
  <p>Zuerst die E-Mail-Einrichtung von Seite 1 – das ist das Dringendste, kostet ${esc(formatEuro(pricing.emailProtection))} und ist in zwei Stunden erledigt. Danach entscheiden Sie in Ruhe, ob die Webseite dran ist. Ich dränge da zu nichts; wer mit seiner Auftragslage zufrieden ist, braucht keine neue Seite.</p>

  <p>Falls doch: Ein kompakter Auftritt beginnt bei ${esc(formatEuro(pricing.onepager))}, ein vollständiger Firmenauftritt mit mehreren Unterseiten bei ${esc(formatEuro(pricing.firmenauftritt))}. Dazu Hosting ab ${esc(formatEuro(pricing.hosting))} im Monat. Alle Preise stehen offen auf ${esc(company.domain)}/pakete – bei kaum einem Mitbewerber finden Sie das.</p>

  <p>Zum Vergleich: Mehrere IT-Dienstleister in Münster, mit demselben Verfahren gemessen, liegen bei der Ladezeit zwischen 57 und 86. Meine eigene Seite liegt bei 99 – weil man das können sollte, wenn man es verkauft.</p>

  <p>Melden Sie sich einfach, wenn Sie darüber sprechen möchten: ${esc(company.phone)} oder ${esc(company.email)}. Und wenn nicht – lassen Sie wenigstens die E-Mail-Einstellungen von Seite 1 in Ordnung bringen, auch von jemand anderem.</p>

  <p class="gruss">Mit freundlichen Grüßen</p>
  <div class="signatur">${esc(company.owner)}</div>
  ${fuss(3)}
</section>`;
}

console.log("\nWebseiten prüfen (kann beim ersten Lauf dauern):");
const webBefunde = await pruefeWebseiten(empfaenger.map((e) => e.domain), join(basis, "..", ".."));

console.log("\nInhalte der Webseiten prüfen:");
const seitenBefunde = new Map<string, SeitenBefund>();
for (const r of await Promise.all(empfaenger.map((e) => analysiereSeite(e.domain)))) {
  seitenBefunde.set(r.domain, r);
  console.log(`  ${r.domain.padEnd(30)} ${r.punkte.length} inhaltliche(r) Befund(e)`);
}

console.log("\nE-Mail-Einträge prüfen:");
const seiten: string[] = [];
const maengel: string[] = [];
for (const e of empfaenger) {
  for (const k of PFLICHT) if (!(e[k] ?? "").toString().trim()) maengel.push(`${e.domain}: ${k}`);
  const r = await checkEmailSecurity(e.domain);
  seiten.push(seiteEins(e, r), seiteZwei(e, webBefunde.get(e.domain), seitenBefunde.get(e.domain)), seiteDrei(e, seitenBefunde.get(e.domain)));
  const offen = r.findings.filter((f) => f.severity !== "ok").length;
  console.log(`  ${e.variante}  ${e.domain.padEnd(30)} ${r.verdict.padEnd(12)} ${offen} Befund(e)${r.isMicrosoft365 ? "  M365" : ""}`);
}

const html = `<!doctype html><html lang="de"><meta charset="utf-8">
<title>Briefe · ${heute}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: Inter, "Helvetica Neue", Arial, sans-serif; color: #15181d; font-size: 10.5pt; line-height: 1.55; }

  /* Exakt 296 mm statt 297: Bei genau A4-Höhe erzeugen Browser durch Rundung
     regelmäßig eine leere Folgeseite. Ein Millimeter weniger verhindert das. */
  .seite { width: 210mm; height: 296mm; padding: 14mm 20mm 12mm 25mm; page-break-after: always; break-after: page; overflow: hidden; display: flex; flex-direction: column; position: relative; }
  .seite:last-child { page-break-after: auto; break-after: auto; }
  /* Falt- und Lochmarken nach DIN 5008 Form B, gemessen von der Blattoberkante:
     Falzmarke bei 105 mm und 210 mm, Lochmarke mittig bei 148,5 mm. Nach dem
     Falten an diesen Linien passt der Brief in ein Fensterkuvert DIN lang.
     Auf jedem Blatt, damit auch ein Stapel sauber gefalzt werden kann. */
  .marken { position: absolute; left: 0; top: 0; width: 10mm; height: 100%; pointer-events: none; }
  .marken i { position: absolute; left: 0; display: block; border-top: .4pt solid #b4bac2; }
  .marken .falz1 { top: 105mm; width: 5mm; }
  .marken .loch  { top: 148.5mm; width: 8mm; border-top-color: #9aa0a8; }
  .marken .falz2 { top: 210mm; width: 5mm; }

  .briefkopf { display: flex; justify-content: space-between; align-items: flex-start; gap: 10mm; flex: 0 0 auto; }
  .logo { width: 46mm; height: auto; display: block; }
  .absender { font-size: 8pt; line-height: 1.5; color: #4a5059; text-align: right; }
  .absender strong { color: #15181d; font-size: 8.5pt; }
  .abstand { display: block; height: 2mm; }

  .ruecksender { margin-top: 10mm; font-size: 7pt; color: #6b7280; border-bottom: .4pt solid #9aa0a8; padding-bottom: .8mm; width: 85mm; }
  .anschrift { width: 85mm; margin-top: 3mm; font-size: 11pt; line-height: 1.5; }
  .datum { text-align: right; font-size: 9.5pt; color: #4a5059; margin-top: -14mm; margin-bottom: 15mm; }

  h1 { font-size: 13.5pt; font-weight: 700; line-height: 1.35; margin: 0 0 5mm; letter-spacing: -.01em; }
  .seite2-titel { font-size: 13.5pt; font-weight: 700; margin: 9mm 0 4mm; letter-spacing: -.01em; }
  p { margin: 0 0 3.8mm; }

  .befund { border: .5pt solid #d6dae0; border-left: 2.5pt solid #7c3aed; border-radius: 1.5mm; padding: 4mm 5mm 2mm; margin: 0 0 4.5mm; background: #fafbfc; }
  .befund-web { border-left-color: #0891b2; }
  .befund-kopf { font-size: 7.5pt; text-transform: uppercase; letter-spacing: .09em; color: #6b7280; margin-bottom: 3mm; }
  .punkt { margin-bottom: 3mm; }
  .punkt-titel { font-weight: 600; font-size: 10.5pt; margin-bottom: .8mm; }
  .punkt-detail { font-family: ui-monospace, "SF Mono", Menlo, monospace; font-size: 7.8pt; color: #5b6472; line-height: 1.45; word-break: break-word; }
  .punkt-text { font-size: 10pt; line-height: 1.5; }

  .hinweis { border-left: 2.5pt solid #0891b2; background: #f3fbfc; padding: 3.5mm 5mm; margin: 0 0 4.5mm; border-radius: 1.5mm; font-size: 10pt; }

  /* Notenblock auf Seite 2 */
  .noten { width: 100%; border-collapse: collapse; margin: 0 0 3mm; }
  .noten td { width: 25%; text-align: center; padding: 0 2mm; vertical-align: top; }
  .note { width: 15mm; height: 15mm; line-height: 15mm; margin: 0 auto; border-radius: 50%; font-size: 14pt; font-weight: 700; color: #fff; }
  .note-gut { background: #15803d; }
  .note-mittel { background: #b45309; }
  .note-schwach { background: #b91c1c; }
  .note-label { margin-top: 1.5mm; font-size: 8pt; color: #5b6472; line-height: 1.3; }
  .messwert { font-size: 9.5pt; color: #5b6472; }

  .weiter { margin-top: auto; font-weight: 600; color: #7c3aed; }
  .seite3-titel { font-size: 12.5pt; font-weight: 700; margin: 4mm 0 3mm; letter-spacing: -.01em; }
  .aufgabe { display: flex; gap: 4mm; margin: 0 0 3mm; }
  .aufgabe-nr { flex: 0 0 8mm; height: 8mm; border-radius: 50%; background: #7c3aed; color: #fff; font-weight: 700; font-size: 11pt; text-align: center; line-height: 8mm; }
  .aufgabe-titel { font-weight: 600; font-size: 11pt; margin-bottom: 1mm; }
  .aufgabe-text { font-size: 9.8pt; line-height: 1.45; color: #2b313a; }
  .gruss { margin-top: auto; margin-bottom: 0; }
  .signatur { margin-top: 10mm; margin-bottom: 4mm; font-size: 11pt; font-weight: 500; }

  .luecke { color: #d01a1a; font-weight: 700; background: #ffe9e9; padding: 0 1mm; }

  .fuss { flex: 0 0 auto; padding-top: 2mm; font-size: 7pt; color: #7b828c; line-height: 1.45; border-top: .4pt solid #dcdfe4; }
  .fuss-firma { display: block; margin-top: 1mm; color: #9aa0a8; }

  @media screen {
    body { background: #d9dce0; padding: 10mm 0; }
    .seite { background: #fff; margin: 0 auto 8mm; box-shadow: 0 2px 14px rgba(0,0,0,.2); }
  }
</style>
${seiten.join("\n")}
</html>`;

mkdirSync(join(basis, "ausgabe"), { recursive: true });
writeFileSync(join(basis, "ausgabe", "briefe.html"), html);

console.log(`\n  ${empfaenger.length} Briefe → scripts/briefe/ausgabe/briefe.html`);
if (maengel.length) {
  console.log(`\n  ACHTUNG – ${maengel.length} fehlende Angaben, im Brief rot markiert:`);
  for (const m of maengel) console.log(`    ${m}`);
} else {
  console.log("  Alle Pflichtangaben vollständig.");
}
