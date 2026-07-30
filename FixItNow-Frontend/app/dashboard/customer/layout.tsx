import { CustomerSidebar } from "@/components/dashboard/customer/CustomerSidebar";

export const metadata = {
  title: "Customer Dashboard | FixItNow",
  description: "Manage your bookings and payments",
};

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8 flex flex-col md:flex-row gap-8 min-h-[calc(100vh-4rem)]">

      <aside className="w-full md:w-64 shrink-0">
        <CustomerSidebar />
      </aside>


      <main className="flex-1 bg-background border border-secondary/20 rounded-2xl p-6 shadow-sm">
        {children}
      </main>
    </div>
  );
}
