import type { Metadata } from "next";
import { absoluteUrl, getSiteConfig } from "@/lib/config";
import type { BlogPostItem, Faq, ImageAsset, PackageItem } from "@/lib/types";

export function pageMetadata({
  title,
  description,
  path,
  canonicalUrl,
  image,
  indexable = true,
}: {
  title: string;
  description: string;
  path: string;
  canonicalUrl?: string | null;
  image?: string | null;
  indexable?: boolean;
}): Metadata {
  const config = getSiteConfig();
  const canonical = canonicalUrl || absoluteUrl(path);
  const ogImage = image || config.defaultOgImage;

  return {
    title,
    description,
    alternates: { canonical },
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: config.brandName,
      images: [{ url: ogImage, width: 1200, height: 630 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function organizationSchema() {
  const config = getSiteConfig();
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "TravelAgency", "LocalBusiness"],
    name: config.brandName,
    url: config.siteUrl,
    telephone: config.phone,
    email: config.email,
    address: config.address,
    image: config.defaultOgImage,
    areaServed: "Kashmir",
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function imageSchema(images: ImageAsset[]) {
  return images.map((image) => ({
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: image.url,
    caption: image.alt,
  }));
}

export function packageSchema(item: PackageItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.title,
    image: item.images.map((image) => image.url),
    description: item.overview,
    category: item.schemaFields.category || "Kashmir tour package",
    offers: {
      "@type": "Offer",
      price: item.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/kashmir-tour-packages/${item.slug}`),
    },
  };
}

export function blogSchema(item: BlogPostItem) {
  return {
    "@context": "https://schema.org",
    "@type": ["Article", "BlogPosting"],
    headline: item.title,
    description: item.metaDescription,
    image: item.featuredImage || item.ogImage,
    author: {
      "@type": "Organization",
      name: item.author,
    },
    datePublished: item.createdAt.toISOString(),
    dateModified: item.updatedAt.toISOString(),
    mainEntityOfPage: absoluteUrl(`/travel-blog/${item.slug}`),
  };
}
