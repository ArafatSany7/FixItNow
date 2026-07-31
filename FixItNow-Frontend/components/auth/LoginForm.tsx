"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { setToken } from "@/lib/cookie";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

interface JwtPayload {
  role: string;
  userId: string;
}

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const res = await api.post('/auth/login', values);
      
      const token = res.data?.data?.token || res.data?.token || res.data?.data?.accessToken;
      if (!token) throw new Error("No token received");

      setToken(token);
      
      const decoded = jwtDecode<JwtPayload>(token);
      toast.success("Logged in successfully!");

      if (decoded.role === "ADMIN" || decoded.role === "SUPER_ADMIN") {
        router.push("/dashboard/admin");
      } else if (decoded.role === "TECHNICIAN") {
        router.push("/dashboard/technician");
      } else {
        router.push("/dashboard/customer");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-text mb-2">Log in to your account</h1>
        <p className="text-text/60">
          Don't have an account? 
          <Link href="/register" className="ml-1 text-primary hover:underline font-medium transition-colors">
            Sign up
          </Link>
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text font-semibold">Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="you@example.com" 
                      className="bg-transparent border-secondary/50 h-12 text-text focus-visible:ring-primary" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-text font-semibold">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••" 
                        className="bg-transparent border-secondary/50 h-12 text-text focus-visible:ring-primary pr-10"
                        {...field} 
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-text/50 hover:text-text focus:outline-none"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Link href="#" className="text-sm text-primary hover:underline font-medium">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full h-12 bg-primary hover:bg-primary/90 text-background text-base font-bold shadow-lg shadow-primary/20">
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
        </form>
      </Form>
    </motion.div>
  );
}
