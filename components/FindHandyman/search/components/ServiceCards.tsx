"use client";
import React, { useRef, useState,useEffect} from "react";
import { ServiceCard } from "@/components/ServiceCard";
import SliderCrouserl from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ServicePopUpPage from '@/components/landingPage/components/ServicePopUP';

export default function ServiceCards() {
  const slider = useRef<SliderCrouserl>(null);
  const [serviceCardData, setServiceCardData] = useState<string[]>([]); //service card data

  return (
    

    <div className="relative mt-10">
        <div className="mt-3  py-3 px-10">
          <ServiceCard
            slider={slider}
            slidesToShowCustom={5}
            setServicePopUP={undefined}
            setServiceCardData={undefined}
            
          />
          <div
            className="main-card-slide-arrow w-full text-3xl  flex justify-between items-center top-[45%] absolute    left-0 right-0  "
            aria-hidden="true"
          >
            <button
              className="cursor-pointer bg-orange rounded-full text-white left-slide-arrow"
              onClick={() => slider.current?.slickPrev()}
              aria-label="Left shift"
              aria-hidden="true"
            >
              <IoIosArrowBack className="text-[48px] sm:text-[30px]" />
            </button>
            <button
              className="cursor-pointer bg-orange rounded-full text-white right-slide-arrow "
              onClick={() => slider.current?.slickNext()}
              aria-label="right shift"
              aria-hidden="true"
            >
              <IoIosArrowForward className="text-[48px] sm:text-[30px]" />
            </button>
          </div>
        </div>
      </div>
  );
}
