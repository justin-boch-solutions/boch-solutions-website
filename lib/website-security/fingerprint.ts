/** Erkennung der eingesetzten Technik aus Headern und HTML. Rein passiv. */

export interface Fingerprint {
  server?: string;
  poweredBy?: string;
  phpVersion?: string;
  phpDetected: boolean;
  nodeHint?: string;
  cms?: string;
  cmsVersion?: string;
}

const PHP_VERSION_RE = /PHP\/(\d+\.\d+\.\d+[\w.\-+~]*)/i;

const CMS_SIGNATURES: { name: string; php: boolean; test: (html: string, headers: Headers) => string | null }[] = [
  {
    name: "WordPress",
    php: true,
    test: (html) => {
      const gen = html.match(/<meta[^>]+name=["']generator["'][^>]+content=["']WordPress\s*([\d.]*)/i);
      if (gen) return gen[1] || "";
      if (/\/wp-content\/|\/wp-includes\//i.test(html)) return "";
      return null;
    },
  },
  {
    name: "TYPO3",
    php: true,
    test: (html) => (/<meta[^>]+content=["']TYPO3/i.test(html) || /typo3temp|typo3conf/i.test(html) ? "" : null),
  },
  {
    name: "Joomla",
    php: true,
    test: (html) => {
      const gen = html.match(/<meta[^>]+name=["']generator["'][^>]+content=["']Joomla!?\s*([\d.]*)/i);
      if (gen) return gen[1] || "";
      return /\/media\/jui\/|option=com_/i.test(html) ? "" : null;
    },
  },
  {
    name: "Drupal",
    php: true,
    test: (html, headers) => {
      const h = headers.get("x-generator");
      if (h && /drupal/i.test(h)) return (h.match(/Drupal\s*([\d.]*)/i)?.[1] ?? "");
      return /\/sites\/default\/files\/|drupal-settings-json/i.test(html) ? "" : null;
    },
  },
  {
    name: "Contao",
    php: true,
    test: (html) => (/<meta[^>]+content=["']Contao/i.test(html) ? "" : null),
  },
  {
    name: "Shopware",
    php: true,
    test: (html) => (/shopware|\/bundles\/storefront\//i.test(html) ? "" : null),
  },
  {
    name: "Magento",
    php: true,
    test: (html) => (/\/static\/version\d+\/frontend\/|Magento_/i.test(html) ? "" : null),
  },
  {
    name: "Nextcloud",
    php: true,
    test: (html, headers) =>
      /nextcloud/i.test(headers.get("x-powered-by") ?? "") || /data-nc-|nextcloud/i.test(html) ? "" : null,
  },
  {
    name: "Next.js",
    php: false,
    test: (html, headers) =>
      headers.get("x-powered-by")?.toLowerCase() === "next.js" || /__NEXT_DATA__|\/_next\//.test(html) ? "" : null,
  },
];

export function buildFingerprint(headers: Headers, html: string): Fingerprint {
  const server = headers.get("server") ?? undefined;
  const poweredBy = headers.get("x-powered-by") ?? undefined;
  const setCookie = headers.get("set-cookie") ?? "";

  const phpVersion =
    poweredBy?.match(PHP_VERSION_RE)?.[1] ??
    server?.match(PHP_VERSION_RE)?.[1] ??
    undefined;

  const phpDetected =
    Boolean(phpVersion) ||
    /PHPSESSID/i.test(setCookie) ||
    /php/i.test(poweredBy ?? "") ||
    /\.php(\?|"|'|$)/i.test(html.slice(0, 20000));

  let nodeHint: string | undefined;
  if (/express/i.test(poweredBy ?? "")) nodeHint = "Express (Node.js)";
  else if (/node/i.test(server ?? "")) nodeHint = server;
  else if (poweredBy?.toLowerCase() === "next.js") nodeHint = "Next.js (Node.js)";

  let cms: string | undefined;
  let cmsVersion: string | undefined;
  for (const sig of CMS_SIGNATURES) {
    const hit = sig.test(html, headers);
    if (hit !== null) {
      cms = sig.name;
      cmsVersion = hit || undefined;
      break;
    }
  }

  return { server, poweredBy, phpVersion, phpDetected, nodeHint, cms, cmsVersion };
}

/** CMS, die zwingend auf PHP laufen. Relevant für die php2shell-Bewertung. */
export const PHP_BASED_CMS = [
  "WordPress",
  "TYPO3",
  "Joomla",
  "Drupal",
  "Contao",
  "Shopware",
  "Magento",
  "Nextcloud",
];
