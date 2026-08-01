"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isBanned: boolean;
}

export function UserManagement({ initialUsers = [] }: { initialUsers?: User[] }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const router = useRouter();

  const toggleUserStatus = async (id: string, currentlyBanned: boolean) => {
    try {
      setIsProcessing(id);
      const token = Cookies.get("accessToken");
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://fixitnow-theta.vercel.app/api"}/users/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token || "",
        },
        body: JSON.stringify({ isBanned: !currentlyBanned })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update user status");
      }

      setUsers(users.map(u => u.id === id ? { ...u, isBanned: !currentlyBanned } : u));
      
      toast.success(`User ${!currentlyBanned ? "Banned" : "Unbanned"}`, {
        description: `User ${id} has been ${!currentlyBanned ? "banned" : "unbanned"}.`,
      });
      
      router.refresh();
    } catch (error: any) {
      toast.error("Error", {
        description: error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsProcessing(null);
    }
  };

  return (
    <div className="bg-background border border-secondary/20 rounded-2xl shadow-sm overflow-hidden">
      <div className="p-5 border-b border-secondary/20 bg-secondary/5">
        <h3 className="text-lg font-bold text-text">User Directory</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary/5 text-text/70 border-b border-secondary/20">
            <tr>
              <th className="p-4 font-semibold">User ID</th>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Email</th>
              <th className="p-4 font-semibold">Role</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-secondary/10">
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-text/60">No users found.</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-secondary/5 transition-colors">
                  <td className="p-4 font-medium text-text">{user.id.split("-")[0]}</td>
                  <td className="p-4 text-text/80">{user.name}</td>
                  <td className="p-4 text-text/80">{user.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                      user.role === "TECHNICIAN" ? "bg-primary/10 text-primary" : (user.role === "ADMIN" ? "bg-purple-500/10 text-purple-600" : "bg-secondary/20 text-text/80")
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                      !user.isBanned ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
                    }`}>
                      {!user.isBanned ? "ACTIVE" : "BANNED"}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {user.role !== "ADMIN" && (
                      <Button
                        variant={!user.isBanned ? "outline" : "default"}
                        size="sm"
                        onClick={() => toggleUserStatus(user.id, user.isBanned)}
                        disabled={isProcessing === user.id}
                        className={`h-8 ${
                          !user.isBanned 
                            ? "border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950" 
                            : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                      >
                        {!user.isBanned ? (
                          <><ShieldAlert className="h-4 w-4 mr-1.5" /> {isProcessing === user.id ? "Banning..." : "Ban User"}</>
                        ) : (
                          <><ShieldCheck className="h-4 w-4 mr-1.5" /> {isProcessing === user.id ? "Unbanning..." : "Unban User"}</>
                        )}
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
