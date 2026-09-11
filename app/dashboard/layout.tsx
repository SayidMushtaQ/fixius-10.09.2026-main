import React, { Suspense } from "react";
import Loader from "@/components/Loader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<Loader />}>
      {children}
    </Suspense>
  );
}
