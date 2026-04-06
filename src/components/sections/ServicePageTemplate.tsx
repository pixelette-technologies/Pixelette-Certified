"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, ArrowRight, Clock, Shield, ShieldCheck, Globe, Leaf, Brain, Lock, UserCheck, FileSearch, Bug, Scale } from "lucide-react";
import type { Service } from "@/data/services";
import { getRelatedServices } from "@/data/services";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import CTASection from "@/components/sections/CTASection";
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem, scaleIn } from "@/lib/animations";
import { cn } from "@/lib/utils";

type SerializableService = Omit<Service, 'icon'>;

interface ServicePageTemplateProps {
  service: SerializableService;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "iso-27001": Shield,
  "iso-22301": ShieldCheck,
  "iso-9001": Globe,
  "iso-14001": Leaf,
  "iso-42001": Brain,
  "cyber-essentials": Lock,
  "vciso": UserCheck,
  "vdpo": FileSearch,
  "penetration-testing": Bug,
  "gdpr-privacy": Scale,
};

export default function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const relatedServices = getRelatedServices(service.relatedSlugs);
  const IconComponent = iconMap[service.slug] || Shield;

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-primary pt-32 pb-20 lg:pt-40 lg:pb-28">
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, #14AAA9 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Gradient orb */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center"
        >
          {/* Icon */}
          <div className="mx-auto mb-8 w-20 h-20 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center">
            <IconComponent className="h-10 w-10 text-accent" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            {service.title}
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            {service.description}
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="flex items-center gap-2 text-gray-300">
              <Shield className="h-5 w-5 text-accent" />
              <span className="font-semibold text-white">Fixed-fee engagement</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Clock className="h-5 w-5 text-accent" />
              <span className="font-semibold text-white">{service.process.length} phases</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contact" size="lg">
              Get Started
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Book Free Consultation
            </Button>
          </div>
        </motion.div>
      </section>

      {/* ─── Overview ─── */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <SectionHeading
              label="Overview"
              title="What is this service?"
              dark={false}
              centered
              className="mb-6"
            />
            <p className="text-gray-600 text-lg leading-relaxed text-center">
              {service.longDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── What We Deliver ─── */}
      <section className="py-20 lg:py-28 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Deliverables"
            title="What we deliver"
            description="Every engagement includes these core deliverables, tailored to your organisation."
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {service.features.map((feature, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="flex items-start gap-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-5"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center mt-0.5">
                  <Check className="h-4 w-4 text-accent" />
                </div>
                <span className="text-gray-200 font-medium">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Our Process ─── */}
      <section className="py-20 lg:py-28 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Our Process"
            title={service.category === "advisory" ? "How we engage with you" : "How we get you certified"}
            description={service.category === "advisory" ? "A structured onboarding and ongoing retainer model designed for your business." : "A proven, structured approach from kickoff to certification."}
            dark={false}
          />

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-accent/20 hidden md:block" />

            <div className="space-y-8">
              {service.process.map((step, i) => (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="relative flex gap-6 md:gap-8"
                >
                  {/* Number circle */}
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-accent/20">
                      {i + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-8">
                    <span className="text-sm font-bold uppercase tracking-widest text-accent-dark mb-1 block">
                      {step.week}
                    </span>
                    <h3 className="text-xl font-bold text-primary mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section className="py-20 lg:py-28 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Pricing"
            title="Transparent pricing"
            description="No hidden fees. No surprise invoices. Choose the tier that fits your organisation."
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={cn(
              "grid gap-6",
              service.pricing.length === 1 && "max-w-md mx-auto",
              service.pricing.length === 2 && "sm:grid-cols-2 max-w-3xl mx-auto",
              service.pricing.length >= 3 && "sm:grid-cols-2 lg:grid-cols-3"
            )}
          >
            {service.pricing.map((tier, i) => {
              const isHighlighted = service.pricing.length === 3 && i === 1;
              return (
                <motion.div key={tier.name} variants={staggerItem}>
                  <div
                    className={cn(
                      "relative rounded-2xl p-8 h-full flex flex-col transition-all duration-300",
                      isHighlighted
                        ? "bg-accent text-white border-2 border-accent shadow-xl shadow-accent/20 scale-[1.02]"
                        : "bg-white/5 backdrop-blur-md border border-white/10 text-white"
                    )}
                  >
                    {isHighlighted && (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white text-accent text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                        Most Popular
                      </span>
                    )}

                    <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
                    <p className={cn("text-sm mb-4", isHighlighted ? "text-white/80" : "text-gray-400")}>
                      {tier.audience}
                    </p>

                    <div className="text-lg font-semibold mb-6">{tier.price}</div>

                    <ul className="space-y-3 flex-1 mb-8">
                      {tier.features.map((feat, fi) => (
                        <li key={fi} className="flex items-start gap-3">
                          <Check className={cn("h-5 w-5 flex-shrink-0 mt-0.5", isHighlighted ? "text-white" : "text-accent")} />
                          <span className={cn("text-sm", isHighlighted ? "text-white/90" : "text-gray-300")}>
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      href="/contact"
                      variant={isHighlighted ? "secondary" : "primary"}
                      className={cn(
                        "w-full",
                        isHighlighted && "border-white text-white hover:bg-white hover:text-accent"
                      )}
                    >
                      Get Started
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      {service.faqs.length > 0 && (
        <section className="py-20 lg:py-28 bg-surface">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <SectionHeading
              label="FAQ"
              title="Frequently asked questions"
              dark={false}
            />
            <Accordion items={service.faqs} dark={false} />
          </div>
        </section>
      )}

      {/* ─── Related Services ─── */}
      {relatedServices.length > 0 && (
        <section className="py-20 lg:py-28 bg-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              label="Related Services"
              title="You may also need"
              description="Complementary services that strengthen your compliance posture."
            />

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {relatedServices.slice(0, 3).map((related) => (
                <motion.div key={related.slug} variants={staggerItem}>
                  <Link
                    href={`/services/${related.slug}`}
                    className="group flex flex-col h-full rounded-2xl p-6
                      bg-white/5 backdrop-blur-md border border-white/10
                      hover:bg-white/10 hover:-translate-y-1
                      transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                      {(() => { const RelIcon = iconMap[related.slug] || Shield; return <RelIcon className="h-6 w-6 text-accent" />; })()}
                    </div>
                    <h3 className="font-bold text-white mb-2 group-hover:text-accent transition-colors">
                      {related.shortTitle}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4 flex-1">
                      {related.description}
                    </p>
                    <span className="text-sm font-semibold text-accent inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn more <ArrowRight className="h-4 w-4" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <CTASection
        headline={`Ready to start your ${service.shortTitle} journey?`}
        description="Book a free gap analysis call. In 30 minutes you will know exactly where you stand, what it takes, and what it costs."
        primaryCta="Book Free Gap Analysis"
        primaryHref="/contact"
        secondaryCta="Talk to a Consultant"
        secondaryHref="/contact"
      />
    </>
  );
}
