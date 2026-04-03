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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #044143; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #14AAA9; margin: 0; font-size: 20px;">New Newsletter Subscriber</h1>
          </div>
          <div style="background: #f8fafa; padding: 24px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="color: #333;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="color: #666; font-size: 13px;">Subscribed via pixelettecertified.com newsletter form.</p>
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
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #044143; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #14AAA9; margin: 0; font-size: 20px;">You're subscribed!</h1>
          </div>
          <div style="background: #f8fafa; padding: 24px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="color: #333; line-height: 1.6;">Thank you for subscribing to compliance insights from Pixelette Certified.</p>
            <p style="color: #333; line-height: 1.6;">You'll receive monthly updates on:</p>
            <ul style="color: #333; line-height: 1.8;">
              <li>ISO certification trends and regulatory changes</li>
              <li>Cybersecurity best practices for UK businesses</li>
              <li>AI governance and EU AI Act updates</li>
              <li>Practical compliance guides and checklists</li>
            </ul>
            <p style="color: #333; line-height: 1.6;">In the meantime, explore our latest resources:</p>
            <p><a href="https://pixelettecertified.com/blog" style="color: #14AAA9; font-weight: bold;">Read our Blog →</a></p>
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
            <p style="color: #999; font-size: 12px;">Pixelette Certified — Compliance. Governance. Cyber Trust.<br/>You can unsubscribe at any time by replying to this email.</p>
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
