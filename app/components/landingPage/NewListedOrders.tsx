"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useState } from "react";
import { JobCard } from "./JobCard";
import { motion } from "framer-motion";
import { useGetJobs } from "@/hooks/useGetJobs";
import CraftsmanPortalModal from "@/components/landingPage/components/CraftmanPortalModal";

export default function NewListedOrders() {
  const { userData } = useAuth();
  const user = userData?.[0];
  const { data: allJobs, isLoading } = useGetJobs();
  const [showPortalModal, setShowPortalModal] = useState(false);

  // Only registered craftsmen may browse the full ad list; everyone else is
  // asked to log in or register first.
  const canSeeAllJobs = user?.role === "handwerker" || user?.role === "admin";

  // Show only the 4 most recent jobs
  const displayJobs = allJobs ? allJobs.slice(0, 4) : [];

  return (
    <section className="py-20 bg-main-background relative">
      <div className="Container">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="space-y-4 max-w-2xl text-left">
            <motion.h2
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-inter font-bold text-secondary tracking-tight leading-tight"
            >
              Aktuelle <span className="text-primary italic">Aufträge</span>
            </motion.h2>
            <p className="font-inter text-secondary-light text-lg font-medium leading-relaxed">
              Sie sind Handwerker und suchen Projekte in Ihrer Nähe? Melden Sie sich an, um passende Aufträge zu finden.
            </p>
          </div>
          {canSeeAllJobs ? (
            <Link
              href="/dashboard/handwerker/auftragsangebote"
              className="shrink-0"
            >
              <button className="font-inter btn-secondary px-6 py-3 text-base font-bold group">
                Alle Aufträge
                <span className="group-hover:translate-x-1 transition-transform duration-300 ml-2">→</span>
              </button>
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => setShowPortalModal(true)}
              className="font-inter btn-secondary px-6 py-3 text-base font-bold group shrink-0"
            >
              Alle Aufträge
              <span className="group-hover:translate-x-1 transition-transform duration-300 ml-2">→</span>
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-64 bg-slate-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : displayJobs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {displayJobs.map((job: any, index: number) => (
              <JobCard key={job._id} job={job} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100">
            <p className="text-slate-400 font-medium">Zur Zeit keine neuen Aufträge verfügbar.</p>
          </div>
        )}


      </div>

      <CraftsmanPortalModal
        isOpen={showPortalModal}
        setModalIsOpen={setShowPortalModal}
      />
    </section>
  );
}
