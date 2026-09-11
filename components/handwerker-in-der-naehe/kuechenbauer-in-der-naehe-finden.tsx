// pages/kuechenbauer-in-der-naehe-finden.tsx

import Head from 'next/head';

const KuechenbauerInDerNaheFinden = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <meta
          name="description"
          content="Finde und beauftrage schnell und einfach einen Küchenbauer in deiner Nähe. Folge unseren einfachen Schritten, um den besten Fachmann für Planung, Installation und Renovierung deiner Küche zu finden."
        />
      </Head>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Wie du den passenden Küchenbauer findest</h2>
        <p className="mb-4">
          Den richtigen Küchenbauer für dein Projekt zu finden, kann eine Herausforderung sein. Mit unserer Plattform ist es jedoch einfach. Folge diesen Schritten, um den besten Fachmann für die Planung und Installation deiner Küche zu finden:
        </p>

        <div className="flex flex-wrap justify-center mb-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 1: Anfragen</h3>
            <p>
              Beschreibe dein Küchenprojekt und sende eine Anfrage über unsere Plattform. Je detaillierter deine Angaben sind, desto besser können wir dir passende Angebote vermitteln.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 2: Angebote vergleichen</h3>
            <p>
              Erhalte Angebote von qualifizierten Küchenbauern in deiner Nähe. Vergleiche die Angebote nach Preis, Bewertungen und Erfahrung.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 3: Beauftragen</h3>
            <p>
              Wähle das beste Angebot aus und beauftrage den Küchenbauer. Dein Projekt ist in guten Händen.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Warum unsere Plattform?</h2>
        <ul className="list-disc list-inside">
          <li>Schneller und einfacher Prozess, um Angebote zu erhalten.</li>
          <li>Überprüfte Bewertungen und Referenzen der Fachleute.</li>
          <li>Transparenter Preisvergleich ohne versteckte Kosten.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">So funktioniert es</h2>
        <p>
          Unser Ziel ist es, dir den besten Küchenbauer für dein Projekt zu vermitteln. So funktioniert der Prozess:
        </p>
        <ul className="list-disc list-inside">
          <li><strong>Anfragen:</strong> Beschreibe dein Küchenprojekt über unser Online-Formular.</li>
          <li><strong>Angebote erhalten:</strong> Wir verbinden dich mit qualifizierten Küchenbauern in deiner Nähe.</li>
          <li><strong>Vergleichen & auswählen:</strong> Vergleiche die erhaltenen Angebote und wähle das Beste für dich aus.</li>
        </ul>
      </section>

      <section>
        <p className="text-lg">
          Mit unserer Plattform findest du einen erfahrenen und vertrauenswürdigen Küchenbauer für dein Projekt. Starte jetzt deine Anfrage und gehe den ersten Schritt zu einer professionellen Kücheninstallation oder Renovierung!
        </p>
      </section>
    </div>
  );
};

export default KuechenbauerInDerNaheFinden;
