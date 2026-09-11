"use client";
import React from "react";
import { Zap, Calendar, Clock, Sparkles, Check } from "lucide-react";

const scheduleOptions = [
  {
    id: "schnell",
    label: "Schnell",
    description: "So bald wie möglich",
    icon: Zap,
  },
  {
    id: "in_einer_woche",
    label: "In einer Woche",
    description: "Innerhalb der nächsten 7 Tage",
    icon: Calendar,
  },
  {
    id: "in_3_monaten",
    label: "In 3 Monaten",
    description: "Längerfristige Planung",
    icon: Clock,
  },
  {
    id: "flexibel",
    label: "Flexibel",
    description: "Keine zeitliche Eile",
    icon: Sparkles,
  },
];

const WorkingSchedule = ({
  working_SchedulePage,
  setWorking_SchedulePage,
  working_SchedulePageError,
  setWorking_SchedulePageError,
}: WorkingSchedulePropsType) => {
  const handleSelect = (id: string) => {
    setWorking_SchedulePage(id);
    setWorking_SchedulePageError("");
  };

  return (
    <div className="space-y-6">
      {working_SchedulePageError && (
        <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-3 animate-shake">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-red-600 text-sm font-semibold">
            {working_SchedulePageError}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {scheduleOptions.map((option) => {
          const isSelected = working_SchedulePage === option.id;
          const Icon = option.icon;
          
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option.id)}
              className={`relative flex items-center p-3 rounded-2xl border-2 transition-all duration-300 text-left group overflow-hidden shadow-xs cursor-pointer ${
                isSelected 
                  ? "border-primary bg-primary/5" 
                  : "border-gray-50 bg-white hover:border-primary/20 hover:bg-primary/1"
              }`}
            >
              <div className={`p-2.5 rounded-xl mr-4 transition-all duration-500 z-10 ${
                isSelected ? "bg-primary text-white" : "bg-mainBackground text-gray-400 group-hover:text-primary group-hover:bg-primary/5"
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex flex-col z-10">
                <span className={`font-semibold text-sm md:text-base transition-colors ${isSelected ? "text-primary" : "text-secondary group-hover:text-primary"}`}>
                  {option.label}
                </span>
                <span className="text-[10px] md:text-xs font-semibold text-gray-500">
                  {option.description}
                </span>
              </div>
              
              <div className={`ml-auto w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-10 ${
                isSelected ? "border-primary bg-primary text-white" : "border-gray-200 bg-white group-hover:border-primary/40"
              }`}>
                <Check 
                  className={`transition-all duration-300 ${isSelected ? "scale-100 opacity-100" : "scale-0 opacity-0"}`} 
                  size={12} 
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default function Page5({
  working_SchedulePage,
  setWorking_SchedulePage,
  working_SchedulePageError,
  setWorking_SchedulePageError,
}: WorkingSchedulePropsType) {
  return (
    <div className="space-y-4 ">
      <div className="space-y-1">
        <h2 className="text-lg md:text-xl font-bold text-secondary tracking-tight">
          Wann soll es <span className="text-primary italic">losgehen</span>?
        </h2>
        <p className="text-gray-500 text-xs">Geben Sie uns einen Zeitrahmen für den Start Ihres Projekts.</p>
      </div>

      <WorkingSchedule
        working_SchedulePage={working_SchedulePage}
        setWorking_SchedulePage={setWorking_SchedulePage}
        working_SchedulePageError={working_SchedulePageError}
        setWorking_SchedulePageError={setWorking_SchedulePageError}
      />
    </div>
  );
}
