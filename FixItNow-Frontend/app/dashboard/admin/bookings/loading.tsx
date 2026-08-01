import { Skeleton } from"@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <Skeleton className="h-8 w-48  rounded-lg mb-2" />
        <Skeleton className="h-4 w-72  rounded-md" />
      </div>

      <div className="pt-2 space-y-8">
        <div className="w-full bg-secondary/5 border border-secondary/20 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6 border-b border-secondary/10 pb-4">
            <Skeleton className="h-6 w-48  rounded-md" />
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map((row) => (
              <div key={row} className="flex justify-between items-center border-b border-secondary/5 pb-4">
                <Skeleton className="h-5 w-1/4  rounded-md" />
                <Skeleton className="h-5 w-1/4  rounded-md" />
                <Skeleton className="h-5 w-1/6  rounded-md" />
                <Skeleton className="h-5 w-1/6  rounded-md" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="w-full bg-secondary/5 border border-secondary/20 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6 border-b border-secondary/10 pb-4">
            <Skeleton className="h-6 w-48  rounded-md" />
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((row) => (
              <div key={row} className="flex justify-between items-center border-b border-secondary/5 pb-4">
                <Skeleton className="h-5 w-1/4  rounded-md" />
                <Skeleton className="h-5 w-1/4  rounded-md" />
                <Skeleton className="h-5 w-1/6  rounded-md" />
                <Skeleton className="h-5 w-1/6  rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
