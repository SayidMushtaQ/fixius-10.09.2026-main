import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nutzungsbedingungen | Fixius",
  description: "Nutzungsbedingungen für die Nutzung der Fixius Plattform.",
  robots: "index, follow",
};

export default function NutzungsbedingungenPage() {
  return (
    <article className="prose prose-slate max-w-none text-Heading/80">
      <h1 className="text-3xl md:text-4xl font-black text-secondary mb-8 border-b pb-4 border-gray-100">Nutzungsbedingungen</h1>

      <p className="mb-8">
        Die Nutzung von <strong className="text-secondary">Fixius</strong> setzt die Akzeptanz der folgenden Bedingungen voraus.
      </p>

      <section className="space-y-4 mb-10">
        <p className="flex gap-4">
          <span className="font-bold text-primary">1.</span>
          <span>Fixius ist eine Plattform, die Benutzer mit Fachleuten aus dem Bau- und Dienstleistungssektor verbindet.</span>
        </p>
        <p className="flex gap-4">
          <span className="font-bold text-primary">2.</span>
          <span>Benutzer müssen sich registrieren, wahrheitsgemäße Informationen angeben und die Vertraulichkeit ihrer Zugangsdaten wahren.</span>
        </p>
        <p className="flex gap-4">
          <span className="font-bold text-primary">3.</span>
          <span>Es ist verboten, die Plattform für illegale oder betrügerische Aktivitäten zu nutzen.</span>
        </p>
        <p className="flex gap-4">
          <span className="font-bold text-primary">4.</span>
          <span>Wir behalten uns das Recht vor, diese Bedingungen jederzeit mit vorheriger Ankündigung auf der Plattform zu ändern.</span>
        </p>
        <p className="flex gap-4">
          <span className="font-bold text-primary">5.</span>
          <span>Fixius haftet nicht für Schäden, die aus der Beauftragung von Dienstleistungen über die Plattform entstehen.</span>
        </p>
      </section>

      <section className="mt-12 pt-8 border-t border-gray-100 italic text-sm text-gray-500">
        <p>Für Fragen kontaktieren Sie uns unter: <a href="mailto:info@fixius.es" className="text-primary hover:underline font-bold">info@fixius.es</a> oder telefonisch unter <span className="font-bold">+49 162 525-4051</span>.</p>
      </section>
    </article>
  );
}
