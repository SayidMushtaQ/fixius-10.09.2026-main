import React from "react";

export default function TermsOfUseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="pt-24 md:pt-32 pb-20 bg-white">
      <div className="Container max-w-4xl mx-auto px-4">
        {children}
      </div>
    </main>
  );
}
