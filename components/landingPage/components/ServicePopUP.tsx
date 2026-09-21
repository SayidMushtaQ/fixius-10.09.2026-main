"use client";
import { ServicesTitle } from "@/constants/landingPage/ServicesTitle";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ServicePopUpWrapper from "./service/ServicePopUpWrapper";
import { ServiceCards } from "@/constants/landingPage/index";
const serviceCardPopUPData: serviceCardPopUPDataType = {
  serviceTitle: {
    service_title: "",
    square_meters: "",
  },
  additional_details: {
    square_meters: "",
    how_many_rooms: "",
    how_many_floors: "",
  },
  additional_job_description: "",
  images: [],
  location: "",
  working_schedule: "",
  contactDetails: {
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
  },
};
export default function ServicePage({
  setServicePopUP,
  serviceCardData,
}: {
  setServicePopUP: React.Dispatch<React.SetStateAction<boolean>>;
  servicePopUp: boolean;
  serviceCardData?: string[];
}) {
  const [sendData, setSentData] = React.useState<boolean>(false);
  const [serviceTitle, setServiceTitles] = useState<string[]>([]);
  const [page1Data, setPage1Data] = useState<Page1DataType>({
    service_title: "",
    square_meters: "",
  });

  const params = useParams();
  
  useEffect(() => {
    if (sendData) {
      setServicePopUP(false);
    }
  }, [sendData, setServicePopUP]);

  useEffect(() => {
    if (serviceCardData && serviceCardData[1]) {
      try {
        const slug = serviceCardData[1].replaceAll("-", "_").toLowerCase();
        const serviceKey = Object.keys(ServicesTitle).find(
          (item) => item.toLowerCase() === slug
        );
        
        if (serviceKey) {
          setServiceTitles(ServicesTitle[serviceKey]);
        }
      } catch (err) {
        console.error("Error setting service title:", err);
      }
    }
  }, [serviceCardData]);

  const displayTitle = page1Data.service_title  || (serviceCardData && serviceCardData[0]) || "Service";

  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden">
      {serviceCardData && (
        <div className="relative pt-6 pb-2 px-8 text-center bg-white shrink-0">
          <div className="inline-flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center p-3 mb-3 border border-slate-100 transition-transform  duration-500">
              <Image
                src={serviceCardData[2] || ServiceCards.find(card => card.shortText === serviceCardData[0])?.icon || ""}
                className="object-contain w-10 h-10"
                alt={(params?.slug as string) || "service"}
                width={40}
                height={40}
              />
            </div>
            
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
              {displayTitle}
            </h1>
          </div>
        </div>
      )}
      
      {!serviceCardData && (
        <div className="h-10 bg-primary/5 shrink-0" />
      )}
 
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
        <ServicePopUpWrapper
          setServicePopUP={setServicePopUP}
          serviceCardPopUPData={serviceCardPopUPData}
          serviceCardData={serviceCardData}
          setSentData={setSentData}
          serviceTitle={serviceTitle}
          page1Data={page1Data}
          setPage1Data={setPage1Data}
        />
      </div>
    </div>
  );
}
