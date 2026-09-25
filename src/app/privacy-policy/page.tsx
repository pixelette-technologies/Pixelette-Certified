import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { SITE_CONFIG } from "@/lib/constants";

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
    <article className="py-16 lg:py-24">
      <div className="wrap max-w-[820px]">
        <div className="mb-8">
          <Breadcrumbs items={[{ name: "Privacy Policy" }]} />
        </div>
        <h1 className="h1p mb-4">
          Privacy policy
        </h1>
        <p className="small mb-12">Last updated: 25 September 2026</p>

        <div className="space-y-10 leading-relaxed text-body">
          <section>
            <h2 className="h3 mb-3">1. Who we are</h2>
            <p>
              Pixelette Certified is a trading name of {SITE_CONFIG.legalEntity}, registered in{" "}
              {SITE_CONFIG.jurisdiction} under company number {SITE_CONFIG.companyNumber}. We are a
              UK-headquartered cyber security, compliance, assurance and AI governance consultancy. For the
              purposes of UK GDPR, {SITE_CONFIG.legalEntity} is the data controller.
            </p>
            <p className="mt-2">
              <strong className="font-semibold text-ink">Email:</strong>{" "}
              <a href="mailto:privacy@pixelettecertified.com" className="link">
                privacy@pixelettecertified.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="h3 mb-3">2. What data we collect</h2>
            <p>We collect the following personal data when you interact with our website:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong className="font-semibold text-ink">Contact form submissions:</strong> first and last name, work email address, company name, your role if you give it, what you are working towards, where the requirement applies, what prompted it, and your message.</li>
              <li><strong className="font-semibold text-ink">Documents you choose to attach:</strong> if you attach a questionnaire, tender clause, customer email or requirement document, we store that file in access-controlled storage. Only our team can retrieve it. Attaching a document is entirely optional and your enquiry is treated the same way without one.</li>
              <li><strong className="font-semibold text-ink">Live chat interactions:</strong> the name and email address you enter, and the messages exchanged with our website chat assistant. Conversations are stored on our systems so that a conversation can continue across visits and so that our team can follow up on your enquiry. Messages are sent to our AI provider to generate the assistant&apos;s replies.</li>
              <li><strong className="font-semibold text-ink">Website analytics:</strong> usage data including pages visited, time on site, referral source, and device type (via Google Analytics 4 and Ahrefs Web Analytics). You can switch analytics off at any time using Privacy choices in the website footer.</li>
              <li><strong className="font-semibold text-ink">Cookies:</strong> optional analytics cookies set by Google Analytics 4, and browser storage that remembers your privacy choice and your conversation with our chat assistant. See our <Link href="/cookie-policy" className="link">Cookie Policy</Link> for details.</li>
            </ul>
          </section>

          <section>
            <h2 className="h3 mb-3">3. How we use your data</h2>
            <p>We use your personal data for the following purposes:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>To respond to your contact form enquiry and provide information about our services.</li>
              <li>To arrange and hold conversations about your requirements with appropriate specialists.</li>
              <li>To send follow-up communications related to your enquiry (not unsolicited marketing).</li>
              <li>To send occasional compliance insights and service updates, but only where you have separately opted in. That opt-in is a distinct choice from consenting to us responding to your enquiry, and you can withdraw it at any time without affecting the enquiry itself.</li>
              <li>To improve our website and services based on website analytics.</li>
            </ul>
          </section>

          <section>
            <h2 className="h3 mb-3">4. Legal basis for processing</h2>
            <p>We process your personal data under the following legal bases (UK GDPR Article 6):</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong className="font-semibold text-ink">Consent (Article 6(1)(a)):</strong> when you submit a contact form with the consent checkbox selected.</li>
              <li><strong className="font-semibold text-ink">Legitimate interests (Article 6(1)(f)):</strong> to respond to enquiries, improve our services, and maintain website security.</li>
              <li><strong className="font-semibold text-ink">Contract performance (Article 6(1)(b)):</strong> when processing is necessary to provide services you have engaged us for.</li>
            </ul>
          </section>

          <section>
            <h2 className="h3 mb-3">5. Data sharing</h2>
            <p>
              We do not sell your personal data. We may share your data with the following categories of
              third parties, only as necessary to deliver our services:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Specialist practitioners and selected specialist partners within our delivery network, where they are involved in responding to your enquiry or delivering an engagement. They receive only the information they need.</li>
              <li>Service providers that process data on our behalf, including website hosting, database and file storage, email delivery, bot protection, and the AI provider that powers our chat assistant.</li>
              <li>Analytics providers (Google Analytics and Ahrefs Web Analytics), where you have not switched analytics off.</li>
              <li>Independent third parties involved in an engagement at your request, for example certification bodies or audit firms.</li>
              <li>Professional advisers (legal, accounting) and authorities, where required by law.</li>
            </ul>
            <p className="mt-2">
              Where a provider or practitioner processes personal data on our behalf, we put appropriate
              contractual terms in place and limit access to what is needed for the purpose. Where a client
              engagement carries its own contractual requirements for data handling, those apply in addition.
            </p>
          </section>

          <section>
            <h2 className="h3 mb-3">6. Data retention</h2>
            <p>
              Contact form submissions are retained for 24 months from the date of submission, after which
              they are securely deleted. Any document you attach is held under the same 24-month limit and is
              deleted on the same schedule. If you become a client, your data is retained for the duration of
              the engagement plus 6 years for legal and regulatory compliance.
            </p>
          </section>

          <section>
            <h2 className="h3 mb-3">7. Your rights</h2>
            <p>Under UK GDPR, you have the following rights:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong className="font-semibold text-ink">Right of access:</strong> request a copy of your personal data.</li>
              <li><strong className="font-semibold text-ink">Right to rectification:</strong> request correction of inaccurate data.</li>
              <li><strong className="font-semibold text-ink">Right to erasure:</strong> request deletion of your data.</li>
              <li><strong className="font-semibold text-ink">Right to restrict processing:</strong> request limitation of how we use your data.</li>
              <li><strong className="font-semibold text-ink">Right to data portability:</strong> receive your data in a structured format.</li>
              <li><strong className="font-semibold text-ink">Right to object:</strong> object to processing based on legitimate interests.</li>
              <li><strong className="font-semibold text-ink">Right to withdraw consent:</strong> withdraw consent at any time without affecting prior processing.</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, email{" "}
              <a href="mailto:privacy@pixelettecertified.com" className="link">
                privacy@pixelettecertified.com
              </a>.
              We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="h3 mb-3">8. International transfers</h2>
            <p>
              Some of our service providers, and some practitioners within our specialist delivery network,
              are located or process data outside the United Kingdom. Where personal data is transferred
              outside the UK, we rely on an appropriate transfer mechanism, such as UK adequacy regulations,
              the International Data Transfer Agreement or the UK Addendum to the EU Standard Contractual
              Clauses, together with any supplementary measures that are needed. Access from outside the UK is
              controlled and limited to what is needed for the purpose.
            </p>
          </section>

          <section>
            <h2 className="h3 mb-3">9. Security</h2>
            <p>
              We use appropriate technical and organisational measures to protect your personal data,
              including encryption in transit, access controls based on need to know, and secure handling of
              any documents you send us.
            </p>
          </section>

          <section>
            <h2 className="h3 mb-3">10. Complaints</h2>
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
            <h2 className="h3 mb-3">11. Changes to this policy</h2>
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
