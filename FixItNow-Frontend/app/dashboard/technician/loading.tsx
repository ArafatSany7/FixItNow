export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <div className="h-8 w-48 bg-secondary/20 rounded-lg mb-2"></div>
        <div className="h-4 w-64 bg-secondary/10 rounded-md"></div>
      </div>

      <div className="pt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="bg-background border border-secondary/20 rounded-2xl p-5 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="h-6 w-24 bg-secondary/20 rounded-full mb-3"></div>
                  <div className="h-5 w-32 bg-secondary/20 rounded-md mb-2"></div>
                  <div className="h-4 w-20 bg-secondary/10 rounded-md"></div>
                </div>
                <div className="text-right">
                  <div className="h-5 w-24 bg-secondary/20 rounded-md mb-1 ml-auto"></div>
                  <div className="h-4 w-16 bg-secondary/10 rounded-md ml-auto"></div>
                </div>
              </div>

              <div className="bg-secondary/5 rounded-xl p-4 mb-5 border border-secondary/10 space-y-3">
                <div className="flex justify-between">
                  <div className="h-4 w-16 bg-secondary/20 rounded-md"></div>
                  <div className="h-4 w-24 bg-secondary/20 rounded-md"></div>
                </div>
                <div className="flex justify-between">
                  <div className="h-4 w-20 bg-secondary/20 rounded-md"></div>
                  <div className="h-4 w-28 bg-secondary/20 rounded-md"></div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-1 h-10 bg-secondary/20 rounded-md"></div>
                <div className="flex-1 h-10 bg-secondary/10 border border-secondary/20 rounded-md"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
