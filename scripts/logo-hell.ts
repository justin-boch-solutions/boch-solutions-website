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
