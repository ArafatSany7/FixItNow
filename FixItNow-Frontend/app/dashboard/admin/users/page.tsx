import { UserManagement } from "@/components/dashboard/admin/UserManagement";
import { cookies } from "next/headers";

export const metadata = {
  title: "User Management | FixItNow",
  description: "Manage platform users and technicians",
};

async function getAllUsers() {
  const token = cookies().get("accessToken")?.value;
  if (!token) return [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://fixitnow-theta.vercel.app/api"}/users`, {
      headers: { Authorization: token },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    return [];
  }
}

export default async function AdminUsersPage() {
  const users = await getAllUsers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">User Management</h1>
        <p className="text-text/60">View, manage, and moderate users across the platform.</p>
      </div>

      <div className="pt-2">
        <UserManagement initialUsers={users} />
      </div>
    </div>
  );
}
