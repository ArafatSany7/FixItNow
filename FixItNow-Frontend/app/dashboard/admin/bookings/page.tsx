import { BookingMonitoring } from "@/components/dashboard/admin/BookingMonitoring";
import { cookies } from "next/headers";

export const metadata = {
  title: "All Bookings | FixItNow Admin",
  description: "Monitor all platform bookings",
};

async function getAllBookings() {
  const token = cookies().get("accessToken")?.value;
  if (!token) return [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://fixitnow-theta.vercel.app/api"}/bookings`, {
      headers: { Authorization: token },
      cache: "no-store",
    });
    console.log("Admin Bookings Fetch Status:", res.status, res.statusText);
    if (!res.ok) {
      const err = await res.text();
      console.log("Admin Bookings Fetch Error:", err);
      return [];
    }
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.log("Admin Bookings Fetch Exception:", error);
    return [];
  }
}

export default async function AdminBookingsPage() {
  const bookings = await getAllBookings();

  const ongoingBookings = bookings.filter((b: any) => {
    if (b.status === "PENDING" || b.status === "REQUESTED") return true;
    if (b.status === "IN_PROGRESS") return true;
    if (b.status === "ACCEPTED" && (!b.payment || b.payment.status !== "PAID")) return true;
    return false;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-text">Bookings Dashboard</h1>
        <p className="text-text/60">Comprehensive view of all service requests across the platform.</p>
      </div>

      <div className="pt-2">
        <h2 className="text-xl font-bold text-text mb-4">Pending & Ongoing Bookings</h2>
        <BookingMonitoring initialBookings={ongoingBookings} showAll={true} customTitle="Action Required / Ongoing" />
      </div>

      <div className="pt-4 border-t border-secondary/20">
        <h2 className="text-xl font-bold text-text mb-4">All Bookings History</h2>
        <BookingMonitoring initialBookings={bookings} showAll={true} customTitle="All Historical Bookings" />
      </div>
    </div>
  );
}
