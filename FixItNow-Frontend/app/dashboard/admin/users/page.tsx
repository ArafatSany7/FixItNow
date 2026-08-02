import { UserManagement } from "@/components/dashboard/admin/UserManagement";
import { cookies } from "next/headers";

export const metadata = {
  title: "User Management | FixItNow",
  description: "Manage platform users and technicians",
};

async function getAllUsers(searchParams: any) {
  const token = cookies().get("accessToken")?.value;
  if (!token) return { data: [], meta: { page: 1, limit: 10, total: 0 } };

  try {
    const params = new URLSearchParams(searchParams);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://fixitnow-theta.vercel.app/api"}/users?${params.toString()}`, {
      headers: { Authorization: token },
      cache: "no-store",
    });
    if (!res.ok) return { data: [], meta: { page: 1, limit: 10, total: 0 } };
    const data = await res.json();
    return { data: data?.data || [], meta: data?.meta || { page: 1, limit: 10, total: 0 } };
  } catch (error) {
    return { data: [], meta: { page: 1, limit: 10, total: 0 } };
  }
}

export default async function AdminUsersPage({ searchParams }: { searchParams: any }) {
  const { data: users, meta } = await getAllUsers(searchParams);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">User Management</h1>
        <p className="text-text/60">View, manage, and moderate users across the platform.</p>
      </div>

      <div className="pt-2">
        <UserManagement initialUsers={users} meta={meta} />
      </div>
    </div>
  );
}
