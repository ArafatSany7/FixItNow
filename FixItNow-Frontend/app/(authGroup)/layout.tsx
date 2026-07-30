import Link from "next/link";
import { Wrench, ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Left Pane - Image & Branding */}
      <div className="hidden lg:flex flex-col relative w-1/2 overflow-hidden bg-zinc-900">
        <Image 
          src="/auth-hero.png" 
          alt="FixItNow Professional" 
          fill 
          className="object-cover opacity-60 mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        
        <div className="relative z-10 flex flex-col h-full justify-between p-12">
          <div className="flex justify-between items-center w-full">
            <Link href="/" className="flex items-center gap-2">
              <Wrench className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold tracking-tight text-white">FixIt<span className="text-primary">Now</span></span>
            </Link>
            
            <Link href="/" className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors bg-white/10 px-4 py-2 rounded-full backdrop-blur-md">
              <ArrowLeft className="h-4 w-4" />
              Back to website
            </Link>
          </div>

          <div className="space-y-6 max-w-lg">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Reliable repairs, <br/>
              <span className="text-primary">delivered perfectly.</span>
            </h1>
            <p className="text-lg text-white/70">
              Join thousands of satisfied customers who trust our verified professionals for their home maintenance needs.
            </p>
            
            {/* Simple Pagination Dots matching the design */}
            <div className="flex gap-2 pt-4">
              <div className="h-1.5 w-8 bg-primary rounded-full" />
              <div className="h-1.5 w-8 bg-white/20 rounded-full" />
              <div className="h-1.5 w-8 bg-white/20 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Right Pane - Form Content */}
      <div className="flex flex-col flex-1">
        {/* Mobile Header (only visible on small screens) */}
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
