import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  Heart,
  IndianRupee,
  MapPin,
  MessageCircle,
  Star,
} from "lucide-react";
import { whatsappUrl } from "@/lib/config";
import type { BlogPostItem, PackageItem } from "@/lib/types";

export function PackageCard({
  item,
  index = 0,
}: {
  item: PackageItem;
  index?: number;
}) {
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
  const category =
    typeof item.schemaFields.category === "string"
      ? item.schemaFields.category
      : "Best Seller";
  const dayPreview = item.itinerary.slice(0, 2);
  const style = { "--stagger": `${index * 90}ms` } as CSSProperties;

  return (
    <article
      className="package-card group overflow-hidden rounded-lg border border-line bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-dark/12"
      style={style}
    >
      <div className="relative h-56 overflow-hidden bg-muted">
        {image ? (
          <Image
            src={image.url}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="package-card-image object-cover transition duration-700 ease-out"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/72 via-brand-dark/10 to-transparent" />
        <div className="absolute left-4 top-4 rounded-full bg-snow/92 px-3 py-1.5 text-xs font-black uppercase text-brand-dark shadow-md backdrop-blur">
          {category}
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 text-xs font-black uppercase text-white">
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-dark/72 px-3 py-1.5 backdrop-blur">
            <Clock size={14} /> {item.duration}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-dark/72 px-3 py-1.5 backdrop-blur">
            <MapPin size={14} /> {chips[0] || "Kashmir"}
          </span>
        </div>
        <a
          href={whatsappUrl(`Hi, I want details for ${item.title}.`)}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface/90 text-brand shadow-sm backdrop-blur transition hover:scale-105"
          aria-label={`Ask about ${item.title}`}
        >
          <Heart size={19} />
        </a>
      </div>
      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="mb-1 text-xs font-black uppercase text-secondary tracking-normal">
              {item.destination}
            </p>
            <h2 className="text-xl font-black leading-snug text-brand-dark md:text-2xl">
              <Link href={`/kashmir-tour-packages/${item.slug}`}>
                {item.title}
              </Link>
            </h2>
          </div>
          <div className="inline-flex shrink-0 items-center gap-1 rounded-md bg-surface-mid px-2 py-1 text-sm font-black text-foreground">
            <Star className="fill-accent text-accent" size={14} />
            {rating}
          </div>
        </div>
        <p className="line-clamp-3 text-sm leading-6 text-foreground/68">
          {item.overview}
        </p>
        {dayPreview.length ? (
          <div className="grid gap-2">
            {dayPreview.map((day) => (
              <div
                key={day.day}
                className="package-route-step grid grid-cols-[40px_1fr] gap-3 rounded-md bg-surface-low px-3 py-2 text-sm"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand text-xs font-black text-white">
                  D{day.day}
                </span>
                <span className="line-clamp-1 self-center font-bold text-foreground/72">
                  {day.title}
                </span>
              </div>
            ))}
          </div>
        ) : null}
        {chips.length ? (
          <div className="flex flex-wrap gap-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-md border border-line bg-snow px-2.5 py-1 text-xs font-bold text-foreground/70"
              >
                {chip}
              </span>
            ))}
          </div>
        ) : null}
        <div className="mt-2 flex items-center justify-between gap-4 border-t border-line pt-4">
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-secondary text-secondary transition hover:bg-muted"
              aria-label={`Ask about ${item.title} on WhatsApp`}
            >
              <MessageCircle size={18} />
            </a>
            <Link
              href={`/kashmir-tour-packages/${item.slug}`}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-brand px-4 text-sm font-black text-white transition hover:bg-brand-dark"
            >
              Details <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export function BlogCard({
  item,
  index = 0,
}: {
  item: BlogPostItem;
  index?: number;
}) {
  const style = { "--stagger": `${index * 110}ms` } as CSSProperties;

  return (
    <article
      className="blog-card group overflow-hidden rounded-lg border border-line bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-dark/12"
      style={style}
    >
      {item.featuredImage ? (
        <div className="relative h-56 overflow-hidden bg-muted">
          <Image
            src={item.featuredImage}
            alt={item.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="blog-card-image object-cover transition duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-snow/92 px-3 py-1.5 text-xs font-black uppercase text-brand-dark shadow-sm backdrop-blur">
            <CalendarDays size={14} /> Updated{" "}
            {item.updatedAt.toLocaleDateString("en-IN")}
          </div>
        </div>
      ) : null}
      <div className="p-5">
        <p className="inline-flex items-center gap-2 text-xs font-black uppercase text-secondary">
          <CheckCircle2 size={14} /> Kashmir guide
        </p>
        <h2 className="mt-2 text-xl font-black leading-snug text-brand-dark">
          <Link href={`/travel-blog/${item.slug}`}>{item.title}</Link>
        </h2>
        <p className="mt-3 text-sm leading-6 text-foreground/68">
          {item.metaDescription}
        </p>
        <span className="blog-card-rule mt-5 block h-0.5 w-14 rounded-full bg-accent" />
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
