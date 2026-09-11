"use client";

import React from "react";
import { ArticleData } from '@/constants/register';
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function Article() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#FF6A18 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="Container relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Main Content Area */}
          <div className="flex-3 space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-black text-secondary leading-tight tracking-tight">
                {ArticleData.title.text} <br />
                <span className="text-primary italic">{ArticleData.title.colorText}</span>
              </h2>
              <p className="text-xl text-gray-500 font-medium max-w-2xl">
                {ArticleData.subParagraph}
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-1 gap-6"
            >
              {[
                ArticleData.paragraph.paragraph1,
                ArticleData.paragraph.paragraph2,
                ArticleData.paragraph.paragraph3,
                ArticleData.paragraph.paragraph4,
                ArticleData.paragraph.paragraph5
              ].map((text, i) => (
                <div key={i} className="flex gap-4 p-6 rounded-3xl bg-gray-50/50 hover:bg-white hover:shadow-premium transition-all duration-300 border border-transparent hover:border-primary/10 group">
                  <div className="mt-1">
                    <CheckCircle2 className="w-6 h-6 text-primary opacity-40 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-gray-600 leading-relaxed font-medium">
                    {text}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Side Card / CTA Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex-[2] w-full"
          >
            <div className="bg-gradient-to-br from-orange-50 to-amber-50/60 border border-orange-200/60 rounded-[2.5rem] p-10 relative overflow-hidden shadow-xl">
              
              <h3 className="text-3xl font-black mb-6 leading-tight text-secondary">
                Bereit für mehr <br />
                <span className="text-primary italic">Aufträge?</span>
              </h3>
              <p className="text-slate-600 mb-10 leading-relaxed font-medium">
                Schließen Sie sich hunderten erfolgreichen Handwerkern an und starten Sie noch heute.
              </p>
              
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="w-full py-5 bg-primary hover:bg-primary-hover text-white font-black rounded-2xl shadow-sm transition-all transform hover:-translate-y-1 active:scale-95"
              >
                Kostenlos Registrieren
              </button>
              
              <p className="text-center text-xs text-slate-400 mt-6 font-semibold">
                Keine versteckten Gebühren. Jederzeit kündbar.
              </p>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
