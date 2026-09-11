"use client";
import React from "react";

export default function LoadingStep() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Skeleton Header */}
      <div className="space-y-3">
        <div className="h-7 bg-gray-100 rounded-lg w-3/4" />
        <div className="h-4 bg-gray-50 rounded-lg w-1/2" />
      </div>

      {/* Skeleton Grid for Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <div key={i} className="h-12 bg-gray-50/50 border-2 border-gray-100 rounded-xl flex items-center px-3 gap-3">
            <div className="w-5 h-5 rounded-full bg-gray-100 shrink-0" />
            <div className="h-4 bg-gray-100 rounded w-full" />
          </div>
        ))}
      </div>

      {/* Skeleton Input Area */}
      <div className="pt-8 border-t border-gray-50 space-y-3">
        <div className="h-3 bg-gray-100 rounded-lg w-1/4" />
        <div className="h-12 bg-gray-50/50 border-2 border-gray-100 rounded-2xl" />
      </div>
    </div>
  );
}
