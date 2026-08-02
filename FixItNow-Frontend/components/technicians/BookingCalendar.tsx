"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface BookingCalendarProps {
  technicianId: string;
  availability?: Record<string, string[]>;
  technicianBookings?: { date: string, timeSlot: string, status: string }[];
}

export function BookingCalendar({ technicianId, availability = {}, technicianBookings = [] }: BookingCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const router = useRouter();


  const next7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    d.setHours(0, 0, 0, 0);
    return {
      index: i,
      dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
      fullDayName: d.toLocaleDateString("en-US", { weekday: "long" }),
      dateNumber: d.getDate(),
      fullDate: d.toLocaleDateString(),
      isoDate: d.toISOString(),
    };
  });

  const selectedDayName = next7Days[selectedDate].fullDayName;
  const availableSlots = availability && availability[selectedDayName] && availability[selectedDayName].length > 0
    ? availability[selectedDayName]
    : [];

  const handleBooking = async () => {
    if (!selectedTime) return;

    setIsBooking(true);
    const token = Cookies.get("accessToken");

    if (!token) {
      setIsAuthModalOpen(true);
      setIsBooking(false);
      return;
    }

    try {
      const decoded: any = jwtDecode(token);
      if (decoded.role !== "CUSTOMER") {
        setIsAuthModalOpen(true);
        setIsBooking(false);
        return;
      }
    } catch (e) {
      setIsAuthModalOpen(true);
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
      router.refresh();
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
          {availableSlots.length > 0 ? (
            availableSlots.map((time) => {

              const isBooked = technicianBookings.some(b => {
                const bookingDate = new Date(b.date).toDateString();
                const currentDate = new Date(next7Days[selectedDate].isoDate).toDateString();
                return bookingDate === currentDate && b.timeSlot === time;
              });

              return (
                <Button
                  key={time}
                  variant="outline"
                  disabled={isBooked}
                  className={`border-secondary/30 ${isBooked
                      ? "bg-secondary/10 text-text/30 cursor-not-allowed line-through hover:bg-secondary/10 hover:text-text/30"
                      : selectedTime === time
                        ? "bg-primary text-background border-primary hover:bg-primary/90 hover:text-background"
                        : "hover:border-primary/50 text-text/80"
                    }`}
                  onClick={() => !isBooked && setSelectedTime(time)}
                >
                  {time}
                </Button>
              );
            })
          ) : (
            <div className="col-span-2 text-center text-text/50 py-4 text-sm">
              Not available on this date
            </div>
          )}
        </div>
      </div>

      <Button
        className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm shadow-primary/20"
        disabled={!selectedTime || isBooking}
        onClick={handleBooking}
      >
        {isBooking ? "Booking..." : "Request Booking"}
      </Button>
      <p className="text-center text-xs text-text/50 mt-3 font-medium">
        You won't be charged until the technician accepts.
      </p>

      <Dialog open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen}>
        <DialogContent className="sm:max-w-md border-secondary/20 bg-background">
          <DialogHeader className="mb-2">
            <DialogTitle className="text-2xl text-center text-primary font-bold">Authentication Required</DialogTitle>
            <DialogDescription className="text-center text-text/70 pt-2 text-base">
              Only registered customers can book a service. Please log in or create a new customer account to continue with your booking.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <Button
              className="w-full bg-primary hover:bg-primary/90 text-white shadow-md shadow-primary/20 py-5 text-md font-semibold"
              onClick={() => router.push('/login')}
            >
              Login to Account
            </Button>
            <Button
              variant="outline"
              className="w-full border-primary/30 text-primary hover:bg-primary/5 py-5 text-md font-semibold"
              onClick={() => router.push('/register')}
            >
              Create New Account
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
