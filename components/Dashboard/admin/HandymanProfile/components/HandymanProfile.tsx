"use client";

import React from "react";
import AdminDataTable from "../../components/AdminDataTable";
import DashboardSearch from "../../components/DashboardSearch";

const TestData = [
  {
    id: 1,
    IP_Address: "103.76.96.0",
    Login_Date: "26/05/2023",
    Login_Time: "6:00 PM",
    Address: "Musterstraße 1, 10115 Berlin",
    Company: "Malerprofi GmbH",
  },
];

export default function HandymanProfile({
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  const columns = [
    { header: "Firmenname", key: "Company" },
    { header: "Adresse", key: "Address" },
    { header: "Letzter Login", key: "Login_Date" },
    { header: "Login Zeit", key: "Login_Time" },
  ];

  const handleAction = (action: string, item: any) => {
    console.log(`Action: ${action}`, item);
    // Future implementation for view/edit/delete
  };

  return (
    <div className="w-full space-y-8 p-6 lg:p-10">
      <div className="max-w-2xl mx-auto">
        <DashboardSearch
          value={search}
          onChange={setSearch}
          placeholder="Suche nach E-Mail, Firmenname oder Angebots-ID..."
        />
      </div>

      <div className="space-y-12">
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-secondary">
              Handwerker Profile
            </h2>
            <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-bold">
              {TestData.length} Einträge
            </span>
          </div>
          <AdminDataTable
            columns={columns}
            data={TestData}
            onAction={handleAction}
          />
        </section>
      </div>
    </div>
  );
}
