"use client";

import { motion } from "framer-motion";
import Certifications from "@/components/sections/Certifications";
import {
  Shield,
  Award,
  Scale,
  Users,
  Zap,
  Puzzle,
  PoundSterling,
  Brain,
  Globe,
  Clock,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import SectionLabel from "@/components/ui/SectionLabel";
import Card from "@/components/ui/Card";
import CTASection from "@/components/sections/CTASection";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  staggerItem,
} from "@/lib/animations";

const credentials = [
  {
    icon: Shield,
    title: "ISO 27001 Certified Practice",
    description:
      "We hold our own ISO 27001 certification. We practise what we preach and understand the standard from the inside.",
  },
  {
    icon: Award,
    title: "ISO 27001 Lead Auditors (IRCA)",
    description:
      "Our team includes IRCA-registered Lead Auditors who have conducted hundreds of audits across technology companies.",
  },
  {
    icon: Scale,
    title: "GDPR Qualified (CIPP/E)",
    description:
      "Certified Information Privacy Professionals (Europe) ensuring your data protection programme meets the highest standards.",
  },
  {
    icon: Users,
    title: "CQI Corporate Member",
    description:
      "Chartered Quality Institute corporate membership demonstrates our commitment to quality management excellence.",
  },
];

const differentiators = [
  {
    icon: Zap,
    title: "Speed without shortcuts",
    description:
      "10 weeks to ISO 27001 because we have built a process designed for technology companies, not because we skip steps.",
  },
  {
    icon: Puzzle,
    title: "Technology-first mindset",
    description:
      "We are not a generalist consultancy. We understand SaaS, cloud infrastructure, CI/CD pipelines, and modern development practices.",
  },
  {
    icon: PoundSterling,
    title: "Transparent pricing",
    description:
      "Fixed-fee engagements published on our website. No hourly surprises, no scope creep charges, no invoices you did not expect.",
  },
  {
    icon: Brain,
    title: "AI governance pioneers",
    description:
      "One of the first UK consultancies to formally offer ISO 42001 AI governance certification for companies building with AI.",
  },
  {
    icon: Globe,
    title: "Multi-region delivery",
    description:
      "UK, Ireland, UAE, and EU. We support technology companies wherever they operate and wherever their clients require compliance.",
  },
  {
    icon: Clock,
    title: "Post-certification support",
    description:
      "Certification is the start, not the end. We offer vCISO, vDPO, and surveillance audit support to keep you compliant year after year.",
  },
];

export default function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #14AAA9 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center"
        >
          <SectionLabel className="mb-4 block">About Us</SectionLabel>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            We built Pixelette Certified because businesses everywhere deserve better than slow, expensive, generic compliance consultancy.
          </h1>
          <p className="text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Founded by the team behind Pixelette Group, we combine over a decade of technology and business delivery experience with deep, practitioner-level compliance expertise.
          </p>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="py-20 lg:py-28 bg-primary-dark/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <SectionLabel className="mb-3 block">Our Story</SectionLabel>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">
                From building businesses to protecting them
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed text-lg">
                <p>
                  Pixelette Group has spent over 10 years delivering technology solutions for businesses across the UK, Middle East, Europe, North America, and Asia Pacific. We have built platforms, mobile applications, AI systems, and cloud infrastructure for organisations ranging from early-stage startups to large enterprise clients — across banking, healthcare, logistics, manufacturing, professional services, and beyond.
                </p>
                <p>
                  Along the way, we saw a pattern that frustrated us. Businesses across every industry and every geography were losing contracts, failing procurement, and missing growth opportunities — not because their product was poor, but because they could not produce the right certification.
                </p>
                <p>
                  The compliance consultancies they turned to were slow, expensive, and built for a different era. They did not understand modern business models, diverse industries, or the urgency of global regulatory pressure.
                </p>
                <p>
                  We started Pixelette Certified to change that. A compliance consultancy built by practitioners, for businesses of every kind. Fast, structured, and designed for organisations that cannot afford to lose six months waiting for a certificate they needed yesterday — in any industry, in any market, anywhere in the world.
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { value: "10+", label: "Years in technology" },
                { value: "50+", label: "Certifications delivered" },
                { value: "98%", label: "First-attempt pass rate" },
                { value: "4", label: "Regions served" },
              ].map((stat) => (
                <Card
                  key={stat.label}
                  variant="glass"
                  hover={false}
                  className="text-center py-8"
                >
                  <div className="text-3xl lg:text-4xl font-extrabold text-accent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Credentials"
            title="Qualified, certified, and accountable"
            description="Our consultants hold the industry's most respected qualifications. We do not just advise on compliance, we live it."
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {credentials.map((item) => (
              <motion.div key={item.title} variants={staggerItem}>
                <Card variant="glass" className="h-full text-center">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-5">
                    <item.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="font-bold text-white text-lg mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="relative py-20 lg:py-28 bg-surface overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-white to-surface" />
        <div className="absolute top-[30%] left-[-5%] w-[400px] h-[400px] rounded-full bg-accent/[0.04] blur-[100px] animate-float-slow" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Our Team"
            title="The people behind your certification"
            description="Senior consultants with real-world experience across information security, privacy, AI governance, and ethical hacking."
            dark={false}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto"
          >
            {[
              {
                name: "Asif Rana Ashiq",
                role: "CEO & Founder",
                credentials: [],
                bio: "Founder of Pixelette Group with over a decade of experience building technology solutions across the UK, Middle East, and Europe. Established Pixelette Certified to help UK technology companies achieve compliance faster and at a fair price.",
              },
              {
                name: "Muhammad Waleed",
                role: "Lead Consultant",
                credentials: ["ISO 27001 Lead Auditor (IRCA)", "AIGP", "FIP", "CIPP/US", "CIPM", "CISA", "CEH"],
                bio: "Leads all certification engagements and audit preparation. Expert in information security, privacy, AI governance, and ethical hacking with hands-on experience across ISO 27001, ISO 42001, GDPR, and penetration testing.",
              },
            ].map((member) => (
              <motion.div key={member.name + member.role} variants={staggerItem}>
                <div className="white-glass rounded-2xl p-6 h-full flex flex-col text-center group hover:-translate-y-2 transition-all duration-500">
                  {/* Avatar placeholder */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent/20 to-accent-light/10 border-2 border-accent/20 flex items-center justify-center mx-auto mb-4 group-hover:border-accent/50 group-hover:shadow-glow transition-all duration-500">
                    <span className="text-2xl font-extrabold gradient-text">
                      {member.name === "To Be Announced" ? "?" : member.name.split(" ").map(n => n[0]).join("")}
                    </span>
                  </div>

                  <h3 className="font-bold text-primary text-lg group-hover:text-accent-dark transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-accent-dark text-sm font-semibold mt-1 mb-3">{member.role}</p>

                  {/* Credentials */}
                  <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                    {member.credentials.slice(0, 4).map((cred) => (
                      <span key={cred} className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/10 text-accent-dark border border-accent/15">
                        {cred}
                      </span>
                    ))}
                    {member.credentials.length > 4 && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                        +{member.credentials.length - 4} more
                      </span>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed flex-1">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Verifiable Certifications */}
      <Certifications variant="dark" />

      {/* Why Choose Us */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Why Pixelette Certified"
            title="The unfair advantage your compliance deserves"
            dark={false}
          />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {differentiators.map((item) => (
              <motion.div key={item.title} variants={staggerItem}>
                <Card variant="white" className="h-full">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                    <item.icon className="h-6 w-6 text-accent-dark" />
                  </div>
                  <h3 className="font-bold text-primary text-lg mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}
