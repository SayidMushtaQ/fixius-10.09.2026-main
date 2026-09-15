"use client";
import { Find_handyman } from "@/constants/FindHandyman";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Article1 from "./components/Article1";
import Article2 from "./components/Article2";
import Article3 from "./components/Article3";

import Services from "./components/Services";
import { Craftsman } from "@/components";
import { transliterateUrl } from "@/helper/urlEncode";

export default function Find_handymanPage() {
  const [zip_code, setZip_code] = useState<string>("");
  const [zip_codeError, setZip_codeError] = useState<string>("");
  const [serviceCardData, setServiceCardData] = useState<string[]>([]);
  const [city, setCity] = useState<string>("");
  const router = useRouter();
  const find_handyman_search = () => {
    if (!zip_code && !city) {
      setZip_codeError("Bitte wähle einen gültigen Standort aus");
      return;
    } else {
      setZip_codeError("");
    }
    if (city && zip_code) {
      router.push(`/handwerker-finden/${serviceCardData[1]}/${transliterateUrl(decodeURIComponent(city))}`);
      document.body.style.overflowY = "scroll";
    }
  };
  return (
    <div className="pt-12">
      <div className="pt-20 bg-gradient-radial from-[#f87b37df] via-[#f87b37ab]  w-full flex justify-center items-center py-10 px-3 flex-col">
        <Image
          src={"/Handwerker-finden/hero.svg"}
          alt="Finde einen Handwerker"
          width={800}
          height={800}
        />
      </div>
      <div className="Container my-10">
        <Services
          setServiceCardData={setServiceCardData}
          setZip_code={setZip_code}
          zip_code={zip_code}
          find_handyman_search={find_handyman_search}
          zip_codeError={zip_codeError}
          setZip_codeError={setZip_codeError}
          setCity={setCity}
          city={city}
        />
      </div>
      <div className="mb-10 w-full">
        <Craftsman />
      </div>
      <div className="space-y-8 Container pb-24">
        <Article1 />
        <Article2 />
        <Article3 />
        <div>
          <Link
            href={"/registrieren"}
            title={Find_handyman.Footer.color_text}
            className="text-orange"
          >
            {Find_handyman.Footer.color_text}{" "}
          </Link>
          <span>{Find_handyman.Footer.text}</span>
        </div>
      </div>
    </div>
  );
}
