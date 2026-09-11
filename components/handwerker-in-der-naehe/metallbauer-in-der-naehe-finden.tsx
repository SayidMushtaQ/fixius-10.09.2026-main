// pages/metallbauer-in-der-naehe-finden.tsx

import Head from 'next/head';

const FindMetalFabricatorsNearby = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <meta
          name="description"
          content="Finde und beauftrage schnell und einfach Metallbauer in deiner Nähe. Folge unseren einfachen Schritten, um den besten Anbieter für deine Fertigungsprojekte und Montage von Metallkomponenten zu finden."
        />
      </Head>

      {/* <h1 className="text-3xl font-bold text-center mb-8">Metallbauer in meiner Nähe finden</h1> */}

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Wie du den passenden Metallbauer findest</h2>
        <p className="mb-4">
          Den richtigen Metallbauer für dein Projekt zu finden kann herausfordernd sein, 
          aber mit unserer Plattform ist es einfach und unkompliziert. Folge diesen Schritten:
        </p>

        <div className="flex flex-wrap justify-center mb-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 1: Anfrage stellen</h3>
            <p>
              Beschreibe dein Fertigungsprojekt aus Metall und stelle eine Anfrage über unsere Plattform. 
              Je detaillierter die Beschreibung, desto passender die Angebote.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 2: Angebote vergleichen</h3>
            <p>
              Erhalte Angebote von qualifizierten Metallbauern in deiner Nähe. Vergleiche sie nach Preis, Fähigkeiten und Erfahrung.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 3: Metallbauer beauftragen</h3>
            <p>
              Wähle das beste Angebot aus und beauftrage den Metallbauer. Dein Projekt ist in sicheren Händen.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Warum unsere Plattform?</h2>
        <ul className="list-disc list-inside">
          <li>Schneller und einfacher Prozess, um Angebote zu erhalten.</li>
          <li>Bewertungen und geprüfte Referenzen der Anbieter.</li>
          <li>Transparenter Preisvergleich ohne versteckte Kosten.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Wie es funktioniert</h2>
        <p>
          Unser Ziel ist es, dir den besten Service zu bieten, damit du den idealen Metallbauer für dein Projekt findest. So funktioniert der Ablauf:
        </p>
        <ul className="list-disc list-inside">
          <li><strong>Anfrage stellen:</strong> Nutze unser Online-Formular, um dein Metallprojekt zu beschreiben.</li>
          <li><strong>Angebote erhalten:</strong> Wir verbinden dich mit qualifizierten Metallbauern in deiner Nähe.</li>
          <li><strong>Vergleichen und auswählen:</strong> Vergleiche die Angebote und wähle das beste aus.</li>
        </ul>
      </section>

      <section>
        <p className="text-lg">
          Mit unserer Plattform findest du garantiert einen erfahrenen und vertrauenswürdigen Metallbauer für dein Projekt. 
          Starte jetzt deine Anfrage und beginne dein Projekt professionell und hochwertig umzusetzen!
        </p>
      </section>
    </div>
  );
};

export default FindMetalFabricatorsNearby;
