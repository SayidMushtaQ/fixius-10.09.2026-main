"use client";

import useUserRequests from "@/ApiRequests/user";
import Loader from "@/components/Loader";
import clientError from "@/helper/clientError";
import useOnChangeUploadImages from "@/hooks/useUploadImage";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { useGoogleMapsScript } from "@/hooks/useGoogleMapsScript";
import { toast } from "sonner";
import { BsBook, BsCardImage } from "react-icons/bs";
import GoogleAutocomplete from "@/components/Shared/GoogleAutocomplete";
import { motion } from "framer-motion";
import { Upload, ChevronRight, ChevronLeft, User, Building, Mail, Phone, MapPin, Search } from "lucide-react";

const InputBoxes = ({
  setInputData,
  inputData,
  setInputDataError,
  inputDataError,
  inputDataRef,
}: any) => {
  const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInputData((prev: any) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "phone_number") {
      setInputDataError((prev: any) => ({ ...prev, phoneError: "" }));
    } else if (inputDataError[`${name}Error`]) {
      setInputDataError((prev: any) => ({ ...prev, [`${name}Error`]: "" }));
    }
  };

  const inputClasses = "w-full h-14 bg-[#eff6ff] border border-transparent rounded-2xl px-12 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-secondary font-semibold placeholder:text-gray-400 shadow-sm";
  const labelClasses = "block text-sm font-extrabold text-secondary mb-2 ml-1";
  const iconClasses = "absolute left-4 top-[46px] text-gray-400 group-focus-within:text-primary transition-colors z-10";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
      {/* Column 1 */}
      <div className="space-y-6">
        <div className="group relative">
          <label htmlFor="first_name" className={labelClasses}>Name</label>
          <User className={iconClasses} size={20} />
          <input
            type="text"
            id="first_name"
            className={inputClasses}
            name="first_name"
            placeholder="Gib deinen Namen ein"
            value={inputData.first_name}
            onChange={handleChangeEvent}
            required
          />
          {inputDataError.first_nameError && (
            <p className="text-xs font-bold text-red-500 mt-1 ml-2">{inputDataError.first_nameError}</p>
          )}
        </div>

        <div className="group relative">
          <label htmlFor="company_name" className={labelClasses}>Firmenname</label>
          <Building className={iconClasses} size={20} />
          <input
            type="text"
            id="company_name"
            className={inputClasses}
            name="company_name"
            required
            placeholder="Gib den Namen deines Unternehmens ein"
            value={inputData.company_name}
            onChange={handleChangeEvent}
          />
          {inputDataError.company_nameError && (
            <p className="text-xs font-bold text-red-500 mt-1 ml-2">{inputDataError.company_nameError}</p>
          )}
        </div>

        <div className="group relative">
          <label htmlFor="email_address" className={labelClasses}>E-Mail-Adresse</label>
          <Mail className={iconClasses} size={20} />
          <input
            type="email"
            required
            id="email_address"
            className={inputClasses}
            name="email_address"
            placeholder="xyz@gmail.com"
            value={inputData.email_address}
            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
            onChange={handleChangeEvent}
          />
          {inputDataError.email_addressError && (
            <p className="text-xs font-bold text-red-500 mt-1 ml-2">{inputDataError.email_addressError}</p>
          )}
        </div>
      </div>

      {/* Column 2 */}
      <div className="space-y-6">
        <div className="group relative">
          <label htmlFor="last_name" className={labelClasses}>Nachname</label>
          <User className={iconClasses} size={20} />
          <input
            type="text"
            id="last_name"
            required
            className={inputClasses}
            name="last_name"
            placeholder="Gib deinen Nachnamen ein"
            value={inputData.last_name}
            onChange={handleChangeEvent}
          />
          {inputDataError.last_nameError && (
            <p className="text-xs font-bold text-red-500 mt-1 ml-2">{inputDataError.last_nameError}</p>
          )}
        </div>

        <div className="group relative">
          <label htmlFor="zip_Code" className={labelClasses}>Firmensitz (Straße & Hausnummer)</label>
          <MapPin className={iconClasses} size={20} />
          <div className="w-full h-14 bg-[#eff6ff] border border-transparent rounded-2xl px-12 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-200 shadow-sm flex items-center relative">
            <GoogleAutocomplete
              placeholder="Adresse suchen..."
              className="w-full h-full text-secondary font-semibold placeholder:text-gray-400"
              defaultValue={(inputData.address as any)?.formattedAddress || inputData.streetAddress || ""}
              onSelect={(data) => {
                const isFullAddress = !!(data.street && data.houseNumber);
                const fullStreetAddress = isFullAddress
                  ? `${data.street} ${data.houseNumber}`.trim() 
                  : data.formattedAddress.split(',')[0];

                if (!isFullAddress) {
                  setInputDataError((e: any) => ({
                    ...e,
                    streetAddressError: "Bitte wählen Sie eine vollständige Adresse inkl. Straße und Hausnummer.",
                  }));
                } else {
                  setInputDataError((e: any) => ({ ...e, zip_codeError: "", streetAddressError: "" }));
                }

                setInputData((prev: any) => {
                  const newData = {
                    ...prev,
                    zip_code: data.zipCode,
                    streetAddress: fullStreetAddress,
                    hasFullAddress: isFullAddress,
                    address: {
                      placeName: data.city,
                      zipCode: data.zipCode,
                      coordinates: data.coordinates,
                      formattedAddress: data.formattedAddress,
                    },
                  };
                  if (inputDataRef) inputDataRef.current = newData;
                  return newData;
                });
              }}
            />
          </div>
          {(inputDataError.zip_codeError || inputDataError.streetAddressError) && (
            <p className="text-xs font-bold text-red-500 mt-1 ml-2">
              {inputDataError.zip_codeError || inputDataError.streetAddressError}
            </p>
          )}
        </div>

        <div className="group relative">
          <label htmlFor="phone_number" className={labelClasses}>Telefonnummer</label>
          <Phone className={iconClasses} size={20} />
          <input
            type="tel"
            id="phone_number"
            className={inputClasses}
            name="phone_number"
            placeholder="+49 123 456789"
            value={inputData.phone_number}
            required
            onChange={handleChangeEvent}
          />
          {inputDataError.phoneError && (
            <p className="text-xs font-bold text-red-500 mt-1 ml-2">{inputDataError.phoneError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default function RegisterForms({
  step,
  setStep,
  selectCard,
  setSelectCardError,
  setSelectCard,
}: {
  step: Number;
  setStep: React.Dispatch<React.SetStateAction<Number>>;
  selectCard: string[];
  setSelectCardError: React.Dispatch<React.SetStateAction<string>>;
  setSelectCard: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [tradeLincence, setTradeLincence] = useState<string[]>([]);
  const [craftCard, setCraftCard] = useState<string[]>([]);
  const { CreateUser } = useUserRequests();
  const { isImgUploading, handleImageUpload } = useOnChangeUploadImages();
  const handleError = clientError();
  
  const [inputData, setInputData] = useState<any>({
    first_name: "",
    last_name: "",
    company_name: "",
    password: "",
    zip_code: "",
    email_address: "",
    phone_number: "",
    address: "",
    streetAddress: "",
    hasFullAddress: false,
  });

  const [inputDataError, setInputDataError] = useState<any>({});
  const router = useRouter();
  const inputDataRef = useRef(inputData);

  useEffect(() => {
    inputDataRef.current = inputData;
  }, [inputData]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, setter: any) => {
    const data = await handleImageUpload(event);
    if (data && data.length > 0) setter([data[0]]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentData = inputDataRef.current;
    const errors: any = {};

    if (!currentData.first_name?.trim()) {
      errors.first_nameError = "Bitte gib deinen Namen ein.";
    }
    if (!currentData.last_name?.trim()) {
      errors.last_nameError = "Bitte gib deinen Nachnamen ein.";
    }
    if (!currentData.company_name?.trim()) {
      errors.company_nameError = "Bitte gib deinen Firmennamen ein.";
    }
    if (!currentData.email_address?.trim()) {
      errors.email_addressError = "Bitte gib deine E-Mail-Adresse ein.";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(currentData.email_address)) {
      errors.email_addressError = "Bitte gib eine gültige E-Mail-Adresse ein.";
    }
    if (!currentData.phone_number?.trim()) {
      errors.phoneError = "Bitte gib deine Telefonnummer ein.";
    }
    if (!currentData.streetAddress || !currentData.zip_code || !currentData.hasFullAddress) {
      errors.zip_codeError = "Bitte wähle eine vollständige Adresse inkl. Straße und Hausnummer aus.";
    }

    if (Object.keys(errors).length === 0) {
      if (step === 2) {
        setStep(3);
      } else if (step === 3) {
        const documents = [
          ...craftCard.map(link => ({ document_type: "craft_card", document_link: link })),
          ...tradeLincence.map(link => ({ document_type: "trade_licence", document_link: link }))
        ];

        if (documents.length === 0) return toast.error("Bitte Dokument hochladen.");

        const userData = {
          name: currentData.first_name,
          lastName: currentData.last_name,
          email: currentData.email_address,
          phone: currentData.phone_number,
          zipCode: currentData.zip_code,
          address: currentData.address,
          streetAddress: currentData.streetAddress,
          role: "handwerker",
          craftmanDetails: {
            services: selectCard,
            documents,
            company_name: currentData.company_name,
          },
        };

        try {
          await CreateUser.mutateAsync(userData, {
            onSuccess: (data) => {
              router.push("/");
              toast.success("Erfolgreich registriert!");
            }
          });
        } catch (err: any) {
          handleError(err);
        }
      }
    } else {
      setInputDataError(errors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {step === 2 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
          <InputBoxes
            setInputData={setInputData}
            inputData={inputData}
            setInputDataError={setInputDataError}
            inputDataError={inputDataError}
            inputDataRef={inputDataRef}
          />
          
          <div className="flex justify-between items-center pt-8 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center gap-2 text-secondary font-bold hover:text-primary transition-colors"
            >
              <ChevronLeft size={20} /> Zurück
            </button>
            <button
              type="submit"
              className="btn-primary group px-10"
            >
              Weiter <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Trade Licence Upload */}
            <div className="relative group">
              <label className="block text-sm font-bold text-secondary mb-4 ml-1">Gewerbeanmeldung</label>
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-200 rounded-4xl hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                {tradeLincence[0] ? (
                  <div className="relative w-full h-full p-4">
                    <Image src={tradeLincence[0]} alt="Trade Licence" fill className="object-contain rounded-2xl" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <BsBook size={32} />
                    </div>
                    <span className="text-gray-500 font-medium">Gewerbeanmeldung hochladen</span>
                  </div>
                )}
                <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, setTradeLincence)} accept="image/*" />
              </label>
            </div>

            {/* Craft Card Upload */}
            <div className="relative group">
              <label className="block text-sm font-bold text-secondary mb-4 ml-1">Handwerkskarte</label>
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-200 rounded-4xl hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
                {craftCard[0] ? (
                  <div className="relative w-full h-full p-4">
                    <Image src={craftCard[0]} alt="Craft Card" fill className="object-contain rounded-2xl" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <BsCardImage size={32} />
                    </div>
                    <span className="text-gray-500 font-medium">Handwerkskarte hochladen</span>
                  </div>
                )}
                <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, setCraftCard)} accept="image/*" />
              </label>
            </div>
          </div>

          <div className="flex justify-between items-center pt-8 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex items-center gap-2 text-secondary font-bold hover:text-primary transition-colors"
            >
              <ChevronLeft size={20} /> Zurück
            </button>
            <button
              disabled={CreateUser.isPending || isImgUploading}
              type="submit"
              className="btn-primary px-10"
            >
              {CreateUser.isPending ? "Wird verarbeitet..." : "Registrierung abschließen"}
            </button>
          </div>
        </motion.div>
      )}
    </form>
  );
}
