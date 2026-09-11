// pages/gebaeudereinigung-in-der-naehe-finden.tsx

import Head from 'next/head';

const FindBuildingCleaningServiceNearby = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <meta
          name="description"
          content="Finde und beauftrage schnell und einfach einen Gebäudereinigungsservice in deiner Nähe. Vergleiche Angebote für die Reinigung deiner Einrichtungen."
        />
      </Head>

      {/* <h1 className="text-3xl font-bold text-center mb-8">Gebäudereinigung in der Nähe finden</h1> */}

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Wie du den passenden Gebäudereinigungsservice findest</h2>
        <p className="mb-4">
          Den passenden Service für die Reinigung deines Gebäudes zu finden, kann schwierig sein. Mit unserer Plattform ist es jedoch einfach. Folge diesen Schritten:
        </p>

        <div className="flex flex-wrap justify-center mb-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 1: Anfrage stellen</h3>
            <p>Beschreibe deine Reinigungsanforderungen detailliert in unserem Online-Formular. Je mehr Informationen du angibst, desto gezielter können passende Angebote vermittelt werden.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 2: Angebote vergleichen</h3>
            <p>Erhalte Angebote von qualifizierten Reinigungsfirmen in deiner Nähe. Vergleiche Preis, Serviceleistungen und Bewertungen.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 3: Service beauftragen</h3>
            <p>Wähle das passende Angebot aus und beauftrage den Reinigungsservice. Dein Gebäude ist in guten Händen.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Warum unsere Plattform?</h2>
        <ul className="list-disc list-inside">
          <li>Schnell und einfach Angebote erhalten.</li>
          <li>Verifizierte Referenzen und Bewertungen der Reinigungsfirmen.</li>
          <li>Transparenter Preisvergleich ohne versteckte Kosten.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">So funktioniert es</h2>
        <ul className="list-disc list-inside">
          <li><strong>Anfrage stellen:</strong> Beschreibe deine Reinigungsbedürfnisse in unserem Formular.</li>
          <li><strong>Angebote erhalten:</strong> Wir verbinden dich mit qualifizierten Reinigungsfirmen in deiner Nähe.</li>
          <li><strong>Vergleichen und auswählen:</strong> Vergleiche die Angebote und wähle das beste für dein Gebäude.</li>
        </ul>
      </section>

      <section>
        <p className="text-lg">
          Mit unserer Plattform findest du sicher einen erfahrenen und vertrauenswürdigen Gebäudereinigungsservice. Starte jetzt deine Anfrage und sorge für ein sauberes und gesundes Umfeld!
        </p>
      </section>
    </div>
  );
};

export default FindBuildingCleaningServiceNearby;
