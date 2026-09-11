import Image from "next/image";
import React from "react";
import { FaArrowRight, FaCheck } from "react-icons/fa";

interface ServiceRequestCardProps {
  serviceName: string;
  icon: string;
  onOpenServices: () => void;
  onRequestQuote: () => void;
}

const ServiceRequestCard: React.FC<ServiceRequestCardProps> = ({
  serviceName,
  icon,
  onOpenServices,
  onRequestQuote,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg border border-gray-100 p-8 md:p-12 text-center my-8">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-[#FDF4F0] rounded-full flex items-center justify-center">
          {icon ? (
            <Image src={icon} alt={serviceName} width={40} height={40} />
          ) : (
            <div className="w-10 h-10 bg-orange rounded-full opacity-20"></div>
          )}
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        {serviceName} beauftragen
      </h2>

      <p className="text-gray-500 mb-8">
        Klicken Sie hier, um in wenigen Schritten Ihren Auftrag zu erstellen
      </p>

      <button
        onClick={onRequestQuote}
        className="w-full md:w-3/4 bg-orange hover:opacity-90 text-white font-semibold py-4 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 mx-auto mb-6"
      >
        Jetzt Auftrag erstellen <FaArrowRight />
      </button>

      <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm text-gray-500 mb-8">
        <span className="flex items-center gap-1">
          <FaCheck className="text-gray-400" /> 100% kostenlos
        </span>
        <span className="flex items-center gap-1">
          <FaCheck className="text-gray-400" /> Unverbindlich
        </span>
        <span className="flex items-center gap-1">
          <FaCheck className="text-gray-400" /> Geprüfte Profis
        </span>
      </div>

      <button
        onClick={onOpenServices}
        className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 mx-auto"
      >
        Anderer Service gesucht? <FaArrowRight />
      </button>
    </div>
  );
};

export default ServiceRequestCard;
