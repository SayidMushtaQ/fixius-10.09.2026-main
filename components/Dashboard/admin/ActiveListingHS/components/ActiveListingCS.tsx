"use client";

import React from "react";
import AdminDataTable from "../../components/AdminDataTable";

const TestData = [
  {
    id: 1,
    Job_Title: "Komplette Demontage von Gebäuden und Bauwerken",
    Listing_ID: "32918465",
    Date_of_Post: "23/05/2023",
  },
];

export default function ActiveListingCS() {
  const columns = [
    { header: "Berufstitel", key: "Job_Title" },
    { header: "Angebots-ID", key: "Listing_ID" },
    { header: "Veröffentlicht am", key: "Date_of_Post" },
  ];

  return (
    <div className="w-full p-6 lg:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-secondary">Aktive Angebote (Handwerker)</h1>
          <p className="text-gray-500 mt-1">Überblick über die aktiven Angebote der Handwerker.</p>
        </div>
      </div>
      
      <AdminDataTable
        columns={columns}
        data={TestData}
      />
    </div>
  );
}
