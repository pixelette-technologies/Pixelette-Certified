import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import PrivacyChoices from "@/components/privacy/PrivacyChoices";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Pixelette Certified uses, protects and manages personal information across this website and our work.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: `${SITE_CONFIG.url}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <article className="py-16 lg:py-24">
      <div className="wrap max-w-[820px]">
        <div className="mb-8">
          <Breadcrumbs items={[{ name: "Privacy Policy" }]} />
        </div>
        <h1 className="h1p mb-4">Privacy statement</h1>
        <p className="small mb-4">Effective 12 October 2026 · Version 1.0</p>
        <p className="body mb-12 text-body">
          How Pixelette Certified uses, protects and manages personal information across this website and
          our work.
        </p>

        <div className="space-y-10 leading-relaxed text-body">
          <section>
            <h2 className="h3 mb-3">About this statement, and about us</h2>
            <p>
              This statement explains what Pixelette Certified does with personal information: what we
              collect, why we are allowed to hold it, who else handles it, how long we keep it and what you
              can require of us. It covers {SITE_CONFIG.url.replace("https://", "")} and the ordinary course
              of dealing with us as a client, supplier or contact.
            </p>
            <p className="mt-3">
              {SITE_CONFIG.legalEntity} is the controller for the information described here. We are
              registered in {SITE_CONFIG.jurisdiction} under company number {SITE_CONFIG.companyNumber}, with
              our registered office at {SITE_CONFIG.address}.
            </p>
            <p className="mt-3">
              For anything in this statement, or about your information generally, write to{" "}
              <a href={`mailto:${SITE_CONFIG.email}`} className="link">
                {SITE_CONFIG.email}
              </a>
              . A person reads that address.
            </p>
            <p className="mt-3">
              This statement does not cover information we handle on a client&apos;s behalf while delivering
              an engagement. In that work the client decides what happens to it, and we act on their
              instructions. That arrangement is described under{" "}
              <a href="#work-we-do-for-clients" className="link">
                work we do for clients
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="h3 mb-3">Information we collect</h2>
            <p>
              We would rather hold less than more. The list below is short because the site is built that
              way, not because it has been summarised.
            </p>

            <h3 className="h4 mt-6 mb-2 text-brand">What you give us</h3>
            <p>
              If you complete the enquiry form we receive your first and last name, your email address, your
              company or organisation name, what you are working towards, where the requirement applies, what
              has prompted it, and your description of the requirement. If you choose to give them, we also
              receive your role and any document you attach (for example a questionnaire, tender clause or
              requirement note). We record that you confirmed the privacy notice, which version of it you
              saw, and when you confirmed it. If you separately opt in to occasional compliance insights, we
              record that choice and when you made it.
            </p>
            <p className="mt-3">
              This site also has an assistant, Pix C, that answers questions from the pages we publish. Pix C
              does not use a language model: replies are selected from published page copy in your browser.
              When you use Pix C we collect the name and work email address you enter so the team can follow
              up. The conversation itself is held only in your browser session and is cleared when you
              reload. Where you choose to send an enquiry through Pix C, we also hold your answers to the
              discovery questions (what you are working towards, what exists today, whether there is a
              deadline, what success would look like, and optionally your company) and we score that
              completed enquiry on the server so the team can prioritise follow-up. Scoring does not decide
              whether you receive a reply.
            </p>
            <p className="mt-3">
              If you subscribe for occasional compliance insights on the Insights pages, we receive the email
              address you give and your confirmation that you want those updates.
            </p>
            <p className="mt-3">
              If you email or call us instead, we have whatever you put in that message and whatever follows
              in the conversation. As a client or supplier, we hold the business contact details and
              correspondence needed to run the engagement: the people we deal with, what was agreed,
              invoices and the ordinary record of the work.
            </p>

            <h3 className="h4 mt-6 mb-2 text-brand">What the site generates</h3>
            <p>
              Serving a web page involves your device asking our host for it, and our host keeps short-lived
              operational records of those requests in order to serve the site and defend it from abuse. We
              do not build those records into a profile and we do not connect them to an enquiry.
            </p>
            <p className="mt-3">
              To stop the enquiry form and the assistant being flooded, the server counts recent submissions
              from each network address in short-lived memory. We do not store your IP address, browser or
              device alongside your enquiry. Bot protection may check a submission token when you send a form
              or start a chat.
            </p>
            <p className="mt-3">
              What the site does with analytics is described under{" "}
              <a href="#analytics-cookies" className="link">
                analytics, cookies and your privacy choices
              </a>
              .
            </p>

            <h3 className="h4 mt-6 mb-2 text-brand">Please do not send more than you need to</h3>
            <p>
              The enquiry form and the assistant are for telling us about a compliance, assurance or
              governance requirement. Please do not use them to send passwords, health or other
              special-category information, or personal information about people who are not expecting it.
              If a conversation genuinely needs confidential material, we will agree a proper route for it
              first.
            </p>

            <h3 className="h4 mt-6 mb-2 text-brand">Recruitment and events</h3>
            <p>
              If you apply for a role with Pixelette Certified, we may process the information you provide as
              part of your application, together with information reasonably required to assess it and,
              where relevant, to complete pre-employment checks.
            </p>
            <p className="mt-3">
              If you register for an event, webinar, briefing or other session we organise, we may process
              your registration details and, where relevant, information about your attendance.
            </p>

            <h3 className="h4 mt-6 mb-2 text-brand">Social media</h3>
            <p>
              We link to our LinkedIn and X (Twitter) pages. Those are ordinary links: there is no social
              plug-in, embed, share button or advertising pixel on this site, so visiting a page here tells
              no social network anything about you. If you follow a link and interact with us there, that
              platform&apos;s own terms and privacy notice apply, and we see only what the platform shows us.
            </p>

            <h3 className="h4 mt-6 mb-2 text-brand">Business development and marketing</h3>
            <p>
              We may use business contact information given to us directly, or obtained from appropriate
              public, professional or business sources, to identify organisations and people who may have a
              legitimate interest in our services.
            </p>
            <p className="mt-3">
              Where personal information is involved, we process it in line with data protection and
              electronic marketing law. Occasional compliance insights and service updates are sent only
              where you have opted in. You can object to direct marketing at any time and we will respect
              that. We do not sell personal information, and we do not share it with third parties for their
              own marketing.
            </p>
          </section>

          <section>
            <h2 className="h3 mb-3">How and why we use information</h2>
            <p>For each thing we do, the lawful basis we rely on:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong className="font-semibold text-ink">Reading and answering your enquiry:</strong> your
                consent, given when you confirm the privacy notice on the form, or our legitimate interest in
                replying to a business enquiry you chose to send us (including through Pix C or by email).
              </li>
              <li>
                <strong className="font-semibold text-ink">
                  Scoping work and taking steps towards a contract at your request:
                </strong>{" "}
                steps taken before entering into a contract.
              </li>
              <li>
                <strong className="font-semibold text-ink">
                  Delivering and administering an engagement, including invoicing:
                </strong>{" "}
                performance of our contract with you or your organisation.
              </li>
              <li>
                <strong className="font-semibold text-ink">
                  Keeping a record of what was asked and answered:
                </strong>{" "}
                our legitimate interest in an accurate record of our business dealings.
              </li>
              <li>
                <strong className="font-semibold text-ink">
                  Keeping the website available and preventing abuse of the form and assistant:
                </strong>{" "}
                our legitimate interest in the security of our own systems.
              </li>
              <li>
                <strong className="font-semibold text-ink">Measuring how the website is used:</strong> our
                legitimate interest in improving the site, subject to the choice you make in{" "}
                <a href="#analytics-cookies" className="link">
                  Privacy choices
                </a>
                .
              </li>
              <li>
                <strong className="font-semibold text-ink">
                  Sending occasional compliance insights you asked for:
                </strong>{" "}
                your consent.
              </li>
              <li>
                <strong className="font-semibold text-ink">
                  Meeting tax, accounting and other legal obligations:
                </strong>{" "}
                compliance with a legal obligation.
              </li>
            </ul>
            <p className="mt-3">
              Where we rely on legitimate interests we have weighed them against your interests, and you can
              object. See{" "}
              <a href="#your-rights" className="link">
                your rights
              </a>
              .
            </p>
            <p className="mt-3">
              No decision with legal or similarly significant effects is made about you by automated means.
              Whether we reply, what we say and whether we propose working together are decisions made by
              people. Pix C helps collect and score an enquiry; a person decides what happens next.
            </p>
          </section>

          <section id="analytics-cookies">
            <h2 className="h3 mb-3">Analytics, cookies and your privacy choices</h2>
            <p>
              We use Google Analytics 4 and Ahrefs Web Analytics to understand how the website is used, so we
              can improve its content and performance. Google Analytics sets first-party analytics cookies.
              Ahrefs Web Analytics does not use cookies. Neither service is used to identify you as a person
              or to match website behaviour to an enquiry or CRM record.
            </p>
            <p className="mt-3">
              Analytics run unless you switch them off. Google&apos;s advertising and ad personalisation
              features are switched off, and we never send your name, email address or enquiry details to
              Google Analytics or Ahrefs. We run no remarketing, no session recording or heatmaps and no
              profiling of individual visitors.
            </p>

            <h3 className="h4 mt-6 mb-2 text-brand">Your privacy choices</h3>
            <p>
              <strong className="font-semibold text-ink">Privacy choices</strong>, in the footer of every
              page, lets you switch website analytics on or off at any time. Switching analytics off also
              removes the Google Analytics cookies an earlier visit left behind, and stops both services from
              loading.
            </p>
            <p className="mt-3">
              So that we can respect your answer, we store one preference in your browser&apos;s local
              storage: <strong className="font-semibold text-ink">pc-analytics</strong>, holding either on or
              off. It contains no identifier and is never sent to us. Pix C does not store conversation state
              in cookies or local storage. Our{" "}
              <Link href="/cookie-policy" className="link">
                Cookie Policy
              </Link>{" "}
              lists every cookie and storage item involved and how long it lasts.
            </p>
            <div className="mt-4">
              <PrivacyChoices />
            </div>
          </section>

          <section>
            <h2 className="h3 mb-3">Who else handles it, and where it goes</h2>
            <p>
              Your enquiry is read by the people here who need to answer it. Beyond that, we may share
              information with the following categories of recipients, only as needed for the purpose:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                Service providers that host the website, store enquiries and attachments, deliver email, protect
                the form and assistant from abuse. Pix C&apos;s answers are selected from published pages in
                your browser and are not generated by a language-model provider.
              </li>
              <li>
                Analytics providers, only as described under analytics, cookies and your privacy choices.
              </li>
              <li>
                Specialist practitioners and selected specialist partners within our delivery network, where
                they are involved in responding to your enquiry or delivering an engagement. They receive only
                the information they need.
              </li>
              <li>
                Independent third parties involved in an engagement at your request, for example certification
                bodies or audit firms.
              </li>
              <li>
                Professional advisers, and a regulator or other body where the law requires it.
              </li>
            </ul>
            <p className="mt-3">
              Once an enquiry reaches us, our email is carried by our mailbox provider in the ordinary way of
              any business correspondence. Where a provider processes personal information on our behalf, we
              put appropriate contractual terms in place and limit access to what is needed for the purpose.
              If you are assessing us as a supplier and need the contractual position or the current list of
              processors in writing, ask and we will send it to your reviewer.
            </p>

            <h3 className="h4 mt-6 mb-2 text-brand">Transfers out of the United Kingdom</h3>
            <p>
              We have not restricted the regions in which these providers process information, so you should
              assume your information may be handled outside the United Kingdom, including in the United
              States. Under UK data protection law that is a restricted transfer and it needs a safeguard.
              The safeguard is in each provider&apos;s data processing terms: the European Commission&apos;s
              standard contractual clauses together with the UK Addendum that adapts them for UK transfers,
              or the UK&apos;s own recognised transfer mechanisms where a provider relies on them.
            </p>
          </section>

          <section>
            <h2 className="h3 mb-3">Security</h2>
            <p>
              The site is served over an encrypted connection, enquiries are encrypted in transit, and access
              to them is limited to the people who need it. The form checks where a submission came from,
              limits how often it can be sent, rejects oversized or malformed requests, and holds attached
              documents in access-controlled storage.
            </p>
            <p className="mt-3">
              Nobody can promise a system is impossible to break into, and we are not going to. What we can
              tell you is what we do, which is above, and that if something went wrong and your information
              were affected, we would tell you and the regulator where the law requires it.
            </p>
          </section>

          <section>
            <h2 className="h3 mb-3">How long we keep it</h2>
            <p>
              We keep an enquiry for 24 months from the last time we were in contact with you about it, and
              then delete it. If nothing follows your first message, the clock starts there. The same period
              applies to any document you attach and to Pix C enquiries and leads that form part of an
              enquiry. Deleting is something we do, not something a machine does on a timer alone for every
              record, and we would rather tell you that than leave you picturing an automatic expiry that does
              not exist. If you think we are holding something past it, say so and we will check.
            </p>
            <p className="mt-3">
              You do not have to wait. Ask us to delete your enquiry at any point and we will, without asking
              why. Where we have worked together, the record becomes part of the client file and is kept for
              the engagement and for six years afterwards, which is the period we may need it for legal and
              tax purposes.
            </p>
          </section>

          <section id="work-we-do-for-clients">
            <h2 className="h3 mb-3">Work we do for clients</h2>
            <p>
              Compliance, assurance and governance work often involves personal information belonging to our
              clients&apos; own people, customers or suppliers: employee lists, access records, evidence
              packs and similar material. In that work the client is the controller and we are the processor.
              They decide what the information is for and what may be done with it, and we act on their
              documented instructions under the data processing terms in our contract with them.
            </p>
            <p className="mt-3">
              This statement does not govern that information and we are not the right people to ask about
              it. If you are a customer or employee of one of our clients and want to know what is held about
              you, or to exercise a right over it, approach that organisation. If a request reaches us
              instead we will pass it to them rather than act on it ourselves, because acting on it is
              exactly what a processor must not do.
            </p>
          </section>

          <section id="your-rights">
            <h2 className="h3 mb-3">Your rights</h2>
            <p>
              Under UK data protection law you may ask us for a copy of the personal information we hold
              about you, have inaccurate information corrected, have information deleted, ask us to restrict
              how we use it, and receive it in a portable form where that applies.
            </p>
            <p className="mt-3">
              Where we rely on our legitimate interests you have the right to object, and we will stop unless
              we have compelling grounds to continue. Where we rely on your consent you can withdraw it at
              any time, which does not affect anything done before you did. The right to object to direct
              marketing is absolute and is set out under business development and marketing.
            </p>
            <p className="mt-3">
              To exercise any of these, email{" "}
              <a href={`mailto:${SITE_CONFIG.email}`} className="link">
                {SITE_CONFIG.email}
              </a>
              . We will respond within one month and there is no charge. We may ask you to confirm who you
              are before we release information, which protects you rather than us.
            </p>
          </section>

          <section>
            <h2 className="h3 mb-3">Complaints</h2>
            <p>
              If you are unhappy with how we have handled your information, tell us first at{" "}
              <a href={`mailto:${SITE_CONFIG.email}`} className="link">
                {SITE_CONFIG.email}
              </a>{" "}
              so that we can put it right. We will acknowledge your complaint within 30 days, look into it
              and report the outcome.
            </p>
            <p className="mt-3">
              You also have the right to complain to the Information Commissioner&apos;s Office, the UK
              supervisory authority, at{" "}
              <a
                href="https://ico.org.uk"
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                ico.org.uk
              </a>{" "}
              or on 0303 123 1113. You do not have to come to us first, though we would rather you did.
            </p>
          </section>

          <section>
            <h2 className="h3 mb-3">Children</h2>
            <p>
              This is a business website and our services are sold to organisations. It is not directed at
              children and we do not knowingly collect information about them. If you believe a child has
              sent us something, tell us and we will delete it.
            </p>
          </section>

          <section>
            <h2 className="h3 mb-3">Links to other sites</h2>
            <p>
              We link to our social media pages, to other Pixelette Group companies and to sources we cite.
              Those sites have their own privacy practices and this statement does not extend to them.
            </p>
          </section>

          <section>
            <h2 className="h3 mb-3">Changes to this statement</h2>
            <p>
              We review this statement when what we do with personal information changes, and at least once a
              year. The effective date and version are at the top of this page. Where a change materially
              affects you we will say so, rather than leaving you to notice a new date.
            </p>
          </section>

          <section>
            <h2 className="h3 mb-3">Contact</h2>
            <p>
              Pixelette Certified
              <br />
              {SITE_CONFIG.address}
              <br />
              Registered in {SITE_CONFIG.jurisdiction}, company number {SITE_CONFIG.companyNumber}
              <br />
              <a href={`mailto:${SITE_CONFIG.email}`} className="link">
                {SITE_CONFIG.email}
              </a>
            </p>
            <p className="mt-3">
              We have not appointed a statutory data protection officer, because we are not required to.
              Privacy questions go to the address above and are answered by a person.
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
