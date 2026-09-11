// pages/encontrar-klimatechniker-cerca-de-ti.tsx

import Head from 'next/head';

const FindACTechnicianNearby = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <meta
          name="description"
          content="Finde und beauftrage schnell und einfach einen Klimatechniker in deiner Nähe. Folge unseren einfachen Schritten, um den besten Fachmann für deine Klimaanlage zu finden."
        />
      </Head>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Wie du den passenden Klimatechniker findest</h2>
        <p className="mb-4">
          Einen qualifizierten Klimatechniker für deine Klimaanlage zu finden, kann eine Herausforderung sein. Mit unserer Plattform geht es jedoch einfach und schnell. Folge diesen Schritten:
        </p>

        <div className="flex flex-wrap justify-center mb-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 1: Anfrage stellen</h3>
            <p>
              Beschreibe dein Anliegen oder Problem mit der Klimaanlage und stelle eine Anfrage über unsere Plattform. Je detaillierter die Beschreibung, desto passender sind die Angebote.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 2: Angebote vergleichen</h3>
            <p>
              Erhalte Angebote von qualifizierten Klimatechnikern in deiner Nähe. Vergleiche die Angebote anhand von Preis, Erfahrung und Bewertungen.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 3: Klimatechniker beauftragen</h3>
            <p>
              Wähle das beste Angebot aus und beauftrage den Klimatechniker. Deine Klimaanlage ist in guten Händen.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Warum unsere Plattform?</h2>
        <ul className="list-disc list-inside">
          <li>Einfacher und schneller Prozess für Angebotsanfragen.</li>
          <li>Verifizierte Bewertungen und Referenzen der Klimatechniker.</li>
          <li>Transparenter Preisvergleich ohne versteckte Kosten.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">So funktioniert es</h2>
        <ul className="list-disc list-inside">
          <li><strong>Anfrage stellen:</strong> Nutze unser Online-Formular, um dein Anliegen zu beschreiben.</li>
          <li><strong>Angebote erhalten:</strong> Wir verbinden dich mit qualifizierten Klimatechnikern in deiner Nähe.</li>
          <li><strong>Vergleichen & Auswählen:</strong> Vergleiche die Angebote und wähle den besten Klimatechniker aus.</li>
        </ul>
      </section>

      <section>
        <p className="text-lg">
          Mit unserer Plattform findest du einen erfahrenen und zuverlässigen Klimatechniker für deine Klimaanlage. Starte jetzt deine Anfrage und genieße bald ein angenehmes Raumklima!
        </p>
      </section>
    </div>
  );
};

export default FindACTechnicianNearby;
