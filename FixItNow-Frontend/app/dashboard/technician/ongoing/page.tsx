import { cookies } from "next/headers";
import { OngoingBookings } from "@/components/dashboard/technician/OngoingBookings";

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

export default async function OngoingBookingsPage() {
  const allBookings = await getIncomingBookings();
  
  // Filter for only non-pending requests (ACCEPTED, COMPLETED)
  const ongoingBookings = allBookings.filter((b: any) => b.status !== "PENDING" && b.status !== "DECLINED" && b.status !== "CANCELLED");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Ongoing Bookings</h1>
        <p className="text-text/60">View your accepted jobs and check their payment status.</p>
      </div>

      <div className="pt-2">
        <OngoingBookings bookings={ongoingBookings} />
      </div>
    </div>
  );
}
