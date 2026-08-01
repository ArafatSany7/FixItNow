export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <div className="h-8 w-48 bg-secondary/20 rounded-lg mb-2"></div>
        <div className="h-4 w-72 bg-secondary/10 rounded-md"></div>
      </div>

      <div className="pt-2">
        <div className="w-full bg-secondary/5 border border-secondary/20 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6 border-b border-secondary/10 pb-4">
            <div className="h-6 w-48 bg-secondary/20 rounded-md"></div>
            <div className="flex gap-2">
              <div className="h-10 w-64 bg-secondary/10 rounded-md"></div>
              <div className="h-10 w-32 bg-secondary/20 rounded-md"></div>
            </div>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((row) => (
              <div key={row} className="flex justify-between items-center border-b border-secondary/5 pb-4">
                <div className="h-10 w-10 bg-secondary/20 rounded-full"></div>
                <div className="h-5 w-1/4 bg-secondary/10 rounded-md"></div>
                <div className="h-5 w-1/5 bg-secondary/10 rounded-md"></div>
                <div className="h-6 w-16 bg-secondary/20 rounded-full"></div>
                <div className="h-8 w-24 bg-secondary/10 rounded-md"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
