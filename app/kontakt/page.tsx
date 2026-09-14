"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import axios from "axios";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/contact", formData);
      if (res.status === 200) {
        toast.success("Nachricht erfolgreich gesendet!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Etwas ist schief gelaufen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-mainBackground pt-24 pb-12 md:pt-32 md:pb-20">
      <div className="Container px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-black text-secondary mb-4"
            >
              Kontaktieren Sie <span className="text-primary italic">uns</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-500 text-lg max-w-2xl mx-auto font-medium"
            >
              Haben Sie Fragen oder benötigen Sie Hilfe? Unser Team ist für Sie da.
              Senden Sie uns eine Nachricht und wir melden uns so schnell wie möglich bei Ihnen.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white p-8 rounded-3xl shadow-premium border border-slate-100 space-y-8"
              >
                <div className="flex items-start gap-4 group">
                  <div className="p-4 bg-primary/10 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary">Email</h3>
                    <p className="text-slate-500 text-sm font-medium">info@fixius.de</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-4 bg-primary/10 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary">Telefon</h3>
                    <p className="text-slate-500 text-sm font-medium">+49 0162 525 4051</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="p-4 bg-primary/10 rounded-2xl text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary">Standort Fixius - Handwerksportal</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">
                      Giuseppe Licopoli<br />
                      Neuenkamperstr 32,<br />
                      42657 Solingen
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-8 md:p-10 rounded-3xl shadow-premium border border-slate-100"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-secondary ml-1 uppercase tracking-wider">Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ihr Name"
                        className="w-full px-5 py-4 bg-slate-50 border-slate-100 border-2 rounded-2xl outline-none focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-secondary ml-1 uppercase tracking-wider">E-Mail</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ihre@email.de"
                        className="w-full px-5 py-4 bg-slate-50 border-slate-100 border-2 rounded-2xl outline-none focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-secondary ml-1 uppercase tracking-wider">Betreff</label>
                    <input
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Wie können wir helfen?"
                      className="w-full px-5 py-4 bg-slate-50 border-slate-100 border-2 rounded-2xl outline-none focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-secondary ml-1 uppercase tracking-wider">Nachricht</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Ihre Nachricht an uns..."
                      className="w-full px-5 py-4 bg-slate-50 border-slate-100 border-2 rounded-2xl outline-none focus:border-primary/30 focus:bg-white focus:ring-4 focus:ring-primary/5 transition-all font-medium resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-secondary hover:bg-primary text-white font-bold py-5 px-8 rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50"
                  >
                    {loading ? "Wird gesendet..." : "Nachricht senden"}
                    {!loading && <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
