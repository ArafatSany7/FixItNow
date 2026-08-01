import { PlatformAnalytics } from "@/components/dashboard/admin/PlatformAnalytics";
import { BookingMonitoring } from "@/components/dashboard/admin/BookingMonitoring";
import { cookies } from "next/headers";

async function getAdminStats() {
  const token = cookies().get("accessToken")?.value;
  if (!token) return null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://fixitnow-theta.vercel.app/api"}/users/admin/stats`, {
      headers: { Authorization: token },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data || null;
  } catch (error) {
    return null;
  }
}

async function getAllBookings() {
  const token = cookies().get("accessToken")?.value;
  if (!token) return [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://fixitnow-theta.vercel.app/api"}/bookings`, {
      headers: { Authorization: token },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    return [];
  }
}

export default async function AdminDashboardOverview() {
  const [stats, bookings] = await Promise.all([
    getAdminStats(),
    getAllBookings()
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Admin Overview</h1>
        <p className="text-text/60">Monitor platform health, bookings, and user activity.</p>
      </div>

      <div className="pt-2 space-y-8">
        <PlatformAnalytics initialStats={stats} />
        <BookingMonitoring initialBookings={bookings} />
      </div>
    </div>
  );
}
