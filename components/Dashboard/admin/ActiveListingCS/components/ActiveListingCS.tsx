"use client";

import useAdminJobRequests, { AdminJobFilter } from "@/ApiRequests/adminJobs";
import CustomConfirmPrompt from "@/components/Modals/CustomConfirmPromp";
import { format } from "date-fns";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import AdminDataTable from "../../components/AdminDataTable";
import BlockAdModal from "./BlockAdModal";

const PAGE_SIZE = 10;

const FILTERS: { key: AdminJobFilter; label: string }[] = [
  { key: "all", label: "Alle" },
  { key: "active", label: "Freigegeben" },
  { key: "blocked", label: "Gesperrt" },
];

const jobTitleOf = (item: any) =>
  item?.serviceTitle?.service_title ||
  item?.serviceTitle?.other_title ||
  item?.category ||
  "Ohne Titel";

export default function ActiveListingCS() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<AdminJobFilter>("all");
  const [pageNumber, setPageNumber] = useState(1);
  const [jobToBlock, setJobToBlock] = useState<any>(null);
  const [jobToUnblock, setJobToUnblock] = useState<any>(null);

  const { GetAllJobs, SetJobBlocked } = useAdminJobRequests();
  const { data, isFetching } = GetAllJobs({
    pageSize: PAGE_SIZE,
    pageNumber,
    search,
    filter,
  });

  const jobs = data?.data ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPageNumber(1);
    setSearch(searchInput.trim());
  };

  const handleFilter = (next: AdminJobFilter) => {
    setPageNumber(1);
    setFilter(next);
  };

  const handleBlock = (reason: string) => {
    SetJobBlocked.mutate(
      { id: jobToBlock._id, blocked: true, reason },
      { onSuccess: () => setJobToBlock(null) },
    );
  };

  const handleUnblock = () => {
    SetJobBlocked.mutate(
      { id: jobToUnblock._id, blocked: false },
      { onSuccess: () => setJobToUnblock(null) },
    );
  };

  const columns = [
    {
      header: "Berufstitel",
      key: "serviceTitle",
      render: (_: any, item: any) => (
        <div>
          <p className="font-semibold text-slate-950">{jobTitleOf(item)}</p>
          <p className="text-xs text-slate-500">{item?.category}</p>
        </div>
      ),
    },
    { header: "Anzeigen-ID", key: "listingId" },
    {
      header: "Ort",
      key: "location",
      render: (_: any, item: any) =>
        item?.location?.place_name || item?.location?.zip_code || "—",
    },
    {
      header: "Veröffentlicht am",
      key: "createdAt",
      render: (value: any) =>
        value ? format(new Date(value), "dd.MM.yyyy") : "—",
    },
    {
      header: "Status",
      key: "isBlocked",
      render: (_: any, item: any) =>
        item?.isBlocked ? (
          <div>
            <span className="inline-block rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-600">
              Gesperrt
            </span>
            {item?.blockedReason && (
              <p
                className="mt-1 max-w-[220px] truncate text-xs text-slate-500"
                title={item.blockedReason}
              >
                {item.blockedReason}
              </p>
            )}
          </div>
        ) : (
          <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
            Freigegeben
          </span>
        ),
    },
  ];

  return (
    <div className="w-full p-6 lg:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-outfit text-3xl font-bold text-slate-950">
            Anzeigenverwaltung
          </h1>
          <p className="mt-1 font-inter text-slate-600">
            Sperren Sie Anzeigen, die gegen die Richtlinien verstoßen, oder
            geben Sie sie wieder frei.
          </p>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <form className="flex items-stretch" onSubmit={handleSearch}>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <FaSearch className="text-slate-400" />
            </span>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Titel, Anzeigen-ID, E-Mail oder Ort"
              className="h-12 w-72 rounded-l-lg border border-slate-200 bg-slate-50 pl-12 font-montserrat font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <button
            type="submit"
            className="h-12 rounded-r-lg bg-primary px-6 font-montserrat font-bold text-white transition-all hover:bg-black shadow-soft"
          >
            Suchen
          </button>
        </form>

        <div role="tablist" className="flex gap-2">
          {FILTERS.map((option) => (
            <button
              key={option.key}
              role="tab"
              aria-selected={filter === option.key}
              onClick={() => handleFilter(option.key)}
              className={`rounded-lg px-6 py-2.5 font-montserrat font-bold transition-colors ${
                filter === option.key
                  ? "bg-slate-950 text-white"
                  : "border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <AdminDataTable
        columns={columns}
        data={jobs}
        isLoading={isFetching && !data}
        emptyLabel="Keine Anzeigen gefunden"
        renderActions={(item: any) =>
          item?.isBlocked ? (
            <button
              onClick={() => setJobToUnblock(item)}
              disabled={SetJobBlocked.isPending}
              className="rounded-lg border border-emerald-200 px-4 py-2 font-montserrat text-sm font-bold text-emerald-600 transition-colors hover:bg-emerald-50 disabled:opacity-40"
            >
              Freigeben
            </button>
          ) : (
            <button
              onClick={() => setJobToBlock(item)}
              disabled={SetJobBlocked.isPending}
              className="rounded-lg border border-red-200 px-4 py-2 font-montserrat text-sm font-bold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-40"
            >
              Sperren
            </button>
          )
        }
      />

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            disabled={pageNumber <= 1 || isFetching}
            onClick={() => setPageNumber((page) => page - 1)}
            className="rounded-lg border border-slate-200 px-6 py-2.5 font-montserrat font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40"
          >
            Zurück
          </button>
          <span className="font-inter text-sm text-slate-600">
            Seite {pageNumber} von {totalPages}
          </span>
          <button
            disabled={pageNumber >= totalPages || isFetching}
            onClick={() => setPageNumber((page) => page + 1)}
            className="rounded-lg border border-slate-200 px-6 py-2.5 font-montserrat font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-40"
          >
            Weiter
          </button>
        </div>
      )}

      <BlockAdModal
        isOpen={Boolean(jobToBlock)}
        isLoading={SetJobBlocked.isPending}
        jobTitle={jobToBlock ? jobTitleOf(jobToBlock) : ""}
        onCancel={() => setJobToBlock(null)}
        onConfirm={handleBlock}
      />

      <CustomConfirmPrompt
        isOpen={Boolean(jobToUnblock)}
        isLoading={SetJobBlocked.isPending}
        onCancel={() => setJobToUnblock(null)}
        onConfirm={handleUnblock}
        confirmLabel="Freigeben"
        cancelLabel="Abbrechen"
        promptText={
          jobToUnblock
            ? `„${jobTitleOf(jobToUnblock)}“ wieder freigeben? Die Anzeige erscheint dann sofort wieder in der öffentlichen Suche.`
            : ""
        }
      />
    </div>
  );
}
