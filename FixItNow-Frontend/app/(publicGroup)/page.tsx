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

export default async function Home() {
  const categories = await getCategories();

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <HeroSection />
      <ServiceCategories categories={categories} />
      <TopTechnicians />
    </div>
  );
}
