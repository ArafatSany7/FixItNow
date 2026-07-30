import { ServiceFilterSidebar } from "@/components/services/ServiceFilterSidebar";
import { ServiceGrid } from "@/components/services/ServiceGrid";

export const metadata = {
  title: "Services | FixItNow",
  description: "Browse and book professional home services",
};

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 flex flex-col md:flex-row gap-8 min-h-[calc(100vh-4rem)]">
      {/* Sidebar for Filters */}
      <aside className="w-full md:w-64 lg:w-80 shrink-0">
        <ServiceFilterSidebar />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-text mb-2">Available Services</h1>
          <p className="text-text/70">Find the right professional for your needs.</p>
        </div>
        
        <ServiceGrid />
      </main>
    </div>
  );
}
