"use client";
import React from "react";
import { AiTwotoneStar, AiOutlineStar } from "react-icons/ai";

export default function ReviewSectionCS({rating,setRating,description,setDescription,handleSubmit}:{rating:number;setRating: React.Dispatch<React.SetStateAction<number>>;description: string;setDescription: React.Dispatch<React.SetStateAction<string>>;handleSubmit: () => void}) {
  const [hover, setHover] = React.useState(0);
  return (
    <div className="bg-white px-7 py-5 rounded-md shadow w-full md:w-3/4 mx-auto">
      <div className="space-y-5">
        <div className="space-y-2">
          <h1 className="text-xl font-bold">Wähle Sterne</h1>
          <div className="flex space-x-3">
            {[...Array(5)].map((star, index) => {
              index += 1;
              return (
                <div key={index}>
                  {index <= (hover || rating) ? (
                    <AiTwotoneStar className="text-3xl cursor-pointer text-orange" onClick={() => setRating(index)} onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(rating)}/>
                  ) : (
                    <AiOutlineStar className="text-3xl cursor-pointer hover:text-orange" onClick={() => setRating(index)} onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(rating)}/>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="description" className="font-semibold">
            Beschreibung
          </label>
          <textarea id="description" className="resize-none w-full border border-gray-500 p-1 outline-none rounded-lg" placeholder="Enter text" rows={5} cols={50} value={description} onChange={e=>setDescription(e.target.value)}></textarea>
        </div>
        <div className="flex justify-end items-center">
          <button type="button" className=" bg-orange hover:text-black text-white font-bold py-2.5 px-4 rounded-md focus:outline-none mt-4" onClick={handleSubmit}>
            Liefern
          </button>
        </div>
      </div>
    </div>
  );
}
