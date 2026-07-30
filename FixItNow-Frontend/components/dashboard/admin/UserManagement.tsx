"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

const dummyUsers = [
  { id: "U-101", name: "arafat", email: "arafat@example.com", role: "CUSTOMER", status: "ACTIVE" },
  { id: "U-102", name: "Karim", email: "karim@example.com", role: "TECHNICIAN", status: "ACTIVE" },
  { id: "U-103", name: "SpamUser", email: "spam@example.com", role: "CUSTOMER", status: "BANNED" },
  { id: "U-104", name: "Modu", email: "modu@example.com", role: "TECHNICIAN", status: "ACTIVE" },
];

export function UserManagement() {
  const [users, setUsers] = useState(dummyUsers);

  const toggleUserStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "BANNED" : "ACTIVE";
    
    setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
    
    toast.success(`User ${newStatus === "BANNED" ? "Banned" : "Unbanned"}`, {
      description: `User ${id} has been ${newStatus.toLowerCase()}.`,
    });
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
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-secondary/5 transition-colors">
                <td className="p-4 font-medium text-text">{user.id}</td>
                <td className="p-4 text-text/80">{user.name}</td>
                <td className="p-4 text-text/80">{user.email}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                    user.role === 'TECHNICIAN' ? 'bg-primary/10 text-primary' : 'bg-secondary/20 text-text/80'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                    user.status === 'ACTIVE' ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  {user.status === "ACTIVE" ? (
                    <Button 
                      onClick={() => toggleUserStatus(user.id, user.status)}
                      variant="outline" 
                      size="sm" 
                      className="border-red-500/50 text-red-600 hover:bg-red-500/10 h-8"
                    >
                      <ShieldAlert className="h-4 w-4 mr-1" /> Ban User
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => toggleUserStatus(user.id, user.status)}
                      variant="outline" 
                      size="sm" 
                      className="border-green-500/50 text-green-600 hover:bg-green-500/10 h-8"
                    >
                      <ShieldCheck className="h-4 w-4 mr-1" /> Unban
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
