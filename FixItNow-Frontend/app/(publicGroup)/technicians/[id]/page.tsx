import { TechnicianProfile } from "@/components/technicians/TechnicianProfile";

export const metadata = {
  title: "Technician Profile | FixItNow",
  description: "View technician details and book a service",
};

export default function TechnicianPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch technician details based on params.id
  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 min-h-[calc(100vh-4rem)]">
      <TechnicianProfile technicianId={params.id} />
    </div>
  );
}
