// pages/handwerker-fuer-kernbohrungen.tsx

import Head from 'next/head';

const FindCoreDrillingCraftsmenNearby = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <meta
          name="description"
          content="Finde und beauftrage schnell und einfach Handwerker für Kernbohrungen in deiner Nähe. Vergleiche Angebote und wähle den besten Profi für dein Bauprojekt."
        />
      </Head>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">So findest du den passenden Handwerker für Kernbohrungen</h2>
        <p className="mb-4">
          Den richtigen Handwerker für Kernbohrungen zu finden, kann schwierig sein. Mit unserer Plattform geht es schnell und einfach. Folge diesen Schritten, um den besten Fachmann für Beton-Kernbohrungen zu finden:
        </p>

        <div className="flex flex-wrap justify-center mb-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 1: Anfrage stellen</h3>
            <p>Beschreibe dein Kernbohr-Projekt genau, z. B. Durchmesser, Tiefe und Standort, und sende eine Anfrage über unsere Plattform. Je detaillierter die Angaben, desto besser die Angebote.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 2: Angebote vergleichen</h3>
            <p>Erhalte Angebote von qualifizierten Handwerkern für Kernbohrungen in deiner Nähe. Vergleiche sie nach Preis, Erfahrung und Referenzen.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 3: Auftrag vergeben</h3>
            <p>Wähle das beste Angebot aus und beauftrage den Handwerker. Dein Projekt ist in professionellen Händen.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Warum unsere Plattform?</h2>
        <ul className="list-disc list-inside">
          <li>Schneller und einfacher Prozess, um Angebote zu erhalten.</li>
          <li>Verifizierte Bewertungen und Referenzen der Handwerker.</li>
          <li>Transparenter Preisvergleich ohne versteckte Kosten.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">So funktioniert es</h2>
        <p>Unser Ziel ist es, dir den besten Service zu bieten, um den passenden Handwerker für Kernbohrungen zu finden:</p>
        <ul className="list-disc list-inside">
          <li><strong>Anfrage stellen:</strong> Beschreibe dein Kernbohr-Projekt im Online-Formular.</li>
          <li><strong>Angebote erhalten:</strong> Wir verbinden dich mit qualifizierten Handwerkern in deiner Nähe.</li>
          <li><strong>Vergleichen und auswählen:</strong> Vergleiche die Angebote und wähle das beste für dich aus.</li>
        </ul>
      </section>

      <section>
        <p className="text-lg">
          Mit unserer Plattform findest du einen erfahrenen und zuverlässigen Handwerker für Kernbohrungen. Starte jetzt deine Anfrage und gehe den ersten Schritt zu einer professionellen Beton-Kernbohrung!
        </p>
      </section>
    </div>
  );
};

export default FindCoreDrillingCraftsmenNearby;
