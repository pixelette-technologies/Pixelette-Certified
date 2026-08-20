export const CERTIFIED_SERVICE_OPTIONS = [
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
] as const;

export interface CertifiedAttribution {
  campaignId?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  landingPage?: string;
  referrer?: string;
}

export interface CertifiedContactPayload {
  entity: "CERTIFIED";
  eventId: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  country: string;
  service: string;
  message: string;
  gdprConsent: true;
  noticeVersion: string;
  formStartedAt: string;
  sourcePage: string;
  attribution: CertifiedAttribution;
}

export type CertifiedContactValidation =
  | { ok: true; value: CertifiedContactPayload }
  | { ok: false; code: string };

const TOP_LEVEL_FIELDS = new Set([
  "entity", "eventId", "name", "email", "company", "phone", "country", "service",
  "message", "gdprConsent", "noticeVersion", "formStartedAt", "sourcePage", "_website",
  "attribution",
]);
const ATTRIBUTION_FIELDS = new Set([
  "campaignId", "utmSource", "utmMedium", "utmCampaign", "utmContent", "utmTerm",
  "landingPage", "referrer",
]);
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^\+?[0-9 ()-]{7,40}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function boundedText(value: unknown, minimum: number, maximum: number): string | null {
  if (typeof value !== "string") return null;
  const result = value.trim();
  return result.length >= minimum && result.length <= maximum ? result : null;
}

export function validateCertifiedContact(
  input: unknown,
  expectedNoticeVersion: string,
  nowMs = Date.now(),
): CertifiedContactValidation {
  if (!expectedNoticeVersion || !isRecord(input)) return { ok: false, code: "FORM_GOVERNANCE_NOT_READY" };
  if (Object.keys(input).some((key) => !TOP_LEVEL_FIELDS.has(key))) return { ok: false, code: "UNSUPPORTED_FIELD" };
  if (input._website !== "" && input._website !== undefined) return { ok: false, code: "SPAM_REJECTED" };
  if (input.entity !== "CERTIFIED") return { ok: false, code: "ENTITY_INVALID" };

  for (const field of ["company", "phone", "country", "service"] as const) {
    if (input[field] !== undefined && typeof input[field] !== "string") {
      return { ok: false, code: "CONTACT_FIELDS_INVALID" };
    }
  }

  const eventId = boundedText(input.eventId, 36, 36);
  const name = boundedText(input.name, 2, 160);
  const email = boundedText(input.email, 3, 254)?.toLowerCase() ?? null;
  const company = boundedText(input.company ?? "", 0, 200);
  const phone = boundedText(input.phone ?? "", 0, 40);
  const country = boundedText(input.country ?? "", 0, 100);
  const service = boundedText(input.service ?? "", 0, 100);
  const message = boundedText(input.message, 10, 2000);
  const noticeVersion = boundedText(input.noticeVersion, 1, 100);
  const formStartedAt = boundedText(input.formStartedAt, 20, 40);
  const sourcePage = boundedText(input.sourcePage, 1, 200);
  if (!eventId || !UUID.test(eventId) || !name || !email || !EMAIL.test(email) || !message) {
    return { ok: false, code: "CONTACT_FIELDS_INVALID" };
  }
  if (phone && !PHONE.test(phone)) return { ok: false, code: "PHONE_INVALID" };
  if (service && !CERTIFIED_SERVICE_OPTIONS.includes(service as (typeof CERTIFIED_SERVICE_OPTIONS)[number])) {
    return { ok: false, code: "SERVICE_INVALID" };
  }
  if (input.gdprConsent !== true || noticeVersion !== expectedNoticeVersion) {
    return { ok: false, code: "CONSENT_OR_NOTICE_VERSION_INVALID" };
  }
  if (!sourcePage?.startsWith("/") || sourcePage.startsWith("//")) return { ok: false, code: "SOURCE_PAGE_INVALID" };
  const elapsed = nowMs - Date.parse(formStartedAt ?? "");
  if (!Number.isFinite(elapsed) || elapsed < 2000 || elapsed > 86_400_000) return { ok: false, code: "FORM_TIMING_INVALID" };

  const rawAttribution = input.attribution ?? {};
  if (!isRecord(rawAttribution) || Object.keys(rawAttribution).some((key) => !ATTRIBUTION_FIELDS.has(key))) {
    return { ok: false, code: "ATTRIBUTION_INVALID" };
  }
  const attribution: CertifiedAttribution = {};
  for (const key of ATTRIBUTION_FIELDS) {
    const raw = rawAttribution[key];
    if (raw === undefined || raw === "") continue;
    const value = boundedText(raw, 1, 200);
    if (!value) return { ok: false, code: "ATTRIBUTION_INVALID" };
    attribution[key as keyof CertifiedAttribution] = value;
  }
  return {
    ok: true,
    value: {
      entity: "CERTIFIED", eventId, name, email, company: company ?? "", phone: phone ?? "",
      country: country ?? "", service: service ?? "", message, gdprConsent: true, noticeVersion,
      formStartedAt: formStartedAt!, sourcePage, attribution,
    },
  };
}
