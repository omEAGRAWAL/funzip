import Image from "next/image";
import Link from "next/link";
import { Clock, IndianRupee, MapPin } from "lucide-react";
import type { BlogPostItem, PackageItem } from "@/lib/types";

export function PackageCard({ item }: { item: PackageItem }) {
  const image = item.images[0];

  return (
    <article className="overflow-hidden rounded-lg border border-line bg-white shadow-sm">
      {image ? (
        <Image
          src={image.url}
          alt={image.alt}
          width={900}
          height={560}
          className="h-52 w-full object-cover"
        />
      ) : null}
      <div className="p-5">
        <p className="flex items-center gap-1 text-sm font-semibold text-brand">
          <MapPin size={15} /> {item.destination}
        </p>
        <h2 className="mt-2 text-xl font-black text-brand-dark">
          <Link href={`/kashmir-tour-packages/${item.slug}`}>{item.title}</Link>
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-foreground/70">
          {item.overview}
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-foreground/70">
          <span className="inline-flex items-center gap-1">
            <Clock size={15} /> {item.duration}
          </span>
          <span className="inline-flex items-center gap-1">
            <IndianRupee size={15} /> {item.price.toLocaleString("en-IN")}
          </span>
        </div>
        <Link
          href={`/kashmir-tour-packages/${item.slug}`}
          className="mt-5 inline-flex rounded-md bg-brand px-4 py-2 text-sm font-bold text-white"
        >
          View itinerary
        </Link>
      </div>
    </article>
  );
}

export function BlogCard({ item }: { item: BlogPostItem }) {
  return (
    <article className="overflow-hidden rounded-lg border border-line bg-white shadow-sm">
      {item.featuredImage ? (
        <Image
          src={item.featuredImage}
          alt={item.title}
          width={900}
          height={560}
          className="h-52 w-full object-cover"
        />
      ) : null}
      <div className="p-5">
        <p className="text-sm font-semibold text-brand">
          Updated {item.updatedAt.toLocaleDateString("en-IN")}
        </p>
        <h2 className="mt-2 text-xl font-black text-brand-dark">
          <Link href={`/travel-blog/${item.slug}`}>{item.title}</Link>
        </h2>
        <p className="mt-3 text-sm leading-6 text-foreground/70">
          {item.metaDescription}
        </p>
        <Link
          href={`/travel-blog/${item.slug}`}
          className="mt-5 inline-flex rounded-md border border-brand px-4 py-2 text-sm font-bold text-brand"
        >
          Read guide
        </Link>
      </div>
    </article>
  );
}
