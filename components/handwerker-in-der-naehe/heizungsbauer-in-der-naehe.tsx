// pages/heizungsbauer-in-der-naehe.tsx

import Head from 'next/head';

const FindHeatingBuildersNearby = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <meta
          name="description"
          content="Finde und beauftrage schnell und einfach Heizungsbauer in deiner Nähe. Unsere Plattform hilft dir, den besten Fachmann für Installation, Reparatur und Wartung deiner Heizungsanlage zu finden."
        />
      </Head>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">So findest du den richtigen Heizungsbauer</h2>
        <p className="mb-4">
          Den passenden Heizungsbauer für dein Projekt zu finden kann schwierig sein. Mit unserer Plattform geht es einfach und unkompliziert. Folge diesen Schritten, um den besten Fachmann für Installation, Reparatur oder Wartung deiner Heizungsanlage zu finden:
        </p>

        <div className="flex flex-wrap justify-center mb-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 1: Anfrage stellen</h3>
            <p>
              Beschreibe dein Heizungsprojekt und stelle eine Anfrage über unsere Plattform. Je genauer die Beschreibung, desto besser können wir passende Angebote vermitteln.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 2: Angebote vergleichen</h3>
            <p>
              Erhalte Angebote von qualifizierten Heizungsbauern in deiner Nähe. Vergleiche die Angebote anhand von Preis, Bewertungen und Erfahrung.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 3: Auftrag vergeben</h3>
            <p>
              Wähle das beste Angebot aus und beauftrage den Heizungsbauer. Dein Projekt ist in guten Händen.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Warum unsere Plattform?</h2>
        <ul className="list-disc list-inside">
          <li>Schneller und einfacher Prozess, um Angebote zu erhalten.</li>
          <li>Verifizierte Bewertungen und Referenzen der Fachleute.</li>
          <li>Transparenter Preisvergleich ohne versteckte Kosten.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">So funktioniert es</h2>
        <ul className="list-disc list-inside">
          <li><strong>Anfrage stellen:</strong> Beschreibe dein Projekt online.</li>
          <li><strong>Angebote erhalten:</strong> Wir verbinden dich mit qualifizierten Heizungsbauern in deiner Nähe.</li>
          <li><strong>Vergleichen und auswählen:</strong> Vergleiche die Angebote und wähle das beste für dich aus.</li>
        </ul>
      </section>

      <section>
        <p className="text-lg">
          Mit unserer Plattform findest du zuverlässig einen erfahrenen und vertrauenswürdigen Heizungsbauer. Starte jetzt deine Anfrage und bring dein Heizungsprojekt professionell voran!
        </p>
      </section>
    </div>
  );
};

export default FindHeatingBuildersNearby;
