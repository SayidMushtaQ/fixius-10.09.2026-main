"use client";
/* eslint-disable @next/next/no-img-element */
import Login from "@/components/Login";
import { useAuth } from "@/context/AuthContext";
import { formatTimeDifference } from "@/helper/formatTimeDifference";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MapPin, Tag, Calendar, ChevronRight, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export const JOB = ({ jobs }: any) => {
  const { userData } = useAuth();
  const user = userData?.[0];
  const [toggleLogin, setToggleLogin] = useState<boolean>(false);
  const router = useRouter();

  const handleView = () => {
    if (!user) {
      toast.error("Bitte loggen Sie sich ein, um Details zu sehen.");
      setToggleLogin(true);
      return;
    }
    if (user.role !== "handwerker" && user.role !== "admin") {
      toast.error("Nur Handwerker können Details einsehen.");
      return;
    }
    router.push(`/newjob/${jobs?._id}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-white rounded-3xl border border-gray-100 shadow-premium hover:border-orange/20 transition-all overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image Section */}
        <div className="sm:w-48 h-48 sm:h-auto relative bg-gray-50 flex-none overflow-hidden">
          {jobs?.images?.[0] ? (
            <img
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              src={`${jobs?.images[0]}`}
              alt="Projektbilder"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-300 gap-2">
              <ImageIcon size={40} strokeWidth={1.5} />
              <span className="text-xs font-bold uppercase tracking-wider">Kein Bild</span>
            </div>
          )}
          <div className="absolute top-3 left-3">
             <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-secondary text-[10px] font-black rounded-full shadow-sm uppercase tracking-wider border border-white">
                {jobs?.additional_details?.square_meters || 0} m²
             </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-orange/5 text-orange rounded-full text-[10px] font-black uppercase tracking-widest border border-orange/10">
                <Tag size={12} />
                {jobs?.category}
              </div>
              <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                <Calendar size={12} />
                {formatTimeDifference(jobs?.createdAt)}
              </div>
            </div>

            <div>
              <button 
                onClick={handleView}
                className="text-2xl font-black text-secondary hover:text-orange transition-colors text-left leading-tight decoration-orange/30 decoration-2 underline-offset-4 hover:underline"
              >
                {jobs?.serviceTitle?.service_title
                  ? jobs?.serviceTitle.service_title
                  : jobs?.serviceTitle.other_title}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-gray-500 font-medium">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-gray-50 rounded-lg text-orange">
                  <MapPin size={14} />
                </div>
                <span className="text-sm">{jobs?.location?.place_name || jobs?.location?.Place_Name}</span>
              </div>
              
              {jobs?.distance && (
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                   <span className="text-sm">{jobs?.distance} km entfernt</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
            <div className="flex -space-x-2">
               {/* Decorative avatars representing interested handymen or similar */}
               <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">
                  +3
               </div>
            </div>
            <button 
              onClick={handleView}
              className="flex items-center gap-2 text-orange font-black text-sm group/btn"
            >
              Details ansehen
              <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {toggleLogin && <Login setToggleLogin={setToggleLogin} />}
    </motion.div>
  );
};
