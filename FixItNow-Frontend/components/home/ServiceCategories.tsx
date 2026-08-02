"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const getCategoryIcon = (title: string) => {
  const t = title.toLowerCase();
  let src = "/icons/Cleaning-removebg-preview.png";

  if (t.includes('clean')) src = "/icons/Cleaning-removebg-preview.png";
  else if (t.includes('electric')) src = "/icons/Electrical-removebg-preview.png";
  else if (t.includes('plumb')) src = "/icons/Plumbing-removebg-preview.png";
  else if (t.includes('interior') || t.includes('design')) src = "/icons/Interior-removebg-preview.png";
  else if (t.includes('network') || t.includes('internet')) src = "/icons/Network_provider-removebg-preview.png";
  else if (t.includes('waste') || t.includes('garbage')) src = "/icons/Waste_Loader-removebg-preview.png";
  else if (t.includes('watch') || t.includes('security') || t.includes('guard')) src = "/icons/Watchmen-removebg-preview.png";
  else if (t.includes('water')) src = "/icons/Water_duistributor-removebg-preview.png";

  return <Image src={src} alt={title} width={56} height={56} className="object-contain drop-shadow-sm" />;
};

interface Category {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

interface ServiceCategoriesProps {
  categories: Category[];
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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ServiceCategories({ categories }: ServiceCategoriesProps) {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-background border-t border-secondary/20">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center text-center space-y-4 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-text"
          >
            Explore <span className="text-primary">Categories</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-[700px] text-text/70 md:text-xl/relaxed"
          >
            Find exactly what you need from our wide range of professional home services.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.slice(0, 8).map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link href={`/services?category=${category.title.toLowerCase()}`}>
                <div className="group relative overflow-hidden rounded-xl border border-secondary/30 bg-background/50 p-6 hover:bg-secondary/10 hover:border-primary/50 transition-all duration-300">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-secondary/5 text-primary group-hover:scale-110 group-hover:bg-primary/5 transition-transform duration-300">
                      {getCategoryIcon(category.title)}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-text group-hover:text-primary transition-colors">{category.title}</h3>
                      <p className="text-sm text-text/60">{category.description || 'Professional home service'}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          <motion.div variants={itemVariants}>
            <Link href="/services">
              <div className="group relative overflow-hidden rounded-xl border border-primary/40 bg-primary/5 p-6 hover:bg-primary/10 hover:border-primary transition-all duration-300 h-full flex items-center">
                <div className="flex items-center gap-4 w-full">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-primary text-background group-hover:scale-110 transition-transform duration-300">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-primary transition-colors">Explore More</h3>
                    <p className="text-sm text-text/60">View all available service categories</p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
