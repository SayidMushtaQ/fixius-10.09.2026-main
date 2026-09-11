"use client";
import { useState, useEffect } from "react";

const LOAD_TIMEOUT_MS = 6000;

/**
 * Hook to track if the Google Maps JavaScript SDK is loaded and ready.
 * Useful for initializing Autocomplete and other Maps services.
 *
 * Returns `isLoaded` as before, plus `failed` which flips to true if the
 * SDK hasn't loaded within LOAD_TIMEOUT_MS (missing/invalid API key,
 * network blocked, ad blocker, etc.) so callers can fall back.
 */
export const useGoogleMapsScript = () => {
  const [isLoaded, setIsLoaded] = useState(
    typeof window !== "undefined" && !!(window as any).google && !!(window as any).google.maps
  );
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (isLoaded) return;

    // Poll for the google object as a robust fallback
    const checkInterval = setInterval(() => {
      if ((window as any).google && (window as any).google.maps) {
        setIsLoaded(true);
        setFailed(false);
        clearInterval(checkInterval);
      }
    }, 500);

    // Also listen for a custom event if we decide to dispatch one from layout.tsx
    const handleLoad = () => setIsLoaded(true);
    window.addEventListener("google-maps-loaded" as any, handleLoad);

    const timeout = setTimeout(() => {
      if (!((window as any).google && (window as any).google.maps)) {
        setFailed(true);
      }
    }, LOAD_TIMEOUT_MS);

    return () => {
      clearInterval(checkInterval);
      clearTimeout(timeout);
      window.removeEventListener("google-maps-loaded" as any, handleLoad);
    };
  }, [isLoaded]);

  return { isLoaded, failed };
};
