// Server-side validation and output-encoding helpers for the contact form.
// The client mirrors these limits for UX, but the server is the source of truth:
// never trust the client to have validated anything.

import {
  ENQUIRY_REASONS,
  JURISDICTIONS,
  REQUIREMENT_TRIGGERS,
  CONTACT_LIMITS,
} from "@/lib/contact/constants";

export interface ContactCleanData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  /** Optional. "" when not given. */
  role: string;
  /** "What are you working towards?" slug and label. */
  reasonValue: string;
  reasonLabel: string;
  /** "Where does the requirement apply?" slug. */
  jurisdiction: string;
  /** Free text when jurisdiction is "other". "" otherwise. */
  jurisdictionDetail: string;
  /** "What has prompted the requirement?" slug. */
  trigger: string;
  /** Free text. Stored in the legacy `message` column. */
  message: string;
}

export type ContactValidationResult =
  | { ok: true; data: ContactCleanData }
  | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Lookups derived from the shared option lists, so a slug or label edited in
// one place cannot fall out of step with the validator. Explicitly typed: the
// lists are `as const`, and an inferred Map would reject arbitrary wire input.
const REASON_LABELS = new Map<string, string>(
  ENQUIRY_REASONS.map((r) => [r.value as string, r.label as string])
);
const JURISDICTION_SET = new Set<string>(JURISDICTIONS.map((o) => o.value));
const TRIGGER_SET = new Set<string>(REQUIREMENT_TRIGGERS.map((o) => o.value));

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
 * Validate and normalise a raw contact-form payload. Returns cleaned values or a
 * single human-readable error. Does NOT check consent, the honeypot, the file
 * or the Turnstile token; the route handles those.
 *
 * Checks run in the order the fields are rendered, so the error returned always
 * points at something the visitor can see.
 */
export function validateContact(body: unknown): ContactValidationResult {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request." };
  }
  const b = body as Record<string, unknown>;

  const reasonValue = asString(b.service);
  const jurisdiction = asString(b.jurisdiction);
  const jurisdictionDetail = asString(b.jurisdictionDetail);
  const trigger = asString(b.trigger);
  const firstName = asString(b.firstName);
  const lastName = asString(b.lastName);
  const company = asString(b.company);
  const email = asString(b.email);
  const role = asString(b.role);
  const message = asString(b.message);

  const reasonLabel = REASON_LABELS.get(reasonValue);
  if (!reasonLabel) {
    return { ok: false, error: "Please tell us what you are working towards." };
  }
  if (!JURISDICTION_SET.has(jurisdiction)) {
    return { ok: false, error: "Please tell us where the requirement applies." };
  }
  if (jurisdiction === "other") {
    if (!jurisdictionDetail) {
      return { ok: false, error: "Please tell us the country or jurisdiction." };
    }
    if (jurisdictionDetail.length > CONTACT_LIMITS.country.max) {
      return { ok: false, error: "Country or jurisdiction is too long." };
    }
  }
  if (!TRIGGER_SET.has(trigger)) {
    return { ok: false, error: "Please tell us what has prompted the requirement." };
  }

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

  if (!company) {
    return { ok: false, error: "Please provide your company or organisation name." };
  }
  if (company.length > CONTACT_LIMITS.company.max) {
    return { ok: false, error: "Company name is too long." };
  }

  /*
   * No free-provider blocking. "Work email" is a nudge, not a rule: sole traders
   * and fractional consultants legitimately use personal addresses.
   */
  if (!EMAIL_RE.test(email) || email.length > CONTACT_LIMITS.email.max) {
    return { ok: false, error: "Please provide a valid email address." };
  }

  if (role.length > CONTACT_LIMITS.role.max) {
    return { ok: false, error: "Role is too long." };
  }

  if (message.length < CONTACT_LIMITS.message.min) {
    return { ok: false, error: "Please tell us a little about the requirement (at least 10 characters)." };
  }
  if (message.length > CONTACT_LIMITS.message.max) {
    return { ok: false, error: "That is too long. Please summarise the requirement." };
  }

  return {
    ok: true,
    data: {
      firstName,
      lastName,
      email,
      company,
      role,
      reasonValue,
      reasonLabel,
      jurisdiction,
      jurisdictionDetail: jurisdiction === "other" ? jurisdictionDetail : "",
      trigger,
      message,
    },
  };
}
