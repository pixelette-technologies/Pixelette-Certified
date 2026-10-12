import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import PrivacyChoices from "@/components/privacy/PrivacyChoices";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How Pixelette Certified uses cookies and similar technologies on pixelettecertified.com.",
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
        <h1 className="h1p mb-4">Cookie policy</h1>
        <p className="small mb-12">Last updated: 12 October 2026</p>

        <div className="space-y-10 leading-relaxed text-body">
          <section>
            <h2 className="h3 mb-3">What cookies are</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. They help sites
              work and give site owners information about how the site is used. This page also covers similar
              technologies such as local storage, which this site uses for privacy preferences and for the
              Alice assistant.
            </p>
          </section>

          <section>
            <h2 className="h3 mb-3">The cookies and storage we use</h2>
            <p>
              We use Google Analytics 4 and Ahrefs Web Analytics to understand how visitors use our site so
              we can improve it. Google Analytics sets analytics cookies. Ahrefs Web Analytics does not use
              cookies. Analytics run unless you switch them off using Privacy choices. When they are off,
              neither service is loaded, and any Google Analytics cookies left from an earlier visit are
              removed.
            </p>
            <p className="mt-3">
              We do not use advertising or profiling cookies. Google&apos;s advertising features, including
              Google signals and ad personalisation, are switched off for our analytics.
            </p>

            <h3 className="h4 mt-6 mb-2 text-brand">Analytics cookies</h3>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>
                <strong className="font-semibold text-ink">_ga and _ga_*</strong> (Google Analytics):
                distinguish unique visitors and sessions to produce aggregate usage statistics. Set by Google
                as first-party cookies on our domain and typically retained for up to two years.
              </li>
            </ul>

            <h3 className="h4 mt-6 mb-2 text-brand">Browser storage</h3>
            <p>
              We do not set any essential cookies. The site keeps two small items in your browser&apos;s
              local storage so that features you use keep working. They are not sent to us with each page
              request, and you can clear them at any time through your browser settings.
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>
                <strong className="font-semibold text-ink">pc-analytics</strong>: remembers your website
                analytics choice from Privacy choices (on or off). Held until you clear it or change the
                choice.
              </li>
              <li>
                <strong className="font-semibold text-ink">alice_session_id</strong>: links this browser to
                your conversation with Alice, our website assistant, so it can be resumed. Held until you
                clear it.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="h3 mb-3">Your choice and how to change it</h2>
            <p>
              Use <strong className="font-semibold text-ink">Privacy choices</strong> in the footer of any
              page, or the control below, to switch website analytics on or off. Your choice is saved in this
              browser and applies straight away: switching off stops both services and deletes the Google
              Analytics cookies.
            </p>
            <div className="mt-4">
              <PrivacyChoices />
            </div>
            <p className="mt-4">
              You can also control and delete cookies and local storage through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="h3 mb-3">More information</h2>
            <p>
              For more on how Google uses data from sites that use its services, see the{" "}
              <a
                href="https://policies.google.com/technologies/cookies"
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google cookie information page
              </a>
              . For your rights under UK data protection law, see the{" "}
              <a
                href="https://ico.org.uk/for-the-public/online/cookies/"
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                ICO guidance on cookies
              </a>
              . How we handle personal information more widely is in our{" "}
              <Link href="/privacy-policy" className="link">
                Privacy Policy
              </Link>
              .
            </p>
            <p className="mt-3">
              Questions about cookies can go to{" "}
              <a href={`mailto:${SITE_CONFIG.email}`} className="link">
                {SITE_CONFIG.email}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
