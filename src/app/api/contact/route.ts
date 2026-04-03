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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #044143; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #14AAA9; margin: 0; font-size: 20px;">New Contact Form Submission</h1>
            <p style="color: #ffffff; margin: 4px 0 0; font-size: 14px;">pixelettecertified.com</p>
          </div>
          <div style="background: #f8fafa; padding: 24px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #666; width: 120px; vertical-align: top;"><strong>Name:</strong></td><td style="padding: 8px 0;">${name.trim()}</td></tr>
              <tr><td style="padding: 8px 0; color: #666; vertical-align: top;"><strong>Email:</strong></td><td style="padding: 8px 0;"><a href="mailto:${email.trim()}">${email.trim()}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #666; vertical-align: top;"><strong>Company:</strong></td><td style="padding: 8px 0;">${company}</td></tr>
              <tr><td style="padding: 8px 0; color: #666; vertical-align: top;"><strong>Phone:</strong></td><td style="padding: 8px 0;">${phone}</td></tr>
              <tr><td style="padding: 8px 0; color: #666; vertical-align: top;"><strong>Service:</strong></td><td style="padding: 8px 0; color: #044143;"><strong>${service}</strong></td></tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 16px 0;" />
            <p style="color: #666; font-size: 13px; margin-bottom: 4px;"><strong>Message:</strong></p>
            <p style="color: #333; line-height: 1.6; white-space: pre-wrap;">${message.trim()}</p>
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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #044143; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #14AAA9; margin: 0; font-size: 20px;">Thank you, ${name.trim()}</h1>
          </div>
          <div style="background: #f8fafa; padding: 24px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="color: #333; line-height: 1.6;">We have received your enquiry about <strong>${service}</strong> and a member of our team will respond within one working day.</p>
            <p style="color: #333; line-height: 1.6;">In the meantime, you may find these resources helpful:</p>
            <ul style="color: #333; line-height: 1.8;">
              <li><a href="https://pixelettecertified.com/services" style="color: #14AAA9;">Our Services</a></li>
              <li><a href="https://pixelettecertified.com/pricing" style="color: #14AAA9;">Pricing</a></li>
              <li><a href="https://pixelettecertified.com/blog" style="color: #14AAA9;">Blog & Resources</a></li>
            </ul>
            <p style="color: #666; font-size: 13px; margin-top: 24px;">Pixelette Certified — Compliance. Governance. Cyber Trust.</p>
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
