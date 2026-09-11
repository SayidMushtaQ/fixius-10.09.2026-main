"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiLocationMarker, 
  HiClock, 
  HiPhone, 
  HiMail, 
  HiArrowLeft, 
  HiOutlineClipboardCheck,
  HiChevronRight,
  HiOutlinePhotograph
} from "react-icons/hi";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import useApiCaller from "@/hooks/useApiCaller";
import useChat from "@/hooks/useChat";
import useOfferRequests from "@/ApiRequests/offer";
import { formatTimeDifference } from "@/helper/formatTimeDifference";
import Login from "@/components/Login";

interface JobData {
  _id: string;
  category: string;
  listingId: number;
  additional_details: {
    how_many_floors?: string;
    how_many_rooms?: string;
    square_meters?: string;
  };
  additional_job_description: string;
  contactDetails: {
    email: string;
    name: string;
    phone: string;
  };
  location: {
    place_name: string;
  };
  images: string[];
  serviceTitle: {
    other_title?: string;
    service_title: string;
  };
  working_schedule: string;
  userId: string;
  createdAt: string;
  is_offer_sent?: boolean;
  offerId?: string;
  price?: number;
  distance?: number;
}

export default function AuftragDetailPage() {
  const params = useParams();
  const router = useRouter();
  const apiCaller = useApiCaller();
  const { userData } = useAuth();
  const user = userData?.[0];
  const { createCoversation, isCreatingConv } = useChat();
  const { CreateJobOffer } = useOfferRequests();

  const [job, setJob] = useState<JobData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPhone, setShowPhone] = useState(false);
  const [price, setPrice] = useState("");
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const jobId = params?.id;

  useEffect(() => {
    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);

  const fetchJobDetails = async () => {
    try {
      const response = await apiCaller.get(`/getsinglejob?id=${jobId}`);
      if (response.status === 200) {
        setJob(response.data.data);
      }
    } catch (error: any) {
      console.error("Error fetching job details:", error);
      toast.error("Auftrag konnte nicht geladen werden.");
    } finally {
      setLoading(false);
    }
  };

  const handleMessage = async () => {
    if (!user) {
      toast.error("Bitte loggen Sie sich ein, um eine Nachricht zu senden.");
      setShowLoginModal(true);
      return;
    }
    if (user.role !== "handwerker") {
      toast.error("Nur Handwerker können Nachrichten an Kunden senden.");
      return;
    }
    if (job) {
      createCoversation(job.userId);
    }
  };

  const handleOfferSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.role !== "handwerker") {
      toast.error("Nur Handwerker können Angebote abgeben.");
      return;
    }
    if (!price) {
      toast.error("Bitte geben Sie einen Preis an.");
      return;
    }

    try {
      const offerData = {
        client: job?.userId,
        job: job?._id,
        price,
        handymanName: user.craftsman?.company_name || user.name,
      };

      await CreateJobOffer.mutateAsync(offerData);
      toast.success("Angebot erfolgreich gesendet!");
      fetchJobDetails();
      setShowOfferForm(false);
    } catch (error) {
      toast.error("Fehler beim Senden des Angebots.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <h1 className="text-2xl font-bold text-secondary">Auftrag nicht gefunden</h1>
        <button 
          onClick={() => router.back()}
          className="btn-secondary px-6"
        >
          Zurück
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50/50 pt-24 pb-20">
      <div className="Container max-w-6xl">
        {/* Breadcrumb / Back button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors mb-8 group"
        >
          <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold text-sm uppercase tracking-wider">Zurück</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-6">
            {/* Header Section */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-md uppercase tracking-wider">
                  {job.category}
                </span>
                <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                  Vor {formatTimeDifference(job.createdAt)}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-6">{job.serviceTitle.service_title}</h1>

              <div className="flex flex-wrap gap-6 text-slate-500">
                <div className="flex items-center gap-2">
                  <HiLocationMarker className="text-slate-400" size={18} />
                  <span className="font-medium text-sm">{job.location.place_name}</span>
                </div>
                {job.distance && (
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-slate-300" />
                    <span className="font-medium text-sm">{job.distance.toFixed(1)} km entfernt</span>
                  </div>
                )}
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                <HiOutlineClipboardCheck className="text-primary" size={20} />
                Projektbeschreibung
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm whitespace-pre-wrap">
                {job.additional_job_description}
              </p>

              {/* Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                {job.additional_details.square_meters && (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Fläche</span>
                    <span className="font-bold text-slate-900 text-sm">{job.additional_details.square_meters} m²</span>
                  </div>
                )}
                {job.additional_details.how_many_rooms && (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Zimmer</span>
                    <span className="font-bold text-slate-900 text-sm">{job.additional_details.how_many_rooms} Räume</span>
                  </div>
                )}
                {job.working_schedule && (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Zeitplan</span>
                    <span className="font-bold text-slate-900 text-sm">{job.working_schedule}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Images Section */}
            {job.images && job.images.length > 0 && (
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <h2 className="text-lg font-bold text-slate-900 mb-6">Projektfotos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {job.images.map((img, i) => (
                    <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                      <Image 
                        src={img} 
                        alt={`Job image ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar / Actions Area */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm sticky top-32">
              <div className="mb-6 pb-6 border-b border-slate-100">
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="font-bold text-slate-900 text-sm">Offen für Angebote</span>
                </div>
              </div>

              <div className="space-y-3">
                {job.is_offer_sent ? (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Ihr Angebot</p>
                    <p className="text-2xl font-bold text-primary">€{job.price}</p>
                  </div>
                ) : (
                  <>
                    <button 
                      onClick={() => {
                        if (!user) {
                          toast.error("Bitte loggen Sie sich ein, um ein Angebot abzugeben.");
                          setShowLoginModal(true);
                        } else if (user.role !== "handwerker") {
                          toast.error("Nur Handwerker können Angebote abgeben.");
                        } else {
                          setShowOfferForm(!showOfferForm);
                        }
                      }}
                      className="w-full bg-primary hover:bg-orange text-white py-3.5 rounded-xl font-bold transition-all"
                    >
                      Angebot abgeben
                    </button>
                    
                    <AnimatePresence>
                      {showOfferForm && (
                        <motion.form 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          onSubmit={handleOfferSubmit}
                          className="overflow-hidden space-y-3"
                        >
                          <div className="pt-2">
                            <input 
                              type="number"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                              placeholder="Preis in € angeben"
                              className="w-full px-4 py-3 bg-slate-50 border-slate-200 border rounded-xl outline-none focus:border-primary focus:bg-white transition-all font-bold"
                            />
                          </div>
                          <button 
                            type="submit"
                            className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all"
                          >
                            Angebot senden
                          </button>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </>
                )}

                <button 
                  onClick={handleMessage}
                  disabled={isCreatingConv}
                  className="w-full border border-slate-200 hover:bg-slate-50 text-slate-900 py-3.5 rounded-xl font-bold transition-all"
                >
                  Nachricht senden
                </button>
              </div>

              {/* Contact Info (Gated) */}
              <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                <button 
                  onClick={() => {
                    if (!user) {
                      toast.error("Bitte loggen Sie sich ein, um die Kontaktdaten zu sehen.");
                      setShowLoginModal(true);
                    } else {
                      setShowPhone(!showPhone);
                    }
                  }}
                  className="w-full flex items-center justify-between p-3.5 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all border border-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <HiPhone className="text-slate-400" size={16} />
                    <span className="font-bold text-slate-900 text-xs">
                      {user && showPhone ? job.contactDetails.phone : "Telefonnummer anzeigen"}
                    </span>
                  </div>
                  {!showPhone && <HiChevronRight className="text-slate-300" />}
                </button>
              </div>

              <div className="mt-6 text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  ID: #{job.listingId}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showLoginModal && <Login setToggleLogin={setShowLoginModal} />}
    </main>


  );
}
