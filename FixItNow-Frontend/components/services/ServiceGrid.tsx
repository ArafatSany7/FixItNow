"use client";

import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { ServiceCard } from "./ServiceCard";


const dummyServices = [
  {
    id: "1",
    title: "Emergency Pipe Leak Repair",
    category: "Plumbing",
    technician: {
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
      rating: 4.9,
      reviews: 124,
    },
    price: 45,
    location: "Dhaka",
    image: "https://images.unsplash.com/photo-1607472586893-edb57cb31311?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Complete Home Deep Cleaning",
    category: "Cleaning",
    technician: {
      name: "Sarah Smith",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
      rating: 4.8,
      reviews: 89,
    },
    price: 80,
    location: "Dhaka",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Electrical Panel Upgrade",
    category: "Electrical",
    technician: {
      name: "Mike Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      rating: 5.0,
      reviews: 42,
    },
    price: 150,
    location: "Dhaka",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function ServiceGrid() {
  const searchParams = useSearchParams();
  const searchCategory = searchParams.get("category");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  
  const filteredServices = dummyServices.filter(s => {
    if (searchCategory && s.category.toLowerCase() !== searchCategory.toLowerCase()) return false;
    if (minPrice && s.price < Number(minPrice)) return false;
    if (maxPrice && s.price > Number(maxPrice)) return false;
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
