import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzrichtlinie | Fixius",
  description: "Datenschutzrichtlinie von Fixius, in der wir erklären, wie wir personenbezogene Daten sammeln, verwenden und schützen.",
  robots: "index, follow",
};

export default function DatenschutzrichtliniePage() {
  return (
    <article className="prose prose-slate max-w-none text-Heading/80">
      <h1 className="text-3xl md:text-4xl font-black text-secondary mb-8 border-b pb-4 border-gray-100">Datenschutzrichtlinie</h1>

      <p className="mb-8">
        Bei <strong className="text-secondary">Fixius</strong> respektieren wir Ihre Privatsphäre und garantieren den Schutz Ihrer personenbezogenen Daten gemäß der Datenschutz-Grundverordnung (DSGVO).
      </p>

      <section className="space-y-4 mb-10">
        <h2 className="text-2xl font-bold text-secondary">1. Welche Informationen sammeln wir?</h2>
        <p>
          Wir sammeln personenbezogene Daten wie Name, Telefonnummer, E-Mail-Adresse und Zahlungsdaten, wenn sich Benutzer registrieren oder einen Dienst beauftragen.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-2xl font-bold text-secondary">2. Wie verwenden wir Ihre Daten?</h2>
        <p>Wir verwenden diese Daten, um:</p>
        <ul className="list-disc pl-5 space-y-2 font-medium">
          <li>Ihr Konto zu verwalten und die beauftragten Dienste anzubieten.</li>
          <li>Die Benutzererfahrung auf der Plattform zu verbessern.</li>
          <li>Sie zu kontaktieren, um die angeforderten Dienste abzuschließen.</li>
        </ul>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-2xl font-bold text-secondary">3. Mit wem teilen wir Ihre Daten?</h2>
        <p>
          Ihre Daten werden nicht an Dritte verkauft. Wir können sie jedoch mit vertrauenswürdigen Anbietern teilen, wie zum Beispiel:
        </p>
        <ul className="list-disc pl-5 space-y-2 font-medium">
          <li>Zahlungsdienstleister zur Abwicklung von Transaktionen.</li>
          <li>Hosting-Plattformen und Cloud-Dienste, um den Dienst online zu halten.</li>
          <li>Datenanalyseunternehmen zur Verbesserung unserer Dienste.</li>
        </ul>
        <p>
          Diese Anbieter sind verpflichtet, die Datenschutzstandards einzuhalten und Ihre Daten nur für die genannten Zwecke zu verwenden.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-2xl font-bold text-secondary">4. Wie lange speichern wir Ihre Daten?</h2>
        <p>
          Ihre personenbezogenen Daten werden so lange gespeichert, wie es zur Erfüllung der Zwecke, für die sie erhoben wurden, erforderlich ist. Sobald die Daten nicht mehr benötigt werden, werden sie gelöscht oder anonymisiert.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-2xl font-bold text-secondary">5. Welche Rechte haben Sie?</h2>
        <p>Gemäß den Datenschutzgesetzen haben Sie folgende Rechte:</p>
        <ul className="list-disc pl-5 space-y-2 font-medium">
          <li><strong>Auskunft</strong> über Ihre personenbezogenen Daten.</li>
          <li><strong>Berichtigung</strong> falscher oder unvollständiger Informationen.</li>
          <li><strong>Löschung</strong> Ihrer Daten, wenn diese nicht mehr benötigt werden.</li>
          <li><strong>Einschränkung</strong> der Verarbeitung Ihrer Daten unter bestimmten Umständen.</li>
          <li><strong>Widerspruch</strong> gegen die Verarbeitung Ihrer personenbezogenen Daten aus berechtigten Gründen.</li>
          <li><strong>Datenübertragbarkeit</strong> Ihrer personenbezogenen Daten an einen anderen Verantwortlichen.</li>
        </ul>
        <p className="mt-4">
          Um diese Rechte auszuüben, kontaktieren Sie uns unter:{" "}
          <a href="mailto:info@fixius.es" className="text-primary hover:underline font-bold">info@fixius.es</a>
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-2xl font-bold text-secondary">6. Wie schützen wir Ihre Daten?</h2>
        <p>
          Wir implementieren geeignete technische und organisatorische Sicherheitsmaßnahmen, um Ihre personenbezogenen Daten vor unbefugtem Zugriff, Änderung oder Offenlegung zu schützen.
        </p>
      </section>

      <section className="space-y-4 mb-10">
        <h2 className="text-2xl font-bold text-secondary">7. Änderungen dieser Datenschutzrichtlinie</h2>
        <p>
          Wir behalten uns das Recht vor, diese Datenschutzrichtlinie jederzeit zu aktualisieren. Alle Änderungen werden auf dieser Seite veröffentlicht, und falls erforderlich, werden wir Sie direkt informieren.
        </p>
      </section>

      <section className="mt-12 pt-8 border-t border-gray-100 italic text-sm text-gray-500">
        <p>Wir implementieren geeignete technische und organisatorische Sicherheitsmaßnahmen, um Ihre Daten zu schützen.</p>
      </section>
    </article>
  );
}
