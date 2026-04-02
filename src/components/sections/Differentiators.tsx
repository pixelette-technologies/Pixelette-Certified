"use client";

import { motion } from "framer-motion";
import { Zap, Puzzle, PoundSterling, Brain } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { staggerContainer, staggerItem } from "@/lib/animations";

const differentiators = [
  {
    icon: Zap,
    title: "10 weeks to ISO 27001",
    description:
      "Most consultancies take 6 months. We have built a process that gets UK technology companies certified in 10 weeks without cutting corners.",
  },
  {
    icon: Puzzle,
    title: "One partner for everything",
    description:
      "ISO, vCISO, GDPR, VAPT. One relationship, one commercial arrangement, one team that understands your entire security and compliance picture.",
  },
  {
    icon: PoundSterling,
    title: "Enterprise quality, scale-up pricing",
    description:
      "Our delivery model means you get the same quality as the big London consultancies at 25–35% below their rates.",
  },
  {
    icon: Brain,
    title: "Built for the AI era",
    description:
      "We are one of the only UK consultancies formally offering ISO 42001 AI governance. If you are building with AI, we understand your compliance landscape.",
  },
];

export default function Differentiators() {
  return (
    <section className="relative py-20 lg:py-28 bg-surface overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-white to-surface" />
      <div className="absolute top-[30%] right-[-5%] w-[400px] h-[400px] rounded-full bg-accent/[0.04] blur-[100px] animate-float-slow" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          label="Why Pixelette Certified"
          title="The unfair advantage your compliance deserves"
          dark={false}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {differentiators.map((item) => (
            <motion.div key={item.title} variants={staggerItem}>
              <Card variant="white" className="h-full text-center group">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/15 to-accent-light/5 border border-accent/15 flex items-center justify-center mx-auto mb-5 group-hover:border-accent/40 group-hover:shadow-glow transition-all duration-500">
                  <item.icon className="h-7 w-7 text-accent-dark" />
                </div>
                <h3 className="font-bold text-primary text-lg mb-3 group-hover:text-accent-dark transition-colors duration-300">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
