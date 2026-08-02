"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Booking {
  id: string;
  customerId: string;
  technicianId: string;
  date: string;
  timeSlot: string;
  status: string;
  createdAt: string;
  customer: {
    id: string;
    name: string;
    email: string;
    contactNo: string | null;
    address: string | null;
  };
  payment: {
    id: string;
    amount: number;
    status: string;
  } | null;
}

interface TechnicianBookingHistoryProps {
  initialBookings?: Booking[];
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

export function TechnicianBookingHistory({ initialBookings = [] }: TechnicianBookingHistoryProps) {
  const [bookings] = useState<Booking[]>(initialBookings);

  if (bookings.length === 0) {
    return (
      <div className="py-12 text-center border border-dashed border-secondary/30 rounded-2xl bg-secondary/5">
        <p className="text-text/70 mb-2">You have no booking history.</p>
        <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-background mt-2">
          <Link href="/dashboard/technician">Go to Dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      <table className="w-full text-left text-sm block md:table">
        <thead className="bg-secondary/10 text-text/70 border-b border-secondary/20 hidden md:table-header-group">
          <tr>
            <th className="p-4 font-semibold">Booking ID</th>
            <th className="p-4 font-semibold">Customer</th>
            <th className="p-4 font-semibold">Date & Time</th>
            <th className="p-4 font-semibold">Status</th>
            <th className="p-4 font-semibold">Payment</th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {bookings.map((booking) => (
            <tr key={booking.id} className="block md:table-row border border-secondary/20 md:border-none rounded-xl md:rounded-none mb-4 md:mb-0 hover:bg-secondary/5 transition-colors bg-secondary/5 md:bg-transparent overflow-hidden">
              <td className="flex justify-between items-center md:table-cell p-3 md:p-4 border-b border-secondary/10 md:border-none">
                <span className="md:hidden font-semibold text-text/70 text-xs uppercase">Booking ID</span>
                <span className="font-medium text-text">{booking.id.split("-")[0]}</span>
              </td>
              <td className="flex justify-between items-center md:table-cell p-3 md:p-4 border-b border-secondary/10 md:border-none">
                <span className="md:hidden font-semibold text-text/70 text-xs uppercase">Customer</span>
                <span className="text-text/80">{booking.customer?.name || "Unknown"}</span>
              </td>
              <td className="flex justify-between items-center md:table-cell p-3 md:p-4 border-b border-secondary/10 md:border-none">
                <span className="md:hidden font-semibold text-text/70 text-xs uppercase">Date & Time</span>
                <div className="flex flex-col text-right md:text-left whitespace-nowrap text-text/80">
                  <span>{new Date(booking.date).toLocaleDateString()}</span>
                  <span className="text-xs text-text/50">{booking.timeSlot}</span>
                </div>
              </td>
              <td className="flex justify-between items-center md:table-cell p-3 md:p-4 border-b border-secondary/10 md:border-none">
                <span className="md:hidden font-semibold text-text/70 text-xs uppercase">Status</span>
                {getStatusBadge(booking.status, booking.payment?.status)}
              </td>
              <td className="flex justify-between items-center md:table-cell p-3 md:p-4 border-b border-secondary/10 md:border-none">
                <span className="md:hidden font-semibold text-text/70 text-xs uppercase">Payment</span>
                {booking.payment?.status === "PAID" ? (
                    <span className="text-xs font-semibold text-green-600 bg-green-500/10 px-2.5 py-1.5 rounded-md border border-green-500/20">
                      Paid
                    </span>
                ) : (
                    <span className="text-xs font-semibold text-text/50 bg-secondary/10 px-2.5 py-1.5 rounded-md border border-secondary/20">
                      Unpaid
                    </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
