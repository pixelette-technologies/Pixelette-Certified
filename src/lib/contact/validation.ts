// Server-side validation and output-encoding helpers for the contact form.
// The client mirrors these limits for UX, but the server is the source of truth:
// never trust the client to have validated anything.

import {
  ENQUIRY_REASONS,
  ORGANISATION_SIZES,
  JURISDICTIONS,
  CONTACT_LIMITS,
} from "@/lib/contact/constants";

export interface ContactCleanData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone: string;
  /** Enquiry reason LABEL, which is what is stored and emailed. */
  reasonLabel: string;
  /** Stable enquiry reason slug. */
  reasonValue: string;
  /** "What have you been asked to prove?" - goes to the legacy `message` column. */
  requirement: string;
  /** "YYYY-MM-DD", or "" when none was given. */
  deadline: string;
  noFixedDeadline: boolean;
  organisationSize: string;
  jurisdiction: string;
}

export type ContactValidationResult =
  | { ok: true; data: ContactCleanData }
  | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Permissive international phone check: digits plus the usual separators.
const PHONE_RE = /^[+()\d][\d\s().-]{2,}$/;
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// Membership sets, derived from the shared option lists so a label or slug
// edited in one place cannot fall out of step with the validator.
// Explicitly typed: ENQUIRY_REASONS is `as const`, so an inferred Map would key
// on the literal union and reject the arbitrary string arriving from the wire.
const REASON_BY_LABEL = new Map<string, string>(
  ENQUIRY_REASONS.map((r) => [r.label as string, r.value as string])
);
const SIZE_SET = new Set<string>(ORGANISATION_SIZES.map((o) => o.value));
const JURISDICTION_SET = new Set<string>(JURISDICTIONS.map((o) => o.value));

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Strict boolean coercion.
 *
 * `=== true` and never truthiness, because a multipart form submits STRINGS:
 * the string "false" is truthy, and treating it as consent is precisely the bug
 * that produces unlawful marketing. The only accepted truthy values are the
 * boolean true and the exact strings a checkbox sends.
 */
export function asBoolean(value: unknown): boolean {
  if (value === true) return true;
  return value === "true" || value === "on" || value === "1";
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
 * consent, the honeypot, the file, or the Turnstile token — those are handled
 * in the route.
 *
 * Checks run in the same order the fields are rendered, so the single error
 * returned always points at something the visitor can actually see.
 */
export function validateContact(body: unknown): ContactValidationResult {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request." };
  }
  const b = body as Record<string, unknown>;

  const firstName = asString(b.firstName);
  const lastName = asString(b.lastName);
  const email = asString(b.email);
  const company = asString(b.company);
  const phone = asString(b.phone);
  const reasonLabel = asString(b.service);
  const requirement = asString(b.message);
  const deadline = asString(b.deadline);
  const noFixedDeadline = asBoolean(b.noFixedDeadline);
  const organisationSize = asString(b.organisationSize);
  const jurisdiction = asString(b.jurisdiction);

  if (firstName.length < CONTACT_LIMITS.firstName.min) {
    return { ok: false, error: "Please provide your first name." };
  }
  if (firstName.length > CONTACT_LIMITS.firstName.max) {
    return { ok: false, error: "First name is too long." };
  }
  if (lastName.length < CONTACT_LIMITS.lastName.min) {
    return { ok: false, error: "Please provide your last name." };
  }
  if (lastName.length > CONTACT_LIMITS.lastName.max) {
    return { ok: false, error: "Last name is too long." };
  }

  /*
   * No free-provider blocking. "Use work email where possible" is a nudge, not
   * a rule: sole traders and fractional consultants legitimately use Gmail, and
   * hard-blocking them costs real enquiries and generates support load. The
   * nudge lives in the field label and placeholder instead.
   */
  if (!EMAIL_RE.test(email) || email.length > CONTACT_LIMITS.email.max) {
    return { ok: false, error: "Please provide a valid email address." };
  }

  // Company is now required: B2B qualification depends on it, and the brief
  // lists it as a standard field.
  if (!company) {
    return { ok: false, error: "Please provide your company or organisation name." };
  }
  if (company.length > CONTACT_LIMITS.company.max) {
    return { ok: false, error: "Company name is too long." };
  }

  const reasonValue = REASON_BY_LABEL.get(reasonLabel);
  if (!reasonValue) {
    return { ok: false, error: "Please tell us what brought you here." };
  }

  if (requirement.length < CONTACT_LIMITS.message.min) {
    return {
      ok: false,
      error: "Please tell us what you have been asked to prove (at least 10 characters).",
    };
  }
  if (requirement.length > CONTACT_LIMITS.message.max) {
    return { ok: false, error: "That is too long. Please summarise the requirement." };
  }

  /*
   * Deadline is a composite rule. Both set is contradictory; neither is fine,
   * because the brief marks the date optional and forcing a choice would be an
   * invented requirement.
   */
  if (deadline && noFixedDeadline) {
    return { ok: false, error: "Choose either a deadline or 'No fixed deadline'." };
  }
  if (deadline) {
    if (!ISO_DATE_RE.test(deadline)) {
      return { ok: false, error: "Please provide a valid deadline date." };
    }
    // Round-trip check. `new Date("2026-02-31")` silently rolls into March, so
    // a format check alone would accept a date that does not exist.
    const parsed = new Date(`${deadline}T00:00:00Z`);
    if (Number.isNaN(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== deadline) {
      return { ok: false, error: "Please provide a valid deadline date." };
    }
    const today = new Date();
    const todayUtc = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
    );
    if (parsed < todayUtc) {
      return { ok: false, error: "That deadline is in the past." };
    }
    const fiveYears = new Date(todayUtc);
    fiveYears.setUTCFullYear(fiveYears.getUTCFullYear() + 5);
    if (parsed > fiveYears) {
      return { ok: false, error: "Please provide a deadline within the next five years." };
    }
  }

  if (!SIZE_SET.has(organisationSize)) {
    return { ok: false, error: "Please select your organisation size." };
  }
  if (!JURISDICTION_SET.has(jurisdiction)) {
    return { ok: false, error: "Please select your jurisdiction or market." };
  }

  // Phone stays optional, with the existing permissive rule.
  if (phone) {
    if (phone.length > CONTACT_LIMITS.phone.max || !PHONE_RE.test(phone)) {
      return { ok: false, error: "Please provide a valid phone number." };
    }
  }

  return {
    ok: true,
    data: {
      firstName,
      lastName,
      email,
      company,
      phone,
      reasonLabel,
      reasonValue,
      requirement,
      deadline,
      noFixedDeadline,
      organisationSize,
      jurisdiction,
    },
  };
}
