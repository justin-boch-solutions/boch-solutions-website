import { PHP2SHELL, assessPhpVersion } from "./cve-data";
import { EXPOSED_PATHS, SECURITY_TXT_PATH } from "./exposed-paths";
import { buildFingerprint, PHP_BASED_CMS } from "./fingerprint";
import { checkCookies, checkSecurityHeaders, checkVersionDisclosure } from "./headers";
import { assertPublicHost, inspectTls, normalizeTarget, probe } from "./net";
import { gradeFor, scoreFor, countBySeverity } from "./scoring";
import type { Finding, ScanResult, Severity } from "./types";

/** Führt alle Checks gegen eine öffentlich erreichbare Domain aus. */
export async function runScan(input: string): Promise<ScanResult> {
  const started = Date.now();

  const normalized = normalizeTarget(input);
  if (!normalized) throw new Error("UNGUELTIGE_DOMAIN");
  await assertPublicHost(normalized.hostname);

  const { origin, hostname } = normalized;
  const findings: Finding[] = [];
  const skipped: { id: string; reason: string }[] = [];

  // --- Startseite laden -----------------------------------------------------
  const main = await probe(origin, { timeoutMs: 10_000 });
  if (!main.ok || !main.headers) {
    throw new Error(main.error === "TIMEOUT" ? "ZEITUEBERSCHREITUNG" : "NICHT_ERREICHBAR");
  }
  const headers = main.headers;
  const html = main.body ?? "";
  const fp = buildFingerprint(headers, html);

  // --- PHP2Shell ------------------------------------------------------------
  findings.push(...php2shellFindings(fp));

  // --- Versions- und Technik-Leaks -----------------------------------------
  findings.push(...checkVersionDisclosure(headers));

  // --- Security-Header ------------------------------------------------------
  findings.push(...checkSecurityHeaders(headers));

  // --- Cookies --------------------------------------------------------------
  findings.push(...checkCookies(headers));

  // --- Transportsicherheit --------------------------------------------------
  const [tls, httpProbe] = await Promise.all([
    inspectTls(hostname),
    probe(`http://${hostname}/`, { redirect: "manual", timeoutMs: 8000 }),
  ]);
  findings.push(...tlsFindings(tls, hostname));
  findings.push(...httpRedirectFindings(httpProbe, hostname));

  // --- Weitere Hinweise aus dem HTML ---------------------------------------
  findings.push(...mixedContentFindings(html, hostname));
  findings.push(...directoryListingFindings(html, main.status));

  // --- Offenliegende Dateien ------------------------------------------------
  const exposure = await checkExposedPaths(origin);
  findings.push(...exposure.findings);
  skipped.push(...exposure.skipped);

  // --- security.txt (Positivcheck) -----------------------------------------
  findings.push(await securityTxtFinding(origin));

  const counts = countBySeverity(findings);
  const score = scoreFor(findings);

  return {
    target: { input, origin, hostname },
    scannedAt: new Date().toISOString(),
    durationMs: Date.now() - started,
    score,
    grade: gradeFor(score),
    findings: sortFindings(findings),
    counts,
    fingerprint: {
      server: fp.server,
      poweredBy: fp.poweredBy,
      phpVersion: fp.phpVersion,
      nodeHint: fp.nodeHint,
      cms: fp.cms ? (fp.cmsVersion ? `${fp.cms} ${fp.cmsVersion}` : fp.cms) : undefined,
    },
    skipped,
  };
}

// ---------------------------------------------------------------------------
// PHP2Shell
// ---------------------------------------------------------------------------

export function php2shellFindings(fp: ReturnType<typeof buildFingerprint>): Finding[] {
  const refs = PHP2SHELL.references.map((r) => ({ label: r.label, url: r.url }));
  const cves = [...PHP2SHELL.cves];

  const patchActions = [
    `Sofort auf eine gepatchte PHP-Version aktualisieren: ${Object.values(PHP2SHELL.fixedVersions).join(", ")}.`,
    "Bei Linux-Distributionen (Debian, Ubuntu, RHEL) läuft das über die Paketverwaltung. Die Distribution patcht per Backport, die Versionsnummer bleibt dabei oft unverändert - entscheidend ist das Advisory der Distribution, nicht die Nummer.",
    "Nach dem Update PHP-FPM beziehungsweise den Webserver neu starten, sonst läuft der alte Prozess weiter.",
    "Docker-Container müssen neu gebaut werden, ein Update im laufenden Container reicht nicht.",
    "Wenn sich nicht sofort patchen lässt: die BSI-Workarounds setzen (memory_limit, post_max_size, session.upload_progress.enabled=0, fatal_error_backtraces=0) und den Server notfalls vom Netz nehmen.",
  ];

  // Kein Hinweis auf PHP gefunden.
  if (!fp.phpDetected && !(fp.cms && PHP_BASED_CMS.includes(fp.cms))) {
    return [
      {
        id: "php2shell",
        category: "php2shell",
        severity: "info",
        title: "Kein Hinweis auf PHP gefunden",
        evidence:
          "Weder Header, Cookies noch HTML deuten auf eine PHP-Anwendung hin. Das schließt PHP im Hintergrund aber nicht aus.",
        impact:
          "PHP2Shell betrifft nur Systeme, auf denen PHP Webanfragen verarbeitet. Nach aktuellem Stand sieht diese Seite nicht danach aus.",
        actions: [
          "Trotzdem prüfen, ob auf derselben Maschine weitere PHP-Dienste laufen (Webmail, phpMyAdmin, Admin-Oberflächen).",
          "Das BSI weist darauf hin, dass auch Firewalls, Router und NAS-Systeme PHP-Weboberflächen mitbringen - Herstellerhinweise beachten.",
        ],
        references: refs,
        cves,
      },
    ];
  }

  // PHP erkannt, aber keine Version im Header.
  if (!fp.phpVersion) {
    const via = fp.cms && PHP_BASED_CMS.includes(fp.cms) ? `Erkanntes System: ${fp.cms}.` : "";
    return [
      {
        id: "php2shell",
        category: "php2shell",
        severity: "high",
        title: "PHP im Einsatz, Patchstand von außen nicht feststellbar",
        evidence:
          `Die Seite läuft erkennbar auf PHP, gibt die Version aber nicht preis. ${via}`.trim(),
        impact:
          `PHP2Shell (${PHP2SHELL.cves.join(", ")}, CVSS ${PHP2SHELL.cvss}) erlaubt nicht authentifizierte Codeausführung aus der Ferne. Laut BSI sind alle PHP-Versionen zurück bis mindestens PHP 5 betroffen. Ob dieser Server gepatcht ist, lässt sich ohne Serverzugriff nicht klären - genau deshalb muss es aktiv geprüft werden.`,
        actions: [
          "Auf dem Server php -v ausführen und mit den gepatchten Versionen abgleichen.",
          "Das kostenlose Selbstcheck-Skript von dieser Seite nutzt genau diesen Weg und prüft zusätzlich die php.ini-Workarounds.",
          ...patchActions,
        ],
        references: refs,
        cves,
      },
    ];
  }

  // Version bekannt: bewerten.
  const verdict = assessPhpVersion(fp.phpVersion);

  if (verdict.status === "verwundbar") {
    return [
      {
        id: "php2shell",
        category: "php2shell",
        severity: "critical",
        title: "PHP-Version ist nicht gegen PHP2Shell gepatcht",
        evidence: `Der Server meldet PHP ${fp.phpVersion}. ${verdict.note}`,
        impact:
          `PHP2Shell erlaubt es, ohne Anmeldung und ohne Zutun eines Nutzers beliebigen Code auf dem Webserver auszuführen (CVSS ${PHP2SHELL.cvss}). Für die Schwachstellen existieren öffentliche Proof-of-Concepts, und es gibt Berichte über automatisierte Ausnutzungsversuche. Ein erfolgreicher Angriff bedeutet in der Regel: vollständige Kontrolle über den Server, Zugriff auf die Datenbank und damit auf alle Kundendaten.`,
        actions: [
          "Das ist der dringendste Punkt in diesem Bericht. Patchen hat Vorrang vor allem anderen.",
          ...patchActions,
          "Nach dem Patch prüfen, ob der Server bereits kompromittiert wurde: ungewöhnliche Shell- oder Kindprozesse des Webservers, neu angelegte oder veränderte PHP-Dateien, auffällige Multipart-Uploads und POST-Requests mit PHP_SESSION_UPLOAD_PROGRESS in den Access-Logs.",
          "Bei Verdacht auf eine Kompromittierung behebt ein Patch nichts mehr - dann ist eine Neuaufsetzung aus einem sauberen Backup nötig.",
        ],
        references: refs,
        cves,
      },
    ];
  }

  if (verdict.status === "eol" || verdict.status === "eol-backport") {
    return [
      {
        id: "php2shell",
        category: "php2shell",
        severity: "critical",
        title: `PHP ${verdict.branch} erhält keine regulären Sicherheitsupdates mehr`,
        evidence: `Der Server meldet PHP ${fp.phpVersion}. ${verdict.note}`,
        impact:
          "Eine End-of-Life-Version ist dauerhaft angreifbar: künftige Lücken werden nie geschlossen. Beim aktuellen PHP2Shell gibt es zwar ausnahmsweise Backport-Patches, das ist aber die Ausnahme und keine Lösung auf Dauer.",
        actions: [
          "Kurzfristig: beim Hoster oder der Distribution prüfen, ob der PHP2Shell-Backport eingespielt ist.",
          "Mittelfristig: auf eine unterstützte Version migrieren (8.3 oder 8.4). Das BSI empfiehlt das ausdrücklich.",
          "Vor der Migration die Anwendung in einer Testumgebung prüfen - ältere CMS-Erweiterungen laufen nicht immer unter neuem PHP.",
          ...patchActions.slice(2),
        ],
        references: refs,
        cves,
      },
    ];
  }

  if (verdict.status === "gepatcht") {
    return [
      {
        id: "php2shell",
        category: "php2shell",
        severity: "low",
        title: "PHP-Version liegt auf dem PHP2Shell-Patchlevel",
        evidence: `Der Server meldet PHP ${fp.phpVersion}. ${verdict.note}`,
        impact:
          "Die gemeldete Version ist neuer als der Patch. Beachte aber: Versionsangaben im Header lassen sich fälschen, und Distributionen patchen per Backport ohne die Nummer zu erhöhen. Die Angabe ist ein starkes Indiz, kein Beweis.",
        actions: [
          "Zur Absicherung auf dem Server php -v ausführen und mit dem Advisory des Hosters abgleichen.",
          "Prüfen, ob PHP-FPM beziehungsweise der Webserver nach dem Update tatsächlich neu gestartet wurde.",
          "expose_php = Off setzen, damit die Version gar nicht erst nach außen gemeldet wird.",
        ],
        references: refs,
        cves,
      },
    ];
  }

  return [
    {
      id: "php2shell",
      category: "php2shell",
      severity: "medium",
      title: "PHP-Version ließ sich nicht eindeutig bewerten",
      evidence: `Gemeldet wurde: ${fp.phpVersion}. ${verdict.note}`,
      impact:
        "Ohne klare Zuordnung zu einem Release-Branch lässt sich nicht sagen, ob der PHP2Shell-Patch enthalten ist.",
      actions: ["Auf dem Server php -v ausführen.", ...patchActions],
      references: refs,
      cves,
    },
  ];
}

// ---------------------------------------------------------------------------
// Transport
// ---------------------------------------------------------------------------

function tlsFindings(tls: Awaited<ReturnType<typeof inspectTls>>, hostname: string): Finding[] {
  if (tls.error === "TIMEOUT" || tls.error === "KEIN_ZERTIFIKAT") {
    return [
      {
        id: "tls",
        category: "transport",
        severity: "high",
        title: "TLS-Zertifikat konnte nicht geprüft werden",
        evidence: `Die Verbindung zu ${hostname}:443 lieferte kein auswertbares Zertifikat (${tls.error}).`,
        impact: "Ohne funktionierendes HTTPS werden alle Eingaben im Klartext übertragen.",
        actions: ["Prüfen, ob auf Port 443 überhaupt ein Dienst läuft.", "Zertifikat einrichten, z.B. kostenlos über Let's Encrypt."],
      },
    ];
  }

  if (!tls.valid) {
    return [
      {
        id: "tls",
        category: "transport",
        severity: "high",
        title: "TLS-Zertifikat ist nicht gültig",
        evidence: `Prüfung fehlgeschlagen: ${tls.error ?? "unbekannter Grund"}.`,
        impact:
          "Besucher sehen eine Browser-Warnung und springen ab. Gleichzeitig lässt sich eine abgefangene Verbindung nicht mehr von einem Angriff unterscheiden.",
        actions: [
          "Zertifikatskette prüfen - häufig fehlt das Intermediate-Zertifikat.",
          "Sicherstellen, dass das Zertifikat auf genau diesen Hostnamen ausgestellt ist.",
          "Automatische Erneuerung einrichten (certbot renew im Cron).",
        ],
      },
    ];
  }

  const days = tls.daysRemaining ?? 999;
  if (days < 14) {
    return [
      {
        id: "tls",
        category: "transport",
        severity: days < 0 ? "high" : "medium",
        title: days < 0 ? "TLS-Zertifikat ist abgelaufen" : "TLS-Zertifikat läuft in Kürze ab",
        evidence: `Gültig bis ${tls.validTo?.slice(0, 10)} (${days} Tage).`,
        impact: "Ein abgelaufenes Zertifikat macht die Seite praktisch unerreichbar, weil Browser den Zugriff blockieren.",
        actions: ["Zertifikat erneuern.", "Automatische Erneuerung einrichten und überwachen."],
      },
    ];
  }

  return [
    {
      id: "tls",
      category: "transport",
      severity: "ok",
      title: "TLS-Zertifikat ist gültig",
      evidence: `Aussteller ${tls.issuer ?? "unbekannt"}, gültig bis ${tls.validTo?.slice(0, 10)} (${days} Tage), Protokoll ${tls.protocol ?? "unbekannt"}.`,
      impact: "",
      actions: [],
    },
  ];
}

function httpRedirectFindings(p: Awaited<ReturnType<typeof probe>>, hostname: string): Finding[] {
  if (!p.ok) {
    return [
      {
        id: "http-weiterleitung",
        category: "transport",
        severity: "ok",
        title: "Unverschlüsseltes HTTP ist nicht erreichbar",
        evidence: `Ein Verbindungsversuch auf http://${hostname}/ kam nicht zustande.`,
        impact: "",
        actions: [],
      },
    ];
  }

  const location = p.headers?.get("location") ?? "";
  const isRedirect = p.status !== undefined && p.status >= 300 && p.status < 400;

  if (isRedirect && location.startsWith("https://")) {
    return [
      {
        id: "http-weiterleitung",
        category: "transport",
        severity: "ok",
        title: "HTTP wird auf HTTPS weitergeleitet",
        evidence: `http://${hostname}/ antwortet mit ${p.status} auf ${location}.`,
        impact: "",
        actions: [],
      },
    ];
  }

  return [
    {
      id: "http-weiterleitung",
      category: "transport",
      severity: "medium",
      title: "Seite ist auch unverschlüsselt per HTTP erreichbar",
      evidence: `http://${hostname}/ antwortet mit Status ${p.status} ohne Weiterleitung auf HTTPS.`,
      impact:
        "Wer die Adresse ohne https eingibt, überträgt Formulardaten und Cookies im Klartext. In fremden Netzen kann das mitgelesen werden.",
      actions: [
        "Eine dauerhafte Weiterleitung (301) von HTTP auf HTTPS einrichten.",
        "Anschließend HSTS aktivieren, damit der Browser gar nicht erst HTTP probiert.",
      ],
    },
  ];
}

// ---------------------------------------------------------------------------
// HTML-basierte Hinweise
// ---------------------------------------------------------------------------

function mixedContentFindings(html: string, hostname: string): Finding[] {
  const matches = html.match(/(?:src|href)=["']http:\/\/(?!localhost)[^"']+["']/gi) ?? [];
  const external = matches.filter((m) => !m.includes(hostname));
  if (external.length === 0) return [];

  const sample = external.slice(0, 3).map((m) => m.replace(/^(src|href)=["']/i, "").replace(/["']$/, ""));
  return [
    {
      id: "mixed-content",
      category: "transport",
      severity: "medium",
      title: "Unverschlüsselte Inhalte auf einer HTTPS-Seite",
      evidence: `${external.length} Einbindung(en) über http://, darunter: ${sample.join(", ")}`,
      impact:
        "Browser blockieren solche Inhalte teilweise oder zeigen die Seite als unsicher an. Eingebundene Skripte über HTTP kann ein Angreifer im Netzwerk austauschen und damit beliebigen Code auf Ihrer Seite ausführen.",
      actions: [
        "Alle Einbindungen auf https:// umstellen.",
        "Quellen, die kein HTTPS können, lokal einbinden oder ersetzen.",
        "Per CSP absichern: upgrade-insecure-requests.",
      ],
    },
  ];
}

function directoryListingFindings(html: string, status?: number): Finding[] {
  if (status !== 200) return [];
  if (!/<title>Index of \/|<h1>Index of \//i.test(html)) return [];
  return [
    {
      id: "directory-listing",
      category: "exposition",
      severity: "medium",
      title: "Verzeichnisauflistung ist aktiv",
      evidence: "Der Server liefert statt einer Seite eine Dateiliste (Index of /).",
      impact:
        "Jeder kann sehen, welche Dateien auf dem Server liegen - inklusive Backups, Exporten und Dateien, die nirgends verlinkt sind.",
      actions: [
        "Apache: Options -Indexes setzen.",
        "nginx: autoindex off; setzen.",
        "Prüfen, welche Dateien dort tatsächlich liegen und ob sie öffentlich sein sollen.",
      ],
    },
  ];
}

// ---------------------------------------------------------------------------
// Offenliegende Dateien
// ---------------------------------------------------------------------------

async function checkExposedPaths(origin: string) {
  const findings: Finding[] = [];
  const skipped: { id: string; reason: string }[] = [];

  // Soft-404-Referenz: ein sicher nicht existierender Pfad.
  const control = await probe(`${origin}/boch-solutions-404-probe-${Date.now()}`, { timeoutMs: 6000 });
  const controlStatus = control.ok ? control.status : undefined;
  const controlLength = control.body?.length ?? 0;

  const results = await Promise.all(
    EXPOSED_PATHS.map(async (def) => {
      const res = await probe(`${origin}${def.path}`, { timeoutMs: 6000, maxBytes: 32 * 1024 });
      return { def, res };
    })
  );

  for (const { def, res } of results) {
    if (!res.ok) {
      skipped.push({ id: def.id, reason: res.error === "TIMEOUT" ? "Zeitüberschreitung" : "Nicht erreichbar" });
      continue;
    }
    if (res.status !== 200) continue;

    const body = res.body ?? "";
    // Soft-404: Server antwortet auf alles mit 200 und gleichem Inhalt.
    if (controlStatus === 200 && Math.abs(body.length - controlLength) < 32) continue;
    // Inhalt muss zum erwarteten Dateityp passen.
    if (!def.confirm.test(body)) continue;

    findings.push({
      id: `exposed-${def.id}`,
      category: "exposition",
      severity: def.severity,
      title: def.label,
      evidence: `${origin}${def.path} antwortet mit Status 200 und einem Inhalt, der dem erwarteten Dateiformat entspricht.`,
      impact: def.impact,
      actions: def.actions,
    });
  }

  return { findings, skipped };
}

async function securityTxtFinding(origin: string): Promise<Finding> {
  const res = await probe(`${origin}${SECURITY_TXT_PATH}`, { timeoutMs: 5000, maxBytes: 8192 });
  const found = res.ok && res.status === 200 && /Contact:/i.test(res.body ?? "");

  if (found) {
    return {
      id: "security-txt",
      category: "stack",
      severity: "ok",
      title: "security.txt ist hinterlegt",
      evidence: `${origin}${SECURITY_TXT_PATH} ist vorhanden und nennt einen Kontakt.`,
      impact: "",
      actions: [],
    };
  }

  return {
    id: "security-txt",
    category: "stack",
    severity: "info",
    title: "Keine security.txt hinterlegt",
    evidence: `Unter ${origin}${SECURITY_TXT_PATH} liegt keine Datei nach RFC 9116.`,
    impact:
      "Sicherheitsforscher, die eine Lücke in Ihrer Seite finden, wissen nicht, an wen sie sich wenden sollen. Im schlechtesten Fall wird die Lücke stattdessen veröffentlicht oder verkauft.",
    actions: [
      "Eine Datei unter /.well-known/security.txt anlegen.",
      "Mindestens Contact: mailto:... und Expires: (ein Datum in der Zukunft) eintragen.",
      "Das ist in 5 Minuten erledigt und wirkt bei Audits und Ausschreibungen professionell.",
    ],
  };
}

// ---------------------------------------------------------------------------

const SEVERITY_ORDER: Severity[] = ["critical", "high", "medium", "low", "info", "ok"];

function sortFindings(findings: Finding[]): Finding[] {
  return [...findings].sort(
    (a, b) => SEVERITY_ORDER.indexOf(a.severity) - SEVERITY_ORDER.indexOf(b.severity)
  );
}
