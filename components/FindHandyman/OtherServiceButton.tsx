"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import ServiceSelectionModal from "./search/components/ServiceSelectionModal";

export default function OtherServiceButton() {
  const [servicePopUp, setServicePopUP] = useState(false);
  const [serviceCardData, setServiceCardData] = useState<string[]>([]);

  const handleOpenServices = () => {
    setServicePopUP(true);
    setServiceCardData([]);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpenServices}
        className="mt-5 inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2.5 text-[11px] font-bold text-slate-800 transition hover:border-[#f15b2a] hover:text-[#f15b2a]"
      >
        Anderen Service gesucht?
        <ArrowRight size={12} />
      </button>

      {servicePopUp && serviceCardData.length === 0 && (
        <ServiceSelectionModal
          setServicePopUP={setServicePopUP}
          setServiceCardData={setServiceCardData}
        />
      )}
    </>
  );
}