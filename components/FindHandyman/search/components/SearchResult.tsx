"use client";
import useUserRequests from "@/ApiRequests/user";
import { NotFoundData } from "@/components/Dashboard/handwerker/Pedidos";
import Loader from "@/components/Loader";
import ServicePopUpPage from "@/components/landingPage/components/ServicePopUP";
import { ServiceCards } from "@/constants/landingPage/index";
import useScrollFetch from "@/hooks/useScrollFetchs";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { GoChevronDown, GoUnverified } from "react-icons/go";

import { changeServiceFormat } from "@/helper/changeServiceFormat";
import { useQueryClient } from "@tanstack/react-query";
import ServiceSelectionModal from "./ServiceSelectionModal";
import { components } from "@/components/handwerker-in-der-naehe/componentsMap";
import { MapPin, Star, ShieldCheck, Sparkles, ArrowRight, ExternalLink } from "lucide-react";

type orderTimeType =
  | "Nach Bewertung sortieren"
  | "Alle"
  | "5 Sterne"
  | "4 Sterne"
  | "3 Sterne"
  | "2 Sterne"
  | "1 Stern";

const Cards = ({ title, onClick }: { title: string; onClick?: () => void }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center px-3.5 py-1.5 m-1 rounded-xl text-xs font-semibold bg-linear-to-r from-purple-50 via-indigo-50 to-purple-50/80 text-purple-700 border border-purple-100/80 shadow-2xs hover:scale-105 hover:border-purple-300 hover:shadow-sm transition-all duration-200 cursor-pointer"
    >
      <span>{title}</span>
    </button>
  );
};

const dummyText = `Wir bieten professionelle und qualitativ hochwertige Handwerksdienste an. Kontaktieren Sie uns für ein Angebot und um Ihr Projekt zu starten.`;

const Available_handyman = ({ item, service }: any) => {
  const [servicePopUp, setServicePopUP] = useState<boolean>(false);
  const [serviceCardData, setServiceCardData] = useState<string[]>([]);
  
  useEffect(() => {
    if (!servicePopUp) {
      document.body.style.overflowY = "scroll";
    } else {
      document.body.style.overflowY = "hidden";
    }
  }, [servicePopUp]);

  const handleRequestQuote = (targetSvc?: string) => {
    // 1. Target requested service or current page service or craftsman's first service
    const serviceName =
      targetSvc ||
      service ||
      (item?.craftsman?.services && item?.craftsman?.services[0]);

    if (!serviceName) {
      setServicePopUP(true);
      setServiceCardData([]);
      return;
    }

    const cleanName = serviceName.toLowerCase().trim();

    // 2. Find matching card in ServiceCards by slug or shortText
    const serviceInfo = ServiceCards.find(
      (card) =>
        card.slug.toLowerCase() === cleanName ||
        card.shortText.toLowerCase() === cleanName
    );

    setServicePopUP(true);

    if (serviceInfo) {
      setServiceCardData([
        serviceInfo.shortText,
        serviceInfo.slug,
        serviceInfo.icon,
      ]);
    } else {
      // Fallback with craftsman's service title if not explicitly in ServiceCards list
      setServiceCardData([
        serviceName,
        serviceName.toLowerCase().replace(/\s+/g, "_"),
        "",
      ]);
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 border border-slate-100/80 hover:shadow-2xl hover:border-violet-200/60 transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group my-6">
      {/* Top Accent Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-violet-500 via-indigo-500 to-pink-500 opacity-80 group-hover:opacity-100 transition-opacity duration-300 rounded-t-3xl" />

      <div className="flex flex-col lg:flex-row gap-8 items-start relative pt-2">
        {/* Left Column: Avatar & Quick Details */}
        <div className="flex flex-col items-center flex-none w-full lg:w-48 text-center">
          <div className="relative group/avatar">
            <div className="p-1 bg-linear-to-tr from-violet-500 via-purple-500 to-pink-500 rounded-full shadow-lg shadow-purple-500/20 transition-transform duration-300 group-hover/avatar:scale-105">
              <Image
                src={item?.profile_photo}
                alt={item?.craftsman?.company_name || "Handwerker"}
                width={100}
                height={100}
                className="w-24 h-24 rounded-full object-cover border-2 border-white"
                title={item?.craftsman?.company_name}
              />
            </div>
          </div>

          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-100/80 shadow-2xs">
            <MapPin size={13} className="text-sky-500" />
            <span className="truncate max-w-30">{item?.address?.Place_Name || "Standort"}</span>
          </div>

          <button className="mt-4 w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-2xs">
            <Link href={`/handwerker/${item?.craftsman?.company_name}`} className="inline-flex items-center gap-1">
              Profil besuchen <ExternalLink size={12} className="text-slate-400" />
            </Link>
          </button>
        </div>

        {/* Right Column: Info & Action */}
        <div className="flex-1 flex flex-col justify-between w-full">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                  {item?.craftsman?.company_name}
                </h3>

                {item?.craftsman?.status === "verified" ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-2xs">
                    <ShieldCheck size={14} className="text-emerald-600" />
                    Verifiziert
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200/60 shadow-2xs">
                    <GoUnverified size={13} className="text-amber-600" />
                    Nicht verifiziert
                  </span>
                )}
              </div>

              {/* Top Right Action Button */}
              <button
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold bg-linear-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                onClick={() => handleRequestQuote()}
              >
                <Sparkles size={15} />
                Angebot anfordern
              </button>
            </div>

            {/* Rating Stars */}
            <div className="flex items-center gap-2 mb-4">
              {item?.craftsman?.reviews ? (
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400 gap-0.5 text-lg">
                    {Array.from({ length: 5 }).map((_, ind: number) => (
                      <span
                        key={ind}
                        className={ind < (item?.avgRating || 0) ? "text-amber-400 drop-shadow-2xs" : "text-slate-200"}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200/60">
                    {item?.craftsman?.reviews?.length} Bewertungen
                  </span>
                </div>
              ) : (
                <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                  Noch keine Bewertungen
                </span>
              )}
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {item?.craftsman?.description || dummyText}
            </p>
          </div>

          {/* Services Tag Pills */}
          <div className="pt-4 border-t border-slate-100/80">
            <div className="flex flex-wrap items-center gap-1">
              {item?.craftsman?.services?.map((svc: any, index: any) => (
                <Cards key={index} title={svc} onClick={() => handleRequestQuote(svc)} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {servicePopUp && serviceCardData.length === 0 && (
        <ServiceSelectionModal
          setServicePopUP={setServicePopUP}
          setServiceCardData={setServiceCardData}
        />
      )}
      {servicePopUp && serviceCardData.length > 0 && (
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
};

export default function SearchResult({ params }: any) {
  const { handyman, city, initialResults } = params;
  const [orderTime, setOrderTime] = useState<orderTimeType>(
    "Nach Bewertung sortieren",
  );
  const [orderNewOrOld, setOrderNewOrOld] = useState<boolean>(false);
  const [filterByRating, setFilterByRating] = useState<string>("");
  const { SearchHandyman } = useUserRequests();

  const { data, isFetching } = SearchHandyman(
    { pageSize: 10 },
    {
      service: changeServiceFormat(handyman),
      rating: filterByRating,
      city: city,
      distance: "50",
    },
    initialResults,
  );

  const handleFilters = (filterName: string, orderTime: orderTimeType) => {
    setOrderNewOrOld(false);
    setOrderTime(orderTime);
    setFilterByRating(filterName);
  };

  if (isFetching && !data) {
    return <Loader />;
  }

  const serviceTitle = components[handyman]?.title
    ? components[handyman].title.replace(" in der Nähe", "")
    : changeServiceFormat(handyman);

  return (
    <div className="w-full my-6">
      {/* Top Colorful Header Hero Banner */}
      <div className="relative overflow-hidden bg-linear-to-r from-violet-600 via-purple-600 to-indigo-600 text-white rounded-3xl p-6 md:p-8 shadow-xl shadow-purple-500/10 mb-8 border border-white/10">
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-purple-100 border border-white/20 mb-3">
              <Sparkles size={14} className="text-yellow-300" />
              <span>Geprüfte Fachbetriebe</span>
            </div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-snug">
              Qualifizierte Handwerker in {changeServiceFormat(city)}
            </h1>
            <p className="text-purple-100/90 text-sm md:text-base font-medium mt-1">
              Finden Sie beste Experten für <span className="underline decoration-purple-300 font-bold text-white">{serviceTitle}</span> im Umkreis von 50 km
            </p>
          </div>

          {/* Filter Dropdown */}
          <div className="relative shrink-0">
            <button
              onClick={() => setOrderNewOrOld(!orderNewOrOld)}
              className="inline-flex items-center gap-3 bg-white/90 hover:bg-white text-slate-800 font-bold text-xs md:text-sm px-4 py-3 rounded-2xl shadow-lg transition-all border border-white/40 cursor-pointer"
            >
              <span>{orderTime}</span>
              <GoChevronDown className={`text-base transition-transform duration-300 ${orderNewOrOld ? "rotate-180 text-violet-600" : ""}`} />
            </button>

            {orderNewOrOld && (
              <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-2 text-sm font-semibold border border-slate-100 absolute right-0 top-full mt-2 w-52 z-50 space-y-1">
                {[
                  { label: "Alle", value: "", name: "Alle" as orderTimeType },
                  { label: "5 Sterne", value: "5", name: "5 Sterne" as orderTimeType },
                  { label: "4 Sterne", value: "4", name: "4 Sterne" as orderTimeType },
                  { label: "3 Sterne", value: "3", name: "3 Sterne" as orderTimeType },
                  { label: "2 Sterne", value: "2", name: "2 Sterne" as orderTimeType },
                  { label: "1 Stern", value: "1", name: "1 Stern" as orderTimeType },
                ].map((opt) => (
                  <div
                    key={opt.label}
                    onClick={() => handleFilters(opt.value, opt.name)}
                    className="px-4 py-2.5 rounded-xl hover:bg-violet-50 hover:text-violet-700 cursor-pointer transition-colors text-slate-700"
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results List */}
      {data?.pages?.map((page: any, ind: number) => (
        <Fragment key={ind}>
          {page?.users?.length === 0 ? (
            <NotFoundData text="Keinen Betrieb direkt gefunden? Kein Problem! Erstelle jetzt deinen kostenlosen Auftrag – wir benachrichtigen passende Fachbetriebe in der Umgebung, die sich direkt bei dir melden." />
          ) : (
            page?.users?.map((item: any, ind: number) => (
              <Available_handyman item={item} key={ind} service={handyman} />
            ))
          )}
        </Fragment>
      ))}
    </div>
  );
}
