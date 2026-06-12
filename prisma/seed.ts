import "dotenv/config";

import { Prisma, PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { seedBlogs, seedItineraries, seedPackages } from "../src/lib/seed";

function seedDatabaseUrl() {
  const url = process.env.DATABASE_URL;
  if (!url) return "";

  try {
    const parsed = new URL(url);
    if (
      parsed.hostname.endsWith(".neon.tech") &&
      !parsed.hostname.includes("-pooler.")
    ) {
      parsed.hostname = parsed.hostname.replace(".", "-pooler.");
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: seedDatabaseUrl(),
  }),
});

function inputJson(value: unknown) {
  return value as Prisma.InputJsonValue;
}

async function main() {
  await prisma.siteSetting.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      brandName: process.env.BRAND_NAME || "Kashmir Vista Travels",
      siteUrl: process.env.SITE_URL || "https://example.com",
      phone: process.env.BRAND_PHONE || "+91 98765 43210",
      whatsapp: process.env.BRAND_WHATSAPP || "+91 98765 43210",
      email: process.env.BRAND_EMAIL || "hello@example.com",
      address:
        process.env.BRAND_ADDRESS || "Srinagar, Jammu and Kashmir, India",
      defaultOgImage:
        process.env.DEFAULT_OG_IMAGE ||
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
  });

  for (const item of seedPackages) {
    await prisma.package.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        seoTitle: item.seoTitle,
        metaDescription: item.metaDescription,
        overview: item.overview,
        destination: item.destination,
        duration: item.duration,
        price: item.price,
        priceNote: item.priceNote,
        itinerary: inputJson(item.itinerary),
        inclusions: item.inclusions,
        exclusions: item.exclusions,
        hotels: item.hotels,
        cabDetails: item.cabDetails,
        images: inputJson(item.images),
        faqs: inputJson(item.faqs),
        reviews: inputJson(item.reviews),
        schemaFields: inputJson(item.schemaFields),
        relatedPackages: item.relatedPackages,
        relatedBlogs: item.relatedBlogs,
        status: item.status,
        indexable: item.indexable,
      },
      create: {
        id: item.id,
        title: item.title,
        slug: item.slug,
        seoTitle: item.seoTitle,
        metaDescription: item.metaDescription,
        canonicalUrl: item.canonicalUrl,
        ogImage: item.ogImage,
        indexable: item.indexable,
        overview: item.overview,
        destination: item.destination,
        duration: item.duration,
        price: item.price,
        priceNote: item.priceNote,
        itinerary: inputJson(item.itinerary),
        inclusions: item.inclusions,
        exclusions: item.exclusions,
        hotels: item.hotels,
        cabDetails: item.cabDetails,
        images: inputJson(item.images),
        faqs: inputJson(item.faqs),
        reviews: inputJson(item.reviews),
        schemaFields: inputJson(item.schemaFields),
        relatedPackages: item.relatedPackages,
        relatedBlogs: item.relatedBlogs,
        status: item.status,
      },
    });
  }

  for (const item of seedBlogs) {
    await prisma.blogPost.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        seoTitle: item.seoTitle,
        metaDescription: item.metaDescription,
        ogImage: item.ogImage,
        featuredImage: item.featuredImage,
        author: item.author,
        content: item.content,
        faqs: inputJson(item.faqs),
        relatedPackages: item.relatedPackages,
        internalLinks: inputJson(item.internalLinks),
        status: item.status,
        indexable: item.indexable,
      },
      create: {
        id: item.id,
        title: item.title,
        slug: item.slug,
        seoTitle: item.seoTitle,
        metaDescription: item.metaDescription,
        canonicalUrl: item.canonicalUrl,
        ogImage: item.ogImage,
        featuredImage: item.featuredImage,
        indexable: item.indexable,
        author: item.author,
        content: item.content,
        faqs: inputJson(item.faqs),
        relatedPackages: item.relatedPackages,
        internalLinks: inputJson(item.internalLinks),
        status: item.status,
      },
    });
  }

  for (const item of seedItineraries) {
    await prisma.itineraryDownload.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        seoTitle: item.seoTitle,
        metaDescription: item.metaDescription,
        ogImage: item.ogImage,
        destination: item.destination,
        description: item.description,
        pdfUrl: item.pdfUrl,
        leadFormCopy: item.leadFormCopy,
        faqs: inputJson(item.faqs),
        status: item.status,
        indexable: item.indexable,
      },
      create: {
        id: item.id,
        title: item.title,
        slug: item.slug,
        seoTitle: item.seoTitle,
        metaDescription: item.metaDescription,
        canonicalUrl: item.canonicalUrl,
        ogImage: item.ogImage,
        indexable: item.indexable,
        destination: item.destination,
        description: item.description,
        pdfUrl: item.pdfUrl,
        leadFormCopy: item.leadFormCopy,
        faqs: inputJson(item.faqs),
        status: item.status,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
