import type { Metadata } from "next";
import { Section } from "@/components/sections/section";
import { addressLine, company } from "@/lib/constants";

export const metadata: Metadata = {
  title: "AGB",
  robots: { index: false, follow: true },
};

export default function AgbPage() {
  return (
    <Section eyebrow="Rechtliches" title="Allgemeine Geschäftsbedingungen (AGB)" className="pt-32">
      <div className="max-w-2xl space-y-10 text-sm leading-relaxed text-muted">
        <div>
          <p className="text-xs uppercase tracking-wider text-accent-secondary">Version: 24.03.2026</p>
          <p className="mt-3">
            Justin Boch Solutions
            <br />
            Inhaber: {company.owner}
            <br />
            {addressLine}
            <br />
            E-Mail: {company.email}
          </p>
        </div>

        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-foreground">§ 1 Geltungsbereich</h2>
          <p>
            (1) Diese Allgemeinen Geschäftsbedingungen gelten für alle Angebote, Verträge, Lieferungen
            und Leistungen von Justin Boch Solutions, Inhaber Justin Boch, nachfolgend
            „Auftragnehmer&rdquo;, gegenüber seinen Auftraggebern.
          </p>
          <p className="mt-3">
            (2) Diese AGB gelten ausschließlich gegenüber Unternehmern i.S.d. § 14 BGB. Als Unternehmer
            gilt hiernach auch, wer die Leistungen im Zuge der Aufnahme einer gewerblichen oder
            selbständigen beruflichen Tätigkeit beauftragt. Der Auftragnehmer schließt keine Verträge
            mit Verbrauchern im Sinne des § 13 BGB ab. Der Kunde versichert bei Vertragsschluss, als
            Unternehmer gemäß § 14 BGB bzw. Kaufmann im Sinne des Handelsgesetzbuchs (HGB) zu handeln.
          </p>
          <p className="mt-3">
            (3) Abweichende, entgegenstehende oder ergänzende Allgemeine Geschäftsbedingungen des
            Auftraggebers werden nur dann Vertragsbestandteil, wenn der Auftragnehmer ihrer Geltung
            ausdrücklich in Textform zugestimmt hat.
          </p>
          <p className="mt-3">
            (4) Individuelle Vereinbarungen, insbesondere in Angeboten, Projektbeschreibungen oder
            Einzelverträgen, gehen diesen AGB vor.
          </p>
          <p className="mt-3">
            (5) Diese Geschäftsbedingungen gelten auch für alle künftigen Geschäftsbeziehungen mit dem
            Kunden, auch wenn sie nicht nochmals ausdrücklich vereinbart werden.
          </p>
        </div>

        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-foreground">
            § 2 Leistungen des Auftragnehmers
          </h2>
          <p>(1) Der Auftragnehmer erbringt insbesondere Leistungen in den Bereichen:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Webdesign</li>
            <li>Webentwicklung</li>
            <li>Erstellung und Weiterentwicklung von Websites und Webanwendungen</li>
            <li>technische Einrichtung und Optimierung</li>
            <li>digitale Gestaltung</li>
            <li>Beratung im digitalen Umfeld</li>
            <li>optionale Wartungs-, Pflege- und Supportleistungen</li>
          </ul>
          <p className="mt-3">
            (2) Der konkrete Leistungsumfang ergibt sich ausschließlich aus dem jeweiligen Angebot, der
            Leistungsbeschreibung oder einer sonstigen individuellen Vereinbarung.
          </p>
          <p className="mt-3">
            (3) Sofern nicht ausdrücklich vereinbart, schuldet der Auftragnehmer insbesondere nicht:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>einen bestimmten wirtschaftlichen Erfolg,</li>
            <li>bestimmte Umsätze, Anfragen oder Conversion-Raten,</li>
            <li>bestimmte Suchmaschinenplatzierungen,</li>
            <li>
              eine rechtliche Prüfung von Inhalten, Pflichtangaben, Datenschutztexten, Impressum, AGB
              oder sonstigen Rechtstexten,
            </li>
            <li>
              die dauerhafte Kompatibilität mit allen Browsern, Endgeräten, Systemversionen oder
              Drittanbieter-Diensten.
            </li>
          </ul>
          <p className="mt-3">
            (4) Leistungen im Zusammenhang mit Hosting, Domains, E-Mail-Diensten, externen Plugins,
            Schnittstellen, APIs, Fremdsoftware, App-Stores, Plattformen, Zahlungsanbietern oder
            sonstigen Leistungen Dritter sind nur geschuldet, wenn sie ausdrücklich vereinbart wurden.
          </p>
          <p className="mt-3">
            (5) Die nach dem Vertrag geschuldeten Leistungen sind ausschließlich mit unserem Auftraggeber
            vereinbart. Eine Berührung Dritter mit unseren Leistungen sowie Zugänglichmachung von und
            Begründung von Vertrauen in die Leistungsergebnisse ist nicht Teil der vereinbarten
            Leistungen.
          </p>
          <p className="mt-3">
            (6) Die Parteien beziehen keine Dritten in den Schutzbereich des Vertrages ein, es sei denn,
            die Parteien haben die Einbeziehung schriftlich ausdrücklich und unter Nennung des Dritten
            vereinbart.
          </p>
        </div>

        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-foreground">§ 3 Vertragsschluss</h2>
          <p>
            (1) Angebote des Auftragnehmers sind freibleibend und unverbindlich, sofern sie nicht
            ausdrücklich als verbindlich gekennzeichnet sind.
          </p>
          <p className="mt-3">
            (2) Ein Vertrag kommt zustande, wenn der Auftraggeber ein Angebot des Auftragnehmers in
            Textform annimmt und der Auftragnehmer diese Annahme bestätigt oder mit der
            Leistungserbringung beginnt.
          </p>
          <p className="mt-3">
            (3) Angaben auf Websites, in Portfolios, Präsentationen, Preislisten, Social-Media-Auftritten
            oder Werbematerialien stellen kein verbindliches Angebot dar.
          </p>
        </div>

        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-foreground">
            § 4 Mitwirkungspflichten des Auftraggebers
          </h2>
          <p>
            (1) Der Auftraggeber ist verpflichtet, alle zur Durchführung des Projekts erforderlichen
            Inhalte, Informationen, Daten, Unterlagen, Zugänge, Freigaben und Ansprechpartner
            rechtzeitig, vollständig und in verwertbarer Form bereitzustellen.
          </p>
          <p className="mt-3">
            (2) Der Auftraggeber stellt sicher, dass die von ihm bereitgestellten Inhalte, insbesondere
            Texte, Bilder, Videos, Logos, Marken, Schriften, Dokumente und sonstigen Materialien,
            rechtmäßig verwendet werden dürfen und keine Rechte Dritter verletzen.
          </p>
          <p className="mt-3">
            (3) Verzögerungen, Mehraufwand oder Nachteile, die dadurch entstehen, dass der Auftraggeber
            Mitwirkungspflichten nicht, nicht rechtzeitig, unvollständig oder fehlerhaft erfüllt, gehen
            nicht zulasten des Auftragnehmers.
          </p>
          <p className="mt-3">
            (4) Vereinbarte Fristen verschieben sich angemessen, wenn der Auftraggeber erforderliche
            Mitwirkungshandlungen nicht rechtzeitig erbringt.
          </p>
          <p className="mt-3">
            (5) Entsteht dem Auftragnehmer aufgrund verspäteter oder unvollständiger Mitwirkung
            zusätzlicher Aufwand, kann dieser entsprechend § 6 dieser AGB gesondert berechnet werden.
          </p>
          <p className="mt-3">
            (6) Der Auftragnehmer ist berechtigt, die Leistungserbringung bis zur vollständigen
            Mitwirkung des Auftraggebers auszusetzen.
          </p>
        </div>

        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-foreground">
            § 5 Leistungsfristen und Termine
          </h2>
          <p>
            (1) Leistungsfristen und Fertigstellungstermine sind nur verbindlich, wenn sie ausdrücklich
            als verbindlich vereinbart wurden.
          </p>
          <p className="mt-3">
            (2) Nicht vom Auftragnehmer zu vertretende Umstände, insbesondere fehlende Mitwirkung des
            Auftraggebers, technische Störungen, Ausfälle von Drittanbietern, höhere Gewalt oder sonstige
            unvorhersehbare Ereignisse, verlängern vereinbarte Fristen angemessen.
          </p>
          <p className="mt-3">
            (3) Der Auftragnehmer ist zu Teilleistungen berechtigt, soweit dies für den Auftraggeber
            zumutbar ist.
          </p>
        </div>

        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-foreground">§ 6 Vergütung</h2>
          <p>(1) Die Vergütung richtet sich nach dem jeweiligen Angebot oder der individuellen Vereinbarung.</p>
          <p className="mt-3">
            (2) Der Auftragnehmer ist berechtigt, Teilrechnungen und Abschläge entsprechend den bereits
            erbrachten Leistungen zu stellen.
          </p>
          <p className="mt-3">
            (3) Sofern nicht anders vereinbart, ist bei Projektbeginn eine Anzahlung in Höhe von 50 % der
            vereinbarten Gesamtvergütung fällig.
          </p>
          <p className="mt-3">
            (4) Der Auftragnehmer ist berechtigt, mit der Leistungserbringung erst nach Eingang der
            vereinbarten Anzahlung zu beginnen.
          </p>
          <p className="mt-3">
            (5) Sofern nicht anders vereinbart, ist der Restbetrag nach Fertigstellung, Abnahme oder
            Rechnungsstellung sofort, spätestens jedoch innerhalb von 14 Kalendertagen ohne Abzug fällig.
          </p>
          <p className="mt-3">
            (6) Zusätzliche Leistungen, die nicht vom ursprünglich vereinbarten Leistungsumfang umfasst
            sind, stellen Sonderleistungen dar, welche nach zeitlichem Aufwand zusätzlich abgerechnet
            werden. Der Auftragnehmer informiert den Auftraggeber vorab über den voraussichtlichen
            Mehraufwand. Die Höhe des Stundensatzes richtet sich, sofern es keine gesonderte Vereinbarung
            gibt, nach dem zum Zeitpunkt der Leistungserbringung gültigen Stundensatz des
            Auftragnehmers, aktuell 85 € zzgl. MwSt.
          </p>
          <p className="mt-3">(7) Dies gilt insbesondere für:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>nachträgliche Änderungswünsche,</li>
            <li>zusätzliche Designvarianten,</li>
            <li>zusätzliche Unterseiten oder Funktionen,</li>
            <li>neue Inhalte,</li>
            <li>zusätzliche Abstimmungsrunden,</li>
            <li>nachträgliche technische Erweiterungen,</li>
            <li>Mehraufwand aufgrund unklarer, verspäteter oder geänderter Vorgaben des Auftraggebers.</li>
          </ul>
          <p className="mt-3">
            (8) Gerät der Auftraggeber in Zahlungsverzug, ist der Auftragnehmer berechtigt, weitere
            Leistungen zurückzuhalten, bis offene Forderungen ausgeglichen sind. Der Auftragnehmer ist
            zudem zur Sperrung des Zugangs zu vereinbarten Leistungen berechtigt.
          </p>
        </div>

        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-foreground">
            § 7 Korrekturen und Änderungswünsche
          </h2>
          <p>
            (1) Sofern nicht abweichend vereinbart anders geregelt, sind bei Leistungen im Bereich
            Webdesign im Projektpreis bis zu zwei Korrekturschleifen enthalten.
          </p>
          <p className="mt-3">
            (2) Eine Korrekturschleife bedeutet die abschließende Rückmeldung des Auftraggebers zu einem
            vom Auftragnehmer vorgelegten Arbeitsergebnis innerhalb des vereinbarten Leistungsumfangs.
            Solange der Auftraggeber seine Rückmeldung nicht als abschließend kennzeichnet oder
            bezeichnet, kann der Auftraggeber die weitere Bearbeitung von Teilkorrekturen, Änderungen,
            Nachreichungen etc. zurückstellen. Hierdurch möchten die Parteien den Abstimmungsprozess
            straffen.
          </p>
          <p className="mt-3">
            (3) Nach einer abschließenden Rückmeldung vorgenommene Nachreichungen, weitere
            Teilkorrekturen oder nachträgliche Änderungen bereits freigegebener Bestandteile können als
            neue Korrekturschleife oder als Zusatzaufwand berechnet werden.
          </p>
          <p className="mt-3">
            (4) Änderungen, die über den ursprünglich vereinbarten Leistungsumfang hinausgehen, gelten
            als Zusatzleistung und werden gesondert vergütet.
          </p>
        </div>

        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-foreground">§ 8 Abnahme</h2>
          <p>
            (1) Bei Werkverträgen (z. B. Website-Erstellung, Automatisierungen) erfolgt die Abnahme im
            Regelfall nach den einzelnen Projektphasen und endet in der Gesamtabnahme. Nach
            Fertigstellung der Leistung führt der Auftragnehmer eine Testphase durch, in der auch der
            Kunde die Funktionsfähigkeit überprüft.
          </p>
          <p className="mt-3">
            (2) Auftretende wesentliche Mängel sind dem Auftragnehmer unverzüglich in Textform anzuzeigen.
          </p>
          <p className="mt-3">
            (3) Der Auftraggeber ist zur Abnahme verpflichtet, sofern die Leistung keine wesentlichen
            Mängel aufweist. Verweigert der Auftraggeber die Abnahme oder nimmt er diese nicht innerhalb
            von 14 Kalendertagen nach Aufforderung zur Abnahme vor, gilt die Abnahme als erfolgt, sofern
            der Auftragnehmer auf die Folgen einer unterlassenen Abnahme ausdrücklich hingewiesen hat und
            der Auftraggeber keine wesentlichen Mängel in Textform angezeigt hat.
          </p>
          <p className="mt-3">(4) Unwesentliche Mängel berechtigen nicht zur Verweigerung der Abnahme.</p>
        </div>

        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-foreground">§ 9 Nutzungsrechte</h2>
          <p>(1) Die vom Auftragnehmer erstellten Arbeits- und Leistungsergebnisse (Werke) sind urheberrechtlich geschützt.</p>
          <p className="mt-3">
            (2) Der Auftragnehmer räumt dem Auftraggeber den erstellten Arbeits- und Leistungsergebnissen,
            insbesondere an erstellten Webseiten das ausschließliche und uneingeschränkte Nutzungsrecht
            ein. Der Auftraggeber ist berechtigt, die Website uneingeschränkt zu nutzen, zu bearbeiten, zu
            verändern, an Dritte zu übertragen oder weiter zu veräußern, ohne dass hierfür eine weitere
            Zustimmung des Auftragnehmers erforderlich ist.
          </p>
          <p className="mt-3">
            (3) Die in vorstehendem Absatz geregelte Übertragung von Nutzungsrechten steht unter der
            Bedingung, dass der Kunde die jeweils vereinbarte Vergütung vollständig bezahlt hat.
          </p>
          <p className="mt-3">
            (4) Sofern nicht ausdrücklich anders vereinbart wird kein Nutzungsrecht übertragen an:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Entwürfe,</li>
            <li>Rohdateien,</li>
            <li>offene Arbeitsstände,</li>
            <li>Zwischenversionen,</li>
            <li>nicht ausgewählte Designvarianten,</li>
            <li>interne Konzepte,</li>
            <li>wiederverwendbare Bausteine,</li>
            <li>Frameworks,</li>
            <li>Bibliotheken,</li>
            <li>Tools,</li>
            <li>Standardskripte und Systembestandteile des Auftragnehmers.</li>
          </ul>
          <p className="mt-3">
            (5) Bei der Verwendung von Drittmaterialien (z. B. Stockfotos, Icons, Plugins, Open-Source-
            Komponenten und Libraries) gelten die jeweiligen Lizenzbedingungen der Rechteinhaber. Der
            Auftraggeber verpflichtet sich, diese Nutzungsbedingungen einzuhalten.
          </p>
          <p className="mt-3">
            (6) Der Auftragnehmer behält sich – auch im Falle der Einräumung eines ausschließlichen
            Nutzungsrechts an den Auftraggeber – ein unbefristetes Nutzungsrecht für eigene Zwecke (z. B.
            Eigenwerbung) vor.
          </p>
          <p className="mt-3">
            (7) Der Auftraggeber erhält kein Miturheberrecht, auch wenn dieser durch Ratschläge, Ideen
            oder Anregungen im Schaffungsprozess eingebunden war.
          </p>
        </div>

        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-foreground">
            § 10 Inhalte und Verantwortung des Auftraggebers
          </h2>
          <p>(1) Der Auftraggeber ist für sämtliche von ihm bereitgestellten Inhalte selbst verantwortlich.</p>
          <p className="mt-3">
            (2) Der Auftragnehmer ist nicht verpflichtet, vom Auftraggeber gelieferte Inhalte auf ihre
            rechtliche Zulässigkeit, Richtigkeit, Vollständigkeit oder Freiheit von Rechten Dritter zu
            prüfen.
          </p>
          <p className="mt-3">
            (3) Der Auftraggeber stellt den Auftragnehmer von sämtlichen Ansprüchen Dritter frei, die aus
            der Verwendung vom Auftraggeber bereitgestellter Inhalte oder Weisungen resultieren, sofern
            der Auftraggeber die Ursache gesetzt hat.
          </p>
          <p className="mt-3">(4) Die Freistellung umfasst auch die erforderlichen Kosten einer angemessenen Rechtsverteidigung.</p>
        </div>

        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-foreground">
            § 11 Hosting, Domains, Drittanbieter und Fremdleistungen
          </h2>
          <p>
            (1) Sofern nicht ausdrücklich anders vereinbart, schuldet der Auftragnehmer weder Hosting
            noch Domainregistrierung noch laufende Administration externer Dienste.
          </p>
          <p className="mt-3">
            (2) Unterstützt der Auftragnehmer den Auftraggeber bei der Auswahl, Einrichtung oder
            Konfiguration von Hosting, Domains, Plugins, Tools, Schnittstellen, Zahlungsanbietern oder
            sonstigen Leistungen Dritter, erfolgt dies nur im Rahmen einer gesondert vereinbarten
            Leistung oder als unterstützende Nebenleistung.
          </p>
          <p className="mt-3">
            (3) Verträge über Leistungen Dritter kommen grundsätzlich unmittelbar zwischen dem
            Auftraggeber und dem jeweiligen Drittanbieter zustande.
          </p>
          <p className="mt-3">
            (4) Der Auftragnehmer haftet nicht für Verfügbarkeit, Sicherheit, Preisentwicklung,
            Funktionsumfang, Richtlinienänderungen oder Ausfälle von Drittanbieter-Leistungen.
          </p>
        </div>

        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-foreground">§ 12 Exit / Offboarding</h2>
          <p>
            Bei Vertragsende stellt der Auftragnehmer die Werke, soweit im Einzelfall nicht abweichend
            vereinbart, in technisch üblichem Format bereit (Webseiten-Dateien, Datenbanken,
            Konfigurationsdateien, Dokumentationen). Die Weiterführung, Nutzung und Betrieb nach
            Vertragsende obliegen dem Kunden. Weitere Leistungen nach Vertragsende, bspw. Support, sind
            nicht geschuldet, sondern können Gegenstand eines separaten Wartungs-/Servicevertrags sein.
          </p>
        </div>

        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-foreground">§ 13 Gewährleistung</h2>
          <p>
            (1) Für werkvertragliche Leistungen gelten die gesetzlichen Mängelrechte, soweit in diesen
            AGB nichts anderes geregelt ist.
          </p>
          <p className="mt-3">(2) Der Auftragnehmer ist zunächst zur Nacherfüllung berechtigt.</p>
          <p className="mt-3">(3) Ein Mangel liegt insbesondere nicht vor bei:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>nur unerheblichen Abweichungen,</li>
            <li>technisch unvermeidbaren Darstellungsunterschieden,</li>
            <li>Einschränkungen aufgrund von Drittanbieter-Systemen,</li>
            <li>Änderungen oder Eingriffen des Auftraggebers oder Dritter nach Übergabe,</li>
            <li>Fehlern, die durch vom Auftraggeber bereitgestellte Inhalte, Daten oder Systeme verursacht werden.</li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-foreground">§ 14 Haftung</h2>
          <p>
            (1) Der Auftragnehmer haftet nur für Schäden, die er oder seine Erfüllungsgehilfen vorsätzlich
            oder grob fahrlässig herbeigeführt haben. Bei der leicht fahrlässigen Verletzung einer
            vertragswesentlichen Hauptpflicht (Kardinalpflicht), deren Erfüllung die ordnungsgemäße
            Durchführung des Vertrags überhaupt erst ermöglicht, deren Verletzung die Erreichung des
            Vertragszwecks gefährdet und auf deren Einhaltung der Auftraggeber regelmäßig vertrauen kann,
            ist die Schadensersatzhaftung des Auftragnehmers auf den Ersatz des vertragstypischen,
            vorhersehbaren Schadens begrenzt. Eine weitergehende Haftung ist ausgeschlossen. Die Haftung
            wegen schuldhafter Verletzung des Lebens, des Körpers oder der Gesundheit sowie die Haftung
            nach dem Produkthaftungsgesetz bleiben hiervon unberührt.
          </p>
          <p className="mt-3">(2) Der Auftragnehmer übernimmt keine Haftung für:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>den Inhalt der vom Auftraggeber bereitgestellten Materialien und Werbemaßnahmen.</li>
            <li>
              Vorgänge, die durch Drittanbieter (z. B. Google, Facebook) veranlasst werden, insbesondere
              die Entfernung einzelner Werbekampagnen oder Ranking-Veränderungen.
            </li>
          </ul>
          <p className="mt-3">
            (3) Für den Verlust von Daten haftet der Auftragnehmer nur bis zu dem Betrag, der bei
            ordnungsgemäßer und regelmäßiger Sicherung der Daten zu deren Wiederherstellung angefallen
            wäre.
          </p>
          <p className="mt-3">(4) In keinem Fall haftet der Auftragnehmer für entgangenen Gewinn.</p>
        </div>

        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-foreground">§ 15 Referenznennung</h2>
          <p>
            (1) Der Auftragnehmer ist berechtigt, abgeschlossene Projekte unter Nennung des Namens oder
            der Firma des Auftraggebers als Referenz zu verwenden, insbesondere auf der eigenen Website,
            in Präsentationen, im Portfolio oder in sozialen Medien.
          </p>
          <p className="mt-3">(2) Vertrauliche Informationen des Auftraggebers dürfen dabei nicht offengelegt werden.</p>
          <p className="mt-3">
            (3) Ein sichtbarer Hinweis auf den Auftragnehmer im Footer, Impressum oder sonstigen Bereichen
            des Projekts wird nur gesetzt, wenn dies ausdrücklich vereinbart wurde.
          </p>
        </div>

        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-foreground">
            § 16 Projektunterbrechung, Kündigung und Projektabbruch
          </h2>
          <p>
            (1) Der Auftragnehmer ist berechtigt, das Projekt vorübergehend auszusetzen, wenn der
            Auftraggeber erforderliche Mitwirkungshandlungen trotz Aufforderung nicht erbringt oder mit
            fälligen Zahlungen in Verzug gerät.
          </p>
          <p className="mt-3">
            (2) Dauerschuldverhältnisse, insbesondere Wartungs-, Pflege- oder Supportvereinbarungen,
            können nach Maßgabe der jeweiligen Vereinbarung gekündigt werden.
          </p>
          <p className="mt-3">
            (3) Bei werkvertraglichen Projekten bleibt das gesetzliche Recht zur freien Kündigung
            unberührt.
          </p>
          <p className="mt-3">
            (4) Im Fall der Kündigung oder des Projektabbruchs sind die bis dahin erbrachten Leistungen,
            nachweisbar angefallene Aufwände sowie nicht mehr stornierbare Fremdkosten vom Auftraggeber
            zu vergüten.
          </p>
          <p className="mt-3">(5) Das Recht zur Kündigung aus wichtigem Grund bleibt unberührt.</p>
        </div>

        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-foreground">§ 17 Vertraulichkeit</h2>
          <p>
            (1) Beide Parteien verpflichten sich, alle vertraulichen Informationen, die ihnen im Rahmen
            des Vertragsverhältnisses bekannt werden, vertraulich zu behandeln.
          </p>
          <p className="mt-3">
            (2) Nicht als vertraulich gelten Informationen, die bereits öffentlich bekannt sind, ohne
            Vertragsverstoß öffentlich bekannt werden oder aufgrund gesetzlicher Verpflichtungen
            offengelegt werden müssen.
          </p>
        </div>

        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-foreground">§ 18 Datenschutz</h2>
          <p>
            (1) Der Auftragnehmer verarbeitet personenbezogene Daten des Auftraggebers zum Zwecke der
            Erfüllung dieses Vertrages. Unsere Datenschutzerklärung finden Sie unter{" "}
            <a href="/datenschutz" className="underline hover:text-foreground">
              {company.url}/datenschutz
            </a>
            .
          </p>
          <p className="mt-3">
            (2) Sofern der Auftragnehmer für den Auftraggeber personenbezogene Daten als
            Auftragsverarbeiter verarbeitet, schließen die Parteien vorab einen
            Auftragsverarbeitungsvertrag gem. Art. 28 DSGVO (inkl. Regelungen zu
            Unterauftragsverarbeitern, Sicherheitsmaßnahmen, Löschung/Rückgabe). Der Einsatz/Wechsel von
            Unterauftragsverarbeitern erfolgt nach den in Art. 28 Abs. 2–4 DSGVO vorgesehenen
            Voraussetzungen.
          </p>
        </div>

        <div>
          <h2 className="mb-3 font-display text-lg font-semibold text-foreground">§ 19 Schlussbestimmungen</h2>
          <p>(1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.</p>
          <p className="mt-3">
            (2) Gerichtsstand für alle Streitigkeiten aus oder im Zusammenhang mit dem Vertragsverhältnis
            ist, soweit gesetzlich zulässig, der Sitz des Auftragnehmers, sofern der Auftraggeber
            Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches
            Sondervermögen ist.
          </p>
          <p className="mt-3">(3) Erfüllungsort ist, soweit gesetzlich zulässig, der Sitz des Auftragnehmers.</p>
          <p className="mt-3">(4) Die Vertragssprache ist Deutsch.</p>
          <p className="mt-3">
            (5) Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam sein oder werden,
            bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
          </p>
        </div>
      </div>
    </Section>
  );
}
