import type { BlogPostItem, PackageItem } from "@/lib/types";

function Field({
  label,
  name,
  defaultValue,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
}) {
  return (
    <label className="grid gap-1 text-sm font-semibold">
      {label}
      <input
        className="admin-input"
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  defaultValue,
  rows = 4,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  rows?: number;
}) {
  return (
    <label className="grid gap-1 text-sm font-semibold">
      {label}
      <textarea className="admin-input" name={name} rows={rows} defaultValue={defaultValue ?? ""} />
    </label>
  );
}

export function PackageAdminFields({ item }: { item?: PackageItem }) {
  return (
    <div className="grid gap-4">
      {item ? <input type="hidden" name="id" value={item.id} /> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title" name="title" defaultValue={item?.title} />
        <Field label="Slug" name="slug" defaultValue={item?.slug} />
      </div>
      <Field label="SEO title" name="seoTitle" defaultValue={item?.seoTitle} />
      <TextArea label="Meta description" name="metaDescription" defaultValue={item?.metaDescription} rows={2} />
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Canonical URL" name="canonicalUrl" defaultValue={item?.canonicalUrl} />
        <Field label="OG image" name="ogImage" defaultValue={item?.ogImage} />
      </div>
      <TextArea label="Overview" name="overview" defaultValue={item?.overview} />
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Destination" name="destination" defaultValue={item?.destination || "Kashmir"} />
        <Field label="Duration" name="duration" defaultValue={item?.duration} />
        <Field label="Price" name="price" type="number" defaultValue={item?.price || 0} />
      </div>
      <Field label="Price note" name="priceNote" defaultValue={item?.priceNote} />
      <TextArea label="Itinerary JSON" name="itinerary" rows={7} defaultValue={JSON.stringify(item?.itinerary ?? [], null, 2)} />
      <TextArea label="Inclusions, one per line" name="inclusions" defaultValue={(item?.inclusions ?? []).join("\n")} />
      <TextArea label="Exclusions, one per line" name="exclusions" defaultValue={(item?.exclusions ?? []).join("\n")} />
      <TextArea label="Hotel details" name="hotels" defaultValue={item?.hotels} />
      <TextArea label="Cab details" name="cabDetails" defaultValue={item?.cabDetails} />
      <TextArea label="Images JSON" name="images" rows={6} defaultValue={JSON.stringify(item?.images ?? [], null, 2)} />
      <TextArea label="FAQs JSON" name="faqs" rows={6} defaultValue={JSON.stringify(item?.faqs ?? [], null, 2)} />
      <TextArea label="Reviews JSON" name="reviews" rows={5} defaultValue={JSON.stringify(item?.reviews ?? [], null, 2)} />
      <TextArea label="Schema fields JSON" name="schemaFields" rows={4} defaultValue={JSON.stringify(item?.schemaFields ?? {}, null, 2)} />
      <TextArea label="Related package slugs" name="relatedPackages" defaultValue={(item?.relatedPackages ?? []).join("\n")} />
      <TextArea label="Related blog slugs" name="relatedBlogs" defaultValue={(item?.relatedBlogs ?? []).join("\n")} />
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-1 text-sm font-semibold">
          Status
          <select className="admin-input" name="status" defaultValue={item?.status ?? "DRAFT"}>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </label>
        <label className="flex items-center gap-2 pt-6 text-sm font-semibold">
          <input type="checkbox" name="indexable" defaultChecked={item?.indexable ?? true} />
          Index page
        </label>
      </div>
    </div>
  );
}

export function BlogAdminFields({ item }: { item?: BlogPostItem }) {
  return (
    <div className="grid gap-4">
      {item ? <input type="hidden" name="id" value={item.id} /> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title" name="title" defaultValue={item?.title} />
        <Field label="Slug" name="slug" defaultValue={item?.slug} />
      </div>
      <Field label="SEO title" name="seoTitle" defaultValue={item?.seoTitle} />
      <TextArea label="Meta description" name="metaDescription" defaultValue={item?.metaDescription} rows={2} />
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Canonical URL" name="canonicalUrl" defaultValue={item?.canonicalUrl} />
        <Field label="OG image" name="ogImage" defaultValue={item?.ogImage} />
      </div>
      <Field label="Featured image" name="featuredImage" defaultValue={item?.featuredImage} />
      <Field label="Author" name="author" defaultValue={item?.author || "Funzip Editorial Team"} />
      <TextArea label="Markdown content" name="content" rows={10} defaultValue={item?.content} />
      <TextArea label="FAQs JSON" name="faqs" rows={6} defaultValue={JSON.stringify(item?.faqs ?? [], null, 2)} />
      <TextArea label="Related package slugs" name="relatedPackages" defaultValue={(item?.relatedPackages ?? []).join("\n")} />
      <TextArea label="Internal links JSON" name="internalLinks" rows={5} defaultValue={JSON.stringify(item?.internalLinks ?? [], null, 2)} />
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-1 text-sm font-semibold">
          Status
          <select className="admin-input" name="status" defaultValue={item?.status ?? "DRAFT"}>
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="ARCHIVED">Archived</option>
          </select>
        </label>
        <label className="flex items-center gap-2 pt-6 text-sm font-semibold">
          <input type="checkbox" name="indexable" defaultChecked={item?.indexable ?? true} />
          Index page
        </label>
      </div>
    </div>
  );
}
