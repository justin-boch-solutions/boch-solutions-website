import type { MetadataRoute } from "next";
import { company } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/impressum", "/datenschutz"],
      },
    ],
    sitemap: `${company.url}/sitemap.xml`,
  };
}
