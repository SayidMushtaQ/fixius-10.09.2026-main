// pages/stuckateur-in-der-naehe-finden.tsx

import Head from 'next/head';

const FindPlasterersNearby = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <meta
          name="description"
          content="Finde und beauftrage schnell und einfach einen Stuckateur in deiner Nähe. Folge unseren einfachen Schritten, um den besten Fachmann für Putz- und Trockenbauarbeiten sowie Reparaturen an Wänden und Decken zu finden."
        />
      </Head>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Wie du den passenden Stuckateur findest</h2>
        <p className="mb-4">
          Einen qualifizierten Stuckateur für deine Putz- oder Reparaturarbeiten an Wänden und Decken zu finden, kann eine Herausforderung sein. Mit unserer Plattform geht es jedoch einfach und schnell. Folge diesen Schritten:
        </p>

        <div className="flex flex-wrap justify-center mb-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 1: Anfrage stellen</h3>
            <p>
              Beschreibe dein Projekt detailliert und stelle eine Anfrage über unsere Plattform. Je genauer die Beschreibung, desto passender die Angebote.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 2: Angebote vergleichen</h3>
            <p>
              Erhalte Angebote von qualifizierten Stuckateuren in deiner Nähe. Vergleiche sie nach Preis, Erfahrung und Bewertungen.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 3: Stuckateur beauftragen</h3>
            <p>
              Wähle das beste Angebot aus und beauftrage den Stuckateur. Dein Projekt ist in guten Händen.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Warum unsere Plattform?</h2>
        <ul className="list-disc list-inside">
          <li>Schneller und einfacher Prozess für Angebotsanfragen.</li>
          <li>Verifizierte Bewertungen und Referenzen der Fachleute.</li>
          <li>Transparenter Preisvergleich ohne versteckte Kosten.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">So funktioniert es</h2>
        <ul className="list-disc list-inside">
          <li><strong>Anfrage stellen:</strong> Nutze unser Online-Formular, um dein Projekt zu beschreiben.</li>
          <li><strong>Angebote erhalten:</strong> Wir verbinden dich mit qualifizierten Stuckateuren in deiner Nähe.</li>
          <li><strong>Vergleichen & Auswählen:</strong> Vergleiche die Angebote und wähle den besten Stuckateur aus.</li>
        </ul>
      </section>

      <section>
        <p className="text-lg">
          Mit unserer Plattform findest du einen erfahrenen und zuverlässigen Stuckateur für deine Projekte. Starte jetzt deine Anfrage und sichere dir ein professionelles und langlebiges Ergebnis für deine Wände und Decken!
        </p>
      </section>
    </div>
  );
};

export default FindPlasterersNearby;
