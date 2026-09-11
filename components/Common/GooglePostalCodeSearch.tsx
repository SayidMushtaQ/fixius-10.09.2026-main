"use client";
import React, { useEffect, useRef } from "react";
import { useGoogleMapsScript } from "@/hooks/useGoogleMapsScript";
import { toast } from "sonner";

interface GooglePostalCodeSearchProps {
  onSelect: (data: { zipCode: string; placeName: string; coordinates: { lat: number; lng: number }; formattedAddress: string }) => void;
  defaultValue?: string;
  placeholder?: string;
  onError?: (error: string) => void;
  onLoadFailed?: () => void;
}

export default function GooglePostalCodeSearch({
  onSelect,
  defaultValue,
  placeholder = "Postleitzahl oder Stadt eingeben",
  onError,
  onLoadFailed,
}: GooglePostalCodeSearchProps) {
  const inputRef = useRef<HTMLDivElement>(null);
  const { isLoaded: isGoogleLoaded, failed: isGoogleFailed } = useGoogleMapsScript();

  useEffect(() => {
    if (isGoogleFailed) onLoadFailed?.();
  }, [isGoogleFailed, onLoadFailed]);

  useEffect(() => {
    let autocompleteElement: any = null;

    async function initAutocomplete() {
      if (!inputRef.current || !isGoogleLoaded) return;

      if (
        typeof google === "undefined" ||
        !google.maps ||
        !google.maps.importLibrary
      ) {
        return;
      }

      try {
        const { PlaceAutocompleteElement } = (await google.maps.importLibrary(
          "places",
        )) as any;

        if (!PlaceAutocompleteElement) return;
        
        // Clear previous content
        inputRef.current.innerHTML = "";

        autocompleteElement = new PlaceAutocompleteElement();
        autocompleteElement.includedRegionCodes = ["de"];
        autocompleteElement.includedPrimaryTypes = ["postal_code", "locality"];
        autocompleteElement.placeholder = placeholder;

        // Premium Styling for the Google Web Component
        autocompleteElement.style.width = "100%";
        autocompleteElement.style.height = "56px";
        autocompleteElement.style.border = "none";
        autocompleteElement.style.background = "transparent";
        autocompleteElement.style.fontSize = "16px";
        autocompleteElement.style.fontWeight = "700";
        autocompleteElement.style.color = "#1a1a1a";
        autocompleteElement.style.colorScheme = "light";

        inputRef.current.appendChild(autocompleteElement);

        if (defaultValue) {
          (autocompleteElement as any).value = defaultValue;
        }

        autocompleteElement.addEventListener("gmp-select", async (event: any) => {
          if (onError) onError("");

          try {
            const placePrediction = event.placePrediction;
            if (!placePrediction) return;

            const place = placePrediction.toPlace();
            await place.fetchFields({
              fields: ["displayName", "formattedAddress", "location", "addressComponents"],
            });

            let zip = "";
            let city = "";

            if (place.addressComponents) {
              place.addressComponents.forEach((comp: any) => {
                if (comp.types.includes("postal_code")) zip = comp.longText;
                if (comp.types.includes("locality")) city = comp.longText;
              });
            }

            const lat = place.location?.lat();
            const lng = place.location?.lng();

            onSelect({
              zipCode: zip,
              placeName: city || place.displayName || "",
              coordinates: { lat, lng },
              formattedAddress: place.formattedAddress,
            });
          } catch (error: any) {
            console.error("Error fetching place details:", error);
            if (onError) onError("Fehler beim Laden der Adresse");
            toast.error("Fehler beim Abrufen der Adresse");
          }
        });
      } catch (err) {
        console.error("Error initializing Google Places Autocomplete:", err);
      }
    }

    initAutocomplete();

    return () => {
      // Clean up event listeners if necessary
    };
  }, [isGoogleLoaded, defaultValue, onSelect, onError, placeholder]);

  return (
    <>
      <style jsx global>{`
        gmp-place-autocomplete {
          --gmpx-color-surface: #ffffff !important;
          --gmpx-color-on-surface: #1a1a1a !important;
          --gmpx-color-primary: #f97316 !important;
          --gmpx-font-family-base: inherit !important;
          display: block !important;
          width: 100% !important;
          position: relative !important;
          z-index: 9999 !important;
        }
        ::part(dialog) {
          background-color: white !important;
        }
      `}</style>
      <div ref={inputRef} className="w-full" />
    </>
  );
}
