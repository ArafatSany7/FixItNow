import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-48 rounded-lg mb-2" />
        <Skeleton className="h-4 w-64 rounded-md" />
      </div>

      <div className="pt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="border border-secondary/20 rounded-2xl p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Skeleton className="h-6 w-24 rounded-full mb-3" />
                  <Skeleton className="h-5 w-32 rounded-md mb-2" />
                  <Skeleton className="h-4 w-20 rounded-md" />
                </div>
                <div className="text-right">
                  <Skeleton className="h-5 w-24 rounded-md mb-1 ml-auto" />
                  <Skeleton className="h-4 w-16 rounded-md ml-auto" />
                </div>
              </div>

              <div className="rounded-xl p-4 mb-5 border border-secondary/10 space-y-3">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-16 rounded-md" />
                  <Skeleton className="h-4 w-24 rounded-md" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-20 rounded-md" />
                  <Skeleton className="h-4 w-28 rounded-md" />
                </div>
              </div>

              <div className="flex gap-3">
                <Skeleton className="flex-1 h-10 rounded-md" />
                <Skeleton className="flex-1 h-10 border border-secondary/20 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
