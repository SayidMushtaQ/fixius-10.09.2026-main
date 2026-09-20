"use client";

import Image from "next/image";
import { HiStar } from "react-icons/hi";
import { motion } from "framer-motion";
import { AdvancedImage, responsive, placeholder, lazyload } from "@cloudinary/react";
import { cld } from "@/lib/cloudinary";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";
import { auto } from "@cloudinary/url-gen/qualifiers/format";
import { auto as autoQuality } from "@cloudinary/url-gen/qualifiers/quality";

export const CraftsmanCard = ({ name, job, img, index }: { name: string; job: string; img: string; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group bg-white rounded-xl border border-slate-100 p-5 shadow-soft w-full max-w-70"
    >
      <div className="relative aspect-square rounded-lg overflow-hidden mb-6">
        {img?.includes("cloudinary.com") ? (
          <AdvancedImage
            cldImg={cld.image(img.split('/').pop()?.split('.')[0] || img)
              .resize(fill().width(280).height(280))
              .delivery(format(auto()))
              .delivery(quality(autoQuality()))}
            plugins={[responsive(), placeholder({ mode: 'blur' }), lazyload()]}
            className="w-full h-full object-cover transition-transform duration-500"
          />
        ) : (
          <Image
            src={img}
            alt={name}
            fill
            className="w-full h-full object-cover transition-transform duration-500"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-secondary/40 via-transparent to-transparent opacity-0 transition-opacity duration-300" />
      </div>

      <div className="text-center space-y-2 pb-1">
        <h3 className="text-xl font-inter font-medium text-secondary transition-colors leading-tight">
          {name}
        </h3>
        <p className="font-inter text-secondary-light font-semibold text-sm">
          {job}
        </p>
        <div className="flex justify-center items-center gap-1.5 pt-2">
          <div className="flex items-center gap-1 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            {[1,2,3,4,5].map(i => (
              <HiStar key={i} className="text-primary" size={16} />
            ))}
            <span className="font-inter text-[10px] font-bold text-secondary ml-1">5.0</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
