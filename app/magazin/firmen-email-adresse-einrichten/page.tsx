import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/sections/article-layout";
import { getArticleBySlug } from "@/lib/articles";
import { formatEuro, pricing } from "@/lib/constants";

const article = getArticleBySlug("firmen-email-adresse-einrichten")!;

export const metadata: Metadata = {
  title: { absolute: article.seoTitle },
  description: article.metaDescription,
  alternates: { canonical: `/magazin/${article.slug}` },
};

export default function ArticlePage() {
  return (
    <ArticleLayout article={article}>
      <p>
        <strong>Kurz gesagt:</strong> Eine E-Mail-Adresse auf der eigenen Domain kostet wenige Euro im
        Monat und ist in einer Stunde eingerichtet. Entscheidend sind aber drei DNS-Einträge, die fast
        überall fehlen – und ohne die Ihre Angebote im Spam-Ordner landen und Fremde in Ihrem Namen
        Rechnungen verschicken können.
      </p>

      <h2>Warum ein GMX- oder T-Online-Postfach im Betrieb ein Problem ist</h2>
      <p>
        Viele Betriebe arbeiten jahrelang mit einer privaten Adresse weiter, weil es funktioniert.
        Drei Gründe sprechen dagegen, und keiner davon ist Eitelkeit.
      </p>
      <p>
        <strong>Die Adresse gehört Ihnen nicht.</strong> Scheidet der Mitarbeiter aus, auf dessen Namen
        das Postfach läuft, ist der gesamte Schriftverkehr weg – inklusive Angeboten, Terminen und
        Gewährleistungsfällen. Bei einer Adresse auf Ihrer Domain legen Sie sie einfach still und
        leiten sie weiter.
      </p>
      <p>
        <strong>Sie wirkt im Vergleich schwächer.</strong> Wer bei drei Betrieben anfragt und von
        einem eine Antwort mit Firmendomain bekommt, von den anderen aus privaten Postfächern, zieht
        daraus Schlüsse – zu Recht oder nicht.
      </p>
      <p>
        <strong>Sie lässt sich nicht absichern.</strong> Die unten beschriebenen Schutzmechanismen
        funktionieren nur auf einer eigenen Domain. Bei einem Freemail-Postfach haben Sie diese
        Möglichkeit nicht.
      </p>

      <h2>Was es kostet</h2>
      <p>
        Die Domain selbst liegt bei wenigen Euro im Jahr. Für die Postfächer gibt es im Wesentlichen
        zwei Wege: ein einfaches Mailpaket beim Hoster für ein bis drei Euro pro Postfach und Monat,
        oder Microsoft 365, bei dem neben der E-Mail auch Dateiablage, Teams und die Office-Programme
        enthalten sind.
      </p>
      <p>
        Die einmalige Einrichtung von Domain und geschäftlichen Adressen liegt bei uns zwischen{" "}
        {formatEuro(pricing.emailDomainSetup[0])} und {formatEuro(pricing.emailDomainSetup[1])}; die
        Einrichtung auf den Endgeräten wird pro Gerät berechnet, weil der Aufwand daran hängt und
        nicht an der Zahl der Mitarbeitenden.
      </p>

      <h2>Die drei Einträge, über die niemand spricht</h2>
      <p>
        Hier scheitern die meisten Einrichtungen – nicht am Postfach, sondern an der Absicherung. Es
        geht um drei öffentliche Einträge im DNS Ihrer Domain.
      </p>
      <p>
        <strong>SPF</strong> legt fest, welche Server in Ihrem Namen E-Mails verschicken dürfen. Fehlt
        er, kann jeder eine Mail mit Ihrer Firmenadresse als Absender verschicken – zum Beispiel eine
        Rechnung an Ihre Kundschaft mit fremder Bankverbindung.
      </p>
      <p>
        <strong>DKIM</strong> versieht Ihre Mails mit einer digitalen Signatur, an der Empfänger
        erkennen, dass die Nachricht echt und unverändert ist. Ohne Signatur sinkt die
        Zustellwahrscheinlichkeit messbar: Ihre Angebote landen häufiger im Spam-Ordner, und Sie
        erfahren nie davon.
      </p>
      <p>
        <strong>DMARC</strong> sagt den Empfängern, was mit gefälschten Mails in Ihrem Namen passieren
        soll, und liefert Ihnen Berichte über Missbrauchsversuche.
      </p>

      <h2>Der häufigste Zustand in der Praxis</h2>
      <p>
        Besonders tückisch ist ein DMARC-Eintrag mit der Einstellung „beobachten&rdquo;. Von außen
        sieht die Einrichtung vollständig aus, tatsächlich wird aber nichts blockiert: Gefälschte
        Mails in Ihrem Namen werden weiterhin ganz normal zugestellt. Noch unauffälliger ist eine
        begonnene, nie fertiggestellte DKIM-Einrichtung – der Verweis steht, der Schlüssel dahinter
        existiert nicht, und niemand prüft das jemals nach.
      </p>
      <p>
        Wer Microsoft 365 nutzt, hat DKIM übrigens bereits bezahlt. Es ist im Paket enthalten und muss
        im Admin-Center nur aktiviert werden – in sehr vielen Betrieben ist das nie geschehen.
      </p>

      <h2>Warum man DMARC nicht sofort scharf stellt</h2>
      <p>
        Wer direkt auf die strengste Stufe springt, riskiert, dass legitime Mails lautlos verschwinden
        – vom Lohnbüro, aus der Handwerkersoftware, vom Scanner im Büro. Der saubere Weg führt über
        zwei bis vier Wochen Beobachtung: erst Berichte sammeln, alle berechtigten Absender erfassen,
        dann schrittweise verschärfen. Dieser Zwischenschritt ist der Grund, warum eine ordentliche
        Einrichtung nicht an einem Nachmittag erledigt ist.
      </p>

      <h2>Wie Sie Ihren eigenen Stand prüfen</h2>
      <p>
        Alle drei Einträge sind öffentlich abrufbar – jeder kann sie für jede Domain nachsehen, auch
        Ihre Mitbewerber. Mit unserem{" "}
        <Link href="/email-check" className="underline hover:text-foreground">
          kostenlosen E-Mail-Sicherheits-Check
        </Link>{" "}
        sehen Sie in wenigen Sekunden, wie Ihre Domain dasteht. Geprüft werden ausschließlich
        öffentliche DNS-Einträge, es gibt keinen Zugriff auf Ihr Postfach.
      </p>
      <p>
        Mehr zur Einrichtung finden Sie auf unseren Seiten zu{" "}
        <Link href="/leistungen/email-optimierung" className="underline hover:text-foreground">
          E-Mail-Optimierung
        </Link>{" "}
        und{" "}
        <Link href="/leistungen/microsoft-365-azure" className="underline hover:text-foreground">
          Microsoft 365
        </Link>
        .
      </p>
    </ArticleLayout>
  );
}
