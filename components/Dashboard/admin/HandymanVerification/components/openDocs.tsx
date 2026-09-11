"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Modal from "@/components/ui/Modal";
import useUserRequests from "@/ApiRequests/user";
import CompareDocs from "./compareDocs";

// Modal styling with Tailwind CSS classes
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    maxWidth: "90%",
    maxHeight: "90%",
  },
};

// Supported file extensions
const supportedExtensions = ["jpg", "jpeg", "png", "gif", "pdf"];

const OpenDocs = ({
  isOpen,
  onClose,
  documentUrls,
  userId,
  companyName,
}: {
  isOpen: boolean;
  onClose: () => void;
  documentUrls: string[];
  userId: string;
  companyName: string;
}) => {
  const [currentDocumentIndex, setCurrentDocumentIndex] = useState<number>(0);
  const [isCompare, setIsCompare] = useState(false);
  const { GetUser } = useUserRequests();
  const { data: userData } = GetUser({ _id: userId });
  // Determine file extension
  const getFileExtension = (url: string): string | null => {
    const extension = url.split(".").pop()?.toLowerCase() || "";
    return supportedExtensions.includes(extension) ? extension : null;
  };

  const handleNext = () => {
    if (currentDocumentIndex < documentUrls.length - 1) {
      setCurrentDocumentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentDocumentIndex > 0) {
      setCurrentDocumentIndex((prevIndex) => prevIndex - 1);
    }
  };

  if (!isOpen || !documentUrls.length) {
    return null;
  }

  const currentDocumentUrl: any = documentUrls[currentDocumentIndex];
  const fileExtension = getFileExtension(currentDocumentUrl?.document_link);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Dokumenten-Modal"
        className="mx-auto relative p-5 my-32 p-6 rounded-md bg-white shadow-lg outline-none"
        overlayClassName="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={20} />
        </button>
        <p className="text-semibold py-2 ">
          Dokumentname:{" "}
          <Link
            href={currentDocumentUrl.document_link}
            target="_blank"
            className=" text-blue-500 capitalize "
          >
            {currentDocumentUrl.document_type.split("_").join(" ")}
          </Link>
        </p>
        <div className="w-full h-full flex flex-col justify-center items-center">
          {fileExtension === "pdf" ? (
            <iframe
              title="Dokumentenanzeige"
              src={currentDocumentUrl.document_link}
              width="100%"
              height="80%"
              className="border-none mb-4"
            />
          ) : (
            <Image
              height={300}
              width={300}
              src={currentDocumentUrl.document_link}
              alt="Dokumentenbetrachter"
              className="w-full h-96 mb-4"
            />
          )}
          <div className="flex justify-between w-full">
            <button
              onClick={handlePrev}
              className=" globalbtn text-white "
              disabled={currentDocumentIndex === 0}
            >
              Zurück
            </button>

            <button
              onClick={() => setIsCompare(true)}
              className=" globalbtn text-white"
            >
              Vergleichen
            </button>
            <button
              onClick={handleNext}
              className=" globalbtn text-white "
              disabled={currentDocumentIndex === documentUrls.length - 1}
            >
              Weiter
            </button>
          </div>
        </div>
        {/* <CompareDocs
				isOpen={isCompare}
				closeModal={setIsCompare}
				src={currentDocumentUrl.document_link}
				userId={userId}
				fileExtension={fileExtension}
			/> */}
      </Modal>
      <Modal
        isOpen={isCompare}
        onRequestClose={() => setIsCompare(false)}
        contentLabel="Vergleichen Modal"
        className="mx-auto relative p-5 my-10 p-6 rounded-md bg-white shadow-lg outline-none w-[95%] h-[90%]"
        overlayClassName="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75"
      >
        <button
          onClick={() => setIsCompare(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 z-10"
        >
          <FaTimes size={20} />
        </button>
        <div className="flex w-full h-full gap-4">
          <div className="w-1/2 h-full flex flex-col items-center justify-center border-r pr-4">
            <h3 className="text-lg font-bold mb-2">Dokument</h3>
            {fileExtension === "pdf" ? (
              <iframe
                title="Dokumentenanzeige"
                src={currentDocumentUrl.document_link}
                width="100%"
                height="100%"
                className="border-none"
              />
            ) : (
              <div className="relative w-full h-full">
                <Image
                  src={currentDocumentUrl.document_link}
                  alt="Dokumentenbetrachter"
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>
          <div className="w-1/2 h-full overflow-y-auto pl-4">
            <h3 className="text-lg font-bold mb-2">Benutzerdaten</h3>
            {userData && (
              <CompareDocs data={userData} company_name={companyName} />
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default OpenDocs;
