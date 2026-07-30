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
    <div className="container mx-auto px-4 md:px-6 py-8 flex flex-col md:flex-row gap-8 min-h-[calc(100vh-4rem)]">
      <aside className="w-full md:w-64 shrink-0">
        <AdminSidebar />
      </aside>

      <main className="flex-1 bg-background border border-secondary/20 rounded-2xl p-6 shadow-sm">
        {children}
      </main>
    </div>
  );
}
