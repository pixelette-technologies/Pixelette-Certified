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
        <p className="small mb-12">Last updated: 1 April 2026</p>

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
            <h2 className="h3 mb-3">2. Cookies we use</h2>

            <h3 className="h4 mt-4 mb-2 text-brand">Essential cookies</h3>
            <p>
              These cookies are necessary for the website to function and cannot be switched off. They are
              usually set in response to actions you take, such as setting your privacy preferences or
              filling in forms. You can set your browser to block these cookies, but some parts of the site
              may not function as a result.
            </p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full overflow-hidden rounded-lg border border-line-card text-sm">
                <thead>
                  <tr className="bg-band">
                    <th className="px-4 py-2 text-left font-semibold text-ink">Cookie</th>
                    <th className="px-4 py-2 text-left font-semibold text-ink">Purpose</th>
                    <th className="px-4 py-2 text-left font-semibold text-ink">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  <tr>
                    <td className="px-4 py-2 text-brand">__next_*</td>
                    <td className="px-4 py-2">Next.js framework session and routing</td>
                    <td className="px-4 py-2">Session</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-brand">cookie_consent</td>
                    <td className="px-4 py-2">Stores your cookie consent preference</td>
                    <td className="px-4 py-2">12 months</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="h4 mt-6 mb-2 text-brand">Analytics cookies</h3>
            <p>
              These cookies help us understand how visitors interact with our website by collecting and
              reporting information anonymously. We use this data to improve our site.
            </p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full overflow-hidden rounded-lg border border-line-card text-sm">
                <thead>
                  <tr className="bg-band">
                    <th className="px-4 py-2 text-left font-semibold text-ink">Cookie</th>
                    <th className="px-4 py-2 text-left font-semibold text-ink">Purpose</th>
                    <th className="px-4 py-2 text-left font-semibold text-ink">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  <tr>
                    <td className="px-4 py-2 text-brand">_ga, _ga_*</td>
                    <td className="px-4 py-2">Google Analytics 4, anonymised usage tracking</td>
                    <td className="px-4 py-2">2 years</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-brand">va_*</td>
                    <td className="px-4 py-2">Vercel Analytics, page performance monitoring</td>
                    <td className="px-4 py-2">Session</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="h3 mb-3">3. Managing cookies</h2>
            <p>
              You can control and delete cookies through your browser settings. Most browsers allow you to:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>View what cookies are stored and delete them individually.</li>
              <li>Block third-party cookies.</li>
              <li>Block cookies from specific sites.</li>
              <li>Block all cookies from being set.</li>
              <li>Delete all cookies when you close your browser.</li>
            </ul>
            <p className="mt-2">
              Note that blocking all cookies will affect the functionality of this and many other websites.
            </p>
          </section>

          <section>
            <h2 className="h3 mb-3">4. Third-party cookies</h2>
            <p>
              We do not use third-party advertising cookies. The only third-party cookies on our site are
              from analytics providers (Google Analytics and Vercel Analytics), which collect anonymised
              usage data only.
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
