import { AvailabilityScheduler } from "@/components/dashboard/technician/AvailabilityScheduler";

export const metadata = {
  title: "Availability Schedule | FixItNow",
  description: "Manage your weekly availability",
};

export default function AvailabilityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Availability</h1>
        <p className="text-text/60">Manage your weekly schedule so customers know when they can book you.</p>
      </div>

      <div className="pt-2">
        <AvailabilityScheduler />
      </div>
    </div>
  );
}
