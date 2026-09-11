// pages/bodenleger-in-der-naehe.tsx

import Head from 'next/head';

const FindFlooringInstallersNearby = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <meta
          name="description"
          content="Finde und beauftrage schnell und einfach Bodenleger in deiner Nähe. Unsere Plattform hilft dir, den besten Fachmann für die Verlegung von Holz-, Laminat-, Fliesen- oder Teppichböden zu finden."
        />
      </Head>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">So findest du den richtigen Bodenleger</h2>
        <p className="mb-4">
          Den passenden Bodenleger für dein Projekt zu finden kann herausfordernd sein. Mit unserer Plattform geht es einfach und unkompliziert. Folge diesen Schritten, um den besten Fachmann für die Verlegung deines Bodens zu finden:
        </p>

        <div className="flex flex-wrap justify-center mb-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 1: Anfrage stellen</h3>
            <p>
              Beschreibe dein Bodenprojekt, inklusive Art des Bodens (Holz, Laminat, Fliesen, Teppich), Fläche und besondere Anforderungen, und stelle eine Anfrage über unsere Plattform. Je genauer die Angaben, desto besser die passenden Angebote.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 2: Angebote vergleichen</h3>
            <p>
              Erhalte Angebote von qualifizierten Bodenlegern in deiner Nähe. Vergleiche sie anhand von Preis, Erfahrung und Kundenbewertungen.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 3: Auftrag vergeben</h3>
            <p>
              Wähle das beste Angebot aus und beauftrage den Bodenleger. Dein Projekt ist in professionellen Händen.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Warum unsere Plattform?</h2>
        <ul className="list-disc list-inside">
          <li>Schneller und einfacher Prozess, um Angebote zu erhalten.</li>
          <li>Verifizierte Bewertungen und Referenzen der Fachleute.</li>
          <li>Transparenter Preisvergleich ohne versteckte Kosten.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">So funktioniert es</h2>
        <ul className="list-disc list-inside">
          <li><strong>Anfrage stellen:</strong> Beschreibe dein Projekt online.</li>
          <li><strong>Angebote erhalten:</strong> Wir verbinden dich mit qualifizierten Bodenlegern in deiner Nähe.</li>
          <li><strong>Vergleichen und auswählen:</strong> Vergleiche die Angebote und wähle das beste aus.</li>
        </ul>
      </section>

      <section>
        <p className="text-lg">
          Mit unserer Plattform findest du zuverlässig einen erfahrenen und vertrauenswürdigen Bodenleger. Starte jetzt deine Anfrage und bring dein Bodenprojekt professionell voran!
        </p>
      </section>
    </div>
  );
};

export default FindFlooringInstallersNearby;
