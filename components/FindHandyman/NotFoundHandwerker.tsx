// components/FindHandyman/NotFoundHandwerker.tsx
import Link from "next/link";
import { ArrowRight, Search as SearchIcon } from "lucide-react";

export default function NotFoundHandwerker({
  handyman,
  filtered,
}: {
  handyman: string;
  filtered?: boolean;
}) {
  return (
    <div className="mx-auto max-w-3xl rounded-[22px] border border-dashed border-slate-200 bg-white px-6 py-12 text-center">
      <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <SearchIcon size={20} />
      </div>

      <p className="text-[15px] font-medium text-slate-800">
        {filtered
          ? "Keine Handwerker mit dieser Bewertung gefunden."
          : "Keinen passenden Handwerker direkt gefunden?"}
      </p>

      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
        Erstellen Sie jetzt Ihren kostenlosen Auftrag – passende Handwerker aus
        der Umgebung können sich direkt bei Ihnen melden.
      </p>

      <Link
        href={{ pathname: "/auftrag-erstellen", query: { service: handyman } }}
        className="mt-6 inline-flex items-center gap-2 rounded-md bg-[#ff5b1f] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#ed4e20]"
      >
        Kostenlosen Auftrag erstellen
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}