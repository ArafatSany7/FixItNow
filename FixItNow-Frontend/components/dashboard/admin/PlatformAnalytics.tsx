"use client";

import { Users, Briefcase, DollarSign, Activity } from "lucide-react";

interface AdminStats {
  totalUsers: number;
  totalTechnicians: number;
  totalBookings: number;
  totalRevenue: number;
}

export function PlatformAnalytics({ initialStats }: { initialStats: AdminStats | null }) {
  const stats = [
    { label: "Total Users", value: initialStats?.totalUsers || 0, icon: Users, trend: "+12% this month" },
    { label: "Total Technicians", value: initialStats?.totalTechnicians || 0, icon: Briefcase, trend: "+5% this month" },
    { label: "Total Bookings", value: initialStats?.totalBookings || 0, icon: Activity, trend: "+18% this month" },
    { label: "Total Revenue", value: `$${initialStats?.totalRevenue || 0}`, icon: DollarSign, trend: "+24% this month" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-secondary/10 border border-secondary/20 p-5 rounded-xl flex items-center justify-between">
            <div>
              <p className="text-text/70 text-sm font-medium">{stat.label}</p>
              <p className="text-3xl font-bold text-primary mt-1">{stat.value}</p>
              <p className="text-accent text-xs font-medium mt-2">{stat.trend}</p>
            </div>
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
