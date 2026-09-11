import { Metadata } from "next";
import Steps from "@/app/components/landingPage/Steps";
import Craftsman from "@/app/components/landingPage/Craftsman";
import NewListedOrders from "@/app/components/landingPage/NewListedOrders";
import CTA from "@/app/components/landingPage/CTA";

export const metadata: Metadata = {
  title: "Wie es funktioniert | Fixius",
  description: "Erfahren Sie, wie Sie in 3 einfachen Schritten den passenden Handwerker finden.",
  robots: "index, follow",
};

export default function SoFunktioniertesPage() {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "@id": "https://www.fixius.de/sofunktioniertes/#howto",
    name: "So funktioniert Fixius",
    description: "Erfahren Sie, wie Sie in 3 einfachen Schritten den passenden Handwerker finden.",
    inLanguage: "de-DE",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Auftrag erstellen",
        text: "Beschreiben Sie Ihr Projekt und erstellen Sie einen Auftrag.",
        url: "https://www.fixius.de/sofunktioniertes#schritt-1",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Angebote erhalten",
        text: "Erhalten Sie Angebote von qualifizierten Handwerkern aus Ihrer Region.",
        url: "https://www.fixius.de/sofunktioniertes#schritt-2",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Handwerker auswählen",
        text: "Wählen Sie den besten Handwerker aus und starten Sie Ihr Projekt.",
        url: "https://www.fixius.de/sofunktioniertes#schritt-3",
      },
    ],
  };

  return (
    <main className="pt-24 md:pt-32 w-full overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      
      {/* Title Section - Premium Hero Style */}
      <section className="py-24 bg-white w-full">
        <div className="Container text-center max-w-7xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-black text-secondary leading-tight">So einfach <span className="text-primary italic">funktioniert es</span></h1>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            In nur drei einfachen Schritten zum perfekten Handwerker für Ihr Projekt.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <Steps isShowHeadingText={false} />

      {/* Trust Badge Section - New Listed Orders */}
      <NewListedOrders />

      {/* Best Rated Craftsmen */}
      <Craftsman />

      {/* Final Action Section */}
      <CTA />
    </main>
  );
}
