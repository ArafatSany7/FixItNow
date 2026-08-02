import { cookies } from "next/headers";
import { TechnicianBookingHistory } from "@/components/dashboard/technician/TechnicianBookingHistory";

async function getIncomingBookings() {
  const token = cookies().get("accessToken")?.value;
  if (!token) return [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://fixitnow-theta.vercel.app/api'}/bookings/incoming-bookings`, {
      headers: {
        Authorization: token,
      },
      cache: 'no-store'
    });

    if (!res.ok) return [];
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    return [];
  }
}

export default async function TechnicianHistoryPage() {
  const allBookings = await getIncomingBookings();

  const historyBookings = allBookings.filter((b: any) =>
    b.status === "COMPLETED" || b.status === "CANCELLED" || b.status === "DECLINED"
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Booking History</h1>
        <p className="text-text/60">View your past completed, cancelled, and declined jobs.</p>
      </div>

      <div className="pt-2">
        <TechnicianBookingHistory initialBookings={historyBookings} />
      </div>
    </div>
  );
}
