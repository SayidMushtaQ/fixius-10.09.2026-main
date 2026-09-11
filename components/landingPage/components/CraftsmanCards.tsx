import React from "react";
import Image from "next/image";

const Start = (<svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M13 19.5875L20.725 24.25L18.675 15.4625L25.5 9.55L16.5125 8.7875L13 0.5L9.4875 8.7875L0.5 9.55L7.325 15.4625L5.275 24.25L13 19.5875Z" fill="#FBFF20"/>
</svg>);
export default function CrafsmanCards({name,job,img}:{name:string,job:string,img:string}) {
  return (
    <div className="max-w-[16rem] shadow-lg bg-white rounded-2xl m-2 transform hover:scale-105">
      <Image className="w-full rounded-t-2xl" src={img}  alt="Sunset in the mountains" width={500} height={500}/>
      <section className="px-6 py-4 text-center">
        <span className="font-bold text-2xl mb-2">{name}</span>
        <p className="text-gray-700 text-base">
          {job}
        </p>
        <div className="flex justify-center items-center p-2">
          {Start}
          {Start}
          {Start}
          {Start}
          {Start}
        </div>
      </section>
    </div>
  );
}
