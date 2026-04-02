import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How Pixelette Certified uses cookies and similar technologies on our website.",
  robots: { index: true, follow: true },
};

export default function CookiePolicyPage() {
  return (
    <article className="py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold gradient-text-white tracking-tight mb-4">
          Cookie Policy
        </h1>
        <p className="text-gray-400 mb-12">Last updated: 1 April 2026</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. What Are Cookies</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. They help the
              website remember your preferences and understand how you interact with the site. We use cookies
              and similar technologies to ensure our website functions correctly and to improve your experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Cookies We Use</h2>

            <h3 className="text-lg font-semibold text-accent mt-4 mb-2">Essential Cookies</h3>
            <p>
              These cookies are necessary for the website to function and cannot be switched off. They are
              usually set in response to actions you take, such as setting your privacy preferences or
              filling in forms. You can set your browser to block these cookies, but some parts of the site
              may not function as a result.
            </p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm border border-white/10 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-white/5">
                    <th className="text-left px-4 py-2 font-semibold text-white">Cookie</th>
                    <th className="text-left px-4 py-2 font-semibold text-white">Purpose</th>
                    <th className="text-left px-4 py-2 font-semibold text-white">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="px-4 py-2 text-accent">__next_*</td>
                    <td className="px-4 py-2">Next.js framework session and routing</td>
                    <td className="px-4 py-2">Session</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-accent">cookie_consent</td>
                    <td className="px-4 py-2">Stores your cookie consent preference</td>
                    <td className="px-4 py-2">12 months</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-semibold text-accent mt-6 mb-2">Analytics Cookies</h3>
            <p>
              These cookies help us understand how visitors interact with our website by collecting and
              reporting information anonymously. We use this data to improve our site.
            </p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm border border-white/10 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-white/5">
                    <th className="text-left px-4 py-2 font-semibold text-white">Cookie</th>
                    <th className="text-left px-4 py-2 font-semibold text-white">Purpose</th>
                    <th className="text-left px-4 py-2 font-semibold text-white">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="px-4 py-2 text-accent">_ga, _ga_*</td>
                    <td className="px-4 py-2">Google Analytics 4 — anonymised usage tracking</td>
                    <td className="px-4 py-2">2 years</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-accent">va_*</td>
                    <td className="px-4 py-2">Vercel Analytics — page performance monitoring</td>
                    <td className="px-4 py-2">Session</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Managing Cookies</h2>
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
            <h2 className="text-xl font-bold text-white mb-3">4. Third-Party Cookies</h2>
            <p>
              We do not use third-party advertising cookies. The only third-party cookies on our site are
              from analytics providers (Google Analytics and Vercel Analytics), which collect anonymised
              usage data only.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Changes to This Policy</h2>
            <p>
              We may update this cookie policy from time to time. Any changes will be posted on this page
              with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Contact Us</h2>
            <p>
              If you have questions about our use of cookies, please contact us at{" "}
              <a href="mailto:privacy@pixelettecertified.co.uk" className="text-accent hover:text-accent-light transition-colors">
                privacy@pixelettecertified.co.uk
              </a>{" "}
              or visit our{" "}
              <Link href="/privacy-policy" className="text-accent hover:text-accent-light transition-colors">
                Privacy Policy
              </Link>.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
