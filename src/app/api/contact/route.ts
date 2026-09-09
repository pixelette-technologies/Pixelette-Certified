import { createHash, randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateContact, escapeHtml, asBoolean } from "@/lib/contact/validation";
import {
  CONSENT_STATEMENT,
  MARKETING_STATEMENT,
  PRIVACY_POLICY_VERSION,
  UPLOAD_LIMITS,
  ORGANISATION_SIZES,
  JURISDICTIONS,
} from "@/lib/contact/constants";
import {
  sanitiseFilename,
  sniffFileType,
  buildObjectKey,
  extensionOf,
  formatBytes,
} from "@/lib/contact/fileType";
import { checkContactRateLimit } from "@/lib/contact/rateLimit";
import { extractClientIp } from "@/lib/alice/rateLimit";
import { verifyTurnstileToken } from "@/lib/alice/turnstile";
import { getSupabaseServer } from "@/lib/alice/supabase";
import { EMAIL_COLORS } from "@/lib/constants";

/*
 * Node runtime, stated explicitly rather than inherited.
 *
 * The Supabase Storage upload, the SHA-256 hash and the Buffer-based magic-byte
 * sniffing are all natural on Node, and Edge's memory ceiling is unfriendly to
 * buffering a 4 MiB file. maxDuration is raised because the route now does an
 * upload plus two Resend calls, which is not comfortable on a cold start at the
 * default.
 */
export const runtime = "nodejs";
export const maxDuration = 30;

const resend = new Resend(process.env.RESEND_API_KEY);

const RATE_LIMIT_ENABLED = process.env.CONTACT_RATE_LIMIT_ENABLED !== "false";
const TURNSTILE_ENABLED = process.env.CONTACT_TURNSTILE_ENABLED === "true";

const ATTACHMENTS_BUCKET = process.env.CONTACT_ATTACHMENTS_BUCKET || "contact-attachments";
const ATTACHMENT_URL_TTL_SECONDS = Number(process.env.CONTACT_ATTACHMENT_URL_TTL_SECONDS || 604800);

/**
 * Rollout switch, NOT a security control.
 *
 * Every security check below (size, count, extension, magic bytes, and the
 * ordering that puts all of them behind Turnstile) runs unconditionally.
 * Flipping this flag off stops the form offering an upload; it can never weaken
 * how an upload is handled.
 */
const UPLOADS_ENABLED = process.env.NEXT_PUBLIC_CONTACT_UPLOADS_ENABLED !== "false";

/** Leaves headroom over UPLOAD_LIMITS.maxBytes for the text fields and boundaries. */
const MAX_REQUEST_BYTES = UPLOAD_LIMITS.maxBytes + 512 * 1024;

const SIZE_LABELS = new Map(ORGANISATION_SIZES.map((o) => [o.value as string, o.label as string]));
const JURISDICTION_LABELS = new Map(JURISDICTIONS.map((o) => [o.value as string, o.label as string]));

function maskIp(ip: string): string {
  if (ip.includes(".")) return ip.split(".").slice(0, 2).join(".") + ".*.*";
  if (ip.includes(":")) return ip.split(":").slice(0, 2).join(":") + ":*";
  return "unknown";
}

interface StoredAttachment {
  path: string;
  filename: string;
  mime: string;
  size: number;
  sha256: string;
  signedUrl: string | null;
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    const isMultipart = contentType.includes("multipart/form-data");

    /*
     * 0. Size guard, BEFORE the body is touched.
     *
     * content-length is attacker-controlled, so this is not the last word - the
     * real file size is re-checked twice below. It is here to reject an
     * obviously oversized request without buffering it.
     */
    const declaredLength = Number(request.headers.get("content-length") || 0);
    if (declaredLength > MAX_REQUEST_BYTES) {
      return NextResponse.json(
        { error: "That file is too large. Please attach a document under 4 MB." },
        { status: 413 }
      );
    }

    /*
     * 1. Rate limiting, still before the body is read.
     *
     * This works because extractClientIp reads HEADERS only. Awaiting
     * request.formData() first would buffer and parse the whole payload before
     * the cheapest gate had run, which is the wrong way round.
     */
    const ip = extractClientIp(request);
    if (RATE_LIMIT_ENABLED) {
      const rate = checkContactRateLimit(ip);
      if (!rate.allowed) {
        console.warn(`[Contact] Rate limit hit for ${maskIp(ip)}: ${rate.reason}`);
        const retryAfter = Math.max(Math.ceil((rate.resetAt.getTime() - Date.now()) / 1000), 1);
        return NextResponse.json(
          { error: "Too many requests. Please wait a moment and try again." },
          { status: 429, headers: { "Retry-After": String(retryAfter) } }
        );
      }
    }

    // 2. Parse. Multipart is the live path; JSON is a compat shim (see below).
    let fields: Record<string, unknown>;
    let file: File | null = null;

    if (isMultipart) {
      let form: FormData;
      try {
        form = await request.formData();
      } catch {
        return NextResponse.json({ error: "Invalid request." }, { status: 400 });
      }

      fields = {};
      for (const [key, value] of form.entries()) {
        if (typeof value === "string") fields[key] = value;
      }

      /*
       * getAll, not get. `get` silently returns the first part, so a crafted
       * request with five `file` parts would sail past a get-only
       * implementation while pushing five times the bytes through the function.
       */
      const files = form.getAll("file").filter((v): v is File => v instanceof File && v.size > 0);
      if (files.length > 1) {
        return NextResponse.json(
          { error: "Please attach a single document." },
          { status: 400 }
        );
      }
      // A File under any other field name is not something the form sends.
      for (const [key, value] of form.entries()) {
        if (value instanceof File && value.size > 0 && key !== "file") {
          return NextResponse.json({ error: "Unexpected file upload." }, { status: 400 });
        }
      }
      file = files[0] ?? null;
    } else {
      /*
       * LEGACY JSON PATH - compat shim, remove after one release cycle.
       *
       * A visitor with /contact already open when the deploy lands will POST
       * the old JSON shape. Without this they get a validation error on a form
       * that looked fine when they opened it.
       */
      try {
        const body = (await request.json()) as Record<string, unknown>;
        const legacyName = typeof body.name === "string" ? body.name.trim() : "";
        const spaceAt = legacyName.indexOf(" ");
        fields = {
          ...body,
          firstName: body.firstName ?? (spaceAt > 0 ? legacyName.slice(0, spaceAt) : legacyName),
          lastName: body.lastName ?? (spaceAt > 0 ? legacyName.slice(spaceAt + 1) : "-"),
          privacyConsent: body.privacyConsent ?? body.gdprConsent,
          organisationSize: body.organisationSize ?? "1-25",
          jurisdiction: body.jurisdiction ?? "other",
        };
      } catch {
        return NextResponse.json({ error: "Invalid request." }, { status: 400 });
      }
    }

    // 3. Honeypot. Silently accept-and-drop so bots cannot tell they were caught.
    const honeypot = typeof fields.website === "string" ? fields.website.trim() : "";
    if (honeypot) {
      console.warn(`[Contact] Honeypot triggered for ${maskIp(ip)} — dropping submission.`);
      return NextResponse.json(
        { success: true, message: "Your message has been received." },
        { status: 200 }
      );
    }

    // 4. Privacy consent. Required, enforced server-side.
    if (!asBoolean(fields.privacyConsent ?? fields.gdprConsent)) {
      return NextResponse.json(
        { error: "Please confirm you consent to us processing your data to respond to your enquiry." },
        { status: 400 }
      );
    }

    // Marketing opt-in is entirely separate and never gates anything.
    const marketingOptIn = asBoolean(fields.marketingOptIn);

    // 5. Validate and normalise every field.
    const result = validateContact(fields);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    const data = result.data;

    // 6. Turnstile.
    let turnstileVerified = false;
    if (TURNSTILE_ENABLED) {
      const token = typeof fields.turnstileToken === "string" ? fields.turnstileToken : "";
      if (!token) {
        return NextResponse.json(
          { error: "Human verification is required. Please refresh the page and try again." },
          { status: 403 }
        );
      }
      const verification = await verifyTurnstileToken(token, ip);
      if (!verification.success) {
        console.warn(`[Contact] Turnstile failed for ${maskIp(ip)}: ${verification.errorCodes?.join(", ")}`);
        return NextResponse.json(
          { error: "Human verification failed. Please refresh the page and try again." },
          { status: 403 }
        );
      }
      turnstileVerified = true;
    }

    /* ───────────────────────────────────────────────────────────────────────
     * Only now is the file touched.
     *
     * This is the single most important ordering decision in the route: no
     * bytes are read, hashed or uploaded until the honeypot, the consent check,
     * validation and Turnstile have all passed. An unverified bot can never
     * cause a write to the bucket.
     * ─────────────────────────────────────────────────────────────────────── */
    const submissionId = randomUUID();
    let attachment: StoredAttachment | null = null;
    let attachmentFailed = false;

    if (file && UPLOADS_ENABLED) {
      if (file.size > UPLOAD_LIMITS.maxBytes) {
        return NextResponse.json(
          { error: "That file is too large. Please attach a document under 4 MB." },
          { status: 413 }
        );
      }

      const safeFilename = sanitiseFilename(file.name);
      const ext = extensionOf(safeFilename);
      if (!UPLOAD_LIMITS.allowedExtensions.includes(ext as never)) {
        return NextResponse.json(
          { error: "That file type is not supported. Please attach a PDF, Word, Excel, CSV, text or image file." },
          { status: 400 }
        );
      }

      const buffer = new Uint8Array(await file.arrayBuffer());
      // Third size check: the header lied, or file.size lied, or neither.
      if (buffer.byteLength > UPLOAD_LIMITS.maxBytes) {
        return NextResponse.json(
          { error: "That file is too large. Please attach a document under 4 MB." },
          { status: 413 }
        );
      }

      const sniff = sniffFileType(buffer, safeFilename);
      if (!sniff.ok) {
        console.warn(`[Contact] Rejected upload from ${maskIp(ip)}: ${sniff.reason}`);
        return NextResponse.json(
          { error: "That file does not look like the type its name suggests. Please check the file and try again." },
          { status: 400 }
        );
      }

      const sha256 = createHash("sha256").update(buffer).digest("hex");
      const objectKey = buildObjectKey(safeFilename, submissionId);

      try {
        const supabase = getSupabaseServer();
        const { error: uploadError } = await supabase.storage
          .from(ATTACHMENTS_BUCKET)
          .upload(objectKey, buffer, {
            // OUR sniffed type, never file.type. The browser's value is
            // attacker-supplied and is not consulted anywhere in this route.
            contentType: sniff.mime,
            cacheControl: "0",
            upsert: false,
          });

        if (uploadError) {
          // Never fail the request over this. The enquiry is the valuable
          // thing; the admin is told the document did not store so they can ask
          // for a resend.
          console.error("[Contact] Attachment upload failed:", uploadError.message);
          attachmentFailed = true;
        } else {
          // Signed URL, forced to download. Serving it inline would let a
          // crafted file render in a browser context; forcing the download from
          // Supabase's domain keeps it out of our origin entirely.
          const { data: signed } = await supabase.storage
            .from(ATTACHMENTS_BUCKET)
            .createSignedUrl(objectKey, ATTACHMENT_URL_TTL_SECONDS, { download: safeFilename });

          attachment = {
            path: objectKey,
            filename: safeFilename,
            mime: sniff.mime,
            size: buffer.byteLength,
            sha256,
            signedUrl: signed?.signedUrl ?? null,
          };
        }
      } catch (err) {
        console.error("[Contact] Storage threw:", err);
        attachmentFailed = true;
      }
    } else if (file && !UPLOADS_ENABLED) {
      attachmentFailed = true;
    }

    // 7. Persist. Best-effort: a logging failure must not lose the enquiry.
    const consentTimestamp = new Date().toISOString();
    const fullName = `${data.firstName} ${data.lastName}`.trim();

    try {
      const supabase = getSupabaseServer();
      const { error: dbError } = await supabase.from("contact_submissions").insert({
        id: submissionId,
        // Legacy columns, still populated so the not-null constraints hold and
        // existing reporting keeps working. See migration 0005.
        name: fullName,
        message: data.requirement,
        service: data.reasonLabel,

        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        company: data.company,
        phone: data.phone || null,
        enquiry_reason: data.reasonValue,
        organisation_size: data.organisationSize,
        jurisdiction: data.jurisdiction,
        deadline: data.deadline || null,
        no_fixed_deadline: data.noFixedDeadline,

        consent_given: true,
        consent_text: CONSENT_STATEMENT,
        privacy_policy_version: PRIVACY_POLICY_VERSION,
        consent_timestamp: consentTimestamp,

        // Storing the statement for a consent that was NOT given would
        // misrepresent the record, so both stay null when the box is unticked.
        marketing_opt_in: marketingOptIn,
        marketing_consent_text: marketingOptIn ? MARKETING_STATEMENT : null,
        marketing_consent_timestamp: marketingOptIn ? consentTimestamp : null,

        attachment_bucket: attachment ? ATTACHMENTS_BUCKET : null,
        attachment_path: attachment?.path ?? null,
        attachment_filename: attachment?.filename ?? null,
        attachment_mime: attachment?.mime ?? null,
        attachment_size_bytes: attachment?.size ?? null,
        attachment_sha256: attachment?.sha256 ?? null,

        source: "contact_form",
        user_agent: request.headers.get("user-agent")?.slice(0, 500) || null,
        turnstile_verified: turnstileVerified,
      });
      if (dbError) {
        console.error("[Contact] Failed to persist submission:", dbError.message);
      }
    } catch (err) {
      console.error("[Contact] Supabase insert threw:", err);
    }

    /*
     * 8. Emails. Every interpolated value goes through the `safe` object, the
     * filename included: the sanitiser and the escaper are independent controls
     * and both should hold.
     */
    const safe = {
      firstName: escapeHtml(data.firstName),
      fullName: escapeHtml(fullName),
      email: escapeHtml(data.email),
      company: escapeHtml(data.company),
      phone: escapeHtml(data.phone || "Not provided"),
      reason: escapeHtml(data.reasonLabel),
      requirement: escapeHtml(data.requirement),
      size: escapeHtml(SIZE_LABELS.get(data.organisationSize) || data.organisationSize),
      jurisdiction: escapeHtml(JURISDICTION_LABELS.get(data.jurisdiction) || data.jurisdiction),
      deadline: escapeHtml(
        data.deadline
          ? new Date(`${data.deadline}T00:00:00Z`).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "UTC",
            })
          : data.noFixedDeadline
            ? "No fixed deadline"
            : "Not provided"
      ),
      attachmentName: attachment ? escapeHtml(attachment.filename) : "",
      attachmentUrl: attachment?.signedUrl ? escapeHtml(attachment.signedUrl) : "",
      attachmentMeta: attachment ? escapeHtml(`${formatBytes(attachment.size)} · ${attachment.mime}`) : "",
    };

    const label = (text: string) =>
      `<td style="padding: 12px 16px; color: rgba(255,255,255,0.5); font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top;">${text}</td>`;
    const value = (html: string) =>
      `<td style="padding: 12px 16px; color: ${EMAIL_COLORS.white}; font-size: 15px;">${html}</td>`;

    /*
     * The file bytes are NOT attached to this email, deliberately.
     *
     * Replicating a customer's tender document into an inbox puts a copy
     * outside the 24-month deletion control we promise in CONSENT_NOTICE, which
     * would make an erasure request impossible to honour properly. The signed
     * URL keeps exactly one copy, in one place we can delete.
     */
    const attachmentBlock = attachment
      ? `
        <div style="margin-top: 16px; padding: 20px; background: rgba(111,227,203,0.06); border: 1px solid rgba(111,227,203,0.2); border-radius: 8px;">
          <p style="color: rgba(255,255,255,0.5); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px;">Attached document</p>
          <p style="color: ${EMAIL_COLORS.white}; font-size: 14px; margin: 0 0 4px;">${safe.attachmentName}</p>
          <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 0 0 14px;">${safe.attachmentMeta}</p>
          ${
            safe.attachmentUrl
              ? `<a href="${safe.attachmentUrl}" style="display: inline-block; background: ${EMAIL_COLORS.brand}; color: ${EMAIL_COLORS.white}; text-decoration: none; padding: 10px 22px; border-radius: 8px; font-weight: 600; font-size: 13px;">Download document</a>
                 <p style="color: rgba(255,255,255,0.35); font-size: 11px; margin: 10px 0 0;">This link downloads the file and expires in ${Math.round(ATTACHMENT_URL_TTL_SECONDS / 86400)} days. Treat it as confidential.</p>`
              : `<p style="color: rgba(255,255,255,0.5); font-size: 12px; margin: 0;">The document is stored but a download link could not be generated. Retrieve it from the attachments bucket.</p>`
          }
        </div>`
      : attachmentFailed
        ? `
        <div style="margin-top: 16px; padding: 12px 16px; background: rgba(230,57,70,0.1); border: 1px solid rgba(230,57,70,0.3); border-radius: 8px;">
          <p style="color: ${EMAIL_COLORS.white}; font-size: 13px; margin: 0;">A document was attached but could not be stored. Ask the sender to resend it.</p>
        </div>`
        : "";

    const adminEmail = resend.emails.send({
      from: "Pixelette Certified <noreply@pixelettecertified.com>",
      to: ["partnerships@pixelette.tech"],
      replyTo: data.email,
      subject: `New enquiry, ${data.reasonLabel}, ${data.company}${attachment ? " [document attached]" : ""}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: ${EMAIL_COLORS.ground}; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, ${EMAIL_COLORS.ground} 0%, ${EMAIL_COLORS.mid} 50%, ${EMAIL_COLORS.line} 100%); padding: 32px 32px 24px; text-align: center; border-bottom: 2px solid ${EMAIL_COLORS.accent};">
            <img src="https://pixelettecertified.com/logos/logo-white-text.svg" alt="Pixelette Certified" style="height: 40px; margin-bottom: 16px;" />
            <h1 style="color: ${EMAIL_COLORS.accent}; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">New Contact Form Submission</h1>
            <p style="color: rgba(255,255,255,0.5); margin: 8px 0 0; font-size: 13px;">Received on ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} at ${new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</p>
          </div>

          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>${label("Name")}${value(`<strong>${safe.fullName}</strong>`)}</tr>
              <tr style="background: rgba(255,255,255,0.03);">${label("Work email")}<td style="padding: 12px 16px;"><a href="mailto:${safe.email}" style="color: ${EMAIL_COLORS.accent}; text-decoration: none; font-size: 15px;">${safe.email}</a></td></tr>
              <tr>${label("Company")}${value(safe.company)}</tr>
              <tr style="background: rgba(255,255,255,0.03);">${label("Organisation size")}${value(safe.size)}</tr>
              <tr>${label("Jurisdiction")}${value(safe.jurisdiction)}</tr>
              <tr style="background: rgba(255,255,255,0.03);">${label("What brought them here")}<td style="padding: 12px 16px; color: ${EMAIL_COLORS.accent}; font-size: 15px; font-weight: 700;">${safe.reason}</td></tr>
              <tr>${label("Deadline")}${value(safe.deadline)}</tr>
              <tr style="background: rgba(255,255,255,0.03);">${label("Phone")}${value(safe.phone)}</tr>
            </table>

            <div style="margin-top: 24px; padding: 20px; background: rgba(255,255,255,0.05); border: 1px solid rgba(111,227,203,0.2); border-radius: 8px;">
              <p style="color: rgba(255,255,255,0.5); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px;">What they have been asked to prove</p>
              <p style="color: ${EMAIL_COLORS.white}; line-height: 1.7; white-space: pre-wrap; margin: 0; font-size: 14px;">${safe.requirement}</p>
            </div>

            ${attachmentBlock}

            <div style="margin-top: 16px; padding: 12px 16px; background: rgba(111,227,203,0.06); border: 1px solid rgba(111,227,203,0.15); border-radius: 8px;">
              <p style="color: rgba(255,255,255,0.4); font-size: 11px; margin: 0;">Privacy consent recorded ${escapeHtml(consentTimestamp)} against Privacy Policy v${escapeHtml(PRIVACY_POLICY_VERSION)}. Marketing opt-in: ${marketingOptIn ? "yes, recorded at the same timestamp" : "no"}.</p>
            </div>

            <div style="text-align: center; margin-top: 28px;">
              <a href="mailto:${safe.email}" style="display: inline-block; background: ${EMAIL_COLORS.brand}; color: ${EMAIL_COLORS.white}; text-decoration: none; padding: 12px 32px; border-radius: 8px; font-weight: 600; font-size: 14px;">Reply to ${safe.firstName}</a>
            </div>
          </div>

          <div style="background: ${EMAIL_COLORS.deep}; padding: 20px 32px; text-align: center; border-top: 1px solid rgba(111,227,203,0.15);">
            <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin: 0;">Pixelette Certified, Compliance. Governance. Cyber Trust.</p>
            <p style="color: rgba(255,255,255,0.2); font-size: 11px; margin: 6px 0 0;">pixelettecertified.com</p>
          </div>
        </div>
      `,
    });

    const userEmail = resend.emails.send({
      from: "Pixelette Certified <noreply@pixelettecertified.com>",
      to: [data.email],
      subject: "We've received your enquiry, Pixelette Certified",
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: ${EMAIL_COLORS.ground}; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, ${EMAIL_COLORS.ground} 0%, ${EMAIL_COLORS.mid} 50%, ${EMAIL_COLORS.line} 100%); padding: 32px; text-align: center; border-bottom: 2px solid ${EMAIL_COLORS.accent};">
            <img src="https://pixelettecertified.com/logos/logo-white-text.svg" alt="Pixelette Certified" style="height: 40px; margin-bottom: 16px;" />
            <h1 style="color: ${EMAIL_COLORS.white}; margin: 0; font-size: 24px; font-weight: 700;">Thank you, ${safe.firstName}</h1>
            <p style="color: ${EMAIL_COLORS.accent}; margin: 8px 0 0; font-size: 14px;">We have received your enquiry</p>
          </div>

          <div style="padding: 32px;">
            <p style="color: rgba(255,255,255,0.85); line-height: 1.7; font-size: 15px; margin: 0 0 16px;">We have received your enquiry about <strong style="color: ${EMAIL_COLORS.accent};">${safe.reason}</strong> and a member of our team will respond within one working day.</p>
            ${attachment ? `<p style="color: rgba(255,255,255,0.85); line-height: 1.7; font-size: 15px; margin: 0 0 16px;">We have received your document, ${safe.attachmentName}.</p>` : ""}
            <p style="color: rgba(255,255,255,0.85); line-height: 1.7; font-size: 15px; margin: 0 0 20px;">In the meantime, you may find these resources helpful:</p>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 12px 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                  <a href="https://pixelettecertified.com/services" style="color: ${EMAIL_COLORS.accent}; text-decoration: none; font-weight: 600; font-size: 14px;">Our Services →</a>
                  <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 4px 0 0;">ISO 27001 and ISO 42001 readiness, SOC 2 readiness, vCISO, privacy and vDPO</p>
                </td>
              </tr>
              <tr><td style="height: 8px;"></td></tr>
              <tr>
                <td style="padding: 12px 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                  <a href="https://pixelettecertified.com/pricing" style="color: ${EMAIL_COLORS.accent}; text-decoration: none; font-weight: 600; font-size: 14px;">Pricing →</a>
                  <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 4px 0 0;">How engagements are scoped and priced</p>
                </td>
              </tr>
              <tr><td style="height: 8px;"></td></tr>
              <tr>
                <td style="padding: 12px 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                  <a href="https://pixelettecertified.com/resources" style="color: ${EMAIL_COLORS.accent}; text-decoration: none; font-weight: 600; font-size: 14px;">Resources →</a>
                  <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 4px 0 0;">Practitioner guides on certification, assurance and AI governance</p>
                </td>
              </tr>
            </table>
            ${marketingOptIn ? `<p style="color: rgba(255,255,255,0.5); font-size: 12px; line-height: 1.6; margin: 0;">You also asked to receive occasional compliance insights from us. You can unsubscribe at any time by replying to this email or writing to privacy@pixelettecertified.com.</p>` : ""}
          </div>

          <div style="background: ${EMAIL_COLORS.deep}; padding: 20px 32px; text-align: center; border-top: 1px solid rgba(111,227,203,0.15);">
            <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin: 0;">Pixelette Certified, Compliance. Governance. Cyber Trust.</p>
            <p style="color: rgba(255,255,255,0.2); font-size: 11px; margin: 6px 0 0;">pixelettecertified.com</p>
          </div>
        </div>
      `,
    });

    /*
     * allSettled, not sequential awaits.
     *
     * Previously these were two awaits in a row, so a failure on the CUSTOMER
     * confirmation threw after the admin had already been notified: the visitor
     * saw an error, retried, and produced a duplicate row and a duplicate admin
     * email. Only the admin notification failing is worth a 500, because that
     * is the one that means nobody knows the enquiry exists.
     */
    const [adminResult, userResult] = await Promise.allSettled([adminEmail, userEmail]);

    if (userResult.status === "rejected") {
      console.error("[Contact] Confirmation email failed:", userResult.reason);
    }
    if (adminResult.status === "rejected") {
      console.error("[Contact] Admin notification failed:", adminResult.reason);
      return NextResponse.json(
        { error: "Something went wrong. Please try again or email us directly at info@pixelettecertified.com." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Your message has been received. We will respond within one working day." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again or email us directly at info@pixelettecertified.com." },
      { status: 500 }
    );
  }
}
