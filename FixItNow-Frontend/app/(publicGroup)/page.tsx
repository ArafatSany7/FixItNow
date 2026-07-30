import { HeroSection } from "@/components/home/HeroSection";
import { ServiceCategories } from "@/components/home/ServiceCategories";
import { TopTechnicians } from "@/components/home/TopTechnicians";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <HeroSection />
      <ServiceCategories />
      <TopTechnicians />
    </div>
  );
}
