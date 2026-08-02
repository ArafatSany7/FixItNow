"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Image from "next/image";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "700", "800", "900"] });

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/services?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/services");
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-background pt-12 pb-24 md:pt-20 md:pb-32">

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-secondary/5 pointer-events-none" />


      <div className="absolute left-4 top-10 md:left-16 md:top-20 opacity-20 hidden lg:block w-32 h-32 md:w-48 md:h-48 z-0">
        <Image src="/NicePng_clash-of-clans-png_640054.png" alt="Builder" fill className="object-contain" />
      </div>
      <div className="absolute left-10 bottom-20 md:left-32 md:bottom-32 opacity-20 hidden lg:block w-24 h-24 md:w-40 md:h-40 z-0">
        <Image src="/pngaaa.com-4146076.png" alt="Builder" fill className="object-contain" />
      </div>
      <div className="absolute right-4 top-40 md:right-16 md:top-48 opacity-20 hidden lg:block w-32 h-32 md:w-56 md:h-56 z-0">
        <Image src="/NicePng_coc-troops-png_3623954.png" alt="Builder" fill className="object-contain" />
      </div>

      <div className="container px-4 md:px-6 mx-auto relative z-10 flex flex-col items-center text-center">


        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center rounded-full bg-gradient-to-r from-secondary/10 via-primary/10 to-secondary/10 px-6 py-2 mb-8 md:mb-12 border border-primary/20 shadow-sm backdrop-blur-sm"
        >
          <span className="text-xl mr-3">☀️</span>
          <span className="text-xs md:text-sm font-bold tracking-widest text-text uppercase">On Demand Service Sale</span>
          <span className="text-xl ml-3">☀️</span>
        </motion.div>


        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={`text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-extrabold tracking-tight text-text leading-[1.1] max-w-5xl mb-16 relative ${outfit.className}`}
        >
          From Cleaning To Repairs <br className="hidden md:block" /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-secondary">We Handle It All</span>

          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[250px] md:w-[350px] h-[4px] md:h-[6px] bg-primary/40 rounded-[100%] blur-[1px]" />
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[180px] md:w-[250px] h-[3px] md:h-[4px] bg-secondary/40 rounded-[100%] blur-[1px]" />
        </motion.h1>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-4xl bg-secondary/5 border border-secondary/10 rounded-[2rem] p-3 md:p-6 shadow-sm"
        >

          <form onSubmit={handleSearch} className="relative w-full flex items-center bg-background border border-secondary/20 rounded-full shadow-sm p-1.5 md:p-2 pl-5 md:pl-6">
            <Search className="h-5 w-5 text-text/40 mr-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a service e.g. Cleaning, Plumbing"
              className="flex-1 bg-transparent border-none outline-none text-text placeholder:text-text/40 text-sm md:text-base py-3 min-w-0"
            />
            <Button type="submit" className="rounded-full bg-text text-background hover:bg-secondary hover:text-background px-6 md:px-10 h-11 md:h-14 shrink-0 font-medium text-sm md:text-base">
              Search
            </Button>
          </form>
        </motion.div>

      </div>
    </section>
  );
}
