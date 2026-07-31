import { BookingHistory } from "@/components/dashboard/customer/BookingHistory";
import { cookies } from "next/headers";

async function getMyBookings() {
  const token = cookies().get("accessToken")?.value;
  if (!token) return [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://fixitnow-theta.vercel.app/api"}/bookings/my-bookings`, {
      headers: {
        Authorization: token,
      },
      cache: "no-store"
    });
    
    if (!res.ok) return [];
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error("Fetch my-bookings error:", error);
    return [];
  }
}

export default async function BookingHistoryPage() {
  const bookings = await getMyBookings();
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Booking History</h1>
        <p className="text-text/60">View all your service requests and their current status.</p>
      </div>

      <div className="pt-2">
        <BookingHistory initialBookings={bookings} />
      </div>
    </div>
  );
}
