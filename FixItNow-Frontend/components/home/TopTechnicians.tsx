"use client";

import { motion } from "framer-motion";
import { Star, User } from "lucide-react";

const technicians = [
  { 
    name: "Karim", 
    role: "Master Electrician", 
    rating: 4.9, 
    jobs: 142
  },
  { 
    name: "Rahim", 
    role: "Expert Plumber", 
    rating: 4.8, 
    jobs: 98
  },
  { 
    name: "Jodu", 
    role: "AC Technician", 
    rating: 5.0, 
    jobs: 215
  },
  { 
    name: "Kodu", 
    role: "Interior Painter", 
    rating: 4.7, 
    jobs: 64
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

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export function TopTechnicians() {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-background/50 border-t border-secondary/20">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center text-center space-y-4 mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-text"
          >
            Our Top <span className="text-primary">Professionals</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-[700px] text-text/70 md:text-xl/relaxed"
          >
            Highly rated and vetted experts ready to solve your problems.
          </motion.p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {technicians.map((tech, index) => (
            <motion.div key={index} variants={itemVariants}>
              <div className="flex flex-col items-center p-6 rounded-2xl border border-secondary/30 bg-background hover:border-primary/50 hover:shadow-[0_0_15px_rgba(151,192,211,0.1)] transition-all duration-300">
                <div className="flex items-center justify-center w-24 h-24 rounded-full mb-4 border-2 border-primary/20 bg-secondary/10">
                  <User className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-text mb-1">{tech.name}</h3>
                <p className="text-sm text-text/60 mb-3">{tech.role}</p>
                <div className="flex items-center gap-1 bg-secondary/10 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-accent fill-accent" />
                  <span className="text-sm font-semibold text-text">{tech.rating}</span>
                  <span className="text-xs text-text/50 ml-1">({tech.jobs} jobs)</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
