"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  Shield,
  Clock,
  FileSearch,
} from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { fadeInUp, fadeInLeft, fadeInRight } from "@/lib/animations";
import { SITE_CONFIG } from "@/lib/constants";

const serviceOptions = [
  "ISO 27001 Certification",
  "ISO 22301 Certification",
  "ISO 42001 AI Governance",
  "ISO 9001 Quality Management",
  "ISO 14001 Environmental",
  "Cyber Essentials / CE+",
  "GDPR & Data Privacy",
  "Virtual CISO (vCISO)",
  "Virtual DPO (vDPO)",
  "Penetration Testing",
  "Gap Analysis",
  "Multiple Services",
  "Other / Not Sure",
];

interface FormState {
  name: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
  gdprConsent: boolean;
}

export default function ContactContent() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
    gdprConsent: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setForm({ name: "", email: "", company: "", phone: "", service: "", message: "", gdprConsent: false });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const inputClasses =
    "w-full rounded-lg bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-gray-500 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors text-sm";

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #14AAA9 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center"
        >
          <SectionLabel className="mb-4 block">Contact</SectionLabel>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Let&apos;s talk about your compliance goals
          </h1>
          <p className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Whether you need a quick question answered or want to book a free
            gap analysis, we are here to help.
          </p>
        </motion.div>
      </section>

      {/* Form + Info */}
      <section className="py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left: Form */}
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <Card variant="glass" hover={false}>
                <h2 className="text-2xl font-bold text-white mb-6">
                  Send us a message
                </h2>

                {status === "success" ? (
                  <div className="flex flex-col items-center text-center py-12">
                    <CheckCircle className="h-16 w-16 text-accent mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">
                      Message sent
                    </h3>
                    <p className="text-gray-400 max-w-sm">
                      Thank you for getting in touch. A member of our team will
                      respond within one working day.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-6 text-accent hover:text-accent-light transition-colors text-sm font-semibold"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-semibold text-gray-300 mb-1.5"
                        >
                          Full name *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder="Your name"
                          value={form.name}
                          onChange={handleChange}
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-semibold text-gray-300 mb-1.5"
                        >
                          Email address *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="you@company.com"
                          value={form.email}
                          onChange={handleChange}
                          className={inputClasses}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="company"
                          className="block text-sm font-semibold text-gray-300 mb-1.5"
                        >
                          Company
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          placeholder="Your company name"
                          value={form.company}
                          onChange={handleChange}
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-semibold text-gray-300 mb-1.5"
                        >
                          Phone number
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+44 ..."
                          value={form.phone}
                          onChange={handleChange}
                          className={inputClasses}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="service"
                        className="block text-sm font-semibold text-gray-300 mb-1.5"
                      >
                        Service interest
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className={`${inputClasses} appearance-none`}
                      >
                        <option value="" className="bg-primary">
                          Select a service...
                        </option>
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-primary">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold text-gray-300 mb-1.5"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Tell us about your project, timeline, and any specific requirements..."
                        value={form.message}
                        onChange={handleChange}
                        className={`${inputClasses} resize-none`}
                      />
                    </div>

                    {/* GDPR Consent */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="gdprConsent"
                        name="gdprConsent"
                        required
                        aria-required="true"
                        checked={form.gdprConsent}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, gdprConsent: e.target.checked }))
                        }
                        className="mt-1 h-4 w-4 shrink-0 rounded border-white/20 bg-white/5 text-accent accent-accent focus:ring-accent cursor-pointer"
                      />
                      <label htmlFor="gdprConsent" className="text-sm text-gray-400 leading-relaxed cursor-pointer">
                        I agree to Pixelette Certified processing my personal data to respond to this enquiry, in accordance with our{" "}
                        <a
                          href="/privacy-policy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:text-accent-light transition-colors underline"
                        >
                          Privacy Policy
                        </a>. <span className="text-accent">*</span>
                      </label>
                    </div>

                    {status === "error" && (
                      <div className="flex items-center gap-2 text-red-400 text-sm">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full sm:w-auto"
                      disabled={status === "loading" || !form.gdprConsent}
                    >
                      {status === "loading" ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Send Message &amp; Request Gap Analysis
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </Card>
            </motion.div>

            {/* Right: Info */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Contact details */}
              <Card variant="glass" hover={false}>
                <h3 className="text-lg font-bold text-white mb-5">
                  Contact information
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <a
                        href={`mailto:${SITE_CONFIG.email}`}
                        className="text-white hover:text-accent transition-colors font-medium"
                      >
                        {SITE_CONFIG.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm text-gray-400">Phone</p>
                      <a
                        href={`tel:${SITE_CONFIG.phoneTel}`}
                        className="text-white hover:text-accent transition-colors font-medium"
                      >
                        {SITE_CONFIG.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm text-gray-400">Office</p>
                      <p className="text-white font-medium">
                        {SITE_CONFIG.address}
                      </p>
                    </div>
                  </li>
                </ul>
              </Card>

              {/* Gap Analysis explainer */}
              <Card variant="glass" hover={false}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <FileSearch className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    What is a Gap Analysis?
                  </h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-3">
                  A gap analysis is a structured assessment of your current
                  policies, processes, and controls against the requirements of
                  your target standard (e.g. ISO 27001).
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  The output is a clear report showing where you meet
                  requirements, where you have gaps, and a prioritised roadmap
                  to close those gaps. It is the fastest way to understand your
                  path to certification.
                </p>
              </Card>

              {/* Trust signals */}
              <Card variant="glass" hover={false}>
                <h3 className="text-lg font-bold text-white mb-4">
                  Why work with us
                </h3>
                <ul className="space-y-3">
                  {[
                    {
                      icon: Shield,
                      text: "ISO 27001 certified practice with IRCA Lead Auditors",
                    },
                    {
                      icon: Clock,
                      text: "98% first-attempt pass rate across all standards",
                    },
                    {
                      icon: Send,
                      text: "Response within 1 working day, always",
                    },
                  ].map((item) => (
                    <li
                      key={item.text}
                      className="flex items-start gap-3 text-sm"
                    >
                      <item.icon className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <span className="text-gray-300">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
