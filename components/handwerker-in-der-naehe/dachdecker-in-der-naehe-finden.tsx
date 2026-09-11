// pages/dachdecker-in-der-naehe-finden.tsx

import Head from 'next/head';

const FindRoofersNearby = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <meta
          name="description"
          content="Finde und beauftrage schnell und einfach Dachdecker in deiner Nähe. Vergleiche Angebote für Installation, Reparatur und Wartung von Dächern."
        />
      </Head>

      {/* <h1 className="text-3xl font-bold text-center mb-8">Dachdecker in der Nähe finden</h1> */}

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Wie du den passenden Dachdecker findest</h2>
        <p className="mb-4">
          Den richtigen Dachdecker für dein Projekt zu finden, kann herausfordernd sein. Mit unserer Plattform ist es jedoch einfach. Folge diesen Schritten:
        </p>

        <div className="flex flex-wrap justify-center mb-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 1: Anfrage stellen</h3>
            <p>
              Beschreibe dein Dachprojekt, einschließlich Dachtyp, gewünschtem Material und eventuell bestehenden Problemen, im Online-Formular. Je detaillierter die Beschreibung, desto passgenauer die Angebote.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 2: Angebote vergleichen</h3>
            <p>
              Erhalte Angebote von qualifizierten Dachdeckern in deiner Nähe. Vergleiche Preis, Erfahrung und Bewertungen.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 3: Dachdecker beauftragen</h3>
            <p>
              Wähle das beste Angebot aus und beauftrage den Dachdecker. Dein Dachprojekt ist in sicheren Händen.
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
          <li><strong>Anfrage stellen:</strong> Beschreibe dein Dachprojekt online.</li>
          <li><strong>Angebote erhalten:</strong> Wir verbinden dich mit qualifizierten Dachdeckern in deiner Nähe.</li>
          <li><strong>Vergleichen und auswählen:</strong> Vergleiche die Angebote und wähle den besten Dachdecker aus.</li>
        </ul>
      </section>

      <section>
        <p className="text-lg">
          Mit unserer Plattform findest du sicher einen erfahrenen und vertrauenswürdigen Dachdecker für dein Projekt. Starte jetzt deine Anfrage und gehe den ersten Schritt zu einem neuen oder reparierten Dach von hoher Qualität!
        </p>
      </section>
    </div>
  );
};

export default FindRoofersNearby;
