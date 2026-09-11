"use client";

import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { HiCheckCircle, HiArrowRight, HiShieldCheck, HiOutlineSparkles, HiClock } from "react-icons/hi";
import { ServiceSchemaConfig } from "@/lib/serviceSchemas";

interface UnifiedServiceContentProps {
  serviceData: ServiceSchemaConfig;
  searchDefaultField: string;
}

const UnifiedServiceContent: React.FC<UnifiedServiceContentProps> = ({ 
  serviceData, 
  searchDefaultField 
}) => {
  const { name, titleSuffix, description, offers } = serviceData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-20 py-10">
      {/* Intro Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid md:grid-cols-2 gap-12 items-center"
      >
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-wide uppercase">
            <HiOutlineSparkles className="text-lg" />
            Premium Service
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-secondary leading-tight">
            Ihre Suche nach dem perfekten <span className="text-primary italic">{name}</span> endet hier.
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="flex items-center gap-2 text-secondary font-bold">
              <HiCheckCircle className="text-primary text-xl" />
              Geprüfte Profis
            </div>
            <div className="flex items-center gap-2 text-secondary font-bold">
              <HiCheckCircle className="text-primary text-xl" />
              Faire Preise
            </div>
            <div className="flex items-center gap-2 text-secondary font-bold">
              <HiCheckCircle className="text-primary text-xl" />
              Schnelle Bearbeitung
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="relative"
        >
          <div className="absolute -inset-4 bg-primary/20 rounded-[2.5rem] blur-3xl -z-10 animate-pulse" />
          <div className="glass-card p-8 md:p-10 border border-white/50 space-y-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 text-primary/5 -rotate-12 transition-transform group-hover:rotate-0 duration-700">
               <HiShieldCheck size={180} />
            </div>
            <h3 className="text-2xl font-bold text-secondary relative z-10">Warum Fixius?</h3>
            <ul className="space-y-6 relative z-10">
              <li className="flex gap-4">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <HiShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-secondary text-lg">Qualitätsgarantie</h4>
                  <p className="text-gray-500 text-sm">Wir vermitteln ausschließlich geprüfte Fachbetriebe mit nachgewiesener Expertise.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-accent-cyan/10 flex items-center justify-center text-accent-cyan">
                  <HiClock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-secondary text-lg">Zeitersparnis</h4>
                  <p className="text-gray-500 text-sm">Anstatt stundenlang zu suchen, erhalten Sie gezielte Angebote direkt auf Ihre Anfrage.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-secondary/5 flex items-center justify-center text-secondary">
                  <HiArrowRight size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-secondary text-lg">Transparenz</h4>
                  <p className="text-gray-500 text-sm">Klare Kommunikation und transparente Vermittlung ohne versteckte Gebühren.</p>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.section>

      {/* Offers Grid */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-secondary uppercase tracking-tight">Leistungsspektrum</h2>
          <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
          <p className="text-gray-500 max-w-2xl mx-auto italic text-lg">
            Umfassende Lösungen für jedes Projekt – von der Planung bis zur finalen Umsetzung.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offers.map((offer, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 h-full flex flex-col hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                <span className="text-primary font-black text-xl group-hover:text-white">0{idx + 1}</span>
              </div>
              <h4 className="text-xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">{offer.name}</h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                {offer.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default UnifiedServiceContent;
