import React from "react";
import { Metadata, Viewport } from "next";
import { RegisterPage } from "@/components";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Registrieren | Fixius - Handwerker und Kunden verbinden",
  description: "Registrieren Sie sich bei Fixius und werden Sie Teil unseres Netzwerks. Finden Sie neue Kunden oder qualifizierte Handwerker für Ihre Projekte.",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.fixius.de/registrieren",
  },
};

export default function RegistrierenPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.fixius.de/registrieren/#webpage",
    "url": "https://www.fixius.de/registrieren",
    "name": "Registrieren | Fixius",
    "description": "Registrieren Sie sich bei Fixius und werden Sie Teil unseres Netzwerks.",
    "inLanguage": "de-DE",
    "isPartOf": {
      "@id": "https://www.fixius.de/#website",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <RegisterPage />
      </main>
    </>
  );
}
