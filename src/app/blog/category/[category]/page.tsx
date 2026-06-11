import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SectionHeading from "@/components/ui/SectionHeading";
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
    <section className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-primary to-primary-dark pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Breadcrumbs dark items={[{ name: "Blog", href: "/blog" }, { name: category }]} />
        </div>

        <SectionHeading
          as="h1"
          label="Category"
          title={category}
          description={`Guides and insights on ${category}, written by UK-credentialled compliance practitioners.`}
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block h-full">
              <div className="h-full flex flex-col rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 hover:bg-white/10 transition-all duration-300">
                <span className="inline-block self-start px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 border border-accent/20 rounded-full mb-4">
                  {post.category}
                </span>
                <h2 className="text-xl font-bold text-white mb-3 leading-tight">
                  {post.title}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                  {post.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-500 pt-4 border-t border-white/10">
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-500 mr-2">Browse by category:</span>
          {allCategories().map((c) => (
            <Link
              key={c}
              href={`/blog/category/${categorySlug(c)}`}
              className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border transition-colors text-gray-300 bg-white/5 border-white/10 hover:bg-white/10"
            >
              {c}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
