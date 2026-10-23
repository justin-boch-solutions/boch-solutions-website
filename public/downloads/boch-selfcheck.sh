#!/usr/bin/env bash
#
# Boch Solutions - Server-Selbstcheck
# PHP2Shell (CVE-2026-109618 / CVE-2026-109619) und allgemeine Haertung
#
# Grundlage: BSI-IT-Sicherheitshinweis BITS-H Nr. 2026-297981-1232, Version 1.2
#            vom 22.10.2026 (TLP:CLEAR)
#
# Das Skript liest nur. Es aendert nichts, installiert nichts und sendet nichts.
# Ausfuehren am besten als root, damit auch php.ini-Werte und Logs lesbar sind:
#
#     sudo bash boch-selfcheck.sh
#
# Rueckgabewerte: 0 = nichts Kritisches, 1 = Handlungsbedarf, 2 = kritischer Fund
#
# https://boch-solutions.de/sicherheits-check

set -uo pipefail

VERSION="1.0"
EXIT_CODE=0

# --- Patchstand laut BSI ----------------------------------------------------
PATCH_85="12"; PATCH_84="27"; PATCH_83="36"; PATCH_82="35"
EOL_BRANCHES="5.0 5.1 5.2 5.3 5.4 5.5 5.6 7.0 7.1 7.2 7.3 7.4 8.0 8.1"

# --- Ausgabe ----------------------------------------------------------------
if [ -t 1 ] && command -v tput >/dev/null 2>&1 && [ "$(tput colors 2>/dev/null || echo 0)" -ge 8 ]; then
  C_RED=$(tput setaf 1); C_YEL=$(tput setaf 3); C_GRN=$(tput setaf 2)
  C_BLU=$(tput setaf 4); C_DIM=$(tput dim); C_B=$(tput bold); C_0=$(tput sgr0)
else
  C_RED=""; C_YEL=""; C_GRN=""; C_BLU=""; C_DIM=""; C_B=""; C_0=""
fi

CRIT=0; WARN=0; OKAY=0; INFO=0

section() { printf '\n%s%s== %s ==%s\n' "$C_B" "$C_BLU" "$1" "$C_0"; }
crit()    { CRIT=$((CRIT+1)); EXIT_CODE=2; printf '  %s[KRITISCH]%s %s\n' "$C_RED$C_B" "$C_0" "$1"; }
warn()    { WARN=$((WARN+1)); [ "$EXIT_CODE" -lt 1 ] && EXIT_CODE=1; printf '  %s[WARNUNG ]%s %s\n' "$C_YEL" "$C_0" "$1"; }
ok()      { OKAY=$((OKAY+1)); printf '  %s[  OK    ]%s %s\n' "$C_GRN" "$C_0" "$1"; }
info()    { INFO=$((INFO+1)); printf '  %s[ HINWEIS]%s %s\n' "$C_DIM" "$C_0" "$1"; }
todo()    { printf '             %s-> %s%s\n' "$C_DIM" "$1" "$C_0"; }

printf '%s%s' "$C_B" "$C_BLU"
cat <<'BANNER'
  ____             _       ____        _       _   _
 | __ )  ___   ___| |__   / ___|  ___ | |_   _| |_(_) ___  _ __  ___
 |  _ \ / _ \ / __| '_ \  \___ \ / _ \| | | | | __| |/ _ \| '_ \/ __|
 | |_) | (_) | (__| | | |  ___) | (_) | | |_| | |_| | (_) | | | \__ \
 |____/ \___/ \___|_| |_| |____/ \___/|_|\__,_|\__|_|\___/|_| |_|___/
BANNER
printf '%s' "$C_0"
printf '  Server-Selbstcheck v%s  |  PHP2Shell + Haertung\n' "$VERSION"
printf '  %sHost: %s  |  %s%s\n' "$C_DIM" "$(hostname 2>/dev/null || echo unbekannt)" "$(date '+%d.%m.%Y %H:%M')" "$C_0"

if [ "$(id -u)" -ne 0 ]; then
  printf '\n  %sHinweis: laeuft ohne root. Einige Pruefungen (php.ini, Logs, Prozesse)%s\n' "$C_YEL" "$C_0"
  printf '  %ssind dann unvollstaendig. Empfohlen: sudo bash %s%s\n' "$C_YEL" "$(basename "$0")" "$C_0"
fi

# ---------------------------------------------------------------------------
section "1. PHP-Version und PHP2Shell"
# ---------------------------------------------------------------------------

php_branch_patch() {
  # $1 = branch (z.B. 8.3) -> erforderlicher Patchlevel oder leer
  case "$1" in
    8.5) echo "$PATCH_85" ;; 8.4) echo "$PATCH_84" ;;
    8.3) echo "$PATCH_83" ;; 8.2) echo "$PATCH_82" ;;
    *) echo "" ;;
  esac
}

check_php_binary() {
  local bin="$1" label="$2" full branch patch required
  full=$("$bin" -r 'echo PHP_VERSION;' 2>/dev/null) || full=""
  [ -z "$full" ] && return 1

  branch=$(printf '%s' "$full" | cut -d. -f1,2)
  patch=$(printf '%s' "$full" | cut -d. -f3 | tr -cd '0-9')
  required=$(php_branch_patch "$branch")

  printf '  %s%s: PHP %s%s\n' "$C_DIM" "$label" "$full" "$C_0"

  if [ -n "$required" ]; then
    if [ -n "$patch" ] && [ "$patch" -ge "$required" ] 2>/dev/null; then
      ok "$label ist gegen PHP2Shell gepatcht (>= ${branch}.${required})."
    else
      crit "$label ist NICHT gepatcht. Noetig ist mindestens ${branch}.${required}, installiert ist ${full}."
      todo "Paketquellen aktualisieren und PHP einspielen, danach PHP-FPM/Webserver neu starten."
      todo "Bis dahin die Workarounds aus Abschnitt 2 setzen."
    fi
  elif printf '%s ' $EOL_BRANCHES | grep -q "$branch "; then
    crit "$label laeuft auf PHP $branch - End-of-Life, keine regulaeren Sicherheitsupdates."
    todo "Fuer PHP2Shell gibt es Backport-Patches. Beim Hoster/der Distribution pruefen, ob sie eingespielt sind."
    todo "Mittelfristig auf PHP 8.3 oder 8.4 migrieren (Empfehlung des BSI)."
  else
    info "$label laeuft auf PHP $branch - nicht in der hinterlegten Datenbasis. Advisory pruefen."
  fi
  return 0
}

PHP_FOUND=0
if command -v php >/dev/null 2>&1; then
  check_php_binary "$(command -v php)" "CLI (php)" && PHP_FOUND=1
fi

# Weitere PHP-Binaries, z.B. bei Multi-Version-Hostern
for alt in /usr/bin/php[0-9]* /usr/local/bin/php[0-9]* /opt/php*/bin/php /opt/cpanel/ea-php*/root/usr/bin/php /opt/plesk/php/*/bin/php; do
  [ -x "$alt" ] || continue
  [ "$alt" = "$(command -v php 2>/dev/null)" ] && continue
  check_php_binary "$alt" "$alt" && PHP_FOUND=1
done

# Wichtig: die CLI-Version ist oft NICHT die, die der Webserver nutzt.
if command -v php-fpm >/dev/null 2>&1 || ls /usr/sbin/php-fpm* >/dev/null 2>&1; then
  info "PHP-FPM ist installiert. Die FPM-Version kann von der CLI-Version abweichen."
  todo "Pruefen mit: php-fpm -v   bzw.   systemctl status 'php*-fpm'"
  for fpm in /usr/sbin/php-fpm /usr/sbin/php-fpm[0-9]* /usr/local/sbin/php-fpm; do
    [ -x "$fpm" ] || continue
    fv=$("$fpm" -v 2>/dev/null | head -1)
    [ -n "$fv" ] && printf '  %s%s -> %s%s\n' "$C_DIM" "$fpm" "$fv" "$C_0"
  done
fi

if [ "$PHP_FOUND" -eq 0 ]; then
  info "Kein PHP-Interpreter gefunden. PHP2Shell betrifft diesen Host vermutlich nicht."
  todo "Trotzdem pruefen: laufen Container oder Appliances mit eigener PHP-Laufzeit?"
fi

# Distributions-Backport sichtbar machen - entscheidend laut BSI
if command -v dpkg-query >/dev/null 2>&1; then
  pkgver=$(dpkg-query -W -f='${Version}' php-common 2>/dev/null || dpkg-query -W -f='${Package} ${Version}\n' 'php*-cli' 2>/dev/null | head -1)
  [ -n "$pkgver" ] && info "Distributionspaket: $pkgver  (Debian/Ubuntu patchen per Backport, die Versionsnummer bleibt oft gleich)"
elif command -v rpm >/dev/null 2>&1; then
  pkgver=$(rpm -q php-common 2>/dev/null | head -1)
  [ -n "$pkgver" ] && info "Distributionspaket: $pkgver  (RHEL/Alma patchen per Backport)"
fi

# ---------------------------------------------------------------------------
section "2. BSI-Workarounds in der PHP-Konfiguration"
# ---------------------------------------------------------------------------

if [ "$PHP_FOUND" -eq 1 ]; then
  ini_get() { php -r "echo ini_get('$1');" 2>/dev/null; }
  INI_FILE=$(php -r 'echo php_ini_loaded_file() ?: "";' 2>/dev/null)
  [ -n "$INI_FILE" ] && printf '  %sGeladene php.ini: %s%s\n' "$C_DIM" "$INI_FILE" "$C_0"

  # CVE-2026-109619: session.upload_progress.enabled = 0
  sup=$(ini_get session.upload_progress.enabled)
  if [ "$sup" = "0" ] || [ -z "$sup" ]; then
    ok "session.upload_progress.enabled ist deaktiviert (Workaround fuer CVE-2026-109619)."
  else
    warn "session.upload_progress.enabled ist aktiv. Das BSI nennt das als bestaetigten Angriffspfad."
    todo "In der php.ini oder im FPM-Pool setzen: session.upload_progress.enabled=0, danach alle Worker neu starten."
    todo "Achtung: ini_set() oder FPM-user.ini reichen nicht - der Wert muss vor der Verarbeitung greifen."
  fi

  # CVE-2026-109619 unter PHP 8.5: fatal_error_backtraces = 0
  feb=$(ini_get fatal_error_backtraces)
  if [ -n "$feb" ]; then
    if [ "$feb" = "0" ] || [ "$feb" = "" ]; then
      ok "fatal_error_backtraces ist deaktiviert."
    else
      warn "fatal_error_backtraces ist aktiv (nur relevant unter PHP < 8.5)."
      todo "Setzen: fatal_error_backtraces=0, danach Worker neu starten."
    fi
  fi

  # CVE-2026-109618: memory_limit
  ml=$(ini_get memory_limit)
  if [ "$ml" = "-1" ]; then
    ok "memory_limit ist auf -1 gesetzt (Workaround fuer CVE-2026-109618)."
    todo "Dann aber zwingend ein Container-/cgroup-Limit setzen, damit der Host nicht volllaeuft."
  else
    info "memory_limit = ${ml:-unbekannt}. Das BSI empfiehlt als Workaround -1, abgesichert per cgroup-Limit."
    todo "Nur sinnvoll, wenn nicht sofort gepatcht werden kann. Patchen ist immer besser."
  fi

  # CVE-2026-109618: post_max_size
  pms=$(ini_get post_max_size)
  umf=$(ini_get upload_max_filesize)
  info "post_max_size = ${pms:-unbekannt}, upload_max_filesize = ${umf:-unbekannt}"
  todo "BSI-Empfehlung: ohne Datei-Uploads post_max_size = 8M, mit Uploads 32M (upload_max_filesize darunter halten)."

  # Haertung unabhaengig von PHP2Shell
  [ "$(ini_get expose_php)" = "1" ] && { warn "expose_php ist aktiv - die PHP-Version steht im HTTP-Header."; todo "expose_php = Off setzen."; } || ok "expose_php ist deaktiviert."
  [ "$(ini_get display_errors)" = "1" ] && { warn "display_errors ist aktiv - Fehlermeldungen gehen an Besucher."; todo "display_errors = Off, log_errors = On setzen."; } || ok "display_errors ist deaktiviert."
  [ "$(ini_get allow_url_include)" = "1" ] && { crit "allow_url_include ist aktiv. Das erlaubt Remote File Inclusion."; todo "allow_url_include = Off setzen."; }
  [ "$(ini_get session.cookie_httponly)" = "1" ] || { warn "session.cookie_httponly ist nicht gesetzt."; todo "session.cookie_httponly = 1 setzen."; }
  [ "$(ini_get session.cookie_secure)" = "1" ] || { warn "session.cookie_secure ist nicht gesetzt."; todo "session.cookie_secure = 1 setzen (nur bei durchgaengigem HTTPS)."; }
else
  info "Uebersprungen - kein PHP gefunden."
fi

# ---------------------------------------------------------------------------
section "3. Node.js"
# ---------------------------------------------------------------------------

if command -v node >/dev/null 2>&1; then
  NODE_V=$(node -v 2>/dev/null | tr -d 'v')
  NODE_MAJOR=$(printf '%s' "$NODE_V" | cut -d. -f1)
  printf '  %sNode.js: v%s%s\n' "$C_DIM" "$NODE_V" "$C_0"
  if [ "$NODE_MAJOR" -lt 22 ] 2>/dev/null; then
    warn "Node.js $NODE_V erhaelt keine Sicherheitsupdates mehr (End-of-Life)."
    todo "Auf eine aktive LTS-Version wechseln (24.x oder 22.x)."
  elif [ "$((NODE_MAJOR % 2))" -eq 1 ] 2>/dev/null; then
    info "Node.js $NODE_V ist eine ungerade Release-Linie ohne LTS-Status."
    todo "Fuer Produktivbetrieb eine LTS-Version verwenden."
  else
    ok "Node.js $NODE_V ist eine unterstuetzte LTS-Linie."
  fi
else
  info "Node.js ist auf diesem Host nicht installiert."
fi

# ---------------------------------------------------------------------------
section "4. Abhaengigkeiten mit bekannten Schwachstellen"
# ---------------------------------------------------------------------------

SCAN_DIRS="${SCAN_DIRS:-/var/www /srv/www /home/*/public_html /usr/share/nginx/html .}"
FOUND_PROJECT=0

for dir in $SCAN_DIRS; do
  [ -d "$dir" ] || continue

  if [ -f "$dir/composer.lock" ]; then
    FOUND_PROJECT=1
    if command -v composer >/dev/null 2>&1; then
      printf '  %scomposer audit in %s ...%s\n' "$C_DIM" "$dir" "$C_0"
      out=$(cd "$dir" && composer audit --no-interaction --format=plain 2>&1)
      if printf '%s' "$out" | grep -qi "no security vulnerability"; then
        ok "composer audit in $dir: keine bekannten Schwachstellen."
      else
        n=$(printf '%s' "$out" | grep -ci "advisor" || true)
        warn "composer audit in $dir meldet Treffer ($n Zeilen mit Advisories)."
        printf '%s\n' "$out" | head -20 | sed 's/^/             /'
        todo "composer update fuer die gemeldeten Pakete ausfuehren."
      fi
    else
      info "composer.lock in $dir gefunden, composer ist aber nicht installiert."
      todo "composer installieren und 'composer audit' ausfuehren."
    fi
  fi

  if [ -f "$dir/package.json" ]; then
    FOUND_PROJECT=1
    if command -v npm >/dev/null 2>&1; then
      printf '  %snpm audit in %s ...%s\n' "$C_DIM" "$dir" "$C_0"
      crit_n=$(cd "$dir" && npm audit --audit-level=critical --json 2>/dev/null | grep -o '"critical":[0-9]*' | head -1 | cut -d: -f2)
      high_n=$(cd "$dir" && npm audit --audit-level=high --json 2>/dev/null | grep -o '"high":[0-9]*' | head -1 | cut -d: -f2)
      crit_n=${crit_n:-0}; high_n=${high_n:-0}
      if [ "$crit_n" -gt 0 ] 2>/dev/null; then
        crit "npm audit in $dir: $crit_n kritische Schwachstelle(n) in Abhaengigkeiten."
        todo "npm audit fix ausfuehren, bei Bedarf npm audit fix --force (vorher testen)."
      elif [ "$high_n" -gt 0 ] 2>/dev/null; then
        warn "npm audit in $dir: $high_n Schwachstelle(n) mit hohem Schweregrad."
        todo "npm audit fix ausfuehren."
      else
        ok "npm audit in $dir: nichts Kritisches."
      fi
    else
      info "package.json in $dir gefunden, npm ist aber nicht installiert."
    fi
  fi
done

[ "$FOUND_PROJECT" -eq 0 ] && info "Keine composer.lock oder package.json in den Standardpfaden gefunden. Mit SCAN_DIRS='/pfad' eigene Pfade angeben."

# ---------------------------------------------------------------------------
section "5. Anzeichen fuer eine Kompromittierung (IoCs laut BSI)"
# ---------------------------------------------------------------------------

printf '  %sDas BSI nennt keine zuverlaessigen IoCs fuer PHP2Shell. Die folgenden%s\n' "$C_DIM" "$C_0"
printf '  %sPruefungen sind generische Hinweise - Treffer sind kein Beweis.%s\n' "$C_DIM" "$C_0"

WEBROOTS=""
for d in /var/www /srv/www /usr/share/nginx/html /home/*/public_html; do
  [ -d "$d" ] && WEBROOTS="$WEBROOTS $d"
done

if [ -n "$WEBROOTS" ]; then
  # Kuerzlich geaenderte PHP-Dateien
  recent=$(find $WEBROOTS -name '*.php' -mtime -7 -type f 2>/dev/null | head -40)
  if [ -n "$recent" ]; then
    n=$(printf '%s\n' "$recent" | wc -l | tr -d ' ')
    warn "$n PHP-Datei(en) wurden in den letzten 7 Tagen geaendert oder neu angelegt."
    printf '%s\n' "$recent" | head -15 | sed 's/^/             /'
    todo "Abgleichen, ob das zu einem geplanten Deployment oder Update passt."
  else
    ok "Keine PHP-Dateien in den letzten 7 Tagen veraendert."
  fi

  # Typische Webshell-Muster
  shells=$(grep -rlE '(eval|assert|system|passthru|shell_exec|popen|proc_open)\s*\(\s*(\$_(GET|POST|REQUEST|COOKIE)|base64_decode|gzinflate)' $WEBROOTS --include='*.php' 2>/dev/null | head -20)
  if [ -n "$shells" ]; then
    crit "Moegliche Webshell-Muster gefunden (Ausfuehrung von Code aus Request-Parametern):"
    printf '%s\n' "$shells" | sed 's/^/             /'
    todo "Jede Datei einzeln pruefen. Legitime Frameworks nutzen diese Muster selten so."
    todo "Bei Bestaetigung: Server vom Netz nehmen und aus sauberem Backup neu aufsetzen - Patchen reicht dann nicht."
  else
    ok "Keine offensichtlichen Webshell-Muster im Web-Root gefunden."
  fi

  # Ausfuehrbare Dateien an ungewoehnlicher Stelle
  uploads=$(find $WEBROOTS -path '*upload*' \( -name '*.php' -o -name '*.phtml' \) -type f 2>/dev/null | head -10)
  if [ -n "$uploads" ]; then
    crit "PHP-Dateien in einem Upload-Verzeichnis gefunden - klassischer Webshell-Ablageort:"
    printf '%s\n' "$uploads" | sed 's/^/             /'
    todo "Upload-Verzeichnisse serverseitig von der PHP-Ausfuehrung ausschliessen."
  fi
else
  info "Kein Standard-Web-Root gefunden - Dateipruefungen uebersprungen."
fi

# Verdaechtige Kindprozesse des Webservers
if command -v ps >/dev/null 2>&1; then
  sus=$(ps -eo user,pid,ppid,comm,args 2>/dev/null | grep -E '^(www-data|apache|nginx|http|nobody|daemon)' | grep -E '(curl|wget|nc |ncat|bash -i|sh -i|python -c|perl -e)' | grep -v grep | head -10)
  if [ -n "$sus" ]; then
    crit "Der Webserver-Benutzer fuehrt gerade Download- oder Shell-Werkzeuge aus:"
    printf '%s\n' "$sus" | sed 's/^/             /'
    todo "Das ist laut BSI ein starker Hinweis auf eine aktive Kompromittierung. Sofort pruefen."
  else
    ok "Keine verdaechtigen Kindprozesse des Webservers."
  fi
fi

# Access-Logs auf die vom BSI genannten Muster pruefen
LOGS=$(ls /var/log/nginx/access.log /var/log/apache2/access.log /var/log/httpd/access_log 2>/dev/null | head -3)
if [ -n "$LOGS" ] && [ -r "$(printf '%s' "$LOGS" | head -1)" ]; then
  up=$(grep -c 'PHP_SESSION_UPLOAD_PROGRESS' $LOGS 2>/dev/null | awk -F: '{s+=$NF} END {print s+0}')
  if [ "${up:-0}" -gt 0 ] 2>/dev/null; then
    crit "$up Request(s) mit PHP_SESSION_UPLOAD_PROGRESS in den Access-Logs."
    todo "Amazon Threat Intelligence nennt genau dieses Muster als Ausnutzungsversuch. Logs und Zeitraum sichern."
  else
    ok "Keine PHP_SESSION_UPLOAD_PROGRESS-Requests in den gepruefen Logs."
  fi

  err500=$(awk '$9 == 500' $LOGS 2>/dev/null | wc -l | tr -d ' ')
  if [ "${err500:-0}" -gt 50 ] 2>/dev/null; then
    warn "$err500 HTTP-500-Antworten in den Logs. Gehaeufte Speicherfehler koennen auf Ausnutzungsversuche hindeuten."
    todo "Zeitliche Verteilung und ausloesende IPs pruefen."
  fi
else
  info "Access-Logs nicht lesbar - fuer diese Pruefung als root ausfuehren."
fi

# ---------------------------------------------------------------------------
section "6. Zusaetzliche Haertung"
# ---------------------------------------------------------------------------

if command -v getenforce >/dev/null 2>&1; then
  se=$(getenforce 2>/dev/null)
  [ "$se" = "Enforcing" ] && ok "SELinux ist aktiv (Enforcing)." || { warn "SELinux ist auf '$se'."; todo "Das BSI empfiehlt SELinux/AppArmor, um die Folgen einer RCE zu begrenzen."; }
elif command -v aa-status >/dev/null 2>&1; then
  if aa-status --enabled 2>/dev/null; then ok "AppArmor ist aktiv."; else warn "AppArmor ist nicht aktiv."; todo "Das BSI empfiehlt SELinux/AppArmor zur Begrenzung von RCE-Folgen."; fi
else
  info "Weder SELinux noch AppArmor gefunden."
  todo "Das BSI empfiehlt ausdruecklich eines von beiden zu konfigurieren."
fi

if command -v ufw >/dev/null 2>&1 && ufw status 2>/dev/null | grep -q "Status: active"; then
  ok "ufw-Firewall ist aktiv."
elif command -v firewall-cmd >/dev/null 2>&1 && firewall-cmd --state 2>/dev/null | grep -q running; then
  ok "firewalld ist aktiv."
else
  info "Keine aktive Host-Firewall erkannt."
fi

if command -v fail2ban-client >/dev/null 2>&1; then ok "fail2ban ist installiert."; else info "fail2ban ist nicht installiert."; todo "Bremst automatisierte Scans und Brute-Force-Versuche deutlich aus."; fi

# Unbeaufsichtigte Sicherheitsupdates
if [ -f /etc/apt/apt.conf.d/20auto-upgrades ] && grep -q '"1"' /etc/apt/apt.conf.d/20auto-upgrades 2>/dev/null; then
  ok "Automatische Sicherheitsupdates sind konfiguriert."
elif command -v dnf-automatic >/dev/null 2>&1; then
  ok "dnf-automatic ist vorhanden."
else
  warn "Keine automatischen Sicherheitsupdates erkannt."
  todo "Debian/Ubuntu: unattended-upgrades einrichten. Das haette den PHP2Shell-Patch von allein geholt."
fi

# ---------------------------------------------------------------------------
printf '\n%s%s== Zusammenfassung ==%s\n' "$C_B" "$C_BLU" "$C_0"
printf '  %sKritisch: %d%s   %sWarnungen: %d%s   %sOK: %d%s   %sHinweise: %d%s\n' \
  "$C_RED" "$CRIT" "$C_0" "$C_YEL" "$WARN" "$C_0" "$C_GRN" "$OKAY" "$C_0" "$C_DIM" "$INFO" "$C_0"

if [ "$CRIT" -gt 0 ]; then
  printf '\n  %sEs gibt kritische Funde. Diese zuerst abarbeiten, bevor etwas anderes passiert.%s\n' "$C_RED$C_B" "$C_0"
elif [ "$WARN" -gt 0 ]; then
  printf '\n  %sKeine kritischen Funde, aber Handlungsbedarf bei den Warnungen.%s\n' "$C_YEL" "$C_0"
else
  printf '\n  %sKeine kritischen Funde. Sieht gut aus.%s\n' "$C_GRN" "$C_0"
fi

printf '\n  %sQuelle PHP2Shell: BSI BITS-H 2026-297981-1232 v1.2 (TLP:CLEAR)%s\n' "$C_DIM" "$C_0"
printf '  %sFragen zum Ergebnis: https://boch-solutions.de/sicherheits-check%s\n\n' "$C_DIM" "$C_0"

exit "$EXIT_CODE"
