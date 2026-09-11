// pages/erdbewegungsunternehmen-in-der-naehe-finden.tsx

import Head from 'next/head';

const FindEarthmovingCompaniesNearby = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <meta
          name="description"
          content="Finde und beauftrage schnell und einfach Erdbewegungsunternehmen in deiner Nähe. Folge unseren einfachen Schritten, um das beste Unternehmen für Aushub, Nivellierung und Geländevorbereitung zu finden."
        />
      </Head>

      {/* <h1 className="text-3xl font-bold text-center mb-8">Erdbewegungsunternehmen in meiner Nähe finden</h1> */}

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Wie du das passende Erdbewegungsunternehmen findest</h2>
        <p className="mb-4">
          Das passende Unternehmen für Erdbewegungsarbeiten zu finden, kann eine Herausforderung sein, 
          aber mit unserer Plattform ist es einfach und unkompliziert. Folge diesen Schritten, 
          um das beste Unternehmen für Aushub, Nivellierung und Geländevorbereitung zu finden:
        </p>

        <div className="flex flex-wrap justify-center mb-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 1: Anfrage stellen</h3>
            <p>
              Beschreibe dein Erdbewegungsprojekt und stelle eine Anfrage auf unserer Plattform. 
              Je detaillierter die Beschreibung, desto passgenauer können wir dir Angebote liefern.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 2: Angebote vergleichen</h3>
            <p>
              Erhalte Angebote von qualifizierten Erdbewegungsunternehmen in deiner Nähe. 
              Vergleiche sie nach Preis, Bewertungen und Erfahrung.
            </p>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 3: Unternehmen beauftragen</h3>
            <p>
              Wähle das beste Angebot aus und beauftrage das Erdbewegungsunternehmen. 
              Dein Projekt ist in guten Händen.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Warum unsere Plattform?</h2>
        <ul className="list-disc list-inside">
          <li>Schneller und einfacher Prozess, um Angebote zu erhalten.</li>
          <li>Bewertungen und geprüfte Referenzen der Unternehmen.</li>
          <li>Transparenter Preisvergleich ohne versteckte Kosten.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Wie es funktioniert</h2>
        <p>
          Unser Ziel ist es, dir den besten Service zu bieten, damit du das ideale Erdbewegungsunternehmen für dein Projekt findest. 
          So funktioniert unser Ablauf:
        </p>
        <ul className="list-disc list-inside">
          <li><strong>Anfrage stellen:</strong> Nutze unser Online-Formular, um dein Projekt zu beschreiben.</li>
          <li><strong>Angebote erhalten:</strong> Wir verbinden dich mit qualifizierten Unternehmen in deiner Nähe.</li>
          <li><strong>Vergleichen und auswählen:</strong> Vergleiche die Angebote und wähle das beste für dein Projekt.</li>
        </ul>
      </section>

      <section>
        <p className="text-lg">
          Mit unserer Plattform findest du garantiert ein erfahrenes und vertrauenswürdiges Erdbewegungsunternehmen, 
          das dein Projekt professionell umsetzt. Starte jetzt deine Anfrage und mache den ersten Schritt zur erfolgreichen Geländevorbereitung!
        </p>
      </section>
    </div>
  );
};

export default FindEarthmovingCompaniesNearby;
