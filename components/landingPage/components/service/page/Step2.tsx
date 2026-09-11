"use client";
import React from "react";

const InputField = ({ 
  id, 
  name, 
  label, 
  placeholder, 
  value,
  onChange
}: { 
  id: string; 
  name: string; 
  label: string; 
  placeholder: string; 
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="group space-y-3">
    <label 
      htmlFor={id} 
      className="block text-sm font-semibold text-secondary group-focus-within:text-primary transition-colors ml-1"
    >
      {label}
    </label>
    <div className="relative">
      <input
        type="number"
        id={id}
        name={name}
        min={1}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none transition-all text-secondary placeholder:text-gray-400 font-semibold shadow-xs text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-semibold uppercase tracking-widest text-secondary/30 group-focus-within:text-primary/50 transition-colors pointer-events-none">
        {name === "square_meters" ? "m²" : "Stk."}
      </div>
    </div>
  </div>
);

export default function Step2({
  numberOfElement,
  setNumberOfElement,
  step2Error,
}: {
  numberOfElement: NumberOfElementType;
  setNumberOfElement: React.Dispatch<React.SetStateAction<NumberOfElementType>>;
  step2Error?: string;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNumberOfElement((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight font-inter">
          Zusätzliche <span className="text-primary italic">Projektdetails</span>
        </h2>
        <p className="text-slate-500 text-base font-medium">Geben Sie uns mehr Informationen über den Umfang Ihres Auftrags.</p>
      </div>

      {step2Error && (
        <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-red-600 text-sm font-bold">
            {step2Error}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8">
        <InputField
          id="square_footage"
          name="square_meters"
          label="Quadratmeter (falls zutreffend)"
          placeholder="z.B. 25"
          value={numberOfElement.square_meters}
          onChange={handleChange}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <InputField
            id="How_many_rooms"
            name="how_many_rooms"
            label="Anzahl der Zimmer"
            placeholder="z.B. 1"
            value={numberOfElement.how_many_rooms}
            onChange={handleChange}
          />
          
          <InputField
            id="How_many_floors"
            name="how_many_floors"
            label="Anzahl der Etagen"
            placeholder="z.B. 1"
            value={numberOfElement.how_many_floors}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
