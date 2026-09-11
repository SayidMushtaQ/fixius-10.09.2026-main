import React from "react";

export default function ActivationSettingHS() {
  return (
    <div className="px-7 py-5 w-full md:w-3/4 mx-auto">
      <div className="flex justify-between items-center flex-wrap gap-5">
        <div className="space-y-4">
          <section>
            <h1 className="text-2xl font-bold">Konto überprüfen</h1>
            <p className="text-gray-500">Überprüfe dein Konto</p>
          </section>
          <button className="bg-orange px-5 py-2 text-white rounded-md">
            Konto überprüfen
          </button>
        </div>
        <div className="space-y-4">
          <section>
            <h1 className="text-2xl font-bold">Konto aktivieren</h1>
            <p className="text-gray-500">Aktiviere dein Konto</p>
          </section>
          <button className="bg-orange px-5 py-2 text-white rounded-md">
            Konto aktivieren
          </button>
        </div>
        <div className="space-y-4">
          <section>
            <h1 className="text-2xl font-bold">Konto deaktivieren</h1>
            <p className="text-gray-500">Deaktiviere dein Konto</p>
          </section>
          <button className="bg-orange px-5 py-2 text-white rounded-md">
            Konto deaktivieren
          </button>
        </div>
      </div>
    </div>
  );
}

