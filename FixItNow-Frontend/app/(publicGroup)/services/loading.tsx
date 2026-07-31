import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 flex flex-col md:flex-row gap-8 min-h-[calc(100vh-4rem)]">
      <aside className="w-full md:w-64 lg:w-80 shrink-0 space-y-6">
        <Skeleton className="h-[500px] w-full rounded-xl" />
      </aside>

      <main className="flex-1 space-y-6">
        <div className="space-y-3 mb-8">
          <Skeleton className="h-10 w-64 rounded" />
          <Skeleton className="h-5 w-96 rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4 border border-secondary/20 p-4 rounded-xl">
              <Skeleton className="h-48 w-full rounded-lg" />
              <div className="space-y-3">
                <Skeleton className="h-6 w-3/4 rounded" />
                <Skeleton className="h-4 w-1/2 rounded" />
                <div className="flex gap-4 pt-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-full rounded" />
                    <Skeleton className="h-3 w-3/4 rounded" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
