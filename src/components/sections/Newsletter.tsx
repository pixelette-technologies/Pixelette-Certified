"use client";

import { useState } from "react";
import { Check } from "@/components/ui/icons";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="sec sec-sm band-alt">
      <div className="wrap">
        <div className="mx-auto max-w-[640px] text-center">
          <h2 className="h2 mx-auto max-w-[18ch]">Keep up with what changes</h2>
          <p className="body mx-auto mt-4">
            Occasional analysis of cyber security, compliance and AI governance requirements.
          </p>

          {status === "success" ? (
            <div className="card mt-9 inline-flex flex-col items-center">
              <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-brand text-brand">
                <Check size={16} />
              </span>
              <p className="h4">You are subscribed</p>
              <p className="small mt-1">Check your inbox for a confirmation email.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto mt-6 max-w-md">
              <div className="flex flex-col gap-3.5 sm:flex-row">
                <div className="flex-1">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                    disabled={status === "loading"}
                  />
                </div>
                <button type="submit" disabled={status === "loading" || !consent} className="btn shrink-0">
                  {status === "loading" ? "Subscribing..." : "Subscribe"}
                </button>
              </div>

              <label className="mt-3.5 flex cursor-pointer items-start gap-2.5 text-left">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 rounded-[3px] border-line-strong accent-[var(--color-brand)]"
                />
                <span className="small text-[13px]">
                  I agree to receive compliance insights from Pixelette Certified per our{" "}
                  <a href="/privacy-policy" className="link underline">Privacy Policy</a>.
                </span>
              </label>
            </form>
          )}

          <p className="src mt-5">
            You can unsubscribe at any time. Read our{" "}
            <a href="/privacy-policy" className="link underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
