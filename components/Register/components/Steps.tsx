"use client";

import { StepsCardsData } from "@/constants/register";
import Image from "next/image";
import { motion } from "framer-motion";

const Step = ({ step, img, title, paragraph, index }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative flex flex-col items-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 group border border-gray-100/50"
    >
      {/* Step Indicator */}
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-sm z-20">
        {step}
      </div>

      {/* Icon Hexagon Container */}
      <div className="relative w-40 h-40 mb-8 flex items-center justify-center">
        <div className="absolute inset-0 bg-primary/5 rounded-[2rem] rotate-6" />
        <div className="absolute inset-0 bg-white shadow-sm rounded-[2rem] -rotate-6" />
        
        <div className="relative z-10 w-24 h-24 flex items-center justify-center">
          <Image
            className="w-full h-full object-contain"
            src={img}
            alt={title}
            width={120}
            height={120}
          />
        </div>
      </div>

      {/* Content */}
      <div className="text-center space-y-4">
        <h3 className="font-extrabold text-xl text-secondary leading-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed px-2">
          {paragraph}
        </p>
      </div>
    </motion.div>
  );
};

export default function Steps() {
  return (
    <section className="py-20 bg-mainBackground relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-cyan/5 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />

      <div className="Container">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-primary font-bold text-sm tracking-wider uppercase mb-2"
          >
            Der Prozess
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-secondary leading-tight"
          >
            Finde passende Aufträge in <br />
            <span className="text-primary italic">3 einfachen Schritten</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2 -z-0" />
          
          {StepsCardsData.map((data, index) => (
            <Step
              key={data.id}
              {...data}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
