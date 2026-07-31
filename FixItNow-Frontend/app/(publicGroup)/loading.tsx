import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section Skeleton */}
      <section className="relative w-full h-[600px] flex flex-col items-center justify-center border-b border-secondary/20">
        <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center space-y-8">
          <Skeleton className="h-16 w-3/4 max-w-3xl rounded-lg" />
          <Skeleton className="h-20 w-5/6 max-w-4xl rounded-lg" />
          <Skeleton className="h-6 w-2/3 max-w-2xl rounded" />
          <div className="w-full max-w-md mt-8 space-y-4">
            <Skeleton className="h-14 w-full rounded-full" />
            <div className="flex justify-center gap-4">
              <Skeleton className="h-12 w-32 rounded-full" />
              <Skeleton className="h-12 w-32 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section Skeleton */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-background border-t border-secondary/20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center text-center space-y-4 mb-12">
            <Skeleton className="h-10 w-64 rounded-lg" />
            <Skeleton className="h-6 w-96 rounded" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="group relative overflow-hidden rounded-xl border border-secondary/30 bg-background/50 p-6">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-6 w-3/4 rounded" />
                    <Skeleton className="h-4 w-full rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
