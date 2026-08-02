import { AdminSidebar } from "@/components/dashboard/admin/AdminSidebar";

export const metadata = {
  title: "Admin Dashboard | FixItNow",
  description: "Platform management and analytics",
};

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 md:px-6 py-4 md:py-8 flex flex-col md:flex-row gap-4 md:gap-8 items-start min-h-[calc(100vh-4rem)]">
      <aside className="w-full shrink-0 md:w-64 md:sticky md:top-6 z-40">
        <AdminSidebar />
      </aside>

      <main className="flex-1 min-w-0 bg-background border border-secondary/20 rounded-2xl p-4 md:p-6 shadow-sm overflow-hidden w-full">
        {children}
      </main>
    </div>
  );
}
