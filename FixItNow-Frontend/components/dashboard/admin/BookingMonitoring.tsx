"use client";

import { Button } from "@/components/ui/button";

const recentBookings = [
  {
    id: "B-2051",
    customer: "arafat",
    technician: "Karim",
    service: "Emergency Pipe Leak Repair",
    date: "Aug 15, 2026",
    status: "COMPLETED",
    amount: 45,
  },
  {
    id: "B-2052",
    customer: "Arafat2",
    technician: "Modu",
    service: "Electrical Panel Upgrade",
    date: "Aug 16, 2026",
    status: "IN_PROGRESS",
    amount: 150,
  },
  {
    id: "B-2053",
    customer: "araft3",
    technician: "Jodu",
    service: "Interior Room Painting",
    date: "Aug 18, 2026",
    status: "REQUESTED",
    amount: 55,
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "REQUESTED":
      return <span className="bg-yellow-500/10 text-yellow-600 border border-yellow-500/20 px-2.5 py-1 rounded-full text-xs font-semibold">Requested</span>;
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

export function BookingMonitoring() {
  return (
    <div className="bg-background border border-secondary/20 rounded-2xl shadow-sm overflow-hidden">
      <div className="p-5 border-b border-secondary/20 flex justify-between items-center bg-secondary/5">
        <h3 className="text-lg font-bold text-text">Live Booking Monitor</h3>
        <Button variant="outline" size="sm" className="border-secondary text-text hover:bg-secondary/10">
          View All
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary/5 text-text/70 border-b border-secondary/20">
            <tr>
              <th className="p-4 font-semibold">Booking ID</th>
              <th className="p-4 font-semibold">Service</th>
              <th className="p-4 font-semibold">Customer</th>
              <th className="p-4 font-semibold">Technician</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary/10">
            {recentBookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-secondary/5 transition-colors">
                <td className="p-4 font-medium text-text">{booking.id}</td>
                <td className="p-4 text-text/80">{booking.service}</td>
                <td className="p-4 text-text/80">{booking.customer}</td>
                <td className="p-4 text-text/80">{booking.technician}</td>
                <td className="p-4 text-text/80">{booking.date}</td>
                <td className="p-4">{getStatusBadge(booking.status)}</td>
                <td className="p-4 text-right font-medium text-text">${booking.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
