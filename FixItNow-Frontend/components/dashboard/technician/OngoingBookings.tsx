"use client";

import { MapPin, Calendar, Clock, Banknote, ShieldCheck } from "lucide-react";

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

export function OngoingBookings({ bookings }: OngoingBookingsProps) {
  return (
    <div className="grid grid-cols-1 gap-6">
      {bookings.map((req) => (
        <div key={req.id} className="bg-background border border-secondary/20 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-semibold">
                {req.status}
              </span>
              <span className="text-sm text-text/50">ID: {req.id.split('-')[0]}</span>
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
