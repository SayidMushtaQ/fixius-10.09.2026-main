import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | Fixius",
  description: "Rechtliche Informationen und Kontakt zum Max Mustermann Handcraft Portal.",
  robots: "noindex, nofollow",
};

export default function ImpressumPage() {
  return (
    <article className="prose prose-slate max-w-none">
      <h1 className="text-3xl md:text-4xl font-black text-secondary mb-8 border-b pb-4 border-gray-100">Impressum</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-Heading/80">
        <section className="space-y-4">
          <p className="font-semibold text-secondary">Angaben gemäß § 5 TMG:</p>
          <div className="space-y-1">
            <p>Max Mustermann Handcraft Portal</p>
            <p>Sample Street 123</p>
            <p>12345 Sample City</p>
          </div>
        </section>

        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-secondary mb-2">Kontakt:</h2>
            <div className="space-y-1">
              <p><span className="font-medium">Telefon:</span> 01234/56789</p>
              <p><span className="font-medium">E-Mail:</span> info@handcraftportal.com</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-secondary mb-2">Vertreten durch:</h2>
            <p>Max Mustermann (Inhaber)</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-secondary mb-2">Umsatzsteuer-ID:</h2>
            <p>Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz: DE123456789</p>
          </div>
        </section>
      </div>

      <section className="mt-12 pt-8 border-t border-gray-100 italic text-sm text-gray-500">
        <p>Aufsichtsbehörde: [Zuständige Kammer oder Behörde hier einfügen]</p>
      </section>
    </article>
  );
}
