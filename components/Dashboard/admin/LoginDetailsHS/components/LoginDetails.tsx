"use client";

import React from "react";
import AdminDataTable from "../../components/AdminDataTable";

const TestData = [
  {
    id: 1,
    IP_Address: "103.76.96.0",
    Login_Date: "26/05/2023",
    Login_Time: "18:00 Uhr",
  },
];

export default function LoginDetails() {
  const columns = [
    { header: "IP-Adresse", key: "IP_Address" },
    { header: "Anmeldedatum", key: "Login_Date" },
    { header: "Anmeldezeit", key: "Login_Time" },
  ];

  return (
    <div className="w-full p-6 lg:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-secondary">Anmeldedaten</h1>
          <p className="text-gray-500 mt-1">Überblick über die letzten Login-Aktivitäten.</p>
        </div>
      </div>
      
      <AdminDataTable
        columns={columns}
        data={TestData}
      />
    </div>
  );
}
