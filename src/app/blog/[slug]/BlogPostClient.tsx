import Link from "next/link";
import Pill from "@/components/ui/Pill";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/seo/JsonLd";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { categorySlug } from "@/lib/categories";

interface BlogPostData {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readingTime: string;
  author: string;
  authorRole: string;
  content: string[];
  relatedSlugs: string[];
}

interface BlogPostClientProps {
  post: BlogPostData;
  relatedPosts: BlogPostData[];
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPostClient({
  post,
  relatedPosts,
}: BlogPostClientProps) {
  return (
    <article className="py-16 lg:py-24">
      <div className="wrap max-w-[820px]">
        {/* JSON-LD structured data */}
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.date,
            /*
             * Organisation byline, not a Person.
             *
             * This previously emitted a Person with `jobTitle` and `worksFor`,
             * which asserted a named individual's employment across all 18
             * indexed posts. Whether that individual is staff or an approved
             * delivery-network practitioner is an open question, and an
             * organisational byline is correct under either answer, so it
             * unblocks now. The E-E-A-T cost of an organisational author is real
             * and recoverable later; a machine-readable employment assertion
             * that turns out to be wrong is not.
             */
            author: {
              "@type": "Organization",
              "@id": "https://pixelettecertified.com/#organization",
              name: post.author,
            },
            publisher: {
              "@type": "Organization",
              "@id": "https://pixelettecertified.com/#organization",
              name: "Pixelette Certified",
              url: "https://pixelettecertified.com",
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://pixelettecertified.com/blog/${post.slug}`,
            },
          }}
        />

        {/* Breadcrumb */}
        <Breadcrumbs schema={false} items={[{ name: "Blog", href: "/blog" }, { name: post.title }]} />

        {/* Back link */}
        <div>
          <Link href="/blog" className="flink text-sm font-medium text-brand hover:text-brand-hover">
            &larr; Back to Blog
          </Link>
        </div>

        {/* Header */}
        <header className="mt-6 mb-12">
          <Link href={`/blog/category/${categorySlug(post.category)}`} className="inline-block">
            <Pill tone="brand">{post.category}</Pill>
          </Link>

          <h1 className="h1p mt-5">{post.title}</h1>

          <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-muted">
            <div className="flex items-center gap-2.5">
              <span className="mono flex h-8 w-8 items-center justify-center rounded-full border border-line-strong text-[11px] text-brand">
                {post.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <span>
                <span className="font-medium text-ink">{post.author}</span>
                <span className="mx-1">,</span>
                <span>{post.authorRole}</span>
              </span>
            </div>
            <span aria-hidden="true">,</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">,</span>
            <span>{post.readingTime}</span>
          </div>
        </header>

        {/* Article body */}
        <div className="prose">
          {post.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Divider */}
        <div className="rule my-16" role="presentation" />

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section>
            <h2 className="h3 mb-8">Related articles</h2>
            <div className="grid gap-3.5 md:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="card flex h-full flex-col p-5 transition-colors duration-150 hover:border-line-strong"
                >
                  <Pill tone="brand" className="self-start">{related.category}</Pill>
                  <h3 className="mt-4 text-sm font-semibold leading-snug text-ink">
                    {related.title}
                  </h3>
                  <p className="src mt-2">{formatDate(related.date)}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="mt-16">
          <div className="card text-center">
            <h3 className="h3">Ready to get certified?</h3>
            <p className="body mx-auto mt-4">
              Book a free consultation to discuss your certification needs. Our
              team will assess your current position and recommend the fastest
              path to compliance.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
              <Button href="/contact" variant="primary" size="lg">
                Book a Compliance Diagnostic
              </Button>
              <Button href="/services/iso-27001" variant="secondary" size="lg">
                View Services
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
