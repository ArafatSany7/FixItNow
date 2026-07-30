import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = {
  title: "Login | FixItNow",
  description: "Sign in to your FixItNow account",
};

export default function LoginPage() {
  return (
    <div className="flex-1 relative flex items-center justify-center p-4 min-h-[calc(100vh-4rem)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
      <div className="relative z-10 w-full">
        <LoginForm />
      </div>
    </div>
  );
}
