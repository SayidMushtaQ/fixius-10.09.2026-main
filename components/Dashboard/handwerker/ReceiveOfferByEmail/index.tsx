"use client";
import { Context } from "@/components/Common/DashboardLayout";
import { useContext, useState } from "react";
import ReceiveOfferByEmail from "./components/ReceiveOfferByEmail";
export default function Index() {
  const { toggleSideBar } = useContext(Context);
  const [selectCard, setSelectCard] = useState<string[]>([]);
  // console.log(selectCard);
  return (
    <div className={`w-full ${toggleSideBar ? "lg:mx-32" : "mx-0"} my-20`}>
      <div className="flex gap-5 sm:px-8 flex-wrap justify-start items-center">
        <div className="bg-white px-3 py-3 rounded-lg  shadow">
          <input type="number" className="w-full outline-none" id="filter_km" name="filter_km" placeholder="10 km" min={1}/>
        </div>
        <div className="bg-white px-3 py-3 rounded-lg  shadow">
          <input type="text" className="w-full outline-none" id="filter_pin" name="filter_pin" placeholder="e.g. 40210"/>
        </div>
      </div>
      <ReceiveOfferByEmail   selectCard={selectCard} setSelectCard={setSelectCard}/>
    </div>
  );
}
