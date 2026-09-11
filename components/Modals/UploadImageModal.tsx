"use client";
import useUserRequests from "@/ApiRequests/user";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import React, { ChangeEvent, useEffect } from "react";
import { toast } from "sonner";
import { FaTimes } from "react-icons/fa";
import Modal from "@/components/ui/Modal";

// UploadImagesModal component
const UploadImagesModal = ({
  isOpen,
  setIsOpen,
  setBase64Images,
  base64Images,
  handleFileChange,
  handleUploadImages,
  isUploading,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  base64Images: { file: File; base64: string }[];
  setBase64Images: React.Dispatch<
    React.SetStateAction<{ file: File; base64: string }[]>
  >;
  handleUploadImages: Function;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isUploading: boolean;
}) => {
  // Custom hooks for user requests and authentication context
  const { UpdateCraftman } = useUserRequests();
  const { userData, getLoginUser } = useAuth();

  // Previous images from user data
  const prevImages = userData[0]?.craftsman?.images || [];

  // Function to remove an image from the container
  const handleRemove = (index: number) => {
    const updateImages = base64Images.filter((i, ind) => ind !== index);
    setBase64Images(updateImages);
  };

  // Function to handle image upload and save
  const handleUploadAndSave = async () => {
    // Check if the total number of images exceeds 10
    if (base64Images.length + prevImages?.length > 10) {
      return toast.error(
        `Sie können nicht mehr als 10 Bilder hochladen. Bitte löschen Sie einige ${
          base64Images.length + prevImages?.length - 10
        }`
      );
    }

    // Extract files from base64Images
    const files = base64Images.map((i) => i.file);

    // Upload images and get the URLs
    const uploads = await handleUploadImages(files);

    // Update user data with the new images
    await UpdateCraftman.mutateAsync(
      { images: [...prevImages, ...uploads] },
      {
        onSuccess(data) {
          toast.success(`Bilder erfolgreich hochgeladen`);
          setBase64Images([]);
          getLoginUser();
          closeModal();
        },
      }
    );
  };

  // Function to close the modal
  const closeModal = () => {
    setIsOpen(false);
    setBase64Images([]);
  };

  // Effect to update base64Images when it changes
  useEffect(() => {
    setBase64Images(base64Images);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base64Images]);

  // Render the component
  return (
    <Modal
      isOpen={isOpen ? true : false}
      onRequestClose={closeModal}
      className="mx-auto relative my-32 p-6 rounded-md bg-white shadow-lg outline-none"
      overlayClassName="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75"
    >
      {/* Close button */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <FaTimes size={20} />
      </button>

      {/* Modal content */}
      <div className="p-6 max-w-[500px]">
        <div className="flex gap-4 mb-5 flex-wrap">
          {/* Render uploaded images */}
          {base64Images?.map((image: any, index: number) => (
            <div className="relative flex flex-wrap" key={index}>
              <Image
                src={image?.base64}
                alt=""
                width={100}
                height={100}
                className="rounded"
                loading="lazy"
              />
              <FaTimes
                onClick={() => handleRemove(index)}
                className="absolute rounded-full bg-gray-500 text-white p-1 -top-2 -right-2 cursor-pointer"
                size={20}
              />
            </div>
          ))}

          {/* File input for uploading more images */}
          <label className="w-[100px] rounded border-2 flex items-center justify-center font-bold cursor-pointer border-dashed h-[100px]">
            Mehr
            <input
              type="file"
              onChange={handleFileChange}
              id="dropzone-file1"
              name="myFile1"
              title="upload images"
              aria-label="upload images"
              accept="image/*"
              className="hidden"
              multiple
            />
          </label>
        </div>

        {/* Save button */}
        <button
          onClick={handleUploadAndSave}
          disabled={isUploading}
          className={`bg-orange text-white lg:px-5 lg:py-2 px-3 py-1.5 rounded-xl
                font-medium focus:outline-none float-right disabled:cursor-not-allowed 
                disabled:opacity-50`}
        >
          Speichern
        </button>
      </div>
    </Modal>
  );
};

export default UploadImagesModal;
