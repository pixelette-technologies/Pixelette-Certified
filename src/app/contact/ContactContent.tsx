"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mail, MapPin, Send, AlertCircle } from "lucide-react";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Check } from "@/components/ui/icons";
import { SITE_CONFIG, PRIMARY_CTA, ENGAGEMENT_TERMS } from "@/lib/constants";
import { Turnstile } from "@marsidev/react-turnstile";
import {
  ENQUIRY_REASONS,
  JURISDICTIONS,
  REQUIREMENT_TRIGGERS,
  CONSENT_NOTICE,
  MARKETING_STATEMENT,
  CONTACT_LIMITS,
  UPLOAD_LIMITS,
} from "@/lib/contact/constants";

const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const uploadsEnabled = process.env.NEXT_PUBLIC_CONTACT_UPLOADS_ENABLED !== "false";

interface FormState {
  service: string;
  jurisdiction: string;
  trigger: string;
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  role: string;
  message: string;
  /** Required. Gates submission. */
  privacyConsent: boolean;
  /**
   * Optional, and deliberately independent of privacyConsent: unticked by
   * default, never required, and never part of the submit-disabled condition.
   */
  marketingOptIn: boolean;
}

const EMPTY_FORM: FormState = {
  service: "",
  jurisdiction: "",
  trigger: "",
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  role: "",
  message: "",
  privacyConsent: false,
  marketingOptIn: false,
};

/*
 * The contact page (§33). The three structured questions come first because
 * they are what the team needs to route an enquiry to the right practitioner.
 * There is no price, no "free" offer, no timescale and no conversion claim.
 */
export default function ContactContent() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  // Honeypot: kept out of FormState so it is never treated as a real field.
  const [honeypot, setHoneypot] = useState("");

  /**
   * Preselect "What are you working towards?" from ?reason=<slug>.
   *
   * Read from window.location rather than useSearchParams, which would force a
   * Suspense boundary for a value with no SSR relevance. Unknown values are
   * ignored, so arbitrary query-string content is never rendered.
   */
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("reason");
    const match = ENQUIRY_REASONS.find((r) => r.value === slug);
    if (!match) return;
    setForm((prev) => (prev.service ? prev : { ...prev, service: match.value }));
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
      // Always multipart, even with no file, so the server has one live path.
      // No Content-Type header: the browser must add the multipart boundary.
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
      setForm(EMPTY_FORM);
      setFile(null);
      setFileError("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <>
      <section className="wash-left">
        <div className="wrap py-16 lg:py-20">
          <Breadcrumbs items={[{ name: "Contact" }]} />
          <div className="mt-8 max-w-[56ch]">
            <h1 className="h1p">Tell us what you need to achieve</h1>
            <p className="lead mt-6">
              Whether you are responding to a customer requirement, preparing for certification,
              strengthening governance or meeting a regulatory obligation, tell us where you need to
              get to.
            </p>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          {/* The form stays first in source order so keyboard and screen-reader
              users reach it first; the columns are re-ordered visually at lg. */}
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:order-2 lg:col-span-3" id="enquiry-form">
              <Card>
                {status === "success" ? (
                  <div className="flex flex-col items-center py-12 text-center" role="status">
                    <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-brand text-brand">
                      <Check size={20} />
                    </span>
                    <h2 className="h4">Thank you</h2>
                    <p className="small mt-2 max-w-sm">
                      We have received your enquiry. A member of our team will review it and aim to
                      respond within one working day.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-6 min-h-[44px] text-sm font-medium text-brand transition-colors hover:text-brand-hover"
                    >
                      Send another enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h2 className="h3">Your requirement</h2>

                    {/* Honeypot: hidden from humans; any submission that fills
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

                    <div>
                      <label htmlFor="service" className="label">
                        What are you working towards? *
                      </label>
                      <select id="service" name="service" required value={form.service} onChange={handleChange} className="select">
                        <option value="">Select one</option>
                        {ENQUIRY_REASONS.map((r) => (
                          <option key={r.value} value={r.value}>
                            {r.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="jurisdiction" className="label">
                          Where does the requirement apply? *
                        </label>
                        <select id="jurisdiction" name="jurisdiction" required value={form.jurisdiction} onChange={handleChange} className="select">
                          <option value="">Select one</option>
                          {JURISDICTIONS.map((j) => (
                            <option key={j.value} value={j.value}>
                              {j.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="trigger" className="label">
                          What has prompted the requirement? *
                        </label>
                        <select id="trigger" name="trigger" required value={form.trigger} onChange={handleChange} className="select">
                          <option value="">Select one</option>
                          {REQUIREMENT_TRIGGERS.map((t) => (
                            <option key={t.value} value={t.value}>
                              {t.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid gap-5 border-t border-line pt-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="firstName" className="label">
                          First name *
                        </label>
                        <input id="firstName" name="firstName" type="text" required autoComplete="given-name" maxLength={CONTACT_LIMITS.firstName.max} value={form.firstName} onChange={handleChange} className="input" />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="label">
                          Last name *
                        </label>
                        <input id="lastName" name="lastName" type="text" required autoComplete="family-name" maxLength={CONTACT_LIMITS.lastName.max} value={form.lastName} onChange={handleChange} className="input" />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="company" className="label">
                          Company *
                        </label>
                        <input id="company" name="company" type="text" required autoComplete="organization" maxLength={CONTACT_LIMITS.company.max} value={form.company} onChange={handleChange} className="input" />
                      </div>
                      <div>
                        <label htmlFor="role" className="label">
                          Role
                        </label>
                        <input id="role" name="role" type="text" autoComplete="organization-title" maxLength={CONTACT_LIMITS.role.max} value={form.role} onChange={handleChange} className="input" />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="label">
                        Work email *
                      </label>
                      <input id="email" name="email" type="email" required autoComplete="email" maxLength={CONTACT_LIMITS.email.max} placeholder="you@company.com" value={form.email} onChange={handleChange} className="input" />
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
                        placeholder="Tell us about the requirement, who has set it and any timing you are working to."
                        value={form.message}
                        onChange={handleChange}
                        className="textarea"
                      />
                    </div>

                    {uploadsEnabled && (
                      <div>
                        <label htmlFor="file" className="label">
                          Attach a document
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
                              // Fast feedback only. The server re-checks size,
                              // extension and magic bytes and is the one that counts.
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
                          Optional. For example a questionnaire, tender clause or requirement document. PDF, Word, Excel, CSV, text or image, up to 4 MB.
                        </p>
                        {fileError && (
                          <p className="field-error mt-2" role="alert">
                            {fileError}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="privacyConsent"
                        name="privacyConsent"
                        required
                        aria-required="true"
                        checked={form.privacyConsent}
                        onChange={(e) => setForm((prev) => ({ ...prev, privacyConsent: e.target.checked }))}
                        className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded-[3px] border-line-strong accent-[var(--color-brand)]"
                      />
                      <label htmlFor="privacyConsent" className="small cursor-pointer">
                        I agree to Pixelette Certified processing my personal data to respond to this enquiry, in accordance with our{" "}
                        <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="link underline">
                          Privacy Policy
                        </a>
                        . <span className="text-brand">*</span>
                      </label>
                    </div>

                    <p className="src">{CONSENT_NOTICE}</p>

                    {/* Marketing opt-in, entirely separate from the consent above. */}
                    <div className="flex items-start gap-3 border-t border-line pt-5">
                      <input
                        type="checkbox"
                        id="marketingOptIn"
                        name="marketingOptIn"
                        checked={form.marketingOptIn}
                        onChange={(e) => setForm((prev) => ({ ...prev, marketingOptIn: e.target.checked }))}
                        className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded-[3px] border-line-strong accent-[var(--color-brand)]"
                      />
                      <label htmlFor="marketingOptIn" className="small cursor-pointer">
                        {MARKETING_STATEMENT}
                      </label>
                    </div>

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
                        "Sending"
                      ) : (
                        <>
                          <Send className="h-4 w-4" strokeWidth={1.6} />
                          {PRIMARY_CTA.label}
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </Card>
            </div>

            <div className="space-y-3.5 lg:order-1 lg:col-span-2">
              <Card>
                <h2 className="h4">What happens next</h2>
                <p className="small mt-4">
                  A member of our team reviews your enquiry and arranges a conversation with an
                  appropriate specialist. We aim to respond within one working day.
                </p>
                <p className="small mt-3">{ENGAGEMENT_TERMS}</p>
                <p className="small mt-3">
                  Where the requirement leads to independent certification, attestation or
                  assessment, we explain which independent party is involved and what their role
                  will be.
                </p>
              </Card>

              <Card>
                <h2 className="h4">Contact details</h2>
                <ul className="mt-5 list-none space-y-4">
                  <li className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={1.6} aria-hidden="true" />
                    <div>
                      <p className="small">Email</p>
                      <a href={`mailto:${SITE_CONFIG.email}`} className="font-medium text-ink transition-colors hover:text-brand">
                        {SITE_CONFIG.email}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={1.6} aria-hidden="true" />
                    <div>
                      <p className="small">Office</p>
                      <p className="font-medium text-ink">{SITE_CONFIG.address}</p>
                    </div>
                  </li>
                </ul>
              </Card>

              <p className="small px-1">
                Not sure where to start? See our{" "}
                <Link href="/services" className="link">
                  services
                </Link>{" "}
                or{" "}
                <Link href="/markets" className="link">
                  markets
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
