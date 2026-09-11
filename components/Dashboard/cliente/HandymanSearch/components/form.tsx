import React from "react";

export default function ProfileManagementForm() {
 
  return (
    <div className="w-4/5 space-y-3">
      <form method="POST" onSubmit={()=>{}}>
      <div className=" mx-auto  p-8 ">
      <div className="flex mb-4">
        <div className="w-1/2 pr-2">
          <label className="block mb-2 font-bold text-gray-700">Vorname</label>
          <input type="text" className="w-full border rounded px-3 py-2 " placeholder="Ingrese su primer nombre" />
        </div>
        <div className="w-1/2 pl-2">
          <label className="block mb-2 font-bold text-gray-700">Nachname</label>
          <input type="text" className="w-full border rounded px-3 py-2" placeholder="Ingrese su apellido" />
        </div>
      </div>

      <div className="flex mb-4">
        <div className="w-1/2 pr-2">
          <label className="block mb-2 font-bold text-gray-700">E-Mail-Adresse eingeben</label>
          <input type="text" className="w-full border rounded px-3 py-2" placeholder="Ingrese su E-Mail-Adresse eingeben" />
        </div>
        <div className="w-1/2 pl-2">
          <label className="block mb-2 font-bold text-gray-700">Postleitzahl</label>
          <input type="text" className="w-full border rounded px-3 py-2" placeholder="Ingrese su código postal" />
        </div>
      </div>

      <div className="flex mb-4">
        <div className="w-1/2 pr-2">
          <label className="block mb-2 font-bold text-gray-700">Telefonnummer</label>
          <input type="email" className="w-full border rounded px-3 py-2" placeholder="Ingrese su número de teléfonor" />
        </div>
        <div className="w-1/2 pl-2 flex items-end justify-center">
        <label className="block mb-2 font-bold text-gray-700"></label>

        <button className="bg-orange text-white lg:px-5 lg:py-2 px-3 py-1.5 rounded-xl font-medium focus:outline-none float-right " >
        Sparen
      </button>
        </div>
      </div>

     
    </div>
   


      </form>
    </div>
  );
}
