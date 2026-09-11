"use client";
import React,{useRef,useState} from 'react'
import {ServiceCard} from '../../../components/ServiceCards';
import SliderCrouserl from "@/components/ui/LazySlider";
import type Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Receiveofferbyemail({selectCard,setSelectCard}:{selectCard: string[];setSelectCard: React.Dispatch<React.SetStateAction<string[]>>}) {
  const slider = useRef<Slider>(null);
  return (
    <div className="mt-3 sm:px-10 lg:px-20 py-3 relative">
    <ServiceCard slider={slider} slidesToShowCustom={7}  setSelectCard={setSelectCard} selectCard={selectCard}/>
    <div className="text-4xl sm:flex justify-between items-center top-[45%] absolute right-4 left-4  lg:right-14 lg:left-14 hidden" aria-hidden="true">
      <button className="cursor-pointer  text-black" onClick={() => slider.current?.slickPrev()} aria-label="Left shift" aria-hidden="true">
        <IoIosArrowBack className="text-[48px] sm:text-[30px]" />
      </button>
      <button className="cursor-pointer  text-black " onClick={() => slider.current?.slickNext()} aria-label="right shift" aria-hidden="true">
        <IoIosArrowForward className="text-[48px] sm:text-[30px]" />
      </button>
    </div>
  </div>
  )
}
