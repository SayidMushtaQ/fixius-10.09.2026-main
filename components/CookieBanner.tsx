"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

interface ConsentState {
  isLoading: boolean;
  showBanner: boolean;
}

const CookieBanner: React.FC = () => {
  const [consentState, setConsentState] = useState<ConsentState>({
    isLoading: true,
    showBanner: false,
  });

  useEffect(() => {
    const checkConsent = (): void => {
      let storedConsent: string | null = null;
      try {
        storedConsent = localStorage.getItem("userConsent");
      } catch (e) {
        console.warn("localStorage access failed:", e);
      }

      setConsentState({
        isLoading: false,
        showBanner: !storedConsent,
      });
    };

    checkConsent();
  }, []);

  const acceptConsent = (): void => {
    try {
      localStorage.setItem("userConsent", "accepted");
      setConsentState((prev) => ({ ...prev, showBanner: false }));
    } catch (e) {
      console.warn("Failed to set localStorage:", e);
    }
  };

  const declineConsent = (): void => {
    try {
      localStorage.setItem("userConsent", "declined");
      setConsentState((prev) => ({ ...prev, showBanner: false }));
    } catch (e) {
      console.warn("Failed to set localStorage:", e);
    }
  };

  if (consentState.isLoading) {
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <div className="max-w-4xl mx-auto bg-gray-800 border-t border-gray-200 shadow-lg p-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex-1 mb-4 md:mb-0">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
            <div className="flex space-x-2">
              <div className="h-8 w-20 bg-gray-300 rounded"></div>
              <div className="h-8 w-20 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!consentState.showBanner) {
    return null;
  }

  return (
    <aside
      role="region"
      aria-label="Cookie-Einwilligung"
      className="fixed bottom-0 left-0 right-0 z-[99999] p-3 md:p-4 bg-slate-900/95 backdrop-blur-md border-t border-slate-700 shadow-2xl transition-all"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1 text-center md:text-left">
          <p className="text-slate-200 text-xs md:text-sm leading-relaxed">
            Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten. 
            Durch Klicken auf &apos;Akzeptieren&apos; stimmen Sie der Verwendung von Cookies zu. 
            Weitere Details finden Sie in unserer{" "}
            <Link
              href="/pie/cookie-richtlinie"
              className="text-primary underline hover:text-orange-400 font-semibold transition-colors"
            >
              Cookie-Richtlinie
            </Link>
            .
          </p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto justify-end shrink-0">
          <button
            type="button"
            onClick={declineConsent}
            className="flex-1 md:flex-none px-5 py-2.5 text-xs md:text-sm font-semibold text-slate-300 border border-slate-600 rounded-lg hover:bg-slate-800 hover:text-white transition-all cursor-pointer min-h-[42px]"
            aria-label="Cookies ablehnen"
          >
            Ablehnen
          </button>
          <button
            type="button"
            onClick={acceptConsent}
            className="flex-1 md:flex-none px-6 py-2.5 text-xs md:text-sm font-bold bg-primary hover:bg-orange-600 text-white rounded-lg shadow-md transition-all cursor-pointer min-h-[42px]"
            aria-label="Cookies akzeptieren"
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </aside>
  );
};

export default CookieBanner;
