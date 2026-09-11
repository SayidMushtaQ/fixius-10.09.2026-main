// components/PaymentTable.tsx
import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";
import Link from "next/link";
import React, { Fragment } from "react";
import { ChevronDown, Download, Eye } from "lucide-react";
import { NotFoundData } from "../../Pedidos";

interface PaymentTableProps {
  subscription: any;
  isRefetching?: boolean;
  onView?: (item: any) => void;
}

const PaymentTable: React.FC<PaymentTableProps> = ({
  onView = () => {},
  subscription,
  isRefetching = false,
}) => {
  const { userData } = useAuth();
  const user = userData[0];

  return (
    <div className="overflow-x-auto w-full">
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr className="border-b-2 border-orange-500">
            <th className="py-4 px-2 text-orange text-start font-bold">Zahlungs-ID</th>
            <th className="py-4 px-2 text-orange text-start font-bold">Datum</th>
            <th className="py-4 px-2 text-orange text-start font-bold">Plan</th>
            <th className="py-4 px-2 text-orange text-start font-bold">Methode</th>
            <th className="py-4 px-2 text-orange text-start font-bold">Betrag</th>
            <th className="py-4 px-2 text-orange text-start font-bold">Status</th>
            <th className="py-4 px-2 text-orange text-start font-bold">
              <div className="flex items-center justify-between gap-4">
                <span>Aktionen</span>
                <button className="text-white bg-orange hover:bg-orange-600 transition-colors rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs font-semibold shadow-sm">
                  <Download className="w-3.5 h-3.5" />
                  Alles laden
                </button>
              </div>
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {subscription?.pages?.map((page: any, ind: number) => (
            <Fragment key={ind}>
              {page.data.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <NotFoundData text="Keine Daten gefunden" />
                  </td>
                </tr>
              ) : (
                page.data.map((item: any, index: number) => (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-2">
                      <Link
                        href={
                          user.role === "admin"
                            ? `/handwerker/${item?.craftsmanId?.company_name}`
                            : ""
                        }
                        className="text-slate-600 hover:text-orange-500 transition-colors"
                      >
                        #{item.paymentId}
                      </Link>
                    </td>
                    <td className="py-4 px-2 text-slate-600">
                      {format(new Date(item?.start_date || Date.now()), "MM/dd/yyyy")}
                    </td>
                    <td className="py-4 px-2 font-medium text-slate-700">{item?.plan?.name}</td>
                    <td className="py-4 px-2 text-slate-600 capitalize">
                      {item?.payment_details?.payment_method === "bank_transfer"
                        ? "Banküberweisung"
                        : item?.payment_details?.payment_method?.split("_")?.join(" ")}
                    </td>
                    <td className="py-4 px-2 font-bold text-slate-800">€{item?.plan?.price}</td>
                    <td className="py-4 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        item?.payment_status === "paid" 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                          : "bg-amber-50 text-amber-700 border border-amber-100"
                      }`}>
                        {item?.payment_status === "paid" ? "Bezahlt" : item?.payment_status}
                      </span>
                    </td>
                    <td className="py-4 px-2">
                      {user.role === "handwerker" && item?.payment_status === "pending" ? (
                        <span className="text-slate-400 text-sm italic">Ausstehend</span>
                      ) : (
                        <button
                          onClick={() => onView(item)}
                          className="text-orange hover:text-orange-600 font-semibold flex gap-1.5 items-center transition-colors text-sm"
                        >
                          <Eye className="w-4 h-4" />
                          Ansehen {user.role === "handwerker" && "Rechnung"}
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </Fragment>
          ))}
          {isRefetching && (
            <tr>
              <td colSpan={7} className="text-center py-4 text-slate-400">Lädt...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
