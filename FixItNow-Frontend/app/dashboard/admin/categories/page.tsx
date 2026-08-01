import { CategoryManagement } from "@/components/dashboard/admin/CategoryManagement";

async function getCategories() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://fixitnow-theta.vercel.app/api"}/categories`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    return [];
  }
}

export default async function AdminCategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text">Category Management</h1>
        <p className="text-text/60">Create and manage service categories for your technicians.</p>
      </div>

      <div className="pt-2">
        <CategoryManagement initialCategories={categories} />
      </div>
    </div>
  );
}
