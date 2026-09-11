"use client";
import { useAuth } from "@/context/AuthContext";
import clientError from "@/helper/clientError";
import useApiCaller from "@/hooks/useApiCaller";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { useState } from "react";
import { FileDown, Printer, Building2, User, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

function Invoice({ subscription }: any) {
  const { userData } = useAuth();
  const user = userData[0];
  const companyDetails = {
    name: "Officios.de",
    owner: "Officios GmbH",
    address: "Musterstraße 123",
    cityStateZip: "10115 Berlin",
    country: "Deutschland",
  };

  const clientDetails = {
    name: user?.name + " " + (user?.lastName || ""),
    address: user?.streetAddress || "Nicht angegeben",
    cityStateZip: `${user?.address?.placeName || ""}, ${user?.address?.zipCode || ""}`,
    country: "Deutschland",
  };

  const paymentDetails = {
    paymentId: subscription?.paymentId || "Unbekannt",
    paymentMethod: subscription?.payment_details?.payment_method || "Überweisung",
    paymentDate: subscription?.createdAt ? format(new Date(subscription.createdAt), "dd.MM.yyyy", { locale: de }) : "",
  };

  const items = [
    {
      description: subscription?.plan?.name || "Abonnement-Plan",
      quantity: 1,
      rate: subscription?.plan?.price,
      amount: subscription?.plan?.price,
    },
  ];

  const subTotal = subscription?.plan?.price || 0;
  const apiCaller = useApiCaller();
  const [isDownloading, setIsDownloading] = useState(false);
  const handleClientError = clientError();

  const downloadPDF = async () => {
    try {
      setIsDownloading(true);
      const response = await apiCaller.post(
        `/subscription/get_invoice`,
        { client: user, subscription },
        { responseType: "blob" },
      );

      if (!response.data) return;

      const url = window.URL.createObjectURL(response.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `rechnung_officios_${format(Date.now(), "dd-MM-yyyy")}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      handleClientError(error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto p-8 bg-white"
    >
      <div className="flex justify-between items-start border-b-2 border-gray-50 pb-10 mb-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-orange">
             <div className="w-10 h-10 bg-orange/10 rounded-xl flex items-center justify-center">
                <Building2 size={24} />
             </div>
             <span className="text-2xl font-black text-secondary uppercase tracking-tighter">Officios</span>
          </div>
          <div className="text-sm text-gray-400 font-medium">
            <p>{companyDetails.owner}</p>
            <p>{companyDetails.address}</p>
            <p>{companyDetails.cityStateZip}</p>
          </div>
        </div>
        <div className="text-right space-y-2">
           <h1 className="text-4xl font-black text-secondary uppercase tracking-widest">Rechnung</h1>
           <p className="text-gray-400 font-bold text-sm">#{paymentDetails.paymentId.slice(-8).toUpperCase()}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-20 mb-12">
        <div className="space-y-4">
           <div className="flex items-center gap-2 text-gray-400 uppercase tracking-widest text-[10px] font-black">
              <User size={12} />
              Rechnungsempfänger
           </div>
           <div className="text-secondary font-bold">
              <p className="text-lg font-black">{clientDetails.name}</p>
              <p>{clientDetails.address}</p>
              <p>{clientDetails.cityStateZip}</p>
              <p>{clientDetails.country}</p>
           </div>
        </div>
        <div className="space-y-4">
           <div className="flex items-center gap-2 text-gray-400 uppercase tracking-widest text-[10px] font-black">
              <CreditCard size={12} />
              Zahlungsdetails
           </div>
           <div className="grid grid-cols-2 gap-y-2 text-sm">
              <span className="text-gray-400 font-bold">Datum:</span>
              <span className="text-secondary font-black">{paymentDetails.paymentDate}</span>
              <span className="text-gray-400 font-bold">Methode:</span>
              <span className="text-secondary font-black uppercase tracking-wider">{paymentDetails.paymentMethod}</span>
           </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 mb-10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest">
              <th className="px-6 py-4">Beschreibung</th>
              <th className="px-6 py-4 text-center">Menge</th>
              <th className="px-6 py-4 text-right">Einzelpreis</th>
              <th className="px-6 py-4 text-right">Gesamt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map((item, idx) => (
              <tr key={idx} className="text-sm">
                <td className="px-6 py-6 font-black text-secondary">{item.description}</td>
                <td className="px-6 py-6 text-center font-bold text-gray-500">{item.quantity}</td>
                <td className="px-6 py-6 text-right font-bold text-gray-500">€{item.rate?.toFixed(2)}</td>
                <td className="px-6 py-6 text-right font-black text-secondary">€{item.amount?.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mb-12">
        <div className="w-full max-w-xs space-y-3">
          <div className="flex justify-between text-sm text-gray-400 font-bold">
            <span>Zwischensumme</span>
            <span>€{subTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-400 font-bold pb-3 border-b border-gray-100">
            <span>MwSt. (0%)*</span>
            <span>€0.00</span>
          </div>
          <div className="flex justify-between items-center pt-3">
            <span className="text-lg font-black text-secondary uppercase tracking-widest">Gesamtbetrag</span>
            <span className="text-2xl font-black text-orange">€{subTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-10 pt-10 border-t border-gray-50 text-[10px] text-gray-400 font-medium">
        <div className="space-y-2">
          <p className="font-black text-gray-500 uppercase tracking-widest">Zahlungshinweise</p>
          <p>Bitte begleichen Sie den Rechnungsbetrag innerhalb von 14 Tagen. *Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.</p>
        </div>
        <div className="text-right space-y-2">
          <p className="font-black text-gray-500 uppercase tracking-widest">Kontakt</p>
          <p>support@officios.de | www.officios.de</p>
        </div>
      </div>

      <div className="mt-12 flex justify-center gap-4">
        <button
          disabled={isDownloading}
          onClick={downloadPDF}
          className="flex items-center gap-2 px-8 py-4 bg-secondary text-white font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-orange transition-all shadow-lg shadow-secondary/10 disabled:opacity-50"
        >
          {isDownloading ? "Wird generiert..." : "Rechnung herunterladen"}
          {!isDownloading && <FileDown size={18} />}
        </button>
        <button 
          onClick={() => window.print()}
          className="flex items-center gap-2 px-8 py-4 bg-gray-50 text-gray-400 font-black uppercase tracking-widest text-xs rounded-2xl hover:bg-gray-100 transition-all"
        >
          Drucken
          <Printer size={18} />
        </button>
      </div>
    </motion.div>
  );
}

export default Invoice;
