export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div>
        <div className="h-8 w-48 bg-secondary/20 rounded-lg mb-2"></div>
        <div className="h-4 w-72 bg-secondary/10 rounded-md"></div>
      </div>

      <div className="pt-2">
        <div className="w-full h-[400px] bg-secondary/5 border border-secondary/20 rounded-2xl"></div>
      </div>
    </div>
  );
}
