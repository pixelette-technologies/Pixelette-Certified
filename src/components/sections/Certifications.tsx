"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { staggerContainer, staggerItem } from "@/lib/animations";

const certifications = [
  {
    title: "ISO 27001:2022 Lead Auditor",
    issuer: "CQI & IRCA via IQMS Learning / DAS Certification",
    holder: "Muhammad Waleed",
    date: "July 2023",
    certNumber: "IQ-LA10986",
    image: "/images/certifications/iso-27001.jpg",
    badge: "CQI | IRCA",
  },
  {
    title: "ISO/IEC 42001 Lead Auditor",
    issuer: "PECB — Professional Evaluation and Certification Board",
    holder: "Muhammad Waleed",
    date: "October 2025",
    certNumber: "",
    image: "/images/certifications/iso-42001.png",
    badge: "ISO 42001",
  },
  {
    title: "AI Governance Professional (AIGP)",
    issuer: "IAPP — International Association of Privacy Professionals",
    holder: "Muhammad Waleed",
    date: "May 2025",
    certNumber: "",
    image: "/images/certifications/aigp-iapp.png",
    badge: "IAPP AIGP",
  },
  {
    title: "Fellow of Information Privacy (FIP)",
    issuer: "IAPP — International Association of Privacy Professionals",
    holder: "Muhammad Waleed",
    date: "September 2025",
    certNumber: "",
    image: "/images/certifications/fip-iapp.png",
    badge: "IAPP FIP",
  },
  {
    title: "Certified Information Privacy Professional (CIPP/US)",
    issuer: "IAPP — International Association of Privacy Professionals",
    holder: "Muhammad Waleed",
    date: "August 2025",
    certNumber: "",
    image: "/images/certifications/cipp-us-iapp.png",
    badge: "IAPP CIPP/US",
  },
  {
    title: "Certified Information Privacy Manager (CIPM)",
    issuer: "IAPP — International Association of Privacy Professionals",
    holder: "Muhammad Waleed",
    date: "February 2024",
    certNumber: "",
    image: "/images/certifications/cipm-iapp.png",
    badge: "IAPP CIPM",
  },
  {
    title: "CISA — Certified Information Systems Auditor",
    issuer: "ISACA",
    holder: "Muhammad Waleed",
    date: "July 2024",
    certNumber: "",
    image: "/images/certifications/cisa.png",
    badge: "ISACA CISA",
  },
  {
    title: "CEH — Certified Ethical Hacker",
    issuer: "EC-Council",
    holder: "Muhammad Waleed",
    date: "March 2018",
    certNumber: "",
    image: "/images/certifications/ceh.png",
    badge: "EC-Council CEH",
  },
];

export default function Certifications({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [selectedCert, setSelectedCert] = useState<(typeof certifications)[0] | null>(null);
  const isDark = variant === "dark";

  return (
    <>
      <section className={`relative py-20 lg:py-28 overflow-hidden ${isDark ? "bg-gradient-dark" : "bg-surface"}`}>
        {isDark && (
          <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] rounded-full bg-accent/[0.03] blur-[100px] animate-float-slow" />
        )}

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Our Credentials"
            title="Certified expertise you can verify"
            description="Our team holds industry-leading certifications in information security, privacy, AI governance, and ethical hacking."
            dark={isDark}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch"
          >
            {certifications.map((cert) => (
              <motion.div key={cert.title} variants={staggerItem} className="h-full">
                <button
                  onClick={() => setSelectedCert(cert)}
                  className={`w-full h-full text-left group rounded-2xl p-6 flex flex-col transition-all duration-500 hover:-translate-y-2 ${
                    isDark
                      ? "bg-transparent hover:bg-white/[0.04] hover:shadow-glow"
                      : "bg-transparent hover:bg-white/40 hover:shadow-glow"
                  }`}
                >
                  <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-3 ${
                    isDark
                      ? "bg-accent/10 text-accent border border-accent/20"
                      : "bg-accent/10 text-accent-dark border border-accent/15"
                  }`}>
                    {cert.badge}
                  </span>
                  <h3 className={`font-bold text-sm leading-snug mb-2 transition-colors duration-300 ${
                    isDark
                      ? "text-white group-hover:text-accent"
                      : "text-primary group-hover:text-accent-dark"
                  }`}>
                    {cert.title}
                  </h3>
                  <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                    {cert.issuer}
                  </p>
                  <span className={`mt-auto pt-3 text-xs font-semibold inline-flex items-center gap-1 ${
                    isDark ? "text-accent" : "text-accent-dark"
                  }`}>
                    View certificate <ExternalLink className="h-3 w-3" />
                  </span>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-3xl w-full max-h-[90vh] glass-card rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <div>
                  <h3 className="font-bold text-white text-lg">{selectedCert.title}</h3>
                  <p className="text-sm text-gray-400">
                    {selectedCert.issuer}, {selectedCert.holder}, {selectedCert.date}
                    {selectedCert.certNumber && `, #${selectedCert.certNumber}`}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  aria-label="Close certificate view"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Certificate image */}
              <div className="overflow-auto max-h-[calc(90vh-80px)] p-4 flex justify-center bg-white/5">
                <img
                  src={selectedCert.image}
                  alt={`${selectedCert.title} certificate for ${selectedCert.holder}`}
                  className="max-w-full h-auto rounded-lg shadow-2xl"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
