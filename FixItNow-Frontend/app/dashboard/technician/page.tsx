import { BookingManagement } from "@/components/dashboard/technician/BookingManagement";
import { cookies } from "next/headers";

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

export default async function TechnicianDashboardOverview() {
  const allBookings = await getIncomingBookings();

  const pendingRequests = allBookings.filter((b: any) => b.status === "PENDING");
  const completedJobs = allBookings.filter((b: any) => b.status === "COMPLETED").length;
  const totalEarnings = allBookings.reduce((sum: number, b: any) => {
    if (b.payment?.status === "PAID") {
      return sum + (b.payment.amount || 0);
    }
    return sum;
  }, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Overview</h1>
        <p className="text-text/60">Welcome back! Here is a summary of your technician activity.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-secondary/10 border border-secondary/20 p-5 rounded-xl">
          <p className="text-text/70 text-sm font-medium">Pending Requests</p>
          <p className="text-3xl font-bold text-primary mt-1">{pendingRequests.length}</p>
        </div>
        <div className="bg-secondary/10 border border-secondary/20 p-5 rounded-xl">
          <p className="text-text/70 text-sm font-medium">Completed Jobs</p>
          <p className="text-3xl font-bold text-primary mt-1">{completedJobs}</p>
        </div>
        <div className="bg-secondary/10 border border-secondary/20 p-5 rounded-xl">
          <p className="text-text/70 text-sm font-medium">Total Earnings</p>
          <p className="text-3xl font-bold text-primary mt-1">${totalEarnings}</p>
        </div>
      </div>

      <div className="pt-2">
        <BookingManagement initialBookings={pendingRequests} />
      </div>
    </div>
  );
}
