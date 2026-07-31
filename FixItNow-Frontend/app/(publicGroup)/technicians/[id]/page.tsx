import { TechnicianProfile } from "@/components/technicians/TechnicianProfile";

export const metadata = {
  title: "Technician Profile | FixItNow",
  description: "View technician details and book a service",
};

async function getTechnician(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://fixitnow-theta.vercel.app/api'}/technicians/${id}`, {
      cache: 'no-store'
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.data || null;
  } catch (error) {
    return null;
  }
}

async function getReviews(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://fixitnow-theta.vercel.app/api'}/reviews/technician/${id}`, {
      cache: 'no-store'
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    return [];
  }
}

export default async function TechnicianPage({ params }: { params: { id: string } }) {
  const technician = await getTechnician(params.id);

  if (!technician) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Technician Not Found</h1>
        <p className="text-text/70">The technician you are looking for does not exist or has been removed.</p>
      </div>
    );
  }

  // Fetch reviews using the underlying userId, not the technicianProfile id
  const reviews = await getReviews(technician.userId);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 min-h-[calc(100vh-4rem)]">
      <TechnicianProfile technician={technician} reviews={reviews} />
    </div>
  );
}
