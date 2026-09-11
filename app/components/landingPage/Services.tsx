"use client";

import { ServiceCards } from "@/constants/landingPage";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useRef } from "react";
import JobPostModal from "./JobPostModal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { CategoryCard } from "@/components/CategoryCard";

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<[string, string]>([
    "",
    "",
  ]);
  const sliderRef = useRef<Slider>(null);

  const handleServiceClick = (
    e: React.MouseEvent,
    shortText: string,
    slug: string,
  ) => {
    e.preventDefault();
    setSelectedService([shortText, slug]);
    setIsModalOpen(true);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    rows: 3,
    arrows: false,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
    <section className="pt-20 pb-12 bg-main-background overflow-hidden">
      <div className="Container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-3xl md:text-4xl font-inter font-bold text-secondary leading-tight tracking-tight">
              Finden Sie den passenden <span className="text-primary italic">Handwerker</span> für Ihr Projekt
            </h2>
            <p className="font-inter text-secondary-light text-lg font-medium">
              Wählen Sie einfach eine Kategorie aus, um kostenlose Angebote von geprüften Fachbetrieben in Ihrer Nähe zu erhalten.
            </p>
          </div>
        </div>

        <div className="relative group/slider">
          {/* Custom Arrows */}
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-8 z-10 w-11 h-11 rounded-full bg-white/80 backdrop-blur-md shadow-premium border border-slate-200/50 hidden md:flex items-center justify-center text-slate-600 hover:text-primary hover:border-primary/30 transition-all duration-300"
            aria-label="Vorherige"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={() => sliderRef.current?.slickNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-8 z-10 w-11 h-11 rounded-full bg-white/80 backdrop-blur-md shadow-premium border border-slate-200/50 hidden md:flex items-center justify-center text-slate-600 hover:text-primary hover:border-primary/30 transition-all duration-300"
            aria-label="Nächste"
          >
            <ArrowRight size={20} />
          </button>

          <Slider
            ref={sliderRef}
            {...settings}
            className="category-slider -mx-3"
          >
            {ServiceCards.map((service, index) => (
              <div key={service.id} className="px-3 pb-8">
                <CategoryCard
                  icon={service.icon}
                  title={service.shortText}
                  onClick={(e) => handleServiceClick(e, service.shortText, service.slug)}
                  className="w-full h-full"
                />
              </div>
            ))}
          </Slider>
        </div>


      </div>

      <JobPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceCardData={selectedService}
      />
    </section>
  );
}
