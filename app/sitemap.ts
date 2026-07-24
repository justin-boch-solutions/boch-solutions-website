import type { MetadataRoute } from "next";
import { company } from "@/lib/constants";
import { services } from "@/lib/services";
import { articles } from "@/lib/articles";
import { locations } from "@/lib/locations";

const staticRoutes = [
  "",
  "/leistungen",
  "/agentur",
  "/ablauf",
  "/pakete",
  "/faq",
  "/kontakt",
  "/magazin",
  "/it-check",
  "/standorte",
  "/beispielprojekt",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${company.url}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const serviceEntries: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${company.url}/leistungen/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${company.url}/magazin/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  const locationEntries: MetadataRoute.Sitemap = locations.map((location) => ({
    url: `${company.url}/standorte/${location.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...serviceEntries, ...articleEntries, ...locationEntries];
}
