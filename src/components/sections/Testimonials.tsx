"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { staggerContainer, staggerItem } from "@/lib/animations";

const testimonials = [
  {
    quote:
      "We needed ISO 27001 to close a contract with a major bank. Pixelette Certified got us through Stage 2 in 9 weeks. The deal closed within 30 days of certification.",
    author: "CTO",
    company: "FinTech",
    rating: 5,
  },
  {
    quote:
      "We had been putting off ISO 27001 for two years because every consultant we spoke to made it sound like an 8-month project. It took 11 weeks. The process was clear, structured, and genuinely painless.",
    author: "Head of Engineering",
    company: "SaaS Platform",
    rating: 5,
  },
  {
    quote:
      "The vCISO service means we have a senior security voice in every board conversation without the cost of a full-time CISO. It has changed how seriously our enterprise clients take us globally.",
    author: "CEO",
    company: "AI Technology Company",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-20 lg:py-28 bg-gradient-dark-reverse overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] rounded-full bg-accent/[0.03] blur-[80px] animate-float-slow" />
      <div className="absolute bottom-[10%] right-[10%] w-[250px] h-[250px] rounded-full bg-accent-light/[0.02] blur-[60px] animate-float-slower" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          label="Client Success"
          title="Trusted by Technology Companies Winning Enterprise Contracts"
          description="Our clients pass their audits first time. Here is what they say."
        />

        <motion.div
          variants={staggerContainer}
          initial="visible"
          animate="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {testimonials.map((t, i) => (
            <motion.div key={i} variants={staggerItem}>
              <div className="h-full glass-card rounded-2xl p-8 flex flex-col group hover:-translate-y-2 transition-all duration-500">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 text-accent fill-accent" />
                  ))}
                </div>

                <Quote className="h-8 w-8 text-accent/30 mb-4" />
                <p className="text-gray-300 leading-relaxed flex-1 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 pt-4 border-t border-white/10">
                  <p className="font-semibold gradient-text-white">{t.author}</p>
                  <p className="text-sm text-gray-300">{t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
