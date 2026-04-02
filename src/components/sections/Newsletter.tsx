"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle, ArrowRight } from "lucide-react";
import { fadeInUp } from "@/lib/animations";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");

    // Simulate submission — replace with real email service
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
    setEmail("");
  }

  return (
    <section className="relative py-16 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-primary-dark to-accent/10" />
      <div className="absolute top-0 inset-x-0 divider-glow" />
      <div className="absolute bottom-0 inset-x-0 divider-glow" />
      <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-accent/[0.04] blur-[100px] animate-float-slow" />

      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center"
      >
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 mb-6">
          <Mail className="h-7 w-7 text-accent" />
        </div>

        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3 gradient-text-white">
          Stay ahead on compliance
        </h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          Get monthly insights on ISO certification, cybersecurity regulations,
          and AI governance — written by our consultants, not a marketing team.
        </p>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-2xl p-8 inline-flex flex-col items-center"
          >
            <CheckCircle className="h-10 w-10 text-accent mb-3" />
            <p className="font-semibold text-white text-lg">You&apos;re subscribed!</p>
            <p className="text-gray-400 text-sm mt-1">
              Check your inbox for a confirmation email.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10
                  text-white placeholder:text-gray-500 text-sm
                  focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30
                  transition-all duration-300"
                disabled={status === "loading"}
              />
            </div>
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3.5 rounded-xl font-semibold text-sm text-white
                bg-gradient-to-r from-accent to-accent-dark
                shadow-glow-accent hover:shadow-glow-lg
                hover:-translate-y-0.5 active:translate-y-0
                transition-all duration-300 disabled:opacity-50
                inline-flex items-center justify-center gap-2 group shrink-0"
            >
              {status === "loading" ? "Subscribing..." : (
                <>Subscribe <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" /></>
              )}
            </button>
          </form>
        )}

        <p className="mt-4 text-xs text-gray-600">
          No spam. Unsubscribe anytime. Read our{" "}
          <a href="/privacy-policy" className="text-accent hover:text-accent-light transition-colors underline">
            Privacy Policy
          </a>.
        </p>
      </motion.div>
    </section>
  );
}
