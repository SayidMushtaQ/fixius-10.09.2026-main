"use client";
import { ServiceCard } from "@/components/ServiceCard";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SliderCrouserl from "react-slick";
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
  // console.log(serviceCardData, "serviceCard data");
  return (
    <div className="main-padding-box w-full  md:px-10 px-4">
      {/* xl:px-[150px] */}
      <div className="relative">
        <div className="mt-3  py-3 px-10">
          <ServiceCard
            slider={slider}
            slidesToShowCustom={5}
            setServicePopUP={setServicePopUP}
            setServiceCardData={setServiceCardData}
            
          />
          <div
            className="main-card-slide-arrow w-full text-3xl  flex justify-between items-center top-[45%] absolute    left-0 right-0  "
            aria-hidden="true"
          >
            <button
              className="cursor-pointer bg-white rounded-full text-primary shadow-premium border border-slate-100 hover:bg-primary hover:text-white transition-all p-2 z-10 -ml-4"
              onClick={() => slider.current?.slickPrev()}
              aria-label="Left shift"
              aria-hidden="true"
            >
              <IoIosArrowBack className="text-[30px] sm:text-[24px]" />
            </button>
            <button
              className="cursor-pointer bg-white rounded-full text-primary shadow-premium border border-slate-100 hover:bg-primary hover:text-white transition-all p-2 z-10 -mr-4"
              onClick={() => slider.current?.slickNext()}
              aria-label="right shift"
              aria-hidden="true"
            >
              <IoIosArrowForward className="text-[30px] sm:text-[24px]" />
            </button>
          </div>
        </div>
      </div>
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
            <ServicePopUpPage
              setServicePopUP={setServicePopUP}
              servicePopUp={servicePopUp}
              serviceCardData={serviceCardData}
            />
          </div>
        </div>
      )}
    </div>
  );
}
