import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/sections/article-layout";
import { getArticleBySlug } from "@/lib/articles";

const article = getArticleBySlug("handwerksbetrieb-modernisieren")!;

export const metadata: Metadata = {
  title: { absolute: article.seoTitle },
  description: article.metaDescription,
  alternates: { canonical: `/magazin/${article.slug}` },
};

export default function ArticlePage() {
  return (
    <ArticleLayout article={article}>
      <p>
        <strong>Kurz gesagt:</strong> Ein Handwerksunternehmen zu modernisieren klingt nach einem
        riesigen, unübersichtlichen Projekt. Tatsächlich lässt es sich in fünf klar abgrenzbare Schritte
        aufteilen, die aufeinander aufbauen: IT-Grundlage, Kommunikation, Sichtbarkeit bei Google,
        automatisierte Prozesse und Absicherung. Wer diese Reihenfolge einhält, sieht nach wenigen
        Wochen die ersten Effekte und nach einem halben Jahr einen spürbar anderen Betrieb.
      </p>

      <h2>Warum &bdquo;Modernisierung&ldquo; mehr als eine neue Website bedeutet</h2>
      <p>
        Die meisten Anfragen, die uns erreichen, beginnen mit einem einzelnen Symptom: eine veraltete
        Website, eine Telefonanlage, die bald abgeschaltet wird, oder ein Postfach, das ständig volle
        Spam-Filter hat. Das eigentliche Problem liegt aber selten an einer einzelnen Stelle, sondern
        daran, dass IT, Kommunikation und Außendarstellung über Jahre getrennt voneinander gewachsen
        sind – ein privates Postfach hier, ein Baukasten-Website dort, eine ISDN-Anlage, die niemand
        angefasst hat, seit sie installiert wurde. Modernisierung bedeutet, diese Teile wieder
        zusammenzuführen, und zwar in einer Reihenfolge, die aufeinander aufbaut statt sich zu
        widersprechen.
      </p>

      <h2>Schritt 1: Die IT-Grundlage – E-Mail-Sicherheit und Microsoft 365</h2>
      <p>
        Jede Modernisierung beginnt an der Stelle, die am wenigsten sichtbar, aber am wichtigsten ist:
        der IT-Grundlage. Dazu gehört zuerst die Absicherung der Firmen-E-Mail gegen gefälschte
        Absender, danach eine gemeinsame{" "}
        <Link href="/leistungen/microsoft-365-azure" className="underline hover:text-foreground">
          Microsoft-365-Basis
        </Link>{" "}
        statt einzelner Insellösungen für Postfach, Dateiablage und Kalender. Ohne dieses Fundament
        bauen alle folgenden Schritte auf wackligem Boden: Eine neue Website bringt wenig, wenn
        Kundenanfragen weiterhin in einem unsicheren Postfach versickern.
      </p>

      <h2>Schritt 2: Kommunikation, die mitläuft – Teams-Telefonie statt ISDN</h2>
      <p>
        Viele Betriebe arbeiten noch mit einer analogen oder ISDN-basierten Telefonanlage, die
        bundesweit schrittweise abgeschaltet wird. Eine moderne{" "}
        <Link href="/leistungen/teams-telefonie" className="underline hover:text-foreground">
          Teams-Telefonie
        </Link>{" "}
        legt die Festnetznummer auf PC, Smartphone und optional Tischtelefon gleichzeitig – erreichbar
        im Büro wie auf der Baustelle, mit Anrufliste statt Zettelwirtschaft am Empfang. Dieser Schritt
        gehört bewusst vor die Website, weil eine neue Website ohne verlässliche Erreichbarkeit am
        anderen Ende mehr Anfragen verschenkt, als sie einbringt.
      </p>

      <h2>Schritt 3: Online gefunden werden – Website, lokales SEO und GEO</h2>
      <p>
        Erst wenn IT und Kommunikation stehen, lohnt sich die Investition in{" "}
        <Link href="/leistungen/webdesign" className="underline hover:text-foreground">
          eine Website
        </Link>
        , die tatsächlich Anfragen einbringt. Dazu gehört eine eigene Unterseite je Leistung statt einer
        einzigen Übersichtsseite, ein vollständiges und gepflegtes{" "}
        <Link href="/leistungen/google-unternehmensprofil" className="underline hover:text-foreground">
          Google-Unternehmensprofil
        </Link>{" "}
        und{" "}
        <Link href="/leistungen/seo-geo-optimierung" className="underline hover:text-foreground">
          lokales SEO sowie GEO-Optimierung
        </Link>
        , damit Sie nicht nur bei klassischen Google-Suchen, sondern auch dann auftauchen, wenn jemand
        eine KI-Antwortmaschine nach dem passenden Betrieb in der Region fragt. Mehr zu den
        Grundlagen steht im Beitrag zum{" "}
        <Link href="/magazin/lokales-seo-handwerksbetriebe" className="underline hover:text-foreground">
          lokalen SEO für Handwerksbetriebe
        </Link>
        .
      </p>

      <h2>Schritt 4: Prozesse, die sich von selbst erledigen</h2>
      <p>
        Mit stabiler IT, Kommunikation und Sichtbarkeit lohnt sich der Blick auf wiederkehrende
        Büroarbeit: eingehende Anfragen automatisch erfassen, Erinnerungen für offene Angebote,
        eine zentrale Dokumentenablage statt verteilter Dateien auf drei Geräten. Wie das konkret
        aussieht, steht im Beitrag zur{" "}
        <Link href="/magazin/digitalisierung-handwerk-zeit-sparen" className="underline hover:text-foreground">
          Digitalisierung im Handwerk
        </Link>
        . Technisch dahinter steckt meist{" "}
        <Link href="/leistungen/prozessautomatisierung" className="underline hover:text-foreground">
          Prozessautomatisierung
        </Link>{" "}
        mit Microsoft Power Automate, bei umfangreicheren Abläufen auch{" "}
        <Link href="/leistungen/individuelle-software" className="underline hover:text-foreground">
          individuelle Software
        </Link>
        .
      </p>

      <h2>Schritt 5: Absichern, was Sie aufgebaut haben</h2>
      <p>
        Je digitaler ein Betrieb arbeitet, desto wichtiger wird die Absicherung: Zugriffsrechte, Backups,
        DSGVO-konforme Datenhaltung und ein Plan für den Fall, dass ein Laptop gestohlen wird oder
        ausfällt. Das ist kein nachträglicher Punkt, sondern Teil der Modernisierung selbst – mehr dazu
        bei{" "}
        <Link href="/leistungen/cloud-sicherheit-dsgvo" className="underline hover:text-foreground">
          Cloud-Sicherheit &amp; DSGVO
        </Link>
        .
      </p>

      <h2>Fördermittel nutzen, bevor Sie beauftragen</h2>
      <p>
        Für viele der genannten Schritte gibt es Digitalisierungsförderung – Beratungsförderung,
        Investitionszuschüsse oder zinsgünstige Kredite. Entscheidend ist die Reihenfolge: Der Antrag
        muss vor der verbindlichen Beauftragung gestellt sein, sonst entfällt die Förderung komplett.
        Details dazu im Beitrag zur{" "}
        <Link href="/magazin/foerderung-digitalisierung-handwerk" className="underline hover:text-foreground">
          Digitalisierungsförderung im Handwerk
        </Link>
        .
      </p>

      <h2>Wo Sie konkret anfangen</h2>
      <p>
        Statt alle fünf Schritte gleichzeitig anzugehen, lohnt sich ein ehrlicher Blick auf den
        Ist-Zustand. Unsere vier kostenlosen Checks (IT-Check, Website-Check, E-Mail-Sicherheits-Check
        und Sicherheits-Check) zeigen in wenigen Minuten, wo Ihr Betrieb tatsächlich steht, und welcher
        der fünf Schritte bei Ihnen am dringendsten ist. Darauf aufbauend lässt sich der Fahrplan
        modular umsetzen – Schritt für Schritt, ohne dass der Betrieb währenddessen stillsteht.
      </p>
    </ArticleLayout>
  );
}
