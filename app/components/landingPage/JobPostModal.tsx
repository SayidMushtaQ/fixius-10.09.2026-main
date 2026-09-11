"use client";

import Modal from "@/components/ui/Modal";
import ServicePopUP from "@/components/landingPage/components/ServicePopUP";
import { X } from "lucide-react";
interface JobPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceCardData: string[];
}

export default function JobPostModal({ isOpen, onClose, serviceCardData }: JobPostModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 w-screen h-screen max-w-none max-h-none flex flex-col bg-white z-9999 outline-none overflow-hidden rounded-none p-0 m-0"
      overlayClassName="fixed inset-0 bg-white z-9999"
    >
      <div className="relative flex-1 min-h-0 flex flex-col overflow-hidden w-full h-full">
        <ServicePopUP 
          setServicePopUP={(val) => {
            if (typeof val === 'function') {
                if (!val(isOpen)) onClose();
            } else if (!val) {
                onClose();
            }
          }}
          servicePopUp={isOpen}
          serviceCardData={serviceCardData}
        />
      </div>
    </Modal>
  );
}
