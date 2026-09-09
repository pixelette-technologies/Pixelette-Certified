import Button from "@/components/ui/Button";

interface CTASectionProps {
  headline?: string;
  description?: string;
  primaryCta?: string;
  primaryHref?: string;
  secondaryCta?: string;
  secondaryHref?: string;
  /**
   * Optional small print under the buttons.
   *
   * This used to be a hardcoded line stating how quickly clients typically
   * convert after their first call - an unevidenced conversion statistic that no
   * caller could turn off, rendered on roughly ten routes. It is a prop now, and it defaults to undefined: the footnote has to
   * be opted into, so nothing can reintroduce a claim here by inheritance.
   */
  footnote?: string;
}

/**
 * The guide's closing CTA band: white-to-band gradient, heading and body left,
 * the buttons right. Replaces the old glass card floating on a mesh gradient.
 *
 * The defaults matter more than they look. Most call sites rely on them, so the
 * defaults are the copy on most pages of the site.
 */
export default function CTASection({
  headline = "Tell us what you have been asked to prove",
  description = "A customer, tender, investor or regulator has already given you the starting point. Send us the requirement or book a 30-minute compliance diagnostic, and we will help you identify the right route, the likely work involved and the specialist capability required.",
  primaryCta = "Book a 30-Minute Compliance Diagnostic",
  primaryHref = "/contact",
  secondaryCta = "Send Us the Requirement",
  secondaryHref = "/contact",
  footnote,
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
              {footnote ??
                "No certification outcome or completion date is promised before scope, current readiness and the independent assessment route have been confirmed."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
