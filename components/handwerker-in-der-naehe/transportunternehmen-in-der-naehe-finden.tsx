// pages/transportunternehmen-in-der-naehe-finden.tsx

import Head from 'next/head';

const FindTransportCompaniesNearby = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <meta
          name="description"
          content="Finde und beauftrage schnell und einfach Transportunternehmen in deiner Nähe. Folge unseren einfachen Schritten, um den besten Anbieter für deinen Umzug, Warenverkehr oder andere Transportbedürfnisse zu finden."
        />
      </Head>

      {/* <h1 className="text-3xl font-bold text-center mb-8">Transportunternehmen in meiner Nähe finden</h1> */}

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Wie du das passende Transportunternehmen findest</h2>
        <p className="mb-4">
          Das passende Transportunternehmen für dein Vorhaben zu finden kann herausfordernd sein, 
          aber mit unserer Plattform ist es einfach und unkompliziert. Folge diesen Schritten, 
          um den besten Anbieter für deine Transportbedürfnisse zu finden:
        </p>

        <div className="flex flex-wrap justify-center mb-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 1: Anfrage stellen</h3>
            <p>
              Beschreibe dein Transportvorhaben, sei es für einen Umzug, Warentransport oder andere Transportleistungen. 
              Gib Details wie Versandvolumen, Entfernung und besondere Anforderungen an.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 2: Angebote vergleichen</h3>
            <p>
              Erhalte Angebote von qualifizierten Transportunternehmen in deiner Nähe. 
              Vergleiche sie nach Preis, angebotenen Leistungen und Bewertungen.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 3: Anbieter beauftragen</h3>
            <p>
              Wähle das beste Angebot aus und beauftrage das Transportunternehmen. 
              Dein Auftrag ist in sicheren Händen.
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
          Unser Ziel ist es, dir den besten Service zu bieten, damit du das ideale Transportunternehmen für dein Projekt findest. So funktioniert der Ablauf:
        </p>
        <ul className="list-disc list-inside">
          <li><strong>Anfrage stellen:</strong> Nutze unser Online-Formular, um deine Transportbedürfnisse zu beschreiben.</li>
          <li><strong>Angebote erhalten:</strong> Wir verbinden dich mit qualifizierten Transportunternehmen in deiner Nähe.</li>
          <li><strong>Vergleichen und auswählen:</strong> Vergleiche die erhaltenen Angebote und wähle das beste für dein Projekt.</li>
        </ul>
      </section>

      <section>
        <p className="text-lg">
          Mit unserer Plattform findest du garantiert ein erfahrenes und vertrauenswürdiges Transportunternehmen, 
          das dein Vorhaben professionell und effizient umsetzt. Starte jetzt deine Anfrage und mache den ersten Schritt zu einem sicheren Transport!
        </p>
      </section>
    </div>
  );
};

export default FindTransportCompaniesNearby;
