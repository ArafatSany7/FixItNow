import { HeroSection } from "@/components/home/HeroSection";
import { ServiceCategories } from "@/components/home/ServiceCategories";
import { TopTechnicians } from "@/components/home/TopTechnicians";

async function getCategories() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://fixitnow-theta.vercel.app/api'}/categories`, {
      cache: 'no-store'
    });
    const data = await res.json();
    return data?.data || data || [];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

async function getTopTechnicians() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://fixitnow-theta.vercel.app/api'}/technicians`, {
      cache: 'no-store'
    });
    const data = await res.json();
    const technicians = data?.data || data || [];
    
    const shuffled = technicians.sort(() => 0.5 - Math.random());
    shuffled.sort((a: any, b: any) => (b.averageRating || 0) - (a.averageRating || 0));
    
    return shuffled.slice(0, 4).map((tech: any) => ({
      id: tech.id,
      name: tech.user?.name || "Technician",
      role: tech.skills && tech.skills.length > 0 ? tech.skills[0] : `${tech.category?.title || 'General'} Service`,
      rating: tech.averageRating || 0,
      jobs: tech.reviewCount || 0,
      avatar: tech.user?.profileImg || ""
    }));
  } catch (error) {
    console.error("Failed to fetch technicians:", error);
    return [];
  }
}

export default async function Home() {
  const categories = await getCategories();
  const topTechnicians = await getTopTechnicians();

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <HeroSection />
      <ServiceCategories categories={categories} />
      <TopTechnicians technicians={topTechnicians} />
    </div>
  );
}
