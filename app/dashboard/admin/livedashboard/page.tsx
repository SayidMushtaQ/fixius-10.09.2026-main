import LiveDashboard from "@/components/Dashboard/admin/LiveDashboard";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Admin | Live Dashboard View",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLiveDashboardPage() {
  return (
    <main className="w-full">
      <LiveDashboard />
    </main>
  );
}
