import { ProfileSetupForm } from "@/components/dashboard/technician/ProfileSetupForm";

export const metadata = {
  title: "Profile & Services Setup | FixItNow",
  description: "Set up your technician profile and service offerings",
};

export default function TechnicianProfileSetupPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-text">Profile & Services</h1>
        <p className="text-text/60">Update your category, bio, and the services you offer to customers.</p>
      </div>

      <div className="pt-2">
        <ProfileSetupForm />
      </div>
    </div>
  );
}
