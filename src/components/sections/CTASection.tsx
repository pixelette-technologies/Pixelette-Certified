"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { fadeInUp } from "@/lib/animations";

interface CTASectionProps {
  headline?: string;
  description?: string;
  primaryCta?: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
}

export default function CTASection({
  headline = "Start with a free gap analysis.",
  description = "No obligation. No sales pressure. In 30 minutes, you will know exactly where your compliance gaps are, which standards apply to your business, and what a realistic timeline and cost looks like.",
  primaryCta = "Book Your Free Gap Analysis",
  primaryHref = "/contact",
  secondaryCta = "Talk to a Consultant",
  secondaryHref = "/contact",
}: CTASectionProps) {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Layered gradient background */}
      <div className="absolute inset-0 bg-gradient-mesh" />

      {/* Decorative elements */}
      <div className="absolute top-0 inset-x-0 divider-glow" />
      <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-accent/[0.05] blur-[100px] animate-float-slow" />
      <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] rounded-full bg-accent-light/[0.03] blur-[80px] animate-float-slower" />

      {/* Dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #14AAA9 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center"
      >
        {/* Glass container */}
        <div className="glass-card rounded-3xl p-10 md:p-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 gradient-text-white">
            {headline}
          </h2>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            {description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href={primaryHref} size="lg">
              {primaryCta}
            </Button>
            <Button href={secondaryHref} variant="secondary" size="lg">
              {secondaryCta}
            </Button>
          </div>
          <p className="mt-6 text-sm text-gray-600">
            Most clients book their first paid engagement within 2 weeks of their gap analysis call.
          </p>
        </div>
      </motion.div>

      <div className="absolute bottom-0 inset-x-0 divider-glow" />
    </section>
  );
}
