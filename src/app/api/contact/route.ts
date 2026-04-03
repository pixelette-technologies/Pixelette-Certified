import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactPayload {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  service?: string;
  message?: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const { name, email, message } = body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Please provide your full name." }, { status: 400 });
    }
    if (!email || typeof email !== "string" || !isValidEmail(email.trim())) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }
    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json({ error: "Please provide a message (at least 10 characters)." }, { status: 400 });
    }
    if (name.length > 200 || email.length > 320 || message.length > 5000) {
      return NextResponse.json({ error: "Input too long." }, { status: 400 });
    }

    const company = body.company?.trim() || "Not provided";
    const phone = body.phone?.trim() || "Not provided";
    const service = body.service?.trim() || "Not specified";

    // Send email to Pixelette Certified team
    await resend.emails.send({
      from: "Pixelette Certified <noreply@pixelettecertified.com>",
      to: ["partnerships@pixelette.tech"],
      replyTo: email.trim(),
      subject: `New enquiry from ${name.trim()} — ${service}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #044143; border-radius: 12px; overflow: hidden;">
          <!-- Header with logo -->
          <div style="background: linear-gradient(135deg, #032e2f 0%, #044143 50%, #065456 100%); padding: 32px 32px 24px; text-align: center; border-bottom: 2px solid #14AAA9;">
            <img src="https://pixelettecertified.com/logos/logo-white-text.svg" alt="Pixelette Certified" style="height: 40px; margin-bottom: 16px;" />
            <h1 style="color: #14AAA9; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">New Contact Form Submission</h1>
            <p style="color: rgba(255,255,255,0.5); margin: 8px 0 0; font-size: 13px;">Received on ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} at ${new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</p>
          </div>

          <!-- Body -->
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 16px; color: rgba(255,255,255,0.5); width: 110px; vertical-align: top; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Name</td>
                <td style="padding: 12px 16px; color: #ffffff; font-size: 15px; font-weight: 600;">${name.trim()}</td>
              </tr>
              <tr style="background: rgba(255,255,255,0.03);">
                <td style="padding: 12px 16px; color: rgba(255,255,255,0.5); font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Email</td>
                <td style="padding: 12px 16px;"><a href="mailto:${email.trim()}" style="color: #14AAA9; text-decoration: none; font-size: 15px;">${email.trim()}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; color: rgba(255,255,255,0.5); font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Company</td>
                <td style="padding: 12px 16px; color: #ffffff; font-size: 15px;">${company}</td>
              </tr>
              <tr style="background: rgba(255,255,255,0.03);">
                <td style="padding: 12px 16px; color: rgba(255,255,255,0.5); font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Phone</td>
                <td style="padding: 12px 16px; color: #ffffff; font-size: 15px;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; color: rgba(255,255,255,0.5); font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Service</td>
                <td style="padding: 12px 16px; color: #14AAA9; font-size: 15px; font-weight: 700;">${service}</td>
              </tr>
            </table>

            <!-- Message -->
            <div style="margin-top: 24px; padding: 20px; background: rgba(255,255,255,0.05); border: 1px solid rgba(20,170,169,0.2); border-radius: 8px;">
              <p style="color: rgba(255,255,255,0.5); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px;">Message</p>
              <p style="color: #ffffff; line-height: 1.7; white-space: pre-wrap; margin: 0; font-size: 14px;">${message.trim()}</p>
            </div>

            <!-- Reply button -->
            <div style="text-align: center; margin-top: 28px;">
              <a href="mailto:${email.trim()}" style="display: inline-block; background: #14AAA9; color: #ffffff; text-decoration: none; padding: 12px 32px; border-radius: 8px; font-weight: 600; font-size: 14px;">Reply to ${name.trim()}</a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #032e2f; padding: 20px 32px; text-align: center; border-top: 1px solid rgba(20,170,169,0.15);">
            <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin: 0;">Pixelette Certified — Compliance. Governance. Cyber Trust.</p>
            <p style="color: rgba(255,255,255,0.2); font-size: 11px; margin: 6px 0 0;">pixelettecertified.com</p>
          </div>
        </div>
      `,
    });

    // Send confirmation to the user
    await resend.emails.send({
      from: "Pixelette Certified <noreply@pixelettecertified.com>",
      to: [email.trim()],
      subject: "We've received your enquiry — Pixelette Certified",
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #044143; border-radius: 12px; overflow: hidden;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #032e2f 0%, #044143 50%, #065456 100%); padding: 32px; text-align: center; border-bottom: 2px solid #14AAA9;">
            <img src="https://pixelettecertified.com/logos/logo-white-text.svg" alt="Pixelette Certified" style="height: 40px; margin-bottom: 16px;" />
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">Thank you, ${name.trim()}</h1>
            <p style="color: #14AAA9; margin: 8px 0 0; font-size: 14px;">We have received your enquiry</p>
          </div>

          <!-- Body -->
          <div style="padding: 32px;">
            <p style="color: rgba(255,255,255,0.85); line-height: 1.7; font-size: 15px; margin: 0 0 16px;">We have received your enquiry about <strong style="color: #14AAA9;">${service}</strong> and a member of our team will respond within one working day.</p>

            <p style="color: rgba(255,255,255,0.85); line-height: 1.7; font-size: 15px; margin: 0 0 20px;">In the meantime, you may find these resources helpful:</p>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr>
                <td style="padding: 12px 16px; background: rgba(255,255,255,0.05); border-radius: 8px; margin-bottom: 8px;">
                  <a href="https://pixelettecertified.com/services" style="color: #14AAA9; text-decoration: none; font-weight: 600; font-size: 14px;">Our Services →</a>
                  <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 4px 0 0;">ISO 27001, Cyber Essentials, GDPR, vCISO, and more</p>
                </td>
              </tr>
              <tr><td style="height: 8px;"></td></tr>
              <tr>
                <td style="padding: 12px 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                  <a href="https://pixelettecertified.com/pricing" style="color: #14AAA9; text-decoration: none; font-weight: 600; font-size: 14px;">Pricing →</a>
                  <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 4px 0 0;">Transparent, fixed-fee pricing for all services</p>
                </td>
              </tr>
              <tr><td style="height: 8px;"></td></tr>
              <tr>
                <td style="padding: 12px 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                  <a href="https://pixelettecertified.com/blog" style="color: #14AAA9; text-decoration: none; font-weight: 600; font-size: 14px;">Blog & Resources →</a>
                  <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 4px 0 0;">Guides on ISO certification, compliance, and AI governance</p>
                </td>
              </tr>
            </table>
          </div>

          <!-- Footer -->
          <div style="background: #032e2f; padding: 20px 32px; text-align: center; border-top: 1px solid rgba(20,170,169,0.15);">
            <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin: 0;">Pixelette Certified — Compliance. Governance. Cyber Trust.</p>
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
