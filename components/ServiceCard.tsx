"use client";
import { useUpdateFilter } from "@/ApiRequests/filter";
import { ServiceCards } from "@/constants/landingPage/index";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import SliderCrouserl from "react-slick";
import { useRouter } from "next/navigation";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export const Service = ({
  icon,
  shortText,
  setSelectCard,
  selectCard,
  setSelectCardError,
  setServicePopUP,
  setServiceCardData,
  slug,
  showIcons = true,
  selectedServices,
  jobType,
  variant = "vertical", // Add variant prop
}: ServicePropsType & { variant?: "vertical" | "horizontal" }) => {
  const { mutate: handleUpdateFilters } = useUpdateFilter();
  const router = useRouter();
  const [toggle, setToggle] = useState<boolean>(true);

  const addToSelectCard = (shortText: string) => {
    if (setSelectCardError) setSelectCardError("");
    if (setSelectCard && toggle) {
      setSelectCard((prev = []) => [...prev, shortText]);
      jobType === "listing" &&
        handleUpdateFilters({ categories: [...(selectCard || []), shortText] });
    } else {
      const newCard = selectCard?.filter((item) => item !== shortText);
      if (setSelectCard && newCard) {
        setSelectCard(newCard);
        jobType === "listing" && handleUpdateFilters({ categories: newCard });
      }
    }
    setToggle(!toggle);
  };

  const handleClick = () => {
    addToSelectCard(shortText);
    if (setServicePopUP && setServiceCardData) {
      setServicePopUP(true);
      setServiceCardData([shortText, slug, icon]);
    }
  };

  useEffect(() => {
    selectCard?.includes(shortText) && setToggle(false);
  }, [selectCard, shortText]);

  const isSelected = selectCard?.includes(shortText);

  if (variant === "horizontal") {
    return (
      <div
        className={cn(
          "group flex items-center gap-4 rounded-xl bg-white p-4 m-2",
          "border border-transparent shadow-sm cursor-pointer w-full",
          "transition-all duration-200 ease-out",
          "hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5",
          isSelected && "border-primary/40 bg-primary/5 ring-4 ring-primary/5"
        )}
        onClick={handleClick}
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-50 transition-colors group-hover:bg-primary/10">
          <Image
            src={icon}
            alt={shortText}
            width={32}
            height={32}
            className="w-8 h-auto transition-all duration-300 group-hover:scale-110 opacity-90 group-hover:opacity-100 grayscale group-hover:grayscale-0"
          />
        </div>
        <div className="flex-1 min-w-0 text-left">
          <span className={cn(
            "block text-sm font-semibold transition-colors truncate",
            isSelected ? "text-primary" : "text-slate-900 group-hover:text-primary"
          )}>
            {shortText}
          </span>
          <span className="text-xs text-slate-500">
            Regionaler Experte
          </span>
        </div>
        <div className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full transition-all",
          isSelected ? "bg-primary text-white" : "bg-transparent text-slate-300 group-hover:bg-primary group-hover:text-white"
        )}>
          <ArrowRight size={14} />
        </div>
      </div>
    );
  }

  // Default Vertical Variant
  return (
    <div className="p-1.5 sm:p-2 w-full h-full flex items-stretch">
      <div
        className={cn(
          "bg-white cursor-pointer px-2.5 sm:px-3 flex items-center text-center flex-col py-6 sm:py-7 rounded-xl border border-slate-200 group relative overflow-hidden transition-all duration-200 w-full h-full",
          isSelected
            ? "border-primary/40 bg-primary/5 ring-4 ring-primary/5 shadow-md shadow-primary/5"
            : "hover:shadow-md hover:shadow-primary/5 hover:border-primary/30"
        )}
        style={!showIcons ? { height: "fit-content" } : {}}
        onClick={() => {
          showIcons && handleClick();
        }}
      >
        {showIcons && (
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-slate-50 transition-colors group-hover:bg-primary/10 mb-2">
            <Image
              src={icon}
              className="w-10 h-auto transition-all duration-300 group-hover:scale-110 opacity-90 group-hover:opacity-100 grayscale group-hover:grayscale-0"
              alt="icon"
              width={40}
              height={40}
            />
          </div>
        )}
        <div className="relative z-10 w-full flex items-center justify-center">
          <div className="min-h-10 flex items-center justify-center w-full">
            <span
              className={cn(
                "leading-tight font-medium font-inter text-xs sm:text-[13px] tracking-tight transition-colors line-clamp-2 break-words hyphens-auto [overflow-wrap:anywhere] text-center w-full",
                isSelected ? "text-primary" : "text-slate-900 group-hover:text-primary"
              )}
              title={shortText}
            >
              {shortText}
            </span>
          </div>
        </div>
      </div>
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
      className={`bg-white cursor-pointer m-2 px-2 flex items-center text-center flex-col py-4 rounded-xl shadow-md min-h-[8rem] transform hover:scale-105`}
      onClick={() => handleClick()}
    >
      <Image
        src={icon}
        className="w-10 h-auto mb-3 mt-1"
        alt="icon"
        width={100}
        height={100}
      />
      <span
        className="leading-tight hover:text-primary font-semibold font-inter text-xs sm:text-sm mt-1 line-clamp-2 break-words hyphens-auto [overflow-wrap:anywhere]"
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
  count,
  showIcons,
  selectedServices,
  jobType,
  variant = "vertical",
}: ServiceCardProps & { variant?: "vertical" | "horizontal" }) {
  const [toggleAllServicesOnMB, setToggleAllServicesOnMB] =
    useState<boolean>(false);



  const settings = {
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: variant === "horizontal" ? 3 : (slidesToShowCustom || 5),
    slidesToScroll: variant === "horizontal" ? 3 : (slidesToShowCustom || 5),
    initialSlide: 0,
    rows: 3,

    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: variant === "horizontal" ? 3 : 5,
          slidesToScroll: variant === "horizontal" ? 3 : 5,
          rows: 3,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: variant === "horizontal" ? 2 : 4,
          slidesToScroll: variant === "horizontal" ? 2 : 4,
          rows: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: variant === "horizontal" ? 2 : 3,
          slidesToScroll: variant === "horizontal" ? 2 : 3,
          rows: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: variant === "horizontal" ? 1 : 2,
          slidesToScroll: variant === "horizontal" ? 1 : 2,
          rows: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 3,
        },
      },
    ],
  };
  const leftAlignedClass = showIcons ? "" : "text-left";
  return (
    <div className="">
      <div className={`block ${leftAlignedClass}`}>
        <SliderCrouserl
          className={`${
            showIcons || showIcons == undefined ? "" : "ml-[-45%]"
          }`}
          {...settings}
          ref={slider}
        >
          {ServiceCards?.map(({ id, icon, shortText, slug }) => (
            <Service
              showIcons={showIcons}
              key={id}
              variant={variant}
              icon={icon && icon}
              shortText={shortText}
              slug={slug}
              setSelectCard={setSelectCard && setSelectCard}
              selectCard={selectCard}
              setSelectCardError={setSelectCardError}
              setServicePopUP={setServicePopUP && setServicePopUP}
              setServiceCardData={setServiceCardData}
              selectedServices={selectedServices}
              jobType={jobType}
            />
          ))}
        </SliderCrouserl>
      </div>

      {/* <div className="block sm:hidden">
				<div className="grid grid-cols-1">
					{ServiceCards.slice(
						0,
						!toggleAllServicesOnMB ? 14 : 39
					).map(({ id, icon, shortText, slug }) => (
						<ServiceForMobile
							key={id}
							icon={icon && icon}
							shortText={shortText}
							setServicePopUP={setServicePopUP && setServicePopUP}
							setServiceCardData={setServiceCardData}
							slug={slug}
						/>
					))}
				</div>
				<div className="flex justify-center items-center my-3">
					<button
						className="bg-white px-5 py-3 rounded-full shadow"
						onClick={() =>
							setToggleAllServicesOnMB(!toggleAllServicesOnMB)
						}>
						{!toggleAllServicesOnMB
							? "Show all services"
							: "Show Less all services"}
					</button>
				</div>
			</div> */}
    </div>
  );
}
