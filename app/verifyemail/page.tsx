import { Metadata } from "next";
import VerifyEmail from "@/components/Login/VerifyEmail";
import { Suspense } from "react";
import Loader from "@/components/Loader";

export const metadata: Metadata = {
  title: "Email verifizieren | Fixius",
  description: "Verifizieren Sie Ihre E-Mail-Adresse, um Ihr Konto zu aktivieren.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<Loader />}>
      <VerifyEmail />
    </Suspense>
  );
}
