import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateCertifiedContact, type CertifiedContactPayload } from "@/lib/certifiedContact";
import { DurableContactDeliveryControl, sendWithBoundedRetry } from "@/lib/contactDeliveryControl";

export const runtime = "nodejs";

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function configuration() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CERTIFIED_CONTACT_TO_EMAIL?.trim();
  const from = process.env.CERTIFIED_CONTACT_FROM_EMAIL?.trim();
  const noticeVersion = process.env.CERTIFIED_CONTACT_PRIVACY_NOTICE_VERSION?.trim();
  const storeDirectory = process.env.CERTIFIED_CONTACT_STORE_DIR?.trim();
  const rateLimitSecret = process.env.CERTIFIED_CONTACT_RATE_LIMIT_SECRET?.trim();
  const allowedOrigins = (process.env.CERTIFIED_CONTACT_ALLOWED_ORIGINS ?? "")
    .split(",").map((value) => value.trim()).filter(Boolean);
  return apiKey && to && from && noticeVersion && storeDirectory && rateLimitSecret && allowedOrigins.length
    ? { apiKey, to, from, noticeVersion, storeDirectory, rateLimitSecret, allowedOrigins }
    : null;
}

function messageHtml(value: CertifiedContactPayload): string {
  const fields = [
    ["Name", value.name], ["Email", value.email], ["Company", value.company || "Not supplied"],
    ["Phone", value.phone || "Not supplied"], ["Country", value.country || "Not supplied"],
    ["Service", value.service || "Not supplied"], ["Message", value.message],
  ];
  return `<h1>New Pixelette Certified enquiry</h1>${fields.map(([label, item]) =>
    `<p><strong>${label}:</strong> ${escapeHtml(item).replace(/\n/g, "<br>")}</p>`).join("")}`
    + `<p>Event: ${escapeHtml(value.eventId)} | Source: ${escapeHtml(value.sourcePage)} | Notice: ${escapeHtml(value.noticeVersion)}</p>`;
}

export async function POST(request: Request) {
  const config = configuration();
  if (!config) return NextResponse.json({ error: "Governed contact route is not configured" }, { status: 503 });
  const mediaType = (request.headers.get("content-type") ?? "").split(";", 1)[0].trim().toLowerCase();
  if (mediaType !== "application/json") {
    return NextResponse.json({ error: "Unsupported content type" }, { status: 415 });
  }
  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (!Number.isFinite(declaredLength) || declaredLength < 0 || declaredLength > 16_384) {
    return NextResponse.json({ error: "Request too large" }, { status: 413 });
  }
  const origin = request.headers.get("origin");
  if (!origin || !config.allowedOrigins.includes(origin)) {
    return NextResponse.json({ error: "Origin not allowed" }, { status: 403 });
  }
  let raw: unknown;
  try {
    const rawText = await request.text();
    if (new TextEncoder().encode(rawText).byteLength > 16_384) {
      return NextResponse.json({ error: "Request too large" }, { status: 413 });
    }
    raw = JSON.parse(rawText);
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
  const parsed = validateCertifiedContact(raw, config.noticeVersion);
  if (!parsed.ok) return NextResponse.json({ error: parsed.code }, { status: 400 });

  const sourceAddress = (request.headers.get("x-forwarded-for") ?? "").split(",", 1)[0].trim()
    || request.headers.get("x-real-ip")?.trim()
    || "";
  if (!sourceAddress) return NextResponse.json({ error: "Request source unavailable" }, { status: 400 });
  let control: DurableContactDeliveryControl;
  let decision;
  try {
    control = new DurableContactDeliveryControl({
      entity: "CERTIFIED",
      storeDirectory: config.storeDirectory,
      hmacSecret: config.rateLimitSecret,
    });
    decision = await control.begin(parsed.value.eventId, parsed.value, sourceAddress);
  } catch {
    return NextResponse.json({ error: "Durable submission control unavailable" }, { status: 503 });
  }
  if (decision.action === "RATE_LIMITED") {
    return NextResponse.json({ error: "Submission rate limit reached" }, {
      status: 429, headers: { "Retry-After": String(decision.retryAfterSeconds) },
    });
  }
  if (decision.action === "IN_PROGRESS") return NextResponse.json({ error: "Submission already in progress" }, { status: 409 });
  if (decision.action === "CONFLICT") return NextResponse.json({ error: "Submission identity conflict" }, { status: 409 });
  if (decision.action === "EXHAUSTED") return NextResponse.json({ error: "Submission retry limit exhausted" }, { status: 503 });
  if (decision.action === "REPLAY") {
    return NextResponse.json({ ok: true, submissionId: decision.submissionId, replayed: true });
  }

  const resend = new Resend(config.apiKey);
  const delivery = await sendWithBoundedRetry(
    () => resend.emails.send({
      from: config.from,
      to: config.to,
      replyTo: parsed.value.email,
      subject: `Certified enquiry: ${parsed.value.service || "General compliance"}`,
      html: messageHtml(parsed.value),
      text: `New Pixelette Certified enquiry\nEvent: ${parsed.value.eventId}\nName: ${parsed.value.name}\nEmail: ${parsed.value.email}\nCompany: ${parsed.value.company || "Not supplied"}\nPhone: ${parsed.value.phone || "Not supplied"}\nCountry: ${parsed.value.country || "Not supplied"}\nService: ${parsed.value.service || "Not supplied"}\nMessage: ${parsed.value.message}\nNotice: ${parsed.value.noticeVersion}`,
    }, { idempotencyKey: decision.idempotencyKey }),
    (result) => !result.error && Boolean(result.data?.id),
  );
  if (!delivery.ok) {
    await control.fail(decision.lease).catch(() => undefined);
    return NextResponse.json({ error: "Failed to send message" }, { status: 502 });
  }
  try {
    await control.complete(decision.lease, delivery.value.data!.id);
  } catch {
    return NextResponse.json({ error: "Delivery receipt could not be committed" }, { status: 503 });
  }
  return NextResponse.json({ ok: true, submissionId: parsed.value.eventId, replayed: false });
}
