"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  AlertCircle,
  Shield,
  Clock,
  FileSearch,
  Award,
  Globe,
} from "lucide-react";
import Eyebrow from "@/components/ui/Eyebrow";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Check } from "@/components/ui/icons";
import { SITE_CONFIG } from "@/lib/constants";
import { Turnstile } from "@marsidev/react-turnstile";
import { SERVICE_OPTIONS, CONSENT_NOTICE, CONTACT_LIMITS } from "@/lib/contact/constants";

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

interface FormState {
  name: string;
  email: string;
  company: string;
  phone: string;
  country: string;
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
    country: "",
    service: "",
    message: "",
    gdprConsent: false,
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  // Honeypot: kept out of FormState so it is never treated as a real field.
  const [honeypot, setHoneypot] = useState("");

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
        body: JSON.stringify({ ...form, website: honeypot, turnstileToken }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setForm({ name: "", email: "", company: "", phone: "", country: "", service: "", message: "", gdprConsent: false });
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="wash-left">
        <div className="wrap py-16 lg:py-20">
          <Breadcrumbs items={[{ name: "Contact" }]} />

          <div className="mt-8 max-w-[52ch]">
            <Eyebrow className="mb-5">Contact</Eyebrow>
            <h1 className="h1p">Book your free gap analysis, wherever you are in the world.</h1>
            <p className="lead mt-6">
              Whether you are based in London or Lagos, Dubai or Dublin, New York or Nairobi, we are here to help. Fill in the form and a senior compliance consultant will respond within 1 working day.
            </p>
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="sec">
        <div className="wrap">
          {/* The guide puts the detail column left and the form right. The form
              stays first in source order so keyboard and screen-reader users
              reach it first; the columns are re-ordered visually at lg. */}
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            {/* Left: Form */}
            <div className="lg:order-2 lg:col-span-3">
              <Card>
                <h2 className="h3">Book a Free ISO 27001 Gap Analysis</h2>

                <p className="small mt-4">
                  Tell us about your organisation, your target certification, and your timeline. We will review your enquiry and come back to you within 1 working day with a clear, honest assessment of your next steps. No sales pressure. No obligation.
                </p>

                {status === "success" ? (
                  <div className="flex flex-col items-center py-12 text-center">
                    <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand text-brand">
                      <Check size={20} />
                    </span>
                    <h3 className="h4">Message sent</h3>
                    <p className="small mt-2 max-w-sm">
                      Thank you for getting in touch. A member of our team will
                      respond within one working day.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-6 min-h-[44px] text-sm font-medium text-brand transition-colors hover:text-brand-hover"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    {/* Honeypot — hidden from humans; any submission that fills
                        it is silently dropped on the server. */}
                    <div
                      aria-hidden="true"
                      style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}
                    >
                      <label htmlFor="website">Leave this field empty</label>
                      <input
                        id="website"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="label">
                          Full name *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          maxLength={CONTACT_LIMITS.name.max}
                          placeholder="Your name"
                          value={form.name}
                          onChange={handleChange}
                          className="input"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="label">
                          Email address *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          maxLength={CONTACT_LIMITS.email.max}
                          placeholder="you@company.com"
                          value={form.email}
                          onChange={handleChange}
                          className="input"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="company" className="label">
                          Company
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          maxLength={CONTACT_LIMITS.company.max}
                          placeholder="Your company name"
                          value={form.company}
                          onChange={handleChange}
                          className="input"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="label">
                          Phone number
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          maxLength={CONTACT_LIMITS.phone.max}
                          placeholder="+44 ..."
                          value={form.phone}
                          onChange={handleChange}
                          className="input"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="country" className="label">
                        Country / Region
                      </label>
                      <input
                        id="country"
                        name="country"
                        type="text"
                        maxLength={CONTACT_LIMITS.country.max}
                        placeholder="e.g. United Kingdom, UAE, United States..."
                        value={form.country}
                        onChange={handleChange}
                        className="input"
                      />
                    </div>

                    <div>
                      <label htmlFor="service" className="label">
                        Service interest
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        className="select"
                      >
                        <option value="">Select a service...</option>
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="label">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        maxLength={CONTACT_LIMITS.message.max}
                        rows={5}
                        placeholder="Tell us about your project, timeline, and any specific requirements..."
                        value={form.message}
                        onChange={handleChange}
                        className="textarea"
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
                        className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded-[3px] border-line-strong accent-[var(--color-brand)]"
                      />
                      <label htmlFor="gdprConsent" className="small cursor-pointer">
                        I agree to Pixelette Certified processing my personal data to respond to this enquiry, in accordance with our{" "}
                        <a
                          href="/privacy-policy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link underline"
                        >
                          Privacy Policy
                        </a>. <span className="text-brand">*</span>
                      </label>
                    </div>

                    {/* Transparency notice: lawful basis, retention, and how to withdraw */}
                    <p className="src">{CONSENT_NOTICE}</p>

                    {/* Invisible Cloudflare Turnstile — same setup Alice uses.
                        Verified server-side when CONTACT_TURNSTILE_ENABLED=true. */}
                    {siteKey && (
                      <div style={{ visibility: "hidden", position: "absolute", pointerEvents: "none", width: 0, height: 0, overflow: "hidden" }}>
                        <Turnstile
                          siteKey={siteKey}
                          onSuccess={(token) => setTurnstileToken(token)}
                          onError={() => setTurnstileToken(null)}
                          onExpire={() => setTurnstileToken(null)}
                          options={{ theme: "light", size: "invisible" }}
                        />
                      </div>
                    )}

                    {status === "error" && (
                      <div className="field-error flex items-center gap-2" role="alert">
                        <AlertCircle className="h-4 w-4 shrink-0" strokeWidth={1.6} />
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
                          <Send className="h-4 w-4" strokeWidth={1.6} />
                          Send Message &amp; Request Gap Analysis
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </Card>
            </div>

            {/* Right: Info */}
            <div className="space-y-3.5 lg:order-1 lg:col-span-2">
              {/* Contact details */}
              <Card>
                <h3 className="h4">Contact information</h3>
                <ul className="mt-5 list-none space-y-4">
                  <li className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={1.6} />
                    <div>
                      <p className="small">Email</p>
                      <a
                        href={`mailto:${SITE_CONFIG.email}`}
                        className="font-medium text-ink transition-colors hover:text-brand"
                      >
                        {SITE_CONFIG.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={1.6} />
                    <div>
                      <p className="small">Phone</p>
                      <a
                        href={`tel:${SITE_CONFIG.phoneTel}`}
                        className="font-medium text-ink transition-colors hover:text-brand"
                      >
                        {SITE_CONFIG.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={1.6} />
                    <div>
                      <p className="small">Office</p>
                      <p className="font-medium text-ink">{SITE_CONFIG.address}</p>
                    </div>
                  </li>
                </ul>
              </Card>

              {/* Gap Analysis explainer */}
              <Card>
                <div className="flex items-center gap-3">
                  <FileSearch className="h-5 w-5 shrink-0 text-brand" strokeWidth={1.6} />
                  <h3 className="h4">What is a Gap Analysis?</h3>
                </div>
                <p className="small mt-4">
                  A gap analysis is a structured assessment of your current policies, processes, and controls against the requirements of your target certification standard, ISO 27001, ISO 42001, ISO 9001, ISO 22301, Cyber Essentials, GDPR, or any other standard you are pursuing. The output is a clear report showing where you meet requirements, where you have gaps, and a prioritised roadmap to close them. It is the fastest way to understand your path to certification, regardless of your industry, your size, or your location. And it is completely free.
                </p>
              </Card>

              {/* Trust signals */}
              <Card>
                <h3 className="h4">Why work with us</h3>
                <ul className="mt-4 list-none space-y-3">
                  {[
                    {
                      icon: Shield,
                      text: "ISO 27001 Lead Auditor certified team, CQI and IRCA registered",
                    },
                    {
                      icon: Clock,
                      text: "98% first-attempt audit pass rate across ISO 27001, ISO 42001, and Cyber Essentials",
                    },
                    {
                      icon: Globe,
                      text: "Global delivery, clients served across the UK, UAE, EU, Americas, and APAC",
                    },
                    {
                      icon: Award,
                      text: "9 active certifications across IRCA, PECB, IAPP, ISACA, and EC-Council, including our own ISO 27001 Certified Practice",
                    },
                    {
                      icon: Send,
                      text: "Response within 1 working day, guaranteed",
                    },
                  ].map((item) => (
                    <li key={item.text} className="flex items-start gap-3">
                      <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={1.6} />
                      <span className="small">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What happens after you contact us */}
      <section className="sec band-alt">
        <div className="wrap max-w-[900px]">
          <Card>
            <h2 className="h3">What happens after you contact us</h2>
            <p className="small mt-4">
              Within 1 working day, a senior compliance consultant will review your enquiry and respond directly. We will ask a few focused questions about your organisation, your target certification, ISO 27001, ISO 42001, ISO 9001, Cyber Essentials, GDPR, or another standard, and your timeline and budget. From there we will schedule your free 30-minute gap analysis call and give you a clear, honest assessment of your path to certification. Timeline, cost, and scope, confirmed upfront. No surprises.
            </p>
            <p className="small mt-4">
              Not sure which certification you need? View our{" "}
              <Link href="/services" className="link">
                full services
              </Link>{" "}
              or explore{" "}
              <Link href="/industries" className="link">
                by industry
              </Link>.
            </p>
          </Card>
        </div>
      </section>
    </>
  );
}
