import Hero from "./components/landingPage/Hero";
import Services from "./components/landingPage/Services";
import Steps from "./components/landingPage/Steps";
import NewListedOrders from "./components/landingPage/NewListedOrders";
import Craftsman from "./components/landingPage/Craftsman";
import CTA from "./components/landingPage/CTA";
import { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Renovierungen und Dienstleistungen für Ihr Zuhause | Fixius",
  description: "Finden Sie professionelle Handwerker für Reparaturen, Renovierungen und mehr. Kontaktieren Sie lokale Handwerker und verwandeln Sie Ihr Zuhause mit qualitativ hochwertigen Ergebnissen.",
  robots: "index, follow",
  alternates: {
    canonical: "https://www.fixius.de/",
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.fixius.de/#website",
        "url": "https://www.fixius.de/",
        "name": "Fixius",
        "description": "Finden Sie qualifizierte Handwerker für Ihre Projekte.",
        "publisher": {
          "@id": "https://www.fixius.de/#organization",
        },
        "inLanguage": "de-DE",
      },
      {
        "@type": "Organization",
        "@id": "https://www.fixius.de/#organization",
        "name": "Fixius",
        "url": "https://www.fixius.de/",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.fixius.de/android-chrome-512x512.png",
          "width": 112,
          "height": 112,
        },
        "sameAs": [],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="overflow-x-hidden">
        {/* High-impact Hero Section */}
        <Hero />

        {/* Services Grid */}
        <Services />

        {/* How it Works / Steps */}
        <Steps  />

        {/* Live Jobs Feed */}
        {/* <NewListedOrders /> */}

        {/* Best Rated Craftsmen */}
        <Craftsman />

        {/* Final Action Section */}
        <CTA />
      </main>
    </>
  );
}
