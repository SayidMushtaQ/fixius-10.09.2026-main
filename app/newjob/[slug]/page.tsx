import React from "react";
import { Metadata } from "next";
import { Job } from "@/components";

export const metadata: Metadata = {
  title: "Job Details | Fixius",
  description: "Details zum Handwerker-Auftrag auf Fixius.",
};

export default async function JobDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return (
    <div className="bg-mainBackground">
      <div className="Container pt-8 md:pt-12 pb-20">
        <Job slug={slug} />
      </div>
    </div>
  );
}
