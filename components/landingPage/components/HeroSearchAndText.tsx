"use client";
import { ServiceCards } from "@/constants/landingPage";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import ServicePopUP from "./ServicePopUP";
import { Search, ShieldCheck, Star, Sparkles } from "lucide-react";

type SearchProps = {
  id: number;
  icon: string;
  shortText: string;
  slug: string;
};

const popularSearches = ["Maler", "Elektriker", "Sanitär", "Umzug", "Gartenbauer", "Fliesenleger"];

export default function HeroSearchAndText({
  homePageOrNOt = false,
  title = true,
  searchDefaultField = "",
  initialSlug = "",
}: {
  homePageOrNOt: boolean;
  title?: boolean;
  searchDefaultField?: string;
  initialSlug?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [Services, setServices] = useState<SearchProps[]>([]);
  const [serviceCardData, setServiceCardData] = useState<string[]>([]);
  const [userType, setUserType] = useState<string[]>([searchDefaultField]);
  const [servicePopUP, setServicePopUp] = useState<boolean>(false);

  useEffect(() => {
    let SearchVal: SearchProps[] = [];

    if (initialSlug) {
      SearchVal = ServiceCards.filter((item) => item.slug === initialSlug);
    }

    if (SearchVal.length === 0 && searchDefaultField !== "") {
      SearchVal = ServiceCards.sort((a, b) =>
        a.shortText.localeCompare(b.shortText)
      ).filter((item) =>
        item.shortText.toLowerCase().includes(searchDefaultField.toLowerCase())
      );
    }

    const getRouteName =
      SearchVal.length > 0
        ? SearchVal[0].shortText
        : searchDefaultField
        ? searchDefaultField
            .toLowerCase()
            .split(" ")
            .map((data) => data[0].toUpperCase() + data.slice(1))
            .join(" ")
        : ""; // Check if searchDefaultField is defined
    setServices(SearchVal);
    setUserType([getRouteName]);
    if (SearchVal.length !== 0) {
      setServiceCardData([SearchVal[0].shortText, SearchVal[0].slug]);
    }
  }, [searchDefaultField, initialSlug]); // Here we add searchDefaultField as a dependency



  const HandleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const SearchVal = ServiceCards.sort((a, b) =>
        a.shortText.localeCompare(b.shortText)
      ).filter((item) =>
        item.shortText.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setServices(SearchVal);
      setUserType([e.target.value]);
      if (SearchVal.length !== 0) {
        setServiceCardData([SearchVal[0].shortText, SearchVal[0].slug]);
      } else {
        setServiceCardData([]); // If no results, clear the array
      }
    },
    [setServices]
  );

  const FindService = () => {
    if (serviceCardData.length !== 0) {
      setServicePopUp(true);
      setUserType([""]);
    } else {
      toast.error("Bitte wählen Sie eine Dienstleistung aus");
    }
  };

  return (
    <section
      className={`${
        homePageOrNOt
          ? "lg:w-1/2 md:space-y-10 space-y-5"
          : "flex flex-col items-center justify-center space-y-6 w-full pt-8"
      } w-full lg:mt-5`}
    >


      {title && (
        <h1
          className={`${
            homePageOrNOt ? "md:text-4xl text-balance" : "text-center"
          } text-3xl font-bold leading-tight`}
        >
          Finde Handwerker für all deine{" "}
          <span
            className={`italic text-orange text-3xl ${
              homePageOrNOt && "md:text-4xl"
            } font-bold`}
          >
            Heimprojekte
          </span>
        </h1>
      )}

      {!pathname?.includes("cuanto-cuesta") && (
        <>
          {homePageOrNOt && (
            <p className="text-gray-500 max-w-xl text-base leading-relaxed">
              Beschreibe dein Projekt, erhalte kostenlose Angebote von Profis in deiner Nähe und
              beauftrage den passenden Handwerker – schnell und unkompliziert.
            </p>
          )}

          <div className={`mb-6 ${homePageOrNOt ? "w-full" : "w-3/4"}`}>
            {!homePageOrNOt && (
              <p className="text-gray-500 mb-6">
                Finde schnell und direkt einen Handwerker: Nutze unsere Suchleiste
                und erhalte ein kostenloses Angebot.
              </p>
            )}
            <div className="relative mt-3">
              <div className={`flex w-full shadow-lg rounded-2xl border border-gray-200 bg-white p-2 ${homePageOrNOt ? "sm:flex-row sm:items-center" : ""}`}>
                <div className="flex flex-1 items-center gap-2 px-3">
                  <Search className="h-5 w-5 shrink-0 text-gray-400" aria-hidden="true" />
                  <input
                    type="text"
                    placeholder={homePageOrNOt ? "Was suchen Sie? (z.B. Maler, Elektriker)" : "z. B. Maler"}
                    name="search_service"
                    className="h-11 w-full bg-transparent text-gray-800 placeholder:text-gray-400 focus:outline-none"
                    title="Search our services"
                    onChange={HandleChange}
                    value={userType[0]}
                  />
                </div>
                <button
                  className={`hidden sm:block bg-orange py-3 shadow-md px-6 text-white rounded-xl hover:bg-orange/90 transition-all font-semibold h-12 ${
                    userType.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => FindService()}
                  disabled={userType.length === 0}
                  aria-disabled={userType.length === 0}
                >
                  Veröffentlichen
                </button>
              </div>
              <button
                className={`sm:hidden mt-3 w-full bg-orange py-3 shadow-md px-6 text-white rounded-xl hover:bg-orange/90 transition-all font-semibold h-12 ${
                  userType.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => FindService()}
                disabled={userType.length === 0}
                aria-disabled={userType.length === 0}
              >
                Veröffentlichen
              </button>
              <div
                className={`border border-gray-200 bg-white py-2 shadow-xl rounded-2xl w-full absolute z-50 top-full mt-1 max-h-80 overflow-y-auto ${
                  userType.length !== 0 && userType[0] !== "" ? "block" : "hidden"
                }`}
              >
                {Services.length !== 0 ? (
                  Services.slice(0, 50).map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-start items-center mx-2 my-1 p-1 hover:bg-orange/5 rounded-lg transition-colors cursor-pointer group"
                      onClick={() => {
                        setServiceCardData([item.shortText, item.slug]);
                        setUserType([item.shortText]);
                      }}
                    >
                      {item.icon && (
                        <div className="shrink-0 ml-2 p-1.5 bg-gray-50 rounded-md group-hover:bg-white transition-colors">
                          <Image
                            src={item.icon}
                            alt={item.shortText}
                            width={20}
                            height={20}
                          />
                        </div>
                      )}
                      <span className="px-3 py-2 grow text-gray-700 font-medium">
                        {item.shortText}
                      </span>
                    </div>
                  ))
                ) : (
                  <span className="px-5 py-4 block text-gray-400 italic text-sm">
                    Dienstleistung nicht gefunden
                  </span>
                )}
              </div>
            </div>

            {homePageOrNOt && (
              <>
                <div className="mt-5 flex flex-wrap items-center justify-start gap-2">
                  <span className="text-sm text-gray-500">Beliebt:</span>
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => {
                        setUserType([term]);
                        const found = ServiceCards.find((item) => item.shortText === term);
                        if (found) {
                          setServiceCardData([found.shortText, found.slug]);
                        } else {
                          setServiceCardData([term, term.toLowerCase().replace(/\s+/g, '-')]);
                        }
                      }}
                      className="rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-gray-700 transition-colors hover:border-orange hover:text-orange"
                    >
                      {term}
                    </button>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap items-center justify-start gap-x-6 gap-y-2 text-sm text-gray-500">
                  <span className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-orange" />
                    Geprüfte Profis &amp; kostenlose Angebote
                  </span>
                </div>
              </>
            )}
          </div>
        </>
      )}

      {servicePopUP && (
        <div className="fixed inset-0 w-screen h-screen z-9999 bg-white flex flex-col overflow-hidden">
          <ServicePopUP 
            setServicePopUP={setServicePopUp}
            servicePopUp={servicePopUP}
            serviceCardData={serviceCardData}
          />
        </div>
      )}
    </section>
  );
}
