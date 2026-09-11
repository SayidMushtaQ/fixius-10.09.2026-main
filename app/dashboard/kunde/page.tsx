"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function KundeDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/kunde/auftragsverlauf");
  }, [router]);

  return null;
}
