"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

const dummyBookings = [
  {
    id: "B-1029",
    service: "Emergency Pipe Leak Repair",
    technician: "Karim",
    date: "Aug 15, 2026",
    time: "10:30 AM",
    status: "REQUESTED",
    price: 45,
  },
  {
    id: "B-1030",
    service: "Electrical Panel Upgrade",
    technician: "Modu",
    date: "Aug 16, 2026",
    time: "02:30 PM",
    status: "ACCEPTED",
    price: 150,
  },
  {
    id: "B-1015",
    service: "Interior Room Painting",
    technician: "Jodu",
    date: "Jul 22, 2026",
    time: "09:00 AM",
    status: "COMPLETED",
    price: 55,
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "REQUESTED":
      return <span className="bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 px-2.5 py-1 rounded-full text-xs font-semibold">Requested</span>;
    case "ACCEPTED":
      return <span className="bg-blue-500/10 text-blue-600 border border-blue-500/20 px-2.5 py-1 rounded-full text-xs font-semibold">Accepted</span>;
    case "IN_PROGRESS":
      return <span className="bg-green-500/10 text-green-600 border border-green-500/20 px-2.5 py-1 rounded-full text-xs font-semibold">In Progress</span>;
    case "COMPLETED":
      return <span className="bg-gray-500/10 text-gray-500 border border-gray-500/20 px-2.5 py-1 rounded-full text-xs font-semibold">Completed</span>;
    default:
      return <span className="bg-secondary/10 text-text border border-secondary/20 px-2.5 py-1 rounded-full text-xs font-semibold">{status}</span>;
  }
};

export function BookingHistory() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-secondary/10 text-text/70 border-b border-secondary/20">
          <tr>
            <th className="p-4 font-semibold">Booking ID</th>
            <th className="p-4 font-semibold">Service</th>
            <th className="p-4 font-semibold">Technician</th>
            <th className="p-4 font-semibold">Date & Time</th>
            <th className="p-4 font-semibold">Status</th>
            <th className="p-4 font-semibold text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-secondary/10">
          {dummyBookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-secondary/5 transition-colors">
              <td className="p-4 font-medium text-text">{booking.id}</td>
              <td className="p-4 text-text/80">{booking.service}</td>
              <td className="p-4 text-text/80">{booking.technician}</td>
              <td className="p-4 text-text/80">
                <div className="flex flex-col">
                  <span>{booking.date}</span>
                  <span className="text-xs text-text/50">{booking.time}</span>
                </div>
              </td>
              <td className="p-4">
                {getStatusBadge(booking.status)}
              </td>
              <td className="p-4 text-right">
                {booking.status === "REQUESTED" && (
                  <Button variant="outline" size="sm" className="border-accent text-accent hover:bg-accent hover:text-background h-8">
                    Cancel
                  </Button>
                )}
                {booking.status === "ACCEPTED" && (
                  <Button asChild size="sm" className="bg-primary text-background hover:bg-primary/90 h-8 shadow-sm">
                    <Link href={`/dashboard/customer/bookings/${booking.id}/pay`}>
                      Pay ${booking.price}
                    </Link>
                  </Button>
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
