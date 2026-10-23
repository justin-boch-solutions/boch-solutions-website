export const sicherheitsCheckFaq = [
  {
    question: "Ist der Sicherheits-Check wirklich kostenlos?",
    answer:
      "Ja. Die Prüfung Ihrer Domain und der Bericht mit allen Handlungsempfehlungen kosten nichts und setzen keinen Vertrag voraus. Auch das Selbstcheck-Skript für Ihren Server ist frei nutzbar.",
  },
  {
    question: "Was ist php2shell und bin ich betroffen?",
    answer:
      "php2shell ist der Sammelname für zwei kritische Schwachstellen in PHP: CVE-2026-109618 und CVE-2026-109619, beide mit CVSS 9.2 bewertet. Sie erlauben es, ohne Anmeldung und ohne Zutun eines Nutzers beliebigen Code auf dem Webserver auszuführen. Laut dem BSI sind alle PHP-Versionen zurück bis mindestens PHP 5 betroffen. Betroffen ist damit praktisch jede Website auf WordPress, TYPO3, Joomla, Drupal, Shopware oder Nextcloud, solange nicht gepatcht wurde.",
  },
  {
    question: "Welche PHP-Version brauche ich, um geschützt zu sein?",
    answer:
      "Gepatcht sind PHP 8.5.12, 8.4.27, 8.3.36 und 8.2.35. Für die bereits abgekündigten Versionen 8.1, 8.0 und 7.4 hat das PHP Security Team ausnahmsweise Backport-Patches bereitgestellt. Wichtig: Linux-Distributionen wie Debian, Ubuntu oder RHEL patchen per Backport und lassen die Versionsnummer dabei oft unverändert. Eine ältere Nummer bedeutet dort nicht automatisch, dass Ihr Server ungeschützt ist.",
  },
  {
    question: "Wird meine Website bei der Prüfung angegriffen?",
    answer:
      "Nein. Der Check ruft Ihre Startseite und eine Handvoll Standardpfade ganz normal auf und wertet die Antworten aus. Es werden keine Schwachstellen ausgenutzt, keine Formulare abgeschickt und keine Daten verändert. Die Last entspricht etwa einem Dutzend gewöhnlicher Seitenaufrufe.",
  },
  {
    question: "Warum kann der Online-Check meinen PHP-Patchstand nicht sicher bestimmen?",
    answer:
      "Die meisten Server verraten ihre PHP-Version gar nicht oder nur ungenau, und Distributionen patchen per Backport ohne die Versionsnummer zu erhöhen. Von außen lässt sich deshalb oft nur feststellen, dass PHP im Einsatz ist. Für eine belastbare Aussage gibt es das kostenlose Selbstcheck-Skript, das direkt auf Ihrem Server läuft und zusätzlich die vom BSI empfohlenen php.ini-Einstellungen prüft.",
  },
  {
    question: "Was prüft der Check außer php2shell noch?",
    answer:
      "Unter anderem: offenliegende .env-Dateien und Git-Verzeichnisse, erreichbare phpinfo-Seiten, Backup-Dateien mit Zugangsdaten, fehlende Sicherheits-Header wie CSP und HSTS, unsichere Cookie-Einstellungen, abgelaufene oder fehlerhafte TLS-Zertifikate, fehlende HTTPS-Weiterleitung, unverschlüsselt eingebundene Inhalte, aktive Verzeichnisauflistung sowie Versions-Leaks von Server und Framework.",
  },
  {
    question: "Darf ich fremde Domains prüfen lassen?",
    answer:
      "Nur mit Erlaubnis des Betreibers. Vor dem Start bestätigen Sie, dass Sie Betreiber sind oder die Erlaubnis haben. Auch wenn die Prüfung technisch harmlos ist, bleibt das Abklopfen fremder Systeme ohne Einverständnis rechtlich heikel.",
  },
  {
    question: "Was mache ich, wenn ein kritischer Fund angezeigt wird?",
    answer:
      "Zuerst patchen beziehungsweise die betroffene Datei entfernen. Danach prüfen, ob bereits etwas passiert ist: ungewöhnliche Prozesse des Webservers, neu angelegte PHP-Dateien, auffällige Einträge in den Access-Logs. Wenn Zugangsdaten offen im Netz standen, müssen sie als kompromittiert gelten und erneuert werden. Bei konkreten Anzeichen einer Kompromittierung hilft Patchen allein nicht mehr, dann ist eine Neuaufsetzung aus einem sauberen Backup nötig.",
  },
];
