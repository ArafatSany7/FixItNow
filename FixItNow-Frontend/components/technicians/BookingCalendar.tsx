"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface BookingCalendarProps {
  technicianId: string;
}

export function BookingCalendar({ technicianId }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const router = useRouter();


  const next7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    d.setHours(0, 0, 0, 0);
    return {
      index: i,
      dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
      dateNumber: d.getDate(),
      fullDate: d.toLocaleDateString(),
      isoDate: d.toISOString(),
    };
  });

  const availableSlots = [
    "09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"
  ];

  const handleBooking = async () => {
    if (!selectedTime) return;

    setIsBooking(true);
    const token = Cookies.get("accessToken");

    if (!token) {
      toast.error("Authentication required", { description: "Please log in to book a service." });
      setIsBooking(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://fixitnow-theta.vercel.app/api'}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token || '',
        },
        body: JSON.stringify({
          technicianId,
          date: next7Days[selectedDate].isoDate,
          timeSlot: selectedTime
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to book service");
      }

      toast.success("Booking Requested!", {
        description: `Your request for ${next7Days[selectedDate].fullDate} at ${selectedTime} has been sent.`,
      });

      setSelectedTime(null);
      router.push("/dashboard/customer");

    } catch (error: any) {
      toast.error("Booking Failed", {
        description: error.message || "Could not complete booking.",
      });
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="bg-background border border-secondary/20 rounded-xl p-6 shadow-sm sticky top-24">
      <h3 className="text-xl font-bold text-text mb-6">Book this Professional</h3>


      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3 text-text/80 font-medium">
          <CalendarIcon className="h-4 w-4" />
          <span>Select Date</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {next7Days.map((day) => {
            const isSelected = selectedDate === day.index;
            return (
              <button
                key={day.index}
                onClick={() => {
                  setSelectedDate(day.index);
                  setSelectedTime(null);
                }}
                className={`flex flex-col items-center justify-center min-w-[4rem] p-2 rounded-xl border transition-all ${isSelected
                  ? "border-primary bg-primary text-background shadow-md"
                  : "border-secondary/30 bg-background text-text hover:border-primary/50"
                  }`}
              >
                <span className="text-xs font-semibold uppercase opacity-80">{day.dayName}</span>
                <span className="text-lg font-bold">{day.dateNumber}</span>
              </button>
            );
          })}
        </div>
      </div>


      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3 text-text/80 font-medium">
          <Clock className="h-4 w-4" />
          <span>Available Slots</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {availableSlots.map((time) => {
            const isSelected = selectedTime === time;
            return (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${isSelected
                  ? "border-primary bg-primary/10 text-primary shadow-sm"
                  : "border-secondary/30 bg-transparent text-text hover:border-primary/50"
                  }`}
              >
                {time}
              </button>
            );
          })}
        </div>
      </div>

      <Button
        onClick={handleBooking}
        disabled={!selectedTime || isBooking}
        className="w-full bg-primary text-background hover:bg-primary/90 h-12 text-base font-semibold"
      >
        {isBooking ? "Booking..." : "Request Booking"}
      </Button>
      <p className="text-xs text-center text-text/50 mt-3">
        You won't be charged until the technician accepts.
      </p>
    </div>
  );
}
