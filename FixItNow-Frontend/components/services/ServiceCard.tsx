"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, MapPin, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceProps {
  service: {
    id: string;
    title: string;
    category: string;
    technician: {
      name: string;
      avatar: string;
      rating: number;
      reviews: number;
    };
    price: number;
    location: string;
    image: string;
  };
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ServiceCard({ service }: ServiceProps) {
  return (
    <motion.div variants={itemVariants} className="h-full">
      <div className="group flex flex-col bg-background rounded-xl border border-secondary/20 overflow-hidden hover:shadow-lg transition-all hover:border-primary/30 h-full p-5">
        
        {/* Top Section with Category Badge */}
        <div className="flex justify-between items-start mb-3">
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold border border-primary/20">
            {service.category}
          </div>
        </div>

        {/* Content Container */}
        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-text line-clamp-2 leading-tight">
              {service.title}
            </h3>
          </div>
          
          <div className="flex items-center gap-1.5 mb-4 text-sm text-text/60">
            <MapPin className="h-3.5 w-3.5" />
            <span className="truncate">{service.location}</span>
          </div>

          <div className="mt-auto pt-4 border-t border-secondary/20">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-secondary/20 flex items-center justify-center text-primary font-bold shadow-sm">
                  {service.technician.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text flex items-center gap-1">
                    {service.technician.name}
                    <BadgeCheck className="h-3.5 w-3.5 text-primary" />
                  </p>
                  <div className="flex items-center gap-1 text-xs text-text/70">
                    <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                    <span className="font-medium text-text">{service.technician.rating}</span>
                    <span>({service.technician.reviews})</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-text/60">Starting at</p>
                <p className="font-bold text-primary text-lg">${service.price}</p>
              </div>
            </div>

            <Button asChild className="w-full bg-primary/10 hover:bg-primary hover:text-background text-primary border border-primary/20 transition-colors">
              <Link href={`/technicians/${service.id}`}>
                View Details
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
