import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Search as SearchIcon, CheckCircle2, XCircle } from "lucide-react";
import LoginDetails from "./LoginDetails";
import UserList from "./UserList";

export default function ClientProfile({
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) {
  const queryClient = useQueryClient();
  return (
    <div className="w-full">
      <div className="lg:w-3/4 lg:mx-auto">
        <section className="my-8">
          <h1 className="font-bold text-4xl text-Heading text-center">
            Benutzerverwaltung
            <span className="text-orange font-bold block mt-2">
              Administrator-Kontrollzentrum
            </span>
          </h1>
        </section>
        <div className="flex w-5/5 p-4 justify-center relative">
          <span
            style={{ left: "2%" }}
            className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <SearchIcon className="text-gray-400 w-5 h-5" />
          </span>
          <input
            style={{ height: 56 }}
            type="text"
            placeholder="Suche nach E-Mail, Firmenname und Rolle"
            className="pl-12 w-4/5 pr-4 py-2 border border-slate-200 rounded-l-2xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
            onChange={async(e) => {
              setSearch(e.target.value);
              await queryClient.invalidateQueries({ queryKey: ['getUsers'] });
            }}
            value={search}
          />
          <button
            className="w-1/5 bg-orange text-white px-4 py-2 border border-orange rounded-r-2xl focus:outline-none hover:bg-orange-600 transition-colors font-semibold">
            Profil suchen
          </button>
        </div>
      </div>
      
      <UserList search={search} />
      <LoginDetails />
    </div>
  );
}

export const getStatusBadge = (status: any) => {
  return status ? (
    <CheckCircle2 className="m-auto text-emerald-500 w-5 h-5" />
  ) : (
    <XCircle className="m-auto text-red-500 w-5 h-5" />
  );
};

export const Search = () => {
  return (
    <>
      <span className="w-100">Adresse</span>
      <span className="w-100">0156241893525</span>
      <span className="w-28">Adresse</span>
    </>
  );
};
