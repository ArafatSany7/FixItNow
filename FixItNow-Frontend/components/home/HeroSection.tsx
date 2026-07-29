"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-background py-24 md:py-32 lg:py-40">
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col items-center text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
          >
            <Wrench className="mr-2 h-4 w-4" />
            Reliable Home Services
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-text max-w-4xl"
          >
            Fix Issues Fast with <span className="text-primary">Trusted Professionals</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto max-w-[700px] text-text/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
          >
            Book qualified and verified technicians for all your home repair and maintenance needs in just a few clicks.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Button asChild size="lg" className="bg-primary text-background hover:bg-primary/90 h-12 px-8">
              <Link href="/services">
                Book a Service
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-secondary text-text hover:bg-secondary/20 h-12 px-8">
              <Link href="/register">
                Join as Professional
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
    </section>
  );
}
