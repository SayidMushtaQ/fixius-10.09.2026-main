import React from "react";
import { Metadata } from "next";
import { FindHandyman } from "@/components";

export const metadata: Metadata = {
  title: "Qualifizierte Handwerker in Ihrer Nähe finden - Schneller und Zuverlässiger Service | Fixius",
  description: "Finden Sie qualifizierte Handwerker in Ihrer Region mit Fixius. Vergessen Sie lange Wartezeiten, versteckte Kosten und Überraschungen. Erhalten Sie sofort schnelle und zuverlässige Ergebnisse.",
  alternates: {
    canonical: "https://www.fixius.de/handwerker-finden",
  },
};

export default function HandwerkerFindenPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.fixius.de/handwerker-finden/#webpage",
        "url": "https://www.fixius.de/handwerker-finden",
        "name": "Handwerker finden | Fixius",
        "description": "Finden Sie qualifizierte Handwerker in Ihrer Region mit Fixius.",
        "inLanguage": "de-DE",
        "isPartOf": {
          "@id": "https://www.fixius.de/#website",
        },
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.fixius.de/",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Handwerker finden",
            "item": "https://www.fixius.de/handwerker-finden",
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-mainBackground min-h-screen">
        <FindHandyman />
      </main>
    </>
  );
}
