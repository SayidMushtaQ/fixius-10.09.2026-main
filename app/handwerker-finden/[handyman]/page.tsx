import React from "react";
import { Metadata } from "next";
import { getSearchData, buildServiceMetadata, ServicePageBody, transliterateFn } from "./shared";

type Props = {
  params: { handyman: string };
  searchParams: { city?: string; postleitzahl?: string; rating?: string; search?: string };
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { handyman } = await params;
  const { city } = await searchParams;

  // The canonical, crawlable URL for a city search lives at the clean path
  // /handwerker-finden/[handyman]/[city] — this ?city= form always points there.
  const canonicalPath = city
    ? `/handwerker-finden/${handyman}/${transliterateFn(city)}`
    : `/handwerker-finden/${handyman}`;

  return buildServiceMetadata(handyman, city, canonicalPath);
}

export default async function SearchPage({ params, searchParams }: Props) {
  const { handyman } = await params;
  const query = await searchParams;
  const data = await getSearchData(handyman, query);

  return <ServicePageBody handyman={handyman} data={data} search={query.search || ""} />;
}
