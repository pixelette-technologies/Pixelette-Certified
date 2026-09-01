import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Pill from "@/components/ui/Pill";
import Button from "@/components/ui/Button";

import { blogPosts } from "@/data/blogPosts";
import Breadcrumbs from "@/components/seo/Breadcrumbs";

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  return (
    <>
      <section className="wash-left">
        <div className="wrap py-16 lg:py-24">
          <Breadcrumbs items={[{ name: "Blog" }]} />

          <SectionHeading
            as="h1"
            variant="h1p"
            label="Blog"
            title="Insights and guides"
            description="Compliance Intelligence, Strategic thinking on certification, procurement, AI governance, and enterprise readiness. Written by UK-credentialled practitioners, for businesses operating in any market."
            className="mt-8 mb-0"
          />
        </div>
      </section>

      <section className="sec band-alt">
        <div className="wrap" data-reveal="">
          <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card flex h-full flex-col transition-colors duration-150 hover:border-line-strong"
              >
                {/* Category tag */}
                <Pill tone="brand" className="self-start">{post.category}</Pill>

                {/* Title */}
                <h2 className="h4 mt-5 leading-snug">{post.title}</h2>

                {/* Description */}
                <p className="small mt-3 flex-1">{post.description}</p>

                {/* Footer */}
                <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                  <div className="mono flex items-center gap-3 text-[11px] text-soft">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span aria-hidden="true">,</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <span className="text-sm font-medium text-brand">Read more &rarr;</span>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16">
            <div className="card mx-auto max-w-2xl text-center">
              <h2 className="h3">Need expert guidance?</h2>
              <p className="body mx-auto mt-4">
                Book a free consultation with our compliance team to discuss your
                certification needs.
              </p>
              <div className="mt-8">
                <Button href="/contact" variant="primary" size="lg">
                  See Your 10-Week Certification Roadmap
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
