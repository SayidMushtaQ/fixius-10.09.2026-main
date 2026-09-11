// pages/abriss-und-entsorgungsservice-in-der-naehe-finden.tsx

import Head from 'next/head';

const FindDemolitionAndDisposalServicesNearby = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <meta
          name="description"
          content="Finde und beauftrage schnell und einfach einen Abriss- und Entsorgungsservice in deiner Nähe. Vergleiche Angebote für dein Projekt zur Demolierung und Entsorgung von Schutt."
        />
      </Head>

      {/* <h1 className="text-3xl font-bold text-center mb-8">Abriss- und Entsorgungsservice in der Nähe finden</h1> */}

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Wie du den passenden Abriss- und Entsorgungsservice findest</h2>
        <p className="mb-4">
          Den passenden Service für Abriss und Schuttentsorgung zu finden, kann schwierig sein. Mit unserer Plattform ist es jedoch einfach. Folge diesen Schritten:
        </p>

        <div className="flex flex-wrap justify-center mb-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 1: Anfrage stellen</h3>
            <p>Beschreibe dein Abriss- und Entsorgungsprojekt in unserem Online-Formular. Je detaillierter die Beschreibung, desto gezielter können passende Angebote vermittelt werden.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 2: Angebote vergleichen</h3>
            <p>Erhalte Angebote von qualifizierten Abriss- und Entsorgungsdiensten in deiner Nähe. Vergleiche Preis, Bewertungen und Erfahrung.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 3: Service beauftragen</h3>
            <p>Wähle das passende Angebot aus und beauftrage den Abriss- und Entsorgungsservice. Dein Projekt ist in sicheren Händen.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Warum unsere Plattform?</h2>
        <ul className="list-disc list-inside">
          <li>Schnell und einfach Angebote erhalten.</li>
          <li>Verifizierte Referenzen und Bewertungen der Fachkräfte.</li>
          <li>Transparenter Preisvergleich ohne versteckte Kosten.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">So funktioniert es</h2>
        <ul className="list-disc list-inside">
          <li><strong>Anfrage stellen:</strong> Beschreibe dein Abriss- und Entsorgungsprojekt in unserem Formular.</li>
          <li><strong>Angebote erhalten:</strong> Wir verbinden dich mit qualifizierten Fachkräften in deiner Nähe.</li>
          <li><strong>Vergleichen und auswählen:</strong> Vergleiche die Angebote und wähle das beste für dein Projekt.</li>
        </ul>
      </section>

      <section>
        <p className="text-lg">
          Mit unserer Plattform findest du sicher einen erfahrenen und vertrauenswürdigen Abriss- und Entsorgungsservice. Starte jetzt deine Anfrage und setze dein Projekt effizient um!
        </p>
      </section>
    </div>
  );
};

export default FindDemolitionAndDisposalServicesNearby;
