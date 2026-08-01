import { Skeleton } from"@/components/ui/skeleton";

﻿export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <Skeleton className="h-8 w-48  rounded-lg mb-2" />
        <Skeleton className="h-4 w-72  rounded-md" />
      </div>
      <div className="pt-2">
        <Skeleton className="w-full h-[250px]  border border-secondary/20 rounded-lg" />
      </div>
    </div>
  );
}
