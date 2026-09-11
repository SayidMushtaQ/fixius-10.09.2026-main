"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

/**
 * Client leaf for the CTA's primary button — only this piece needs auth state,
 * so the rest of the CTA section can render as a server component.
 */
export default function RegisterCtaButton() {
  const { userData } = useAuth();

  return (
    <Link
      href="/registrieren"
      className="font-inter btn-primary py-4 px-10 text-lg font-bold rounded-xl w-full sm:w-auto shadow-lg shadow-primary/20 transition-transform hover:scale-105"
    >
      {userData?.length > 0 ? "Weiter zur Registrierung" : "Kostenlos registrieren"}
    </Link>
  );
}
