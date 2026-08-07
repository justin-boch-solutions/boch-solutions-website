import { NextResponse } from "next/server";
import { Resend } from "resend";
import { company } from "@/lib/constants";
import { getServiceBySlug, type Service } from "@/lib/services";
import { emailButton, emailDataRows, escapeHtml, getLogoAttachment, renderEmailLayout } from "@/lib/email-template";

export const maxDuration = 60;

interface Scores {
  performance: number;
  seo: number;
  accessibility: number;
  bestPractices: number;
}

const CATEGORY_LABELS: Record<keyof Scores, string> = {
  performance: "Performance",
  seo: "SEO",
  accessibility: "Barrierefreiheit",
  bestPractices: "Best Practices",
};

const CATEGORY_SERVICE_SLUG: Record<keyof Scores, string> = {
  performance: "webdesign",
  seo: "seo-geo-optimierung",
  accessibility: "webdesign",
  bestPractices: "cloud-sicherheit-dsgvo",
};

function normalizeUrl(input: string): URL | null {
  const trimmed = input.trim();
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(withProtocol);
    if (!url.hostname.includes(".")) return null;
    return url;
  } catch {
    return null;
  }
}

async function runPageSpeed(targetUrl: string) {
  const apiUrl = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  apiUrl.searchParams.set("url", targetUrl);
  apiUrl.searchParams.set("strategy", "mobile");
  for (const category of ["performance", "seo", "accessibility", "best-practices"]) {
    apiUrl.searchParams.append("category", category);
  }
  if (process.env.GOOGLE_PAGESPEED_API_KEY) {
    apiUrl.searchParams.set("key", process.env.GOOGLE_PAGESPEED_API_KEY);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 55_000);

  try {
    const response = await fetch(apiUrl.toString(), { signal: controller.signal });
    const data = await response.json();

    if (!response.ok || !data.lighthouseResult) {
      const message = data?.error?.message || "Die Webseite konnte nicht geprüft werden.";
      throw new Error(message);
    }

    const categories = data.lighthouseResult.categories;
    const audits = data.lighthouseResult.audits;

    const scores: Scores = {
      performance: Math.round((categories.performance?.score ?? 0) * 100),
      seo: Math.round((categories.seo?.score ?? 0) * 100),
      accessibility: Math.round((categories.accessibility?.score ?? 0) * 100),
      bestPractices: Math.round((categories["best-practices"]?.score ?? 0) * 100),
    };

    const metrics = {
      lcp: audits?.["largest-contentful-paint"]?.displayValue ?? null,
      cls: audits?.["cumulative-layout-shift"]?.displayValue ?? null,
      tbt: audits?.["total-blocking-time"]?.displayValue ?? null,
      fcp: audits?.["first-contentful-paint"]?.displayValue ?? null,
    };

    return { scores, metrics };
  } finally {
    clearTimeout(timeout);
  }
}

function getRecommendations(scores: Scores): Service[] {
  const ranked = (Object.keys(scores) as (keyof Scores)[]).sort((a, b) => scores[a] - scores[b]);
  const slugs = [...new Set(ranked.map((key) => CATEGORY_SERVICE_SLUG[key]))].slice(0, 2);
  return slugs.map((slug) => getServiceBySlug(slug)).filter((s): s is Service => s !== undefined);
}

function scoreColor(score: number): string {
  if (score >= 90) return "#22c55e";
  if (score >= 50) return "#eab308";
  return "#ef4444";
}

function scoreBadgesHtml(scores: Scores): string {
  const cells = (Object.keys(scores) as (keyof Scores)[])
    .map((key) => {
      const score = scores[key];
      return `<td style="padding:12px 6px;text-align:center;width:25%;">
        <div style="width:56px;height:56px;margin:0 auto;border-radius:999px;background:${scoreColor(score)};color:#ffffff;font-size:18px;font-weight:700;line-height:56px;">${score}</div>
        <div style="margin-top:8px;font-size:12px;color:#5b6472;">${CATEGORY_LABELS[key]}</div>
      </td>`;
    })
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;"><tr>${cells}</tr></table>`;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  // Honeypot: a hidden field real users never fill in.
  if (typeof body.hp_confirm === "string" && body.hp_confirm.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const firma = typeof body.firma === "string" ? body.firma.trim() : "";
  const websiteInput = typeof body.website === "string" ? body.website.trim() : "";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !email || !websiteInput || !emailPattern.test(email)) {
    return NextResponse.json({ error: "Bitte füllen Sie alle Pflichtfelder aus." }, { status: 400 });
  }

  const targetUrl = normalizeUrl(websiteInput);
  if (!targetUrl) {
    return NextResponse.json({ error: "Bitte geben Sie eine gültige Website-Adresse an." }, { status: 400 });
  }

  let result: Awaited<ReturnType<typeof runPageSpeed>>;
  try {
    result = await runPageSpeed(targetUrl.toString());
  } catch (err) {
    console.error("PageSpeed-Abfrage fehlgeschlagen:", err);
    return NextResponse.json(
      { error: "Die Webseite konnte nicht geprüft werden. Bitte prüfen Sie die URL und versuchen Sie es erneut." },
      { status: 502 },
    );
  }

  const { scores, metrics } = result;
  const recommendations = getRecommendations(scores);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY ist nicht gesetzt.");
    return NextResponse.json({ ok: true, scores, metrics, recommendations: recommendations.map((r) => ({ name: r.shortName, url: `${company.url}/leistungen/${r.slug}` })) });
  }

  const resend = new Resend(apiKey);
  const logoAttachment = getLogoAttachment();
  const fromAddress = `JB Solutions <website-check@send.${company.domain}>`;

  const recommendationsHtml = recommendations
    .map(
      (r) => `<tr>
        <td style="padding:12px 16px;border:1px solid #e5e7eb;border-radius:12px;">
          <a href="${company.url}/leistungen/${r.slug}" style="color:#10131a;font-size:14px;font-weight:600;text-decoration:none;">${escapeHtml(r.shortName)}</a>
        </td>
      </tr>
      <tr><td style="height:10px;line-height:10px;font-size:0;">&nbsp;</td></tr>`,
    )
    .join("");

  const resultHtml = renderEmailLayout({
    previewText: `Ihr Website-Check für ${targetUrl.hostname}`,
    bodyHtml: `
      <h1 style="margin:0 0 4px;font-size:20px;color:#10131a;">Ihr Website-Check</h1>
      <p style="margin:0 0 20px;font-size:15px;color:#5b6472;">Hallo ${escapeHtml(name)}, hier ist das Ergebnis für <strong>${escapeHtml(targetUrl.hostname)}</strong>.</p>
      ${scoreBadgesHtml(scores)}
      ${
        recommendationsHtml
          ? `<p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#5b6472;">Empfohlene nächste Schritte</p>
             <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${recommendationsHtml}</table>`
          : ""
      }
      <div style="margin-top:16px;">
        ${emailButton("Kostenlosen Strategie-Call vereinbaren", `${company.url}/kontakt`)}
      </div>
    `,
  });

  try {
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: email,
      replyTo: company.email,
      subject: `Ihr Website-Check für ${targetUrl.hostname}`,
      text: `Hallo ${name},\n\nHier ist Ihr Website-Check für ${targetUrl.hostname}:\n\nPerformance: ${scores.performance}\nSEO: ${scores.seo}\nBarrierefreiheit: ${scores.accessibility}\nBest Practices: ${scores.bestPractices}\n\nFragen dazu? Einfach antworten oder unter ${company.phone} anrufen.\n\n${company.owner}, ${company.name}`,
      html: resultHtml,
      attachments: [logoAttachment],
    });

    if (error) {
      console.error("Resend error:", error);
    }
  } catch (err) {
    console.error("Website-Check-Ergebnis-Versand fehlgeschlagen:", err);
  }

  const leadDataRows = [
    { label: "Name", value: name },
    { label: "E-Mail", value: email },
    ...(firma ? [{ label: "Firma", value: firma }] : []),
    { label: "Website", value: targetUrl.toString() },
    { label: "Performance", value: `${scores.performance}` },
    { label: "SEO", value: `${scores.seo}` },
    { label: "Barrierefreiheit", value: `${scores.accessibility}` },
    { label: "Best Practices", value: `${scores.bestPractices}` },
  ];

  const leadHtml = renderEmailLayout({
    previewText: `Neuer Website-Check-Lead: ${name}`,
    bodyHtml: `
      <h1 style="margin:0 0 16px;font-size:20px;color:#10131a;">Neuer Website-Check-Lead</h1>
      ${emailDataRows(leadDataRows)}
      <div style="margin-top:24px;">
        ${emailButton("Direkt antworten", `mailto:${email}`)}
      </div>
    `,
  });

  resend.emails
    .send({
      from: fromAddress,
      to: company.email,
      replyTo: email,
      subject: `Neuer Website-Check-Lead: ${name} (${targetUrl.hostname})`,
      text: leadDataRows.map((row) => `${row.label}: ${row.value}`).join("\n"),
      html: leadHtml,
      attachments: [logoAttachment],
    })
    .catch((err) => console.error("Interne Website-Check-Lead-Benachrichtigung fehlgeschlagen:", err));

  return NextResponse.json({
    ok: true,
    scores,
    metrics,
    hostname: targetUrl.hostname,
    recommendations: recommendations.map((r) => ({ name: r.shortName, url: `/leistungen/${r.slug}` })),
  });
}
