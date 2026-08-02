"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarDays, Wallet, LogOut, Home, Briefcase, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export function TechnicianSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    router.push("/login");
    router.refresh();
  };

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard/technician", label: "Booking Requests", icon: LayoutDashboard },
    { href: "/dashboard/technician/ongoing", label: "Ongoing Bookings", icon: Briefcase },
    { href: "/dashboard/technician/availability", label: "Availability", icon: CalendarDays },
    { href: "/dashboard/technician/profile", label: "Profile & Services", icon: User },
  ];

  return (
    <>

      <div className="md:hidden flex items-center justify-between bg-background border border-secondary/20 rounded-2xl p-4 shadow-sm mb-6">
        <h2 className="text-xl font-bold text-text">Technician Portal</h2>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
          <Menu className="h-6 w-6" />
        </Button>
      </div>


      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}


      <div className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-background shadow-lg transform transition-transform duration-300 ease-in-out
        md:relative md:w-full md:translate-x-0 md:shadow-sm md:border md:border-secondary/20 md:rounded-2xl md:z-0
        flex flex-col h-full p-4
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex justify-between items-center mb-8 px-4 mt-2">
          <div>
            <h2 className="text-xl font-bold text-text">Technician Portal</h2>
            <p className="text-sm text-text/60 mt-1">Manage your service business</p>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto scrollbar-hide">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${isActive
                      ? "bg-primary text-background font-medium shadow-md"
                      : "text-text/70 hover:bg-secondary/10 hover:text-primary"
                    }`}
                >
                  <Icon className="h-5 w-5" />
                  {link.label}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-secondary/20 mt-4">
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-accent hover:text-accent hover:bg-accent/10 px-4"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Log Out
          </Button>
        </div>
      </div>
    </>
  );
}
