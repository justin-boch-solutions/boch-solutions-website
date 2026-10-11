import type { MetadataRoute } from "next";
import { company } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Das Impressum bleibt crawlbar: Google gleicht darueber Name, Adresse und
        // Telefon eines deutschen Unternehmens ab – ein wichtiges Signal fuer die
        // lokale Suche. Datenschutz und AGB haben diesen Nutzen nicht.
        disallow: ["/datenschutz", "/agb"],
      },
    ],
    sitemap: `${company.url}/sitemap.xml`,
  };
}
