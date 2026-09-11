import React from "react";
import { IoMdClose } from "react-icons/io";
import { Services } from "@/components";

interface OtherServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OtherServicesModal: React.FC<OtherServicesModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10 bg-white rounded-full p-1 shadow-sm"
        >
          <IoMdClose size={24} />
        </button>

        <div className="p-6 md:p-10">
          <Services />
        </div>
      </div>
    </div>
  );
};

export default OtherServicesModal;
