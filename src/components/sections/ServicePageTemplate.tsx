import Link from "next/link";
import type { Service } from "@/data/services";
import { getRelatedServices, ENGAGEMENT_TERMS } from "@/data/services";
import { markets, marketHref } from "@/data/markets";
import SectionHeading from "@/components/ui/SectionHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import CTASection from "@/components/sections/CTASection";
import FaqSchema from "@/components/seo/FaqSchema";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { ArrowRight, Check } from "@/components/ui/icons";

interface ServicePageTemplateProps {
  service: Service;
}

/**
 * Drives every service route.
 *
 * Order follows the specification's writing principle (§3): the business
 * outcome first, then what the work covers, then the technical detail. There is
 * no pricing section, no duration and no certification promise. The
 * independence note renders on every page because §36 makes it mandatory, and
 * it sits directly under the approach so it reads as part of how the work runs
 * rather than as small print.
 */
export default function ServicePageTemplate({ service }: ServicePageTemplateProps) {
  const related = getRelatedServices(service.relatedSlugs);
  const Icon = service.icon;
  const serviceMarkets = markets.filter((m) => service.markets.includes(m.slug));

  return (
    <>
      {/* Hero */}
      <section className="wash-left">
        <div className="wrap py-16 lg:py-24">
          <Breadcrumbs
            schema={false}
            items={[{ name: "Services", href: "/services" }, { name: service.shortTitle }]}
          />

          <div className="mt-8 max-w-[56ch]">
            <Icon className="h-6 w-6 text-brand" strokeWidth={1.6} aria-hidden="true" />
            <h1 className="h1p mt-6">{service.title}</h1>
            <p className="lead mt-6">{service.opening}</p>

            <div className="mt-9 flex flex-wrap gap-3.5">
              <Button href="/contact" size="lg">
                Discuss your requirements
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Talk to a specialist
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="sec band-alt">
        <div className="wrap" data-reveal="">
          <SectionHeading label="Overview" title="What this involves" className="mb-6" />
          <div className="max-w-[68ch] space-y-4">
            {service.overview.map((para) => (
              <p key={para.slice(0, 32)} className="body">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="sec">
        <div className="wrap" data-reveal="">
          <SectionHeading
            label="Scope"
            title={service.coverage.heading}
            description={service.coverage.intro}
          />
          <div className="grid overflow-hidden rounded-card border border-line-card md:grid-cols-2">
            {service.coverage.items.map((item) => (
              <div
                key={item.title}
                className="border-b border-line-card bg-page p-6 md:p-7 md:[&:nth-child(odd)]:border-r"
              >
                <h3 className="h4">{item.title}</h3>
                <p className="small mt-2">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grouped detail, e.g. by jurisdiction or framework */}
      {service.groups && (
        <section className="sec band-alt">
          <div className="wrap" data-reveal="">
            <SectionHeading label="Detail" title={service.groups.heading} description={service.groups.intro} />
            <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
              {service.groups.items.map((group) => (
                <div key={group.label} className="card flex h-full flex-col">
                  <h3 className="h4">{group.label}</h3>
                  <ul className="mt-4 list-none space-y-2.5">
                    {group.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-1 shrink-0 text-brand">
                          <Check size={15} />
                        </span>
                        <span className="small">{point}</span>
                      </li>
                    ))}
                  </ul>
                  {group.note && <p className="src mt-5">{group.note}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Approach and independence */}
      <section className={service.groups ? "sec" : "sec band-alt"}>
        <div className="wrap" data-reveal="">
          <SectionHeading label="Approach" title="How the engagement runs" description={ENGAGEMENT_TERMS} />
          <ol className="grid list-none overflow-hidden rounded-card border border-line-card md:grid-cols-2 lg:grid-cols-4">
            {service.approach.map((step, i) => (
              <li
                key={step.title}
                className="border-b border-line-card bg-page p-6 last:border-b-0 md:p-7 lg:border-b-0 lg:border-r lg:last:border-r-0"
              >
                <Eyebrow>{String(i + 1).padStart(2, "0")}</Eyebrow>
                <h3 className="h4 mt-3">{step.title}</h3>
                <p className="small mt-2">{step.text}</p>
              </li>
            ))}
          </ol>

          <div className="mt-6 max-w-[72ch] border-l-2 border-brand pl-5">
            <p className="small font-medium text-ink">{service.independence}</p>
          </div>
        </div>
      </section>

      {/* Related assurance requirements */}
      {service.relatedRequirements && (
        <section className={service.groups ? "sec band-alt" : "sec"}>
          <div className="wrap" data-reveal="">
            <SectionHeading
              label="Related"
              title={service.relatedRequirements.heading}
              description={service.relatedRequirements.intro}
            />
            <div className="grid gap-3.5 md:grid-cols-2">
              {service.relatedRequirements.items.map((item) =>
                item.href ? (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="card flex h-full flex-col transition-colors duration-150 hover:border-line-strong"
                  >
                    <h3 className="h4">{item.title}</h3>
                    <p className="small mt-2 flex-1">{item.text}</p>
                    <span className="flink mt-4 text-sm font-medium text-brand">
                      Explore the service <ArrowRight size={14} />
                    </span>
                  </Link>
                ) : (
                  <div key={item.title} className="card">
                    <h3 className="h4">{item.title}</h3>
                    <p className="small mt-2">{item.text}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {service.faqs.length > 0 && (
        <section className="sec band-alt">
          <div className="wrap max-w-[840px]" data-reveal="">
            <SectionHeading label="Questions" title="Common questions" />
            <FaqSchema faqs={service.faqs} />
            <Accordion items={service.faqs} />
          </div>
        </section>
      )}

      {/* Related services and markets */}
      <section className="sec">
        <div className="wrap" data-reveal="">
          <SectionHeading label="Related services" title="Often considered alongside" />
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((rel) => {
              const RelIcon = rel.icon;
              return (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="card flex h-full flex-col p-6 transition-colors duration-150 hover:border-line-strong"
                >
                  <RelIcon className="h-5 w-5 text-brand" strokeWidth={1.6} aria-hidden="true" />
                  <h3 className="h4 mt-4">{rel.navLabel}</h3>
                  <p className="small mt-2 flex-1">{rel.summary}</p>
                  <span className="flink mt-4 text-sm font-medium text-brand">
                    Explore the service <ArrowRight size={14} />
                  </span>
                </Link>
              );
            })}
          </div>

          {serviceMarkets.length > 0 && (
            <p className="small mt-8">
              Available in{" "}
              {serviceMarkets.map((m, i) => (
                <span key={m.slug}>
                  {i > 0 && (i === serviceMarkets.length - 1 ? " and " : ", ")}
                  <Link href={marketHref(m)} className="link">
                    {m.name === "GCC" ? "the GCC" : `the ${m.name}`}
                  </Link>
                </span>
              ))}
              .
            </p>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
