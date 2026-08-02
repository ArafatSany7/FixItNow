"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Check, Clock } from "lucide-react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export function AvailabilityScheduler() {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const timeSlots = ["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"];

  const [availability, setAvailability] = useState<Record<string, string[]>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = Cookies.get("accessToken");
        if (!token) return;


        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://fixitnow-theta.vercel.app/api'}/users/profile`, {
          headers: { Authorization: token }
        });
        const data = await res.json();

        if (data.data?.technicianProfile?.availability) {
          setAvailability(data.data.technicianProfile.availability);
        }
      } catch (error) {
        console.error("Failed to load availability", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const toggleSlot = (day: string, time: string) => {
    setAvailability(prev => {
      const daySlots = prev[day] || [];
      const newSlots = daySlots.includes(time)
        ? daySlots.filter(t => t !== time)
        : [...daySlots, time];

      return { ...prev, [day]: newSlots };
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = Cookies.get("accessToken");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://fixitnow-theta.vercel.app/api'}/technicians/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token || ""
        },
        body: JSON.stringify({ availability })
      });

      if (!res.ok) throw new Error("Failed to save");

      toast.success("Availability Updated", {
        description: "Your weekly schedule has been saved successfully.",
      });
      router.push('/dashboard/technician');
    } catch (error) {
      toast.error("Error", { description: "Failed to update availability" });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-text/60">Loading schedule...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center bg-secondary/5 border border-secondary/20 p-5 rounded-xl">
        <div>
          <h2 className="text-lg font-bold text-text">Weekly Schedule</h2>
          <p className="text-sm text-text/60 mt-1">Select the time slots you are available for booking.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="bg-primary text-background hover:bg-primary/90 shadow-sm h-10 px-6">
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {daysOfWeek.map(day => (
          <div key={day} className="bg-background border border-secondary/20 rounded-2xl p-5 shadow-sm">
            <h3 className="text-base font-bold text-text mb-4 border-b border-secondary/20 pb-2">{day}</h3>
            <div className="flex flex-wrap gap-3">
              {timeSlots.map(time => {
                const isSelected = availability[day]?.includes(time);
                return (
                  <button
                    key={time}
                    onClick={() => toggleSlot(day, time)}
                    className={`flex items-center gap-2 py-2 px-3 rounded-lg border text-sm font-medium transition-all ${isSelected
                        ? "border-primary bg-primary/10 text-primary shadow-sm"
                        : "border-secondary/30 bg-transparent text-text hover:border-primary/50"
                      }`}
                  >
                    {isSelected ? <Check className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5 opacity-50" />}
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
