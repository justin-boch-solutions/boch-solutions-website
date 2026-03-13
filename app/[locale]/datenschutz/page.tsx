import FadeIn from '@/components/FadeIn';

export default function Datenschutz() {
  return (
    <main className="min-h-screen bg-slate-950 pt-40 pb-24 px-6 flex justify-center">
      <div className="max-w-4xl w-full text-slate-300">
        
        <FadeIn direction="up">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-slate-800 bg-slate-900/50 text-xs text-slate-400 uppercase tracking-widest font-semibold">
            Rechtliches
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-50 mb-8 tracking-tight">Datenschutzerklärung</h1>
          
          <div className="text-lg text-slate-400 mb-12 pb-8 border-b border-slate-800 leading-relaxed">
            <p>Stand: {new Date().toLocaleDateString('de-DE')}</p>
          </div>
        </FadeIn>
        
        <FadeIn direction="up" delay={0.1}>
          <div className="space-y-12 leading-relaxed">
            
            {/* 1. Datenschutz auf einen Blick */}
            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">1. Datenschutz auf einen Blick</h2>
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-200">Allgemeine Hinweise</h3>
                <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen.</p>
                <p>Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>
                <p>Ausführliche Informationen zum Thema Datenschutz entnehmen Sie der nachfolgenden Datenschutzerklärung.</p>
              </div>
            </section>

            {/* 2. Verantwortlicher */}
            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">2. Verantwortlicher</h2>
              <div className="space-y-3">
                <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
                <p className="font-bold text-slate-200">
                  Justin Boch<br />
                  JB Solutions<br />
                  Königsberger Straße 174<br />
                  48157 Münster<br />
                  Deutschland
                </p>
                <p>
                  Telefon: 0251 28069471<br />
                  E-Mail: Kontakt@boch-solutions.de
                </p>
              </div>
            </section>

            {/* 3. Hosting */}
            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">3. Hosting</h2>
              <div className="space-y-3">
                <p>Diese Website wird bei externen Dienstleistern gehostet. Mögliche Hostinganbieter sind:</p>
                <ul className="list-disc pl-6 space-y-1 text-slate-400">
                  <li>Netlify Inc.</li>
                  <li>Vercel Inc.</li>
                </ul>
                <p>Beim Besuch dieser Website erfassen die Hostinganbieter verschiedene Logfiles. Dabei können insbesondere folgende Daten verarbeitet werden:</p>
                <ul className="list-disc pl-6 space-y-1 text-slate-400">
                  <li>IP-Adresse</li>
                  <li>Browsertyp</li>
                  <li>Betriebssystem</li>
                  <li>Uhrzeit des Seitenaufrufs</li>
                  <li>Referrer URL</li>
                  <li>aufgerufene Seiten</li>
                </ul>
                <p>Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren und effizienten Bereitstellung der Website).</p>
              </div>
            </section>

            {/* 4. Cloudflare */}
            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">4. Cloudflare</h2>
              <div className="space-y-3">
                <p>Diese Website nutzt Cloudflare.</p>
                <p>Anbieter ist: Cloudflare Inc., 101 Townsend St., San Francisco, CA 94107, USA.</p>
                <p>Cloudflare bietet ein Content Delivery Network (CDN) und Sicherheitsfunktionen an. Dabei können folgende Daten verarbeitet werden:</p>
                <ul className="list-disc pl-6 space-y-1 text-slate-400">
                  <li>IP-Adresse</li>
                  <li>Browserinformationen</li>
                  <li>Zugriffsdaten</li>
                  <li>Sicherheitstechnische Logdaten</li>
                </ul>
                <p>Die Nutzung erfolgt im Interesse einer sicheren und schnellen Bereitstellung unserer Website. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.</p>
              </div>
            </section>

            {/* 5. Firebase */}
            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">5. Firebase</h2>
              <div className="space-y-3">
                <p>Diese Website nutzt Dienste von Google Firebase.</p>
                <p>Anbieter ist: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.</p>
                <p>Firebase ist eine Entwicklungsplattform für Webanwendungen. Je nach Nutzung können folgende Daten verarbeitet werden:</p>
                <ul className="list-disc pl-6 space-y-1 text-slate-400">
                  <li>IP-Adresse</li>
                  <li>Nutzungsdaten</li>
                  <li>Geräteinformationen</li>
                  <li>Logdaten</li>
                </ul>
                <p>Firebase kann zur Bereitstellung von Hosting, Datenbanken, Authentifizierung und Cloudfunktionen verwendet werden.</p>
                <p>Weitere Informationen: <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://firebase.google.com/support/privacy</a></p>
              </div>
            </section>

            {/* 6. Google Analytics */}
            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">6. Google Analytics</h2>
              <div className="space-y-3">
                <p>Diese Website nutzt Google Analytics.</p>
                <p>Anbieter ist: Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.</p>
                <p>Google Analytics ermöglicht es uns, das Verhalten der Websitebesucher zu analysieren. Dabei können unter anderem folgende Daten erfasst werden:</p>
                <ul className="list-disc pl-6 space-y-1 text-slate-400">
                  <li>Seitenaufrufe</li>
                  <li>Verweildauer</li>
                  <li>Klickverhalten</li>
                  <li>Geräteinformationen</li>
                  <li>ungefähre Standortdaten</li>
                </ul>
                <p>Google Analytics verwendet Cookies. Die Nutzung erfolgt nur mit Einwilligung des Nutzers gemäß Art. 6 Abs. 1 lit. a DSGVO. Die IP-Adresse wird anonymisiert verarbeitet.</p>
                <p>Weitere Informationen: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://policies.google.com/privacy</a></p>
              </div>
            </section>

            {/* 7. Cookies */}
            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">7. Cookies</h2>
              <div className="space-y-3">
                <p>Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden. Es gibt verschiedene Arten von Cookies:</p>
                <ul className="list-disc pl-6 space-y-3 text-slate-400">
                  <li><strong>Notwendige Cookies:</strong> Diese Cookies sind technisch erforderlich, damit die Website funktioniert.</li>
                  <li><strong>Analyse-Cookies:</strong> Diese Cookies helfen uns zu verstehen, wie Besucher unsere Website nutzen.</li>
                  <li><strong>Marketing-Cookies:</strong> Diese Cookies können verwendet werden, um Inhalte oder Werbung zu personalisieren.</li>
                </ul>
                <p>Cookies werden nur gesetzt, wenn der Nutzer über das Cookie-Banner eingewilligt hat.</p>
              </div>
            </section>

            {/* 8. Kontaktformular */}
            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">8. Kontaktformular</h2>
              <div className="space-y-3">
                <p>Wenn Sie uns über das Kontaktformular kontaktieren, werden folgende Daten gespeichert:</p>
                <ul className="list-disc pl-6 space-y-1 text-slate-400">
                  <li>Name</li>
                  <li>E-Mail-Adresse</li>
                  <li>Nachricht</li>
                  <li>ggf. weitere Projektinformationen</li>
                </ul>
                <p>Diese Daten werden ausschließlich zur Bearbeitung Ihrer Anfrage verwendet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO. Die Daten werden nicht ohne Ihre Zustimmung weitergegeben.</p>
              </div>
            </section>

            {/* 9. Newsletter */}
            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">9. Newsletter (falls verwendet)</h2>
              <div className="space-y-3">
                <p>Wenn Sie sich für unseren Newsletter anmelden, verwenden wir Ihre E-Mail-Adresse ausschließlich zum Versand des Newsletters. Die Anmeldung erfolgt über ein Double-Opt-In-Verfahren.</p>
                <p>Sie können den Newsletter jederzeit abbestellen.</p>
              </div>
            </section>

            {/* 10. Speicherdauer */}
            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">10. Speicherdauer</h2>
              <div className="space-y-3">
                <p>Personenbezogene Daten werden nur so lange gespeichert, wie dies für den jeweiligen Zweck erforderlich ist. Gesetzliche Aufbewahrungsfristen bleiben unberührt.</p>
              </div>
            </section>

            {/* 11. Rechte der betroffenen Personen */}
            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">11. Rechte der betroffenen Personen</h2>
              <div className="space-y-3">
                <p>Sie haben jederzeit das Recht:</p>
                <ul className="list-disc pl-6 space-y-1 text-slate-400">
                  <li>Auskunft über Ihre gespeicherten Daten zu erhalten</li>
                  <li>Berichtigung falscher Daten zu verlangen</li>
                  <li>Löschung Ihrer Daten zu verlangen</li>
                  <li>Einschränkung der Verarbeitung zu verlangen</li>
                  <li>der Datenverarbeitung zu widersprechen</li>
                  <li>Datenübertragbarkeit zu verlangen</li>
                </ul>
              </div>
            </section>

            {/* 12. Beschwerderecht */}
            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">12. Beschwerderecht</h2>
              <div className="space-y-3">
                <p>Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren.</p>
                <p>Zuständige Aufsichtsbehörde in NRW:<br />
                Landesbeauftragte für Datenschutz und Informationsfreiheit NRW<br />
                <a href="https://www.ldi.nrw.de" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:underline">https://www.ldi.nrw.de</a></p>
              </div>
            </section>

            {/* 13. SSL-Verschlüsselung */}
            <section>
              <h2 className="text-2xl font-bold text-slate-50 mb-4">13. SSL-Verschlüsselung</h2>
              <div className="space-y-3">
                <p>Diese Website nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von http:// auf https:// wechselt.</p>
              </div>
            </section>

          </div>
        </FadeIn>

      </div>
    </main>
  );
}