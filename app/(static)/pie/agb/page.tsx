import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen (AGB) | Fixius",
  description: "Allgemeine Geschäftsbedingungen (AGB) für die Nutzung des Internetportals Fixius – Handwerksportal.",
  robots: "index, follow",
};

export default function AgbPage() {
  return (
    <article className="prose prose-slate max-w-none text-Heading/90 leading-relaxed font-inter">
      <h1 className="text-3xl md:text-4xl font-black text-secondary mb-8 border-b pb-4 border-gray-100 font-outfit">
        Allgemeine Geschäftsbedingungen (AGB) : Fixius - Handwerksportal
      </h1>

      <div className="space-y-8">
        {/* § 1 */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-bold text-secondary font-outfit">
            1. Geltungsbereich und Vertragsgegenstand
          </h2>
          <p className="text-slate-700 leading-relaxed">
            (1) Die nachfolgenden Allgemeinen Geschäftsbedingungen gelten für die Nutzung des Internetportals Fixius – Handwerksportal (nachfolgend „Fixius“ oder „Plattform“). Betreiber der Plattform ist Giuseppe Licopoli (Anschrift laut Impressum).
          </p>
          <p className="text-slate-700 leading-relaxed">
            (2) Fixius - Handwerksportal bietet eine digitale Plattform, über die Auftraggeber (Kunden) und Handwerker bzw. Dienstleister (Auftragnehmer) zusammengebracht werden, um Verträge über handwerkliche Dienstleistungen anzubahnen.
          </p>
          <p className="text-slate-700 leading-relaxed">
            (3) Entgegenstehende oder von diesen AGB abweichende Bedingungen der Nutzer finden keine Anwendung, es sei denn, Fixius - Handwerksportal hat ihrer Geltung ausdrücklich schriftlich zugestimmt.
          </p>
        </section>

        {/* § 2 */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-bold text-secondary font-outfit">
            2. Leistungen von Fixius - Handwerksportal &amp; Rolle als Vermittler
          </h2>
          <p className="text-slate-700 leading-relaxed">
            (1) Fixius - Handwerksportal stellt lediglich die technische Infrastruktur (Marktplatz) zur Verfügung, um den Kontakt zwischen Auftraggebern und Handwerkern zu ermöglichen.
          </p>
          <p className="text-slate-700 leading-relaxed">
            (2) Fixius - Handwerksportal wird selbst nicht Vertragspartner der Verträge, die über die Plattform zwischen Auftraggebern und Handwerkern geschlossen werden. Die Durchführung, Abrechnung und Gewährleistung für Handwerksleistungen erfolgen ausschließlich direkt zwischen den Vertragsparteien.
          </p>
          <p className="text-slate-700 leading-relaxed">
            (3) Fixius - Handwerksportal übernimmt keine Gewähr für die Richtigkeit der Angaben in Nutzerprofilen oder Auftragsbeschreibungen sowie für die Qualität oder Pünktlichkeit der erbrachten Handwerksleistungen.
          </p>
        </section>

        {/* § 3 */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-bold text-secondary font-outfit">
            3. Registrierung und Nutzerkonto
          </h2>
          <p className="text-slate-700 leading-relaxed">
            (1) Die Nutzung bestimmter Funktionen der Plattform setzt eine Registrierung als Nutzer (entweder als Auftraggeber oder als Handwerker/Dienstleister) voraus.
          </p>
          <p className="text-slate-700 leading-relaxed">
            (2) Die Registrierung steht nur unbeschränkt geschäftsfähigen Personen offen.
          </p>
          <p className="text-slate-700 leading-relaxed">
            (3) Der Nutzer ist verpflichtet, bei der Registrierung wahrheitsgemäße, aktuelle und vollständige Angaben zu machen (insbesondere Name, Adresse, Kontaktdaten und ggf. Qualifikationen/Gewerbeanmeldung). Änderungen sind unverzüglich im Profil zu aktualisieren.
          </p>
          <p className="text-slate-700 leading-relaxed">
            (4) Zugangsdaten (Passwörter etc.) sind geheim zu halten und dürfen nicht an unbefugte Dritte weitergegeben werden.
          </p>
        </section>

        {/* § 4 */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-bold text-secondary font-outfit">
            4. Pflichten der Nutzer &amp; Kommunikationsstandards
          </h2>
          <p className="text-slate-700 leading-relaxed">
            (1) Die Nutzer verpflichten sich, die Plattform nur im Rahmen der geltenden Gesetze zu nutzen. Insbesondere ist die Vermittlung oder Durchführung von Schwarzarbeit strengstens untersagt.
          </p>
          <p className="text-slate-700 leading-relaxed">
            (2) Im Rahmen der Kommunikation und Profilgestaltung ist es untersagt, beleidigende, diskriminierende, irreführende oder rechtswidrige Inhalte zu veröffentlichen oder Spam zu versenden.
          </p>
          <p className="text-slate-700 leading-relaxed">
            (3) Kontaktdaten, die über die Plattform ausgetauscht werden, dürfen ausschließlich zur Anbahnung und Abwicklung des jeweiligen Auftrags verwendet werden. Eine kommerzielle Weitergabe oder das Scrapen von Daten ist untersagt.
          </p>
        </section>

        {/* § 5 */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-bold text-secondary font-outfit">
            5. Haftung von Fixius - Handwerksportal
          </h2>
          <p className="text-slate-700 leading-relaxed">
            (1) Für Schäden haftet Fixius - Handwerksportal unbeschränkt nur bei Vorsatz und grober Fahrlässigkeit.
          </p>
          <p className="text-slate-700 leading-relaxed">
            (2) Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten (Kardinalpflichten) ist die Haftung auf den vertragstypischen, vorhersehbaren Schaden begrenzt.
          </p>
          <p className="text-slate-700 leading-relaxed">
            (3) Die Haftung für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit sowie nach dem Produkthaftungsgesetz bleibt unberührt.
          </p>
          <p className="text-slate-700 leading-relaxed">
            (4) Fixius - Handwerksportal haftet nicht für die Bonität der Nutzer oder das Zustandekommen von Aufträgen.
          </p>
        </section>

        {/* § 6 */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-bold text-secondary font-outfit">
            6. Laufzeit und Kündigung
          </h2>
          <p className="text-slate-700 leading-relaxed">
            (1) Der Nutzungsvertrag über die Nutzung der Plattform wird auf unbestimmte Zeit geschlossen.
          </p>
          <p className="text-slate-700 leading-relaxed">
            (2) Beide Parteien können den Nutzungsvertrag jederzeit ohne Angabe von Gründen mit einer Frist von 14 Tagen in Textform kündigen.
          </p>
          <p className="text-slate-700 leading-relaxed">
            (3) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund (z. B. bei schweren AGB-Verstößen oder illegalen Handlungen) bleibt unberührt.
          </p>
        </section>

        {/* § 7 */}
        <section className="space-y-3">
          <h2 className="text-xl md:text-2xl font-bold text-secondary font-outfit">
            7. Schlussbestimmungen
          </h2>
          <p className="text-slate-700 leading-relaxed">
            (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
          </p>
          <p className="text-slate-700 leading-relaxed">
            (2) Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, so bleibt die Wirksamkeit der übrigen Bestimmungen hiervon unberührt.
          </p>
        </section>
      </div>

      <section className="mt-12 pt-8 border-t border-gray-100 italic text-sm text-gray-500">
        <p>Stand: 2025/2026. Bei Fragen zu diesen Bedingungen kontaktieren Sie uns bitte unter: <a href="mailto:info@fixius.de" className="text-primary hover:underline font-bold">info@fixius.de</a>.</p>
      </section>
    </article>
  );
}
