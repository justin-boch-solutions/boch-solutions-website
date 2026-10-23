import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/hero";
import { Section } from "@/components/sections/section";
import { CtaSection } from "@/components/sections/cta-section";
import { SicherheitsCheckForm } from "@/components/sections/sicherheits-check-form";
import { BreadcrumbJsonLd, FaqJsonLd, ServiceJsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { company } from "@/lib/constants";
import { PHP2SHELL } from "@/lib/website-security/cve-data";
import { sicherheitsCheckFaq } from "./faq";

const PFAD = "/sicherheits-check";
const URL = `${company.url}${PFAD}`;
const ARTIKEL = "/magazin/php2shell-sicherheitsluecke-webseite";

export const metadata: Metadata = {
  title: "Sicherheits-Check: Website kostenlos auf Sicherheitslücken prüfen",
  description:
    "Kostenlos prüfen, ob Ihre Website von der kritischen PHP-Lücke php2shell (CVE-2026-109618 / CVE-2026-109619) betroffen ist – dazu Check auf offene .env-Dateien, fehlende Sicherheits-Header, TLS-Fehler und Node.js-Schwachstellen. Mit konkreten Handlungsschritten.",
  keywords: [
    "Website auf Sicherheitslücken prüfen",
    "PHP Sicherheitslücke prüfen",
    "php2shell Test",
    "CVE-2026-109618",
    "CVE-2026-109619",
    "PHP Version prüfen Sicherheit",
    "Website Sicherheitscheck kostenlos",
    "Node.js Schwachstellen scannen",
    "Security Header prüfen",
    "BSI PHP Warnung",
  ],
  alternates: { canonical: PFAD },
  openGraph: {
    type: "website",
    url: URL,
    locale: "de_DE",
    title: "Kostenloser Sicherheits-Check für Ihre Website",
    description:
      "Ist Ihre Seite von php2shell betroffen? In 30 Sekunden prüfen – mit Handlungsempfehlungen nach BSI-Vorgabe.",
  },
};

const PRUEFUNGEN = [
  {
    titel: "php2shell (CVE-2026-109618 / 109619)",
    text: "Erkennt die eingesetzte PHP-Version und gleicht sie gegen die gepatchten Stände 8.5.12, 8.4.27, 8.3.36 und 8.2.35 ab. Auch End-of-Life-Versionen werden erkannt.",
  },
  {
    titel: "Offenliegende Konfigurationsdateien",
    text: "Prüft, ob .env, .git/config, composer.lock, Backup-Dateien oder Laravel-Logs öffentlich abrufbar sind – die häufigste Ursache für geleakte Datenbank-Passwörter.",
  },
  {
    titel: "Sicherheits-Header",
    text: "Content-Security-Policy, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy und Permissions-Policy, inklusive Bewertung zu schwacher Konfigurationen.",
  },
  {
    titel: "Verschlüsselung und Zertifikat",
    text: "Gültigkeit und Restlaufzeit des TLS-Zertifikats, Weiterleitung von HTTP auf HTTPS und unverschlüsselt eingebundene Inhalte.",
  },
  {
    titel: "Cookies",
    text: "Prüft Session-Cookies auf die Flags Secure, HttpOnly und SameSite. Fehlen sie, lässt sich eine Sitzung übernehmen.",
  },
  {
    titel: "Technik-Leaks",
    text: "Server- und Framework-Versionen im Klartext, aktive Verzeichnisauflistung, erreichbare phpinfo-Seiten und offenes Apache mod_status.",
  },
  {
    titel: "Node.js und Abhängigkeiten",
    text: "Erkennt Express- und Node.js-Signaturen. Das Selbstcheck-Skript prüft zusätzlich die Node-Version auf End-of-Life und lässt npm audit sowie composer audit laufen.",
  },
  {
    titel: "Organisatorisches",
    text: "Ist eine security.txt nach RFC 9116 hinterlegt? Ohne sie wissen Sicherheitsforscher nicht, wem sie einen Fund melden sollen.",
  },
];

export default function SicherheitsCheckPage() {
  return (
    <>
      <ServiceJsonLd
        name="Website-Sicherheits-Check"
        description="Kostenloser Online-Check auf die PHP-Schwachstellen php2shell (CVE-2026-109618, CVE-2026-109619), offenliegende Konfigurationsdateien, fehlende Sicherheits-Header und TLS-Fehler."
        url={URL}
      />
      <FaqJsonLd faq={sicherheitsCheckFaq} />
      <BreadcrumbJsonLd
        items={[
          { name: "Startseite", url: company.url },
          { name: "Sicherheits-Check", url: URL },
        ]}
      />

      <Hero
        eyebrow="BSI-Warnung aktiv · php2shell"
        title="Ist Ihre Website angreifbar?"
        subtitle="Das BSI warnt vor zwei kritischen PHP-Schwachstellen, über die Angreifer ohne Anmeldung Code auf Webservern ausführen können. Betroffen sind laut BSI alle PHP-Versionen zurück bis PHP 5 – und damit praktisch jede WordPress-, TYPO3- oder Shopware-Seite, die nicht gepatcht wurde. Dieser Check sagt Ihnen in einer halben Minute, wie Ihre Seite dasteht."
        size="compact"
      />

      <Section>
        <div className="mx-auto max-w-3xl">
          <SicherheitsCheckForm />
        </div>
      </Section>

      <Section
        className="border-t border-border bg-surface/30"
        eyebrow="Hintergrund"
        title="Worum es bei php2shell geht"
        subtitle="Ein Angriff erfordert weder Zugangsdaten noch eine Aktion des Nutzers. Proof-of-Concepts sind öffentlich, und es gibt Berichte über automatisierte Ausnutzungsversuche."
      >
        <div className="mx-auto max-w-3xl">
          <dl className="grid gap-x-8 gap-y-5 rounded-2xl border border-border bg-surface p-8 sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-[0.12em] text-muted">Schwachstellen</dt>
              <dd className="mt-1 font-mono text-sm text-foreground">{PHP2SHELL.cves.join(" · ")}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.12em] text-muted">CVSS-Bewertung</dt>
              <dd className="mt-1 text-sm text-foreground">{PHP2SHELL.cvss} von 10 (kritisch)</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.12em] text-muted">BSI-Kritikalität</dt>
              <dd className="mt-1 text-sm text-foreground">{PHP2SHELL.bsiKritikalitaet}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.12em] text-muted">Gepatchte Versionen</dt>
              <dd className="mt-1 font-mono text-sm text-foreground">
                {Object.values(PHP2SHELL.fixedVersions).join(" · ")}
              </dd>
            </div>
          </dl>
          <p className="mt-6 text-center text-base leading-relaxed text-muted">
            Was das für Betriebe konkret bedeutet, welche Systeme betroffen sind und wie Sie prüfen, ob
            bereits etwas passiert ist, steht ausführlich im Artikel:{" "}
            <Link href={ARTIKEL} className="font-semibold text-foreground underline hover:text-accent">
              php2shell: Was Betriebe jetzt tun müssen
            </Link>
          </p>
        </div>
      </Section>

      <Section
        eyebrow="Umfang"
        title="Was der Check untersucht"
        subtitle="Alles, was sich seriös von außen feststellen lässt – ohne Ihre Seite anzugreifen."
        align="center"
      >
        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
          {PRUEFUNGEN.map((pruefung) => (
            <div key={pruefung.titel} className="rounded-xl border border-border bg-surface p-6">
              <h3 className="font-display font-bold text-foreground">{pruefung.titel}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{pruefung.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="selbstcheck" className="border-t border-border bg-surface/30">
        <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-surface p-8 sm:p-10">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground">
            Von außen ist nicht alles sichtbar
          </h2>
          <p className="mt-4 leading-relaxed text-muted">
            Die meisten Server verraten ihre PHP-Version nicht, und Linux-Distributionen patchen per
            Backport, ohne die Versionsnummer zu erhöhen. Der Online-Check kann deshalb oft nur sagen:
            hier läuft PHP. Ob es gepatcht ist, weiß nur der Server selbst.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            Dafür gibt es ein kostenloses Skript. Es läuft direkt auf Ihrem Server, liest nur und ändert
            nichts. Es prüft die echte PHP-Version, die vom BSI empfohlenen php.ini-Einstellungen, lässt{" "}
            <code className="rounded bg-surface-elevated px-1.5 py-0.5 font-mono text-sm text-foreground">
              composer audit
            </code>{" "}
            und{" "}
            <code className="rounded bg-surface-elevated px-1.5 py-0.5 font-mono text-sm text-foreground">
              npm audit
            </code>{" "}
            laufen und sucht nach den Anzeichen einer Kompromittierung, die das BSI nennt.
          </p>

          <div className="mt-6 overflow-x-auto rounded-xl border border-border-strong bg-surface-elevated p-4 font-mono text-sm text-foreground">
            <div className="text-muted"># auf dem Server ausführen</div>
            <div className="mt-1 break-all">
              curl -fsSL {company.url}/downloads/boch-selfcheck.sh -o boch-selfcheck.sh
            </div>
            <div className="mt-2 text-muted"># Inhalt kurz durchsehen, dann:</div>
            <div>sudo bash boch-selfcheck.sh</div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/downloads/boch-selfcheck.sh" size="lg">
              Skript herunterladen
            </Button>
            <Button href="/kontakt" variant="secondary" size="lg">
              Lieber machen lassen
            </Button>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted">
            Lesen Sie fremde Skripte immer erst durch, bevor Sie sie mit sudo ausführen. Dieses hier ist
            bewusst in lesbarem Bash geschrieben und kommentiert.
          </p>
        </div>
      </Section>

      <Section eyebrow="Fragen" title="Häufige Fragen">
        <div className="mx-auto max-w-3xl divide-y divide-border border-y border-border">
          {sicherheitsCheckFaq.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-medium text-foreground">
                <span>{item.question}</span>
                <span className="mt-1 shrink-0 text-muted transition group-open:rotate-45" aria-hidden>
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </Section>

      <CtaSection
        title="Funde gefunden, aber keine Zeit?"
        subtitle="Ich übernehme das Patchen, Härten und Absichern – und Sie bekommen anschließend einen sauberen Nachweis für Ihre Akten."
      />

      <Section className="py-10">
        <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-muted">
          Fachliche Grundlage zu php2shell: BSI-IT-Sicherheitshinweis BITS-H Nr. 2026-297981-1232,
          Version 1.2 vom 22.10.2026 (TLP:CLEAR), sowie die darin referenzierten Advisories des
          PHP-Projekts und von CERT-EU. Dieser Check ersetzt keinen vollständigen Penetrationstest.
        </p>
      </Section>
    </>
  );
}
