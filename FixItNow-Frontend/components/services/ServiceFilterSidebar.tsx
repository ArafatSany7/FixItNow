"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, RefreshCcw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface Category {
  id: string;
  title: string;
  description: string;
}

interface ServiceFilterSidebarProps {
  categories: Category[];
}

export function ServiceFilterSidebar({ categories }: ServiceFilterSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [minRating, setMinRating] = useState(searchParams.get("minRating") || "");

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchQuery) params.set("search", searchQuery);
    else params.delete("search");

    if (selectedCategory) params.set("category", selectedCategory.toLowerCase());
    else params.delete("category");

    if (minPrice) params.set("minPrice", minPrice);
    else params.delete("minPrice");

    if (maxPrice) params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");

    if (location) params.set("location", location);
    else params.delete("location");

    if (minRating) params.set("minRating", minRating);
    else params.delete("minRating");

    window.history.pushState(null, '', `?${params.toString()}`);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice("");
    setMaxPrice("");
    setLocation("");
    setMinRating("");
    window.history.pushState(null, '', `/services`);
  };

  return (
    <>
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
        <div className="space-y-3">
          <h3 className="font-semibold text-text">Search Services</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text/50" />
            <Input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. Plumbing, AC Repair" 
              className="pl-9 bg-transparent border-secondary h-11 focus-visible:ring-primary"
            />
          </div>
        </div>

        <div className="h-px bg-secondary/20 w-full" />

        <div className="space-y-3">
          <h3 className="font-semibold text-text">Categories</h3>
          <div className="space-y-2 max-h-[140px] overflow-y-auto pr-2 custom-scrollbar">
            {categories.length === 0 ? (
              <div className="text-sm text-text/50 py-2">No categories available</div>
            ) : (
              categories.map((cat) => {
                const isActive = selectedCategory.toLowerCase() === cat.title.toLowerCase();
                return (
                  <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="category"
                      checked={isActive}
                      onChange={() => setSelectedCategory(cat.title)}
                      className="rounded-full border-secondary/30 text-primary focus:ring-primary bg-secondary/10" 
                    />
                    <span className={`text-sm transition-colors ${isActive ? "text-primary font-medium" : "text-text/80 hover:text-primary"}`}>{cat.title}</span>
                  </label>
                );
              })
            )}
          </div>
        </div>

        <div className="h-px bg-secondary/20 w-full" />

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

        <div className="h-px bg-secondary/20 w-full" />

        <div className="space-y-3">
          <h3 className="font-semibold text-text">Location</h3>
          <Input 
            type="text" 
            placeholder="City or Address" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-transparent border-secondary h-10 text-sm focus-visible:ring-primary" 
          />
        </div>

        <div className="h-px bg-secondary/20 w-full" />

        <div className="space-y-3">
          <h3 className="font-semibold text-text">Rating</h3>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="minRating"
                  checked={minRating === rating.toString()}
                  onChange={() => setMinRating(rating.toString())}
                  className="rounded-full border-secondary/30 text-primary focus:ring-primary bg-secondary/10" 
                />
                <span className={`text-sm transition-colors ${minRating === rating.toString() ? "text-primary font-medium" : "text-text/80 hover:text-primary"}`}>
                  {rating}+ Stars
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button onClick={handleResetFilters} variant="outline" className="w-full border-secondary/50 text-text/80 hover:bg-secondary/10 h-11 flex items-center justify-center gap-2">
            <RefreshCcw className="h-4 w-4" /> Reset
          </Button>
          <Button onClick={handleApplyFilters} className="w-full bg-primary text-background hover:bg-primary/90 h-11">
            Apply
          </Button>
        </div>
      </motion.div>
    </>
  );
}
