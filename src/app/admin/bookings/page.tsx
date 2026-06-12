import { saveBookingAction } from "@/lib/admin-actions";
import { requireAdmin } from "@/lib/auth";
import { getPackages } from "@/lib/data";
import { withDatabase } from "@/lib/prisma";

const bookingStatuses = [
  "INQUIRY",
  "QUOTE_SENT",
  "ADVANCE_PENDING",
  "CONFIRMED",
  "COMPLETED",
  "CANCELLED",
];

export default async function AdminBookingsPage() {
  await requireAdmin();
  const [bookings, leads, packages] = await Promise.all([
    withDatabase((db) => db.booking.findMany({ orderBy: { createdAt: "desc" }, take: 100 })),
    withDatabase((db) => db.lead.findMany({ orderBy: { createdAt: "desc" }, take: 100 })),
    getPackages(true),
  ]);

  return (
    <div className="grid gap-8">
      <section>
        <h1 className="text-3xl font-black text-brand-dark">Booking dashboard</h1>
        <p className="mt-2 text-foreground/65">
          Manual CRM-style tracking for inquiries, quotes, advances, confirmed
          trips, completed trips, and cancellations.
        </p>
      </section>
      <section className="rounded-lg border border-line bg-white p-5 shadow-sm">
        <h2 className="text-xl font-black text-brand-dark">Create booking</h2>
        <form action={saveBookingAction} className="mt-5 grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-1 text-sm font-semibold">
              Lead
              <select className="admin-input" name="leadId">
                <option value="">Manual booking</option>
                {(leads ?? []).map((lead) => (
                  <option key={lead.id} value={lead.id}>{lead.name} - {lead.phone}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-1 text-sm font-semibold">
              Package
              <select className="admin-input" name="packageId">
                <option value="">Custom trip</option>
                {packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>{pkg.title}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <input className="admin-input" name="customerName" placeholder="Customer name" required />
            <input className="admin-input" name="phone" placeholder="Phone" required />
            <select className="admin-input" name="status" defaultValue="INQUIRY">
              {bookingStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            <input className="admin-input" name="travelDate" type="date" />
            <input className="admin-input" name="numberOfPeople" type="number" min="1" placeholder="People" />
            <input className="admin-input" name="quoteAmount" type="number" placeholder="Quote" />
            <input className="admin-input" name="advanceAmount" type="number" placeholder="Advance" />
          </div>
          <textarea className="admin-input" name="notes" rows={3} placeholder="Notes" />
          <button className="w-fit rounded-md bg-brand px-4 py-2 text-sm font-bold text-white">Save booking</button>
        </form>
      </section>
      <section className="overflow-x-auto rounded-lg border border-line bg-white shadow-sm">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-muted text-foreground/60">
            <tr>
              <th className="p-3">Customer</th>
              <th>Status</th>
              <th>People</th>
              <th>Quote</th>
              <th>Advance</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {(bookings ?? []).map((booking) => (
              <tr key={booking.id} className="border-t border-line">
                <td className="p-3 font-bold">{booking.customerName}<br />{booking.phone}</td>
                <td>{booking.status}</td>
                <td>{booking.numberOfPeople}</td>
                <td>{booking.quoteAmount}</td>
                <td>{booking.advanceAmount}</td>
                <td>{booking.balanceAmount}</td>
              </tr>
            ))}
            {!bookings?.length ? (
              <tr><td className="p-6 text-foreground/60" colSpan={6}>No bookings yet.</td></tr>
            ) : null}
          </tbody>
        </table>
      </section>
    </div>
  );
}
