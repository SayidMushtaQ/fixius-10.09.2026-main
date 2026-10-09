// components/FindHandyman/HandwerkerResults.tsx
"use client";

import { useMemo, useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { Sparkles } from "lucide-react";
import useUserRequests from "@/ApiRequests/user";
import { NotFoundData } from "@/components/Dashboard/handwerker/Pedidos";
import { changeServiceFormat } from "@/helper/changeServiceFormat";
import HandwerkerCard from "./HandwerkerCard";
import { mapUserToCard } from "./mapUserToCard";

const RATING_FILTERS = [
  { label: "Alle", value: "" },
  { label: "5 Sterne", value: "5" },
  { label: "4 Sterne", value: "4" },
  { label: "3 Sterne", value: "3" },
  { label: "2 Sterne", value: "2" },
  { label: "1 Stern", value: "1" },
];

type Props = {
  serviceTitle: string;
  cityDisplay: string;
  handyman: string;
  city: string;
  initialResults: any;
};

export default function HandwerkerResults({
  serviceTitle,
  cityDisplay,
  handyman,
  city,
  initialResults,
}: Props) {
  const [rating, setRating] = useState("");
  const [ratingLabel, setRatingLabel] = useState("Alle");
  const [open, setOpen] = useState(false);
  const { SearchHandyman } = useUserRequests();

  const { data, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } =
    SearchHandyman(
      { pageSize: 10 },
      {
        service: changeServiceFormat(handyman),
        rating,
        city,
        distance: "50",
      },
      rating === "" ? initialResults : undefined,
    );

  const cards = useMemo(
    () =>
      (data?.pages ?? [])
        .flatMap((page: any) => page?.users ?? [])
        .map(mapUserToCard),
    [data],
  );

  const isInitialLoading = isFetching && !data;
  const isEmpty = !isInitialLoading && cards.length === 0;

  return (
    <div className="Container">
      <div className="w-full my-6">
        {/* Banner */}
        <div className="relative overflow-hidden bg-linear-to-r from-violet-600 via-purple-600 to-indigo-600 text-white rounded-3xl p-6 md:p-8 shadow-xl shadow-purple-500/10 mb-8 border border-white/10">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold text-purple-100 border border-white/20 mb-3">
                <Sparkles size={14} className="text-yellow-300" />
                <span>Geprüfte Fachbetriebe</span>
              </div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-snug">
                Qualifizierte Handwerker in {cityDisplay}
              </h2>
              <p className="text-purple-100/90 text-sm md:text-base font-medium mt-1">
                Finden Sie beste Experten für{" "}
                <span className="underline decoration-purple-300 font-bold text-white">
                  {serviceTitle}
                </span>{" "}
                im Umkreis von 50 km
              </p>
            </div>

            {/* Filter dropdown */}
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="inline-flex items-center gap-3 bg-white/90 hover:bg-white text-slate-800 font-bold text-xs md:text-sm px-4 py-3 rounded-2xl shadow-lg transition-all border border-white/40 cursor-pointer"
              >
                <span>{ratingLabel}</span>
                <GoChevronDown
                  className={`text-base transition-transform duration-300 ${
                    open ? "rotate-180 text-violet-600" : ""
                  }`}
                />
              </button>

              {open && (
                <div className="bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl p-2 text-sm font-semibold border border-slate-100 absolute right-0 top-full mt-2 w-52 z-50 space-y-1">
                  {RATING_FILTERS.map((opt) => (
                    <div
                      key={opt.label}
                      onClick={() => {
                        setRating(opt.value);
                        setRatingLabel(opt.label);
                        setOpen(false);
                      }}
                      className="px-4 py-2.5 rounded-xl hover:bg-violet-50 hover:text-violet-700 cursor-pointer transition-colors text-slate-700"
                    >
                      {opt.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Loading skeletons */}
        {isInitialLoading &&
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-56 my-6 animate-pulse rounded-3xl bg-slate-100" />
          ))}

        {/* Results */}
        {cards.map((card, i) => (
          <HandwerkerCard key={card.id || i} card={card} handyman={handyman} />
        ))}

        {/* Not found */}
        {isEmpty && (
          <NotFoundData text="Keinen Betrieb direkt gefunden? Kein Problem! Erstelle jetzt deinen kostenlosen Auftrag – wir benachrichtigen passende Fachbetriebe in der Umgebung, die sich direkt bei dir melden." />
        )}

        {/* Pagination */}
        {hasNextPage && (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-xs font-bold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              {isFetchingNextPage ? "Lädt…" : "Mehr Handwerker laden"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}