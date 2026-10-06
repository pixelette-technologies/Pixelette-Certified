import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceExplorer, { type ExplorerService } from "@/components/visuals/ServiceExplorer";
import { ArrowRight } from "@/components/ui/icons";
import { getServiceBySlug } from "@/data/services";

/**
 * Six priority services, chosen because they are the ones the homepage should
 * carry. Cyber assurance, Cyber Essentials and business continuity stay on
 * the services hub.
 */
const FEATURED: { slug: Parameters<typeof getServiceBySlug>[0]; tags: string; frameworks: string }[] = [
  {
    slug: "iso-27001",
    tags: "United Kingdom · United States · GCC",
    frameworks: "ISO 27001",
  },
  {
    slug: "iso-42001",
    tags: "United Kingdom · United States · GCC",
    frameworks: "ISO 42001 · NIST AI RMF",
  },
  {
    slug: "soc-2",
    tags: "United States · SaaS · Technology",
    frameworks: "SOC 2 · ISO 27001",
  },
  {
    slug: "privacy",
    tags: "United Kingdom · United States · GCC",
    frameworks: "UK GDPR · US privacy · GCC privacy",
  },
  {
    slug: "vciso",
    tags: "United Kingdom · United States · GCC",
    frameworks: "GRC · ISO 27001",
  },
  {
    slug: "gcc-regulatory-compliance",
    tags: "Saudi Arabia · Qatar · UAE",
    frameworks: "NCA · SAMA · NIA · QCB",
  },
];

export default function HomeServices() {
  const services: ExplorerService[] = FEATURED.map((item) => {
    const service = getServiceBySlug(item.slug);
    if (!service) throw new Error(`Missing homepage service: ${item.slug}`);
    return {
      slug: service.slug,
      name: service.navLabel,
      summary: service.summary,
      tags: item.tags,
      frameworks: item.frameworks,
      href: `/services/${service.slug}`,
    };
  });

  return (
    <section id="services" className="sec">
      <div className="wrap" data-reveal="">
        <SectionHeading
          title="Compliance and assurance built around the requirement"
          description="Six services cover the requirements we see most often. Cyber assurance, Cyber Essentials and business continuity remain on the full services list."
          titleWidth="22ch"
        />
        <ServiceExplorer services={services} />
        <Link href="/services" className="flink mt-10 text-sm font-medium text-brand hover:text-brand-hover">
          View all services <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
