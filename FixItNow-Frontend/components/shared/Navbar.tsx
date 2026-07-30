"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Wrench } from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { AnimatePresence, motion } from "framer-motion";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-secondary/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">

        <Link href="/" className="flex items-center gap-2">
          <Wrench className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight text-text">FixIt<span className="text-primary">Now</span></span>
        </Link>


        <div className="hidden md:flex md:items-center md:gap-6">
          <Link href="/services" className="text-sm font-medium text-text/80 transition-colors hover:text-primary">
            Services
          </Link>
          <Link href="/about" className="text-sm font-medium text-text/80 transition-colors hover:text-primary">
            About Us
          </Link>
          <ThemeToggle />
          <div className="flex items-center gap-4 ml-2">
            <Button variant="ghost" asChild className="text-text hover:text-primary hover:bg-secondary/20">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild className="bg-primary text-background hover:bg-primary/90">
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </div>




        <button
          className="md:hidden text-text"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="container mx-auto px-4 overflow-hidden md:hidden border-b border-secondary/50 bg-background/95 backdrop-blur"
          >
            <div className="flex flex-col space-y-4 py-4">
              <Link
                href="/services"
                className="text-sm font-medium text-text/80 transition-colors hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-text/80 transition-colors hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <div className="flex items-center justify-between py-2 border-t border-secondary/20">
                <span className="text-sm font-medium text-text/80">Theme</span>
                <ThemeToggle />
              </div>
              <div className="flex flex-col gap-2 pt-4 border-t border-secondary/50">
                <Button variant="outline" asChild className="w-full justify-center border-secondary text-text hover:bg-secondary/20">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                </Button>
                <Button asChild className="w-full justify-center bg-primary text-background hover:bg-primary/90">
                  <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
