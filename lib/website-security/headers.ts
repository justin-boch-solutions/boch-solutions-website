import type { Finding } from "./types";

interface HeaderCheck {
  id: string;
  header: string;
  label: string;
  severity: "high" | "medium" | "low";
  impact: string;
  actions: string[];
  /** Optionale Zusatzprüfung, wenn der Header gesetzt ist. */
  validate?: (value: string) => { ok: boolean; note: string } | null;
}

const HEADER_CHECKS: HeaderCheck[] = [
  {
    id: "hsts",
    header: "strict-transport-security",
    label: "HSTS (Strict-Transport-Security)",
    severity: "medium",
    impact:
      "Ohne HSTS kann ein Angreifer im selben Netz - etwa im Hotel- oder Cafe-WLAN - den ersten Aufruf auf unverschlüsseltes HTTP umbiegen und Sitzungsdaten mitlesen.",
    actions: [
      "Header setzen: Strict-Transport-Security: max-age=31536000; includeSubDomains",
      "Vorher sicherstellen, dass wirklich alle Subdomains per HTTPS erreichbar sind.",
      "Erst nach einigen Wochen stabilem Betrieb über preload nachdenken - der Eintrag ist nur schwer rückgängig zu machen.",
    ],
    validate: (v) => {
      const max = Number(v.match(/max-age=(\d+)/i)?.[1] ?? 0);
      if (max < 15_552_000) {
        return { ok: false, note: `max-age beträgt nur ${max} Sekunden. Empfohlen sind mindestens 15552000 (180 Tage).` };
      }
      return null;
    },
  },
  {
    id: "csp",
    header: "content-security-policy",
    label: "Content-Security-Policy",
    severity: "high",
    impact:
      "Die CSP ist die wirksamste Bremse gegen Cross-Site-Scripting. Ohne sie kann eingeschleuster JavaScript-Code ungehindert Sitzungs-Cookies auslesen oder Formulareingaben abgreifen - inklusive Zahlungsdaten.",
    actions: [
      "Mit einer Report-Only-Policy starten, damit nichts kaputtgeht: Content-Security-Policy-Report-Only.",
      "Mindestens default-src 'self' und frame-ancestors 'none' definieren.",
      "'unsafe-inline' vermeiden und stattdessen Nonces oder Hashes verwenden.",
    ],
    validate: (v) => {
      // Nur die fuer Skripte wirksame Direktive pruefen: script-src, sonst der
      // Fallback default-src. 'unsafe-inline' in style-src ist kein Befund.
      const directives = new Map(
        v
          .split(";")
          .map((d) => d.trim())
          .filter(Boolean)
          .map((d) => {
            const [name, ...rest] = d.split(/\s+/);
            return [name.toLowerCase(), rest.join(" ")] as const;
          })
      );
      const scriptDirective = directives.get("script-src") ?? directives.get("default-src");
      if (scriptDirective && /'unsafe-inline'/i.test(scriptDirective)) {
        // Mit Nonce oder Hash ignorieren moderne Browser 'unsafe-inline' wieder.
        if (/'nonce-|'sha(256|384|512)-/i.test(scriptDirective)) return null;
        return {
          ok: false,
          note: "Die Policy erlaubt 'unsafe-inline' für Skripte. Damit ist der XSS-Schutz weitgehend wirkungslos.",
        };
      }
      if (/'unsafe-eval'/i.test(scriptDirective ?? "")) {
        return { ok: false, note: "Die Policy erlaubt 'unsafe-eval' für Skripte." };
      }
      return null;
    },
  },
  {
    id: "x-content-type-options",
    header: "x-content-type-options",
    label: "X-Content-Type-Options",
    severity: "low",
    impact:
      "Ohne diesen Header raten ältere Browser den Dateityp selbst. Eine hochgeladene Bilddatei kann so als JavaScript ausgeführt werden.",
    actions: ["Header setzen: X-Content-Type-Options: nosniff"],
  },
  {
    id: "frame-schutz",
    header: "x-frame-options",
    label: "Schutz gegen Clickjacking",
    severity: "medium",
    impact:
      "Ohne Frame-Schutz kann Ihre Seite unsichtbar in eine fremde Seite eingebettet werden. Nutzer klicken dann auf Schaltflächen, die sie gar nicht sehen - etwa 'Bestellung absenden'.",
    actions: [
      "Entweder X-Frame-Options: DENY setzen",
      "oder moderner in der CSP: frame-ancestors 'none'",
    ],
  },
  {
    id: "referrer-policy",
    header: "referrer-policy",
    label: "Referrer-Policy",
    severity: "low",
    impact:
      "Ohne Referrer-Policy sendet der Browser die komplette aufgerufene URL an fremde Server weiter. Enthält die URL ein Token oder eine Kundennummer, landet die beim Dritten.",
    actions: ["Header setzen: Referrer-Policy: strict-origin-when-cross-origin"],
  },
  {
    id: "permissions-policy",
    header: "permissions-policy",
    label: "Permissions-Policy",
    severity: "low",
    impact:
      "Die Permissions-Policy legt fest, welche Browserfunktionen - Kamera, Mikrofon, Standort - eingebettete Inhalte nutzen dürfen. Ohne sie erben eingebundene Werbe- oder Tracking-Frames Ihre Rechte.",
    actions: ["Header setzen, z.B.: Permissions-Policy: camera=(), microphone=(), geolocation=()"],
  },
];

export function checkSecurityHeaders(headers: Headers): Finding[] {
  const findings: Finding[] = [];

  for (const check of HEADER_CHECKS) {
    let value = headers.get(check.header);

    // Clickjacking lässt sich auch per CSP frame-ancestors lösen.
    if (check.id === "frame-schutz" && !value) {
      const csp = headers.get("content-security-policy") ?? "";
      if (/frame-ancestors/i.test(csp)) {
        value = `frame-ancestors via CSP: ${csp.match(/frame-ancestors[^;]*/i)?.[0] ?? ""}`;
      }
    }
    // CSP kann auch nur im Report-Only-Modus laufen.
    if (check.id === "csp" && !value) {
      const ro = headers.get("content-security-policy-report-only");
      if (ro) {
        findings.push({
          id: "csp-report-only",
          category: "header",
          severity: "low",
          title: "Content-Security-Policy läuft nur im Report-Only-Modus",
          evidence: "Es ist ausschließlich Content-Security-Policy-Report-Only gesetzt.",
          impact:
            "Im Report-Only-Modus meldet der Browser Verstöße, blockiert sie aber nicht. Es besteht also noch kein echter Schutz.",
          actions: [
            "Die Report-Meldungen auswerten und verbleibende Verstöße beheben.",
            "Danach denselben Wert als Content-Security-Policy scharf schalten.",
          ],
        });
        continue;
      }
    }

    if (!value) {
      findings.push({
        id: check.id,
        category: "header",
        severity: check.severity,
        title: `${check.label} fehlt`,
        evidence: `Der Header ${check.header} wurde in der Antwort der Startseite nicht gesetzt.`,
        impact: check.impact,
        actions: check.actions,
      });
      continue;
    }

    const problem = check.validate?.(value);
    if (problem) {
      findings.push({
        id: `${check.id}-schwach`,
        category: "header",
        severity: check.severity === "high" ? "medium" : "low",
        title: `${check.label} ist zu schwach konfiguriert`,
        evidence: `Gesetzter Wert: ${value.slice(0, 180)}${value.length > 180 ? " ..." : ""} - ${problem.note}`,
        impact: check.impact,
        actions: check.actions,
      });
      continue;
    }

    findings.push({
      id: check.id,
      category: "header",
      severity: "ok",
      title: `${check.label} ist gesetzt`,
      evidence: `${check.header}: ${value.slice(0, 180)}${value.length > 180 ? " ..." : ""}`,
      impact: "",
      actions: [],
    });
  }

  return findings;
}

/** Server- und Framework-Versionen im Klartext sind ein unnötiger Hinweis für Angreifer. */
export function checkVersionDisclosure(headers: Headers): Finding[] {
  const findings: Finding[] = [];
  const server = headers.get("server");
  const poweredBy = headers.get("x-powered-by");

  if (server && /\d+\.\d+/.test(server)) {
    findings.push({
      id: "server-version-offen",
      category: "laufzeit",
      severity: "low",
      title: "Server-Software meldet ihre genaue Version",
      evidence: `Server: ${server}`,
      impact:
        "Die exakte Versionsnummer erspart einem Angreifer die Suche: er kann direkt nachschlagen, welche Schwachstellen für genau diesen Stand bekannt sind.",
      actions: [
        "Apache: ServerTokens Prod und ServerSignature Off setzen.",
        "nginx: server_tokens off; setzen.",
        "Das ersetzt kein Update, erhöht aber die Hürde für automatisierte Massenscans.",
      ],
    });
  }

  if (poweredBy) {
    findings.push({
      id: "powered-by-offen",
      category: "laufzeit",
      severity: "low",
      title: "X-Powered-By verrät die eingesetzte Technik",
      evidence: `X-Powered-By: ${poweredBy}`,
      impact:
        "Der Header nennt Sprache und oft die genaue Version. Bei PHP ist das aktuell besonders heikel, weil automatisierte Scanner gezielt nach verwundbaren PHP-Versionen suchen.",
      actions: [
        "PHP: expose_php = Off in der php.ini setzen.",
        "Express: app.disable('x-powered-by').",
        "Alternativ den Header im Reverse Proxy entfernen.",
      ],
    });
  }

  return findings;
}

/** Cookie-Flags der Startseite prüfen. */
export function checkCookies(headers: Headers): Finding[] {
  const raw = typeof headers.getSetCookie === "function" ? headers.getSetCookie() : [];
  const cookies = raw.length > 0 ? raw : headers.get("set-cookie") ? [headers.get("set-cookie")!] : [];
  if (cookies.length === 0) return [];

  const problems: string[] = [];
  for (const c of cookies) {
    const name = c.split("=")[0]?.trim() ?? "unbekannt";
    const missing: string[] = [];
    if (!/;\s*secure/i.test(c)) missing.push("Secure");
    if (!/;\s*httponly/i.test(c)) missing.push("HttpOnly");
    if (!/;\s*samesite=/i.test(c)) missing.push("SameSite");
    if (missing.length > 0) problems.push(`${name} (fehlt: ${missing.join(", ")})`);
  }

  if (problems.length === 0) {
    return [
      {
        id: "cookies",
        category: "cookies",
        severity: "ok",
        title: "Cookies sind korrekt abgesichert",
        evidence: `${cookies.length} Cookie(s) gesetzt, alle mit Secure, HttpOnly und SameSite.`,
        impact: "",
        actions: [],
      },
    ];
  }

  return [
    {
      id: "cookies-unsicher",
      category: "cookies",
      severity: "medium",
      title: "Cookies ohne vollständige Schutz-Flags",
      evidence: `Betroffen: ${problems.join(" | ")}`,
      impact:
        "Ohne HttpOnly kann eingeschleustes JavaScript das Sitzungs-Cookie auslesen und die Sitzung übernehmen. Ohne Secure wandert es auch über unverschlüsselte Verbindungen. Ohne SameSite sind Cross-Site-Request-Forgery-Angriffe möglich.",
      actions: [
        "Session-Cookies immer mit Secure, HttpOnly und SameSite=Lax setzen.",
        "PHP: session.cookie_secure=1, session.cookie_httponly=1, session.cookie_samesite=Lax in der php.ini.",
        "Bei Cookies, die bewusst per JavaScript gelesen werden, prüfen, ob das wirklich nötig ist.",
      ],
    },
  ];
}
