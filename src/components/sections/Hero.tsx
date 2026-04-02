"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";
import { fadeInLeft, fadeInRight } from "@/lib/animations";

const ParticleNetwork = dynamic(() => import("@/components/canvas/ParticleNetwork"), {
  ssr: false,
});

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[92vh] flex items-center bg-gradient-mesh">
      {/* Background effects */}
      <div className="absolute inset-0">
        <ParticleNetwork />
        {/* Floating gradient orbs */}
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-accent/[0.04] blur-[120px] animate-float-slower" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[600px] h-[600px] rounded-full bg-accent-light/[0.03] blur-[100px] animate-float-slow" />
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full bg-accent/[0.02] blur-[80px] animate-pulse-glow" />
      </div>

      {/* Top gradient fade */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#032e2f] to-transparent z-[1]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left content */}
        <motion.div
          variants={fadeInLeft}
          initial="hidden"
          animate="visible"
        >
          <span className="inline-flex items-center gap-2 text-accent text-sm font-bold uppercase tracking-widest mb-6 px-4 py-2 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            ISO 27001 &middot; Cyber Essentials &middot; GDPR &middot; vCISO &middot; AI Governance
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
            <span className="gradient-text-white">Your business certified.</span>
            <br />
            <span className="gradient-text-white">Your data protected.</span>
            <br />
            <span className="gradient-text">Your compliance — done.</span>
          </h1>
          <p className="text-lg text-gray-400 mb-8 max-w-xl leading-relaxed">
            UK-based. Expert-led. Built for technology companies. We get you
            certified in as little as 10 weeks, so you can win enterprise
            contracts and close deals faster.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/contact" size="lg">
              Get Your Free Gap Analysis
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              See Our Services
            </Button>
          </div>

{/* Stats moved to TrustBar section below hero */}
        </motion.div>

        {/* Right visual — animated concentric rings with glow */}
        <motion.div
          variants={fadeInRight}
          initial="hidden"
          animate="visible"
          className="hidden lg:flex items-center justify-center"
        >
          <div className="relative w-[420px] h-[420px]">
            {/* Glow background */}
            <div className="absolute inset-[-20%] rounded-full bg-accent/[0.06] blur-[60px] animate-pulse-glow" />
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border border-accent/15 animate-ping" style={{ animationDuration: "3s" }} />
            {/* Second ring */}
            <div className="absolute inset-6 rounded-full border border-accent/20" />
            {/* Third ring */}
            <div className="absolute inset-12 rounded-full border border-accent/25 animate-pulse" style={{ animationDuration: "2s" }} />
            {/* Inner circle with glass */}
            <div className="absolute inset-20 rounded-full glass-card flex items-center justify-center">
              <img
                src="/logos/logo-white-text.svg"
                alt="Pixelette Certified"
                className="w-44 opacity-90"
              />
            </div>
            {/* Orbiting dots */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: "20s" }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent shadow-glow-accent" />
            </div>
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent-light shadow-glow-accent" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#032e2f] to-transparent z-[1]" />
    </section>
  );
}
