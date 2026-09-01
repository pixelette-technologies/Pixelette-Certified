import Button from "@/components/ui/Button";

interface CTASectionProps {
  headline?: string;
  description?: string;
  primaryCta?: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
}

/**
 * The guide's closing CTA band: white-to-band gradient, heading and body left,
 * the buttons right. Replaces the old glass card floating on a mesh gradient.
 */
export default function CTASection({
  headline = "See Your Path to Certification in 30 Minutes",
  description = "No obligation. No sales pressure. In 30 minutes, you will know exactly where your compliance gaps are, which standards apply to your business and jurisdiction, and what a realistic timeline and cost looks like, wherever in the world you operate.",
  primaryCta = "See Your 10-Week Certification Roadmap",
  primaryHref = "/contact",
  secondaryCta = "Talk to a Consultant",
  secondaryHref = "/contact",
}: CTASectionProps) {
  return (
    <section className="sec band-closing">
      <div className="wrap" data-reveal="">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-center lg:gap-16">
          <div>
            <h2 className="h2 max-w-[20ch]">{headline}</h2>
            <p className="body mt-5">{description}</p>
          </div>

          <div className="shrink-0">
            <div className="flex flex-wrap gap-3.5">
              <Button href={primaryHref}>{primaryCta}</Button>
              <Button href={secondaryHref} variant="secondary">
                {secondaryCta}
              </Button>
            </div>
            <p className="small mt-5 max-w-[38ch]">
              Most clients book their first paid engagement within 2 weeks of their gap analysis call.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
