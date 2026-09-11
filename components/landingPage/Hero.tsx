import React from "react";
import HeroSearchAndText from "./components/HeroSearchAndText";
import { GalleryShowcase } from "./components/GalleryShowcase";
import Image from "next/image";
import HeroImage from "../../public/LandingPage/landingPage.png";

export default function Hero() {
  return (
    <div className="w-full lg:px-5 px-1 mt-5">
      {/* Search Section - Modern Centered Layout */}
      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-72 max-w-3xl bg-[radial-gradient(closest-side,rgba(255,153,0,0.1),transparent)] opacity-60"
        />
        <div className="mx-auto max-w-4xl px-4 pt-8 pb-8 text-center">
          <HeroSearchAndText homePageOrNOt={true} />
        </div>
      </div>


      {/* Keep the original side-by-side layout as fallback/alternative view */}
      <div className="hidden lg:flex items-start justify-between flex-col lg:flex-row gap-3 md:gap-0 mt-10">
        <Image
          src={"/bilder-seite-handwerker/HandwerkerSticker.webp"}
          alt="Pegatina"
          className="h-auto w-auto absolute top-20 -left-3 -z-10"
          width={100}
          height={100}
        />
        <div className="pt-6 relative mt-10 lg:mt-0">
          <Image
            src={"/bilder-seite-handwerker/Handwerker-Bild.webp"}
            className="h-auto w-auto"
            alt="Pegatina"
            width={660}
            height={660}
          />
          <Image
            src={"/bilder-seite-handwerker/HandwerkerSticker2.webp"}
            alt="Pegatina"
            className="h-auto w-auto absolute bottom-20 -z-10 -left-10"
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  );
}
