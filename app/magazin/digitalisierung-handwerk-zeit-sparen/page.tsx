import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/sections/article-layout";
import { getArticleBySlug } from "@/lib/articles";

const article = getArticleBySlug("digitalisierung-handwerk-zeit-sparen")!;

export const metadata: Metadata = {
  title: article.title,
  description: article.excerpt,
  alternates: { canonical: `/magazin/${article.slug}` },
};

export default function ArticlePage() {
  return (
    <ArticleLayout article={article}>
      <p>
        <strong>Kurz gesagt:</strong> „Digitalisierung&rdquo; klingt nach einem großen, unübersichtlichen
        Projekt. In der Praxis sparen meist drei gezielte Schritte im Büroalltag mit Abstand die meiste
        Zeit – ohne dass dafür der ganze Betrieb umgekrempelt werden muss.
      </p>

      <h2>Schritt 1: Anfragen automatisch erfassen statt manuell übertragen</h2>
      <p>
        In vielen Betrieben kommen Anfragen über Telefon, E-Mail und Kontaktformular an drei
        verschiedenen Stellen an und werden von Hand in Kalender, Auftragsliste oder Notizbuch
        übertragen. Eine automatische Weiterleitung und Kategorisierung eingehender Anfragen – etwa mit
        Microsoft Power Automate – übernimmt diesen Schritt und reduziert Übertragungsfehler gleich mit.
      </p>

      <h2>Schritt 2: Wiederkehrende Erinnerungen automatisieren</h2>
      <p>
        Terminerinnerungen, Nachfassen bei offenen Angeboten oder Hinweise auf anstehende
        Wartungsintervalle sind wichtig, kosten im manuellen Alltag aber ständig kleine Zeitfenster.
        Automatisierte Erinnerungen laufen im Hintergrund mit und sorgen dafür, dass nichts vergessen
        wird, ohne dass jemand täglich eine Liste durchgehen muss.
      </p>

      <h2>Schritt 3: Dokumente an einem Ort statt auf drei Geräten</h2>
      <p>
        Aufmaße, Angebote und Rechnungen landen häufig verteilt auf unterschiedlichen Laptops,
        Handys oder in E-Mail-Anhängen. Eine zentrale, automatisierte Ablage in der richtigen
        Ordnerstruktur (z. B. über Microsoft 365) macht Dokumente für alle Berechtigten sofort auffindbar
        – auch von der Baustelle aus.
      </p>

      <h2>Warum diese Reihenfolge sinnvoll ist</h2>
      <p>
        Alle drei Schritte lassen sich unabhängig voneinander einführen, bauen aber aufeinander auf:
        Ohne saubere Anfragenerfassung gibt es nichts, woran Erinnerungen anknüpfen könnten; ohne
        zentrale Ablage landen automatisierte Dokumente wieder im selben Durcheinander wie vorher. Wer
        klein anfängt und Schritt für Schritt erweitert, sieht schneller einen spürbaren Effekt als bei
        einem großen „Alles auf einmal&rdquo;-Projekt.
      </p>
      <p>
        Mehr dazu auf unseren Leistungsseiten zu{" "}
        <Link href="/leistungen/prozessautomatisierung" className="underline hover:text-foreground">
          Prozessautomatisierung
        </Link>{" "}
        und{" "}
        <Link href="/leistungen/individuelle-software" className="underline hover:text-foreground">
          Individuelle Softwarelösungen
        </Link>
        .
      </p>
    </ArticleLayout>
  );
}
