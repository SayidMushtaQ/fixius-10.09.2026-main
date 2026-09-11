"use client";

import Image from "next/image";

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

export function GalleryShowcase() {
  return (
    <div className="mx-auto mt-6 max-w-6xl px-4 pb-16 md:px-6">
      <div className="relative rounded-3xl border border-gray-200 bg-white p-2 shadow-xl md:p-3">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
          {gallery.map((item) => (
            <div key={item.label} className="group relative overflow-hidden rounded-2xl">
              <Image
                src={item.src || "/placeholder.svg"}
                alt={item.alt}
                width={400}
                height={500}
                className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-64"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-900/75 to-transparent p-3">
                <span className="text-sm font-semibold text-white">{item.label}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-6 rounded-2xl border border-gray-200 bg-white px-6 py-3 shadow-lg">
          <div className="text-center">
            <p className="text-lg font-extrabold text-gray-800">45.000+</p>
            <p className="text-xs text-gray-500">Handwerker</p>
          </div>
          <div className="h-8 w-px bg-gray-200" />
          <div className="text-center">
            <p className="text-lg font-extrabold text-gray-800">200+</p>
            <p className="text-xs text-gray-500">Gewerke</p>
          </div>
          <div className="h-8 w-px bg-gray-200" />
          <div className="text-center">
            <p className="text-lg font-extrabold text-orange">kostenlos</p>
            <p className="text-xs text-gray-500">Angebote</p>
          </div>
        </div>
      </div>
    </div>
  );
}
