import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SectionHeading from "@/components/ui/SectionHeading";
import Pill from "@/components/ui/Pill";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { allCategories, categorySlug, postsByCategorySlug } from "@/lib/categories";

export function generateStaticParams() {
  return allCategories().map((c) => ({ category: categorySlug(c) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const result = postsByCategorySlug(slug);

  if (!result) {
    return { title: "Category Not Found" };
  }

  const titleBase = `${result.category} Articles, Guides & Insights`;
  return {
    title:
      titleBase.length > 38
        ? `${result.category} Articles & Guides | Pixelette Certified`
        : `${titleBase} | Pixelette Certified`,
    description: `Guides and insights on ${result.category} from Pixelette Certified. Practitioner-written articles on certification, compliance and AI governance.`,
    alternates: {
      canonical: `https://pixelettecertified.com/blog/category/${slug}`,
    },
    openGraph: {
      title: `${result.category} Articles`,
      description: `Guides and insights on ${result.category} from Pixelette Certified.`,
      type: "website",
    },
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: slug } = await params;
  const result = postsByCategorySlug(slug);

  if (!result) {
    notFound();
  }

  const { category, posts } = result;

  return (
    <>
      <section className="wash-left">
        <div className="wrap py-16 lg:py-24">
          <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: category }]} />

          <SectionHeading
            as="h1"
            variant="h1p"
            label="Category"
            title={category}
            description={`Guides and insights on ${category}, written by UK-credentialled compliance practitioners.`}
            className="mt-8 mb-0"
          />
        </div>
      </section>

      <section className="sec band-alt">
        <div className="wrap">
          <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="card flex h-full flex-col transition-colors duration-150 hover:border-line-strong"
              >
                <Pill tone="brand" className="self-start">{post.category}</Pill>
                <h2 className="h4 mt-5 leading-snug">{post.title}</h2>
                <p className="small mt-3 flex-1">{post.description}</p>
                <div className="mono mt-6 flex items-center gap-3 border-t border-line pt-4 text-[11px] text-soft">
                  <span>{post.readingTime}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-16 flex flex-wrap items-center gap-2">
            <span className="small mr-2">Browse by category:</span>
            {allCategories().map((c) => (
              <Link
                key={c}
                href={`/blog/category/${categorySlug(c)}`}
                className="pill min-h-[44px] transition-colors hover:border-brand hover:text-brand"
              >
                {c}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
