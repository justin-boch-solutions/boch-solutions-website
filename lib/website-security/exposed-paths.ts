/**
 * Pfade, die bei falscher Server-Konfiguration öffentlich erreichbar sind und
 * dann Zugangsdaten oder Quellcode preisgeben.
 *
 * Es sind bewusst nur wenige, einzelne GET-Anfragen auf Standardpfade.
 * Keine Verzeichnis-Enumeration, keine Wortlisten, keine Exploit-Versuche.
 */

export interface ExposedPath {
  id: string;
  path: string;
  label: string;
  severity: "critical" | "high" | "medium" | "low";
  /** Nur wenn dieses Muster im Body steckt, gilt der Fund als echt (Schutz vor Soft-404). */
  confirm: RegExp;
  impact: string;
  actions: string[];
}

export const EXPOSED_PATHS: ExposedPath[] = [
  {
    id: "env-datei",
    path: "/.env",
    label: ".env-Datei öffentlich abrufbar",
    severity: "critical",
    confirm: /^\s*(?:[#\s]*)?[A-Z][A-Z0-9_]{2,}\s*=/m,
    impact:
      "In .env-Dateien stehen Datenbank-Passwörter, API-Schlüssel und App-Keys im Klartext. Wer die Datei abruft, hat in der Regel vollen Zugriff auf die Datenbank und oft auf den gesamten Server.",
    actions: [
      "Die Datei sofort aus dem Web-Root nehmen oder den Zugriff im Webserver sperren (Apache: <Files .env> Require all denied, nginx: location ~ /\\.env { deny all; }).",
      "Alle in der Datei enthaltenen Zugangsdaten als kompromittiert behandeln und rotieren: Datenbank-Passwort, APP_KEY, Mail-Zugang, alle API-Schlüssel.",
      "Prüfen, ob die Datei bereits abgerufen wurde: Access-Logs nach Zugriffen auf /.env durchsuchen.",
      "Künftig das Document Root auf das public-Verzeichnis legen, damit Konfigurationsdateien gar nicht erst erreichbar sind.",
    ],
  },
  {
    id: "git-verzeichnis",
    path: "/.git/config",
    label: "Git-Repository öffentlich abrufbar",
    severity: "critical",
    confirm: /\[core\]|\[remote\s|repositoryformatversion/i,
    impact:
      "Über ein offenes .git-Verzeichnis lässt sich der komplette Quellcode inklusive aller früheren Commits herunterladen. Darin stecken häufig Passwörter, die später entfernt, aber nie aus der Historie gelöscht wurden.",
    actions: [
      "Zugriff auf /.git/ im Webserver vollständig sperren.",
      "Das .git-Verzeichnis gehört nicht auf den Produktionsserver. Besser per Build-Pipeline nur das fertige Ergebnis ausrollen.",
      "Die Repository-Historie nach Zugangsdaten durchsuchen und alle Funde rotieren.",
    ],
  },
  {
    id: "phpinfo",
    path: "/phpinfo.php",
    label: "phpinfo()-Seite öffentlich erreichbar",
    severity: "high",
    confirm: /phpinfo\(\)|PHP Version|Loaded Configuration File/i,
    impact:
      "phpinfo() verrät die exakte PHP-Version, alle geladenen Module, Pfade und Teile der Konfiguration. Genau das braucht ein Angreifer, um einen passenden Exploit auszuwählen - bei PHP2Shell unmittelbar relevant.",
    actions: [
      "Die Datei löschen. Sie wird im Normalbetrieb nicht gebraucht.",
      "Prüfen, ob weitere Debug-Dateien herumliegen (test.php, info.php, pma.php).",
    ],
  },
  {
    id: "phpinfo-info",
    path: "/info.php",
    label: "phpinfo()-Seite unter /info.php erreichbar",
    severity: "high",
    confirm: /phpinfo\(\)|PHP Version|Loaded Configuration File/i,
    impact:
      "Wie /phpinfo.php: die Seite legt PHP-Version, Module und Konfiguration offen und erleichtert die Auswahl eines passenden Exploits.",
    actions: ["Die Datei löschen.", "Web-Root auf weitere vergessene Debug-Skripte prüfen."],
  },
  {
    id: "apache-server-status",
    path: "/server-status",
    label: "Apache mod_status öffentlich erreichbar",
    severity: "medium",
    confirm: /Apache Server Status|Server Version|Total Accesses/i,
    impact:
      "mod_status zeigt live alle laufenden Requests samt URLs und Client-IPs. Das verrät interne Pfade, Admin-Bereiche und Besucherdaten.",
    actions: [
      "Zugriff auf /server-status auf localhost oder das eigene Büro-Netz begrenzen.",
      "Wenn die Funktion nicht gebraucht wird: mod_status deaktivieren.",
    ],
  },
  {
    id: "ds-store",
    path: "/.DS_Store",
    label: ".DS_Store-Datei abrufbar",
    severity: "low",
    confirm: /^\x00\x00\x00\x01Bud1/,
    impact:
      "Die macOS-Datei .DS_Store enthält die Namen aller Dateien im Verzeichnis. Daraus lassen sich nicht verlinkte Backups und Admin-Skripte ableiten.",
    actions: [
      ".DS_Store-Dateien vom Server entfernen und in .gitignore sowie im Deployment-Filter ausschließen.",
      "Zugriff auf Dateien, die mit einem Punkt beginnen, serverseitig sperren.",
    ],
  },
  {
    id: "composer-lock",
    path: "/composer.lock",
    label: "composer.lock öffentlich abrufbar",
    severity: "medium",
    confirm: /"packages"\s*:|"content-hash"/,
    impact:
      "Die Datei listet jede eingesetzte PHP-Bibliothek mit exakter Version. Ein Angreifer kann daraus ohne eigenen Scan ableiten, welche bekannten Schwachstellen bei Ihnen offen sind.",
    actions: [
      "Zugriff auf composer.json und composer.lock sperren.",
      "Document Root auf das public-Verzeichnis umstellen.",
      "Danach composer audit lokal ausführen und gemeldete Pakete aktualisieren.",
    ],
  },
  {
    id: "package-json",
    path: "/package.json",
    label: "package.json öffentlich abrufbar",
    severity: "low",
    confirm: /"dependencies"\s*:|"devDependencies"\s*:/,
    impact:
      "Die Datei verrät alle Node.js-Abhängigkeiten mit Versionsbereich. Das erleichtert die gezielte Suche nach passenden Schwachstellen.",
    actions: [
      "package.json und package-lock.json aus dem öffentlichen Verzeichnis nehmen.",
      "npm audit ausführen und gemeldete Pakete aktualisieren.",
    ],
  },
  {
    id: "env-backup",
    path: "/.env.backup",
    label: "Backup der .env-Datei abrufbar",
    severity: "critical",
    confirm: /^\s*(?:[#\s]*)?[A-Z][A-Z0-9_]{2,}\s*=/m,
    impact:
      "Backup-Dateien werden vom Webserver meist als reiner Text ausgeliefert, nicht ausgeführt. Die enthaltenen Zugangsdaten stehen damit im Klartext im Netz.",
    actions: [
      "Backup-Datei sofort entfernen.",
      "Alle enthaltenen Zugangsdaten rotieren.",
      "Backups grundsätzlich außerhalb des Web-Roots ablegen.",
    ],
  },
  {
    id: "wp-config-backup",
    path: "/wp-config.php.bak",
    label: "Backup der wp-config.php abrufbar",
    severity: "critical",
    confirm: /DB_PASSWORD|DB_NAME|AUTH_KEY/i,
    impact:
      "Die wp-config.php enthält die Datenbank-Zugangsdaten und die WordPress-Sicherheitsschlüssel. Als .bak-Datei wird sie nicht von PHP ausgeführt, sondern im Klartext ausgeliefert.",
    actions: [
      "Datei sofort löschen.",
      "Datenbank-Passwort ändern und alle Salts in der wp-config.php neu generieren.",
      "Alle WordPress-Benutzer abmelden und Passwörter zurücksetzen.",
    ],
  },
  {
    id: "laravel-log",
    path: "/storage/logs/laravel.log",
    label: "Laravel-Logdatei öffentlich abrufbar",
    severity: "high",
    confirm: /\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\].*(local|production)\./,
    impact:
      "Laravel-Logs enthalten vollständige Stacktraces, oft mit Dateipfaden, SQL-Abfragen und manchmal Zugangsdaten aus Fehlermeldungen.",
    actions: [
      "Document Root auf public/ umstellen, damit storage/ nicht erreichbar ist.",
      "APP_DEBUG in Produktion auf false setzen.",
      "Log nach durchgesickerten Zugangsdaten durchsuchen und diese rotieren.",
    ],
  },
];

/** Positivprüfung: vorhanden ist gut, fehlend nur ein Hinweis. */
export const SECURITY_TXT_PATH = "/.well-known/security.txt";
