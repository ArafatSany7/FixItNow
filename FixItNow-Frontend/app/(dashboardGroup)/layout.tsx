export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">

      <main className="flex-1 p-6 bg-background">
        {children}
      </main>
    </div>
  );
}
