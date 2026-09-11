// pages/autowerkstatt-in-der-naehe-finden.tsx

import Head from 'next/head';

const FindCarWorkshopsNearby = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <meta
          name="description"
          content="Finde und beauftrage schnell und einfach eine Autowerkstatt in deiner Nähe. Vergleiche Angebote für Reparatur und Wartung deines Fahrzeugs."
        />
      </Head>

      {/* <h1 className="text-3xl font-bold text-center mb-8">Autowerkstatt in der Nähe finden</h1> */}

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Wie du die passende Autowerkstatt findest</h2>
        <p className="mb-4">
          Die richtige Werkstatt für dein Fahrzeug zu finden, kann herausfordernd sein. Mit unserer Plattform ist es jedoch einfach. Folge diesen Schritten:
        </p>

        <div className="flex flex-wrap justify-center mb-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 1: Anfrage stellen</h3>
            <p>
              Beschreibe das Problem oder den Reparaturbedarf deines Fahrzeugs im Online-Formular. Je detaillierter die Beschreibung, desto passgenauer die Angebote.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 2: Angebote vergleichen</h3>
            <p>
              Erhalte Angebote von qualifizierten Autowerkstätten in deiner Nähe. Vergleiche Preis, Bewertungen und Erfahrung.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 3: Werkstatt beauftragen</h3>
            <p>
              Wähle das beste Angebot aus und beauftrage die Werkstatt. Dein Fahrzeug ist in guten Händen.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Warum unsere Plattform?</h2>
        <ul className="list-disc list-inside">
          <li>Schnell und einfach Angebote erhalten.</li>
          <li>Verifizierte Referenzen und Bewertungen der Werkstätten.</li>
          <li>Transparenter Preisvergleich ohne versteckte Kosten.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">So funktioniert es</h2>
        <ul className="list-disc list-inside">
          <li><strong>Anfrage stellen:</strong> Beschreibe dein Problem oder den Reparaturbedarf online.</li>
          <li><strong>Angebote erhalten:</strong> Wir verbinden dich mit qualifizierten Autowerkstätten in deiner Nähe.</li>
          <li><strong>Vergleichen und auswählen:</strong> Vergleiche die Angebote und wähle die beste Werkstatt aus.</li>
        </ul>
      </section>

      <section>
        <p className="text-lg">
          Mit unserer Plattform findest du sicher eine erfahrene und vertrauenswürdige Autowerkstatt. Starte jetzt deine Anfrage und bring dein Fahrzeug professionell wieder auf die Straße!
        </p>
      </section>
    </div>
  );
};

export default FindCarWorkshopsNearby;
