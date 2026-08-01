import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-40 rounded-lg mb-2" />
        <Skeleton className="h-4 w-72 rounded-md" />
      </div>

      <div className="pt-2 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border border-secondary/20 p-5 rounded-xl h-[104px] flex flex-col justify-center">
              <Skeleton className="h-4 w-24 rounded-md mb-3" />
              <Skeleton className="h-8 w-16 rounded-md" />
            </div>
          ))}
        </div>
        
        <div className="border border-secondary/20 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6 border-b border-secondary/10 pb-4">
            <Skeleton className="h-6 w-48 rounded-md" />
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((row) => (
              <div key={row} className="flex justify-between items-center border-b border-secondary/5 pb-4">
                <Skeleton className="h-5 w-1/4 rounded-md" />
                <Skeleton className="h-5 w-1/4 rounded-md" />
                <Skeleton className="h-5 w-1/6 rounded-md" />
                <Skeleton className="h-5 w-1/6 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
