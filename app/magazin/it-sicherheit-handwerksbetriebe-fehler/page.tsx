import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/sections/article-layout";
import { getArticleBySlug } from "@/lib/articles";

const article = getArticleBySlug("it-sicherheit-handwerksbetriebe-fehler")!;

export const metadata: Metadata = {
  title: article.title,
  description: article.excerpt,
  alternates: { canonical: `/magazin/${article.slug}` },
};

export default function ArticlePage() {
  return (
    <ArticleLayout article={article}>
      <p>
        <strong>Kurz gesagt:</strong> Handwerksbetriebe geraten zunehmend ins Visier von
        Cyberkriminellen – nicht weil sie besonders interessant wären, sondern weil ihre IT oft
        ungesichert und historisch gewachsen ist. Die folgenden fünf Fehler sehen wir in der Praxis
        immer wieder, zusammen mit dem, was tatsächlich dagegen hilft.
      </p>

      <h2>1. Kein Backup – oder eines, das nie getestet wurde</h2>
      <p>
        Viele Betriebe glauben, ein Backup zu haben, weil Dateien „irgendwo auch noch&rdquo; auf einer
        externen Festplatte liegen. Im Ernstfall zeigt sich dann oft: Das Backup ist Monate alt, deckt
        nicht alle wichtigen Daten ab oder lässt sich gar nicht mehr einspielen. Eine automatisierte,
        regelmäßig geprüfte Sicherung in der Cloud (z. B. über Microsoft 365) schließt diese Lücke
        zuverlässiger als manuelle Kopien.
      </p>

      <h2>2. Ein gemeinsames Passwort für mehrere Konten</h2>
      <p>
        Aus Bequemlichkeit teilen sich Mitarbeitende oft ein Postfach oder ein Passwort für mehrere
        Dienste. Wird ein solches Passwort kompromittiert, sind gleich mehrere Systeme betroffen – und
        niemand kann im Nachhinein nachvollziehen, wer wann worauf zugegriffen hat. Einzelne Konten pro
        Person plus Mehrfaktor-Authentifizierung verhindern genau dieses Szenario.
      </p>

      <h2>3. Keine Mehrfaktor-Authentifizierung</h2>
      <p>
        Ein gestohlenes oder erratenes Passwort reicht bei den meisten Handwerksbetrieben aktuell aus,
        um vollen Zugriff auf E-Mail-Konto oder Dateien zu erhalten. Mehrfaktor-Authentifizierung
        (zusätzlicher Code per App oder SMS) ist eine der wirksamsten Einzelmaßnahmen gegen genau diesen
        Angriffsweg – und in Microsoft 365 mit wenig Aufwand einzurichten.
      </p>

      <h2>4. Mitarbeitende, die Phishing-Mails nicht erkennen</h2>
      <p>
        Gefälschte Rechnungen, angebliche Paketbenachrichtigungen oder E-Mails, die scheinbar vom Chef
        kommen: Phishing-Versuche werden zunehmend überzeugender. Technische Maßnahmen wie
        Spam- und Phishing-Filter (z. B. Microsoft Defender) fangen einen Großteil ab – der Rest hängt
        davon ab, ob Mitarbeitende verdächtige Nachrichten erkennen. Eine kurze, regelmäßige
        Sensibilisierung des Teams ist günstiger als jeder Vorfall, den sie verhindert.
      </p>

      <h2>5. Software und Systeme, die nicht aktualisiert werden</h2>
      <p>
        Veraltete Betriebssysteme und Programme enthalten bekannte Sicherheitslücken, für die es längst
        Updates gäbe – sie werden nur nicht eingespielt, weil niemand im Betrieb dafür zuständig ist.
        Automatische Updates und eine laufende technische Betreuung schließen diese Lücken, bevor sie
        zum Problem werden.
      </p>

      <h2>Was das für Ihren Betrieb bedeutet</h2>
      <p>
        Keiner dieser Punkte erfordert eine komplette Neuaufstellung der IT. Die meisten lassen sich im
        Rahmen einer Microsoft-365-Einrichtung direkt mitlösen – Backup, Mehrfaktor-Authentifizierung
        und Defender sind dort bereits angelegt und müssen nur aktiviert und richtig konfiguriert
        werden. Mehr dazu auf unserer Leistungsseite zu{" "}
        <Link href="/leistungen/cloud-sicherheit-dsgvo" className="underline hover:text-foreground">
          Cloud-Sicherheit &amp; DSGVO
        </Link>
        .
      </p>
    </ArticleLayout>
  );
}
