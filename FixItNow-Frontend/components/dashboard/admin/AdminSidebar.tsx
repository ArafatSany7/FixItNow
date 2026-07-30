"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Activity, Settings, LogOut, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/admin/users", label: "User Management", icon: Users },
    { href: "/dashboard/admin/bookings", label: "All Bookings", icon: Activity },
    { href: "/dashboard/admin/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex flex-col h-full bg-background border border-secondary/20 rounded-2xl p-4 shadow-sm">
      <div className="mb-8 px-4 mt-2">
        <h2 className="text-xl font-bold text-text">Admin Panel</h2>
        <p className="text-sm text-text/60 mt-1">Platform Control Center</p>
      </div>

      <nav className="flex-1 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href}>
              <div 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive 
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
        <Button variant="ghost" className="w-full justify-start text-accent hover:text-accent hover:bg-accent/10 px-4">
          <LogOut className="h-5 w-5 mr-3" />
          Log Out
        </Button>
      </div>
    </div>
  );
}
