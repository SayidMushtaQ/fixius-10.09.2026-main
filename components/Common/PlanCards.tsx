"use client";
import usePlanRequest from "@/ApiRequests/plan";
import paymentImages from "@/components/Dashboard/handwerker/Zahlungseinstellungen/payments.png";
import { useAuth } from "@/context/AuthContext";
import useApiCaller from "@/hooks/useApiCaller";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import BankTransferForm from "../Dashboard/handwerker/Gestiondesuscripcion/components/pymentForm";
import ModalStruc from "./ModalStruc";
import { motion } from "framer-motion";
import { Check, ShieldAlert, Zap, Clock, ShieldCheck } from "lucide-react";

const PlanCards: React.FC = () => {
  const { userData } = useAuth();
  const user: any = userData[0];
  const { GetPlans, GetSubscription } = usePlanRequest();
  const { data: Plans, isLoading: isLoadingPlans } = GetPlans({ pageSize: 1 }, {});
  const active_plan: any = user?.craftsman?.current_subscription;
  const { data: subscription } = GetSubscription({ pageSize: 10 }, {});

  function calculateRemainingDays(endDate: string): number {
    const currentDate = new Date();
    const remainingMs = new Date(endDate).getTime() - currentDate.getTime();
    const remainingDays = Math.ceil(remainingMs / (1000 * 60 * 60 * 24));
    return remainingDays < 0 ? 0 : remainingDays;
  }

  const [pendingSubscription, setPendingSubscription] = useState<any>(null);
  const apiCaller = useApiCaller();
  const [initiatPayment, setInitiatPayment] = useState(null);
  const [isUserActivated, setIsUserActivated] = useState(false);

  useEffect(() => {
    apiCaller.get("/subscription/get_pending_subs").then((res: any) => {
      setPendingSubscription(res.data);
    });
  }, [apiCaller, initiatPayment]);

  if (isLoadingPlans) return <div className="flex justify-center p-20"><p className="animate-pulse font-bold text-gray-400">Lade Tarife...</p></div>;

  const sortedPlans = Plans?.sort((a: any, b: any) => a.duration_in_days - b.duration_in_days) || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {sortedPlans.length === 0 ? (
        <div className="col-span-1 md:col-span-2 lg:col-span-3 py-16 flex flex-col items-center justify-center text-center border-2 border-dashed border-gray-200 rounded-[2.5rem]">
          <ShieldAlert size={48} className="text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-800 mb-2">Keine Tarife gefunden</h3>
          <p className="text-slate-500 mb-6 max-w-md">
            Es wurden keine Abonnement-Tarife in der Datenbank gefunden. Klicken Sie unten, um Standard-Tarife für Testzwecke zu generieren.
          </p>
          <button
            onClick={async () => {
              try {
                await fetch('/api/seed-plans');
                window.location.reload();
              } catch (e) {
                console.error(e);
              }
            }}
            className="px-6 py-3 bg-secondary text-white rounded-xl font-bold hover:bg-orange transition-all flex items-center gap-2"
          >
            <Zap size={18} />
            Standard-Tarife generieren
          </button>
        </div>
      ) : (
        sortedPlans.map((item: any, idx: number) => {
          const isActive = active_plan?.plan === item._id && calculateRemainingDays(active_plan?.end_date) > 0;
          const isPending = pendingSubscription?.plan?._id === item._id;
          const remainingDays = isActive ? calculateRemainingDays(active_plan.end_date) : item.duration_in_days;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative p-8 rounded-[2.5rem] border-2 transition-all duration-500 overflow-hidden group ${
                isActive 
                  ? "bg-secondary text-white border-orange shadow-2xl scale-105 z-10" 
                  : "bg-white text-secondary border-gray-100 hover:border-orange/20 shadow-premium"
              }`}
            >
              {isActive && (
                <div className="absolute top-0 right-0 bg-orange text-white px-6 py-2 rounded-bl-3xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <ShieldCheck size={14} />
                  Aktiv
                </div>
              )}

              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black">{item?.name}</h3>
                  <p className={`${isActive ? "text-white/60" : "text-gray-400"} text-xs font-bold uppercase tracking-widest`}>
                    Laufzeit: {item.duration_in_days} Tage
                  </p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black">€{item.price}</span>
                  <span className={`${isActive ? "text-white/60" : "text-gray-400"} text-sm font-bold uppercase`}>/ Einmalig</span>
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${isActive ? "bg-white/10" : "bg-orange/10 text-orange"}`}>
                      <Check size={16} strokeWidth={3} />
                    </div>
                    <span className="text-sm font-bold">Unbegrenzte Angebote</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${isActive ? "bg-white/10" : "bg-orange/10 text-orange"}`}>
                      <Check size={16} strokeWidth={3} />
                    </div>
                    <span className="text-sm font-bold">Premium Support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-lg ${isActive ? "bg-white/10" : "bg-orange/10 text-orange"}`}>
                      <Check size={16} strokeWidth={3} />
                    </div>
                    <span className="text-sm font-bold">Verifiziertes Abzeichen</span>
                  </div>
                </div>

                <div className="pt-6">
                  {isActive ? (
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-black uppercase tracking-widest text-white/60">Verbleibend</span>
                        <span className="text-orange font-black text-sm">{remainingDays} Tage</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                         <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(remainingDays / item.duration_in_days) * 100}%` }}
                          className="h-full bg-orange"
                         />
                      </div>
                    </div>
                  ) : isPending ? (
                    <button disabled className="w-full py-4 rounded-2xl bg-gray-100 text-gray-400 font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2">
                      <Clock size={18} />
                      Ausstehend
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (user?.craftsman?.status === "unverified") {
                          setIsUserActivated(true);
                        } else {
                          setInitiatPayment(item);
                        }
                      }}
                      className="w-full py-5 rounded-2xl bg-secondary text-white hover:bg-orange transition-all font-black uppercase tracking-widest text-sm shadow-lg flex items-center justify-center gap-2 group/btn"
                    >
                      Jetzt bestellen
                      <Zap size={18} className="group-hover/btn:fill-current transition-all" />
                    </button>
                  )}
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/10 flex justify-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                 <Image width={180} src={paymentImages} alt="Payment Methods" />
              </div>
            </motion.div>
          );
        })
      )}

      <ModalStruc
        isOpen={!!initiatPayment}
        closeModal={() => setInitiatPayment(null)}
      >
        <BankTransferForm
          subscription={initiatPayment}
          closeModal={() => setInitiatPayment(null)}
        />
      </ModalStruc>

      <ModalStruc
        isOpen={isUserActivated}
        closeModal={() => setIsUserActivated(false)}
      >
        <div className="p-8 space-y-6 text-center">
          <div className="bg-orange/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-orange">
            <ShieldAlert size={40} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-secondary">Profil nicht aktiviert</h2>
            <p className="text-gray-400 mt-2 font-medium">
              Ihr Profil wird derzeit von unseren Administratoren geprüft. 
              Sie können Tarife buchen, sobald Ihr Profil aktiviert wurde.
            </p>
          </div>
          <button 
            onClick={() => setIsUserActivated(false)}
            className="w-full py-4 bg-secondary text-white font-black rounded-2xl"
          >
            Verstanden
          </button>
        </div>
      </ModalStruc>
    </div>
  );
};

export default PlanCards;
