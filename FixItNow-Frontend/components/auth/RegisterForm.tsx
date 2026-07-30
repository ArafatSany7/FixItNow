"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

const formSchema = z.object({
  role: z.enum(["customer", "technician"], { required_error: "Please select your role." }),
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  terms: z.boolean().refine(val => val === true, { message: "You must agree to the terms and conditions." })
});

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "customer",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      terms: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-text mb-2">Create an account</h1>
        <p className="text-text/60">
          Already have an account? 
          <Link href="/login" className="ml-1 text-primary hover:underline font-medium transition-colors">
            Log in
          </Link>
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-text font-semibold">I want to...</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-2 gap-4">
                    <div 
                      onClick={() => field.onChange("customer")}
                      className={`cursor-pointer rounded-xl border p-4 text-center transition-all ${field.value === "customer" ? "border-primary bg-primary/10 shadow-sm" : "border-secondary/30 bg-transparent hover:border-primary/50"}`}
                    >
                      <h3 className={`font-bold ${field.value === "customer" ? "text-primary" : "text-text"}`}>Book Services</h3>
                      <p className="text-xs text-text/60 mt-1">I need a professional</p>
                    </div>
                    <div 
                      onClick={() => field.onChange("technician")}
                      className={`cursor-pointer rounded-xl border p-4 text-center transition-all ${field.value === "technician" ? "border-primary bg-primary/10 shadow-sm" : "border-secondary/30 bg-transparent hover:border-primary/50"}`}
                    >
                      <h3 className={`font-bold ${field.value === "technician" ? "text-primary" : "text-text"}`}>Offer Services</h3>
                      <p className="text-xs text-text/60 mt-1">I am a professional</p>
                    </div>
                  </div>
                </FormControl>
                <FormMessage className="text-accent" />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-text sr-only">First name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} className="bg-transparent border-secondary text-text placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:ring-primary h-12" />
                  </FormControl>
                  <FormMessage className="text-accent" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="text-text sr-only">Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} className="bg-transparent border-secondary text-text placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:ring-primary h-12" />
                  </FormControl>
                  <FormMessage className="text-accent" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-text sr-only">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} className="bg-transparent border-secondary text-text placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:ring-primary h-12" />
                </FormControl>
                <FormMessage className="text-accent" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-text sr-only">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="Enter your password" 
                      {...field} 
                      className="bg-transparent border-secondary text-text placeholder:text-gray-400 dark:placeholder:text-gray-500 focus-visible:ring-primary h-12 pr-10" 
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text/50 hover:text-primary transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-accent" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-2">
                <FormControl>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    className="h-4 w-4 rounded border-secondary/30 bg-secondary/10 text-primary focus:ring-primary mt-1"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-medium text-text/80 cursor-pointer">
                    I agree to the <Link href="/terms" className="text-primary hover:underline">Terms & Conditions</Link>
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-primary text-background hover:bg-primary/90 h-12 text-base font-semibold mt-2">
            Create account
          </Button>
        </form>
      </Form>
      
      <div className="mt-8 flex items-center justify-center space-x-4">
        <div className="flex-1 border-t border-secondary/30" />
        <span className="text-sm text-text/50">Or register with</span>
        <div className="flex-1 border-t border-secondary/30" />
      </div>

      <div className="mt-6 flex justify-center">
        <Button variant="outline" className="w-full h-12 border-secondary bg-transparent hover:bg-secondary/10">
          <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </Button>
      </div>
    </motion.div>
  );
}
