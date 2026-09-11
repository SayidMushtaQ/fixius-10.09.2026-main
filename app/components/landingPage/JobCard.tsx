"use client";

import Image from "next/image";
import { useState } from "react";
import { HiLocationMarker, HiClock } from "react-icons/hi";
import { motion } from "framer-motion";
import { AdvancedImage, responsive, placeholder, lazyload } from "@cloudinary/react";
import { cld } from "@/lib/cloudinary";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { format, quality } from "@cloudinary/url-gen/actions/delivery";
import { auto } from "@cloudinary/url-gen/qualifiers/format";
import { auto as autoQuality } from "@cloudinary/url-gen/qualifiers/quality";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Login from "@/components/Login";
import { formatTimeDifference } from "@/helper/formatTimeDifference";

export const JobCard = ({ job, index }: { job: any; index: number }) => {
  const imageUrl = job?.images?.[0] || job?.image || "";
  const { userData } = useAuth();
  const user = userData?.[0];
  const [toggleLogin, setToggleLogin] = useState(false);
  const router = useRouter();

  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Bitte loggen Sie sich ein, um Details zu sehen.");
      setToggleLogin(true);
      return;
    }
    if (user.role !== "handwerker" && user.role !== "admin") {
      toast.error("Nur Handwerker können Details einsehen.");
      return;
    }
    router.push(`/auftrag/${job?._id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="group flex flex-col bg-white rounded-xl border border-slate-100 shadow-soft hover:shadow-premium hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden rounded-t-xl">
        {imageUrl.includes("cloudinary.com") ? (
          <AdvancedImage
            cldImg={cld.image(imageUrl.split('/').pop()?.split('.')[0] || imageUrl)
              .resize(fill().width(400).height(300))
              .delivery(format(auto()))
              .delivery(quality(autoQuality()))}
            plugins={[responsive(), placeholder({ mode: 'blur' }), lazyload()]}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <Image 
          src={imageUrl || "/HandwerkerBilder/premium-handyman.png"} 
          alt={job?.serviceTitle?.service_title || "Projektbild"}
          fill
          className="object-cover transition-transform duration-500"
        />
        )}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20 shadow-sm">
          <span className="font-inter text-[10px] font-bold text-primary uppercase tracking-wider">
            {job?.serviceTitle?.service_title || "Allgemein"}
          </span>
        </div>
      </div>

      <div className="grow p-6 flex flex-col justify-between gap-5">
        <div className="space-y-2.5">
          <h3 className="text-xl font-inter font-medium text-secondary group-hover:text-primary transition-colors line-clamp-1 leading-tight">
            {job?.serviceTitle?.service_title || job?.serviceTitle?.other_title}
          </h3>
          <p className="font-inter text-secondary-light text-sm line-clamp-2 font-medium leading-relaxed">
            {job?.description}
          </p>
        </div>

        <div className="space-y-4 pt-2 border-t border-slate-50">
          <div className="flex items-center justify-between font-inter text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
            <div className="flex items-center gap-1.5">
              <HiLocationMarker className="text-primary/70" size={14} />
              <span>{job?.location?.place_name || "Deutschland"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HiClock className="text-primary/70" size={14} />
              <span>{job?.createdAt ? formatTimeDifference(job.createdAt) : "Neu"}</span>
            </div>
          </div>

          <button
            onClick={handleViewDetails}
            className="font-inter w-full btn-primary py-2.5 text-sm rounded-lg text-center cursor-pointer"
          >
            Details ansehen
          </button>
        </div>
      </div>
      {toggleLogin && <Login setToggleLogin={setToggleLogin} />}
    </motion.div>
  );
};

