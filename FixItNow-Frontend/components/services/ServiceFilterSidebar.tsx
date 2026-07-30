"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export function ServiceFilterSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (selectedCategory) params.set("category", selectedCategory.toLowerCase());
    else params.delete("category");

    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");

    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");

    router.push(`?${params.toString()}`);
  };

  return (
    <>
      {/* Mobile Toggle */}
      <div className="md:hidden mb-4">
        <Button 
          variant="outline" 
          className="w-full h-12 border-secondary bg-transparent flex items-center justify-between"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </span>
          <span className="text-sm font-normal text-text/60">
            {isMobileOpen ? "Hide" : "Show"}
          </span>
        </Button>
      </div>

      <motion.div 
        className={`bg-background border border-secondary/20 rounded-xl p-5 shadow-sm space-y-6 ${isMobileOpen ? 'block' : 'hidden md:block'}`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Search */}
        <div className="space-y-3">
          <h3 className="font-semibold text-text">Search Services</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text/50" />
            <Input 
              placeholder="e.g. Plumbing, AC Repair" 
              className="pl-9 bg-transparent border-secondary h-11 focus-visible:ring-primary"
            />
          </div>
        </div>

        <div className="h-px bg-secondary/20 w-full" />

        {/* Categories */}
        <div className="space-y-3">
          <h3 className="font-semibold text-text">Categories</h3>
          <div className="space-y-2">
            {["Plumbing", "Electrical", "Cleaning", "Appliance Repair", "Carpentry", "Painting"].map((cat) => {
              const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <label key={cat} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="category"
                    checked={isActive}
                    onChange={() => setSelectedCategory(cat)}
                    className="rounded-full border-secondary/30 text-primary focus:ring-primary bg-secondary/10" 
                  />
                  <span className={`text-sm transition-colors ${isActive ? "text-primary font-medium" : "text-text/80 hover:text-primary"}`}>{cat}</span>
                </label>
              );
            })}
          </div>
        </div>

        <div className="h-px bg-secondary/20 w-full" />

        {/* Price Range */}
        <div className="space-y-3">
          <h3 className="font-semibold text-text">Price Range (Starting)</h3>
          <div className="flex gap-2 items-center">
            <Input 
              type="number" 
              placeholder="Min" 
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="bg-transparent border-secondary h-10 text-sm" 
            />
            <span className="text-text/50">-</span>
            <Input 
              type="number" 
              placeholder="Max" 
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="bg-transparent border-secondary h-10 text-sm" 
            />
          </div>
        </div>

        <Button onClick={handleApplyFilters} className="w-full bg-primary text-background hover:bg-primary/90 h-11">
          Apply Filters
        </Button>
      </motion.div>
    </>
  );
}
