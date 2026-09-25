import Button from "@/components/ui/Button";
import { PRIMARY_CTA } from "@/lib/constants";

interface CTASectionProps {
  headline?: string;
  description?: string;
  primaryCta?: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
}

/**
 * The closing call to action. Most pages use the defaults, so the defaults are
 * the most widely published copy on the site and follow the restrained CTA
 * family in §18 and §34: an invitation to a professional discussion, with no
 * offer, price, deadline or promise attached.
 */
export default function CTASection({
  headline = "Discuss your requirements",
  description = "Tell us what you need to achieve and where the requirement applies. Following an initial review, we define the scope, delivery approach and proposed engagement in writing before work begins.",
  primaryCta = PRIMARY_CTA.label,
  primaryHref = PRIMARY_CTA.href,
  secondaryCta = "Explore our services",
  secondaryHref = "/services",
}: CTASectionProps) {
  return (
    <section className="sec band-closing">
      <div className="wrap" data-reveal="">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-center lg:gap-16">
          <div>
            <h2 className="h2 max-w-[20ch]">{headline}</h2>
            <p className="body mt-5 max-w-[60ch]">{description}</p>
          </div>

          <div className="flex shrink-0 flex-wrap gap-3.5">
            <Button href={primaryHref}>{primaryCta}</Button>
            <Button href={secondaryHref} variant="secondary">
              {secondaryCta}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
