"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isBanned: boolean;
}

export function UserManagement({ initialUsers = [], meta = { page: 1, limit: 10, total: 0 } }: { initialUsers?: User[], meta?: any }) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery) params.set("search", searchQuery);
    else params.delete("search");
    params.set("page", "1"); // Reset to page 1 on new search
    router.push(`?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

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
    <div className="bg-background border border-secondary/20 rounded-2xl shadow-sm overflow-hidden flex flex-col">
      <div className="p-5 border-b border-secondary/20 bg-secondary/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h3 className="text-lg font-bold text-text">User Directory</h3>

        <form onSubmit={handleSearch} className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text/50" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or email..."
            className="pl-9 bg-transparent border-secondary/30 h-10 w-full"
          />
        </form>
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
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${user.role === "TECHNICIAN" ? "bg-primary/10 text-primary" : (user.role === "ADMIN" ? "bg-purple-500/10 text-purple-600" : "bg-secondary/20 text-text/80")
                      }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${!user.isBanned ? "bg-green-500/10 text-green-600" : "bg-red-500/10 text-red-600"
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
                        className={`h-8 ${!user.isBanned
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


      {meta.total > 0 && (
        <div className="p-4 border-t border-secondary/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-text/70">
          <div>
            Showing <span className="font-medium text-text">{(meta.page - 1) * meta.limit + 1}</span> to <span className="font-medium text-text">{Math.min(meta.page * meta.limit, meta.total)}</span> of <span className="font-medium text-text">{meta.total}</span> users
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(meta.page - 1)}
              disabled={meta.page <= 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="px-2">Page {meta.page}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(meta.page + 1)}
              disabled={meta.page * meta.limit >= meta.total}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
