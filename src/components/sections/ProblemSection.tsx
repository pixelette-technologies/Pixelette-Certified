"use client";

import { motion } from "framer-motion";
import { AlertTriangle, TrendingDown, ShieldOff } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { staggerContainer, staggerItem } from "@/lib/animations";

const painPoints = [
  {
    icon: AlertTriangle,
    title: "Lost Contracts",
    description:
      "Every day, UK technology companies lose enterprise deals because they cannot answer 'Are you ISO 27001 certified?'",
    gradient: "from-red-500/10 to-orange-500/5",
  },
  {
    icon: TrendingDown,
    title: "Stalled Investment",
    description:
      "Investors move on when your data governance is unclear. Compliance gaps signal risk that VCs and PEs do not tolerate.",
    gradient: "from-amber-500/10 to-yellow-500/5",
  },
  {
    icon: ShieldOff,
    title: "Failed Onboarding",
    description:
      "NHS Trusts, banks, and government bodies cannot add you to their supplier list without the right certifications in place.",
    gradient: "from-accent/10 to-accent-light/5",
  },
];

export default function ProblemSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-gradient-radial overflow-hidden">
      {/* Floating orb */}
      <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] rounded-full bg-accent/[0.03] blur-[80px] animate-float-slow" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          label="The Problem"
          title="Your next big deal is waiting on a certificate you don't have yet."
          description="The cost of not being certified is not the fee you save. It is every deal that goes to a competitor who is already certified."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {painPoints.map((point) => (
            <motion.div key={point.title} variants={staggerItem}>
              <Card variant="glow" className="h-full group">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${point.gradient} border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500`}>
                  <point.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3 gradient-text-white">{point.title}</h3>
                <p className="text-gray-400 leading-relaxed">{point.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
