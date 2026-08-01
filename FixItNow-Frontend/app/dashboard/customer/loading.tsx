import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-32 rounded-lg mb-2" />
        <Skeleton className="h-4 w-64 rounded-md" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-secondary/20 p-5 rounded-xl flex flex-col justify-center">
            <Skeleton className="h-4 w-24 rounded-md mb-3" />
            <Skeleton className="h-8 w-16 rounded-md" />
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-secondary/20">
        <Skeleton className="h-6 w-40 rounded-md mb-4" />
        <div className="overflow-x-auto">
          <Skeleton className="w-full h-[300px] border border-secondary/20 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
