import { TechnicianSidebar } from "@/components/dashboard/technician/TechnicianSidebar";

export const metadata = {
  title: "Technician Dashboard | FixItNow",
  description: "Manage your service business",
};

export default function TechnicianDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8 flex flex-col md:flex-row gap-8 items-start min-h-[calc(100vh-4rem)]">
      <aside className="w-full md:w-64 shrink-0 sticky top-6">
        <TechnicianSidebar />
      </aside>

      <main className="flex-1 min-w-0 bg-background border border-secondary/20 rounded-2xl p-6 shadow-sm overflow-hidden">
        {children}
      </main>
    </div>
  );
}
