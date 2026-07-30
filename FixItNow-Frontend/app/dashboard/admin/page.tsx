import { PlatformAnalytics } from "@/components/dashboard/admin/PlatformAnalytics";
import { BookingMonitoring } from "@/components/dashboard/admin/BookingMonitoring";

export default function AdminDashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Admin Overview</h1>
        <p className="text-text/60">Monitor platform health, bookings, and user activity.</p>
      </div>

      <div className="pt-2">
        <PlatformAnalytics />
        <BookingMonitoring />
      </div>
    </div>
  );
}
