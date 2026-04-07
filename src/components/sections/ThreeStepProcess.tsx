"use client";

import { motion } from "framer-motion";
import { Search, Wrench, Award } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { staggerContainer, staggerItem } from "@/lib/animations";

const steps = [
  {
    num: "01",
    icon: Search,
    title: "We assess where you are",
    description:
      "A free gap analysis identifies exactly what you have, what you need, and how long it will take. No jargon. No surprises. Just a clear starting point, whether you are pursuing ISO 27001, ISO 42001, ISO 9001, Cyber Essentials, or any other standard.",
  },
  {
    num: "02",
    icon: Wrench,
    title: "We do the work",
    description:
      "Our consultants write the documentation, build the controls, train your team, and prepare you for the external audit. Your team stays focused on running your business. We handle every aspect of the compliance process.",
  },
  {
    num: "03",
    icon: Award,
    title: "You get certified",
    description:
      "We stand alongside you through the Stage 1 and Stage 2 audits. When you pass, and our clients pass first time, you have a globally recognised certification that opens doors to enterprise contracts, government frameworks, and new markets.",
  },
];

export default function ThreeStepProcess() {
  return (
    <section className="relative py-20 lg:py-28 bg-surface overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-white to-surface" />
      {/* Floating orb */}
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-accent/[0.04] blur-[100px] animate-float-slower" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          label="How We Work"
          title="Three steps to certification"
          description="Simple, transparent, and designed to keep your business moving, no matter where you are in the world or what industry you operate in."
          dark={false}
        />

        <motion.div
          variants={staggerContainer}
          initial="visible"
          animate="visible"
          className="grid md:grid-cols-3 gap-8 relative"
        >
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-24 left-[16.5%] right-[16.5%] h-px bg-gradient-to-r from-accent/20 via-accent/50 to-accent/20" />

          {steps.map((step) => (
            <motion.div key={step.num} variants={staggerItem} className="relative text-center group">
              {/* Number + icon */}
              <div className="relative mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 z-10">
                {/* Gradient ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 to-accent-light/10 border border-accent/30 group-hover:border-accent/60 group-hover:shadow-glow transition-all duration-500" />
                <step.icon className="h-8 w-8 text-accent relative z-10" />
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-accent to-accent-dark text-white text-xs font-extrabold rounded-full flex items-center justify-center shadow-glow-accent z-20">
                  {step.num}
                </span>
              </div>

              <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent-dark transition-colors duration-300">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
