import { ServiceFilterSidebar } from "@/components/services/ServiceFilterSidebar";
import { ServiceGrid } from "@/components/services/ServiceGrid";

export const metadata = {
  title: "Services | FixItNow",
  description: "Browse and book professional home services",
};

async function getCategories() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://fixitnow-theta.vercel.app/api'}/categories`, {
      cache: 'no-store'
    });
    const data = await res.json();
    return data?.data || data || [];
  } catch (error) {
    return [];
  }
}

async function getTechnicians() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://fixitnow-theta.vercel.app/api'}/technicians`, {
      cache: 'no-store'
    });
    const data = await res.json();
    const technicians = data?.data || data || [];
    
    return technicians.map((tech: any) => ({
      id: tech.id,
      title: tech.skills && tech.skills.length > 0 ? tech.skills[0] : `${tech.category?.title} Service`,
      category: tech.category?.title || "General",
      technician: {
        name: tech.user?.name || "Technician",
        avatar: tech.user?.profileImg || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
        rating: 4.8, 
        reviews: 12,
      },
      price: tech.pricing || 0,
      location: tech.user?.address || "Available Locally",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop",
    }));
  } catch (error) {
    return [];
  }
}

export default async function ServicesPage() {
  const categories = await getCategories();
  const technicians = await getTechnicians();

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 flex flex-col md:flex-row gap-8 min-h-[calc(100vh-4rem)]">
      <aside className="w-full md:w-64 lg:w-80 shrink-0">
        <ServiceFilterSidebar categories={categories} />
      </aside>

      <main className="flex-1">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-text mb-2">Available Services</h1>
          <p className="text-text/70">Find the right professional for your needs.</p>
        </div>
        
        <ServiceGrid initialServices={technicians} />
      </main>
    </div>
  );
}
