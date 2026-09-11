"use client";

import React, { useEffect, useRef } from "react";
import { useGoogleMapsScript } from "@/hooks/useGoogleMapsScript";
import { toast } from "sonner";

interface GoogleAutocompleteProps {
  onSelect: (data: {
    zipCode: string;
    city: string;
    coordinates: { lat: number; lng: number };
    formattedAddress: string;
    street?: string;
    houseNumber?: string;
  }) => void;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  types?: string[];
}

/**
 * A reusable Google Maps Autocomplete input component.
 * Standardizes address selection across the platform.
 * Modernized to use the New Places API (PlaceAutocompleteElement).
 */
export default function GoogleAutocomplete({
  onSelect,
  defaultValue = "",
  placeholder = "Adresse suchen...",
  className = "",
}: GoogleAutocompleteProps) {
  const { isLoaded: isGoogleLoaded } = useGoogleMapsScript();
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let autocompleteElement: any = null;

    async function initAutocomplete() {
      if (!isGoogleLoaded || !inputRef.current) return;

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
        autocompleteElement.placeholder = placeholder;

        // Style the element to match the dashboard design
        autocompleteElement.style.width = "100%";
        autocompleteElement.style.height = "100%";
        autocompleteElement.style.border = "none";
        autocompleteElement.style.background = "transparent";
        autocompleteElement.style.color = "inherit";
        autocompleteElement.style.fontSize = "inherit";
        autocompleteElement.style.colorScheme = "light";

        inputRef.current.appendChild(autocompleteElement);

        if (defaultValue) {
          (autocompleteElement as any).value = defaultValue;
        }

        autocompleteElement.addEventListener("gmp-select", async (event: any) => {
          try {
            const placePrediction = event.placePrediction;
            if (!placePrediction) return;

            const place = placePrediction.toPlace();
            await place.fetchFields({
              fields: [
                "displayName",
                "formattedAddress",
                "location",
                "addressComponents",
              ],
            });

            let zip = "";
            let city = "";
            let street = "";
            let houseNumber = "";

            if (place.addressComponents) {
              place.addressComponents.forEach((comp: any) => {
                if (comp.types.includes("postal_code")) zip = comp.longText;
                if (comp.types.includes("locality")) city = comp.longText;
                if (!city && comp.types.includes("administrative_area_level_2"))
                  city = comp.longText;
                if (comp.types.includes("route")) street = comp.longText;
                if (
                  comp.types.includes("street_number") ||
                  comp.types.includes("subpremise") ||
                  comp.types.includes("premise")
                ) {
                  houseNumber = comp.longText;
                }
              });
            }

            // Fallback: If houseNumber is missing but street is present, try to extract from formattedAddress
            if (!houseNumber && street && place.formattedAddress) {
              const regex = new RegExp(`${street}\\s+(\\d+[a-zA-Z]?)`, "i");
              const match = place.formattedAddress.match(regex);
              if (match) {
                houseNumber = match[1];
              }
            }

            const lat = place.location?.lat();
            const lng = place.location?.lng();

            onSelect({
              zipCode: zip,
              city: city || place.displayName || "",
              coordinates: { lat, lng },
              formattedAddress: place.formattedAddress || "",
              street,
              houseNumber,
            });
          } catch (error: any) {
            console.error("Error fetching place details:", error);
            toast.error("Fehler beim Abrufen der Adressdetails");
          }
        });
      } catch (err) {
        console.error("Error initializing Google Places Autocomplete:", err);
      }
    }

    initAutocomplete();

    return () => {
      if (inputRef.current && autocompleteElement) {
        try {
          inputRef.current.removeChild(autocompleteElement);
        } catch (e) {
          // Ignore
        }
      }
    };
  }, [isGoogleLoaded, onSelect, placeholder]); // Removed defaultValue from dependencies

  // Handle defaultValue separately to avoid re-initializing the whole component
  useEffect(() => {
    const autocompleteElement = inputRef.current?.querySelector('gmp-place-autocomplete') as any;
    if (autocompleteElement && defaultValue && !autocompleteElement.value) {
      autocompleteElement.value = defaultValue;
    }
  }, [defaultValue]);

  return (
    <>
      <style jsx global>{`
        gmp-place-autocomplete {
          --gmpx-color-surface: transparent !important;
          --gmpx-color-on-surface: inherit !important;
          --gmpx-color-primary: #f97316 !important;
          --gmpx-font-family-base: inherit !important;
          display: block !important;
          width: 100% !important;
          height: 100% !important;
          border: none !important;
          box-shadow: none !important;
          z-index: 50 !important;
        }
        gmp-place-autocomplete::part(input) {
          border: none !important;
          padding: 0 !important;
          height: 100% !important;
          background: transparent !important;
          font-size: 1rem !important;
          font-family: inherit !important;
          color: inherit !important;
        }
        gmp-place-autocomplete::part(icon) {
          display: none !important;
        }
        gmp-place-autocomplete::part(clear-button) {
          display: none !important;
        }
        gmp-place-autocomplete::part(logo) {
          display: none !important;
        }
        gmp-place-autocomplete::part(powered-by-google) {
          display: none !important;
        }
        /* Fallback for classic pac-container if used internally */
        .pac-container:after {
          display: none !important;
          content: none !important;
        }
        .pac-logo:after {
          display: none !important;
          content: none !important;
        }
      `}</style>
      <div ref={inputRef} className={`w-full h-full flex items-center ${className}`} />
    </>
  );
}
