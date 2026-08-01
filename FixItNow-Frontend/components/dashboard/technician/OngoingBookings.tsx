"use client";

import { MapPin, Calendar, Clock, Banknote, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

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

interface OngoingBookingsProps {
  bookings: Booking[];
}

const getStatusBadge = (status: string, paymentStatus?: string) => {
  if (status === "ACCEPTED" && paymentStatus === "PAID") {
    return <span className="bg-purple-500/10 text-purple-600 border border-purple-500/20 px-3 py-1 rounded-full text-xs font-semibold">Paid</span>;
  }
  switch (status) {
    case "PENDING":
    case "REQUESTED":
      return <span className="bg-orange-500/10 text-orange-600 border border-orange-500/20 px-3 py-1 rounded-full text-xs font-semibold">Requested</span>;
    case "ACCEPTED":
      return <span className="bg-blue-500/10 text-blue-600 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-semibold">Accepted</span>;
    case "DECLINED":
      return <span className="bg-red-500/10 text-red-600 border border-red-500/20 px-3 py-1 rounded-full text-xs font-semibold">Declined</span>;
    case "IN_PROGRESS":
      return <span className="bg-green-500/10 text-green-600 border border-green-500/20 px-3 py-1 rounded-full text-xs font-semibold">In Progress</span>;
    case "COMPLETED":
      return <span className="bg-gray-500/10 text-gray-600 border border-gray-500/20 px-3 py-1 rounded-full text-xs font-semibold">Completed</span>;
    case "CANCELLED":
      return <span className="bg-red-900/10 text-red-800 border border-red-900/20 px-3 py-1 rounded-full text-xs font-semibold">Cancelled</span>;
    default:
      return <span className="bg-secondary/10 text-text border border-secondary/20 px-3 py-1 rounded-full text-xs font-semibold">{status}</span>;
  }
};

export function OngoingBookings({ bookings: initialBookings }: OngoingBookingsProps) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings || []);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const router = useRouter();

  const handleAction = async (id: string, action: 'IN_PROGRESS' | 'COMPLETED') => {
    try {
      setIsProcessing(id);
      const token = Cookies.get("accessToken");
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://fixitnow-theta.vercel.app/api'}/bookings/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token || '',
        },
        body: JSON.stringify({ status: action })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update booking status");
      }

      toast.success(`Job ${action === 'IN_PROGRESS' ? 'Started' : 'Completed'}`, {
        description: `You have successfully updated the job status.`,
      });

      // Update the local state
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: action } : b));
      router.refresh();
      
    } catch (error: any) {
      toast.error("Error", {
        description: error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {bookings.map((req) => (
        <div key={req.id} className="bg-background border border-secondary/20 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              {getStatusBadge(req.status, req.payment?.status)}
              <span className="text-sm text-text/50">ID: {req.id.slice(0, 8)}</span>
            </div>
            <h3 className="text-xl font-bold text-text mb-4">Service Request</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
              <div className="flex items-center gap-2 text-sm text-text/80">
                <Calendar className="h-4 w-4 text-accent" />
                <span>{new Date(req.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text/80">
                <Clock className="h-4 w-4 text-accent" />
                <span>{req.timeSlot}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text/80">
                <ShieldCheck className="h-4 w-4 text-accent" />
                <span>Customer: {req.customer?.name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text/80">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="truncate">{req.customer?.address || "No location"}</span>
              </div>
            </div>
          </div>

          <div className="bg-secondary/5 rounded-xl p-5 border border-secondary/10 w-full md:w-64 shrink-0 flex flex-col justify-center">
            <h4 className="text-sm font-semibold text-text/70 mb-3 flex items-center gap-2">
              <Banknote className="h-4 w-4" />
              Payment Status
            </h4>
            
            {req.payment ? (
              <div>
                <p className="text-2xl font-bold text-primary mb-1">${req.payment.amount}</p>
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${req.payment.status === 'PAID' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                  <span className="text-sm font-medium">{req.payment.status}</span>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-lg font-semibold text-text mb-1">Not Generated</p>
                <p className="text-sm text-text/60">Awaiting customer action</p>
              </div>
            )}
            
            {/* Technician Actions */}
            <div className="mt-5 pt-5 border-t border-secondary/10">
              {req.payment?.status === "PAID" && req.status === "ACCEPTED" && (
                <Button 
                  className="w-full bg-green-600 hover:bg-green-700 text-white shadow-sm"
                  onClick={() => handleAction(req.id, "IN_PROGRESS")}
                  disabled={isProcessing === req.id}
                >
                  {isProcessing === req.id ? "Processing..." : "Start Job"}
                </Button>
              )}
              
              {req.status === "IN_PROGRESS" && (
                <Button 
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white shadow-sm"
                  onClick={() => handleAction(req.id, "COMPLETED")}
                  disabled={isProcessing === req.id}
                >
                  {isProcessing === req.id ? "Processing..." : "Complete Job"}
                </Button>
              )}
              
              {req.status === "COMPLETED" && (
                <div className="w-full py-2 text-center bg-gray-500/10 text-gray-600 rounded-md text-sm font-semibold border border-gray-500/20">
                  Job Completed
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {bookings.length === 0 && (
        <div className="col-span-full py-16 text-center text-text/60 border border-dashed border-secondary/30 rounded-2xl">
          <p className="text-lg">No ongoing bookings.</p>
          <p className="text-sm mt-1">When you accept a request, it will appear here.</p>
        </div>
      )}
    </div>
  );
}
