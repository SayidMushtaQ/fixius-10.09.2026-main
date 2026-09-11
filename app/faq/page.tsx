import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Häufig gestellte Fragen (FAQ) | Fixius",
  description: "Häufig gestellte Fragen (FAQ) – Fixius.de",
};

export default function FAQPage() {
  return (
    <main className="pt-24 md:pt-32 pb-20 w-full overflow-x-hidden bg-white">
      <div className="Container max-w-4xl mx-auto px-4">
        <h1 className="text-3xl md:text-5xl font-black text-secondary mb-12 pb-4 border-b border-gray-100">Häufig gestellte Fragen (FAQ) – Fixius.de</h1>
        
        <div className="space-y-12">
          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-3">
              <span className="text-3xl">🏠</span> Für Auftraggeber (Kunden)
            </h2>
            
            <div className="space-y-8">
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-secondary mb-4">1. Wie funktioniert Fixius.de für mich?</h3>
                <p className="mb-4 text-slate-600 font-medium">In nur drei einfachen Schritten finden Sie den passenden Profi:</p>
                <ul className="list-disc pl-5 space-y-3 text-slate-600 font-medium">
                  <li><strong>Auftrag erstellen:</strong> Beschreiben Sie Ihr Projekt (z. B. Wände streichen, Steckdose versetzen) kurz in unserem Formular.</li>
                  <li><strong>Angebote erhalten:</strong> Passende Handwerker aus Ihrer Region sehen Ihre Anfrage und senden Ihnen unverbindliche Angebote.</li>
                  <li><strong>Auswählen & Starten:</strong> Sie vergleichen die Angebote und Profile, wählen Ihren Wunsch-Handwerker aus und das Projekt kann starten.</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-secondary mb-4">2. Ist das Erstellen eines Auftrags kostenlos?</h3>
                <p className="text-slate-600 font-medium">Ja, das Veröffentlichen von Aufträgen auf Fixius.de ist für Sie als Auftraggeber komplett kostenlos und unverbindlich. Sie verpflichten sich auch nicht dazu, eines der erhaltenen Angebote anzunehmen.</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-secondary mb-4">3. Welche Dienstleistungen kann ich hier finden?</h3>
                <p className="mb-4 text-slate-600 font-medium">Unsere Plattform deckt fast alle Bereiche rund um Heimprojekte, Montage, Sanierung und Renovierung ab. Dazu gehören unter anderem:</p>
                <ul className="list-disc pl-5 space-y-3 text-slate-600 font-medium">
                  <li>Maler- und Lackierarbeiten</li>
                  <li>Elektroinstallationen</li>
                  <li>Sanitär- und Heizungsservice</li>
                  <li>Schreiner- und Zimmermannsarbeiten</li>
                  <li>Maurer- und Verputzarbeiten</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-secondary mb-4">4. Wie wähle ich den besten Handwerker aus?</h3>
                <p className="text-slate-600 font-medium">Neben dem angebotenen Preis können Sie die Profile der Handwerker einsehen. Achten Sie auf die Bewertungen anderer Kunden (z. B. unser Sterne-System) und die Beschreibungen der Betriebe, um die Qualität der Arbeit einzuschätzen.</p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-secondary mb-6 flex items-center gap-3 mt-16">
              <span className="text-3xl">🛠️</span> Für Handwerker & Dienstleister
            </h2>
            
            <div className="space-y-8">
              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-secondary mb-4">1. Wie profitiert mein Betrieb von Fixius.de?</h3>
                <p className="text-slate-600 font-medium">Fixius.de hilft Ihnen dabei, ohne großen Werbeaufwand neue Kunden direkt in Ihrer Region zu gewinnen. Sie erhalten Zugriff auf einen Pool von aktuellen Aufträgen, die genau zu Ihrem Gewerk passen, und können gezielt Angebote abgeben, um Ihren Umsatz zu steigern.</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-secondary mb-4">2. Wie kann ich mich als Handwerker registrieren?</h3>
                <p className="text-slate-600 font-medium">Klicken Sie einfach auf der Startseite oder im Menü auf &quot;Für Handwerker&quot; bzw. &quot;Kostenlos registrieren&quot;. Nach der Eingabe Ihrer Betriebsdaten und Ihres Gewerks können Sie Ihr Profil einrichten und direkt nach passenden Aufträgen in Ihrer Umgebung suchen.</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-secondary mb-4">3. Kostet die Registrierung für Handwerker etwas?</h3>
                <p className="text-slate-600 font-medium">Die Erstellung Ihres Profils und das Durchstöbern der aktuellen Aufträge ist im Basis-Schritt kostenlos. Je nach Mitgliedschaftsmodell oder für die Vermittlung von Kontakten können Gebühren anfallen – genaue Details hierzu finden Sie in Ihrem Handwerker-Bereich nach der Anmeldung.</p>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-secondary mb-4">4. Wie trete ich mit Kunden in Kontakt?</h3>
                <p className="text-slate-600 font-medium">Sobald ein Auftraggeber ein Projekt veröffentlicht, das zu Ihren Dienstleistungen passt, können Sie ein Angebot abgeben. Nimmt der Kunde Ihr Angebot an oder zeigt Interesse, werden die Kontaktdaten ausgetauscht, damit Sie die Details direkt besprechen können.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
