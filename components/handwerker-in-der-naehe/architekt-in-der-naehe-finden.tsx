// pages/architekt-in-der-naehe-finden.tsx

import Head from 'next/head';

const FindArchitectsNearby = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <meta
          name="description"
          content="Finde und beauftrage schnell und einfach Architekten in deiner Nähe für Bauprojekte, Planung und Baupläne. Vergleiche Angebote und wähle den besten Fachmann für dein Projekt."
        />
      </Head>

      {/* <h1 className="text-3xl font-bold text-center mb-8">Architekt in der Nähe finden</h1> */}

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Wie du den passenden Architekten findest</h2>
        <p className="mb-4">
          Einen geeigneten Architekten für dein Bauprojekt zu finden, kann schwierig sein. Mit unserer Plattform ist es jedoch einfach. Folge diesen Schritten, um den besten Fachmann für deine Planung und Baupläne zu finden:
        </p>

        <div className="flex flex-wrap justify-center mb-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 1: Anfrage stellen</h3>
            <p>Beschreibe dein Bauprojekt detailliert in unserem Online-Formular. Je mehr Informationen du angibst, desto gezielter können wir passende Angebote vermitteln.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 2: Angebote vergleichen</h3>
            <p>Erhalte Angebote von qualifizierten Architekten in deiner Nähe. Vergleiche Preis, Erfahrung und Bewertungen, um die beste Wahl zu treffen.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 3: Architekt beauftragen</h3>
            <p>Wähle das passende Angebot aus und beauftrage den Architekten. Dein Bauprojekt ist in guten Händen.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Warum unsere Plattform?</h2>
        <ul className="list-disc list-inside">
          <li>Schnell und einfach Angebote von Architekten erhalten.</li>
          <li>Verifizierte Referenzen und Bewertungen der Fachleute.</li>
          <li>Transparenter Preisvergleich ohne versteckte Kosten.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">So funktioniert es</h2>
        <ul className="list-disc list-inside">
          <li><strong>Anfrage stellen:</strong> Beschreibe dein Bauprojekt in unserem Formular.</li>
          <li><strong>Angebote erhalten:</strong> Wir verbinden dich mit qualifizierten Architekten in deiner Nähe.</li>
          <li><strong>Vergleichen und auswählen:</strong> Vergleiche die Angebote und wähle den besten Architekten für dein Projekt.</li>
        </ul>
      </section>

      <section>
        <p className="text-lg">
          Mit unserer Plattform kannst du sicher sein, einen erfahrenen und vertrauenswürdigen Architekten für dein Bauprojekt zu finden. Starte jetzt deine Anfrage und lege den Grundstein für ein erfolgreiches Projekt!
        </p>
      </section>
    </div>
  );
};

export default FindArchitectsNearby;
