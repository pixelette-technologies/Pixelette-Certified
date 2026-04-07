import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Pixelette Certified collects, uses, and protects your personal data under UK GDPR.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://pixelettecertified.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <article className="py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold gradient-text-white tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-gray-400 mb-12">Last updated: 1 April 2026</p>

        <div className="prose-custom space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Who We Are</h2>
            <p>
              Pixelette Certified is a trading name of Pixelette Group Ltd, registered in England and Wales.
              We are a UK-based ISO certification and compliance consultancy. For the purposes of UK GDPR,
              Pixelette Group Ltd is the data controller.
            </p>
            <p className="mt-2">
              <strong className="text-white">Email:</strong>{" "}
              <a href="mailto:privacy@pixelettecertified.com" className="text-accent hover:text-accent-light transition-colors">
                privacy@pixelettecertified.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. What Data We Collect</h2>
            <p>We collect the following personal data when you interact with our website:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong className="text-white">Contact form submissions:</strong> name, email address, company name, phone number, service interest, and message content.</li>
              <li><strong className="text-white">Live chat interactions:</strong> messages exchanged with our website chat assistant. Chat messages are processed in your browser session only and are not stored on our servers.</li>
              <li><strong className="text-white">Website analytics:</strong> anonymised usage data including pages visited, time on site, referral source, and device type (via Vercel Analytics or Google Analytics 4).</li>
              <li><strong className="text-white">Cookies:</strong> essential cookies for site functionality and optional analytics cookies. See our <Link href="/cookie-policy" className="text-accent hover:text-accent-light transition-colors">Cookie Policy</Link> for details.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. How We Use Your Data</h2>
            <p>We use your personal data for the following purposes:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>To respond to your contact form enquiry and provide information about our services.</li>
              <li>To schedule and conduct gap analysis consultations.</li>
              <li>To send follow-up communications related to your enquiry (not unsolicited marketing).</li>
              <li>To improve our website and services based on anonymised analytics.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Legal Basis for Processing</h2>
            <p>We process your personal data under the following legal bases (UK GDPR Article 6):</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong className="text-white">Consent (Article 6(1)(a)):</strong> when you submit a contact form with the consent checkbox selected.</li>
              <li><strong className="text-white">Legitimate interests (Article 6(1)(f)):</strong> to respond to enquiries, improve our services, and maintain website security.</li>
              <li><strong className="text-white">Contract performance (Article 6(1)(b)):</strong> when processing is necessary to provide services you have engaged us for.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Data Sharing</h2>
            <p>
              We do not sell your personal data. We may share your data with the following categories of
              third parties, only as necessary to deliver our services:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Cloud hosting providers (Vercel) for website delivery.</li>
              <li>Email service providers for responding to enquiries.</li>
              <li>Analytics providers (anonymised data only).</li>
              <li>Professional advisors (legal, accounting) where required by law.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Data Retention</h2>
            <p>
              Contact form submissions are retained for 24 months from the date of submission, after which
              they are securely deleted. If you become a client, your data is retained for the duration of the
              engagement plus 6 years for legal and regulatory compliance.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Your Rights</h2>
            <p>Under UK GDPR, you have the following rights:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong className="text-white">Right of access</strong>, request a copy of your personal data.</li>
              <li><strong className="text-white">Right to rectification</strong>, request correction of inaccurate data.</li>
              <li><strong className="text-white">Right to erasure</strong>, request deletion of your data.</li>
              <li><strong className="text-white">Right to restrict processing</strong>, request limitation of how we use your data.</li>
              <li><strong className="text-white">Right to data portability</strong>, receive your data in a structured format.</li>
              <li><strong className="text-white">Right to object</strong>, object to processing based on legitimate interests.</li>
              <li><strong className="text-white">Right to withdraw consent</strong>, withdraw consent at any time without affecting prior processing.</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, email{" "}
              <a href="mailto:privacy@pixelettecertified.com" className="text-accent hover:text-accent-light transition-colors">
                privacy@pixelettecertified.com
              </a>.
              We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. International Transfers</h2>
            <p>
              Your data is primarily stored and processed within the United Kingdom and European Economic Area.
              Where data is transferred outside the UK/EEA (e.g. to cloud providers with US infrastructure),
              we ensure appropriate safeguards are in place, including Standard Contractual Clauses (SCCs).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">9. Security</h2>
            <p>
              We implement appropriate technical and organisational measures to protect your personal data,
              including encryption in transit (TLS), access controls, and regular security reviews. As an
              ISO 27001 certified practice, information security is fundamental to how we operate.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">10. Complaints</h2>
            <p>
              If you are not satisfied with how we handle your data, you have the right to lodge a complaint
              with the Information Commissioner&apos;s Office (ICO):
            </p>
            <p className="mt-2">
              Information Commissioner&apos;s Office<br />
              Wycliffe House, Water Lane, Wilmslow, Cheshire SK9 5AF<br />
              Telephone: 0303 123 1113<br />
              Website: ico.org.uk
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">11. Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. Material changes will be communicated via our
              website. The &ldquo;Last updated&rdquo; date at the top of this page indicates the most recent revision.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
