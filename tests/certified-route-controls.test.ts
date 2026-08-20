import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const route = readFileSync("src/app/api/contact/route.ts", "utf8");
const form = readFileSync("src/app/contact/ContactContent.tsx", "utf8");
const config = readFileSync("next.config.ts", "utf8");

test("route uses named configuration with no delivery fallback", () => {
  for (const name of ["CERTIFIED_CONTACT_TO_EMAIL", "CERTIFIED_CONTACT_FROM_EMAIL", "CERTIFIED_CONTACT_ALLOWED_ORIGINS", "CERTIFIED_CONTACT_PRIVACY_NOTICE_VERSION"]) {
    assert.match(route, new RegExp(name));
  }
  assert.doesNotMatch(route, /partnerships@|info@pixelettecertified|noreply@pixelettecertified/i);
});

test("validation precedes the single provider call and no PII is logged", () => {
  assert.ok(route.indexOf("validateCertifiedContact(raw") < route.indexOf("new Resend(config.apiKey)"));
  assert.equal((route.match(/emails\.send\(/g) ?? []).length, 1);
  assert.doesNotMatch(route, /console\.(log|info|warn|error)/);
});

test("route binds durable idempotency, receipt storage, rate limiting and bounded provider retry", () => {
  assert.match(route, /CERTIFIED_CONTACT_STORE_DIR/);
  assert.match(route, /CERTIFIED_CONTACT_RATE_LIMIT_SECRET/);
  assert.match(route, /control\.begin\(parsed\.value\.eventId/);
  assert.match(route, /idempotencyKey: decision\.idempotencyKey/);
  assert.match(route, /sendWithBoundedRetry/);
  assert.match(route, /control\.complete\(decision\.lease/);
  assert.match(route, /control\.fail\(decision\.lease/);
  assert.match(form, /eventId \?\? crypto\.randomUUID\(\)/);
});

test("route enforces origin, content type and actual body limit", () => {
  assert.match(route, /Unsupported content type/);
  assert.match(route, /mediaType !== "application\/json"/);
  assert.match(route, /allowedOrigins\.includes\(origin\)/);
  assert.match(route, /TextEncoder\(\)\.encode\(rawText\)\.byteLength > 16_384/);
});

test("form and security headers fail closed", () => {
  assert.match(form, /if \(!governanceReady\)|!governanceReady \?/);
  assert.match(form, /type="checkbox"/);
  assert.match(form, /name="_website"/);
  assert.match(config, /Content-Security-Policy/);
  assert.match(config, /frame-ancestors 'self'/);
});
