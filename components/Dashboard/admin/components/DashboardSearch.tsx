"use client";

import React from "react";
import { Search, X } from "lucide-react";

interface DashboardSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function DashboardSearch({
  value,
  onChange,
  placeholder = "Suchen...",
  className = "",
}: DashboardSearchProps) {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">
        <Search size={20} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-14 pr-12 py-4 bg-white rounded-2xl border border-gray-100 shadow-sm outline-none focus:border-primary/20 focus:ring-4 focus:ring-primary/5 transition-all font-medium text-secondary"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-5 top-1/2 -translate-y-1/2 p-1 text-gray-300 hover:text-secondary hover:bg-gray-100 rounded-full transition-all"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
