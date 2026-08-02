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

export default async function CustomerDashboardOverview() {
  const bookings = await getMyBookings();
  
  const activeBookings = bookings.filter((b: any) => b.status === "PENDING" || b.status === "ACCEPTED" || b.status === "IN_PROGRESS").length;
  const completedJobs = bookings.filter((b: any) => b.status === "COMPLETED").length;
  
  const totalSpent = bookings.reduce((sum: number, b: any) => {
    if (b.payment?.status === "PAID") {
      return sum + (b.payment.amount || 0);
    }
    return sum;
  }, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Overview</h1>
        <p className="text-text/60">Welcome back! Here is a summary of your recent activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

        <div className="bg-secondary/10 border border-secondary/20 p-5 rounded-xl">
          <p className="text-text/70 text-sm font-medium">Active Bookings</p>
          <p className="text-3xl font-bold text-primary mt-1">{activeBookings}</p>
        </div>
        <div className="bg-secondary/10 border border-secondary/20 p-5 rounded-xl">
          <p className="text-text/70 text-sm font-medium">Completed Jobs</p>
          <p className="text-3xl font-bold text-primary mt-1">{completedJobs}</p>
        </div>
        <div className="bg-secondary/10 border border-secondary/20 p-5 rounded-xl">
          <p className="text-text/70 text-sm font-medium">Total Spent</p>
          <p className="text-3xl font-bold text-primary mt-1">${totalSpent}</p>
        </div>
      </div>

      <div className="pt-6 border-t border-secondary/20">
        <h2 className="text-xl font-bold text-text mb-4">Recent Bookings</h2>
        <BookingHistory initialBookings={bookings.slice(0, 3)} />
      </div>
    </div>
  );
}
