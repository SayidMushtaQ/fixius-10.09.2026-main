import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSearchData, buildServiceMetadata, ServicePageBody } from "../shared";

type Props = {
  params: { handyman: string; city: string };
  searchParams: { search?: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handyman, city } = await params;
  const canonicalPath = `/handwerker-finden/${handyman}/${city}`;
  return buildServiceMetadata(handyman, city, canonicalPath);
}

export default async function CitySearchPage({ params, searchParams }: Props) {
  const { handyman, city } = await params;
  const query = await searchParams;
  const data = await getSearchData(handyman, { city });

  if (!data.city) {
    return notFound();
  }

  return <ServicePageBody handyman={handyman} data={data} search={query.search || ""} />;
}
