"use client";
import React from "react";
import { CheckCircle, Check } from "lucide-react";

export function InstructionBar({
  title,
  id,
  setPage1Data,
  page1Data,
  handleTitleError,
}: InstructionBarPropsType) {
  const isSelected = title === page1Data.service_title;
  
  const handleChange = () => {
    setPage1Data((pre) => ({
      ...pre,
      service_title: title,
      other_title: "",
    }));
    handleTitleError("");
  };

  return (
    <button
      onClick={handleChange}
      className={`relative flex items-center px-5 py-4 rounded-xl border transition-all duration-300 text-left group overflow-hidden cursor-pointer ${
        isSelected 
          ? "border-primary bg-primary/5 shadow-md shadow-primary/5 ring-1 ring-primary/20" 
          : "border-slate-100 bg-white hover:border-primary/20 hover:bg-slate-50 hover:shadow-sm"
      }`}
    >
      <div className={`mr-4 w-6 h-6 shrink-0 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
        isSelected ? "border-primary bg-primary text-white" : "border-slate-200 bg-white group-hover:border-primary/40"
      }`}>
        <Check 
          className={`transition-all duration-300 ${isSelected ? "scale-100 opacity-100" : "scale-0 opacity-0"}`} 
          size={14} 
          strokeWidth={3}
        />
      </div>
      <span className={`text-sm font-semibold transition-colors z-10 font-inter ${
        isSelected ? "text-primary" : "text-slate-600 group-hover:text-slate-900"
      }`}>
        {title}
      </span>
    </button>
  );
}

export default function Page1({
  setPage1Data,
  page1Data,
  titleError,
  handleTitleError,
  serviceTitle,
}: PagePropsType) {
  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setPage1Data((pre) => ({
      ...pre,
      [name]: value,
      service_title: "",
    }));
    handleTitleError("");
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight font-inter">
          Welche spezifischen <span className="text-primary italic">Dienstleistungen</span> benötigen Sie?
        </h2>
        <p className="text-slate-500 text-base font-medium">Wählen Sie die am besten passende Option aus der Liste unten.</p>
      </div>

      {titleError && (
        <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-red-600 text-sm font-bold">
            {titleError}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {serviceTitle?.map((item, index) => (
          <InstructionBar
            key={index}
            title={item}
            id={index + 1}
            setPage1Data={setPage1Data}
            page1Data={page1Data}
            handleTitleError={handleTitleError}
          />
        ))}
      </div>

      <div className="pt-8 mt-4 border-t border-slate-50">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300 mb-4">Oder geben Sie etwas anderes ein</p>
        <div className="relative group">
          <input
            type="text"
            placeholder="Eigener Titel..."
            name="other_title"
            className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none transition-all text-slate-900 placeholder:text-slate-400 font-bold text-sm shadow-sm"
            onChange={handleChangeInput}
            value={page1Data.other_title}
          />
          {page1Data.other_title && (
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-primary">
              <CheckCircle size={20} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
