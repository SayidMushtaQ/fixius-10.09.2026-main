"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    isUp: boolean;
  };
  color?: "orange" | "blue" | "emerald" | "purple";
  delay?: number;
}

export default function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  color = "orange",
  delay = 0,
}: MetricCardProps) {
  const colorMap = {
    orange: "bg-orange/10 text-orange",
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white p-6 rounded-3xl shadow-premium border border-gray-100 flex flex-col justify-between hover:border-orange/20 transition-all group"
    >
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-2xl ${colorMap[color]} transition-colors group-hover:scale-110 duration-300`}>
          <Icon size={24} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-black uppercase tracking-wider px-2 py-1 rounded-full ${trend.isUp ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
            {trend.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {trend.value}
          </div>
        )}
      </div>

      <div className="mt-6">
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</p>
        <h3 className="text-3xl font-black text-secondary">{value}</h3>
      </div>
    </motion.div>
  );
}
