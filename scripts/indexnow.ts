/**
 * Meldet alle Seiten-URLs bei IndexNow (Bing, Yandex & Co.) zur sofortigen
 * Neuindexierung, statt darauf zu warten, dass die Crawler von selbst
 * vorbeischauen. Key-Datei liegt unter public/<key>.txt, siehe
 * app/robots.ts bzw. die Bing-Webmaster-Tools-Einrichtung.
 *
 * Aufruf: npm run indexnow
 */
import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { company } from "../lib/constants.ts";
import { services } from "../lib/services.ts";
import { articles } from "../lib/articles.ts";
import { locations } from "../lib/locations.ts";
import { studie } from "../lib/studie.ts";

const wurzel = join(dirname(fileURLToPath(import.meta.url)), "..");

function findeKey(): string {
  const treffer = readdirSync(join(wurzel, "public")).filter((datei) => /^[0-9a-f]{32}\.txt$/.test(datei));
  if (treffer.length !== 1) {
    throw new Error(
      `Erwarte genau eine IndexNow-Key-Datei unter public/<32-stelliger-hex-key>.txt, gefunden: ${treffer.length}. ` +
        "Key über https://www.bing.com/indexnow/getstarted erzeugen und als public/<key>.txt ablegen.",
    );
  }
  return treffer[0].replace(/\.txt$/, "");
}

const staticRoutes = [
  "/",
  "/leistungen",
  "/agentur",
  "/ablauf",
  "/pakete",
  "/faq",
  "/kontakt",
  "/magazin",
  "/email-check",
  "/it-check",
  "/website-check",
  "/sicherheits-check",
  "/standorte",
  "/beispielprojekt",
];

const urls = [
  ...staticRoutes.map((r) => `${company.url}${r}`),
  ...services.map((s) => `${company.url}/leistungen/${s.slug}`),
  ...articles.map((a) => `${company.url}/magazin/${a.slug}`),
  ...locations.map((l) => `${company.url}/standorte/${l.slug}`),
  `${company.url}/studie/${studie.slug}`,
];

const key = findeKey();

const antwort = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: company.domain,
    key,
    keyLocation: `${company.url}/${key}.txt`,
    urlList: urls,
  }),
});

if (!antwort.ok) {
  throw new Error(`IndexNow antwortete mit ${antwort.status}: ${await antwort.text()}`);
}

console.log(`IndexNow: ${urls.length} URLs gemeldet (Status ${antwort.status}).`);
