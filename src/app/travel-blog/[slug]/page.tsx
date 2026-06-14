import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PackageCard } from "@/components/cards";
import { LeadForm } from "@/components/lead-form";
import { PublicShell } from "@/components/layout-shell";
import { getBlogBySlug, getBlogs, getRelatedPackages } from "@/lib/data";
import { markdownToHtml } from "@/lib/markdown";
import { absoluteUrl } from "@/lib/config";
import {
  JsonLd,
  blogSchema,
  breadcrumbSchema,
  faqSchema,
  pageMetadata,
} from "@/lib/seo";

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const blogs = await getBlogs();
  return blogs.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getBlogBySlug(slug);
  if (!item) return {};
  return pageMetadata({
    title: item.seoTitle,
    description: item.metaDescription,
    path: `/travel-blog/${item.slug}`,
    canonicalUrl: item.canonicalUrl,
    image: item.ogImage || item.featuredImage,
    indexable: item.indexable,
  });
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getBlogBySlug(slug);
  if (!item) notFound();
  const relatedPackages = await getRelatedPackages(item.relatedPackages);

  return (
    <PublicShell>
      <JsonLd data={blogSchema(item)} />
      <JsonLd data={faqSchema(item.faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Travel Blog", url: absoluteUrl("/travel-blog") },
          { name: item.title, url: absoluteUrl(`/travel-blog/${item.slug}`) },
        ])}
      />
      <article>
        <section className="relative overflow-hidden bg-brand-dark text-white">
          {item.featuredImage ? (
            <Image
              src={item.featuredImage}
              alt={item.title}
              fill
              priority
              sizes="100vw"
              className="hero-image object-cover opacity-56"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/76 to-brand-dark/22" />
          <div className="relative mx-auto max-w-5xl px-5 py-16 md:px-6 md:py-20">
            <Breadcrumbs
              className="text-white/70"
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/travel-blog" },
                { label: item.title, href: `/travel-blog/${item.slug}` },
              ]}
            />
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/14 px-3 py-1 text-sm font-bold shadow-sm backdrop-blur">
              <CalendarDays size={16} /> Updated{" "}
              {item.updatedAt.toLocaleDateString("en-IN")}
            </p>
            <h1 className="mt-5 text-4xl font-black tracking-normal md:text-6xl">
              {item.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/80">
              {item.metaDescription}
            </p>
            <div className="mt-5 flex flex-wrap gap-3 text-sm font-semibold text-white/64">
              <span>{item.author}</span>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-8 px-5 py-12 lg:grid-cols-[1fr_360px] lg:px-6">
          <div>
            <div
              className="prose-lite blog-card rounded-lg border border-line bg-white p-6 shadow-sm"
              dangerouslySetInnerHTML={{ __html: markdownToHtml(item.content) }}
            />
            {item.internalLinks.length ? (
              <div className="blog-card mt-8 rounded-lg border border-line bg-water p-5">
                <h2 className="text-xl font-black text-brand-dark">Useful internal links</h2>
                <div className="mt-4 grid gap-2">
                  {item.internalLinks.map((link) => (
                    <Link key={link.href} href={link.href} className="inline-flex items-center gap-2 font-bold text-brand">
                      {link.label} <ArrowRight size={16} />
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
            <section className="mt-8 grid gap-4">
              <h2 className="text-2xl font-black text-brand-dark">FAQs</h2>
              {item.faqs.map((faq) => (
                <details key={faq.question} className="blog-card rounded-lg border border-line bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer font-black text-brand-dark">{faq.question}</summary>
                  <p className="mt-3 leading-7 text-foreground/70">{faq.answer}</p>
                </details>
              ))}
            </section>
            {relatedPackages.length ? (
              <section className="mt-8">
                <h2 className="text-2xl font-black text-brand-dark">Related packages</h2>
                <div className="mt-5 grid gap-5 md:grid-cols-2">
                  {relatedPackages.map((pkg, index) => (
                    <PackageCard key={pkg.slug} item={pkg} index={index} />
                  ))}
                </div>
              </section>
            ) : null}
          </div>
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <LeadForm
              sourcePage={absoluteUrl(`/travel-blog/${item.slug}`)}
              leadType="Blog Detail"
              interestedPackage={relatedPackages[0]?.title || item.title}
            />
          </aside>
        </section>
      </article>
    </PublicShell>
  );
}
