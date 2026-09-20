"use client";

import React from "react";
import HeroSearchAndText from "./HeroSearchAndText";
import Image from "next/image";
import { motion } from "framer-motion";

const gallery = [
  {
    src: "/HandwerkerBilder/Handwerker1.png",
    alt: "Handwerker bei der Arbeit",
    label: "Malerarbeiten"
  },
  {
    src: "/HandwerkerBilder/Handwerker2.webp",
    alt: "Handwerker repariert",
    label: "Elektrik"
  },
  {
    src: "/HandwerkerBilder/Handwerker3.webp",
    alt: "Handwerker installiert",
    label: "Sanitär"
  },
  {
    src: "/HandwerkerBilder/Handwerker4.webp",
    alt: "Handwerker arbeitet",
    label: "Tischlerei"
  },
];

export default function Hero() {
  return (
    <>
      <section className="relative w-full z-20 bg-white flex items-center">
        <div className="Container flex items-center">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full pt-20 pb-8">
          {/* Left Content (Search) */}
          <HeroSearchAndText homePageOrNot={true} />

          {/* Right Content (Polished Overlapping Visual) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative lg:w-1/2 hidden lg:flex items-center justify-center p-12"
          >
            {/* Small Dot Pattern Accent */}
            <div className="absolute left-6 top-1/4 text-primary/20">
              <DotPatternSmall />
            </div>

            <div className="relative w-full max-w-md aspect-4/5">
              {/* Top Left Image (Painter) */}
              <motion.div 
                initial={{ opacity: 0, y: -20, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: -2 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute top-0 left-0 w-[65%] aspect-3/4 z-20 shadow-2xl rounded-3xl overflow-hidden border-8 border-white"
              >
                <Image
                  src="/NewImages/painter.png"
                  className="w-full h-full object-cover"
                  alt="Painter"
                  width={400}
                  height={500}
                  priority
                  unoptimized
                />
              </motion.div>

              {/* Bottom Right Image (Electrician) with Accent Box */}
              <motion.div 
                initial={{ opacity: 0, y: 20, rotate: 2 }}
                animate={{ opacity: 1, y: 0, rotate: 2 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute bottom-4 right-0 w-[65%] aspect-3/4 z-10"
              >
                {/* Subtle Orange Accent Shape behind image */}
                <div className="absolute -top-4 -left-4 w-full h-full bg-primary/90 rounded-3xl -z-10" />
                
                <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
                  <Image
                    src="/NewImages/electrician.png"
                    className="w-full h-full object-cover"
                    alt="Electrician"
                    width={400}
                    height={500}
                    unoptimized
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      </section>
    </>
  );
}

function DotPatternSmall() {
  return (
    <svg width="60" height="80" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {[...Array(4)].map((_, i) => (
        [...Array(6)].map((_, j) => (
          <rect key={`${i}-${j}`} x={i * 12} y={j * 12} width="4" height="4" fill="currentColor" />
        ))
      ))}
    </svg>
  );
}
