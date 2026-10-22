import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/sections/article-layout";
import { getArticleBySlug } from "@/lib/articles";

const article = getArticleBySlug("domain-rechnung-betrug-erkennen")!;

export const metadata: Metadata = {
  title: { absolute: article.seoTitle },
  description: article.metaDescription,
  alternates: { canonical: `/magazin/${article.slug}` },
};

export default function ArticlePage() {
  return (
    <ArticleLayout article={article}>
      <p>
        <strong>Kurz gesagt:</strong> Es kommt ein Schreiben – per Post oder per E-Mail –, das wie
        eine Rechnung für Ihre Internetadresse aussieht. Ihre echte Domain steht drin, ein Betrag
        zwischen 50 und 900 Euro, eine kurze Frist und oft der Hinweis, die Adresse werde sonst
        freigegeben. Der Absender hat mit Ihrer Domain nichts zu tun. Bezahlen Sie nicht, bevor Sie
        die drei Punkte weiter unten geprüft haben.
      </p>

      <h2>Warum gerade Handwerksbetriebe getroffen werden</h2>
      <p>
        Die Daten für diese Schreiben sind frei verfügbar. Wer eine Domain registriert, hinterlegt
        Namen und Anschrift, und das Impressum auf Ihrer Webseite nennt beides ohnehin – dazu
        verpflichtet Sie das Gesetz. Es braucht also keinen Einbruch und keinen Datenverkauf,
        sondern nur jemanden, der öffentliche Verzeichnisse abschreibt.
      </p>
      <p>
        Handwerksbetriebe sind ein dankbares Ziel, weil die Zuständigkeit oft unklar ist. Die Domain
        hat vor Jahren ein Bekannter registriert, die Rechnungen gehen irgendwo in der Buchhaltung
        ein, und niemand weiß genau, was das Hosting eigentlich kostet. Genau in diese Lücke zielt
        das Schreiben.
      </p>

      <h2>Die drei Maschen, die Sie unterscheiden sollten</h2>
      <p>
        <strong>Die gefälschte Rechnung.</strong> Sie imitiert das Erscheinungsbild eines echten
        Anbieters, manchmal samt Logo. Gefordert wird die „Verlängerung“ Ihrer bestehenden Domain.
        Der Absender hat damit nichts zu tun – es gibt keine Leistung und keinen Vertrag.
      </p>
      <p>
        <strong>Das Angebot im Rechnungskleid.</strong> Das ist die häufigere und juristisch
        heiklere Form. Das Schreiben sieht aus wie eine Rechnung, ist aber ein Vertragsangebot.
        Irgendwo im Kleingedruckten steht ein Satz wie <em>„Mit der Zahlung nehmen Sie unser Angebot
        an“</em>. Wer überweist, schließt einen Vertrag – oft über drei Jahre, oft über die Eintragung
        in ein wertloses Branchenverzeichnis, das niemand liest.
      </p>
      <p>
        <strong>Die angebliche Abmahnung oder Markenverletzung.</strong> Hier wird Druck über Angst
        aufgebaut: Jemand wolle Ihre Domain registrieren, Sie hätten ein Vorkaufsrecht, aber nur bis
        Freitag. Es gibt kein solches Vorkaufsrecht.
      </p>

      <h2>Woran Sie es in zwei Minuten erkennen</h2>
      <p>
        <strong>1. Vergleichen Sie den Absender mit Ihrem echten Anbieter.</strong> Sie haben genau
        einen Vertragspartner für Ihre Domain – meist IONOS, Strato, united-domains oder Ihre
        Agentur. Steht ein anderer Name auf dem Schreiben, ist die Sache erledigt. Wer der echte
        Anbieter ist, steht auf Ihrer letzten Abbuchung im Kontoauszug.
      </p>
      <p>
        <strong>2. Lesen Sie das Kleingedruckte zu Ende.</strong> Bei den Angeboten im Rechnungskleid
        steht dort der entlarvende Satz. Formulierungen wie „Angebot“, „Eintragungsofferte“ oder
        „Mit der Zahlung kommt der Vertrag zustande“ bedeuten: Das ist keine Rechnung über etwas, das
        Sie bereits haben.
      </p>
      <p>
        <strong>3. Achten Sie auf den Zahlungsweg.</strong> Ihr echter Anbieter bucht ab oder nutzt
        das hinterlegte Zahlungsmittel. Eine Aufforderung zur Überweisung auf ein Konto, das Sie
        noch nie gesehen haben, ist ein deutliches Zeichen – besonders bei einer ausländischen IBAN.
      </p>
      <p>
        Dazu kommen die bekannten Merkmale: eine sehr kurze Frist, ein Betrag, der weit über den
        üblichen 10 bis 20 Euro im Jahr für eine .de-Domain liegt, und ein Firmenname, der amtlich
        klingt, ohne es zu sein.
      </p>

      <h2>Wenn Sie schon bezahlt haben</h2>
      <p>
        Das ist keine Peinlichkeit, sondern Alltag – diese Schreiben sind handwerklich gut gemacht.
        Wichtig ist, was Sie danach tun:
      </p>
      <ul>
        <li>
          Bei einer Lastschrift können Sie innerhalb von acht Wochen bei Ihrer Bank widersprechen.
          Bei einer Überweisung ist das Geld in der Regel weg.
        </li>
        <li>
          Widersprechen Sie schriftlich und fordern Sie das Geld zurück. Bei Angeboten im
          Rechnungskleid steht eine Anfechtung wegen arglistiger Täuschung im Raum – das gehört in
          die Hände eines Anwalts, nicht in ein Telefonat.
        </li>
        <li>
          Zahlen Sie keine Folgerechnungen, auch nicht bei Mahnungen. Wer einmal zahlt, gilt als
          zahlungswillig und bekommt mehr Post.
        </li>
        <li>
          Melden Sie den Vorgang der Verbraucherzentrale und erstatten Sie Anzeige. Das hilft nicht
          unbedingt Ihnen, aber es ist die einzige Grundlage, auf der Ermittlungen entstehen.
        </li>
      </ul>

      <h2>Was dauerhaft davor schützt</h2>
      <p>
        <strong>Schreiben Sie auf, was Sie haben.</strong> Welche Domains gehören dem Betrieb, bei
        welchem Anbieter liegen sie, wann verlängern sie sich, was kosten sie im Jahr, und wer hat
        die Zugangsdaten? Eine Seite genügt. Wer das weiß, erkennt jedes falsche Schreiben in
        Sekunden – und muss nicht raten.
      </p>
      <p>
        <strong>Legen Sie fest, wer entscheidet.</strong> Die meisten dieser Zahlungen gehen raus,
        weil jemand in der Buchhaltung eine Rechnung sieht, die zu einem Posten passen könnte. Eine
        klare Regel – Rechnungen rund um Internet und Domain werden nur nach Rücksprache bezahlt –
        verhindert das zuverlässiger als jeder Spamfilter.
      </p>
      <p>
        <strong>Und: Der Betrieb muss Inhaber sein.</strong> Steht im Domain-Eintrag der Name eines
        früheren Dienstleisters oder eines Bekannten, haben Sie ein größeres Problem als diese Post.
        Dann gehört Ihre Internetadresse formal jemand anderem.
      </p>
      <p>
        Wenn Sie nicht sicher sind, wem Ihre Domain gehört oder was Sie dafür zahlen: Wir sehen das
        nach und schreiben es Ihnen auf.{" "}
        <Link href="/kontakt">Schreiben Sie uns kurz</Link> – und prüfen Sie bei der Gelegenheit
        gleich Ihre <Link href="/email-check">E-Mail-Einstellungen</Link>, denn gefälschte Rechnungen
        im Namen Ihres eigenen Betriebs sind die unangenehmere Variante desselben Problems.
      </p>
    </ArticleLayout>
  );
}
