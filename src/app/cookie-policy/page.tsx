import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How Pixelette Certified uses cookies and similar technologies on our website.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://pixelettecertified.com/cookie-policy",
  },
};

export default function CookiePolicyPage() {
  return (
    <article className="py-16 lg:py-24">
      <div className="wrap max-w-[820px]">
        <div className="mb-8">
          <Breadcrumbs items={[{ name: "Cookie Policy" }]} />
        </div>
        <h1 className="h1p mb-4">
          Cookie policy
        </h1>
        <p className="small mb-12">Last updated: 18 September 2026</p>

        <div className="space-y-10 leading-relaxed text-body">
          <section>
            <h2 className="h3 mb-3">1. What are cookies</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. They help the
              website remember your preferences and understand how you interact with the site. We use cookies
              and similar technologies to ensure our website functions correctly and to improve your experience.
            </p>
          </section>

          <section>
            <h2 className="h3 mb-3">2. Cookies and storage we use</h2>

            <h3 className="h4 mt-4 mb-2 text-brand">Essential storage</h3>
            <p>
              We do not set any essential cookies. The site keeps two small items in your browser&rsquo;s local
              storage so that features you use keep working. They are not sent to us with each page request, and
              you can clear them at any time through your browser settings.
            </p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full overflow-hidden rounded-lg border border-line-card text-sm">
                <thead>
                  <tr className="bg-band">
                    <th className="px-4 py-2 text-left font-semibold text-ink">Name</th>
                    <th className="px-4 py-2 text-left font-semibold text-ink">Purpose</th>
                    <th className="px-4 py-2 text-left font-semibold text-ink">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  <tr>
                    <td className="px-4 py-2 text-brand">pc-analytics</td>
                    <td className="px-4 py-2">Remembers your website analytics choice from Privacy choices</td>
                    <td className="px-4 py-2">Until you clear it</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-brand">alice_session_id</td>
                    <td className="px-4 py-2">Links this browser to your conversation with Alice, our website assistant, so it can be resumed</td>
                    <td className="px-4 py-2">Until you clear it</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="h4 mt-6 mb-2 text-brand">Website analytics</h3>
            <p>
              We use analytics to understand how our website is used and to improve its performance and
              content. Analytics are on unless you switch them off using <strong className="font-semibold text-ink">Privacy
              choices</strong> in the footer of any page. When they are off, neither service below is loaded.
            </p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full overflow-hidden rounded-lg border border-line-card text-sm">
                <thead>
                  <tr className="bg-band">
                    <th className="px-4 py-2 text-left font-semibold text-ink">Service</th>
                    <th className="px-4 py-2 text-left font-semibold text-ink">Cookies</th>
                    <th className="px-4 py-2 text-left font-semibold text-ink">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  <tr>
                    <td className="px-4 py-2 text-brand">Google Analytics 4</td>
                    <td className="px-4 py-2">
                      <code>_ga</code> distinguishes visitors; <code>_ga_*</code> keeps session state. Both are
                      first-party cookies set on our domain.
                    </td>
                    <td className="px-4 py-2">Up to 2 years</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-brand">Ahrefs Web Analytics</td>
                    <td className="px-4 py-2">None. Ahrefs counts visits without cookies or stored identifiers.</td>
                    <td className="px-4 py-2">Not applicable</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="h3 mb-3">3. Managing your choices</h2>
            <p>
              Use <strong className="font-semibold text-ink">Privacy choices</strong> in the footer to switch
              website analytics on or off. Your choice is saved in this browser and applies straight away:
              switching off stops both services and deletes the Google Analytics cookies.
            </p>
            <p className="mt-2">
              You can also control and delete cookies and local storage through your browser settings. Most
              browsers allow you to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>View what cookies are stored and delete them individually.</li>
              <li>Block third-party cookies.</li>
              <li>Block cookies from specific sites.</li>
              <li>Block all cookies from being set.</li>
              <li>Delete all cookies when you close your browser.</li>
            </ul>
          </section>

          <section>
            <h2 className="h3 mb-3">4. Advertising</h2>
            <p>
              We do not use advertising or remarketing cookies. Google&rsquo;s advertising features, including
              Google signals and ad personalisation, are switched off for our analytics.
            </p>
          </section>

          <section>
            <h2 className="h3 mb-3">5. Changes to this policy</h2>
            <p>
              We may update this cookie policy from time to time. Any changes will be posted on this page
              with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="h3 mb-3">6. Contact us</h2>
            <p>
              If you have questions about our use of cookies, please contact us at{" "}
              <a href="mailto:privacy@pixelettecertified.com" className="link">
                privacy@pixelettecertified.com
              </a>{" "}
              or visit our{" "}
              <Link href="/privacy-policy" className="link">
                Privacy Policy
              </Link>.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
