export type Faq = {
  question: string;
  answer: string;
};

export type ImageAsset = {
  url: string;
  alt: string;
};

export type ItineraryDay = {
  day: number;
  title: string;
  description: string;
};

export type Review = {
  name: string;
  rating: number;
  text: string;
};

export type InternalLink = {
  label: string;
  href: string;
};

export type PublishStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type PackageItem = {
  id: string;
  title: string;
  slug: string;
  seoTitle: string;
  metaDescription: string;
  canonicalUrl?: string | null;
  ogImage?: string | null;
  indexable: boolean;
  overview: string;
  destination: string;
  duration: string;
  price: number;
  priceNote?: string | null;
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  hotels?: string | null;
  cabDetails?: string | null;
  images: ImageAsset[];
  faqs: Faq[];
  reviews: Review[];
  schemaFields: Record<string, unknown>;
  relatedPackages: string[];
  relatedBlogs: string[];
  status: PublishStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type BlogPostItem = {
  id: string;
  title: string;
  slug: string;
  seoTitle: string;
  metaDescription: string;
  canonicalUrl?: string | null;
  ogImage?: string | null;
  indexable: boolean;
  featuredImage?: string | null;
  author: string;
  content: string;
  faqs: Faq[];
  relatedPackages: string[];
  internalLinks: InternalLink[];
  status: PublishStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type ItineraryDownloadItem = {
  id: string;
  title: string;
  slug: string;
  seoTitle: string;
  metaDescription: string;
  canonicalUrl?: string | null;
  ogImage?: string | null;
  indexable: boolean;
  destination: string;
  description: string;
  pdfUrl: string;
  leadFormCopy?: string | null;
  faqs: Faq[];
  status: PublishStatus;
  createdAt: Date;
  updatedAt: Date;
};
