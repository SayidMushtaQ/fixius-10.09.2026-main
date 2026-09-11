// pages/tapezierer-und-sattler-in-der-naehe-finden.tsx

import Head from 'next/head';

const FindSaddlersAndUpholsterersNearby = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <meta
          name="description"
          content="Finde und beauftrage schnell und einfach Tapezierer und Sattler in deiner Nähe. Vergleiche Angebote für die Reparatur, Restaurierung und Herstellung von Polstermöbeln und Lederartikeln."
        />
      </Head>

      {/* <h1 className="text-3xl font-bold text-center mb-8">Tapezierer und Sattler in der Nähe finden</h1> */}

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Wie du den passenden Tapezierer oder Sattler findest</h2>
        <p className="mb-4">
          Den richtigen Fachmann für dein Projekt zu finden, kann herausfordernd sein. Mit unserer Plattform ist es jedoch einfach. Folge diesen Schritten:
        </p>

        <div className="flex flex-wrap justify-center mb-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 1: Anfrage stellen</h3>
            <p>
              Beschreibe dein Projekt, einschließlich des zu reparierenden, restaurierenden oder herzustellenden Möbelstücks oder Lederartikels, im Online-Formular. Je detaillierter die Beschreibung, desto passgenauer die Angebote.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 2: Angebote vergleichen</h3>
            <p>
              Erhalte Angebote von qualifizierten Tapezierern und Sattlern in deiner Nähe. Vergleiche Preis, Erfahrung und Bewertungen.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 3: Fachmann beauftragen</h3>
            <p>
              Wähle das beste Angebot aus und beauftrage den Tapezierer oder Sattler. Dein Projekt ist in guten Händen.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Warum unsere Plattform?</h2>
        <ul className="list-disc list-inside">
          <li>Schnell und einfach Angebote erhalten.</li>
          <li>Verifizierte Referenzen und Bewertungen der Fachleute.</li>
          <li>Transparenter Preisvergleich ohne versteckte Kosten.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">So funktioniert es</h2>
        <ul className="list-disc list-inside">
          <li><strong>Anfrage stellen:</strong> Beschreibe dein Projekt online.</li>
          <li><strong>Angebote erhalten:</strong> Wir verbinden dich mit qualifizierten Tapezierern und Sattlern in deiner Nähe.</li>
          <li><strong>Vergleichen und auswählen:</strong> Vergleiche die Angebote und wähle den besten Fachmann aus.</li>
        </ul>
      </section>

      <section>
        <p className="text-lg">
          Mit unserer Plattform findest du sicher einen erfahrenen und vertrauenswürdigen Tapezierer oder Sattler für dein Projekt. Starte jetzt deine Anfrage und bring deine Möbel und Lederartikel professionell in Top-Zustand!
        </p>
      </section>
    </div>
  );
};

export default FindSaddlersAndUpholsterersNearby;
