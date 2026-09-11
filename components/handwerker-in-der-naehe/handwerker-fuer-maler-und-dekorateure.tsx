// pages/handwerker-fuer-maler-und-dekorateure.tsx

import Head from 'next/head';

const FindPaintersAndDecoratorsNearby = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <meta
          name="description"
          content="Finde und beauftrage schnell und einfach Maler und Dekorateure in deiner Nähe. Vergleiche Angebote und wähle den besten Fachmann für dein Maler- und Dekorationsprojekt."
        />
      </Head>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">So findest du den passenden Maler oder Dekorateur</h2>
        <p className="mb-4">
          Den richtigen Maler oder Dekorateur zu finden, kann schwierig sein. Mit unserer Plattform geht es schnell und einfach. Folge diesen Schritten, um den besten Fachmann für dein Projekt zu finden:
        </p>

        <div className="flex flex-wrap justify-center mb-8">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 1: Anfrage stellen</h3>
            <p>
              Beschreibe dein Maler- oder Dekorationsprojekt, einschließlich Art der Arbeiten, zu behandelnder Flächen und Designvorlieben, und sende eine Anfrage über unsere Plattform. Je detaillierter die Angaben, desto besser die Angebote.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 2: Angebote vergleichen</h3>
            <p>
              Erhalte Angebote von qualifizierten Malern und Dekorateuren in deiner Nähe. Vergleiche sie nach Preis, Arbeitsqualität und Bewertungen.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mx-4 mb-4 md:w-1/3 text-center">
            <h3 className="text-xl font-bold mb-2">Schritt 3: Auftrag vergeben</h3>
            <p>
              Wähle das beste Angebot aus und beauftrage den Maler oder Dekorateur. Dein Projekt ist in professionellen Händen.
            </p>
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
        <p>Unser Ziel ist es, dir den besten Service zu bieten, um den passenden Maler oder Dekorateur zu finden:</p>
        <ul className="list-disc list-inside">
          <li><strong>Anfrage stellen:</strong> Beschreibe dein Maler- oder Dekorationsprojekt im Online-Formular.</li>
          <li><strong>Angebote erhalten:</strong> Wir verbinden dich mit qualifizierten Handwerkern in deiner Nähe.</li>
          <li><strong>Vergleichen und auswählen:</strong> Vergleiche die Angebote und wähle das beste für dich aus.</li>
        </ul>
      </section>

      <section>
        <p className="text-lg">
          Mit unserer Plattform findest du einen erfahrenen und zuverlässigen Maler oder Dekorateur. Starte jetzt deine Anfrage und gehe den ersten Schritt zu einem professionellen und stilvollen Ergebnis in deinem Zuhause oder Büro!
        </p>
      </section>
    </div>
  );
};

export default FindPaintersAndDecoratorsNearby;
