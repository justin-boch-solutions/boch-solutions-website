/**
 * Erzeugt handbuch.html – eine einzelne Datei zum Doppelklicken.
 *
 * Drei Bereiche:
 *   Leistungen  – Preise und Umfang aus lib/leistungen.ts, Betriebswissen aus lib/handbuch.ts
 *   Microsoft   – Pläne, Umstellungswege und Checkliste aus lib/microsoft.ts
 *   Nachschlagen– Preisübersicht auf einen Blick
 *
 * Keine Zahl wird hier geschrieben. Preise kommen aus lib/constants.ts,
 * Microsofts Listenpreise aus lib/microsoft.ts samt Prüfdatum.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { gruppenMeta, leistungen, preisText, type Gruppe } from "../lib/leistungen.ts";
import { handbuch } from "../lib/handbuch.ts";
import { checkliste, dienste, faehigkeiten, plaene, PREIS_STAND, QUELLE, szenarien, zusaetze } from "../lib/microsoft.ts";
import { ablaeufe, einwaende, gespraeche } from "../lib/ablaeufe.ts";
import { company, formatEuro, pricing } from "../lib/constants.ts";

const basis = dirname(fileURLToPath(import.meta.url));
const wurzel = join(basis, "..");

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const fehlend = leistungen.filter((l) => !handbuch[l.id]).map((l) => l.id);
if (fehlend.length) {
  throw new Error(
    `Kein Handbuch-Eintrag für: ${fehlend.join(", ")}. ` +
      "Entweder in lib/handbuch.ts ergänzen oder die Leistung aus dem Katalog nehmen.",
  );
}

const ul = (titel: string, punkte: string[], klasse = "") =>
  punkte.length
    ? `<div class="block ${klasse}"><h4>${esc(titel)}</h4><ul>${punkte.map((p) => `<li>${esc(p)}</li>`).join("")}</ul></div>`
    : "";

const ol = (titel: string, punkte: string[]) =>
  `<div class="block"><h4>${esc(titel)}</h4><ol>${punkte.map((p) => `<li>${esc(p)}</li>`).join("")}</ol></div>`;

/* ---------------------------------------------------------------- Leistungen */

function leistungsKarte(l: (typeof leistungen)[number]): string {
  const h = handbuch[l.id];
  const such = esc([l.name, l.kurz, h.einSatz, ...h.voraussetzungen, ...h.ablauf, ...l.enthalten].join(" ").toLowerCase());
  return `
<article class="karte" data-gruppe="${l.gruppe}" data-suche="${such}" id="l-${l.id}">
  <header class="kkopf">
    <div><h3>${esc(l.name)}</h3><p class="kurz">${esc(l.kurz)}</p></div>
    <span class="preis">${esc(preisText(l))}</span>
  </header>
  <p class="satz">${esc(h.einSatz)}</p>
  <div class="raster">
    ${ul("Das brauche ich vorher", h.voraussetzungen, "braucht")}
    ${ol("So setze ich es um", h.ablauf)}
    ${ul("Enthalten", l.enthalten)}
    ${ul("Nicht enthalten", l.nichtEnthalten, "nicht")}
  </div>
  <div class="fakten">
    <div><h4>Dauer</h4><p>${esc(h.dauer)}</p></div>
    <div><h4>„Warum kostet das so viel?“</h4><p>${esc(h.preisBegruendung)}</p></div>
  </div>
  ${ul("Achtung", h.achtung, "achtung")}
  ${l.hinweis ? `<p class="intern"><strong>Intern:</strong> ${esc(l.hinweis)}</p>` : ""}
</article>`;
}

const gruppenIds = (Object.keys(gruppenMeta) as Gruppe[]).filter((g) => leistungen.some((l) => l.gruppe === g));

const leistungsBereich = gruppenIds
  .map(
    (g) => `<section class="gruppe" data-gruppe="${g}" id="g-${g}">
      <h2>${esc(gruppenMeta[g].label)}</h2>
      <p class="ginfo">${esc(gruppenMeta[g].beschreibung)}</p>
      ${leistungen.filter((l) => l.gruppe === g).map(leistungsKarte).join("")}
    </section>`,
  )
  .join("");

/* ----------------------------------------------------------------- Microsoft */

const kannListe = (id: string) =>
  faehigkeiten.filter((f) => f.durch.includes(id)).map((f) => f.name);
const kannNichtListe = (id: string) =>
  faehigkeiten.filter((f) => !f.durch.includes(id) && f.durch.some((d) => plaene.some((p) => p.id === d))).map((f) => f.name);

const planKarten = plaene
  .map((p) => {
    const such = esc([p.name, p.fuer, ...kannListe(p.id)].join(" ").toLowerCase());
    return `
<article class="karte" data-suche="${such}">
  <header class="kkopf">
    <div><h3>${esc(p.name)}</h3><p class="kurz">${esc(p.grenze)}</p></div>
    <span class="preis">${esc(formatEuro(p.preis))} / Nutzer / Monat</span>
  </header>
  <p class="satz">${esc(p.fuer)}</p>
  ${p.preisMonatlich ? `<p class="intern">Bei monatlicher Kündbarkeit ${esc(formatEuro(p.preisMonatlich))} statt ${esc(formatEuro(p.preis))} – rund 20 % Aufschlag.</p>` : ""}
  ${p.hinweis ? `<p class="intern"><strong>Achtung:</strong> ${esc(p.hinweis)}</p>` : ""}
  <div class="raster">
    ${ul("Kann", kannListe(p.id))}
    ${ul("Kann nicht", kannNichtListe(p.id), "nicht")}
  </div>
</article>`;
  })
  .join("");

const zusatzKarten = zusaetze
  .map((z) => {
    const such = esc([z.name, z.was].join(" ").toLowerCase());
    return `
<article class="karte" data-suche="${such}">
  <header class="kkopf">
    <div><h3>${esc(z.name)}</h3><p class="kurz">${esc(z.was)}</p></div>
    <span class="preis ${z.preis === null ? "offen" : ""}">${z.preis === null ? "Preis je Anbieter" : esc(formatEuro(z.preis)) + " / Nutzer / Monat"}</span>
  </header>
  ${z.hinweis ? `<p class="intern">${esc(z.hinweis)}</p>` : ""}
</article>`;
  })
  .join("");

const dienstKarten = dienste
  .map((d) => {
    const such = esc([d.name, d.wofuer, ...d.kann].join(" ").toLowerCase());
    const drin = d.inPlaenen.length
      ? d.inPlaenen.map((i) => plaene.find((p) => p.id === i)?.name ?? i).join(" · ")
      : "Nur als Zusatzprodukt";
    return `
<article class="karte" data-suche="${such}">
  <header class="kkopf">
    <div><h3>${esc(d.name)}</h3><p class="kurz">${esc(d.wofuer)}</p></div>
  </header>
  <div class="raster">
    ${ul("Kann", d.kann)}
    ${ul("Kann nicht", d.kannNicht, "nicht")}
  </div>
  <p class="intern"><strong>Enthalten in:</strong> ${esc(drin)}</p>
</article>`;
  })
  .join("");

const baukasten = `
<div class="karte bk">
  <div class="bk-steuer">
    <label class="bkf"><span>Mitarbeiter</span><input type="number" id="bkAnzahl" min="1" max="300" value="5"></label>
    <label class="bkf"><span>Basisplan</span><select id="bkPlan">${plaene
      .map((p) => `<option value="${p.id}"${p.id === "standard" ? " selected" : ""}>${esc(p.name)} – ${esc(formatEuro(p.preis))}</option>`)
      .join("")}</select></label>
  </div>
  <h4 class="bk-titel">Zusatzprodukte</h4>
  <div class="bk-zusatz">${zusaetze
    .map(
      (z) =>
        `<label class="bkz"><input type="checkbox" data-z="${z.id}"${z.gruppe ? ` data-g="${z.gruppe}"` : ""}>` +
        `<span>${esc(z.name)}<em>${z.preis === null ? "Preis je Anbieter" : esc(formatEuro(z.preis)) + " / Nutzer / Monat"}</em></span></label>`,
    )
    .join("")}</div>
  <div class="bk-ergebnis">
    <div class="bk-summe">
      <div><h4>Microsoft je Monat</h4><p id="bkMonat">–</p></div>
      <div><h4>Microsoft je Jahr</h4><p id="bkJahr">–</p></div>
      <div><h4>Je Mitarbeiter</h4><p id="bkKopf">–</p></div>
    </div>
    <div class="raster">
      <div class="block"><h4>Das kann dieses Paket</h4><ul id="bkKann"></ul></div>
      <div class="block nicht"><h4>Das kann es nicht</h4><ul id="bkKannNicht"></ul></div>
    </div>
    <p class="intern" id="bkHinweis"></p>
  </div>
</div>`;

const szenarioKarten = szenarien
  .map((s) => {
    const such = esc([s.titel, s.ausgangslage, s.empfehlung, ...s.schritte].join(" ").toLowerCase());
    return `
<article class="karte" data-suche="${such}" id="s-${s.id}">
  <header class="kkopf">
    <div><h3>${esc(s.titel)}</h3><p class="kurz">${esc(s.ausgangslage)}</p></div>
    <span class="marke">${esc(s.haeufigkeit)}</span>
  </header>
  <p class="satz"><strong>Empfehlung:</strong> ${esc(s.empfehlung)}</p>
  <div class="raster">
    ${ul("Das brauche ich vorher", s.brauche, "braucht")}
    ${ol("Schritte", s.schritte)}
  </div>
  <div class="fakten"><div><h4>Dauer</h4><p>${esc(s.dauer)}</p></div></div>
  ${ul("Stolpersteine", s.stolpersteine, "achtung")}
</article>`;
  })
  .join("");

const checklisteHtml = `<table class="tab"><thead><tr><th>Was</th><th>Woher</th><th>Worauf achten</th></tr></thead><tbody>${checkliste
  .map((c) => `<tr><td><strong>${esc(c.was)}</strong></td><td>${esc(c.woher)}</td><td>${esc(c.hinweis)}</td></tr>`)
  .join("")}</tbody></table>`;

const microsoftBereich = `
<section class="gruppe" id="ms-baukasten">
  <h2>Paket-Baukasten</h2>
  <p class="ginfo">Mitarbeiterzahl und Plan wählen, Zusätze ankreuzen – darunter steht, was das Paket kann, was es nicht kann und was Microsoft dafür kostet.</p>
  ${baukasten}
</section>
<section class="gruppe" id="ms-plaene">
  <h2>Basispläne</h2>
  <p class="ginfo">Genau einer davon je Mitarbeiter. Listenpreise netto je Nutzer und Monat bei Jahresabrechnung, Stand ${esc(PREIS_STAND)}.
  <a href="${esc(QUELLE)}" target="_blank" rel="noopener">Vor jedem Angebot hier nachsehen</a>.</p>
  ${planKarten}
</section>
<section class="gruppe" id="ms-zusaetze">
  <h2>Zusatzprodukte</h2>
  <p class="ginfo">Kommen zum Basisplan dazu.</p>
  ${zusatzKarten}
</section>
<section class="gruppe" id="ms-dienste">
  <h2>Die Dienste erklärt</h2>
  <p class="ginfo">Was hinter den Namen steckt – was jeder Dienst kann und wo seine Grenze liegt.</p>
  ${dienstKarten}
</section>
<section class="gruppe" id="ms-szenarien">
  <h2>Umstellungswege</h2>
  <p class="ginfo">Die Ausgangslagen, die mir bei Handwerksbetrieben tatsächlich begegnen – sortiert nach Häufigkeit.</p>
  ${szenarioKarten}
</section>
<section class="gruppe" id="ms-checkliste">
  <h2>Vor jeder Umstellung</h2>
  <p class="ginfo">Unabhängig vom Weg: Ohne diese acht Dinge nicht anfangen.</p>
  ${checklisteHtml}
</section>`;

/* ------------------------------------------------------- Gespräche & Abläufe */

/**
 * Vorlagen werden als Daten ins HTML gelegt und im Browser gerendert – nicht
 * hier vorgerendert. Nur so lassen sich daraus beliebig viele Vorgänge mit
 * eigenen Antworten erzeugen.
 */
const vorlagen = [
  ...gespraeche.map((c) => ({
    id: c.id,
    titel: c.titel,
    art: "Gespräch",
    wann: c.wann,
    vorbemerkung: c.vorbemerkung ?? "",
    gruppen: [{ name: "", tor: "", punkte: c.punkte }],
  })),
  ...ablaeufe.map((a) => ({
    id: a.id,
    titel: a.titel,
    art: "Ablauf",
    wann: `${a.fuer} · ${a.dauer}`,
    vorbemerkung: "",
    gruppen: a.phasen.map((f) => ({ name: f.name, tor: f.tor, punkte: f.punkte })),
  })),
];

const einwandKarten = einwaende
  .map((e) => {
    const such = esc([e.satz, e.dahinter, e.antwort].join(" ").toLowerCase());
    return `
<article class="karte einwand" data-suche="${such}">
  <h3 class="esatz">${esc(e.satz)}</h3>
  <div class="raster">
    <div class="block"><h4>Was dahintersteckt</h4><p>${esc(e.dahinter)}</p></div>
    <div class="block antwort"><h4>Was ich sage</h4><p>${esc(e.antwort)}</p></div>
  </div>
  <div class="block achtung"><h4>Was ich nicht mache</h4><p>${esc(e.nicht)}</p></div>
</article>`;
  })
  .join("");

const vorlagenKarten = vorlagen
  .map((v) => {
    const anzahl = v.gruppen.reduce((n, g) => n + g.punkte.length, 0);
    const such = esc([v.titel, v.wann, ...v.gruppen.flatMap((g) => g.punkte.map((p) => p.text))].join(" ").toLowerCase());
    return `
<article class="karte" data-suche="${such}">
  <header class="kkopf">
    <div><h3>${esc(v.titel)}</h3><p class="kurz">${esc(v.wann)}</p></div>
    <button class="knopf klein" data-start="${v.id}">Vorgang starten</button>
  </header>
  ${v.vorbemerkung ? `<p class="satz">${esc(v.vorbemerkung)}</p>` : ""}
  <ul class="haken">${v.gruppen
    .flatMap((g) => [
      g.name ? `<li class="vgruppe">${esc(g.name)}</li>` : "",
      ...g.punkte.map((pt) => `<li><span>${esc(pt.text)}${pt.warum ? `<em>${esc(pt.warum)}</em>` : ""}</span></li>`),
    ])
    .join("")}</ul>
  <p class="intern">${anzahl} Punkte</p>
</article>`;
  })
  .join("");

const gespraechsBereich = `
<div class="unter">
  <button class="ureiter aktiv" data-unter="vorgaenge">Meine Vorgänge</button>
  <button class="ureiter" data-unter="einwaende">Einwände</button>
  <button class="ureiter" data-unter="vorlagen">Vorlagen</button>
</div>

<section class="gruppe unterb aktiv" id="u-vorgaenge">
  <div class="vkopf">
    <button class="knopf voll" id="neuerVorgang">+ Neuen Vorgang starten</button>
    <span id="vzahl"></span>
  </div>
  <div id="vchips" class="vchips"></div>
  <div id="vleer" class="vleer">
    <p>Noch kein Vorgang offen.</p>
    <p class="klein">Ein Vorgang ist eine Liste für einen Kunden – mit Namen, Projekt und Datum.
    Antworten und Haken bleiben gespeichert, auch wenn du die Datei schließt.</p>
  </div>
  <div id="vaktiv"></div>
</section>

<section class="gruppe unterb" id="u-einwaende">
  <h2>Einwände</h2>
  <p class="ginfo">Die sieben Sätze, die am häufigsten kommen – und was dahintersteckt.</p>
  ${einwandKarten}
</section>

<section class="gruppe unterb" id="u-vorlagen">
  <h2>Vorlagen</h2>
  <p class="ginfo">${vorlagen.length} Listen zum Nachlesen. „Vorgang starten“ legt daraus eine Arbeitsliste für einen Kunden an.</p>
  ${vorlagenKarten}
</section>`;

/* --------------------------------------------------------------- Nachschlagen */

const preisZeilen = gruppenIds
  .map(
    (g) =>
      `<tr class="gkopf"><td colspan="2">${esc(gruppenMeta[g].label)}</td></tr>` +
      leistungen
        .filter((l) => l.gruppe === g)
        .map((l) => `<tr><td><a href="#l-${l.id}" class="sprung">${esc(l.name)}</a></td><td class="r">${esc(preisText(l))}</td></tr>`)
        .join(""),
  )
  .join("");

const nachschlagen = `
<section class="gruppe" id="preisliste">
  <h2>Alle Preise auf einen Blick</h2>
  <p class="ginfo">Zum Mitlesen im Gespräch. Klick auf den Namen springt zur ausführlichen Beschreibung.</p>
  <table class="tab preistab"><tbody>${preisZeilen}</tbody></table>
  <p class="intern">Stundensatz für alles außerhalb von Paket und Betreuung: <strong>${esc(formatEuro(pricing.hourly))}</strong>.
  Jahrespreis bei laufenden Leistungen = Monatspreis × ${pricing.yearlyFactor} (zwei Monate geschenkt).</p>
</section>`;

/* ---------------------------------------------------------------------- Seite */

const logo = Buffer.from(readFileSync(join(wurzel, "public", "images", "logo.svg"), "utf8")).toString("base64");
const erzeugt = new Date().toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });

const menue = gruppenIds.map((g) => `<a href="#g-${g}" class="mlink">${esc(gruppenMeta[g].label)}</a>`).join("");

const html = `<!doctype html>
<html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Leistungshandbuch – ${esc(company.name)}</title>
<style>
  :root { --violett:#8c52ff; --violett-tief:#5b2bbf; --dunkel:#15181d; --text:#1d2128;
          --grau:#5b6472; --linie:#e2e6ec; --flaeche:#f6f7f9; --weiss:#fff; }
  * { box-sizing:border-box; }
  body { margin:0; background:var(--flaeche); color:var(--text);
         font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,sans-serif;
         font-size:15px; line-height:1.6; }
  a { color:var(--violett-tief); }

  .kopf { background:var(--dunkel); color:#fff; padding:20px 24px 0; }
  .kinnen { max-width:1180px; margin:0 auto; }
  .kzeile { display:flex; align-items:center; gap:20px; flex-wrap:wrap; padding-bottom:16px; }
  .kopf img { width:180px; height:auto; display:block; }
  .kopf h1 { font-size:15px; font-weight:600; margin:0; color:#e7eaef; }
  .kmeta { margin-left:auto; font-size:12.5px; color:#9aa3b0; text-align:right; }

  .reiter { display:flex; gap:4px; }
  .reiter button { background:none; border:none; color:#9aa3b0; font:inherit; font-size:14px; font-weight:600;
                   padding:10px 18px; cursor:pointer; border-bottom:3px solid transparent; border-radius:6px 6px 0 0; }
  .reiter button:hover { color:#fff; background:rgba(255,255,255,.06); }
  .reiter button.aktiv { color:#fff; border-bottom-color:var(--violett); }

  .steuerung { position:sticky; top:0; z-index:5; background:var(--weiss);
               border-bottom:1px solid var(--linie); padding:11px 24px; }
  .sinnen { max-width:1180px; margin:0 auto; display:flex; gap:9px; flex-wrap:wrap; align-items:center; }
  #suche { flex:1 1 240px; min-width:190px; padding:9px 12px; font-size:15px;
           border:1.5px solid var(--linie); border-radius:8px; font-family:inherit; }
  #suche:focus { outline:none; border-color:var(--violett); }
  .knopf { padding:7px 13px; font-size:13px; border:1px solid var(--linie); background:var(--weiss);
           border-radius:999px; cursor:pointer; font-family:inherit; color:var(--grau); }
  .knopf:hover { border-color:var(--violett); color:var(--violett); }
  .knopf.aktiv { background:var(--violett); border-color:var(--violett); color:#fff; }
  #treffer { font-size:13px; color:var(--grau); margin-left:auto; }

  .huelle { max-width:1180px; margin:0 auto; padding:22px 24px; display:grid; grid-template-columns:200px 1fr; gap:26px; align-items:start; }
  .menue { position:sticky; top:72px; display:flex; flex-direction:column; gap:2px; }
  .menue strong { font-size:11px; text-transform:uppercase; letter-spacing:.08em; color:var(--grau); padding:6px 10px 3px; }
  .mlink { display:block; padding:6px 10px; border-radius:7px; text-decoration:none; color:var(--grau); font-size:13.5px; }
  .mlink:hover { background:#efe8ff; color:var(--violett-tief); }
  @media (max-width:820px) { .huelle { grid-template-columns:1fr; } .menue { display:none; } }

  .gruppe > h2 { font-size:19px; margin:26px 0 4px; scroll-margin-top:80px; }
  .gruppe:first-child > h2 { margin-top:0; }
  .ginfo { margin:0 0 14px; color:var(--grau); font-size:13.5px; }

  .karte { background:var(--weiss); border:1px solid var(--linie); border-radius:12px;
           padding:17px 19px; margin-bottom:13px; scroll-margin-top:80px; }
  .kkopf { display:flex; gap:15px; align-items:flex-start; border-bottom:1px solid var(--linie);
           padding-bottom:11px; margin-bottom:11px; }
  .kkopf h3 { margin:0; font-size:17px; }
  .kurz { margin:3px 0 0; color:var(--grau); font-size:13.5px; }
  .preis, .marke { margin-left:auto; white-space:nowrap; font-weight:700; font-size:13.5px;
                   padding:6px 12px; border-radius:8px; background:#f0e9ff; color:var(--violett-tief); }
  .preis.offen { background:#fff4e5; color:#9a5b00; }
  .marke { background:var(--flaeche); color:var(--grau); font-weight:600; }
  .satz { margin:0 0 15px; font-size:15.5px; border-left:3px solid var(--violett); padding-left:13px; }

  .raster { display:grid; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); gap:14px 22px; }
  .block h4, .fakten h4 { margin:0 0 6px; font-size:11.5px; text-transform:uppercase;
                          letter-spacing:.07em; color:var(--grau); }
  .block ul, .block ol { margin:0; padding-left:18px; font-size:14px; }
  .block li { margin-bottom:4px; }
  .block.braucht { background:#fffaf0; border:1px solid #f5e3c0; border-radius:8px; padding:11px 13px; }
  .block.nicht li { color:var(--grau); }
  .block.achtung { background:#fff5f5; border:1px solid #f5d0d0; border-radius:8px; padding:11px 13px; margin-top:13px; }

  .fakten { display:grid; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); gap:14px 22px;
            margin-top:15px; padding-top:13px; border-top:1px solid var(--linie); }
  .fakten p { margin:0; font-size:14px; }
  .intern { margin:13px 0 0; padding:9px 12px; background:var(--flaeche); border-radius:8px;
            font-size:13px; color:var(--grau); }

  .tab { width:100%; border-collapse:collapse; background:var(--weiss);
         border:1px solid var(--linie); border-radius:10px; overflow:hidden; font-size:14px; }
  .tab th { text-align:left; background:var(--flaeche); padding:9px 13px; font-size:12px;
            text-transform:uppercase; letter-spacing:.06em; color:var(--grau); }
  .tab td { padding:9px 13px; border-top:1px solid var(--linie); vertical-align:top; }
  .tab .r { text-align:right; white-space:nowrap; font-weight:600; }
  .preistab .gkopf td { background:var(--flaeche); font-size:12px; text-transform:uppercase;
                        letter-spacing:.06em; color:var(--grau); font-weight:700; }
  .sprung { text-decoration:none; }
  .sprung:hover { text-decoration:underline; }

  .haken { list-style:none; margin:0; padding:0; }
  .haken li { border-bottom:1px solid var(--linie); }
  .haken li:last-child { border-bottom:none; }
  .haken label { display:flex; gap:11px; align-items:flex-start; padding:9px 2px; cursor:pointer; }
  .haken input { margin:3px 0 0; width:17px; height:17px; accent-color:var(--violett); flex:none; }
  .haken span { font-size:14.5px; }
  .haken em { display:block; font-style:normal; font-size:13px; color:var(--grau); margin-top:2px; }
  .haken input:checked + span { color:var(--grau); text-decoration:line-through; }
  .haken input:checked + span em { text-decoration:none; }
  .knopf.klein { margin-left:auto; padding:5px 11px; font-size:12px; flex:none; }

  .phase { margin-top:15px; padding-top:13px; border-top:1px solid var(--linie); }
  .phase:first-of-type { margin-top:4px; }
  .pname { margin:0 0 6px; font-size:13px; text-transform:uppercase; letter-spacing:.06em; color:var(--violett-tief); }
  .tor { margin:8px 0 0; padding:8px 12px; background:#f0e9ff; border-radius:7px; font-size:13.5px; }

  .einwand .esatz { margin:0 0 13px; font-size:17px; }
  .block.antwort { background:#f3fbf4; border:1px solid #c9e7cf; border-radius:8px; padding:11px 13px; }
  .block p { margin:0; font-size:14px; }

  .unter { display:flex; gap:4px; margin-bottom:16px; border-bottom:1px solid var(--linie); }
  .ureiter { background:none; border:none; font:inherit; font-size:14px; font-weight:600; color:var(--grau);
             padding:8px 15px; cursor:pointer; border-bottom:3px solid transparent; }
  .ureiter:hover { color:var(--violett-tief); }
  .ureiter.aktiv { color:var(--violett-tief); border-bottom-color:var(--violett); }
  .unterb { display:none; } .unterb.aktiv { display:block; }

  .vkopf { display:flex; align-items:center; gap:12px; margin-bottom:12px; }
  .knopf.voll { background:var(--violett); border-color:var(--violett); color:#fff; font-weight:600; padding:9px 16px; }
  .knopf.voll:hover { background:var(--violett-tief); color:#fff; }
  #vzahl { font-size:13px; color:var(--grau); }
  .vchips { display:flex; gap:7px; flex-wrap:wrap; margin-bottom:16px; }
  .vchip { text-align:left; background:var(--weiss); border:1px solid var(--linie); border-radius:9px;
           padding:7px 13px; cursor:pointer; font:inherit; font-size:14px; font-weight:600; color:var(--text); }
  .vchip em { display:block; font-style:normal; font-size:12px; font-weight:400; color:var(--grau); }
  .vchip:hover { border-color:var(--violett); }
  .vchip.aktiv { border-color:var(--violett); background:#f6f1ff; }
  .vleer { background:var(--weiss); border:1px dashed var(--linie); border-radius:12px; padding:30px; text-align:center; }
  .vleer p { margin:0 0 6px; } .vleer .klein { font-size:13.5px; color:var(--grau); margin:0; }

  .vhead { display:flex; gap:16px; align-items:flex-end; flex-wrap:wrap; border-bottom:1px solid var(--linie);
           padding-bottom:13px; margin-bottom:11px; }
  .vfelder { display:flex; gap:12px; flex-wrap:wrap; }
  .vfelder input { padding:7px 10px; font-size:14.5px; font-family:inherit;
                   border:1.5px solid var(--linie); border-radius:7px; min-width:150px; }
  .vaktionen { display:flex; gap:6px; margin-left:auto; }
  .vmeta { margin:0 0 12px; font-size:13.5px; color:var(--grau); }
  .vfort { color:var(--violett-tief); font-weight:600; }
  .haken .antwort { width:100%; margin:2px 0 8px 28px; max-width:calc(100% - 28px);
                    padding:6px 10px; font-size:13.5px; font-family:inherit;
                    border:1px solid var(--linie); border-radius:6px; background:var(--flaeche); }
  .haken .antwort:focus { outline:none; border-color:var(--violett); background:var(--weiss); }
  .haken li.vgruppe { font-size:12px; text-transform:uppercase; letter-spacing:.06em;
                      color:var(--violett-tief); font-weight:700; padding:10px 0 4px; border:none; }
  .notiz { width:100%; min-height:80px; padding:9px 11px; font:inherit; font-size:14px;
           border:1.5px solid var(--linie); border-radius:8px; resize:vertical; }

  .bk-steuer { display:flex; gap:16px; flex-wrap:wrap; margin-bottom:16px; }
  .bkf { display:flex; flex-direction:column; gap:4px; }
  .bkf span { font-size:11.5px; text-transform:uppercase; letter-spacing:.07em; color:var(--grau); }
  .bkf input, .bkf select { padding:8px 11px; font-size:15px; font-family:inherit;
                            border:1.5px solid var(--linie); border-radius:8px; background:var(--weiss); }
  .bkf input { width:110px; }
  .bk-titel { margin:0 0 8px; font-size:11.5px; text-transform:uppercase; letter-spacing:.07em; color:var(--grau); }
  .bk-zusatz { display:grid; grid-template-columns:repeat(auto-fit,minmax(230px,1fr)); gap:6px 16px; margin-bottom:18px; }
  .bkz { display:flex; gap:9px; align-items:flex-start; cursor:pointer; padding:5px 0; }
  .bkz input { margin:3px 0 0; width:16px; height:16px; accent-color:var(--violett); flex:none; }
  .bkz span { font-size:14px; }
  .bkz em { display:block; font-style:normal; font-size:12.5px; color:var(--grau); }
  .bk-ergebnis { border-top:1px solid var(--linie); padding-top:16px; }
  .bk-summe { display:grid; grid-template-columns:repeat(auto-fit,minmax(150px,1fr)); gap:12px; margin-bottom:16px; }
  .bk-summe > div { background:#f0e9ff; border-radius:9px; padding:11px 14px; }
  .bk-summe p { margin:0; font-size:20px; font-weight:700; color:var(--violett-tief); }
  #bkKann li, #bkKannNicht li { margin-bottom:4px; }
  #bkKannNicht em { display:block; font-style:normal; font-size:12.5px; color:var(--grau); }

  .bereich { display:none; } .bereich.aktiv { display:block; }
  .leer { display:none; text-align:center; color:var(--grau); padding:46px 0; }
  .fuss { max-width:1180px; margin:0 auto; padding:0 24px 38px; color:var(--grau); font-size:12.5px; }

  @media print {
    .steuerung, .reiter, .menue, #treffer { display:none; }
    .huelle { grid-template-columns:1fr; }
    .bereich { display:block !important; }
    body { background:#fff; font-size:10.5pt; }
    .karte { break-inside:avoid; page-break-inside:avoid; border-color:#ccc; }
    .knopf.klein, .knopf.voll, .unter, .vchips, #vzahl, .vleer { display:none; }
    .vfelder input, .notiz { border:none; border-bottom:1pt solid #999; border-radius:0; }
    .haken .antwort { border:none; border-bottom:1pt solid #ccc; border-radius:0; background:none; }
    .haken input { -webkit-appearance:none; appearance:none; border:1.2pt solid #333; border-radius:2px; }
    .kopf { background:#fff; color:#000; border-bottom:2px solid #000; }
    .kopf img { filter:invert(1); }
  }
</style></head>
<body>

<div class="kopf"><div class="kinnen">
  <div class="kzeile">
    <img alt="${esc(company.name)}" src="data:image/svg+xml;base64,${logo}">
    <h1>Leistungshandbuch</h1>
    <div class="kmeta">${leistungen.length} Leistungen · ${plaene.length} Pläne · ${szenarien.length} Umstellungswege · ${gespraeche.length + ablaeufe.length} Checklisten<br>Stand ${esc(erzeugt)}</div>
  </div>
  <nav class="reiter">
    <button data-bereich="leistungen" class="aktiv">Leistungen</button>
    <button data-bereich="microsoft">Microsoft 365</button>
    <button data-bereich="gespraeche">Gespräche &amp; Abläufe</button>
    <button data-bereich="nachschlagen">Preisliste</button>
  </nav>
</div></div>

<div class="steuerung"><div class="sinnen">
  <input id="suche" type="search" placeholder="Suchen – DMARC, Domain, Umzug, Dateiserver …" autocomplete="off">
  <span id="filter"></span>
  <button class="knopf" id="alleAuf">Alles aufklappen</button>
  <button class="knopf" id="drucken">Drucken</button>
  <span id="treffer"></span>
</div></div>

<div class="huelle">
  <aside class="menue" id="menue"></aside>
  <main>
    <div class="bereich aktiv" id="b-leistungen">${leistungsBereich}</div>
    <div class="bereich" id="b-microsoft">${microsoftBereich}</div>
    <div class="bereich" id="b-gespraeche">${gespraechsBereich}</div>
    <div class="bereich" id="b-nachschlagen">${nachschlagen}</div>
    <p class="leer" id="leer">Nichts gefunden. Anderen Begriff versuchen.</p>
  </main>
</div>

<p class="fuss">Interne Arbeitsunterlage, erzeugt am ${esc(erzeugt)}.
Eigene Preise aus <code>lib/constants.ts</code>, Texte aus <code>lib/handbuch.ts</code> und
<code>lib/microsoft.ts</code>. Nach Änderungen <code>npm run handbuch</code> ausführen.</p>

<script>
  const VORLAGEN = ${JSON.stringify(vorlagen)};
  const PLAENE = ${JSON.stringify(plaene.map((p) => ({ id: p.id, name: p.name, preis: p.preis })))};
  const ZUSAETZE = ${JSON.stringify(zusaetze.map((z) => ({ id: z.id, name: z.name, preis: z.preis })))};
  const FAEHIG = ${JSON.stringify(faehigkeiten)};

  const MENUES = {
    leistungen: ${JSON.stringify(gruppenIds.map((g) => ({ id: "g-" + g, text: gruppenMeta[g].label })))},
    microsoft: [{id:"ms-baukasten",text:"Paket-Baukasten"},{id:"ms-plaene",text:"Basispläne"},{id:"ms-zusaetze",text:"Zusatzprodukte"},{id:"ms-dienste",text:"Dienste erklärt"},{id:"ms-szenarien",text:"Umstellungswege"},{id:"ms-checkliste",text:"Vor jeder Umstellung"}],
    gespraeche: [{id:"gs-gespraeche",text:"Gesprächsleitfäden"},{id:"gs-einwaende",text:"Einwände"},{id:"gs-ablaeufe",text:"Projektabläufe"}],
    nachschlagen: [{id:"preisliste",text:"Alle Preise"}]
  };
  const FILTER = {
    leistungen: ${JSON.stringify(gruppenIds.map((g) => ({ v: g, t: gruppenMeta[g].label })))},
    microsoft: [], gespraeche: [], nachschlagen: []
  };

  const suche = document.getElementById("suche");
  const treffer = document.getElementById("treffer");
  const leer = document.getElementById("leer");
  const menue = document.getElementById("menue");
  const filterLeiste = document.getElementById("filter");
  let bereich = "leistungen", filter = "alle";

  function baueMenue() {
    menue.innerHTML = "<strong>Springen zu</strong>" +
      MENUES[bereich].map(m => '<a class="mlink" href="#' + m.id + '">' + m.text + "</a>").join("");
    filterLeiste.innerHTML = FILTER[bereich].length
      ? '<button class="knopf aktiv" data-f="alle">Alle</button>' +
        FILTER[bereich].map(f => '<button class="knopf" data-f="' + f.v + '">' + f.t + "</button>").join("")
      : "";
    for (const b of filterLeiste.querySelectorAll(".knopf")) {
      b.onclick = () => {
        filterLeiste.querySelector(".knopf.aktiv")?.classList.remove("aktiv");
        b.classList.add("aktiv"); filter = b.dataset.f; anwenden();
      };
    }
  }

  function anwenden() {
    const q = suche.value.trim().toLowerCase();
    // Im Bereich mit Unterreitern nur den sichtbaren zählen, sonst stimmt der Zähler nicht.
    const wurzelEl = document.querySelector("#b-" + bereich + " .unterb.aktiv") || document.getElementById("b-" + bereich);
    const karten = [...wurzelEl.querySelectorAll(".karte")];
    let sichtbar = 0;
    for (const k of karten) {
      const g = !k.dataset.gruppe || filter === "alle" || k.dataset.gruppe === filter;
      const t = !q || (k.dataset.suche || "").includes(q);
      k.style.display = g && t ? "" : "none";
      if (g && t) sichtbar++;
    }
    for (const s of wurzelEl.querySelectorAll(".gruppe")) {
      const hatKarten = s.querySelector(".karte");
      s.style.display = !hatKarten || [...s.querySelectorAll(".karte")].some(k => k.style.display !== "none") ? "" : "none";
    }
    treffer.textContent = karten.length && sichtbar < karten.length ? sichtbar + " von " + karten.length : "";
    leer.style.display = karten.length && !sichtbar ? "block" : "none";
  }

  for (const b of document.querySelectorAll(".reiter button")) {
    b.onclick = () => {
      document.querySelector(".reiter button.aktiv").classList.remove("aktiv");
      b.classList.add("aktiv");
      document.querySelector(".bereich.aktiv").classList.remove("aktiv");
      bereich = b.dataset.bereich;
      document.getElementById("b-" + bereich).classList.add("aktiv");
      filter = "alle"; baueMenue(); anwenden(); window.scrollTo(0, 0);
    };
  }

  document.getElementById("drucken").onclick = () => window.print();
  document.getElementById("alleAuf").onclick = () => {
    suche.value = ""; filter = "alle";
    filterLeiste.querySelector(".knopf.aktiv")?.classList.remove("aktiv");
    filterLeiste.querySelector('[data-f="alle"]')?.classList.add("aktiv");
    anwenden();
  };
  suche.addEventListener("input", anwenden);
  document.addEventListener("keydown", e => {
    if (e.key === "/" && document.activeElement !== suche) { e.preventDefault(); suche.focus(); }
    if (e.key === "Escape") { suche.value = ""; anwenden(); suche.blur(); }
  });

  // ---- Vorgänge ----
  const SPEICHER = "jbs-handbuch-vorgaenge";
  let vorgaenge = [];
  let aktiv = null;
  try { vorgaenge = JSON.parse(localStorage.getItem(SPEICHER) || "[]"); } catch (e) { vorgaenge = []; }

  const sichern = () => { try { localStorage.setItem(SPEICHER, JSON.stringify(vorgaenge)); } catch (e) {} };
  const hEsc = t => String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  const heute = () => new Date().toISOString().slice(0,10);
  const dt = d => { const [j,m,t] = d.split("-"); return t + "." + m + "." + j; };

  function neuerVorgang(vorlageId) {
    const v = VORLAGEN.find(x => x.id === vorlageId);
    const kunde = prompt("Für welchen Kunden?\\n\\n(" + v.titel + ")", "");
    if (kunde === null) return;
    const projekt = prompt("Projekt oder Anlass?", v.titel) ?? "";
    const datum = prompt("Datum (JJJJ-MM-TT)", heute()) || heute();
    vorgaenge.unshift({
      id: "v" + Date.now(), vorlage: vorlageId,
      kunde: kunde.trim() || "Ohne Namen", projekt: projekt.trim(), datum,
      haken: {}, antworten: {}, notiz: ""
    });
    aktiv = vorgaenge[0].id;
    sichern(); zeichneVorgaenge();
    document.querySelector('.ureiter[data-unter="vorgaenge"]')?.click();
  }

  function vorlageWaehlen() {
    const liste = VORLAGEN.map((v,i) => (i+1) + ") " + v.titel + "  [" + v.art + "]").join("\\n");
    const wahl = prompt("Welche Liste?\\n\\n" + liste + "\\n\\nNummer eingeben:", "1");
    if (wahl === null) return;
    const i = parseInt(wahl) - 1;
    if (VORLAGEN[i]) neuerVorgang(VORLAGEN[i].id);
  }

  function zeichneVorgaenge() {
    const chips = document.getElementById("vchips");
    const leer = document.getElementById("vleer");
    const ziel = document.getElementById("vaktiv");
    const zahl = document.getElementById("vzahl");
    if (!chips) return;

    zahl.textContent = vorgaenge.length ? vorgaenge.length + " offen" : "";
    leer.style.display = vorgaenge.length ? "none" : "block";

    chips.innerHTML = vorgaenge.map(v => {
      const vl = VORLAGEN.find(x => x.id === v.vorlage);
      const ges = vl.gruppen.reduce((n,g) => n + g.punkte.length, 0);
      const fertig = Object.values(v.haken).filter(Boolean).length;
      return '<button class="vchip' + (v.id === aktiv ? " aktiv" : "") + '" data-v="' + v.id + '">' +
        hEsc(v.kunde) + '<em>' + hEsc(vl.titel) + ' · ' + fertig + '/' + ges + '</em></button>';
    }).join("");

    const v = vorgaenge.find(x => x.id === aktiv);
    if (!v) { ziel.innerHTML = ""; return; }
    const vl = VORLAGEN.find(x => x.id === v.vorlage);
    const ges = vl.gruppen.reduce((n,g) => n + g.punkte.length, 0);
    const fertig = Object.values(v.haken).filter(Boolean).length;

    let punkteHtml = "", nr = 0;
    for (const g of vl.gruppen) {
      if (g.name) punkteHtml += '<h4 class="pname">' + hEsc(g.name) + "</h4>";
      punkteHtml += '<ul class="haken">';
      for (const pt of g.punkte) {
        const k = "p" + nr;
        punkteHtml += '<li><label><input type="checkbox" data-p="' + k + '"' + (v.haken[k] ? " checked" : "") + '>' +
          '<span>' + hEsc(pt.text) + (pt.warum ? '<em>' + hEsc(pt.warum) + '</em>' : "") + '</span></label>' +
          '<input class="antwort" data-a="' + k + '" placeholder="Antwort / Notiz" value="' + hEsc(v.antworten[k] || "") + '"></li>';
        nr++;
      }
      punkteHtml += "</ul>";
      if (g.tor) punkteHtml += '<p class="tor"><strong>Weiter, wenn:</strong> ' + hEsc(g.tor) + "</p>";
    }

    ziel.innerHTML =
      '<article class="karte vorgang">' +
        '<header class="vhead">' +
          '<div class="vfelder">' +
            '<label class="bkf"><span>Kunde</span><input data-f="kunde" value="' + hEsc(v.kunde) + '"></label>' +
            '<label class="bkf"><span>Projekt</span><input data-f="projekt" value="' + hEsc(v.projekt) + '"></label>' +
            '<label class="bkf"><span>Datum</span><input data-f="datum" type="date" value="' + hEsc(v.datum) + '"></label>' +
          '</div>' +
          '<div class="vaktionen">' +
            '<button class="knopf klein" id="vDruck">Drucken</button>' +
            '<button class="knopf klein" id="vWeg">Löschen</button>' +
          '</div>' +
        '</header>' +
        '<p class="vmeta"><strong>' + hEsc(vl.titel) + '</strong> · ' + hEsc(vl.wann) +
          ' · <span class="vfort">' + fertig + " von " + ges + ' erledigt</span></p>' +
        (vl.vorbemerkung ? '<p class="satz">' + hEsc(vl.vorbemerkung) + "</p>" : "") +
        punkteHtml +
        '<h4 class="bk-titel">Notizen</h4><textarea class="notiz" placeholder="Was sonst noch wichtig war …">' + hEsc(v.notiz) + "</textarea>" +
      "</article>";

    for (const c of ziel.querySelectorAll("[data-p]")) c.onchange = () => { v.haken[c.dataset.p] = c.checked; sichern(); zeichneVorgaenge(); };
    for (const a of ziel.querySelectorAll("[data-a]")) a.oninput = () => { v.antworten[a.dataset.a] = a.value; sichern(); };
    for (const f of ziel.querySelectorAll("[data-f]")) f.oninput = () => { v[f.dataset.f] = f.value; sichern();
      const chip = chips.querySelector('[data-v="' + v.id + '"]'); if (chip && f.dataset.f === "kunde") chip.childNodes[0].textContent = f.value; };
    ziel.querySelector(".notiz").oninput = e => { v.notiz = e.target.value; sichern(); };
    document.getElementById("vDruck").onclick = () => window.print();
    document.getElementById("vWeg").onclick = () => {
      if (!confirm("Vorgang „" + v.kunde + "“ wirklich löschen? Das lässt sich nicht rückgängig machen.")) return;
      vorgaenge = vorgaenge.filter(x => x.id !== v.id);
      aktiv = vorgaenge[0]?.id ?? null; sichern(); zeichneVorgaenge();
    };
    for (const c of chips.querySelectorAll(".vchip")) c.onclick = () => { aktiv = c.dataset.v; zeichneVorgaenge(); };
  }

  document.getElementById("neuerVorgang")?.addEventListener("click", vorlageWaehlen);
  for (const b of document.querySelectorAll("[data-start]")) b.onclick = () => neuerVorgang(b.dataset.start);

  for (const b of document.querySelectorAll(".ureiter")) {
    b.onclick = () => {
      document.querySelector(".ureiter.aktiv").classList.remove("aktiv");
      b.classList.add("aktiv");
      document.querySelector(".unterb.aktiv").classList.remove("aktiv");
      document.getElementById("u-" + b.dataset.unter).classList.add("aktiv");
      anwenden();
    };
  }

  if (vorgaenge.length) aktiv = vorgaenge[0].id;
  zeichneVorgaenge();

  // ---- Paket-Baukasten ----
  const bkAnzahl = document.getElementById("bkAnzahl");
  const bkPlan = document.getElementById("bkPlan");
  const euro = n => n.toLocaleString("de-DE", {minimumFractionDigits:2, maximumFractionDigits:2}) + " €";

  function bkRechnen() {
    if (!bkAnzahl) return;
    const n = Math.max(1, Math.min(300, parseInt(bkAnzahl.value) || 1));
    const plan = PLAENE.find(p => p.id === bkPlan.value);
    const gewaehlt = [...document.querySelectorAll("[data-z]:checked")].map(e => e.dataset.z);
    const ids = [plan.id, ...gewaehlt];

    let proKopf = plan.preis, offen = false;
    for (const z of gewaehlt) {
      const zz = ZUSAETZE.find(x => x.id === z);
      if (zz.preis === null) offen = true; else proKopf += zz.preis;
    }

    document.getElementById("bkMonat").textContent = euro(proKopf * n) + (offen ? " +" : "");
    document.getElementById("bkJahr").textContent = euro(proKopf * n * 12) + (offen ? " +" : "");
    document.getElementById("bkKopf").textContent = euro(proKopf) + (offen ? " +" : "");

    const kann = FAEHIG.filter(f => f.durch.some(d => ids.includes(d)));
    const nicht = FAEHIG.filter(f => !f.durch.some(d => ids.includes(d)));
    document.getElementById("bkKann").innerHTML = kann.map(f => "<li>" + f.name + "</li>").join("") || "<li>–</li>";
    document.getElementById("bkKannNicht").innerHTML = nicht.map(f => "<li>" + f.name + " <em>" + f.erklaerung + "</em></li>").join("") || "<li>–</li>";

    const warn = [];
    if (offen) warn.push("Für die Datensicherung kommt der Preis des Drittanbieters dazu.");
    if (!ids.includes("backup")) warn.push("Ohne Datensicherung durch Dritte ist Gelöschtes nach spätestens 93 Tagen endgültig weg.");
    if (gewaehlt.includes("copilot") && !["standard","premium"].includes(plan.id)) warn.push("Copilot setzt Business Standard oder Premium voraus – mit diesem Basisplan nicht buchbar.");
    if (gewaehlt.includes("phone-standard")) warn.push("Teams Telefon Standard enthält keine Gesprächsminuten – dafür braucht es einen SIP-Anbieter.");
    if (n > 300) warn.push("Über 300 Nutzer sind Business-Pläne nicht mehr zulässig – dann Enterprise E3 oder E5.");
    document.getElementById("bkHinweis").innerHTML = warn.length ? "<strong>Hinweise:</strong> " + warn.join(" ") : "";
  }

  if (bkAnzahl) {
    bkAnzahl.oninput = bkRechnen;
    bkPlan.onchange = bkRechnen;
    for (const c of document.querySelectorAll("[data-z]")) {
      c.onchange = () => {
        if (c.checked && c.dataset.g) {
          for (const a of document.querySelectorAll('[data-g="' + c.dataset.g + '"]')) if (a !== c) a.checked = false;
        }
        bkRechnen();
      };
    }
    bkRechnen();
  }

  // Sprung aus der Preisliste in die ausführliche Beschreibung
  for (const a of document.querySelectorAll(".sprung")) {
    a.onclick = e => {
      e.preventDefault();
      document.querySelector('.reiter [data-bereich="leistungen"]').click();
      const ziel = document.querySelector(a.getAttribute("href"));
      ziel?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
  }

  baueMenue(); anwenden();
</script>
</body></html>`;

/**
 * Das eingebettete Skript vor dem Schreiben prüfen. Ein einzelner falsch
 * maskierter Zeilenumbruch reißt sonst die ganze Datei auf – dann funktioniert
 * weder Suche noch Reiter noch Baukasten, und man sieht es der Datei nicht an.
 */
const skript = html.match(/<script>([\s\S]*?)<\/script>/)?.[1] ?? "";
try {
  new Function(skript);
} catch (fehler) {
  throw new Error(
    `Das eingebettete Skript ist syntaktisch kaputt: ${(fehler as Error).message}\n` +
      "Häufigste Ursache: ein \\n im Skript, das vom Template-Literal zu einem echten " +
      "Zeilenumbruch aufgelöst wurde. Im Quelltext muss dort \\\\n stehen.",
  );
}

writeFileSync(join(wurzel, "handbuch.html"), html);
console.log(
  `handbuch.html geschrieben – ${leistungen.length} Leistungen, ${plaene.length} Pläne, ${szenarien.length} Umstellungswege`,
);
