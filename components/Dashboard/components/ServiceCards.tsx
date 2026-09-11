"use client";
import React, { useState } from "react";
import Image from "next/image";
import SliderCrouserl from "@/components/ui/LazySlider";
import { ServiceCards } from "@/constants/landingPage/index";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const Service = ({
  icon,
  shortText,
  setSelectCard,
  selectCard,
  setSelectCardError,
  setServicePopUP,
  setServiceCardData,
  slug,
}: ServicePropsType) => {
  const [toggle, setToggle] = useState<boolean>(true);
  const router = useRouter();

  const addToSelectCard = (shortText: string) => {
    if (setSelectCardError) setSelectCardError("");
    if (setSelectCard && toggle) setSelectCard((prev) => [...prev, shortText]);
    else {
      const newCard = selectCard?.filter((item) => item !== shortText);
      if (setSelectCard && newCard) setSelectCard(newCard);
    }
    setToggle(!toggle);
  };

  const handleClick = () => {
    addToSelectCard(shortText);
    if (setServicePopUP && setServiceCardData) {
      router.push(`/auftrag-erstellen?service=${slug}`);
    }
  };

  const isSelected = !toggle && selectCard;

  return (
    <div 
      className={cn(
        "bg-white cursor-pointer m-2 sm:m-3 px-2.5 sm:px-4 flex items-center text-center flex-col py-6 sm:py-8 rounded-2xl border border-slate-200/60 group relative overflow-hidden transition-all duration-300 shadow-soft",
        isSelected
          ? "border-primary/40 bg-primary/5 ring-4 ring-primary/5 shadow-premium"
          : "hover:shadow-premium hover:border-primary/30 hover:-translate-y-1"
      )}
      aria-hidden="true" 
      onClick={() => handleClick()}
    >
      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 transition-colors group-hover:bg-primary/10 mb-4">
          <Image 
            src={icon} 
            className="w-12 h-auto transition-all duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100 grayscale group-hover:grayscale-0" 
            alt="icon" 
            width={48} 
            height={48}
          />
        </div>
        <div className="space-y-3 w-full">
          <div className="min-h-10 flex items-center justify-center px-1">
            <span 
              className={cn(
                "leading-tight font-semibold font-inter text-xs sm:text-sm md:text-[15px] tracking-tight transition-colors line-clamp-2 break-words hyphens-auto [overflow-wrap:anywhere]",
                isSelected ? "text-primary" : "text-slate-900 group-hover:text-primary"
              )} 
              title={shortText}
            >
              {shortText}
            </span>
          </div>
          <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300 h-4">
            <span className="text-[10px] text-primary uppercase tracking-wider font-bold">
              Jetzt anfragen
            </span>
            <ArrowRight size={10} className="text-primary" />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-primary/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};
const ServiceForMobile = ({
  icon,
  shortText,
  setServicePopUP,
  setServiceCardData,
  slug,
}: {
  icon: string;
  shortText: string;
  setServicePopUP: React.Dispatch<React.SetStateAction<boolean>> | undefined;
  setServiceCardData:
    | React.Dispatch<React.SetStateAction<string[]>>
    | undefined;
  slug: string;
}) => {
  const router = useRouter();
  function handleClick() {
    if (setServicePopUP && setServiceCardData) {
      router.push(`/auftrag-erstellen?service=${slug}`);
    }
  }
  return (
    <div
      className={`bg-white cursor-pointer  m-3  px-3 flex  items-center text-center flex-col py-5 rounded-xl shadow-md  h-32 transform hover:scale-105`}
      onClick={() => handleClick()}
    >
      <Image
        src={icon}
        className="w-10 h-auto mb-4 mt-1"
        alt="icon"
        width={100}
        height={100}
      />
      <span
        className="leading-tight hover:text-orange text-sm sm:text-lg"
        title={shortText}
      >
        {shortText}
      </span>
    </div>
  );
};
export function ServiceCard({
  slider,
  slidesToShowCustom,
  setSelectCard,
  selectCard,
  setSelectCardError,
  setServicePopUP,
  setServiceCardData,
}: ServiceCardProps) {
  const [toggleAllServicesOnMB, setToggleAllServicesOnMB] =
    useState<boolean>(false);
  const settings = {
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: slidesToShowCustom,
    slidesToScroll: slidesToShowCustom,
    initialSlide: 0,
    rows: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="hidden sm:block">
        <SliderCrouserl {...settings} ref={slider}>
          {ServiceCards.map(({ id, icon, shortText, slug }) => (
            <Service
              key={id}
              icon={icon && icon}
              shortText={shortText}
              slug={slug}
              setSelectCard={setSelectCard && setSelectCard}
              selectCard={selectCard}
              setSelectCardError={setSelectCardError}
              setServicePopUP={setServicePopUP && setServicePopUP}
              setServiceCardData={setServiceCardData}
            />
          ))}
        </SliderCrouserl>
      </div>
      <div className="block sm:hidden">
        <div className="grid grid-cols-2">
          {ServiceCards.slice(0, !toggleAllServicesOnMB ? 14 : 39).map(
            ({ id, icon, shortText, slug }) => (
              <ServiceForMobile
                key={id}
                icon={icon && icon}
                shortText={shortText}
                setServicePopUP={setServicePopUP && setServicePopUP}
                setServiceCardData={setServiceCardData}
                slug={slug}
              />
            ),
          )}
        </div>
        <div className="flex justify-center items-center my-3">
          <button
            className="bg-white px-5 py-3 rounded-full shadow"
            onClick={() => setToggleAllServicesOnMB(!toggleAllServicesOnMB)}
          >
            {!toggleAllServicesOnMB
              ? "Show all services"
              : "Show Less all services"}
          </button>
        </div>
      </div>
    </>
  );
}
