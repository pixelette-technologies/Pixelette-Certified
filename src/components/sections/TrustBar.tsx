"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { TRUST_STATS } from "@/lib/constants";

export default function TrustBar() {
  return (
    <section className="relative py-10 bg-gradient-to-r from-primary-dark/80 via-primary/60 to-primary-dark/80 backdrop-blur-xl border-y border-accent/10">
      {/* Glow line top */}
      <div className="absolute top-0 inset-x-0 divider-glow" />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          {TRUST_STATS.map((stat) => (
            <motion.div key={stat.label} variants={staggerItem} className="group">
              <div className="text-2xl md:text-3xl font-extrabold gradient-text group-hover:scale-110 transition-transform duration-500">
                {stat.value}{stat.suffix || ""}
              </div>
              <div className="text-xs md:text-sm text-gray-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      {/* Glow line bottom */}
      <div className="absolute bottom-0 inset-x-0 divider-glow" />
    </section>
  );
}
