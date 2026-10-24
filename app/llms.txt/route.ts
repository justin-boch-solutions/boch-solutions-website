import { company } from "@/lib/constants";
import { services } from "@/lib/services";
import { articles } from "@/lib/articles";
import { locations } from "@/lib/locations";
import { studie } from "@/lib/studie";

/**
 * llms.txt – noch kein offizieller Standard, aber eine wachsende Konvention,
 * um KI-Systemen (ChatGPT, Perplexity, Gemini, Copilot) eine strukturierte
 * Übersicht der Seite zu geben, statt sie das HTML entwirren zu lassen.
 *
 * Wird aus denselben Datenquellen wie sitemap.ts erzeugt, damit beide nie
 * auseinanderlaufen.
 */
function buildLlmsTxt(): string {
  const lines: string[] = [];

  lines.push(`# ${company.name}`);
  lines.push("");
  lines.push(`> ${company.claim} ${company.tagline} – inklusive SEO/GEO, Webdesign, individueller Software und IT-Sicherheit.`);
  lines.push("");
  lines.push(
    `${company.name} ist eine auf Handwerksbetriebe spezialisierte IT- und Webdesign-Agentur, gegründet von ${company.owner}. Persönlich vor Ort in ${company.address.city} und im Münsterland, deutschlandweit per Remote-Support erreichbar.`,
  );
  lines.push("");

  lines.push("## Leistungen");
  for (const service of services) {
    lines.push(`- [${service.name}](${company.url}/leistungen/${service.slug}): ${service.shortDescription}`);
  }
  lines.push("");

  lines.push("## Kostenlose Tools");
  lines.push(`- [IT-Check](${company.url}/it-check): Kostenloser Selbsttest, wie zukunftsfähig die IT eines Handwerksbetriebs ist.`);
  lines.push(`- [Website-Check](${company.url}/website-check): Prüft Performance, SEO und technische Basis einer Webseite.`);
  lines.push(`- [E-Mail-Sicherheits-Check](${company.url}/email-check): Prüft SPF, DKIM und DMARC einer Domain – kann jemand in fremdem Namen E-Mails verschicken?`);
  lines.push(`- [Sicherheits-Check](${company.url}/sicherheits-check): Prüft Webseiten von außen auf die php2shell-Sicherheitslücke und verbreitete Konfigurationsfehler.`);
  lines.push("");

  lines.push("## Studie");
  lines.push(
    `- [${studie.titel}](${company.url}/studie/${studie.slug}): Eigene Untersuchung von ${studie.domainsGesamt.toLocaleString("de-DE")} Unternehmensdomains in Nordrhein-Westfalen zur E-Mail-Sicherheit, veröffentlicht ${studie.veroeffentlicht}.`,
  );
  lines.push("");

  lines.push("## Magazin");
  for (const article of articles) {
    lines.push(`- [${article.title}](${company.url}/magazin/${article.slug}): ${article.excerpt}`);
  }
  lines.push("");

  lines.push("## Standorte");
  lines.push(`- [Alle Standorte](${company.url}/standorte)`);
  for (const location of locations) {
    lines.push(`  - [${location.name}](${company.url}/standorte/${location.slug}): ${location.blurb}`);
  }
  lines.push("");

  lines.push("## Unternehmen");
  lines.push(`- [Pakete & Preise](${company.url}/pakete)`);
  lines.push(`- [Agentur](${company.url}/agentur)`);
  lines.push(`- [Ablauf](${company.url}/ablauf)`);
  lines.push(`- [Beispielprojekt](${company.url}/beispielprojekt)`);
  lines.push(`- [FAQ](${company.url}/faq)`);
  lines.push(`- [Kontakt](${company.url}/kontakt): ${company.email}, ${company.phone}`);
  lines.push("");

  return lines.join("\n");
}

export async function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
