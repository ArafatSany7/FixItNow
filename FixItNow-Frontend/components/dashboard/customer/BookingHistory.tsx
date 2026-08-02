"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { ReviewModal } from "./ReviewModal";

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
  review?: { id: string } | null;
}

interface BookingHistoryProps {
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

export function BookingHistory({ initialBookings = [] }: BookingHistoryProps) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  // Review Modal State
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedBookingForReview, setSelectedBookingForReview] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "payment_success" && data.bookingId) {
          toast.success("Payment Successful!");
          setBookings(prev => prev.map(b =>
            b.id === data.bookingId
              ? { ...b, payment: { ...b.payment, status: "PAID" } as any }
              : b
          ));
          router.refresh();
        }
      } catch (e) {

      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [router]);

  const handleCancel = async (id: string) => {
    try {
      setIsProcessing(`${id}-cancel`);
      const token = Cookies.get("accessToken");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://fixitnow-theta.vercel.app/api"}/bookings/${id}/cancel`, {
        method: "PATCH",
        headers: {
          Authorization: token || "",
        }
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to cancel booking");
      }

      toast.success("Booking Cancelled", {
        description: "Your booking request has been cancelled.",
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

  const handlePayment = async (bookingId: string) => {
    const paymentWindow = window.open('about:blank', '_blank', 'width=800,height=600');
    try {
      setIsProcessing(`${bookingId}-pay`);
      const token = Cookies.get("accessToken");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://fixitnow-theta.vercel.app/api'}/payments/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token || '',
        },
        body: JSON.stringify({ bookingId })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to initialize payment");
      }

      const data = await res.json();

      if (data.data?.url) {
        if (paymentWindow) {
          paymentWindow.location.href = data.data.url;
        } else {
          window.location.href = data.data.url;
        }
      } else if (paymentWindow) {
        paymentWindow.close();
      }

    } catch (error: any) {
      if (paymentWindow) paymentWindow.close();
      toast.error("Payment Error", {
        description: error.message || "Could not start payment process.",
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
                {getStatusBadge(booking.status, booking.payment?.status)}
              </td>
              <td className="p-4 text-right">
                <div className="flex justify-end gap-3 items-center">
                  {(booking.status === "PENDING" || booking.status === "REQUESTED" || (booking.status === "ACCEPTED" && booking.payment?.status !== "PAID")) && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      onClick={() => handleCancel(booking.id)}
                      disabled={isProcessing === `${booking.id}-cancel`}
                    >
                      {isProcessing === `${booking.id}-cancel` ? "Canceling..." : "Cancel"}
                    </Button>
                  )}
                  {booking.status === "ACCEPTED" && booking.payment?.status !== "PAID" && (
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-500/20"
                      onClick={() => handlePayment(booking.id)}
                      disabled={isProcessing === `${booking.id}-pay`}
                    >
                      {isProcessing === `${booking.id}-pay` ? "Processing..." : "Pay Now"}
                    </Button>
                  )}
                </div>
                {booking.payment?.status === "PAID" && booking.status !== "COMPLETED" && (
                  <span className="text-xs font-semibold text-green-600 bg-green-500/10 px-2.5 py-1.5 rounded-md border border-green-500/20">
                    Paid
                  </span>
                )}

                {booking.status === "COMPLETED" && (
                  booking.review ? (
                    <span className="text-xs font-semibold text-gray-500 bg-gray-500/10 px-2.5 py-1.5 rounded-md border border-gray-500/20">
                      Reviewed
                    </span>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-background shadow-sm"
                      onClick={() => {
                        setSelectedBookingForReview(booking.id);
                        setIsReviewModalOpen(true);
                      }}
                    >
                      Leave Review
                    </Button>
                  )
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          setSelectedBookingForReview("");
        }}
        bookingId={selectedBookingForReview}
        onSuccess={() => {
          setBookings(prev => prev.map(b => 
            b.id === selectedBookingForReview 
              ? { ...b, review: { id: "new" } } 
              : b
          ));
        }}
      />
    </div>
  );
}

