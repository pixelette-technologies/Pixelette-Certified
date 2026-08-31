import { NextResponse } from "next/server";
import { Resend } from "resend";
import { validateContact, escapeHtml } from "@/lib/contact/validation";
import { CONSENT_STATEMENT, PRIVACY_POLICY_VERSION } from "@/lib/contact/constants";
import { checkContactRateLimit } from "@/lib/contact/rateLimit";
import { extractClientIp } from "@/lib/alice/rateLimit";
import { verifyTurnstileToken } from "@/lib/alice/turnstile";
import { getSupabaseServer } from "@/lib/alice/supabase";
import { EMAIL_COLORS } from "@/lib/constants";

const resend = new Resend(process.env.RESEND_API_KEY);

// Governance toggles.
// - Rate limiting is on by default (pure in-memory, nothing to provision); set
//   CONTACT_RATE_LIMIT_ENABLED="false" to disable.
// - Turnstile is off unless CONTACT_TURNSTILE_ENABLED="true" AND the shared
//   TURNSTILE_SECRET_KEY / NEXT_PUBLIC_TURNSTILE_SITE_KEY are configured (same
//   keys Alice uses). This mirrors the opt-in pattern in the chat route.
const RATE_LIMIT_ENABLED = process.env.CONTACT_RATE_LIMIT_ENABLED !== "false";
const TURNSTILE_ENABLED = process.env.CONTACT_TURNSTILE_ENABLED === "true";

function maskIp(ip: string): string {
  if (ip.includes(".")) return ip.split(".").slice(0, 2).join(".") + ".*.*";
  if (ip.includes(":")) return ip.split(":").slice(0, 2).join(":") + ":*";
  return "unknown";
}

interface ContactPayload {
  gdprConsent?: unknown;
  turnstileToken?: unknown;
  website?: unknown; // honeypot — must stay empty
}

export async function POST(request: Request) {
  try {
    let body: ContactPayload & Record<string, unknown>;
    try {
      body = (await request.json()) as ContactPayload & Record<string, unknown>;
    } catch {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const ip = extractClientIp(request);

    // 1. Rate limiting — cheapest gate, before any heavier work.
    if (RATE_LIMIT_ENABLED) {
      const rate = checkContactRateLimit(ip);
      if (!rate.allowed) {
        console.warn(`[Contact] Rate limit hit for ${maskIp(ip)}: ${rate.reason}`);
        const retryAfter = Math.max(
          Math.ceil((rate.resetAt.getTime() - Date.now()) / 1000),
          1
        );
        return NextResponse.json(
          { error: "Too many requests. Please wait a moment and try again." },
          { status: 429, headers: { "Retry-After": String(retryAfter) } }
        );
      }
    }

    // 2. Honeypot — a hidden field no human sees. If it is filled, silently
    //    accept-and-drop so bots cannot tell they were caught.
    const honeypot = typeof body.website === "string" ? body.website.trim() : "";
    if (honeypot) {
      console.warn(`[Contact] Honeypot triggered for ${maskIp(ip)} — dropping submission.`);
      return NextResponse.json(
        { success: true, message: "Your message has been received." },
        { status: 200 }
      );
    }

    // 3. Consent must be explicitly granted — enforced server-side, not just in
    //    the browser.
    if (body.gdprConsent !== true) {
      return NextResponse.json(
        { error: "Please confirm you consent to us processing your data to respond to your enquiry." },
        { status: 400 }
      );
    }

    // 4. Validate and normalise all fields (server is the source of truth).
    const result = validateContact(body);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    const data = result.data;

    // 5. Bot verification via Cloudflare Turnstile (when enabled).
    let turnstileVerified = false;
    if (TURNSTILE_ENABLED) {
      const token = typeof body.turnstileToken === "string" ? body.turnstileToken : "";
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

    // 6. Persist the enquiry + consent audit record (best-effort: a logging
    //    failure must not lose the customer's enquiry, so we continue to email).
    const consentTimestamp = new Date().toISOString();
    try {
      const supabase = getSupabaseServer();
      const { error: dbError } = await supabase.from("contact_submissions").insert({
        name: data.name,
        email: data.email,
        company: data.company || null,
        phone: data.phone || null,
        country: data.country || null,
        service: data.service || null,
        message: data.message,
        consent_given: true,
        consent_text: CONSENT_STATEMENT,
        privacy_policy_version: PRIVACY_POLICY_VERSION,
        consent_timestamp: consentTimestamp,
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

    // 7. Notify the team and confirm to the sender. All interpolated user values
    //    are HTML-escaped to prevent markup injection into the emails.
    const safe = {
      name: escapeHtml(data.name),
      email: escapeHtml(data.email),
      company: escapeHtml(data.company || "Not provided"),
      phone: escapeHtml(data.phone || "Not provided"),
      country: escapeHtml(data.country || "Not provided"),
      service: escapeHtml(data.service || "Not specified"),
      message: escapeHtml(data.message),
    };

    await resend.emails.send({
      from: "Pixelette Certified <noreply@pixelettecertified.com>",
      to: ["partnerships@pixelette.tech"],
      replyTo: data.email,
      subject: `New enquiry from ${data.name}, ${data.service || "Not specified"}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: ${EMAIL_COLORS.ground}; border-radius: 12px; overflow: hidden;">
          <!-- Header with logo -->
          <div style="background: linear-gradient(135deg, ${EMAIL_COLORS.ground} 0%, ${EMAIL_COLORS.mid} 50%, ${EMAIL_COLORS.line} 100%); padding: 32px 32px 24px; text-align: center; border-bottom: 2px solid ${EMAIL_COLORS.accent};">
            <img src="https://pixelettecertified.com/logos/logo-white-text.svg" alt="Pixelette Certified" style="height: 40px; margin-bottom: 16px;" />
            <h1 style="color: ${EMAIL_COLORS.accent}; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">New Contact Form Submission</h1>
            <p style="color: rgba(255,255,255,0.5); margin: 8px 0 0; font-size: 13px;">Received on ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} at ${new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</p>
          </div>

          <!-- Body -->
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 16px; color: rgba(255,255,255,0.5); width: 110px; vertical-align: top; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Name</td>
                <td style="padding: 12px 16px; color: ${EMAIL_COLORS.white}; font-size: 15px; font-weight: 600;">${safe.name}</td>
              </tr>
              <tr style="background: rgba(255,255,255,0.03);">
                <td style="padding: 12px 16px; color: rgba(255,255,255,0.5); font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Email</td>
                <td style="padding: 12px 16px;"><a href="mailto:${safe.email}" style="color: ${EMAIL_COLORS.accent}; text-decoration: none; font-size: 15px;">${safe.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; color: rgba(255,255,255,0.5); font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Company</td>
                <td style="padding: 12px 16px; color: ${EMAIL_COLORS.white}; font-size: 15px;">${safe.company}</td>
              </tr>
              <tr style="background: rgba(255,255,255,0.03);">
                <td style="padding: 12px 16px; color: rgba(255,255,255,0.5); font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Phone</td>
                <td style="padding: 12px 16px; color: ${EMAIL_COLORS.white}; font-size: 15px;">${safe.phone}</td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; color: rgba(255,255,255,0.5); font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Country</td>
                <td style="padding: 12px 16px; color: ${EMAIL_COLORS.white}; font-size: 15px;">${safe.country}</td>
              </tr>
              <tr style="background: rgba(255,255,255,0.03);">
                <td style="padding: 12px 16px; color: rgba(255,255,255,0.5); font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Service</td>
                <td style="padding: 12px 16px; color: ${EMAIL_COLORS.accent}; font-size: 15px; font-weight: 700;">${safe.service}</td>
              </tr>
            </table>

            <!-- Message -->
            <div style="margin-top: 24px; padding: 20px; background: rgba(255,255,255,0.05); border: 1px solid rgba(111,227,203,0.2); border-radius: 8px;">
              <p style="color: rgba(255,255,255,0.5); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px;">Message</p>
              <p style="color: ${EMAIL_COLORS.white}; line-height: 1.7; white-space: pre-wrap; margin: 0; font-size: 14px;">${safe.message}</p>
            </div>

            <!-- Consent record -->
            <div style="margin-top: 16px; padding: 12px 16px; background: rgba(111,227,203,0.06); border: 1px solid rgba(111,227,203,0.15); border-radius: 8px;">
              <p style="color: rgba(255,255,255,0.4); font-size: 11px; margin: 0;">Consent recorded ${escapeHtml(consentTimestamp)} against Privacy Policy v${escapeHtml(PRIVACY_POLICY_VERSION)}.</p>
            </div>

            <!-- Reply button -->
            <div style="text-align: center; margin-top: 28px;">
              <a href="mailto:${safe.email}" style="display: inline-block; background: ${EMAIL_COLORS.brand}; color: ${EMAIL_COLORS.white}; text-decoration: none; padding: 12px 32px; border-radius: 8px; font-weight: 600; font-size: 14px;">Reply to ${safe.name}</a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: ${EMAIL_COLORS.deep}; padding: 20px 32px; text-align: center; border-top: 1px solid rgba(111,227,203,0.15);">
            <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin: 0;">Pixelette Certified, Compliance. Governance. Cyber Trust.</p>
            <p style="color: rgba(255,255,255,0.2); font-size: 11px; margin: 6px 0 0;">pixelettecertified.com</p>
          </div>
        </div>
      `,
    });

    // Send confirmation to the user
    await resend.emails.send({
      from: "Pixelette Certified <noreply@pixelettecertified.com>",
      to: [data.email],
      subject: "We've received your enquiry, Pixelette Certified",
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: ${EMAIL_COLORS.ground}; border-radius: 12px; overflow: hidden;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, ${EMAIL_COLORS.ground} 0%, ${EMAIL_COLORS.mid} 50%, ${EMAIL_COLORS.line} 100%); padding: 32px; text-align: center; border-bottom: 2px solid ${EMAIL_COLORS.accent};">
            <img src="https://pixelettecertified.com/logos/logo-white-text.svg" alt="Pixelette Certified" style="height: 40px; margin-bottom: 16px;" />
            <h1 style="color: ${EMAIL_COLORS.white}; margin: 0; font-size: 24px; font-weight: 700;">Thank you, ${safe.name}</h1>
            <p style="color: ${EMAIL_COLORS.accent}; margin: 8px 0 0; font-size: 14px;">We have received your enquiry</p>
          </div>

          <!-- Body -->
          <div style="padding: 32px;">
            <p style="color: rgba(255,255,255,0.85); line-height: 1.7; font-size: 15px; margin: 0 0 16px;">We have received your enquiry about <strong style="color: ${EMAIL_COLORS.accent};">${safe.service}</strong> and a member of our team will respond within one working day.</p>

            <p style="color: rgba(255,255,255,0.85); line-height: 1.7; font-size: 15px; margin: 0 0 20px;">In the meantime, you may find these resources helpful:</p>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 12px 16px; background: rgba(255,255,255,0.05); border-radius: 8px; margin-bottom: 8px;">
                  <a href="https://pixelettecertified.com/services" style="color: ${EMAIL_COLORS.accent}; text-decoration: none; font-weight: 600; font-size: 14px;">Our Services →</a>
                  <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 4px 0 0;">ISO 27001, Cyber Essentials, GDPR, vCISO, and more</p>
                </td>
              </tr>
              <tr><td style="height: 8px;"></td></tr>
              <tr>
                <td style="padding: 12px 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                  <a href="https://pixelettecertified.com/pricing" style="color: ${EMAIL_COLORS.accent}; text-decoration: none; font-weight: 600; font-size: 14px;">Pricing →</a>
                  <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 4px 0 0;">Transparent, fixed-fee pricing for all services</p>
                </td>
              </tr>
              <tr><td style="height: 8px;"></td></tr>
              <tr>
                <td style="padding: 12px 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                  <a href="https://pixelettecertified.com/blog" style="color: ${EMAIL_COLORS.accent}; text-decoration: none; font-weight: 600; font-size: 14px;">Blog & Resources →</a>
                  <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 4px 0 0;">Guides on ISO certification, compliance, and AI governance</p>
                </td>
              </tr>
            </table>
          </div>

          <!-- Footer -->
          <div style="background: ${EMAIL_COLORS.deep}; padding: 20px 32px; text-align: center; border-top: 1px solid rgba(111,227,203,0.15);">
            <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin: 0;">Pixelette Certified, Compliance. Governance. Cyber Trust.</p>
            <p style="color: rgba(255,255,255,0.2); font-size: 11px; margin: 6px 0 0;">pixelettecertified.com</p>
          </div>
        </div>
      `,
    });

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
