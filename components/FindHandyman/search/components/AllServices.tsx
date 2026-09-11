"use client";
import React, { useEffect, useRef, useState } from "react";
import SliderCrouserl from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ServiceCard } from "@/components/ServiceCard";
import ServicePopUpPage from "./ServicePopUP";

export default function AllServices() {
  const slider = useRef<SliderCrouserl>(null);
  const [servicePopUp, setServicePopUP] = useState<boolean>(false);
  const [serviceCardData, setServiceCardData] = useState<string[]>([]);
  useEffect(() => {
    if (!servicePopUp) {
      document.body.style.overflowY = "scroll";
    } else {
      document.body.style.overflowY = "hidden";
    }
  }, [servicePopUp]);
  return (
    <div className="w-full ">

      <ServiceCard slider={slider} slidesToShowCustom={7} setServicePopUP={setServicePopUP} setServiceCardData={setServiceCardData} />

      {servicePopUp && (
        <div className="fixed inset-0 bg-secondary/80 backdrop-blur-md z-9999 flex items-center justify-center p-4">
          <div className="relative w-full max-w-7xl shrink-0 h-[90vh] overflow-hidden bg-white rounded-3xl shadow-2xl border border-white/20">
            <button 
              onClick={() => setServicePopUP(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-50/50 text-secondary/40 hover:text-secondary hover:bg-gray-100 transition-all z-20 backdrop-blur-sm border border-gray-100"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ServicePopUpPage setServicePopUP={setServicePopUP} servicePopUp={servicePopUp} serviceCardData={serviceCardData} />
          </div>
        </div>
      )}
    </div>
  );
}
