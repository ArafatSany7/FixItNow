"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Plus, List as ListIcon, Loader2 } from "lucide-react";

interface Category {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export function CategoryManagement({ initialCategories = [] }: { initialCategories?: Category[] }) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const router = useRouter();

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) {
      toast.error("Validation Error", { description: "Title and description are required." });
      return;
    }

    const exists = categories.some(cat => cat.title.toLowerCase() === newTitle.toLowerCase().trim());
    if (exists) {
      toast.error("Duplicate Category", { description: "This category already exists." });
      return;
    }

    try {
      setIsCreating(true);
      const token = Cookies.get("accessToken");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://fixitnow-theta.vercel.app/api'}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token || "",
        },
        body: JSON.stringify({
          title: newTitle.trim(),
          description: newDescription.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create category");
      }

      toast.success("Category Created", { description: `${newTitle} has been added successfully.` });
      setNewTitle("");
      setNewDescription("");

      if (data.data) {
        setCategories([...categories, data.data]);
      }

      router.refresh();
    } catch (error: any) {
      toast.error("Error", { description: error.message || "Failed to create category" });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-background border border-secondary/20 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-secondary/20">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Plus className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-text">Add New Category</h2>
            <p className="text-sm text-text/60">Create a new service category for technicians to choose from.</p>
          </div>
        </div>

        <form onSubmit={handleCreateCategory} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text/80">Category Title</label>
              <Input
                placeholder="e.g., Plumbing, Electrician..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                disabled={isCreating}
                className="bg-transparent border-secondary/30"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-text/80">Description</label>
              <Input
                placeholder="Brief description of the service..."
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                disabled={isCreating}
                className="bg-transparent border-secondary/30"
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button type="submit" disabled={isCreating} className="w-full md:w-auto">
              {isCreating ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
              Create Category
            </Button>
          </div>
        </form>
      </div>

      <div className="bg-background border border-secondary/20 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-secondary/20 flex items-center gap-3 bg-secondary/5">
          <ListIcon className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-bold text-text">Existing Categories</h3>
        </div>

        {categories.length === 0 ? (
          <div className="p-8 text-center text-text/60">No categories found. Create one above!</div>
        ) : (
          <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
            <table className="w-full text-left text-sm relative">
              <thead className="bg-secondary/5 text-text/70 border-b border-secondary/20 sticky top-0 backdrop-blur-sm z-10">
                <tr>
                  <th className="p-4 font-semibold">Title</th>
                  <th className="p-4 font-semibold">Description</th>
                  <th className="p-4 font-semibold w-32">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/10">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-secondary/5 transition-colors">
                    <td className="p-4 font-medium text-text">{cat.title}</td>
                    <td className="p-4 text-text/70">{cat.description}</td>
                    <td className="p-4 text-text/60 text-xs">
                      {new Date(cat.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
