/**
 * Schreibt public/images/logo-on-light.svg – die Fassung des Logos für helle
 * Hintergründe (Druck, Briefe, Rechnungen, Angebote, Visitenkarten).
 *
 * Aufruf: npm run logo   · nach jeder Änderung am Original erneut ausführen.
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { logoFuerHellenHintergrund } from "./logo-hell.ts";

const wurzel = join(import.meta.dirname, "..");
const { svg, ersetzt } = logoFuerHellenHintergrund(wurzel);

const hinweis = `<!-- Automatisch erzeugt aus logo.svg durch scripts/logo-variante.ts (npm run logo).
     Nicht von Hand bearbeiten – Änderungen gehören ins Original.
     Diese Fassung ist für HELLE Hintergründe: Druck, Briefe, Rechnungen, Angebote. -->\n`;

writeFileSync(join(wurzel, "public", "images", "logo-on-light.svg"), hinweis + svg, "utf8");
console.log(`${ersetzt} weiße Flächen umgefärbt → public/images/logo-on-light.svg`);
