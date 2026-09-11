"use client";
import { AllServices } from "@/components/landingPage/components";
import getAverageRating from "@/helper/getAverageRatings";
import Image from "next/image";
import React, { useState } from "react";
import { MapPin, Phone, Navigation, ShieldCheck, ShieldAlert, Star } from "lucide-react";

export default function Hero({ data = {} }: any) {
  const [servicePopUp, setServicePopUP] = useState<boolean>(false);
  const [serviceCardData, setServiceCardData] = useState<string>("");
  const [showPhoneNumber, setShowPhoneNumber] = useState<boolean>(false);

  const Request_a_Quote__PopUp = ({
    serviceCardData,
    showArrows,
    setServiceCardData,
  }: {
    setServiceCardData: React.Dispatch<React.SetStateAction<string>>;
    serviceCardData: string;
    showArrows: Boolean;
  }) => {
    return (
      <>
        <div className="bg-white rounded-md p-3">
          <h1 className="text-4xl py-5 font-bold text-slate-800">
            Wählen Sie einen beliebigen Service aus
          </h1>
          <AllServices />
        </div>
      </>
    );
  };

  return (
    <div className="w-full flex justify-around items-center relative bg-white rounded-2xl flex-col lg:flex-row lg:py-10 shadow-sm border border-slate-100 overflow-hidden">
      <div className="absolute w-full md:h-52 h-40 bg-gradient-to-r from-orange-400 to-orange-500 top-0 -z-0 rounded-t-2xl opacity-80" />
      <div className="z-10 sm:px-10 my-5 sm:w-2/3 w-full">
        <div className="flex justify-center items-center text-center flex-col mt-20 lg:mt-20 mb-6">
          <div className="relative">
            <Image
              src={data?.user?.profile_photo || "/default-avatar.png"}
              alt={data?.company_name || "Profile"}
              width={100}
              height={100}
              className="rounded-full w-28 h-28 border-4 border-white shadow-lg object-cover"
            />
            {data.status === "verified" && (
              <div className="absolute bottom-1 right-1 bg-white rounded-full p-1 shadow-md">
                <ShieldCheck className="w-6 h-6 text-emerald-500 fill-emerald-50" />
              </div>
            )}
          </div>

          <div className="mt-4">
            <div className="flex justify-center flex-col items-center text-center mb-1 ">
              <h1 className="font-bold text-3xl text-slate-800">{data?.company_name}</h1>
              <div className="flex items-center justify-center gap-1.5 mt-2">
                {data.status === "verified" ? (
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verifiziert
                  </div>
                ) : (
                  <div className="flex items-center gap-1 px-2.5 py-1 bg-slate-50 text-slate-500 rounded-full text-xs font-bold border border-slate-100">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    Nicht verifiziert
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mb-3 mt-4">
              {data?.reviews ? (
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, ind) => (
                      <Star
                        key={ind}
                        className={`w-5 h-5 ${
                          ind < getAverageRating(data?.reviews)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-slate-200 fill-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-slate-600 font-semibold text-sm">
                    ({data?.reviews?.length})
                  </span>
                </div>
              ) : (
                <span className="text-slate-400 text-sm italic">Keine Bewertung</span>
              )}
              
              <div className="w-px h-4 bg-slate-200" />
              
              <div className="flex items-center gap-1.5 text-slate-600 font-semibold text-sm">
                <span className="text-emerald-500 font-black">{data?.completedJobsCount || 0}</span>
                <span>Aufträge</span>
              </div>
            </div>
            
            <h2 className="font-semibold text-slate-600 mb-4">
              {data?.user?.name} {data?.user?.lastName}
            </h2>

            <div className="flex flex-col gap-2 text-slate-500 font-medium items-center lg:items-start lg:pl-10">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-slate-50 rounded-lg">
                  <Navigation className="w-4 h-4 text-orange-500" />
                </div>
                <span className="text-sm">{data?.user?.streetAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-slate-50 rounded-lg">
                  <Phone className="w-4 h-4 text-orange-500" />
                </div>
                <span className="text-sm">{data?.user?.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-slate-50 rounded-lg">
                  <MapPin className="w-4 h-4 text-orange-500" />
                </div>
                <span className="text-sm">{data?.user?.address?.Place_Name}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="z-10 mb-10 w-full lg:flex lg:justify-end lg:pr-32 lg:mt-20 pl-10">
      </div>
      {servicePopUp && (
        <div className="min-h-screen overflow-scroll w-full fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-9999 flex justify-center items-center p-4">
          <Request_a_Quote__PopUp
            showArrows={false}
            setServiceCardData={setServiceCardData}
            serviceCardData={serviceCardData}
          />
        </div>
      )}
    </div>
  );
}
