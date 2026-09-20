import { AnimatePresence, motion } from "framer-motion";
import GoogleAutocomplete from "@/components/Shared/GoogleAutocomplete";
import { ServiceCard } from "@/components/ServiceCard";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SliderCrouserl from "react-slick";

const Zip_code = ({
  setServicePopUP,
  setZip_code,
  zip_code,
  find_handyman_search,
  zip_codeError,
  setZip_codeError,
  city,
  setCity,
}: {
  setServicePopUP: Dispatch<SetStateAction<boolean>>;
  setZip_code: Dispatch<SetStateAction<string>>;
  zip_code: string;
  find_handyman_search: () => void;
  zip_codeError: string;
  setZip_codeError: Dispatch<SetStateAction<string>>;
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="mb-16 mt-5 mx-10 relative bg-white p-4 rounded-md py-6">
      <h2 className="text-2xl font-bold">Postleitzahl eingeben</h2>
      <p className="text-gray-500 mb-3 mt-1">
        Gib den Arbeitsort per Postleitzahl an.
      </p>
      <div className="bg-white py-3 px-2 rounded-lg border-2 flex items-center relative sm:w-100 w-full">
        <GoogleAutocomplete
          onSelect={(data) => {
            setCity(data.city);
            setZip_code(data.zipCode);
          }}
          defaultValue={zip_code}
          placeholder="Stadt oder PLZ..."
          types={["(regions)"]}
        />
      </div>
      {zip_codeError && (
        <span className="font-medium text-red-500 text-sm">
          {zip_codeError}
        </span>
      )}
      <div className="space-x-5 mt-7">
        <button
          className="border border-orange md:px-8 px-6 md:py-2 py-1 rounded-lg"
          onClick={() => {
            setServicePopUP(false);
            setZip_code("");
            setZip_codeError("");
            setCity("");
          }}
        >
          Zurück
        </button>
        <button
          className="border border-orange md:px-8 px-6 md:py-2 py-1 rounded-lg shadow bg-orange text-white"
          onClick={find_handyman_search}
        >
          Reparaturdienst suchen
        </button>
      </div>
    </div>
  );
};

export default function Services({
  setServiceCardData,
  setZip_code,
  zip_code,
  find_handyman_search,
  zip_codeError,
  setZip_codeError,
  city,
  setCity,
}: {
  setServiceCardData: Dispatch<SetStateAction<string[]>>;
  setZip_code: Dispatch<SetStateAction<string>>;
  zip_code: string;
  find_handyman_search: () => void;
  zip_codeError: string;
  setZip_codeError: Dispatch<SetStateAction<string>>;
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
}) {
  const slider = useRef<SliderCrouserl>(null);
  const [servicePopUp, setServicePopUP] = useState<boolean>(false);
  useEffect(() => {
    if (!servicePopUp) {
      document.body.style.overflowY = "scroll";
    } else {
      document.body.style.overflowY = "hidden";
    }
  }, [servicePopUp]);
  return (
    <div className="w-full">
      <section className="text-center max-w-3xl mx-auto space-y-3 mb-6">
        <h1 className="text-3xl md:text-4xl font-inter font-bold text-secondary tracking-tight">
          Finden Sie den passenden <span className="text-primary italic">Handwerker</span> für Ihr Projekt
        </h1>
        <p className="font-inter text-secondary-light text-base md:text-lg font-medium">
          Wählen Sie einfach eine Handwerker-Kategorie und Ihre Postleitzahl aus, um direkt verfügbare und geprüfte Betriebe in Ihrer Nähe zu finden.
        </p>
      </section>
      <div className="relative">
        <div className="mt-3 py-3 px-10">
          <ServiceCard
            variant="horizontal"
            slider={slider}
            slidesToShowCustom={3}
            setServicePopUP={setServicePopUP}
            setServiceCardData={setServiceCardData}
          />
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-4 lg:-mx-8">
            <button
              className="pointer-events-auto cursor-pointer bg-white/80 backdrop-blur-md rounded-full text-slate-600 shadow-premium border border-slate-200/50 hover:text-primary hover:border-primary/30 transition-all p-3 z-10"
              onClick={() => slider.current?.slickPrev()}
              aria-label="Links verschieben"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="pointer-events-auto cursor-pointer bg-white/80 backdrop-blur-md rounded-full text-slate-600 shadow-premium border border-slate-200/50 hover:text-primary hover:border-primary/30 transition-all p-3 z-10"
              onClick={() => slider.current?.slickNext()}
              aria-label="Rechts verschieben"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
      {servicePopUp && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setServicePopUP(false)}
            className="absolute inset-0 bg-secondary/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-md p-8 md:p-10"
          >
            <div className="text-center space-y-3 mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-2">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-secondary tracking-tight">Standort wählen</h2>
              <p className="text-secondary/50 text-sm font-medium">
                Geben Sie Ihre Postleitzahl ein, um Handwerker in Ihrer Nähe zu finden.
              </p>
            </div>

            <div className="space-y-6">
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors z-10 font-bold text-sm">
                  PLZ
                </div>
                <div className="w-full pl-16 pr-5 py-1 bg-gray-50 border-2 border-transparent focus-within:border-primary/20 focus-within:bg-white rounded-2xl outline-none transition-all shadow-xs min-h-14.5 flex items-center">
                  <GoogleAutocomplete
                    onSelect={(data) => {
                      setCity(data.city);
                      setZip_code(data.zipCode);
                    }}
                    defaultValue={zip_code}
                    placeholder="z. B. 10115"
                    types={["(regions)"]}
                  />
                </div>

                {city && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary/10 text-primary px-3 py-1 rounded-lg text-xs font-bold z-10">
                    {city}
                  </div>
                )}
              </div>

              {zip_codeError && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-red-500 font-bold text-xs"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  {zip_codeError}
                </motion.div>
              )}

              <div className="flex flex-col gap-3 pt-4">
                <button
                  className="w-full bg-primary hover:bg-orange text-white py-4 rounded-2xl font-bold tracking-wide shadow-sm hover:shadow-md transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 group"
                  onClick={find_handyman_search}
                >
                  Regional suchen
                  <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  className="w-full bg-gray-50 hover:bg-gray-100 text-secondary/60 py-4 rounded-2xl font-bold transition-all"
                  onClick={() => {
                    setServicePopUP(false);
                    setZip_code("");
                    setZip_codeError("");
                    setCity("");
                  }}
                >
                  Abbrechen
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
