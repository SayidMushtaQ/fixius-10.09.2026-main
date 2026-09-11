"use client";
import usePlanRequest from "@/ApiRequests/plan";
import Invoice from "@/components/Common/Invoice";
import ModalStruc from "@/components/Common/ModalStruc";
import PlanCards from "@/components/Common/PlanCards";
import Loader from "@/components/Loader";
import useScrollFetch from "@/hooks/useScrollFetchs";
import { useState } from "react";
import { motion } from "framer-motion";
import AdminDataTable from "../../admin/components/AdminDataTable";
import { CreditCard, FileText } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";

export default function SubscriptionManagement() {
  const [item, setItem] = useState<any>(null);
  const { GetSubscription } = usePlanRequest();
  const {
    data: subscription,
    isRefetching,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = GetSubscription({ pageSize: 10 }, {});
  
  useScrollFetch({ fetchNextPage, hasNextPage, isWindowScroll: true });

  const columns = [
    { 
      header: "Datum", 
      key: "createdAt",
      render: (val: any) => format(new Date(val), "dd. MMM yyyy", { locale: de })
    },
    { 
      header: "Abonnement", 
      key: "plan",
      render: (val: any) => val?.name || "Premium Plan"
    },
    { 
      header: "Betrag", 
      key: "price",
      render: (val: any) => `€ ${val}`
    },
    { 
      header: "Status", 
      key: "payment_status",
      render: (val: any) => (
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          val === "paid" ? "bg-emerald-50 text-emerald-600" : "bg-primary/10 text-primary"
        }`}>
          {val === "paid" ? "Bezahlt" : "Ausstehend"}
        </span>
      )
    },
  ];

  const handleAction = (action: string, item: any) => {
    if (action === "view") setItem(item);
  };

  const flatData = subscription?.pages?.flatMap((page: any) => page.data) || [];

  return (
    <div className="w-full p-6 lg:p-10 space-y-12">
      <section>
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl lg:text-4xl font-bold text-slate-950 leading-tight font-outfit"
        >
          Ihr <span className="text-primary italic">Abonnement-Center</span>
          <p className="text-lg font-medium text-slate-500 mt-2 font-inter">
            Verwalten Sie Ihre Tarife und laden Sie Ihre Rechnungen herunter.
          </p>
        </motion.h1>
      </section>

      <section className="space-y-8">
        <div className="flex items-center gap-3 text-slate-950">
          <div className="p-2 bg-primary/10 rounded-xl text-primary font-outfit">
            <CreditCard size={20} />
          </div>
          <h2 className="text-xl font-bold">Verfügbare Tarife</h2>
        </div>
        <PlanCards />
      </section>

      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-slate-950 font-outfit">
            <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
              <FileText size={20} />
            </div>
            <h2 className="text-xl font-bold">Zahlungshistorie</h2>
          </div>
          {flatData.length > 0 && (
             <span className="text-xs font-bold text-slate-400">
                {flatData.length} Rechnungen
             </span>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        ) : (
          <div className="space-y-6">
            <AdminDataTable
              columns={columns}
              data={flatData}
              onAction={handleAction}
            />
            {isRefetching && <Loader />}
          </div>
        )}
      </section>

      <ModalStruc isOpen={item ? true : false} closeModal={() => setItem(null)}>
        <Invoice subscription={item} />
      </ModalStruc>
    </div>
  );
}
