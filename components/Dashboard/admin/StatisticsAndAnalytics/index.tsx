"use client";

import { Context } from "@/components/Common/DashboardLayout";
import { useContext } from "react";
import { motion } from "framer-motion";
import { Users, Briefcase, TrendingUp, DollarSign, MousePointer2 } from "lucide-react";
import EChartsPieChart from "./components/pieChart";
import MetricCard from "../components/MetricCard";

export default function Index() {
  const { toggleSideBar } = useContext(Context);

  const pieChartOption = {
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      textStyle: { color: "#1e293b" },
      borderRadius: 12,
      padding: 12,
    },
    legend: {
      orient: "vertical",
      right: "5%",
      top: "center",
      itemGap: 20,
      textStyle: {
        color: "#64748b",
        fontWeight: "bold",
        fontSize: 12,
      },
    },
    series: [
      {
        name: "Zugriff von",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: { show: false },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
            color: "#1e293b",
          },
        },
        data: [
          { value: 1048, name: "Suchmaschine", itemStyle: { color: "#f97316" } },
          { value: 735, name: "Direkt", itemStyle: { color: "#3b82f6" } },
          { value: 580, name: "E-Mail", itemStyle: { color: "#10b981" } },
          { value: 484, name: "Partneranzeigen", itemStyle: { color: "#8b5cf6" } },
          { value: 300, name: "Videoanzeigen", itemStyle: { color: "#ec4899" } },
        ],
      },
    ],
  };

  return (
    <div className="w-full p-6 lg:p-10 space-y-12">
      <section>
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-black text-secondary leading-tight"
        >
          Datenansichten & <span className="text-orange">Analysen</span>
          <p className="text-lg font-medium text-gray-400 mt-2">
            Echtzeit-Einblicke in das Wachstum und die Performance Ihrer Plattform.
          </p>
        </motion.h1>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Gesamtbenutzer" 
          value="12.482" 
          icon={Users} 
          trend={{ value: "12%", isUp: true }}
          color="blue"
          delay={0.1}
        />
        <MetricCard 
          title="Aktive Aufträge" 
          value="1.240" 
          icon={Briefcase} 
          trend={{ value: "5%", isUp: true }}
          color="orange"
          delay={0.2}
        />
        <MetricCard 
          title="Umsatz (Monat)" 
          value="€ 45.200" 
          icon={DollarSign} 
          trend={{ value: "8%", isUp: true }}
          color="emerald"
          delay={0.3}
        />
        <MetricCard 
          title="Konversionsrate" 
          value="3.2%" 
          icon={MousePointer2} 
          trend={{ value: "1.2%", isUp: false }}
          color="purple"
          delay={0.4}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-premium border border-gray-100"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-black text-secondary">Wachstumsdiagramm</h3>
              <p className="text-gray-400 text-sm font-medium">Benutzerregistrierungen im Zeitverlauf</p>
            </div>
            <div className="p-2 bg-gray-50 rounded-xl">
              <TrendingUp size={20} className="text-emerald-500" />
            </div>
          </div>
          <div className="h-[350px] w-full bg-gray-50/50 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-100">
             <p className="text-gray-400 italic font-medium">Balkendiagramm-Visualisierung folgt...</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-8 rounded-3xl shadow-premium border border-gray-100"
        >
          <div className="mb-8">
            <h3 className="text-xl font-black text-secondary">Besucherquellen</h3>
            <p className="text-gray-400 text-sm font-medium">Woher kommen Ihre Nutzer?</p>
          </div>
          <div className="h-[350px] w-full">
            <EChartsPieChart option={pieChartOption} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
