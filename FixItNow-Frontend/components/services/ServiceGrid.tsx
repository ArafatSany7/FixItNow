"use client";

import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { ServiceCard } from "./ServiceCard";

interface ServiceGridProps {
  initialServices: any[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function ServiceGrid({ initialServices }: ServiceGridProps) {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");
  const searchCategory = searchParams.get("category");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const location = searchParams.get("location");
  const minRating = searchParams.get("minRating");
  
  const filteredServices = initialServices.filter(s => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesTitle = s.title?.toLowerCase().includes(query);
      const matchesCategory = s.category?.toLowerCase().includes(query);
      if (!matchesTitle && !matchesCategory) return false;
    }
    if (searchCategory && s.category.toLowerCase() !== searchCategory.toLowerCase()) return false;
    if (minPrice && s.price < Number(minPrice)) return false;
    if (maxPrice && s.price > Number(maxPrice)) return false;
    if (location && !s.location.toLowerCase().includes(location.toLowerCase())) return false;
    if (minRating && s.technician.rating < Number(minRating)) return false;
    return true;
  });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
    >
      {filteredServices.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
      {filteredServices.length === 0 && (
        <div className="col-span-full py-12 text-center text-text/60">
          No services found matching your filters.
        </div>
      )}
    </motion.div>
  );
}
