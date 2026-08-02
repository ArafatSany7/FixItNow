import Link from "next/link";
import { Wrench, ArrowLeft } from "lucide-react";
import { AuthCarousel } from "@/components/auth/AuthCarousel";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-background">

      <div className="hidden lg:flex flex-col relative w-1/2 overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/10 to-accent/5 dark:from-primary/10 dark:via-secondary/10 dark:to-accent/5 border-r border-secondary/20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50" />
        
        <div className="relative z-20 flex justify-between items-center w-full p-8 md:p-12">
          <Link href="/" className="flex items-center gap-2">
            <Wrench className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold tracking-tight text-text">FixIt<span className="text-primary">Now</span></span>
          </Link>

          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-text/70 hover:text-text transition-colors bg-background/50 border border-secondary/20 px-4 py-2 rounded-full backdrop-blur-md shadow-sm">
            <ArrowLeft className="h-4 w-4" />
            Back to website
          </Link>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center px-12 xl:px-20">
          <AuthCarousel />
        </div>
      </div>


      <div className="flex flex-col flex-1">

        <div className="lg:hidden w-full p-6 flex justify-between items-center border-b border-secondary/10">
          <Link href="/" className="flex items-center gap-2">
            <Wrench className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight text-text">FixIt<span className="text-primary">Now</span></span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-sm font-medium text-text/70 hover:text-text transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center p-4 md:p-8 lg:p-12 relative">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
