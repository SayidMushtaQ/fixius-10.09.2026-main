import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | Fixius – Handwerksportal",
  description: "Impressum & rechtliche Informationen von Fixius – Handwerksportal. Betreiber: Giuseppe Licopoli.",
  robots: "index, follow",
};

export default function RechtlicherHinweisPage() {
  return (
    <article className="prose prose-slate max-w-none text-Heading/80">
      <h1 className="text-3xl md:text-4xl font-black text-secondary mb-8 border-b pb-4 border-gray-100">Impressum</h1>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-secondary mb-2">Plattform:</h2>
          <p className="font-semibold text-slate-800">Fixius – Handwerksportal</p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-secondary mb-2">Betreiber:</h2>
          <p>
            Giuseppe Licopoli<br />
            Neuenkamperstr 32<br />
            42657 Solingen<br />
            Deutschland
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-secondary mb-2">Kontakt:</h2>
          <div className="space-y-1">
            <p><span className="font-medium">Telefon:</span> +49 162 525-4051</p>
            <p><span className="font-medium">E-Mail:</span> info@fixius.de</p>
          </div>
        </div>
      </div>
    </article>
  );
}
