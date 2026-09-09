"use client";

import { useEffect, useState } from "react";
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
import {
  ENQUIRY_REASONS,
  ORGANISATION_SIZES,
  JURISDICTIONS,
  CONSENT_NOTICE,
  MARKETING_STATEMENT,
  CONTACT_LIMITS,
  UPLOAD_LIMITS,
} from "@/lib/contact/constants";

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const uploadsEnabled = process.env.NEXT_PUBLIC_CONTACT_UPLOADS_ENABLED !== "false";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  service: string;
  message: string;
  deadline: string;
  noFixedDeadline: boolean;
  organisationSize: string;
  jurisdiction: string;
  /** Required. Gates submission. */
  privacyConsent: boolean;
  /**
   * Optional, and deliberately independent of privacyConsent: unticked by
   * default, never required, and it must never appear in the submit-disabled
   * condition. Bundling the two is what "kept separate" exists to prevent.
   */
  marketingOptIn: boolean;
}

export default function ContactContent() {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
    deadline: "",
    noFixedDeadline: false,
    organisationSize: "",
    jurisdiction: "",
    privacyConsent: false,
    marketingOptIn: false,
  });
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  // Honeypot: kept out of FormState so it is never treated as a real field.
  const [honeypot, setHoneypot] = useState("");

  /**
   * Preselect "What brought you here?" from ?reason=<slug>.
   *
   * Read from window.location rather than useSearchParams: the latter forces a
   * Suspense boundary in the parent and risks a hydration mismatch, and this
   * value has no SSR or SEO relevance at all. Every entry point is a fresh
   * navigation, so not reacting to a client-side param change costs nothing.
   *
   * Unknown values are ignored silently and the placeholder stays selected. An
   * unrecognised value is never rendered as an <option>: doing so would put
   * arbitrary query-string content into the DOM as a label, and it would fail
   * server validation afterwards anyway, confusing the visitor twice.
   */
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("reason");
    const match = ENQUIRY_REASONS.find((r) => r.value === slug);
    if (!match) return;
    setForm((prev) => (prev.service ? prev : { ...prev, service: match.label }));
  }, []);

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
      /*
       * Always multipart, even with no file selected.
       *
       * One live server code path is meaningfully less bug-prone than two.
       * The route's JSON branch exists only as a compat shim for visitors
       * who had this page open across the deploy, not as a parallel
       * implementation to keep in step.
       *
       * Note there is no Content-Type header: the browser must set it
       * itself so it can add the multipart boundary.
       */
      const payload = new FormData();
      for (const [key, value] of Object.entries(form)) {
        payload.append(key, String(value));
      }
      payload.append("website", honeypot);
      if (turnstileToken) payload.append("turnstileToken", turnstileToken);
      if (file) payload.append("file", file);

      const res = await fetch("/api/contact", { method: "POST", body: payload });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        phone: "",
        service: "",
        message: "",
        deadline: "",
        noFixedDeadline: false,
        organisationSize: "",
        jurisdiction: "",
        privacyConsent: false,
        marketingOptIn: false,
      });
      setFile(null);
      setFileError("");
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
            <h1 className="h1p">Tell us what you have been asked to prove.</h1>
            <p className="lead mt-6">
              A customer, tender, investor or regulator has already given you the starting point. Send us the requirement or book a 30-minute compliance diagnostic, and we will help you identify the right route, the likely work involved and the specialist capability required.
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
            {/* id is the deep-link target for contactHref(). Without it a
                visitor arriving from a homepage trigger card lands on the hero
                and has to scroll to find the field we preselected for them. */}
            <div className="lg:order-2 lg:col-span-3" id="enquiry-form">
              <Card>
                <h2 className="h3">Tell us what you have been asked to prove</h2>

                <p className="small mt-4">
                  Already have a questionnaire, tender clause, customer email or compliance requirement? Tell us about it below. We will come back to you with an honest assessment of the route forward. No sales pressure, no obligation, and no completion date promised before we have seen the scope.
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
                        <label htmlFor="firstName" className="label">
                          First name *
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          maxLength={CONTACT_LIMITS.firstName.max}
                          placeholder="First name"
                          value={form.firstName}
                          onChange={handleChange}
                          className="input"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="label">
                          Last name *
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          required
                          maxLength={CONTACT_LIMITS.lastName.max}
                          placeholder="Last name"
                          value={form.lastName}
                          onChange={handleChange}
                          className="input"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="email" className="label">
                          Work email *
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
                      <div>
                        <label htmlFor="company" className="label">
                          Company *
                        </label>
                        <input
                          id="company"
                          name="company"
                          type="text"
                          required
                          maxLength={CONTACT_LIMITS.company.max}
                          placeholder="Company or organisation name"
                          value={form.company}
                          onChange={handleChange}
                          className="input"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="organisationSize" className="label">
                          Organisation size *
                        </label>
                        <select
                          id="organisationSize"
                          name="organisationSize"
                          required
                          value={form.organisationSize}
                          onChange={handleChange}
                          className="select"
                        >
                          <option value="">Select...</option>
                          {ORGANISATION_SIZES.map((size) => (
                            <option key={size.value} value={size.value}>
                              {size.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="jurisdiction" className="label">
                          Jurisdiction / market *
                        </label>
                        <select
                          id="jurisdiction"
                          name="jurisdiction"
                          required
                          value={form.jurisdiction}
                          onChange={handleChange}
                          className="select"
                        >
                          <option value="">Select...</option>
                          {JURISDICTIONS.map((j) => (
                            <option key={j.value} value={j.value}>
                              {j.label}
                            </option>
                          ))}
                        </select>
                      </div>
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

                    <div>
                      <label htmlFor="service" className="label">
                        What brought you here?
                      </label>
                      <select
                        id="service"
                        name="service"
                        required
                        value={form.service}
                        onChange={handleChange}
                        className="select"
                      >
                        <option value="">Select what applies...</option>
                        {/* The option VALUE is the label, not the slug: it is
                            what gets stored and emailed, so the record stays
                            readable without a lookup. The slug is only a URL
                            contract for deep links. */}
                        {ENQUIRY_REASONS.map((reason) => (
                          <option key={reason.value} value={reason.label}>
                            {reason.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="label">
                        What have you been asked to prove? *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        maxLength={CONTACT_LIMITS.message.max}
                        rows={5}
                        placeholder="Paste the tender clause, questionnaire item or customer request, or describe it in your own words."
                        value={form.message}
                        onChange={handleChange}
                        className="textarea"
                      />
                    </div>

                    {/* Deadline. Optional by design: the brief marks the date
                        optional, so forcing a choice would invent a requirement
                        the visitor may genuinely not have. The two controls are
                        mutually exclusive, enforced here and on the server. */}
                    <div>
                      <label htmlFor="deadline" className="label">
                        Deadline
                      </label>
                      <input
                        id="deadline"
                        name="deadline"
                        type="date"
                        disabled={form.noFixedDeadline}
                        value={form.deadline}
                        onChange={handleChange}
                        className="input disabled:opacity-50"
                      />
                      <div className="mt-3 flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="noFixedDeadline"
                          name="noFixedDeadline"
                          checked={form.noFixedDeadline}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              noFixedDeadline: e.target.checked,
                              // Clearing the date keeps the two from ever being
                              // submitted together.
                              deadline: e.target.checked ? "" : prev.deadline,
                            }))
                          }
                          className="h-4 w-4 shrink-0 cursor-pointer rounded-[3px] border-line-strong accent-[var(--color-brand)]"
                        />
                        <label htmlFor="noFixedDeadline" className="small cursor-pointer">
                          No fixed deadline
                        </label>
                      </div>
                    </div>

                    {/* Optional upload. The highest-intent visitors already have
                        the document that triggered the search, and asking for it
                        beats asking them to summarise it into a textarea. */}
                    {uploadsEnabled && (
                      <div>
                        <label htmlFor="file" className="label">
                          Attach the requirement
                        </label>
                        <input
                          id="file"
                          name="file"
                          type="file"
                          accept={UPLOAD_LIMITS.allowedExtensions.join(",")}
                          onChange={(e) => {
                            const picked = e.target.files?.[0] ?? null;
                            setFileError("");
                            if (picked && picked.size > UPLOAD_LIMITS.maxBytes) {
                              // Client-side check for fast feedback only. The
                              // server re-checks size, extension and magic bytes
                              // and is the only one that counts.
                              setFileError("That file is larger than 4 MB. Please attach a smaller document.");
                              setFile(null);
                              e.target.value = "";
                              return;
                            }
                            setFile(picked);
                          }}
                          className="input file:mr-3 file:cursor-pointer file:rounded-[4px] file:border-0 file:bg-band file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-brand"
                        />
                        <p className="src mt-2">
                          Optional. Questionnaire, tender clause, customer email or requirement document. PDF, Word, Excel, CSV, text or image, up to 4 MB.
                        </p>
                        {fileError && (
                          <p className="field-error mt-2" role="alert">
                            {fileError}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Privacy consent. Required, and the only thing that gates
                        submission. */}
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="privacyConsent"
                        name="privacyConsent"
                        required
                        aria-required="true"
                        checked={form.privacyConsent}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, privacyConsent: e.target.checked }))
                        }
                        className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded-[3px] border-line-strong accent-[var(--color-brand)]"
                      />
                      <label htmlFor="privacyConsent" className="small cursor-pointer">
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

                    {/* Transparency notice sits with the consent it explains. */}
                    <p className="src">{CONSENT_NOTICE}</p>

                    {/* Marketing opt-in, entirely separate from the above.
                        Unticked by default, no `required`, and deliberately
                        absent from the submit-disabled condition. Pre-ticking or
                        bundling this with the privacy consent is exactly what
                        the "kept separate" requirement exists to stop. */}
                    <div className="flex items-start gap-3 border-t border-line pt-5">
                      <input
                        type="checkbox"
                        id="marketingOptIn"
                        name="marketingOptIn"
                        checked={form.marketingOptIn}
                        onChange={(e) =>
                          setForm((prev) => ({ ...prev, marketingOptIn: e.target.checked }))
                        }
                        className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded-[3px] border-line-strong accent-[var(--color-brand)]"
                      />
                      <label htmlFor="marketingOptIn" className="small cursor-pointer">
                        {MARKETING_STATEMENT}
                      </label>
                    </div>

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
                      disabled={status === "loading" || !form.privacyConsent}
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
                  <h3 className="h4">What is a gap analysis?</h3>
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
                    /*
                     * Every item here was previously a claim: a corporate
                     * credential aggregate, a pass rate, an implied client
                     * roster, and a guaranteed response time. They are replaced
                     * with commitments about how we work, which are things we
                     * control and can be held to, rather than outcomes we cannot
                     * evidence.
                     */
                    {
                      icon: Shield,
                      text: "Engagements are led by a practitioner trained to ISO/IEC 27001 lead auditor level",
                    },
                    {
                      icon: Clock,
                      text: "We run your internal audit before Stage 2, so findings surface with us and not with your certification body",
                    },
                    {
                      icon: Globe,
                      text: "Delivery across the UK, UAE, EU, Americas and APAC",
                    },
                    {
                      icon: Award,
                      text: "Our approved delivery network includes a PECB Certified ISO/IEC 42001 Lead Auditor, and practitioners holding CISA, AIGP, CIPM, CIPP/US, CCSK and CCZT. These are individual credentials, not corporate accreditations",
                    },
                    {
                      icon: Send,
                      text: "We aim to respond within one working day",
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
        <div className="wrap max-w-[900px]" data-reveal="">
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
              <Link href="/who-we-help" className="link">
                by industry
              </Link>.
            </p>
          </Card>
        </div>
      </section>
    </>
  );
}
