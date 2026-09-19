"use client";

import { ServiceCards } from "@/constants/landingPage";
import Image from "next/image";
import React, { useCallback, useEffect, useState, useRef } from "react";
// import ServicePopUpPage from "./ServicePopUP"; // Will migrate this later
import { toast } from "sonner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, ShieldCheck, Star, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import JobPostModal from "./JobPostModal";

// Each chip carries the real ServiceCards slug: deriving one from the label
// produced slugs like "sanitär"/"umzug" that match no service and no questions.
const popularSearches: { label: string; slug: string }[] = [
  { label: "Maler", slug: "maler" },
  { label: "Elektriker", slug: "elektriker" },
  { label: "Sanitär", slug: "sanitaer" },
  { label: "Umzug", slug: "umzugsunternehmen" },
  { label: "Gartenbauer", slug: "gartenbauer" },
  { label: "Fliesenleger", slug: "fliesenleger" },
];

type SearchProps = {
  id: number;
  icon: string;
  shortText: string;
  slug: string;
};

export default function HeroSearchAndText({
  homePageOrNot = false,
  title = true,
  searchDefaultField = "",
  initialSlug = "",
}: {
  homePageOrNot?: boolean;
  title?: boolean;
  searchDefaultField?: string;
  initialSlug?: string;
}) {
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [services, setServices] = useState<SearchProps[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [query, setQuery] = useState(searchDefaultField);
  const [selectedService, setSelectedService] = useState<
    [string, string] | null
  >(initialSlug ? ["", initialSlug] : null);

  // Initialize services and selection based on props
  useEffect(() => {
    if (initialSlug) {
      const found = ServiceCards.find((s) => s.slug === initialSlug);
      if (found) {
        setQuery(found.shortText);
        setSelectedService([found.shortText, found.slug]);
      }
    } else if (searchDefaultField) {
      setQuery(searchDefaultField);
    }
  }, [initialSlug, searchDefaultField]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);

    if (val.trim().length > 0) {
      const filtered = ServiceCards.filter((s) =>
        s.shortText.toLowerCase().includes(val.toLowerCase()),
      ).sort((a, b) => a.shortText.localeCompare(b.shortText));
      setServices(filtered);
      setShowDropdown(true);
    } else {
      setServices([]);
      setShowDropdown(false);
    }
  };

  const handleSelectService = (service: SearchProps) => {
    setQuery(service.shortText);
    setSelectedService([service.shortText, service.slug]);
    setShowDropdown(false);
    // Focus button after selection for accessibility
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePublish = () => {
    if (selectedService) {
      setIsModalOpen(true);
    } else {
      toast.error("Bitte wählen Sie eine Dienstleistung aus");
      searchInputRef.current?.focus();
    }
  };

  return (
    <section
      className={`w-full ${homePageOrNot ? "lg:w-1/2 py-10" : "max-w-3xl mx-auto py-6"} transition-all duration-700 ease-out`}
    >


      {title && (
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className={`font-inter font-bold tracking-tight mb-6 ${homePageOrNot
            ? "text-4xl md:text-6xl text-left"
            : "text-3xl md:text-4xl text-center"
            } text-secondary leading-tight`}
        >

          Finden Sie Handwerker für Ihr <br />
          <span className="text-primary italic relative inline-block mt-1">
            Projekt.
          </span>

        </motion.h1>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        <p
          className={`font-inter text-secondary text-base md:text-lg font-normal leading-relaxed ${homePageOrNot ? "text-left max-w-lg" : "text-center mx-auto"}`}
        >
          Nutzen Sie unsere Suchleiste, finden Sie passende Anbieter und erhalten Sie kostenlose Angebote.
        </p>

        <div className="relative group">
          {/* Main Search Input Container */}
          <div className="relative flex items-center p-1.5 bg-white border border-slate-200 rounded-xl shadow-soft focus-within:ring-4 focus-within:ring-primary/5 focus-within:border-primary transition-all duration-300">
            <div className="pl-4 text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Was suchen Sie? (z.B. Maler, Elektriker)"
              className="font-inter grow px-4 py-3 text-lg bg-transparent border-none outline-none focus:ring-0 text-secondary placeholder:text-slate-400 font-normal"
              value={query}
              onChange={handleSearchChange}
              onFocus={() => {
                setShowDropdown(true);
                if (query) {
                  setServices(
                    ServiceCards.filter((s) =>
                      s.shortText.toLowerCase().includes(query.toLowerCase()),
                    ),
                  );
                }
              }}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            />
            <button
              onClick={handlePublish}
              className="font-inter btn-primary py-3 px-8 rounded-lg hidden md:flex text-base"
            >
              Veröffentlichen
            </button>
          </div>

          {/* Mobile Publish Button */}
          <button
            onClick={handlePublish}
            className="btn-primary w-full mt-4 py-4 rounded-2xl flex md:hidden"
          >
            Veröffentlichen
          </button>

          {/* Search Dropdown */}
          <AnimatePresence>
            {showDropdown && services.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute left-0 right-0 top-full mt-2 bg-white border border-slate-200 shadow-hover rounded-2xl z-50 overflow-hidden max-h-100 overflow-y-auto"
              >
                <div className="p-2">
                  <div className="px-3 py-2 mb-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Dienstleistungen
                  </div>
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleSelectService(service)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-slate-50 rounded-xl transition-all duration-200 group text-left"
                    >
                      <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center transition-transform duration-300">
                        <Image
                          src={service.icon}
                          alt={service.shortText}
                          width={20}
                          height={20}
                          className="opacity-70 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                      <span className="font-semibold text-secondary text-base">
                        {service.shortText}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Popular Searches - only on homepage */}
          {homePageOrNot && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-5 flex flex-wrap items-center gap-2"
            >
              <span className="text-sm text-slate-600">Beliebt:</span>
              {popularSearches.map((term) => (
                <button
                  key={term.slug}
                  type="button"
                  onClick={() => {
                    const found = ServiceCards.find(
                      (item) => item.slug === term.slug
                    );
                    setQuery(found?.shortText || term.label);
                    setSelectedService([
                      found?.shortText || term.label,
                      term.slug,
                    ]);
                  }}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-secondary transition-colors hover:border-primary hover:text-primary"
                >
                  {term.label}
                </button>
              ))}
            </motion.div>
          )}

          {/* Trust Metrics - only on homepage */}
          {homePageOrNot && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600"
            >
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Geprüfte Handwerker &amp; kostenlose Angebote
              </span>
            </motion.div>
          )}
        </div>
      </motion.div>

      <JobPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceCardData={selectedService || ["", ""]}
      />
    </section>
  );
}
