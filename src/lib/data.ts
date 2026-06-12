import "server-only";

import { cache } from "react";
import { withDatabase } from "@/lib/prisma";
import { seedBlogs, seedItineraries, seedPackages } from "@/lib/seed";
import type {
  BlogPostItem,
  Faq,
  ImageAsset,
  InternalLink,
  ItineraryDay,
  ItineraryDownloadItem,
  PackageItem,
  Review,
} from "@/lib/types";

function arrayOf<T>(value: unknown, fallback: T[] = []): T[] {
  return Array.isArray(value) ? (value as T[]) : fallback;
}

function objectOf(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function packageDto(item: {
  id: string;
  title: string;
  slug: string;
  seoTitle: string;
  metaDescription: string;
  canonicalUrl: string | null;
  ogImage: string | null;
  indexable: boolean;
  overview: string;
  destination: string;
  duration: string;
  price: number;
  priceNote: string | null;
  itinerary: unknown;
  inclusions: string[];
  exclusions: string[];
  hotels: string | null;
  cabDetails: string | null;
  images: unknown;
  faqs: unknown;
  reviews: unknown;
  schemaFields: unknown;
  relatedPackages: string[];
  relatedBlogs: string[];
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  createdAt: Date;
  updatedAt: Date;
}): PackageItem {
  return {
    ...item,
    itinerary: arrayOf<ItineraryDay>(item.itinerary),
    images: arrayOf<ImageAsset>(item.images),
    faqs: arrayOf<Faq>(item.faqs),
    reviews: arrayOf<Review>(item.reviews),
    schemaFields: objectOf(item.schemaFields),
  };
}

function blogDto(item: {
  id: string;
  title: string;
  slug: string;
  seoTitle: string;
  metaDescription: string;
  canonicalUrl: string | null;
  ogImage: string | null;
  indexable: boolean;
  featuredImage: string | null;
  author: string;
  content: string;
  faqs: unknown;
  relatedPackages: string[];
  internalLinks: unknown;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  createdAt: Date;
  updatedAt: Date;
}): BlogPostItem {
  return {
    ...item,
    faqs: arrayOf<Faq>(item.faqs),
    internalLinks: arrayOf<InternalLink>(item.internalLinks),
  };
}

function itineraryDto(item: {
  id: string;
  title: string;
  slug: string;
  seoTitle: string;
  metaDescription: string;
  canonicalUrl: string | null;
  ogImage: string | null;
  indexable: boolean;
  destination: string;
  description: string;
  pdfUrl: string;
  leadFormCopy: string | null;
  faqs: unknown;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  createdAt: Date;
  updatedAt: Date;
}): ItineraryDownloadItem {
  return {
    ...item,
    faqs: arrayOf<Faq>(item.faqs),
  };
}

export const getPackages = cache(async (includeDrafts = false) => {
  const data = await withDatabase(async (db) =>
    db.package.findMany({
      where: includeDrafts ? undefined : { status: "PUBLISHED" },
      orderBy: { updatedAt: "desc" },
    }),
  );

  return data?.map(packageDto) ?? seedPackages;
});

export const getPackageBySlug = cache(async (slug: string) => {
  const data = await withDatabase(async (db) =>
    db.package.findUnique({ where: { slug } }),
  );
  const item = data ? packageDto(data) : seedPackages.find((p) => p.slug === slug);
  return item?.status === "PUBLISHED" ? item : null;
});

export const getBlogs = cache(async (includeDrafts = false) => {
  const data = await withDatabase(async (db) =>
    db.blogPost.findMany({
      where: includeDrafts ? undefined : { status: "PUBLISHED" },
      orderBy: { updatedAt: "desc" },
    }),
  );

  return data?.map(blogDto) ?? seedBlogs;
});

export const getBlogBySlug = cache(async (slug: string) => {
  const data = await withDatabase(async (db) =>
    db.blogPost.findUnique({ where: { slug } }),
  );
  const item = data ? blogDto(data) : seedBlogs.find((p) => p.slug === slug);
  return item?.status === "PUBLISHED" ? item : null;
});

export const getItineraries = cache(async (includeDrafts = false) => {
  const data = await withDatabase(async (db) =>
    db.itineraryDownload.findMany({
      where: includeDrafts ? undefined : { status: "PUBLISHED" },
      orderBy: { updatedAt: "desc" },
    }),
  );

  return data?.map(itineraryDto) ?? seedItineraries;
});

export const getItineraryBySlug = cache(async (slug: string) => {
  const data = await withDatabase(async (db) =>
    db.itineraryDownload.findUnique({ where: { slug } }),
  );
  const item = data
    ? itineraryDto(data)
    : seedItineraries.find((p) => p.slug === slug);
  return item?.status === "PUBLISHED" ? item : null;
});

export async function getRelatedPackages(slugs: string[]) {
  const packages = await getPackages();
  return packages.filter((item) => slugs.includes(item.slug));
}

export async function getRelatedBlogs(slugs: string[]) {
  const blogs = await getBlogs();
  return blogs.filter((item) => slugs.includes(item.slug));
}

export async function getRedirectForPath(pathname: string) {
  return withDatabase((db) =>
    db.redirect.findFirst({ where: { source: pathname, active: true } }),
  );
}
