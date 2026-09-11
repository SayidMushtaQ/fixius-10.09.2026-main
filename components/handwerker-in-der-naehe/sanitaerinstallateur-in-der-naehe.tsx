// pages/sanitärinstallateur-in-der-naehe.tsx

import Head from 'next/head';

const FindPlumbingInstallersNearby = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <meta
          name="description"
          content="Finde und beauftrage schnell und einfach einen Sanitärinstallateur in deiner Nähe. Unsere Plattform hilft dir, den besten Fachmann für Installation, Reparatur und Wartung von Sanitärsystemen zu finden."
        />
      </Head>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">So findest du den richtigen Sanitärinstallateur</h2>
        <p className="mb-4">
          Den passenden Sanitärinstallateur für dein Projekt zu finden kann schwierig sein. Mit unserer Plattform geht es einfach und unkompliziert. Folge diesen Schritten, um den besten Fachmann für Installation, Reparatur oder Wartung deiner Sanitäranlagen zu finden:
        </p>

        <div className="flex flex-wrap justify-center mb-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 1: Anfrage stellen</h3>
            <p>
              Beschreibe dein Sanitärprojekt, inklusive Details zu den Anlagen, benötigten Installationen oder bestehenden Problemen, und stelle eine Anfrage über unsere Plattform. Je genauer die Beschreibung, desto besser können wir passende Angebote vermitteln.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 2: Angebote vergleichen</h3>
            <p>
              Erhalte Angebote von qualifizierten Sanitärinstallateuren in deiner Nähe. Vergleiche die Angebote nach Preis, Erfahrung und Bewertungen.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 3: Auftrag vergeben</h3>
            <p>
              Wähle das beste Angebot aus und beauftrage den Sanitärinstallateur. Dein Projekt ist in guten Händen.
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
          <li><strong>Angebote erhalten:</strong> Wir verbinden dich mit qualifizierten Sanitärinstallateuren in deiner Nähe.</li>
          <li><strong>Vergleichen und auswählen:</strong> Vergleiche die Angebote und wähle das beste für dich aus.</li>
        </ul>
      </section>

      <section>
        <p className="text-lg">
          Mit unserer Plattform findest du zuverlässig einen erfahrenen und vertrauenswürdigen Sanitärinstallateur. Starte jetzt deine Anfrage und bring dein Sanitärprojekt professionell voran!
        </p>
      </section>
    </div>
  );
};

export default FindPlumbingInstallersNearby;
