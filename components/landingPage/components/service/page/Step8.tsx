"use client";
import React, { useState } from "react";
import { MapPin, CheckCircle } from "lucide-react";
import GooglePostalCodeSearch from "@/components/Common/GooglePostalCodeSearch";
import SearchPostalCode from "@/components/Common/SearchPostalCode";

export default function Page8({
  setLocationDataPage,
  locationDataPage,
  locationDataPageError,
  setlocationDataPageError,
  setAddressId,
  addressId,
  setIsNextBtnDisable,
}: LocationOfJobPage) {
  const [isGoogleUnavailable, setIsGoogleUnavailable] = useState(false);
  const [citySearch, setCitySearch] = useState(locationDataPage || "");

  const selectLocation = (data: {
    zipCode: string;
    placeName: string;
    coordinates: { lat: number; lng: number };
    formattedAddress: string;
  }) => {
    const locationString =
      data.zipCode && data.placeName
        ? `${data.zipCode} ${data.placeName}`
        : data.zipCode || data.placeName || "Adresse ausgewählt";
    setLocationDataPage(locationString);
    setAddressId(JSON.stringify(data));
    setIsNextBtnDisable(false);
  };

  return (
    <div className="space-y-4 ">
      <div className="space-y-1">
        <h2 className="text-lg md:text-xl font-semibold text-secondary tracking-tight">
          Wo befindet sich der <span className="text-primary italic">Einsatzort</span>?
        </h2>
        <p className="text-gray-500 text-xs">Geben Sie die Postleitzahl oder Stadt an.</p>
      </div>

      <div className="group space-y-3 relative z-40">
        <label className="block text-sm font-semibold text-secondary group-focus-within:text-primary transition-colors">
          Standort
        </label>
        <div className="relative">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors z-10">
            <MapPin className="w-6 h-6" />
          </div>
          <div className="w-full pl-16 pr-12 py-1 bg-gray-50 border-2 border-transparent focus-within:border-primary/20 focus-within:bg-white rounded-2xl outline-none transition-all shadow-xs min-h-[58px] flex items-center">
            {isGoogleUnavailable ? (
              <input
                type="text"
                value={citySearch}
                onChange={(e) => {
                  setCitySearch(e.target.value);
                  setIsNextBtnDisable(true);
                  setAddressId("");
                }}
                placeholder="Postleitzahl oder Stadt eingeben"
                className="w-full bg-transparent outline-none text-base font-bold text-[#1a1a1a]"
              />
            ) : (
              <GooglePostalCodeSearch
                onSelect={selectLocation}
                defaultValue={locationDataPage}
                onError={(err) => setlocationDataPageError(err)}
                onLoadFailed={() => setIsGoogleUnavailable(true)}
                placeholder="Postleitzahl oder Stadt eingeben"
              />
            )}
          </div>
          {addressId && (
            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-primary ">
              <CheckCircle className="w-6 h-6" />
            </div>
          )}
          {isGoogleUnavailable && (
            <SearchPostalCode
              search={citySearch}
              position="top-full"
              onSelect={(item: any) => {
                setCitySearch(`${item.Postal_Code} ${item.Place_Name}`);
                selectLocation({
                  zipCode: `${item.Postal_Code}`,
                  placeName: item.Place_Name,
                  coordinates: { lat: item.Latitude, lng: item.Longitude },
                  formattedAddress: `${item.Postal_Code} ${item.Place_Name}`,
                });
              }}
            />
          )}
        </div>
        {locationDataPageError && (
          <p className="text-xs font-semibold text-red-500 ml-2 animate-shake">
            {locationDataPageError}
          </p>
        )}
      </div>

    </div>
  );
}
