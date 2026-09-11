"use client";

import { AdminDashBoard } from "@/components/Dashboard";
import React from "react";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminDashBoard>{children}</AdminDashBoard>;
}
