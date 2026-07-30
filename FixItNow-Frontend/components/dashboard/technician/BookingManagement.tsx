"use client";

import { Button } from "@/components/ui/button";
import { Check, X, MapPin } from "lucide-react";
import { toast } from "sonner";

const dummyRequests = [
  {
    id: "B-1029",
    customer: "arafat",
    location: "Dhaka",
    date: "Aug 15, 2026",
    time: "10:30 AM",
    status: "REQUESTED",
    service: "Emergency Pipe Leak Repair",
  },
  {
    id: "B-1035",
    customer: "Arafat2",
    location: "Dhaka",
    date: "Aug 16, 2026",
    time: "02:00 PM",
    status: "REQUESTED",
    service: "Water Heater Installation",
  },
];

export function BookingManagement() {
  const handleAction = (id: string, action: string) => {
    toast.success(`Booking ${action}ed`, {
      description: `You have ${action}ed booking ${id}.`,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {dummyRequests.map((req) => (
        <div key={req.id} className="bg-background border border-secondary/20 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 px-2.5 py-1 rounded-full text-xs font-semibold mb-2 inline-block">
                New Request
              </span>
              <h3 className="text-lg font-bold text-text">{req.service}</h3>
              <p className="text-sm text-text/70">Req ID: {req.id}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-text">{req.date}</p>
              <p className="text-sm text-text/60">{req.time}</p>
            </div>
          </div>

          <div className="bg-secondary/5 rounded-xl p-4 mb-5 border border-secondary/10">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-text/60">Customer:</span>
              <span className="text-sm font-medium text-text">{req.customer}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-text/60 flex items-center gap-1">
                <MapPin className="h-4 w-4" /> Location:
              </span>
              <span className="text-sm font-medium text-text text-right max-w-[150px] truncate">{req.location}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => handleAction(req.id, 'accept')}
              className="flex-1 bg-primary text-background hover:bg-primary/90 h-10 shadow-sm"
            >
              <Check className="h-4 w-4 mr-2" />
              Accept
            </Button>
            <Button
              onClick={() => handleAction(req.id, 'declin')}
              variant="outline"
              className="flex-1 border-accent text-accent hover:bg-accent hover:text-background h-10"
            >
              <X className="h-4 w-4 mr-2" />
              Decline
            </Button>
          </div>
        </div>
      ))}

      {dummyRequests.length === 0 && (
        <div className="col-span-full py-12 text-center text-text/60 border border-dashed border-secondary/30 rounded-2xl">
          No pending booking requests.
        </div>
      )}
    </div>
  );
}
