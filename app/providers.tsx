"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { AuthContextProvider } from "@/context/AuthContext";
import { SocketProvider } from "@/context/SocketContext";
import { queryClient } from "@/lib/queryClient";
import CookieBanner from "@/components/CookieBanner";

import Script from "next/script";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <SocketProvider>
          {children}
          <Toaster position="top-right" richColors closeButton />
          <CookieBanner />
          {process.env.NEXT_PUBLIC_ENV === "development" && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
          <Script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP}&libraries=places&language=de&region=DE&loading=async`}
            strategy="afterInteractive"
            onLoad={() => {
              window.dispatchEvent(new Event("google-maps-loaded"));
            }}
          />
        </SocketProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
