"use client";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Phone, ShieldCheck } from "lucide-react";

export default function Page7({
  setContactDetailsPage,
  contactDetailsPageError,
  contactDetailsPage,
}: ContactDetailsPropsTypePag) {
  const { userData } = useAuth();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactDetailsPage((pre: ContactDetailsPageDataType) => ({
      ...pre,
      [name]: value,
    }));

    if (name === "name") {
      contactDetailsPageError.nameError = "";
    }
    if (name === "phone") {
      contactDetailsPageError.phoneError = "";
    }
  };

  const isDisabled = userData[0]?.accessToken ? true : false;

  return (
    <div className="space-y-4 ">
      <div className="space-y-1">
        <h2 className="text-lg md:text-xl font-bold text-secondary tracking-tight">
          Letzte <span className="text-primary italic">Details</span>
        </h2>
        <p className="text-gray-500 text-xs">
          Diese Daten sind nur für Handwerker sichtbar, die sich für Ihren Auftrag interessieren.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Name Input */}
        <div className="group space-y-3">
          <label 
            htmlFor="page6PopUP_name" 
            className="block text-sm font-semibold text-secondary group-focus-within:text-primary transition-colors"
          >
            Vor- und Nachname <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <div className="relative">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <input
              type="text"
              id="page6PopUP_name"
              name="name"
              placeholder="z.B. Max Mustermann"
              autoComplete="name"
              onChange={handleChange}
              value={contactDetailsPage.name}
              className="w-full pl-16 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none transition-all text-secondary placeholder:text-gray-400 font-semibold shadow-xs text-sm"
            />
          </div>
        </div>

        {/* Phone Input */}
        <div className="group space-y-3">
          <label 
            htmlFor="page6PopUP_phone__number" 
            className="block text-sm font-semibold text-secondary group-focus-within:text-primary transition-colors"
          >
            Telefonnummer
          </label>
          <div className="relative">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
              <Phone size={20} />
            </div>
            <input
              type="tel"
              id="page6PopUP_phone__number"
              name="phone"
              placeholder="z.B. 0171 1234567"
              autoComplete="tel"
              onChange={handleChange}
              value={contactDetailsPage.phone}
              className="w-full pl-16 pr-6 py-4 bg-gray-50 border-2 border-transparent focus:border-primary/20 focus:bg-white rounded-2xl outline-none transition-all text-secondary placeholder:text-gray-400 font-semibold shadow-xs text-sm"
            />
          </div>
          {contactDetailsPageError.phoneError && (
            <p className="text-xs font-semibold text-red-500 ml-2 animate-shake">
              {contactDetailsPageError.phoneError}
            </p>
          )}
        </div>
      </div>

      <div className="bg-blue-50/50 p-4 rounded-2xl flex items-start gap-3 border border-blue-100/50">
        <div className="mt-1 shrink-0">
          <ShieldCheck className="w-5 h-5 text-blue-500" />
        </div>
        <p className="text-xs text-blue-600/80 leading-relaxed font-medium">
          Ihre Telefonnummer wird verschlüsselt übertragen und dient ausschließlich der schnellen Klärung von Rückfragen durch qualifizierte Handwerker.
        </p>
      </div>
    </div>
  );
}
