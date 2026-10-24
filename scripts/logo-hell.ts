/**
 * Eine einzige Stelle, die weiß, wie aus dem Logo der Website eine Fassung für
 * helle Hintergründe wird. Benutzt von scripts/logo-variante.ts (schreibt die
 * Datei) und vom Briefgenerator (bettet sie direkt ein) – damit beide nie
 * auseinanderlaufen.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

const WEISS = /fill="#(?:fff|ffffff|FFF|FFFFFF)"/g;
/** Dieselbe Textfarbe wie im Fließtext der Website und der Briefe. */
export const DUNKEL = "#15181d";

export function logoFuerHellenHintergrund(projektWurzel: string): { svg: string; ersetzt: number } {
  const quelle = join(projektWurzel, "public", "images", "logo.svg");
  const original = readFileSync(quelle, "utf8");
  const ersetzt = original.match(WEISS)?.length ?? 0;
  if (ersetzt === 0) {
    throw new Error(
      `Keine weißen Flächen in ${quelle} gefunden – wurde das Logo geändert? ` +
        "Der Schriftzug wäre auf hellem Grund unsichtbar.",
    );
  }
  return { svg: original.replace(WEISS, `fill="${DUNKEL}"`), ersetzt };
}

/**
 * Das Logo zum direkten Einbetten in HTML – nicht als <img src="data:…">.
 *
 * Grund: Die Quelldatei trägt width="100%" height="100%". Als Bild eingebettet
 * kann der Druck daraus keine Höhe ableiten, das Logo bricht im PDF weg. Inline
 * mit festen Maßen aus der viewBox rendert es überall gleich.
 */
export function logoInline(projektWurzel: string, klasse = "logo"): string {
  const { svg } = logoFuerHellenHintergrund(projektWurzel);
  const box = svg.match(/viewBox="([\d.\s-]+)"/)?.[1];
  if (!box) throw new Error("Das Logo hat keine viewBox – Maße nicht ableitbar.");
  const [, , breite, hoehe] = box.trim().split(/\s+/).map(Number);

  return svg
    .replace(/\swidth="[^"]*"/, "")
    .replace(/\sheight="[^"]*"/, "")
    .replace("<svg", `<svg class="${klasse}" width="${breite}" height="${hoehe}" role="img" aria-label="Justin Boch - Solutions"`);
}
