"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Check, Clock } from "lucide-react";

export function AvailabilityScheduler() {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const timeSlots = ["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"];

  // Default selected slots (mock state)
  const [availability, setAvailability] = useState<Record<string, string[]>>({
    "Monday": ["09:00 AM", "10:30 AM", "01:00 PM"],
    "Wednesday": ["01:00 PM", "02:30 PM", "04:00 PM"],
    "Friday": ["09:00 AM", "04:00 PM"],
  });

  const [isSaving, setIsSaving] = useState(false);

  const toggleSlot = (day: string, time: string) => {
    setAvailability(prev => {
      const daySlots = prev[day] || [];
      const newSlots = daySlots.includes(time)
        ? daySlots.filter(t => t !== time) // remove
        : [...daySlots, time]; // add
      
      return { ...prev, [day]: newSlots };
    });
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Availability Updated", {
        description: "Your weekly schedule has been saved successfully.",
      });
    }, 1000);
  };

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
                    className={`flex items-center gap-2 py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                      isSelected
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
