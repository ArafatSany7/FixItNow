"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Wrench, LogOut, LayoutDashboard } from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { AnimatePresence, motion } from "framer-motion";
import { getToken, removeToken } from "@/lib/cookie";
import { jwtDecode } from "jwt-decode";
import { Skeleton } from "@/components/ui/skeleton";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUserRole(decoded.role);
      } catch (error) {
        removeToken();
      }
    }
    setIsAuthLoading(false);
  }, []);

  const handleLogout = () => {
    removeToken();
    setUserRole(null);
    router.push("/login");
  };

  const getDashboardLink = () => {
    if (userRole === "ADMIN" || userRole === "SUPER_ADMIN") return "/dashboard/admin";
    if (userRole === "TECHNICIAN") return "/dashboard/technician";
    return "/dashboard/customer";
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-secondary/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">

        <Link href="/" className="flex items-center gap-2">
          <Wrench className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight text-text">FixIt<span className="text-primary">Now</span></span>
        </Link>

        <div className="hidden md:flex md:items-center md:gap-6">
          {userRole === "TECHNICIAN" ? (
            <Link href="/dashboard/technician/ongoing" className="text-sm font-medium text-text/80 transition-colors hover:text-primary">
              Ongoing Bookings
            </Link>
          ) : (
            <Link href="/services" className="text-sm font-medium text-text/80 transition-colors hover:text-primary">
              Services
            </Link>
          )}
          <Link href="/about" className="text-sm font-medium text-text/80 transition-colors hover:text-primary">
            About Us
          </Link>
          <ThemeToggle />
          
          <div className="flex items-center gap-4 ml-2">
            {isAuthLoading ? (
              <div className="flex gap-2">
                <Skeleton className="h-10 w-20 rounded-md" />
                <Skeleton className="h-10 w-24 rounded-md" />
              </div>
            ) : userRole ? (
              <>
                <Button variant="ghost" asChild className="text-text hover:text-primary hover:bg-secondary/20">
                  <Link href={getDashboardLink()}>
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                </Button>
                <Button onClick={handleLogout} className="bg-accent text-white hover:bg-accent/90">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild className="text-text hover:text-primary hover:bg-secondary/20">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="bg-primary text-background hover:bg-primary/90">
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}
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
              {userRole === "TECHNICIAN" ? (
                <Link
                  href="/dashboard/technician/ongoing"
                  className="text-sm font-medium text-text/80 transition-colors hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Ongoing Bookings
                </Link>
              ) : (
                <Link
                  href="/services"
                  className="text-sm font-medium text-text/80 transition-colors hover:text-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Services
                </Link>
              )}
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
                {isAuthLoading ? (
                  <>
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </>
                ) : userRole ? (
                  <>
                    <Button variant="outline" asChild className="w-full justify-center border-secondary text-text hover:bg-secondary/20">
                      <Link href={getDashboardLink()} onClick={() => setIsMobileMenuOpen(false)}>
                        <LayoutDashboard className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                    </Button>
                    <Button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="w-full justify-center bg-accent text-white hover:bg-accent/90">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" asChild className="w-full justify-center border-secondary text-text hover:bg-secondary/20">
                      <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                    </Button>
                    <Button asChild className="w-full justify-center bg-primary text-background hover:bg-primary/90">
                      <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>Register</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
