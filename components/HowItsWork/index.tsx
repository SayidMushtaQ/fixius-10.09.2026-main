import React from "react";
import { How_itsWork } from "@/constants/HowItsWork";
export default function HowItsWork() {
  return (
    <div className="w-full my-6 space-y-10">
      {How_itsWork.map((data,index) => (
        <article className="space-y-5" key={index}>
          <h2 className="text-2xl font-bold">
            {data.heading}
            <span className="text-orange"> {data.color_text}</span>
          </h2>
          <section className="w-full space-y-4 text-gray-600">
            <p>{data.paragraph?.text1}</p>
          </section>
        </article>
      ))}
    </div>
  );
}
