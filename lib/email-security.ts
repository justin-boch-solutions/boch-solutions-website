import { promises as dns } from "node:dns";

export type Severity = "ok" | "warn" | "critical";

export interface Finding {
  id: "spf" | "dkim" | "dmarc";
  severity: Severity;
  /** Headline in consequences, not in protocol names. */
  title: string;
  /** What it means for the business, in plain language. */
  consequence: string;
  /** The raw technical evidence, so the finding is verifiable. */
  detail: string;
}

export interface EmailSecurityReport {
  domain: string;
  /** Mail provider inferred from the MX records, null when none are published. */
  provider: string | null;
  /** True when the domain receives mail through Microsoft 365. */
  isMicrosoft365: boolean;
  findings: Finding[];
  verdict: "sauber" | "lueckenhaft" | "kritisch" | "unbekannt";
  criticalCount: number;
  warnCount: number;
}

const DNS_TIMEOUT_MS = 5_000;

/** Selectors used by the common providers; a custom selector can still exist. */
const DKIM_SELECTORS = [
  "selector1", // Microsoft 365
  "selector2", // Microsoft 365
  "google", // Google Workspace
  "default",
  "s1",
  "s2",
  "k1", // Mailchimp / Mandrill
  "dkim",
  "mail",
  "zoho",
  "fm1", // Fastmail
] as const;

const PROVIDERS: { match: string; name: string }[] = [
  { match: "mail.protection.outlook.com", name: "Microsoft 365" },
  { match: "google.com", name: "Google Workspace" },
  { match: "googlemail.com", name: "Google Workspace" },
  { match: "ionos", name: "IONOS" },
  { match: "kundenserver", name: "IONOS" },
  { match: "strato", name: "Strato" },
  { match: "secureserver.net", name: "GoDaddy" },
  { match: "antispameurope", name: "Hornetsecurity (Spamfilter)" },
  { match: "hornetsecurity", name: "Hornetsecurity (Spamfilter)" },
  { match: "mailbox.org", name: "mailbox.org" },
  { match: "zoho", name: "Zoho Mail" },
  { match: "udag.de", name: "united-domains" },
];

async function withTimeout<T>(promise: Promise<T>): Promise<T | null> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => reject(new Error("dns-timeout")), DNS_TIMEOUT_MS);
      }),
    ]);
  } catch {
    // A missing record and a failed lookup are indistinguishable here on purpose:
    // both mean "we could not prove this record exists".
    return null;
  } finally {
    if (timer) clearTimeout(timer);
  }
}

/** Joins the 255-byte chunks a long TXT record is split into. */
function flattenTxt(records: string[][] | null): string[] {
  if (!records) return [];
  return records.map((chunks) => chunks.join(""));
}

export function normalizeDomain(input: string): string | null {
  let value = input.trim().toLowerCase();
  if (!value) return null;
  // Accept a full URL or an e-mail address and reduce both to the domain.
  if (value.includes("@")) value = value.slice(value.lastIndexOf("@") + 1);
  value = value.replace(/^https?:\/\//, "").replace(/^www\./, "");
  value = value.split("/")[0].split("?")[0].split(":")[0];
  if (!value.includes(".") || value.length > 253) return null;
  if (!/^[a-z0-9.-]+$/.test(value)) return null;
  if (value.startsWith("-") || value.startsWith(".") || value.endsWith(".")) return null;
  return value;
}

function detectProvider(mxHosts: string[]): string | null {
  if (mxHosts.length === 0) return null;
  const joined = mxHosts.join(" ").toLowerCase();
  for (const provider of PROVIDERS) {
    if (joined.includes(provider.match)) return provider.name;
  }
  return mxHosts[0].replace(/\.$/, "");
}

function checkSpf(records: string[]): Finding {
  const spfRecords = records.filter((record) => /^v=spf1\b/i.test(record.trim()));

  if (spfRecords.length === 0) {
    return {
      id: "spf",
      severity: "critical",
      title: "Niemand prüft, ob eine E-Mail wirklich von Ihnen kommt",
      consequence:
        "Für Ihre Domain ist nicht hinterlegt, welche Server in Ihrem Namen E-Mails verschicken dürfen. Jeder kann damit eine Mail mit Ihrer Firmenadresse als Absender verschicken – zum Beispiel eine Rechnung an Ihre Kundschaft mit fremder Bankverbindung.",
      detail: "Kein SPF-Eintrag (TXT-Record mit v=spf1) für die Domain gefunden.",
    };
  }

  if (spfRecords.length > 1) {
    return {
      id: "spf",
      severity: "critical",
      title: "Zwei Einträge heben sich gegenseitig auf",
      consequence:
        "Es sind mehrere SPF-Einträge hinterlegt. Empfänger-Server behandeln das als Fehler und überspringen die Prüfung komplett – sie wirkt dadurch so, als wäre sie nie eingerichtet worden.",
      detail: `${spfRecords.length} SPF-Einträge gefunden: ${spfRecords.join(" | ")}`,
    };
  }

  const record = spfRecords[0].trim();

  if (/[~?]all\s*$/i.test(record)) {
    const mechanism = /~all\s*$/i.test(record) ? "~all" : "?all";
    return {
      id: "spf",
      severity: "warn",
      title: "Gefälschte Mails werden markiert, aber trotzdem zugestellt",
      consequence:
        "Ihre Absender-Prüfung ist eingerichtet, endet aber nicht streng. Mails von fremden Servern mit Ihrer Adresse werden dadurch nur auffällig markiert und landen weiterhin im Postfach des Empfängers.",
      detail: `SPF endet auf ${mechanism} statt auf -all: ${record}`,
    };
  }

  if (/-all\s*$/i.test(record)) {
    return {
      id: "spf",
      severity: "ok",
      title: "Es ist festgelegt, wer in Ihrem Namen senden darf",
      consequence:
        "Ihre Domain gibt eindeutig an, welche Server für Sie E-Mails verschicken dürfen – alle anderen werden abgewiesen.",
      detail: record,
    };
  }

  return {
    id: "spf",
    severity: "warn",
    title: "Die Absender-Prüfung ist unvollständig",
    consequence:
      "Es ist ein SPF-Eintrag vorhanden, er legt aber nicht fest, was mit Mails von fremden Servern passieren soll. Empfänger entscheiden dann selbst.",
    detail: `SPF ohne abschließende all-Regel: ${record}`,
  };
}

type DkimBefund =
  | { status: "schluessel"; selector: string }
  /** CNAME gesetzt, aber am Ziel liegt kein Schlüssel – angefangene, nie beendete Einrichtung. */
  | { status: "kette-leer"; selector: string }
  | { status: "nichts" };

function checkDkim(befund: DkimBefund, isMicrosoft365: boolean): Finding {
  if (befund.status === "schluessel") {
    return {
      id: "dkim",
      severity: "ok",
      title: "Ihre E-Mails sind digital signiert",
      consequence:
        "Empfänger können nachprüfen, dass eine Mail wirklich aus Ihrem Haus kommt und unterwegs nicht verändert wurde. Das verbessert die Zustellung messbar.",
      detail: `DKIM-Schlüssel gefunden (Selektor "${befund.selector}").`,
    };
  }

  if (befund.status === "kette-leer") {
    return {
      id: "dkim",
      severity: "critical",
      title: "Die Signatur wurde eingerichtet, aber nie fertiggestellt",
      consequence:
        "Ihre Domain verweist auf einen Signaturschlüssel, der gar nicht existiert. Von außen sieht die Einrichtung vollständig aus – tatsächlich werden Ihre E-Mails unsigniert verschickt. Das ist der schlechteste der drei möglichen Zustände, weil niemand nachsieht.",
      detail: `Der Eintrag ${befund.selector}._domainkey verweist auf ein Ziel, das nicht auflöst (NXDOMAIN). Entweder wurde die Einrichtung abgebrochen oder der Anbieter hat den Schlüssel nie veröffentlicht.`,
    };
  }

  return {
    id: "dkim",
    severity: "warn",
    title: "Ihre E-Mails tragen keine prüfbare Signatur",
    consequence:
      "Ohne digitale Signatur kann ein Empfänger nicht überprüfen, ob eine Mail echt und unverändert ist. Das drückt Ihre Zustellbarkeit – Angebote und Rechnungen landen häufiger im Spam-Ordner, ohne dass Sie davon erfahren.",
    detail: isMicrosoft365
      ? "Microsoft 365 nutzt standardmäßig die Selektoren selector1 und selector2 – dort ist kein Schlüssel hinterlegt. Microsoft bietet DKIM kostenlos an, es muss im Admin-Center nur aktiviert werden."
      : "An den üblichen Stellen (selector1, selector2, default, google und weitere) wurde kein DKIM-Schlüssel gefunden. Bei einem abweichenden Selektornamen kann DKIM trotzdem aktiv sein – das lässt sich von außen nicht ausschließen.",
  };
}

function checkDmarc(records: string[], domain: string): Finding {
  const record = records.find((entry) => /^v=DMARC1\b/i.test(entry.trim()))?.trim();

  if (!record) {
    return {
      id: "dmarc",
      severity: "critical",
      title: "Für gefälschte Mails in Ihrem Namen gibt es keine Regel",
      consequence:
        "Sie geben Empfängern keine Anweisung, was mit einer gefälschten Mail in Ihrem Namen passieren soll. Jeder Anbieter entscheidet selbst – und Sie bekommen nie eine Meldung darüber, dass jemand Ihre Adresse missbraucht.",
      detail: `Kein DMARC-Eintrag unter _dmarc.${domain} gefunden.`,
    };
  }

  const policy = record.match(/\bp\s*=\s*(none|quarantine|reject)\b/i)?.[1]?.toLowerCase();
  const hasReporting = /\brua\s*=\s*mailto:/i.test(record);

  if (policy === "reject") {
    return {
      id: "dmarc",
      severity: "ok",
      title: "Gefälschte Mails in Ihrem Namen werden abgewiesen",
      consequence: hasReporting
        ? "Ihre Domain ist streng geschützt und Sie erhalten Berichte über Missbrauchsversuche. Das ist der Zustand, den man erreichen will."
        : "Ihre Domain ist streng geschützt. Es ist allerdings keine Berichtsadresse hinterlegt – Sie erfahren dadurch nicht, wer Ihre Adresse zu missbrauchen versucht.",
      detail: record,
    };
  }

  if (policy === "quarantine") {
    return {
      id: "dmarc",
      severity: "ok",
      title: "Gefälschte Mails landen im Spam-Ordner",
      consequence:
        "Mails, die Ihre Adresse missbrauchen, werden beim Empfänger als Spam einsortiert. Ein Schritt bis zur strengsten Stufe fehlt noch, aber der Schutz greift.",
      detail: record,
    };
  }

  if (policy === "none") {
    return {
      id: "dmarc",
      severity: "warn",
      title: "Ihr Schutz ist eingerichtet, aber abgeschaltet",
      consequence:
        "Ihr Eintrag steht auf „beobachten, nicht eingreifen“. Gefälschte E-Mails in Ihrem Namen werden deshalb weiterhin ganz normal zugestellt. Von außen sieht die Einrichtung vollständig aus – wirksam ist sie nicht.",
      detail: record,
    };
  }

  return {
    id: "dmarc",
    severity: "warn",
    title: "Die Schutzregel ist unvollständig",
    consequence:
      "Es ist ein DMARC-Eintrag vorhanden, aber ohne gültige Regel, was mit gefälschten Mails passieren soll. Empfänger behandeln ihn dann wie „beobachten“.",
    detail: record,
  };
}

export async function checkEmailSecurity(domain: string): Promise<EmailSecurityReport> {
  const [mxRecords, txtRecords, dmarcRecords] = await Promise.all([
    withTimeout(dns.resolveMx(domain)),
    withTimeout(dns.resolveTxt(domain)),
    withTimeout(dns.resolveTxt(`_dmarc.${domain}`)),
  ]);

  const mxHosts = (mxRecords ?? [])
    .slice()
    .sort((a, b) => a.priority - b.priority)
    .map((entry) => entry.exchange);

  const provider = detectProvider(mxHosts);
  const isMicrosoft365 = mxHosts.join(" ").toLowerCase().includes("mail.protection.outlook.com");

  // Ein DKIM-Schlüssel wird entweder direkt als TXT veröffentlicht oder über einen
  // CNAME, der auf den TXT des Anbieters zeigt (Microsoft 365 und die meisten ESPs).
  // Entscheidend ist, dass am ENDE der Kette wirklich ein Schlüssel steht: ein CNAME,
  // der ins Leere zeigt, sieht nach Einrichtung aus, signiert aber nichts.
  let dkim: DkimBefund = { status: "nichts" };
  for (const selector of DKIM_SELECTORS) {
    const host = `${selector}._domainkey.${domain}`;
    const [txt, cname] = await Promise.all([
      withTimeout(dns.resolveTxt(host)),
      withTimeout(dns.resolveCname(host)),
    ]);
    if (flattenTxt(txt).some((entry) => /v=DKIM1|p=/i.test(entry))) {
      dkim = { status: "schluessel", selector };
      break;
    }
    if (cname && cname.length > 0) {
      // Verweis vorhanden, aber kein Schlüssel am Ziel – weitersuchen, falls ein
      // anderer Selektor funktioniert, diesen Befund aber merken.
      if (dkim.status === "nichts") dkim = { status: "kette-leer", selector };
    }
  }

  const findings: Finding[] = [
    checkSpf(flattenTxt(txtRecords)),
    checkDkim(dkim, isMicrosoft365),
    checkDmarc(flattenTxt(dmarcRecords), domain),
  ];

  const criticalCount = findings.filter((f) => f.severity === "critical").length;
  const warnCount = findings.filter((f) => f.severity === "warn").length;

  let verdict: EmailSecurityReport["verdict"];
  if (mxHosts.length === 0 && !txtRecords) {
    verdict = "unbekannt";
  } else if (criticalCount > 0) {
    verdict = "kritisch";
  } else if (warnCount > 0) {
    verdict = "lueckenhaft";
  } else {
    verdict = "sauber";
  }

  return {
    domain,
    provider,
    isMicrosoft365,
    findings,
    verdict,
    criticalCount,
    warnCount,
  };
}
