"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple mock login
    if (email === "admin@example.com" && password === "admin123") {
      toast.success("Logged in as Admin");
      localStorage.setItem("userRole", "admin");
      router.push("/admin/dashboard");
    } else if (email === "user@example.com" && password === "user123") {
      toast.success("Logged in as User");
      localStorage.setItem("userRole", "user");
      router.push("/");
    } else {
      toast.error("Invalid credentials. Try admin@example.com/admin123 or user@example.com/user123");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <Card className="w-full max-w-md border-primary/10">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-3xl">eco</span>
            <CardTitle className="text-2xl font-bold text-primary">Verdant Aura</CardTitle>
          </div>
          <CardDescription>
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-primary/20 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-primary/20 focus:ring-primary"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full bg-primary hover:opacity-90">
              Sign In
            </Button>
            <div className="text-sm text-center text-slate-500">
              Dont have an account? <Link href="#" className="text-primary font-bold hover:underline">Sign up</Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
