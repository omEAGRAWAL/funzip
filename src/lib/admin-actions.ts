"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearAdminSession, isValidAdminPassword, requireAdmin, setAdminSession } from "@/lib/auth";
import { withDatabase } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

type AdminState = {
  ok: boolean;
  message: string;
};

function str(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function nullableStr(formData: FormData, key: string) {
  const value = str(formData, key);
  return value || null;
}

function list(formData: FormData, key: string) {
  return str(formData, key)
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function json<T>(formData: FormData, key: string, fallback: T): T {
  const raw = str(formData, key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function inputJson(value: unknown) {
  return value as Prisma.InputJsonValue;
}

function revalidateSeo() {
  [
    "/",
    "/kashmir-tour-packages",
    "/travel-blog",
    "/sitemap.xml",
    "/sitemap-packages.xml",
    "/sitemap-blogs.xml",
    "/sitemap-pages.xml",
    "/sitemap-itineraries.xml",
    "/sitemap-images.xml",
  ].forEach((path) => revalidatePath(path));
}

export async function loginAction(
  _state: AdminState,
  formData: FormData,
): Promise<AdminState> {
  const password = str(formData, "password");

  if (!isValidAdminPassword(password)) {
    return { ok: false, message: "Invalid admin password." };
  }

  await setAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin");
}

export async function savePackageAction(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const slug = str(formData, "slug");

  const data = {
    title: str(formData, "title"),
    slug,
    seoTitle: str(formData, "seoTitle"),
    metaDescription: str(formData, "metaDescription"),
    canonicalUrl: nullableStr(formData, "canonicalUrl"),
    ogImage: nullableStr(formData, "ogImage"),
    indexable: formData.get("indexable") === "on",
    overview: str(formData, "overview"),
    destination: str(formData, "destination") || "Kashmir",
    duration: str(formData, "duration"),
    price: Number(str(formData, "price") || 0),
    priceNote: nullableStr(formData, "priceNote"),
    itinerary: inputJson(json(formData, "itinerary", [])),
    inclusions: list(formData, "inclusions"),
    exclusions: list(formData, "exclusions"),
    hotels: nullableStr(formData, "hotels"),
    cabDetails: nullableStr(formData, "cabDetails"),
    images: inputJson(json(formData, "images", [])),
    faqs: inputJson(json(formData, "faqs", [])),
    reviews: inputJson(json(formData, "reviews", [])),
    schemaFields: inputJson(json(formData, "schemaFields", {})),
    relatedPackages: list(formData, "relatedPackages"),
    relatedBlogs: list(formData, "relatedBlogs"),
    status: str(formData, "status") as "DRAFT" | "PUBLISHED" | "ARCHIVED",
  };

  await withDatabase((db) =>
    id
      ? db.package.update({ where: { id }, data })
      : db.package.create({ data }),
  );

  revalidateSeo();
  revalidatePath(`/kashmir-tour-packages/${slug}`);
  redirect("/admin/packages");
}

export async function clonePackageAction(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  await withDatabase(async (db) => {
    const item = await db.package.findUnique({ where: { id } });
    if (!item) return null;
    return db.package.create({
      data: {
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
        title: `${item.title} Copy`,
        slug: `${item.slug}-copy-${Date.now()}`,
        status: "DRAFT",
      },
    });
  });
  revalidatePath("/admin/packages");
}

export async function deletePackageAction(formData: FormData) {
  await requireAdmin();
  await withDatabase((db) => db.package.delete({ where: { id: str(formData, "id") } }));
  revalidateSeo();
  revalidatePath("/admin/packages");
}

export async function saveBlogAction(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const slug = str(formData, "slug");

  const data = {
    title: str(formData, "title"),
    slug,
    seoTitle: str(formData, "seoTitle"),
    metaDescription: str(formData, "metaDescription"),
    canonicalUrl: nullableStr(formData, "canonicalUrl"),
    ogImage: nullableStr(formData, "ogImage"),
    indexable: formData.get("indexable") === "on",
    featuredImage: nullableStr(formData, "featuredImage"),
    author: str(formData, "author") || "Funzip Editorial Team",
    content: str(formData, "content"),
    faqs: inputJson(json(formData, "faqs", [])),
    relatedPackages: list(formData, "relatedPackages"),
    internalLinks: inputJson(json(formData, "internalLinks", [])),
    status: str(formData, "status") as "DRAFT" | "PUBLISHED" | "ARCHIVED",
  };

  await withDatabase((db) =>
    id ? db.blogPost.update({ where: { id }, data }) : db.blogPost.create({ data }),
  );
  revalidateSeo();
  revalidatePath(`/travel-blog/${slug}`);
  redirect("/admin/blogs");
}

export async function deleteBlogAction(formData: FormData) {
  await requireAdmin();
  await withDatabase((db) => db.blogPost.delete({ where: { id: str(formData, "id") } }));
  revalidateSeo();
  revalidatePath("/admin/blogs");
}

export async function updateLeadStatusAction(formData: FormData) {
  await requireAdmin();
  await withDatabase((db) =>
    db.lead.update({
      where: { id: str(formData, "id") },
      data: {
        status: str(formData, "status") as
          | "NEW"
          | "CONTACTED"
          | "INTERESTED"
          | "QUOTE_SENT"
          | "FOLLOW_UP"
          | "BOOKED"
          | "LOST"
          | "SPAM",
        notes: nullableStr(formData, "notes"),
      },
    }),
  );
  revalidatePath("/admin/leads");
}

export async function saveBookingAction(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const data = {
    leadId: nullableStr(formData, "leadId"),
    packageId: nullableStr(formData, "packageId"),
    customerName: str(formData, "customerName"),
    phone: str(formData, "phone"),
    status: str(formData, "status") as
      | "INQUIRY"
      | "QUOTE_SENT"
      | "ADVANCE_PENDING"
      | "CONFIRMED"
      | "COMPLETED"
      | "CANCELLED",
    travelDate: str(formData, "travelDate")
      ? new Date(str(formData, "travelDate"))
      : null,
    numberOfPeople: str(formData, "numberOfPeople")
      ? Number(str(formData, "numberOfPeople"))
      : null,
    quoteAmount: str(formData, "quoteAmount")
      ? Number(str(formData, "quoteAmount"))
      : null,
    advanceAmount: str(formData, "advanceAmount")
      ? Number(str(formData, "advanceAmount"))
      : null,
    balanceAmount: str(formData, "balanceAmount")
      ? Number(str(formData, "balanceAmount"))
      : null,
    notes: nullableStr(formData, "notes"),
  };

  await withDatabase((db) =>
    id ? db.booking.update({ where: { id }, data }) : db.booking.create({ data }),
  );
  revalidatePath("/admin/bookings");
}

export async function saveRedirectAction(formData: FormData) {
  await requireAdmin();
  const source = str(formData, "source");
  await withDatabase((db) =>
    db.redirect.upsert({
      where: { source },
      update: {
        target: str(formData, "target"),
        status: Number(str(formData, "status") || 308),
        active: formData.get("active") === "on",
      },
      create: {
        source,
        target: str(formData, "target"),
        status: Number(str(formData, "status") || 308),
        active: formData.get("active") === "on",
      },
    }),
  );
  revalidatePath("/admin/redirects");
}

export async function deleteRedirectAction(formData: FormData) {
  await requireAdmin();
  await withDatabase((db) => db.redirect.delete({ where: { id: str(formData, "id") } }));
  revalidatePath("/admin/redirects");
}
