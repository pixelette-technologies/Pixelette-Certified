// Server-side validation and output-encoding helpers for the contact form.
// The client mirrors these limits for UX, but the server is the source of truth:
// never trust the client to have validated anything.

import { SERVICE_OPTIONS, CONTACT_LIMITS } from "@/lib/contact/constants";

export interface ContactCleanData {
  name: string;
  email: string;
  company: string;
  phone: string;
  country: string;
  service: string;
  message: string;
}

export type ContactValidationResult =
  | { ok: true; data: ContactCleanData }
  | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Permissive international phone check: digits plus the usual separators.
const PHONE_RE = /^[+()\d][\d\s().-]{2,}$/;

const SERVICE_SET = new Set<string>(SERVICE_OPTIONS);

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * HTML-escape a string before interpolating it into an HTML email template.
 * Prevents user input from injecting markup into the notification/confirmation
 * emails.
 */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Validate and normalise a raw contact-form payload. Returns cleaned, trimmed
 * values on success or a single human-readable error on failure. Does NOT check
 * consent, the honeypot, or the Turnstile token — those are handled in the route.
 */
export function validateContact(body: unknown): ContactValidationResult {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request." };
  }
  const b = body as Record<string, unknown>;

  const name = asString(b.name);
  const email = asString(b.email);
  const message = asString(b.message);
  const company = asString(b.company);
  const phone = asString(b.phone);
  const country = asString(b.country);
  const service = asString(b.service);

  // Required fields
  if (name.length < CONTACT_LIMITS.name.min) {
    return { ok: false, error: "Please provide your full name." };
  }
  if (name.length > CONTACT_LIMITS.name.max) {
    return { ok: false, error: "Name is too long." };
  }
  if (!EMAIL_RE.test(email) || email.length > CONTACT_LIMITS.email.max) {
    return { ok: false, error: "Please provide a valid email address." };
  }
  if (message.length < CONTACT_LIMITS.message.min) {
    return { ok: false, error: "Please provide a message (at least 10 characters)." };
  }
  if (message.length > CONTACT_LIMITS.message.max) {
    return { ok: false, error: "Message is too long." };
  }

  // Optional fields — validated only when present
  if (company.length > CONTACT_LIMITS.company.max) {
    return { ok: false, error: "Company name is too long." };
  }
  if (phone) {
    if (phone.length > CONTACT_LIMITS.phone.max || !PHONE_RE.test(phone)) {
      return { ok: false, error: "Please provide a valid phone number." };
    }
  }
  if (country.length > CONTACT_LIMITS.country.max) {
    return { ok: false, error: "Country / region is too long." };
  }
  if (service && !SERVICE_SET.has(service)) {
    return { ok: false, error: "Please select a valid service option." };
  }

  return {
    ok: true,
    data: { name, email, company, phone, country, service, message },
  };
}
