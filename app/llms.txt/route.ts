import { company } from "@/lib/constants";
import { services } from "@/lib/services";
import { articles } from "@/lib/articles";
import { locations } from "@/lib/locations";
import { trades } from "@/lib/trades";

/**
 * llms.txt (informeller Standard, llmstxt.org): kuratierte, auf das Wesentliche
 * verdichtete Übersicht für KI-Antwortmaschinen (ChatGPT, Perplexity, Copilot,
 * Gemini), analog zu robots.txt für klassische Crawler. Generiert aus denselben
 * lib/*-Quellen wie sitemap.ts, damit nichts doppelt gepflegt werden muss.
 */
function buildLlmsTxt(): string {
  const lines: string[] = [];

  lines.push(`# ${company.name}`);
  lines.push("");
  lines.push(
    "> IT-Modernisierung für Handwerksbetriebe in Münster und im Münsterland: Microsoft 365 & Azure, " +
      "IT-Support, E-Mail-Sicherheit, Teams-Telefonie, Webdesign sowie lokales SEO und GEO-Optimierung. " +
      "Geführt von Justin Boch, gelernter Anlagenmechaniker SHK, der den Alltag im Handwerksbetrieb aus " +
      "eigener Erfahrung kennt.",
  );
  lines.push("");
  lines.push(
    `Sitz: ${company.address.street}, ${company.address.zip} ${company.address.city}, ${company.address.region}. ` +
      `Kontakt: ${company.email}, ${company.phone}. Einzugsgebiet: ${company.areaServed.join(", ")}.`,
  );
  lines.push("");

  lines.push("## Leistungen");
  for (const service of services) {
    lines.push(`- [${service.name}](${company.url}/leistungen/${service.slug}): ${service.shortDescription}`);
  }
  lines.push("");

  lines.push("## Nach Gewerk");
  for (const trade of trades) {
    lines.push(`- [${trade.name}](${company.url}/handwerk/${trade.slug}): ${trade.challenges[0]}`);
  }
  lines.push("");

  lines.push("## Magazin (Ratgeber-Artikel)");
  for (const article of articles) {
    lines.push(`- [${article.title}](${company.url}/magazin/${article.slug}): ${article.metaDescription}`);
  }
  lines.push("");

  lines.push("## Kostenlose Checks");
  lines.push(`- [IT-Check](${company.url}/it-check): Zehn Fragen, zwei Minuten, konkrete Einschätzung zur IT-Zukunftsfähigkeit.`);
  lines.push(`- [Website-Check](${company.url}/website-check): Ladezeit, mobile Darstellung und SEO-Grundlagen der eigenen Webseite.`);
  lines.push(`- [E-Mail-Sicherheits-Check](${company.url}/email-check): Prüft SPF, DKIM und DMARC der eigenen Domain.`);
  lines.push(`- [Sicherheits-Check](${company.url}/sicherheits-check): Prüft von außen auf php2shell-Lücke, offene Dateien und fehlende Sicherheits-Header.`);
  lines.push("");

  lines.push("## Standorte im Münsterland");
  for (const location of locations) {
    lines.push(`- [${location.name}](${company.url}/standorte/${location.slug}): ${location.blurb}`);
  }
  lines.push("");

  lines.push("## Weitere Seiten");
  lines.push(`- [Pakete & Preise](${company.url}/pakete): Transparente Festpreise statt Angebot auf Anfrage.`);
  lines.push(`- [Ablauf](${company.url}/ablauf): Wie eine Zusammenarbeit konkret abläuft.`);
  lines.push(`- [Agentur](${company.url}/agentur): Über Justin Boch - Solutions und den Gründer.`);
  lines.push(`- [FAQ](${company.url}/faq): Allgemeine Fragen und Antworten.`);
  lines.push(`- [Kontakt](${company.url}/kontakt): Kostenlosen Strategie-Call vereinbaren.`);

  return lines.join("\n") + "\n";
}

export async function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
