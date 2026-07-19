import type { MetadataRoute } from "next";
import { company } from "@/lib/constants";
import { services } from "@/lib/services";

const staticRoutes = [
  "",
  "/leistungen",
  "/agentur",
  "/ablauf",
  "/pakete",
  "/faq",
  "/kontakt",
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

  return [...staticEntries, ...serviceEntries];
}
