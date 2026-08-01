"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Booking {
  id: string;
  customer: { name: string; email: string } | null;
  technician: { name: string; email: string } | null;
  service: { title: string } | null;
  date: string;
  status: string;
  payment: { amount: number } | null;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "PENDING":
    case "REQUESTED":
      return <span className="bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 px-2.5 py-1 rounded-full text-xs font-semibold">Pending</span>;
    case "ACCEPTED":
      return <span className="bg-blue-500/10 text-blue-600 border border-blue-500/20 px-2.5 py-1 rounded-full text-xs font-semibold">Accepted</span>;
    case "IN_PROGRESS":
      return <span className="bg-blue-500/10 text-blue-600 border border-blue-500/20 px-2.5 py-1 rounded-full text-xs font-semibold">In Progress</span>;
    case "COMPLETED":
      return <span className="bg-green-500/10 text-green-600 border border-green-500/20 px-2.5 py-1 rounded-full text-xs font-semibold">Completed</span>;
    case "CANCELLED":
      return <span className="bg-red-500/10 text-red-600 border border-red-500/20 px-2.5 py-1 rounded-full text-xs font-semibold">Cancelled</span>;
    default:
      return <span className="bg-secondary/10 text-text border border-secondary/20 px-2.5 py-1 rounded-full text-xs font-semibold">{status}</span>;
  }
};

export function BookingMonitoring({ initialBookings = [], showAll = false, customTitle }: { initialBookings?: Booking[], showAll?: boolean, customTitle?: string }) {
  // Show up to 10 latest bookings on the dashboard overview, otherwise show all
  const displayedBookings = showAll ? initialBookings : initialBookings.slice(0, 10);

  return (
    <div className="bg-background border border-secondary/20 rounded-2xl shadow-sm overflow-hidden">
      <div className="p-5 border-b border-secondary/20 flex justify-between items-center bg-secondary/5">
        <h3 className="text-lg font-bold text-text">{customTitle ? customTitle : (showAll ? "All Bookings Directory" : "Live Booking Monitor")}</h3>
        {!showAll && (
          <Button asChild variant="outline" size="sm" className="border-secondary text-text hover:bg-secondary/10">
            <Link href="/dashboard/admin/bookings">
              View All
            </Link>
          </Button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary/5 text-text/70 border-b border-secondary/20">
            <tr>
              <th className="p-4 font-semibold">ID</th>
              <th className="p-4 font-semibold">Customer</th>
              <th className="p-4 font-semibold">Technician</th>
              <th className="p-4 font-semibold">Service</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary/10">
            {displayedBookings.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-text/60">No bookings found.</td>
              </tr>
            ) : (
              displayedBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-secondary/5 transition-colors">
                  <td className="p-4 font-medium text-text">{booking.id.split("-")[0]}</td>
                  <td className="p-4 text-text/80">{booking.customer?.name || "Unknown"}</td>
                  <td className="p-4 text-text/80">{booking.technician?.name || "Unassigned"}</td>
                  <td className="p-4 text-text/80 max-w-[200px] truncate" title={booking.service?.title}>
                    {booking.service?.title || "N/A"}
                  </td>
                  <td className="p-4">
                    {getStatusBadge(booking.status)}
                  </td>
                  <td className="p-4 font-semibold text-text">
                    ${booking.payment?.amount || 0}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
