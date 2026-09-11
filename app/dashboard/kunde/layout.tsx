"use client";

import { ClientLayout } from "@/components/Dashboard";
import React from "react";

export default function KundeDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
