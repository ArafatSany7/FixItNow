import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 min-h-[calc(100vh-4rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 space-y-8">
          
          {/* Header Card Skeleton */}
          <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center bg-background border border-secondary/20 p-6 rounded-2xl shadow-sm">
            <Skeleton className="h-24 w-24 rounded-full shrink-0" />
            <div className="flex-1 space-y-4 w-full">
              <div className="flex flex-wrap items-center gap-2">
                <Skeleton className="h-8 w-48 rounded" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
              <Skeleton className="h-6 w-32 rounded-full" />
              <div className="flex flex-wrap items-center gap-4">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-4 w-32 rounded" />
              </div>
            </div>
          </div>

          {/* About Me Skeleton */}
          <div className="bg-background border border-secondary/20 p-6 rounded-2xl shadow-sm space-y-4">
            <Skeleton className="h-6 w-32 rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-3/4 rounded" />
          </div>

          {/* Skills Skeleton */}
          <div className="bg-background border border-secondary/20 p-6 rounded-2xl shadow-sm space-y-4">
            <Skeleton className="h-6 w-48 rounded" />
            <div className="flex flex-wrap gap-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-24 rounded-lg" />
              ))}
            </div>
          </div>

          {/* Reviews Skeleton */}
          <div className="bg-background border border-secondary/20 p-6 rounded-2xl shadow-sm space-y-6">
            <Skeleton className="h-6 w-40 rounded" />
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border-b border-secondary/20 last:border-0 pb-6 last:pb-0 space-y-3">
                  <div className="flex justify-between items-start">
                    <Skeleton className="h-5 w-32 rounded" />
                    <Skeleton className="h-4 w-24 rounded" />
                  </div>
                  <Skeleton className="h-4 w-32 rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                  <Skeleton className="h-4 w-5/6 rounded" />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Calendar Sidebar Skeleton */}
        <div className="lg:col-span-1">
          <Skeleton className="h-[450px] w-full rounded-2xl" />
        </div>

      </div>
    </div>
  );
}
