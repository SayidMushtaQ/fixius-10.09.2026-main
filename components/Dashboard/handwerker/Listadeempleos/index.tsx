"use client";
import { ServiceCard } from "@/components/ServiceCard";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, MapPin, Filter, SortAsc } from "lucide-react";
import SliderCrouserl from "@/components/ui/LazySlider";
import type Slider from "react-slick";
import useJobpostRequests from "@/ApiRequests/jobpost";
import { useAuth } from "@/context/AuthContext";
import useScrollFetch from "@/hooks/useScrollFetchs";
import Loader from "@/components/Loader";
import { JOB } from "@/components/landingPage/components/NewJob/Job";
import { NotFoundData } from "../Pedidos";
import GoogleAutocomplete from "@/components/Shared/GoogleAutocomplete";

interface FilterPropsType {
  setFilter: (filter: any) => void;
  filter: { distance: string; pin_code: string; categories: string[] };
  orderTime: string;
  setOrderTime: (time: string) => void;
}

const Filters = ({
  setFilter,
  filter,
  orderTime,
  setOrderTime,
}: FilterPropsType) => {
  const [orderNewOrOld, setOrderNewOrOld] = useState<boolean>(false);

  return (
    <div className="flex gap-4 mt-6 flex-wrap items-end">
      <div className="flex-1 min-w-[150px] space-y-2">
        <label className="text-xs font-semibold text-slate-500 ml-1">Umkreis (km)</label>
        <div className="bg-slate-50 px-4 h-12 rounded-xl border border-slate-100 focus-within:border-primary/20 transition-all flex items-center gap-2">
          <Filter size={16} className="text-slate-400" />
          <input
            type="number"
            className="w-full bg-transparent outline-none font-medium text-slate-900"
            value={filter.distance}
            min={1}
            onChange={(e) => setFilter({ ...filter, distance: e.target.value })}
          />
        </div>
      </div>

      <div className="flex-[2] min-w-[250px] space-y-2">
        <label className="text-xs font-semibold text-slate-500 ml-1">Einsatzort / PLZ</label>
        <div className="bg-slate-50 px-4 h-12 rounded-xl border border-slate-100 focus-within:border-primary/20 transition-all flex items-center gap-2">
          <MapPin size={16} className="text-slate-400" />
          <div className="flex-1">
            <GoogleAutocomplete
              placeholder="Stadt oder PLZ..."
              defaultValue={filter.pin_code}
              types={["(regions)"]}
              onSelect={(data) => {
                setFilter({ ...filter, pin_code: data.zipCode || data.city });
              }}
            />
          </div>
        </div>
      </div>

      <div className="relative flex-1 min-w-[200px] space-y-2">
        <label className="text-xs font-semibold text-slate-500 ml-1">Sortieren nach</label>
        <button
          onClick={() => setOrderNewOrOld(!orderNewOrOld)}
          className={`w-full h-12 bg-slate-50 border border-slate-100 flex justify-between items-center rounded-xl px-4 transition-all ${
            orderNewOrOld ? "border-primary/20 ring-4 ring-primary/5" : ""
          }`}
        >
          <div className="flex items-center gap-2 font-semibold text-slate-900 text-sm">
            <SortAsc size={16} className="text-primary" />
            {orderTime}
          </div>
          <ChevronDown size={18} className={`text-slate-400 transition-transform ${orderNewOrOld ? "rotate-180" : ""}`} />
        </button>

        {orderNewOrOld && (
          <div className="bg-white shadow-premium border border-slate-100 p-2 rounded-xl mt-2 absolute flex flex-col z-50 w-full animate-in fade-in slide-in-from-top-2">
            {["Nach Neu sortieren", "Nach Älter sortieren"].map((option) => (
              <button
                key={option}
                className="text-left px-4 py-3 rounded-xl hover:bg-slate-50 text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
                onClick={() => {
                  setOrderNewOrOld(false);
                  setOrderTime(option);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function Index() {
  const { userData } = useAuth();
  const user = userData[0];
  const { GetPublicJobs } = useJobpostRequests();
  
  const [selectCard, setSelectCard] = useState<string[]>([]);
  const [filter, setFilter] = useState({
    distance: "100",
    pin_code: user?.address?.zipCode || "",
    categories: [] as string[],
  });
  const [orderTime, setOrderTime] = useState<string>("Nach Neu sortieren");

  useEffect(() => {
    setFilter(prev => ({ ...prev, categories: selectCard }));
  }, [selectCard]);

  const {
    data,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = GetPublicJobs({ pageSize: 10 }, filter);

  useScrollFetch({
    fetchNextPage,
    hasNextPage,
    isWindowScroll: true,
  });

  const slider = useRef<Slider>(null);

  return (
    <div className="w-full py-10 px-4 md:px-10 space-y-12">
      <div className="max-w-6xl">
        <h1 className="text-3xl font-bold text-slate-900 leading-tight mb-2 font-outfit">
          Arbeitsmöglichkeiten erkunden: <span className="italic text-primary">Auftragszentrale</span>
        </h1>
        <p className="text-slate-500 font-medium">Finden Sie passende Aufträge in Ihrer Region und bewerben Sie sich direkt.</p>
        
        <Filters
          setFilter={setFilter}
          filter={filter}
          orderTime={orderTime}
          setOrderTime={setOrderTime}
        />
      </div>
      
      <div className="relative bg-slate-50/50 -mx-10 px-10 py-12 border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-950 font-outfit">Nach Kategorie filtern</h3>
            <div className="flex gap-2">
               <button
                onClick={() => slider.current?.slickPrev()}
                className="p-2 bg-white rounded-xl shadow-soft border border-slate-100 hover:text-primary hover:border-primary/20 transition-all active:scale-95"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => slider.current?.slickNext()}
                className="p-2 bg-white rounded-xl shadow-soft border border-slate-100 hover:text-primary hover:border-primary/20 transition-all active:scale-95"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          
          <ServiceCard
            slider={slider}
            slidesToShowCustom={7}
            setSelectCard={setSelectCard}
            selectCard={selectCard}
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-6">
          <h2 className="text-2xl font-bold text-slate-950 font-outfit">Aktuelle Aufträge</h2>
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full font-inter">
            Top Auswahl
          </span>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        ) : data && data.pages[0]?.data?.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {data.pages.map((page: any, i: number) => (
              <div key={i} className="flex flex-col gap-6">
                {page.data.map((job: any) => (
                  <JOB key={job._id} jobs={job} />
                ))}
              </div>
            ))}
            
            {isFetchingNextPage && (
              <div className="flex justify-center py-8">
                <Loader />
              </div>
            )}
          </div>
        ) : (
          <div className="py-24 bg-white rounded-xl border border-slate-100 shadow-soft text-center space-y-6">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-slate-300">
               <MapPin size={36} />
            </div>
            <div className="max-w-md mx-auto">
              <NotFoundData text="Keine passenden Aufträge in Ihrem Umkreis gefunden." />
              <p className="text-slate-400 text-sm mt-2 font-inter">Versuchen Sie es mit anderen Filtern oder schauen Sie später wieder vorbei.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
