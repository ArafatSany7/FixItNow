"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ShieldCheck, CreditCard as CardIcon } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export function PaymentCheckout({ bookingId }: { bookingId: string }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const bookingData = {
    service: "Electrical Panel Upgrade",
    technician: "Karim",
    date: "Aug 16, 2026 at 02:30 PM",
    amount: 150.00,
    fee: 5.00,
  };

  const handlePayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      toast.success("Payment Successful!", {
        description: `Booking ${bookingId} has been successfully paid.`,
      });
      router.push("/dashboard/customer");
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-secondary/5 border border-secondary/20 p-6 rounded-2xl h-fit"
      >
        <h2 className="text-lg font-bold text-text mb-4">Order Summary</h2>
        <div className="space-y-4 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-text/70">Service</span>
            <span className="font-medium text-text text-right">{bookingData.service}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text/70">Technician</span>
            <span className="font-medium text-text text-right">{bookingData.technician}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text/70">Schedule</span>
            <span className="font-medium text-text text-right">{bookingData.date}</span>
          </div>
        </div>

        <div className="h-px bg-secondary/20 w-full mb-4" />

        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-text/70">Service Fee</span>
            <span className="font-medium text-text">${bookingData.amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text/70">Platform Fee</span>
            <span className="font-medium text-text">${bookingData.fee.toFixed(2)}</span>
          </div>
        </div>

        <div className="h-px bg-secondary/20 w-full mb-4" />

        <div className="flex justify-between items-center mb-2">
          <span className="text-base font-bold text-text">Total Due</span>
          <span className="text-2xl font-bold text-primary">
            ${(bookingData.amount + bookingData.fee).toFixed(2)}
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="bg-background border border-secondary/20 p-6 rounded-2xl">
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-bold text-text">Secure Payment</h2>
          </div>

          <div className="space-y-4 mb-8">
            <button className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-primary bg-primary/5 text-left transition-all">
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 p-2 rounded-lg">
                  <CardIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-text">Credit / Debit Card</p>
                  <p className="text-xs text-text/60">Powered by Stripe</p>
                </div>
              </div>
              <div className="h-4 w-4 rounded-full border-4 border-primary bg-background" />
            </button>

            <button className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-transparent bg-secondary/5 hover:border-secondary/30 text-left transition-all">
              <div className="flex items-center gap-3">
                <div className="bg-secondary/20 p-2 rounded-lg">
                  <span className="font-bold text-secondary text-sm">SSL</span>
                </div>
                <div>
                  <p className="font-semibold text-text">SSLCommerz</p>
                  <p className="text-xs text-text/60">Local Payment Gateways</p>
                </div>
              </div>
              <div className="h-4 w-4 rounded-full border-2 border-secondary/30 bg-background" />
            </button>
          </div>

          <Button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-primary text-background hover:bg-primary/90 h-12 text-base font-semibold"
          >
            {isProcessing ? "Processing..." : `Pay $${(bookingData.amount + bookingData.fee).toFixed(2)}`}
          </Button>

          <p className="text-xs text-center text-text/50 mt-4">
            By completing this payment, you agree to our Terms of Service.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
