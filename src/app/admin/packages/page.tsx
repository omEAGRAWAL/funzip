import { PackageAdminFields } from "@/components/admin-fields";
import {
  clonePackageAction,
  deletePackageAction,
  savePackageAction,
} from "@/lib/admin-actions";
import { requireAdmin } from "@/lib/auth";
import { getPackages } from "@/lib/data";

export default async function AdminPackagesPage() {
  await requireAdmin();
  const packages = await getPackages(true);

  return (
    <div className="grid gap-8">
      <section>
        <h1 className="text-3xl font-black text-brand-dark">Packages</h1>
        <p className="mt-2 text-foreground/65">
          Create, edit, clone, delete, publish, noindex, and manage package SEO,
          schema, images, itinerary, inclusions, exclusions, reviews, and price.
        </p>
      </section>

      <section className="rounded-lg border border-line bg-white p-5 shadow-sm">
        <h2 className="text-xl font-black text-brand-dark">Create package</h2>
        <form action={savePackageAction} className="mt-5">
          <PackageAdminFields />
          <button className="mt-5 rounded-md bg-brand px-4 py-2 text-sm font-bold text-white">
            Create package
          </button>
        </form>
      </section>

      <section className="grid gap-5">
        <h2 className="text-xl font-black text-brand-dark">Existing packages</h2>
        {packages.map((item) => (
          <details key={item.id} className="rounded-lg border border-line bg-white p-5 shadow-sm">
            <summary className="cursor-pointer text-lg font-black text-brand-dark">
              {item.title} <span className="text-sm text-foreground/50">/{item.slug}</span>
            </summary>
            <div className="mt-5 grid gap-4">
              <form action={savePackageAction}>
                <PackageAdminFields item={item} />
                <button className="mt-5 rounded-md bg-brand px-4 py-2 text-sm font-bold text-white">
                  Save changes
                </button>
              </form>
              <div className="flex flex-wrap gap-2">
                <form action={clonePackageAction}>
                  <input type="hidden" name="id" value={item.id} />
                  <button className="rounded-md border border-brand px-4 py-2 text-sm font-bold text-brand">
                    Clone
                  </button>
                </form>
                <form action={deletePackageAction}>
                  <input type="hidden" name="id" value={item.id} />
                  <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-bold text-white">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </details>
        ))}
      </section>
    </div>
  );
}
