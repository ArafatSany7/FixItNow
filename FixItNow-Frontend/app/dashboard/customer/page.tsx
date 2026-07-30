import { BookingHistory } from "@/components/dashboard/customer/BookingHistory";

export default function CustomerDashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Overview</h1>
        <p className="text-text/60">Welcome back! Here is a summary of your recent activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

        <div className="bg-secondary/10 border border-secondary/20 p-5 rounded-xl">
          <p className="text-text/70 text-sm font-medium">Active Bookings</p>
          <p className="text-3xl font-bold text-primary mt-1">2</p>
        </div>
        <div className="bg-secondary/10 border border-secondary/20 p-5 rounded-xl">
          <p className="text-text/70 text-sm font-medium">Completed Jobs</p>
          <p className="text-3xl font-bold text-primary mt-1">5</p>
        </div>
        <div className="bg-secondary/10 border border-secondary/20 p-5 rounded-xl">
          <p className="text-text/70 text-sm font-medium">Total Spent</p>
          <p className="text-3xl font-bold text-primary mt-1">$450</p>
        </div>
      </div>

      <div className="pt-6 border-t border-secondary/20">
        <h2 className="text-xl font-bold text-text mb-4">Recent Bookings</h2>
        <BookingHistory />
      </div>
    </div>
  );
}
