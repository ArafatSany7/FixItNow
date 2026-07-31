"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface Booking {
  id: string;
  technicianId: string;
  date: string;
  timeSlot: string;
  status: string;
  technician: {
    id: string;
    name: string;
    email: string;
    contactNo: string | null;
  };
  payment: {
    id: string;
    amount: number;
    status: string;
  } | null;
}

interface BookingHistoryProps {
  initialBookings?: Booking[];
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case "PENDING":
    case "REQUESTED":
      return <span className="bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 px-2.5 py-1 rounded-full text-xs font-semibold">Pending</span>;
    case "ACCEPTED":
      return <span className="bg-blue-500/10 text-blue-600 border border-blue-500/20 px-2.5 py-1 rounded-full text-xs font-semibold">Accepted</span>;
    case "IN_PROGRESS":
      return <span className="bg-green-500/10 text-green-600 border border-green-500/20 px-2.5 py-1 rounded-full text-xs font-semibold">In Progress</span>;
    case "COMPLETED":
      return <span className="bg-gray-500/10 text-gray-500 border border-gray-500/20 px-2.5 py-1 rounded-full text-xs font-semibold">Completed</span>;
    case "DECLINED":
    case "CANCELLED":
      return <span className="bg-red-500/10 text-red-500 border border-red-500/20 px-2.5 py-1 rounded-full text-xs font-semibold">{status}</span>;
    default:
      return <span className="bg-secondary/10 text-text border border-secondary/20 px-2.5 py-1 rounded-full text-xs font-semibold">{status}</span>;
  }
};

export function BookingHistory({ initialBookings = [] }: BookingHistoryProps) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const router = useRouter();

  const handleCancel = async (id: string) => {
    try {
      setIsProcessing(id);
      const token = Cookies.get("accessToken");
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://fixitnow-theta.vercel.app/api"}/bookings/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token || "",
        },
        body: JSON.stringify({ status: "CANCELLED" })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to cancel booking");
      }

      toast.success("Booking cancelled", {
        description: "Your service request has been cancelled.",
      });

      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: "CANCELLED" } : b));
      router.refresh();
      
    } catch (error: any) {
      toast.error("Error", {
        description: error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsProcessing(null);
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="py-12 text-center border border-dashed border-secondary/30 rounded-2xl bg-secondary/5">
        <p className="text-text/70 mb-2">You have no recent bookings.</p>
        <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-background mt-2">
          <Link href="/services">Browse Services</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-secondary/10 text-text/70 border-b border-secondary/20">
          <tr>
            <th className="p-4 font-semibold">Booking ID</th>
            <th className="p-4 font-semibold">Technician</th>
            <th className="p-4 font-semibold">Date & Time</th>
            <th className="p-4 font-semibold">Status</th>
            <th className="p-4 font-semibold text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-secondary/10">
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-secondary/5 transition-colors">
              <td className="p-4 font-medium text-text">{booking.id.split("-")[0]}</td>
              <td className="p-4 text-text/80">{booking.technician?.name || "Unknown"}</td>
              <td className="p-4 text-text/80">
                <div className="flex flex-col">
                  <span>{new Date(booking.date).toLocaleDateString()}</span>
                  <span className="text-xs text-text/50">{booking.timeSlot}</span>
                </div>
              </td>
              <td className="p-4">
                {getStatusBadge(booking.status)}
              </td>
              <td className="p-4 text-right">
                {(booking.status === "PENDING" || booking.status === "REQUESTED") && (
                  <Button 
                    onClick={() => handleCancel(booking.id)}
                    disabled={isProcessing === booking.id}
                    variant="outline" 
                    size="sm" 
                    className="border-accent text-accent hover:bg-accent hover:text-background h-8"
                  >
                    {isProcessing === booking.id ? "Cancelling..." : "Cancel"}
                  </Button>
                )}
                {booking.status === "ACCEPTED" && (!booking.payment || booking.payment.status !== "PAID") && (
                  <Button asChild size="sm" className="bg-primary text-background hover:bg-primary/90 h-8 shadow-sm">
                    <Link href={`/dashboard/customer/bookings/${booking.id}/pay`}>
                      Pay Now
                    </Link>
                  </Button>
                )}
                {booking.payment?.status === "PAID" && booking.status !== "COMPLETED" && (
                  <span className="text-xs font-semibold text-green-600 bg-green-500/10 px-2.5 py-1.5 rounded-md border border-green-500/20">
                    Paid
                  </span>
                )}
                {booking.status === "COMPLETED" && (
                  <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary/10 h-8">
                    Leave Review
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

