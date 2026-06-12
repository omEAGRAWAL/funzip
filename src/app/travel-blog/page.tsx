import { BlogCard } from "@/components/cards";
import { LeadForm } from "@/components/lead-form";
import { PublicShell } from "@/components/layout-shell";
import { getBlogs } from "@/lib/data";
import { absoluteUrl } from "@/lib/config";
import { JsonLd, breadcrumbSchema, pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata = pageMetadata({
  title: "Kashmir Travel Blog",
  description:
    "Read Kashmir travel guides for seasons, budgets, family routes, honeymoon planning, snow trips, and package selection.",
  path: "/travel-blog",
});

export default async function BlogListingPage() {
  const blogs = await getBlogs();

  return (
    <PublicShell>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Travel Blog", url: absoluteUrl("/travel-blog") },
        ])}
      />
      <section className="bg-muted">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
          <h1 className="text-4xl font-black text-brand-dark md:text-5xl">
            Kashmir travel blog
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-foreground/70">
            SEO-focused travel guides with internal links to relevant Kashmir
            packages and lead forms for quote capture.
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 lg:grid-cols-[1fr_360px] lg:px-6">
        <div className="grid gap-5 md:grid-cols-2">
          {blogs.map((item) => (
            <BlogCard key={item.slug} item={item} />
          ))}
        </div>
        <div className="lg:sticky lg:top-24 lg:self-start">
          <LeadForm
            sourcePage={absoluteUrl("/travel-blog")}
            leadType="Blog Listing"
            interestedPackage="Kashmir trip planning"
          />
        </div>
      </section>
    </PublicShell>
  );
}
