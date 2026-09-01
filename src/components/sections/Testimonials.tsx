import SectionHeading from "@/components/ui/SectionHeading";
import { QuoteGlyph, Star } from "@/components/ui/icons";

const testimonials = [
  {
    quote:
      "We needed ISO 27001 to close a contract with a major bank. Pixelette Certified got us through Stage 2 in 9 weeks.",
    author: "CTO",
    company: "FinTech",
    rating: 5,
  },
  {
    quote:
      "We had been putting off ISO 27001 for two years because every consultant we spoke to made it sound like an 8-month project. It took 11 weeks. The process was clear, structured, and genuinely painless.",
    author: "Head of Engineering",
    company: "SaaS Platform",
    rating: 5,
  },
  {
    quote:
      "The vCISO service means we have a senior security voice in every board conversation without the cost of a full-time CISO. It has changed how seriously our enterprise clients take us globally.",
    author: "CEO",
    company: "AI Technology Company",
    rating: 5,
  },
];

/**
 * The guide's testimonial card: a grey quote glyph, the quote set upright in
 * ink rather than italic grey, then the attribution above a hairline. The star
 * row is kept, redrawn thin-stroke in brand green, because it is a trust
 * signal rather than decoration. No initials avatar: author here is a role.
 */
export default function Testimonials() {
  return (
    <section className="sec">
      <div className="wrap" data-reveal="">
        <SectionHeading
          label="Client Success"
          title="Trusted by technology companies winning enterprise contracts"
          description="Our clients pass their audits first time. Here is what they say."
        />

        <div className="grid gap-3.5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure key={i} className="card flex h-full flex-col">
              <div
                className="mb-5 flex gap-1 text-brand"
                role="img"
                aria-label={`${t.rating} out of 5 stars`}
              >
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} />
                ))}
              </div>

              <QuoteGlyph />

              <blockquote className="mt-5 flex-1 text-[18px] leading-[1.5] text-ink">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="mt-5 border-t border-line pt-4">
                <span className="block text-sm font-semibold text-ink">{t.author}</span>
                <span className="small block">{t.company}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
