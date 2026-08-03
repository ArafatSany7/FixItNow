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

const getStatusBadge = (status: string, paymentStatus?: string) => {

  if (status === "ACCEPTED" && paymentStatus === "PAID") {
    return <span className="bg-purple-500/10 text-purple-600 border border-purple-500/20 px-2.5 py-1 rounded-full text-xs font-semibold">Paid</span>;
  }

  switch (status) {
    case "PENDING":
    case "REQUESTED":
      return <span className="bg-orange-500/10 text-orange-600 border border-orange-500/20 px-2.5 py-1 rounded-full text-xs font-semibold">Requested</span>;
    case "ACCEPTED":
      return <span className="bg-blue-500/10 text-blue-600 border border-blue-500/20 px-2.5 py-1 rounded-full text-xs font-semibold">Accepted</span>;
    case "DECLINED":
      return <span className="bg-red-500/10 text-red-600 border border-red-500/20 px-2.5 py-1 rounded-full text-xs font-semibold">Declined</span>;
    case "IN_PROGRESS":
      return <span className="bg-green-500/10 text-green-600 border border-green-500/20 px-2.5 py-1 rounded-full text-xs font-semibold">In Progress</span>;
    case "COMPLETED":
      return <span className="bg-gray-500/10 text-gray-600 border border-gray-500/20 px-2.5 py-1 rounded-full text-xs font-semibold">Completed</span>;
    case "CANCELLED":
      return <span className="bg-red-900/10 text-red-800 border border-red-900/20 px-2.5 py-1 rounded-full text-xs font-semibold">Cancelled</span>;
    default:
      return <span className="bg-secondary/10 text-text border border-secondary/20 px-2.5 py-1 rounded-full text-xs font-semibold">{status}</span>;
  }
};

export function BookingMonitoring({ initialBookings = [], showAll = false, customTitle }: { initialBookings?: Booking[], showAll?: boolean, customTitle?: string }) {

  const activeBookings = showAll ? initialBookings : initialBookings.filter(b => !["COMPLETED", "DECLINED", "CANCELLED"].includes(b.status));
  const displayedBookings = showAll ? activeBookings : activeBookings.slice(0, 10);

  return (
    <div className="bg-background border border-secondary/20 rounded-2xl shadow-sm overflow-hidden">
      <div className="p-5 border-b border-secondary/20 flex justify-between items-center bg-secondary/5">
        <h3 className="text-lg font-bold text-text">{customTitle ? customTitle : (showAll ? "All Bookings Directory" : "Live Booking Monitor")}</h3>
        {!showAll && (
          <Button asChild variant="outline" size="sm" className="border-secondary text-text bg-transparent hover:bg-secondary/10">
            <Link href="/dashboard/admin/bookings">
              View All
            </Link>
          </Button>
        )}
      </div>
      <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
        <table className="w-full text-left text-sm relative border-collapse">
          <thead className="bg-secondary/5 text-text/70 border-b border-secondary/20 sticky top-0 backdrop-blur-sm z-10 hidden md:table-header-group">
            <tr>
              <th className="p-4 font-semibold">ID</th>
              <th className="p-4 font-semibold">Customer</th>
              <th className="p-4 font-semibold">Technician</th>
              <th className="p-4 font-semibold">Service</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary/10 flex flex-col md:table-row-group gap-4 md:gap-0 p-4 md:p-0">
            {displayedBookings.length === 0 ? (
              <tr className="block md:table-row">
                <td colSpan={6} className="p-8 text-center text-text/60 block md:table-cell">No bookings found.</td>
              </tr>
            ) : (
              displayedBookings.map((booking) => (
                <tr key={booking.id} className="bg-secondary/5 border border-secondary/20 md:border-none md:border-b md:border-secondary/10 md:bg-transparent rounded-xl flex flex-col md:table-row overflow-hidden hover:bg-secondary/5 transition-colors">
                  <td className="p-3 md:p-4 font-medium text-text border-b border-secondary/10 md:border-none flex justify-between items-center md:table-cell">
                    <span className="md:hidden font-semibold text-text/70 text-xs uppercase">ID</span>
                    <span>{booking.id.slice(0, 8)}</span>
                  </td>
                  <td className="p-3 md:p-4 text-text/80 border-b border-secondary/10 md:border-none flex justify-between items-center md:table-cell text-right md:text-left">
                    <span className="md:hidden font-semibold text-text/70 text-xs uppercase">Customer</span>
                    <span>{booking.customer?.name || "N/A"}</span>
                  </td>
                  <td className="p-3 md:p-4 text-text/80 border-b border-secondary/10 md:border-none flex justify-between items-center md:table-cell text-right md:text-left">
                    <span className="md:hidden font-semibold text-text/70 text-xs uppercase">Technician</span>
                    <span>{booking.technician?.name || "N/A"}</span>
                  </td>
                  <td className="p-3 md:p-4 text-text/80 border-b border-secondary/10 md:border-none flex justify-between items-center md:table-cell text-right md:text-left">
                    <span className="md:hidden font-semibold text-text/70 text-xs uppercase">Service</span>
                    <span className="truncate max-w-[200px] md:max-w-none">{booking.service?.title || (booking.technician as any)?.technicianProfile?.category?.title || "N/A"}</span>
                  </td>
                  <td className="p-3 md:p-4 border-b border-secondary/10 md:border-none flex justify-between items-center md:table-cell">
                    <span className="md:hidden font-semibold text-text/70 text-xs uppercase">Status</span>
                    {getStatusBadge(booking.status, (booking as any).payment?.status)}
                  </td>
                  <td className="p-3 md:p-4 text-text font-medium flex justify-between items-center md:table-cell">
                    <span className="md:hidden font-semibold text-text/70 text-xs uppercase">Amount</span>
                    <span>${booking.payment?.amount || 0}</span>
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
