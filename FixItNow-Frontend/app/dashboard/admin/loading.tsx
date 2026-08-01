export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <div className="h-8 w-40 bg-secondary/20 rounded-lg mb-2"></div>
        <div className="h-4 w-72 bg-secondary/10 rounded-md"></div>
      </div>

      <div className="pt-2 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-secondary/5 border border-secondary/20 p-5 rounded-xl h-[104px]"></div>
          ))}
        </div>
        <div className="w-full h-[350px] bg-secondary/5 border border-secondary/20 rounded-2xl"></div>
      </div>
    </div>
  );
}
