import { PaymentCheckout } from "@/components/dashboard/customer/PaymentCheckout";

export const metadata = {
  title: "Secure Payment | FixItNow",
  description: "Complete your booking payment",
};

export default function PaymentPage({ params }: { params: { id: string } }) {

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Secure Checkout</h1>
        <p className="text-text/60">Complete your payment for booking #{params.id}</p>
      </div>

      <PaymentCheckout bookingId={params.id} />
    </div>
  );
}
