export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <div className="h-8 w-32 bg-secondary/20 rounded-lg mb-2"></div>
        <div className="h-4 w-64 bg-secondary/10 rounded-md"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-secondary/5 border border-secondary/20 p-5 rounded-xl">
            <div className="h-4 w-24 bg-secondary/20 rounded-md mb-3"></div>
            <div className="h-8 w-16 bg-secondary/20 rounded-md"></div>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-secondary/20">
        <div className="h-6 w-40 bg-secondary/20 rounded-md mb-4"></div>
        <div className="overflow-x-auto">
          <div className="w-full h-[300px] bg-secondary/5 border border-secondary/20 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
