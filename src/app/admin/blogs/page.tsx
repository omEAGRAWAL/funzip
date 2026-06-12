import { BlogAdminFields } from "@/components/admin-fields";
import { deleteBlogAction, saveBlogAction } from "@/lib/admin-actions";
import { requireAdmin } from "@/lib/auth";
import { getBlogs } from "@/lib/data";

export default async function AdminBlogsPage() {
  await requireAdmin();
  const blogs = await getBlogs(true);

  return (
    <div className="grid gap-8">
      <section>
        <h1 className="text-3xl font-black text-brand-dark">Blogs</h1>
        <p className="mt-2 text-foreground/65">
          Manage blog SEO title, meta description, slug, canonical URL, OG image,
          FAQs, related packages, internal links, and Markdown article content.
        </p>
      </section>

      <section className="rounded-lg border border-line bg-white p-5 shadow-sm">
        <h2 className="text-xl font-black text-brand-dark">Create blog</h2>
        <form action={saveBlogAction} className="mt-5">
          <BlogAdminFields />
          <button className="mt-5 rounded-md bg-brand px-4 py-2 text-sm font-bold text-white">
            Create blog
          </button>
        </form>
      </section>

      <section className="grid gap-5">
        <h2 className="text-xl font-black text-brand-dark">Existing blogs</h2>
        {blogs.map((item) => (
          <details key={item.id} className="rounded-lg border border-line bg-white p-5 shadow-sm">
            <summary className="cursor-pointer text-lg font-black text-brand-dark">
              {item.title} <span className="text-sm text-foreground/50">/{item.slug}</span>
            </summary>
            <form action={saveBlogAction} className="mt-5">
              <BlogAdminFields item={item} />
              <button className="mt-5 rounded-md bg-brand px-4 py-2 text-sm font-bold text-white">
                Save changes
              </button>
            </form>
            <form action={deleteBlogAction} className="mt-3">
              <input type="hidden" name="id" value={item.id} />
              <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-bold text-white">
                Delete
              </button>
            </form>
          </details>
        ))}
      </section>
    </div>
  );
}
