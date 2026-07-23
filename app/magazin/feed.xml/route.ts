import { company } from "@/lib/constants";
import { articles } from "@/lib/articles";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const sorted = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  const items = sorted
    .map((article) => {
      const url = `${company.url}/magazin/${article.slug}`;
      const pubDate = new Date(article.publishedAt).toUTCString();

      return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(article.excerpt)}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(company.name)} – Magazin</title>
    <link>${company.url}/magazin</link>
    <atom:link href="${company.url}/magazin/feed.xml" rel="self" type="application/rss+xml" />
    <description>Praxiswissen zu Microsoft 365, IT-Sicherheit, lokaler Sichtbarkeit und Digitalisierung für Handwerksbetriebe.</description>
    <language>de-DE</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
