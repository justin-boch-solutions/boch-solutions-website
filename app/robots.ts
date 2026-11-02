import type { MetadataRoute } from "next";
import { company } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Datenschutz und AGB bleiben crawlbar (kein disallow): Sie tragen bereits
        // robots: { index: false } in ihren eigenen Metadaten. Eine robots.txt-Sperre
        // würde verhindern, dass Google/Bing dieses noindex-Tag überhaupt lesen –
        // genau das meldete Bing als Fehler "Von robots.txt blockiert".
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${company.url}/sitemap.xml`,
  };
}
