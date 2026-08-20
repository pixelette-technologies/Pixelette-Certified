import assert from "node:assert/strict";
import test from "node:test";
import { validateCertifiedContact } from "../src/lib/certifiedContact.ts";

const now = Date.parse("2026-08-09T12:00:00Z");
const valid = () => ({
  entity: "CERTIFIED",
  eventId: "11111111-1111-4111-8111-111111111111",
  name: "Test Person",
  email: "test@example.invalid",
  company: "Synthetic Ltd",
  phone: "+44 7700 900000",
  country: "United Kingdom",
  service: "ISO 27001 Certification",
  message: "Authorised synthetic contact fixture.",
  gdprConsent: true,
  noticeVersion: "TEST-NOTICE-V1",
  formStartedAt: "2026-08-09T11:59:50Z",
  sourcePage: "/contact",
  _website: "",
  attribution: { campaignId: "TEST", utmSource: "synthetic", landingPage: "/contact" },
});

test("accepts a complete synthetic Certified submission", () => {
  assert.equal(validateCertifiedContact(valid(), "TEST-NOTICE-V1", now).ok, true);
});
for (const [name, mutate, code] of [
  ["unknown field", (v: Record<string, unknown>) => { v.extra = "x"; }, "UNSUPPORTED_FIELD"],
  ["attachment field", (v: Record<string, unknown>) => { v.attachment = "x"; }, "UNSUPPORTED_FIELD"],
  ["honeypot", (v: Record<string, unknown>) => { v._website = "bot"; }, "SPAM_REJECTED"],
  ["entity drift", (v: Record<string, unknown>) => { v.entity = "MARKETING"; }, "ENTITY_INVALID"],
  ["consent false", (v: Record<string, unknown>) => { v.gdprConsent = false; }, "CONSENT_OR_NOTICE_VERSION_INVALID"],
  ["notice drift", (v: Record<string, unknown>) => { v.noticeVersion = "OLD"; }, "CONSENT_OR_NOTICE_VERSION_INVALID"],
  ["bad event ID", (v: Record<string, unknown>) => { v.eventId = "not-a-uuid"; }, "CONTACT_FIELDS_INVALID"],
  ["bad service", (v: Record<string, unknown>) => { v.service = "Invented service"; }, "SERVICE_INVALID"],
  ["numeric optional company", (v: Record<string, unknown>) => { v.company = 123; }, "CONTACT_FIELDS_INVALID"],
  ["object optional phone", (v: Record<string, unknown>) => { v.phone = {}; }, "CONTACT_FIELDS_INVALID"],
  ["null optional country", (v: Record<string, unknown>) => { v.country = null; }, "CONTACT_FIELDS_INVALID"],
  ["too fast", (v: Record<string, unknown>) => { v.formStartedAt = "2026-08-09T11:59:59Z"; }, "FORM_TIMING_INVALID"],
  ["external source", (v: Record<string, unknown>) => { v.sourcePage = "https://example.invalid"; }, "SOURCE_PAGE_INVALID"],
  ["unknown attribution", (v: Record<string, unknown>) => { v.attribution = { unknown: "x" }; }, "ATTRIBUTION_INVALID"],
] as const) {
  test(`rejects ${name}`, () => {
    const fixture = valid() as unknown as Record<string, unknown>;
    mutate(fixture);
    const result = validateCertifiedContact(fixture, "TEST-NOTICE-V1", now);
    assert.equal(result.ok, false);
    if (!result.ok) assert.equal(result.code, code);
  });
}

test("fails closed without an approved notice version", () => {
  const result = validateCertifiedContact(valid(), "", now);
  assert.equal(result.ok, false);
  if (!result.ok) assert.equal(result.code, "FORM_GOVERNANCE_NOT_READY");
});
