"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineChatAlt2, HiX, HiStar, HiPhotograph } from "react-icons/hi";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import useOnChangeUploadImages from "@/hooks/useUploadImage";

export default function FeedbackWidget() {
  const { userData } = useAuth();
  const user = userData?.[0];

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState<"bug" | "suggestion" | "question" | "other">("other");
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false);
  const { isImgUploading, imagesData, setImagePageData, handleImageUpload } = useOnChangeUploadImages();

  const typeOptions = [
    { key: "suggestion", label: "💡 Vorschlag" },
    { key: "bug", label: "🐛 Fehler" },
    { key: "question", label: "❓ Frage" },
    { key: "other", label: "✨ Sonstiges" },
  ];

  // Pre-fill user data if logged in
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const ratingTexts: { [key: number]: string } = {
    1: "Schlecht 😞",
    2: "Verbesserungswürdig 😐",
    3: "Gut 🙂",
    4: "Sehr gut 😀",
    5: "Hervorragend! 😍",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Bitte geben Sie eine Nachricht ein.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          type,
          rating: rating > 0 ? rating : undefined,
          message,
          images: imagesData,
        }),
      });

      if (response.ok) {
        toast.success("Vielen Dank für Ihr Feedback!");
        // Reset form
        setMessage("");
        setRating(0);
        setType("other");
        setImagePageData([]);
        setIsOpen(false);
      } else {
        const data = await response.json();
        toast.error(data.message || "Fehler beim Senden des Feedbacks.");
      }
    } catch (error) {
      console.error("Feedback submit error:", error);
      toast.error("Netzwerkfehler. Bitte versuchen Sie es erneut.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Action Button - Glassmorphism & Glow */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-primary to-orange-600 text-white pl-4 pr-5 py-3.5 rounded-full shadow-[0_8px_30px_rgb(255,90,31,0.3)] hover:shadow-[0_8px_30px_rgb(255,90,31,0.5)] flex items-center justify-center transition-all duration-300 z-40 group hover:scale-105"
        title="Feedback geben"
        aria-label="Feedback geben"
      >
        <div className="relative mr-2 flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </div>
        <HiOutlineChatAlt2 size={20} className="group-hover:rotate-12 transition-transform duration-300 mr-2" />
        <span className="font-outfit font-black text-xs uppercase tracking-widest whitespace-nowrap">
          Feedback
        </span>
      </button>

      {/* Popover / Modal overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 cursor-pointer"
            />

            {/* Modal - Modern SaaS Card */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="fixed bottom-24 right-6 w-[360px] md:w-[420px] bg-white/95 backdrop-blur-xl rounded-lg border border-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.12)] z-50 overflow-hidden"
            >
              {/* Header with gradient overlay */}
              <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 text-white px-6 py-5 flex items-center justify-between relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10">
                  <h3 className="font-outfit font-black text-xl leading-tight tracking-wide !text-white" style={{ color: "#ffffff" }}>Fixius Feedback</h3>
                  <p className="text-slate-400 text-xs mt-1 font-medium !text-slate-300" style={{ color: "#cbd5e1" }}>Gemeinsam machen wir die Plattform besser</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="relative z-10 p-2 hover:bg-white/10 rounded-lg transition-all text-slate-400 hover:text-white"
                  style={{ color: "#cbd5e1" }}
                >
                  <HiX size={18} />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
                {/* Type Selection */}
                <div className="space-y-1.5 relative">
                  <label className="block text-[10px] md:text-xs font-bold text-slate-600 uppercase tracking-widest font-outfit">Feedback-Typ</label>
                  <div 
                    onClick={() => setIsTypeOpen(!isTypeOpen)}
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none hover:border-primary/50 transition-all duration-300 font-medium cursor-pointer text-slate-800 flex justify-between items-center"
                  >
                    <span>{typeOptions.find(opt => opt.key === type)?.label}</span>
                    <svg className={`w-4 h-4 text-slate-500 transition-transform ${isTypeOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                  <AnimatePresence>
                    {isTypeOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden"
                      >
                        {typeOptions.map((opt) => (
                          <div 
                            key={opt.key}
                            onClick={() => { setType(opt.key as any); setIsTypeOpen(false); }}
                            className={`px-4 py-3 text-sm cursor-pointer transition-colors ${type === opt.key ? "bg-primary/5 text-primary font-bold" : "text-slate-700 hover:bg-slate-50"}`}
                          >
                            {opt.label}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Rating (Inline) */}
                <div className="flex items-center justify-between bg-slate-50 px-4 py-3 rounded-lg border border-slate-200">
                  <span className="text-[10px] md:text-xs font-bold text-slate-600 uppercase tracking-widest font-outfit">Bewertung</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="text-2xl transition-transform duration-100 hover:scale-125 focus:outline-none"
                      >
                        <HiStar
                          className={`${
                            star <= (hoverRating || rating)
                              ? "text-amber-400 drop-shadow-[0_2px_8px_rgba(245,158,11,0.2)]"
                              : "text-slate-200"
                          } transition-all duration-150`}
                        />
                      </button>
                    ))}
                    {(hoverRating || rating) > 0 && (
                      <span className="text-[10px] md:text-xs font-bold text-slate-600 ml-2 w-[90px] text-right truncate">
                        {ratingTexts[hoverRating || rating]}
                      </span>
                    )}
                  </div>
                </div>

                {/* Inputs stacked */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] md:text-xs font-bold text-slate-600 uppercase tracking-widest font-outfit">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Optional"
                      className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all duration-300 font-medium text-slate-800 placeholder-slate-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] md:text-xs font-bold text-slate-600 uppercase tracking-widest font-outfit">E-Mail</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Optional"
                      className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all duration-300 font-medium text-slate-800 placeholder-slate-400"
                    />
                  </div>
                </div>

                {/* Message & Image Attachment inside */}
                <div className="space-y-1.5">
                  <label className="text-[10px] md:text-xs font-bold text-slate-600 uppercase tracking-widest font-outfit block">Ihre Nachricht *</label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Beschreiben Sie Ihre Erfahrungen..."
                    rows={4}
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all duration-300 font-medium resize-none leading-relaxed text-slate-800 placeholder-slate-400"
                  />
                  
                  {/* Dedicated Image Upload Row below textarea */}
                  <div className="pt-2">
                    <div className="flex items-center gap-3">
                      <label className={`cursor-pointer inline-flex items-center gap-2 px-3 py-2 bg-slate-100 border border-slate-200 hover:border-slate-300 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-all duration-200 ${isImgUploading ? "opacity-50 cursor-not-allowed" : ""}`}>
                        <HiPhotograph size={16} />
                        <span>Bild hinzufügen</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handleImageUpload}
                          disabled={isImgUploading}
                        />
                      </label>
                      <span className="text-[10px] text-slate-500 font-medium">Max. 5MB (PNG, JPG)</span>
                    </div>

                    {/* Image Previews */}
                    {(imagesData.length > 0 || isImgUploading) && (
                      <div className="flex flex-wrap gap-2 pt-3">
                        {imagesData.map((img, i) => (
                          <div key={i} className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-200 shadow-sm group">
                            <img src={img} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => setImagePageData(prev => prev.filter((_, idx) => idx !== i))}
                              className="absolute top-1 right-1 bg-black/50 hover:bg-rose-500 text-white rounded-md p-0.5 opacity-0 group-hover:opacity-100 transition-all"
                            >
                              <HiX size={10} />
                            </button>
                          </div>
                        ))}
                        {isImgUploading && (
                          <div className="w-12 h-12 rounded-lg border border-slate-200 flex items-center justify-center bg-slate-50 shadow-sm">
                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-primary to-orange-600 hover:from-orange hover:to-orange-500 disabled:from-slate-200 disabled:to-slate-200 text-white py-3.5 rounded-lg font-bold shadow-md hover:shadow-lg disabled:shadow-none transition-all duration-300 text-sm uppercase tracking-widest font-outfit mt-2"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Senden...</span>
                    </div>
                  ) : (
                    "Feedback senden"
                  )}
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
