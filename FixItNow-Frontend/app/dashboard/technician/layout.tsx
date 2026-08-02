import { TechnicianSidebar } from "@/components/dashboard/technician/TechnicianSidebar";
import { ProfileGuard } from "@/components/dashboard/technician/ProfileGuard";

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
    <div className="container mx-auto px-4 md:px-6 py-4 md:py-8 flex flex-col md:flex-row gap-4 md:gap-8 items-start min-h-[calc(100vh-4rem)]">
      <aside className="w-full shrink-0 md:w-64 md:sticky md:top-6 z-40">
        <TechnicianSidebar />
      </aside>

      <main className="flex-1 min-w-0 bg-background border border-secondary/20 rounded-2xl p-4 md:p-6 shadow-sm overflow-hidden w-full">
        <ProfileGuard>
          {children}
        </ProfileGuard>
      </main>
    </div>
  );
}
