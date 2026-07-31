"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X, MapPin } from "lucide-react";
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
}

interface BookingManagementProps {
  initialBookings: Booking[];
}

export function BookingManagement({ initialBookings }: BookingManagementProps) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings || []);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const router = useRouter();

  const handleAction = async (id: string, action: 'ACCEPTED' | 'DECLINED') => {
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

      toast.success(`Booking ${action.toLowerCase()}`, {
        description: `You have ${action.toLowerCase()} the booking request.`,
      });

      // Remove the booking from the pending list
      setBookings(prev => prev.filter(b => b.id !== id));
      router.refresh(); // Refresh the layout to update any server components
      
    } catch (error: any) {
      toast.error("Error", {
        description: error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {bookings.map((req) => (
        <div key={req.id} className="bg-background border border-secondary/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 px-2.5 py-1 rounded-full text-xs font-semibold mb-2 inline-block">
                New Request
              </span>
              <h3 className="text-lg font-bold text-text">Service Request</h3>
              <p className="text-sm text-text/70">Req ID: {req.id.split('-')[0]}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-text">{new Date(req.date).toLocaleDateString()}</p>
              <p className="text-sm text-text/60">{req.timeSlot}</p>
            </div>
          </div>

          <div className="bg-secondary/5 rounded-xl p-4 mb-5 border border-secondary/10">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-text/60">Customer:</span>
              <span className="text-sm font-medium text-text">{req.customer?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-text/60 flex items-center gap-1">
                <MapPin className="h-4 w-4" /> Location:
              </span>
              <span className="text-sm font-medium text-text text-right max-w-[150px] truncate">{req.customer?.address || "Location not provided"}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => handleAction(req.id, 'ACCEPTED')}
              disabled={isProcessing === req.id}
              className="flex-1 bg-primary text-background hover:bg-primary/90 h-10 shadow-sm"
            >
              <Check className="h-4 w-4 mr-2" />
              {isProcessing === req.id ? "Processing..." : "Accept"}
            </Button>
            <Button
              onClick={() => handleAction(req.id, 'DECLINED')}
              disabled={isProcessing === req.id}
              variant="outline"
              className="flex-1 border-accent text-accent hover:bg-accent hover:text-background h-10"
            >
              <X className="h-4 w-4 mr-2" />
              Decline
            </Button>
          </div>
        </div>
      ))}

      {bookings.length === 0 && (
        <div className="col-span-full py-12 text-center text-text/60 border border-dashed border-secondary/30 rounded-2xl">
          No pending booking requests.
        </div>
      )}
    </div>
  );
}
