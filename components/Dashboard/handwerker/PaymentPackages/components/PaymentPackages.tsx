import React from "react";

export default function PaymentPackages({testData}:{testData:{ id:number,month:string,price:string}[]}) {
  return (
    <div className="w-full flex justify-center items-center gap-10 lg:gap-20 flex-col lg:flex-row">
      {testData.map((item) => (
        <div key={item.id} className="bg-white px-8  py-6 rounded shadow-md w-full sm:w-[60%] lg:w-[23%]">
        <div className="flex justify-center items-center flex-col space-y-7">
          <section className="px-10 space-y-5">
            <h1 className="text-xl text-center font-bold">{item.month} <br/> Abonnement</h1>
            <p className="text-3xl text-center font-semibold">{item.price}</p>
          </section>
          <button className="bg-white border-2 border-black rounded-lg px-7 py-1.5 hover:border-gray-500">Pago</button>
        </div>
        </div>
      ))}
    </div>
  );
}
