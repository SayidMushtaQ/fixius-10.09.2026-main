"use client";
import { NotFoundData } from "@/components/Dashboard/handwerker/Pedidos";
import Image from "next/image";
import { useRef } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import SliderCrouserl from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
const settings = {
  infinite: false,
  arrows: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  initialSlide: 0,
  rows: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
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

const ImageCrousel = ({ images = [] }: any) => {
  const slider = useRef<SliderCrouserl>(null);
  console.log(images);
  return (
    <div>
      <div className="mb-3">
        <h2 className="text-3xl font-semibold">Fotos</h2>
      </div>
      <SliderCrouserl {...settings} ref={slider}>
        {images.map((img: string, ind: number) => (
          <div key={ind}>
            <Image
              src={img}
              alt={`crousel ${ind}`}
              width={700}
              height={700}
              className="object-cover h-[25rem] p-2 rounded-2xl"
            />
          </div>
        ))}
      </SliderCrouserl>
      <div className="hidden sm:block">
        <div
          className="text-4xl  flex justify-center gap-6 my-4"
          aria-hidden="true"
        >
          <button
            className="cursor-pointer bg-orange rounded-full text-white"
            onClick={() => slider.current?.slickPrev()}
            aria-label="Left shift"
            aria-hidden="true"
          >
            <IoIosArrowBack className="text-[48px] sm:text-[30px]" />
          </button>
          <button
            className="cursor-pointer bg-orange rounded-full text-white"
            onClick={() => slider.current?.slickNext()}
            aria-label="right shift"
            aria-hidden="true"
          >
            <IoIosArrowForward className="text-[48px] sm:text-[30px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AboutBusiness({ data = {} }: any) {
  console.log(data?.description);
  return (
    <div>
      <section className="space-y-5 mb-10">
        <h1 className="text-3xl font-bold">
          Über <span className="text-orange">Unternehmen</span>
        </h1>
        <p className="lg:w-3/4 w-full">{data?.description}</p>
      </section>
      <div className="mb-3">
        {/*<h2 className="text-3xl font-semibold">Fotos</h2>*/}
      </div>
      {data?.images.length > 0 ? (
        <ImageCrousel images={data?.images} />
      ) : (
        <NotFoundData text="Keine Bilder gefunden" />
      )}
    </div>
  );
}
