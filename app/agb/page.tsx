import FadeIn from '@/components/FadeIn';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AGB | JB Solutions',
  description: 'Allgemeine Geschäftsbedingungen der Justin Boch Solutions für Webentwicklung und digitale Systeme.',
};

export default function AGB() {
  return (
    <main className="min-h-screen bg-slate-950 pt-40 pb-24 px-6 flex justify-center">
      <div className="max-w-4xl w-full text-slate-300">
        
        <FadeIn direction="up">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-slate-800 bg-slate-900/50 text-xs text-slate-400 uppercase tracking-widest font-semibold">
            Rechtliches
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-8 tracking-tight">Allgemeine Geschäftsbedingungen (AGB)</h1>
          
          <div className="text-lg text-slate-400 mb-12 pb-8 border-b border-slate-800 leading-relaxed">
            <p className="font-bold text-slate-200">Justin Boch – JB Solutions</p>
            <p>Webentwicklung & digitale Systeme</p>
            <p>Königsberger Straße 174</p>
            <p>48157 Münster</p>
            <p>Deutschland</p>
          </div>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.1}>
          <div className="space-y-12 leading-relaxed">
            
            {/* § 1 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">§1 Geltungsbereich</h2>
              <div className="space-y-3">
                <p>(1) Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge, Lieferungen und Leistungen von Justin Boch – JB Solutions, nachfolgend „Auftragnehmer“, gegenüber seinen Auftraggebern.</p>
                <p>(2) Diese AGB gelten ausschließlich gegenüber Unternehmern im Sinne des §14 BGB, juristischen Personen des öffentlichen Rechts oder öffentlich-rechtlichen Sondervermögen.</p>
                <p>(3) Verträge mit Verbrauchern im Sinne des §13 BGB werden nicht geschlossen.</p>
                <p>(4) Abweichende, entgegenstehende oder ergänzende AGB des Auftraggebers werden nur Vertragsbestandteil, wenn der Auftragnehmer ihrer Geltung ausdrücklich schriftlich zugestimmt hat.</p>
                <p>(5) Individuelle Vereinbarungen in Angeboten, Projektverträgen oder Leistungsbeschreibungen haben Vorrang vor diesen AGB.</p>
              </div>
            </section>

            {/* § 2 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">§2 Leistungen</h2>
              <div className="space-y-3">
                <p>(1) Der Auftragnehmer erbringt insbesondere Leistungen in den Bereichen:</p>
                <ul className="list-disc pl-6 space-y-1 text-slate-400">
                  <li>Webdesign</li>
                  <li>Webentwicklung</li>
                  <li>Entwicklung von Websites</li>
                  <li>Entwicklung von Webanwendungen</li>
                  <li>Entwicklung individueller Softwarelösungen</li>
                  <li>Erstellung von Kundenportalen und digitalen Systemen</li>
                  <li>Beratung im digitalen Umfeld</li>
                  <li>technische Einrichtung von Hosting- und Cloudsystemen</li>
                  <li>Wartung und Pflege digitaler Systeme (optional)</li>
                </ul>
                <p>(2) Der konkrete Leistungsumfang ergibt sich ausschließlich aus dem jeweiligen Angebot oder Projektvertrag.</p>
                <p>(3) Der Auftragnehmer schuldet keinen bestimmten wirtschaftlichen Erfolg. Insbesondere werden nicht garantiert:</p>
                <ul className="list-disc pl-6 space-y-1 text-slate-400">
                  <li>bestimmte Umsätze</li>
                  <li>bestimmte Besucherzahlen</li>
                  <li>bestimmte Conversion-Raten</li>
                  <li>bestimmte Suchmaschinenplatzierungen</li>
                </ul>
                <p>(4) Der Auftragnehmer übernimmt keine rechtliche Prüfung von:</p>
                <ul className="list-disc pl-6 space-y-1 text-slate-400">
                  <li>Impressum</li>
                  <li>Datenschutzerklärung</li>
                  <li>AGB</li>
                  <li>Cookie-Hinweisen</li>
                  <li>sonstigen Rechtstexten</li>
                </ul>
                <p>Die rechtliche Verantwortung hierfür liegt beim Auftraggeber.</p>
              </div>
            </section>

            {/* § 3 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">§3 Vertragsschluss</h2>
              <div className="space-y-3">
                <p>(1) Angebote des Auftragnehmers sind freibleibend und unverbindlich.</p>
                <p>(2) Ein Vertrag kommt zustande durch:</p>
                <ul className="list-disc pl-6 space-y-1 text-slate-400">
                  <li>Annahme eines Angebots in Textform oder</li>
                  <li>Beginn der Leistungserbringung.</li>
                </ul>
                <p>(3) Angaben auf Websites, Social-Media-Seiten oder Präsentationen stellen kein verbindliches Angebot dar.</p>
              </div>
            </section>

            {/* § 4 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">§4 Mitwirkungspflichten des Auftraggebers</h2>
              <div className="space-y-3">
                <p>(1) Der Auftraggeber verpflichtet sich, alle zur Durchführung des Projekts erforderlichen Inhalte und Informationen rechtzeitig bereitzustellen. Dazu gehören insbesondere:</p>
                <ul className="list-disc pl-6 space-y-1 text-slate-400">
                  <li>Texte</li>
                  <li>Bilder</li>
                  <li>Logos</li>
                  <li>Zugangsdaten</li>
                  <li>Ansprechpartner</li>
                  <li>Freigaben</li>
                </ul>
                <p>(2) Der Auftraggeber stellt sicher, dass bereitgestellte Inhalte keine Rechte Dritter verletzen.</p>
                <p>(3) Der Auftragnehmer ist nicht verpflichtet, bereitgestellte Inhalte rechtlich zu prüfen.</p>
                <p>(4) Verzögerungen aufgrund fehlender Mitwirkung des Auftraggebers führen zu einer angemessenen Verlängerung der Projektfristen.</p>
                <p>(5) Zusätzlicher Aufwand durch verspätete oder unvollständige Mitwirkung kann gesondert berechnet werden.</p>
              </div>
            </section>

            {/* § 5 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">§5 Vergütung und Zahlungsbedingungen</h2>
              <div className="space-y-3">
                <p>(1) Die Vergütung ergibt sich aus dem jeweiligen Angebot oder Projektvertrag.</p>
                <p>(2) Rechnungen sind innerhalb von 14 Tagen ohne Abzug zahlbar.</p>
                <p>(3) Der Auftragnehmer ist berechtigt, Abschlagszahlungen entsprechend dem Projektfortschritt zu verlangen.</p>
                <p>(4) Bei Zahlungsverzug ist der Auftragnehmer berechtigt:</p>
                <ul className="list-disc pl-6 space-y-1 text-slate-400">
                  <li>Leistungen auszusetzen</li>
                  <li>den Zugang zu Systemen zu sperren</li>
                  <li>das Projekt vorübergehend zu stoppen</li>
                </ul>
                <p>bis offene Forderungen ausgeglichen sind.</p>
                <p>(5) Gesetzliche Verzugszinsen bleiben unberührt.</p>
              </div>
            </section>

            {/* § 6 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">§6 Abnahme</h2>
              <div className="space-y-3">
                <p>(1) Nach Fertigstellung der Leistung erfolgt eine Abnahme durch den Auftraggeber.</p>
                <p>(2) Die Abnahme kann schriftlich oder in Textform erfolgen.</p>
                <p>(3) Erfolgt innerhalb von 14 Tagen nach Bereitstellung der Leistung keine wesentliche Beanstandung, gilt die Leistung als abgenommen.</p>
                <p>(4) Unwesentliche Mängel berechtigen nicht zur Verweigerung der Abnahme.</p>
              </div>
            </section>

            {/* § 7 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">§7 Nutzungsrechte</h2>
              <div className="space-y-3">
                <p>(1) Nach vollständiger Zahlung der vereinbarten Vergütung erhält der Auftraggeber ein einfaches, zeitlich unbegrenztes Nutzungsrecht an den erstellten Arbeitsergebnissen.</p>
                <p>(2) Der Auftragnehmer bleibt berechtigt:</p>
                <ul className="list-disc pl-6 space-y-1 text-slate-400">
                  <li>generische Codebestandteile</li>
                  <li>Frameworks</li>
                  <li>Module</li>
                  <li>Designkonzepte</li>
                </ul>
                <p>auch in anderen Projekten zu verwenden.</p>
                <p>(3) Open-Source-Software unterliegt den jeweiligen Lizenzbedingungen der entsprechenden Anbieter.</p>
              </div>
            </section>

            {/* § 8 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">§8 Drittanbieter und externe Dienste</h2>
              <div className="space-y-3">
                <p>(1) Projekte können Dienste von Drittanbietern enthalten, z. B.:</p>
                <ul className="list-disc pl-6 space-y-1 text-slate-400">
                  <li>Hostinganbieter</li>
                  <li>Cloudsysteme</li>
                  <li>Content Delivery Networks</li>
                  <li>Plugins</li>
                  <li>APIs</li>
                  <li>Trackingtools</li>
                </ul>
                <p>(2) Der Auftragnehmer übernimmt keine Haftung für Ausfälle, Änderungen oder Einschränkungen dieser Drittanbieter.</p>
                <p>(3) Für Verträge mit Drittanbietern gelten ausschließlich deren eigene Nutzungsbedingungen.</p>
              </div>
            </section>

            {/* § 9 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">§9 Wartung und Support</h2>
              <div className="space-y-3">
                <p>(1) Wartungs- oder Supportleistungen sind nur geschuldet, wenn sie ausdrücklich vereinbart wurden.</p>
                <p>(2) Ohne Wartungsvertrag besteht kein Anspruch auf:</p>
                <ul className="list-disc pl-6 space-y-1 text-slate-400">
                  <li>Updates</li>
                  <li>Fehlerbehebung</li>
                  <li>technische Betreuung</li>
                </ul>
              </div>
            </section>

            {/* § 10 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">§10 Referenznennung</h2>
              <div className="space-y-3">
                <p>Der Auftragnehmer ist berechtigt, abgeschlossene Projekte als Referenz zu verwenden. Dies umfasst insbesondere:</p>
                <ul className="list-disc pl-6 space-y-1 text-slate-400">
                  <li>Darstellung auf der Website</li>
                  <li>Portfolio</li>
                  <li>Präsentationen</li>
                  <li>Social-Media</li>
                </ul>
                <p>Sofern der Auftraggeber nicht ausdrücklich widerspricht.</p>
              </div>
            </section>

            {/* § 11 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">§11 Haftung</h2>
              <div className="space-y-3">
                <p>(1) Der Auftragnehmer haftet nur bei Vorsatz oder grober Fahrlässigkeit.</p>
                <p>(2) Bei leichter Fahrlässigkeit haftet der Auftragnehmer nur bei Verletzung wesentlicher Vertragspflichten.</p>
                <p>(3) Die Haftung ist der Höhe nach auf den jeweiligen Auftragswert begrenzt.</p>
                <p>(4) Eine Haftung für entgangenen Gewinn, Produktionsausfälle oder mittelbare Schäden ist ausgeschlossen.</p>
              </div>
            </section>

            {/* § 12 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">§12 Vertraulichkeit</h2>
              <div className="space-y-3">
                <p>(1) Beide Parteien verpflichten sich, alle im Rahmen der Zusammenarbeit erhaltenen vertraulichen Informationen geheim zu halten.</p>
                <p>(2) Diese Verpflichtung besteht auch nach Beendigung des Vertrags fort.</p>
              </div>
            </section>

            {/* § 13 */}
            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">§13 Schlussbestimmungen</h2>
              <div className="space-y-3">
                <p>(1) Es gilt das Recht der Bundesrepublik Deutschland.</p>
                <p>(2) Gerichtsstand ist – soweit gesetzlich zulässig – der Sitz des Auftragnehmers.</p>
                <p>(3) Sollte eine Bestimmung dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.</p>
              </div>
            </section>

          </div>
        </FadeIn>

      </div>
    </main>
  );
}