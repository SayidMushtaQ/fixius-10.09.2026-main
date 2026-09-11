"use client";
import { ServiceCard } from "@/components/ServiceCard";
import React, { useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";
import SliderCrouserl from "react-slick";

export default function ServiceSelectionModal({
  setServicePopUP,
  setServiceCardData,
}: {
  setServicePopUP: React.Dispatch<React.SetStateAction<boolean>>;
  setServiceCardData: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const slider = useRef<SliderCrouserl>(null);
  const [selectCard, setSelectCard] = useState<string[]>([]);
  const [selectCardError, setSelectCardError] = useState<string>("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-7xl max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={() => setServicePopUP(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors z-10"
        >
          <IoMdClose size={30} />
        </button>

        <div className="md:p-10 p-5">
          <section className="text-center flex flex-col justify-center items-center mb-8 space-y-4">
            <h1 className="sm:text-5xl text-3xl font-bold leading-tight">
              Finde Aufträge für deinen Beruf
            </h1>
            <p className="font-medium sm:text-xl text-gray-600">
              Finde die passenden Aufträge für deinen Beruf mit unserem
              Profi-Service.
            </p>
          </section>

          <div className="relative px-2 sm:px-5">
            <ServiceCard
              slider={slider}
              slidesToShowCustom={6}
              setSelectCard={setSelectCard}
              selectCard={selectCard}
              setSelectCardError={setSelectCardError}
              setServicePopUP={setServicePopUP}
              setServiceCardData={setServiceCardData}
              showIcons={true}
            />
            <div
              className="main-card-slide-arrow w-full text-3xl flex justify-between items-center top-[45%] absolute left-0 right-0 pointer-events-none"
              aria-hidden="true"
            >
              <button
                className="cursor-pointer bg-orange rounded-full text-white !relative -left-2 pointer-events-auto shadow-md"
                onClick={() => slider.current?.slickPrev()}
                aria-label="Nach links scrollen"
              >
                <IoIosArrowBack className="text-[30px]" />
              </button>
              <button
                className="cursor-pointer bg-orange rounded-full text-white !relative -right-2 pointer-events-auto shadow-md"
                onClick={() => slider.current?.slickNext()}
                aria-label="Nach rechts scrollen"
              >
                <IoIosArrowForward className="text-[30px]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
