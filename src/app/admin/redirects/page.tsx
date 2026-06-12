import { deleteRedirectAction, saveRedirectAction } from "@/lib/admin-actions";
import { requireAdmin } from "@/lib/auth";
import { withDatabase } from "@/lib/prisma";

export default async function AdminRedirectsPage() {
  await requireAdmin();
  const redirects =
    (await withDatabase((db) =>
      db.redirect.findMany({ orderBy: { updatedAt: "desc" }, take: 100 }),
    )) ?? [];

  return (
    <div className="grid gap-8">
      <section>
        <h1 className="text-3xl font-black text-brand-dark">Redirect manager</h1>
        <p className="mt-2 text-foreground/65">
          Active redirects are checked by the Next.js proxy through a lightweight
          route handler. Use full paths like <code>/old-kashmir-package</code>.
        </p>
      </section>
      <section className="rounded-lg border border-line bg-white p-5 shadow-sm">
        <h2 className="text-xl font-black text-brand-dark">Add redirect</h2>
        <form action={saveRedirectAction} className="mt-5 grid gap-4 md:grid-cols-[1fr_1fr_120px_120px_auto] md:items-end">
          <label className="grid gap-1 text-sm font-semibold">
            Source
            <input className="admin-input" name="source" placeholder="/old-url" required />
          </label>
          <label className="grid gap-1 text-sm font-semibold">
            Target
            <input className="admin-input" name="target" placeholder="/new-url" required />
          </label>
          <label className="grid gap-1 text-sm font-semibold">
            Status
            <select className="admin-input" name="status" defaultValue="308">
              <option value="308">308</option>
              <option value="307">307</option>
              <option value="301">301</option>
              <option value="302">302</option>
            </select>
          </label>
          <label className="flex items-center gap-2 pb-3 text-sm font-semibold">
            <input type="checkbox" name="active" defaultChecked />
            Active
          </label>
          <button className="rounded-md bg-brand px-4 py-2 text-sm font-bold text-white">Save</button>
        </form>
      </section>
      <section className="overflow-x-auto rounded-lg border border-line bg-white shadow-sm">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-muted text-foreground/60">
            <tr>
              <th className="p-3">Source</th>
              <th>Target</th>
              <th>Status</th>
              <th>Active</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {redirects.map((item) => (
              <tr key={item.id} className="border-t border-line">
                <td className="p-3 font-bold">{item.source}</td>
                <td>{item.target}</td>
                <td>{item.status}</td>
                <td>{item.active ? "Yes" : "No"}</td>
                <td>
                  <form action={deleteRedirectAction}>
                    <input type="hidden" name="id" value={item.id} />
                    <button className="rounded-md bg-red-600 px-3 py-2 font-bold text-white">Delete</button>
                  </form>
                </td>
              </tr>
            ))}
            {!redirects.length ? (
              <tr><td className="p-6 text-foreground/60" colSpan={5}>No redirects yet.</td></tr>
            ) : null}
          </tbody>
        </table>
      </section>
    </div>
  );
}
