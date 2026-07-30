import { BookingManagement } from "@/components/dashboard/technician/BookingManagement";

export default function TechnicianDashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Booking Requests</h1>
        <p className="text-text/60">Review and manage your incoming service requests.</p>
      </div>

      <div className="pt-2">
        <BookingManagement />
      </div>
    </div>
  );
}
