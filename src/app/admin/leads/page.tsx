import { updateLeadStatusAction } from "@/lib/admin-actions";
import { requireAdmin } from "@/lib/auth";
import { withDatabase } from "@/lib/prisma";

const statuses = [
  "NEW",
  "CONTACTED",
  "INTERESTED",
  "QUOTE_SENT",
  "FOLLOW_UP",
  "BOOKED",
  "LOST",
  "SPAM",
];

export default async function AdminLeadsPage() {
  await requireAdmin();
  const leads =
    (await withDatabase((db) =>
      db.lead.findMany({ orderBy: { createdAt: "desc" }, take: 100 }),
    )) ?? [];

  return (
    <div>
      <h1 className="text-3xl font-black text-brand-dark">Leads data table</h1>
      <p className="mt-2 text-foreground/65">
        Captures name, phone, optional travel details, source page, UTM,
        referrer, device, interested package, lead type, and status.
      </p>
      <div className="mt-6 overflow-x-auto rounded-lg border border-line bg-white shadow-sm">
        <table className="w-full min-w-[1100px] text-left text-sm">
          <thead className="bg-muted text-foreground/60">
            <tr>
              <th className="p-3">Lead</th>
              <th>Trip</th>
              <th>Attribution</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Save</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-t border-line align-top">
                <td className="p-3">
                  <p className="font-black">{lead.name}</p>
                  <p>{lead.phone}</p>
                  <p className="text-foreground/50">{lead.leadType}</p>
                </td>
                <td>
                  <p>{lead.interestedPackage}</p>
                  <p>{lead.travelLocation}</p>
                  <p>{lead.numberOfPeople ? `${lead.numberOfPeople} people` : ""}</p>
                </td>
                <td>
                  <p className="max-w-xs truncate">{lead.sourcePage}</p>
                  <p className="text-foreground/50">{lead.utmSource} {lead.utmCampaign}</p>
                  <p className="text-foreground/50">{lead.device}</p>
                </td>
                <td>
                  <form id={`lead-${lead.id}`} action={updateLeadStatusAction}>
                    <input type="hidden" name="id" value={lead.id} />
                    <select className="admin-input min-w-40" name="status" defaultValue={lead.status}>
                      {statuses.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </form>
                </td>
                <td>
                  <textarea
                    className="admin-input min-w-64"
                    name="notes"
                    rows={3}
                    form={`lead-${lead.id}`}
                    defaultValue={lead.notes ?? ""}
                  />
                </td>
                <td>
                  <button form={`lead-${lead.id}`} className="rounded-md bg-brand px-3 py-2 font-bold text-white">
                    Save
                  </button>
                </td>
              </tr>
            ))}
            {!leads.length ? (
              <tr>
                <td className="p-6 text-foreground/60" colSpan={6}>
                  No leads yet. Submit a public lead form after connecting a
                  PostgreSQL database.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
