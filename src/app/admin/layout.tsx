import type { ReactNode } from "react";
import type { Metadata } from "next";
import { AdminNav } from "@/components/admin-nav";
import { isAdminAuthenticated } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const authed = await isAdminAuthenticated();

  if (!authed) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-muted lg:grid lg:grid-cols-[240px_1fr]">
      <AdminNav />
      <main className="min-w-0 p-4 md:p-8">{children}</main>
    </div>
  );
}
