import React from "react";

export default function StaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-mainBackground min-h-screen">
      {children}
    </div>
  );
}
