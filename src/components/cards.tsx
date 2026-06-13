import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  IndianRupee,
  MapPin,
  MessageCircle,
  Star,
} from "lucide-react";
import { whatsappUrl } from "@/lib/config";
import type { BlogPostItem, PackageItem } from "@/lib/types";

export function PackageCard({ item }: { item: PackageItem }) {
  const image = item.images[0];
  const rating = item.reviews.length
    ? (
        item.reviews.reduce((total, review) => total + review.rating, 0) /
        item.reviews.length
      ).toFixed(1)
    : "4.8";
  const chips = item.destination
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 3);

  return (
    <article className="group overflow-hidden rounded-lg border border-line bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-dark/10">
      <div className="relative h-56 overflow-hidden bg-muted">
        {image ? (
          <Image
            src={image.url}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : null}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-dark/70 to-transparent" />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black uppercase text-brand-dark shadow-sm backdrop-blur">
          {item.duration}
        </div>
        <div className="absolute bottom-4 right-4 inline-flex items-center gap-1 rounded-full bg-white/92 px-2.5 py-1 text-sm font-black text-brand-dark shadow-sm backdrop-blur">
          <Star className="fill-accent text-accent" size={15} />
          {rating}
        </div>
      </div>
      <div className="p-5">
        <p className="flex items-center gap-1 text-xs font-black uppercase tracking-normal text-brand">
          <MapPin size={15} /> {item.destination}
        </p>
        <h2 className="mt-2 text-xl font-black leading-snug text-brand-dark">
          <Link href={`/kashmir-tour-packages/${item.slug}`}>{item.title}</Link>
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-foreground/68">
          {item.overview}
        </p>
        {chips.length ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-md bg-muted px-2.5 py-1 text-xs font-bold text-foreground/70"
              >
                {chip}
              </span>
            ))}
          </div>
        ) : null}
        <div className="mt-5 flex items-end justify-between gap-4 border-t border-line pt-4">
          <div>
            <p className="text-xs font-bold uppercase text-foreground/55">
              Starts from
            </p>
            <p className="mt-1 flex items-center text-xl font-black text-brand-dark">
              <IndianRupee size={18} />
              {item.price.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href={whatsappUrl(`Hi, I want details for ${item.title}.`)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand/30 text-brand transition hover:bg-muted"
              aria-label={`Ask about ${item.title} on WhatsApp`}
            >
              <MessageCircle size={18} />
            </a>
            <Link
              href={`/kashmir-tour-packages/${item.slug}`}
              className="inline-flex h-10 items-center justify-center rounded-md bg-brand px-4 text-sm font-black text-white"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export function BlogCard({ item }: { item: BlogPostItem }) {
  return (
    <article className="overflow-hidden rounded-lg border border-line bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-dark/10">
      {item.featuredImage ? (
        <div className="relative h-52 bg-muted">
          <Image
            src={item.featuredImage}
            alt={item.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="p-5">
        <p className="text-xs font-black uppercase text-brand">
          Updated {item.updatedAt.toLocaleDateString("en-IN")}
        </p>
        <h2 className="mt-2 text-xl font-black leading-snug text-brand-dark">
          <Link href={`/travel-blog/${item.slug}`}>{item.title}</Link>
        </h2>
        <p className="mt-3 text-sm leading-6 text-foreground/68">
          {item.metaDescription}
        </p>
        <Link
          href={`/travel-blog/${item.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-black text-brand"
        >
          Read guide <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}
