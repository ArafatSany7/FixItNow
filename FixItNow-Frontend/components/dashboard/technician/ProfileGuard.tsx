"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "sonner";

export function ProfileGuard({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const token = Cookies.get("accessToken");
        if (!token) {
          setIsLoading(false);
          return;
        }

        const profileRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://fixitnow-theta.vercel.app/api'}/users/profile`, {
          headers: { Authorization: token },
          cache: 'no-store'
        });
        const profileData = await profileRes.json();
        
        if (profileData.data && !profileData.data.technicianProfile) {
          if (pathname !== "/dashboard/technician/profile") {
            toast.warning("You must setup your profile first!");
            router.push("/dashboard/technician/profile");
          } else {
            setIsLoading(false);
          }
        } else if (
          profileData.data && 
          profileData.data.technicianProfile && 
          (!profileData.data.technicianProfile.availability || Object.keys(profileData.data.technicianProfile.availability).length === 0)
        ) {
          if (pathname !== "/dashboard/technician/availability" && pathname !== "/dashboard/technician/profile") {
            toast.warning("Please set your availability schedule next!");
            router.push("/dashboard/technician/availability");
          } else {
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch profile in guard");
        setIsLoading(false);
      }
    };
    
    checkProfile();
  }, [pathname, router]);

  if (isLoading) {
    return (
      <div className="flex h-full min-h-[400px] w-full items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent shadow-sm"></div>
      </div>
    );
  }

  return <>{children}</>;
}
