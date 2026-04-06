import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });
    }

    // Notify team of new subscriber
    await resend.emails.send({
      from: "Pixelette Certified <noreply@pixelettecertified.com>",
      to: ["partnerships@pixelette.tech"],
      subject: `New newsletter subscriber: ${email}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #044143; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #032e2f 0%, #044143 50%, #065456 100%); padding: 32px; text-align: center; border-bottom: 2px solid #14AAA9;">
            <img src="https://pixelettecertified.com/logos/logo-white-text.svg" alt="Pixelette Certified" style="height: 40px; margin-bottom: 16px;" />
            <h1 style="color: #14AAA9; margin: 0; font-size: 22px; font-weight: 700;">New Newsletter Subscriber</h1>
            <p style="color: rgba(255,255,255,0.5); margin: 8px 0 0; font-size: 13px;">${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} at ${new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}</p>
          </div>
          <div style="padding: 32px; text-align: center;">
            <p style="color: rgba(255,255,255,0.5); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px;">Subscriber Email</p>
            <p style="margin: 0;"><a href="mailto:${email}" style="color: #14AAA9; text-decoration: none; font-size: 18px; font-weight: 700;">${email}</a></p>
            <p style="color: rgba(255,255,255,0.4); font-size: 13px; margin: 16px 0 0;">Subscribed via pixelettecertified.com newsletter form</p>
          </div>
          <div style="background: #032e2f; padding: 20px 32px; text-align: center; border-top: 1px solid rgba(20,170,169,0.15);">
            <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin: 0;">Pixelette Certified, Compliance. Governance. Cyber Trust.</p>
          </div>
        </div>
      `,
    });

    // Send welcome email to subscriber
    await resend.emails.send({
      from: "Pixelette Certified <noreply@pixelettecertified.com>",
      to: [email],
      subject: "Welcome to Pixelette Certified Insights",
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #044143; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #032e2f 0%, #044143 50%, #065456 100%); padding: 32px; text-align: center; border-bottom: 2px solid #14AAA9;">
            <img src="https://pixelettecertified.com/logos/logo-white-text.svg" alt="Pixelette Certified" style="height: 40px; margin-bottom: 16px;" />
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">You're subscribed!</h1>
            <p style="color: #14AAA9; margin: 8px 0 0; font-size: 14px;">Welcome to Pixelette Certified Insights</p>
          </div>

          <div style="padding: 32px;">
            <p style="color: rgba(255,255,255,0.85); line-height: 1.7; font-size: 15px; margin: 0 0 20px;">Thank you for subscribing. You'll receive monthly insights on compliance, cybersecurity, and AI governance, written by our consultants, not a marketing team.</p>

            <p style="color: rgba(255,255,255,0.5); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 12px;">What you'll receive</p>

            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                  <span style="color: #14AAA9; font-weight: 700;">📋</span>
                  <span style="color: rgba(255,255,255,0.85); font-size: 14px; margin-left: 8px;">ISO certification trends & regulatory changes</span>
                </td>
              </tr>
              <tr><td style="height: 6px;"></td></tr>
              <tr>
                <td style="padding: 10px 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                  <span style="color: #14AAA9; font-weight: 700;">🔒</span>
                  <span style="color: rgba(255,255,255,0.85); font-size: 14px; margin-left: 8px;">Cybersecurity best practices for UK businesses</span>
                </td>
              </tr>
              <tr><td style="height: 6px;"></td></tr>
              <tr>
                <td style="padding: 10px 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                  <span style="color: #14AAA9; font-weight: 700;">🤖</span>
                  <span style="color: rgba(255,255,255,0.85); font-size: 14px; margin-left: 8px;">AI governance & EU AI Act updates</span>
                </td>
              </tr>
              <tr><td style="height: 6px;"></td></tr>
              <tr>
                <td style="padding: 10px 16px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                  <span style="color: #14AAA9; font-weight: 700;">✅</span>
                  <span style="color: rgba(255,255,255,0.85); font-size: 14px; margin-left: 8px;">Practical compliance guides & checklists</span>
                </td>
              </tr>
            </table>

            <div style="text-align: center; margin-top: 28px;">
              <a href="https://pixelettecertified.com/blog" style="display: inline-block; background: #14AAA9; color: #ffffff; text-decoration: none; padding: 12px 32px; border-radius: 8px; font-weight: 600; font-size: 14px;">Read Our Latest Articles →</a>
            </div>
          </div>

          <div style="background: #032e2f; padding: 20px 32px; text-align: center; border-top: 1px solid rgba(20,170,169,0.15);">
            <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin: 0;">Pixelette Certified, Compliance. Governance. Cyber Trust.</p>
            <p style="color: rgba(255,255,255,0.2); font-size: 11px; margin: 6px 0 0;">You can unsubscribe at any time by replying to this email.</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
