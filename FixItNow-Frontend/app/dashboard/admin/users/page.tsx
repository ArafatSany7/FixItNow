import { UserManagement } from "@/components/dashboard/admin/UserManagement";

export const metadata = {
  title: "User Management | FixItNow",
  description: "Manage platform users and technicians",
};

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">User Management</h1>
        <p className="text-text/60">View, manage, and moderate users across the platform.</p>
      </div>

      <div className="pt-2">
        <UserManagement />
      </div>
    </div>
  );
}
