"use client";

import { HandymanLayout } from "@/components/Dashboard";
import React from "react";

export default function HandwerkerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HandymanLayout>{children}</HandymanLayout>;
}
