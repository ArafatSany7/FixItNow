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

export default async function PaymentsPage() {
  const bookings = await getMyBookings();
  const bookingsWithPayments = bookings.filter((b: any) => b.payment);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Payment History</h1>
        <p className="text-text/60">View your generated invoices and payment statuses.</p>
      </div>

      <div className="overflow-x-hidden pt-4">
        <table className="w-full text-left text-sm block md:table">
          <thead className="bg-secondary/10 text-text/70 border-b border-secondary/20 hidden md:table-header-group">
            <tr>
              <th className="p-4 font-semibold">Transaction ID</th>
              <th className="p-4 font-semibold">Booking ID</th>
              <th className="p-4 font-semibold">Amount</th>
              <th className="p-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {bookingsWithPayments.length === 0 ? (
              <tr className="block md:table-row">
                <td colSpan={4} className="p-8 text-center text-text/60 block md:table-cell">
                  No payment history found.
                </td>
              </tr>
            ) : (
              bookingsWithPayments.map((booking: any) => (
                <tr key={booking.payment.id} className="block md:table-row border border-secondary/20 md:border-none rounded-xl md:rounded-none mb-4 md:mb-0 hover:bg-secondary/5 transition-colors bg-secondary/5 md:bg-transparent overflow-hidden">
                  <td className="flex justify-between items-center md:table-cell p-3 md:p-4 border-b border-secondary/10 md:border-none">
                    <span className="md:hidden font-semibold text-text/70 text-xs uppercase">Transaction ID</span>
                    <span className="font-medium text-text truncate max-w-[150px] sm:max-w-none">{booking.payment.transactionId}</span>
                  </td>
                  <td className="flex justify-between items-center md:table-cell p-3 md:p-4 border-b border-secondary/10 md:border-none">
                    <span className="md:hidden font-semibold text-text/70 text-xs uppercase">Booking ID</span>
                    <span className="text-text/80">{booking.id.split("-")[0]}</span>
                  </td>
                  <td className="flex justify-between items-center md:table-cell p-3 md:p-4 border-b border-secondary/10 md:border-none">
                    <span className="md:hidden font-semibold text-text/70 text-xs uppercase">Amount</span>
                    <span className="font-semibold text-text">${booking.payment.amount}</span>
                  </td>
                  <td className="flex justify-between items-center md:table-cell p-3 md:p-4">
                    <span className="md:hidden font-semibold text-text/70 text-xs uppercase">Status</span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      booking.payment.status === "PAID" 
                        ? "bg-green-500/10 text-green-600 border border-green-500/20" 
                        : "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20"
                    }`}>
                      {booking.payment.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
