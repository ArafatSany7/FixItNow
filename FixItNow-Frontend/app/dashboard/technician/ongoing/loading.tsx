import { Skeleton } from"@/components/ui/skeleton";

﻿export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <Skeleton className="h-8 w-56  rounded-lg mb-2" />
        <Skeleton className="h-4 w-72  rounded-md" />
      </div>

      <div className="pt-2">
        <div className="grid grid-cols-1 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-background border border-secondary/20 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Skeleton className="h-6 w-20  rounded-full" />
                  <Skeleton className="h-4 w-16  rounded-md" />
                </div>
                <Skeleton className="h-6 w-40  rounded-md mb-4" />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4  rounded-full" />
                    <Skeleton className="h-4 w-24  rounded-md" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4  rounded-full" />
                    <Skeleton className="h-4 w-20  rounded-md" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4  rounded-full" />
                    <Skeleton className="h-4 w-32  rounded-md" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4  rounded-full" />
                    <Skeleton className="h-4 w-28  rounded-md" />
                  </div>
                </div>
              </div>

              <div className="bg-secondary/5 rounded-xl p-5 border border-secondary/10 w-full md:w-64 shrink-0 flex flex-col justify-center">
                <Skeleton className="h-4 w-28  rounded-md mb-4" />
                <Skeleton className="h-8 w-20  rounded-md mb-2" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-2 w-2  rounded-full" />
                  <Skeleton className="h-4 w-16  rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
