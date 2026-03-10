"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeClosed, LeafyGreen } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="flex min-h-screen flex-col lg:flex-row bg-background">
      {/* Left Side: Visual/Hero (Visible on Desktop) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEzs8J8BZ0xA37vQ36SIh8VxklAPhWNmynioP1_r8xbNttBemDxUN9JFRowN8Guav589pas0rfvYNK6xHiJS1x3Kw-chvXnyrxn3mIV7U-CFYiQGZv6W1u4ERHuzn0X1Q4BIT5ABLKGpbZPPpEn0mcxK2rtdItPlP1RQUPLCTbC5Jp1CyJBaMgqZMl7a5UTcqaNyRmJNNfzYkgASn10YRJxYjWu66ZL_IJMnmlqpH2j5sDnThskxeGSkhqBN9u18j-M95bGZbqscQ"
            alt="Lush green Monstera leaves"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 backdrop-blur-md rounded-lg">
              <LeafyGreen className="w-8 h-8" />
            </div>
            <span className="text-2xl font-bold tracking-tight">Verdant Aura</span>
          </div>
          <div>
            <h1 className="text-5xl font-extrabold leading-tight mb-6">Bring nature into your workspace.</h1>
            <p className="text-xl text-white/80 max-w-md">Join our community of over 50,000 plant parents and get expert care tips delivered to your inbox.</p>
          </div>
          <div className="flex gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 w-10 rounded-full border-2 border-primary overflow-hidden relative">
                  <Image
                    src={`https://lh3.googleusercontent.com/aida-public/${
                      i === 1 ? "AB6AXuCCGDBxQ3RKWL2IimzoMRZN7kcfbBqQZZNB4MYSz8u0WR_m-mcD4Ow4bqbGrMn-3jHZPiSXF6n3b-l_GZfot1d7dsOyC7Q8NAvqpxC2TSauVMmJ3FJOXSgRPEKbgLcUgFZDlkpzvLkA8htF8rYLWuHTjzEyt3___yixPUk3U4Og03osxdiXpWivNS7-ZPDxKS6k0BRFLMDFgOLlpdQjYZCzfL6fDtY8_f5g5R5eAtbHE8dJzV45GDQ1JXopFN7Ze-0G8U4gVC3JD_4" :
                      i === 2 ? "AB6AXuBdLDn6hy1xjn1JLYd-xj7rYZoNs3uVElfLlxbc6zAlRRr3J9sY37Qfh98mnLIWCyVRdRN1nQTtkmrhii96R9-RYmyr7EEId1nOxR4aIBRMP3JcFmt2PiIh8B_dMMhD9mGz4UBo644ifd5GG_Bvq2i5bWAbUA3qfbNs1eBnzegJ2CAgP90npf8c0aPNuiYuDHPuW50R90IA9R7UPuOCuJFr0A5yCqGmMLH-qjdEtuTeussPAbavaUijMGpxRnzXN5KdxIcupLWnelI" :
                      "AB6AXuCi97p1hgL6U_Ket6biREVgLco1JYXidND9JbLQiifJRMYeBdIZxhwWEb8aQHw9iFHZsVv6q3ueP9-cmZQ7o6BgbJXQoPO1MFp53M2vwyLeYuVWHegR93kfJC9brD4AiOUtm_2d2A1REnYQHDrAtHkGanvQpCGT2oxkbVJ_D46vWdJaN1Jej2Ag8JJxYAv4eOr2nCXv73XGHfngioo9q6dIeKkq0R3R-2t_i-9D6RysoRXlVIobCQr4mdUxd0pS6aZwGgJvJx7apcM"
                    }`}
                    alt={`User ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <p className="text-sm self-center font-medium text-white/90">Trusted by plant lovers worldwide</p>
          </div>
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-24 bg-background">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center gap-3 mb-12">
          <span className="material-symbols-outlined text-primary text-3xl leading-none">eco</span>
          <span className="text-xl font-bold tracking-tight text-foreground">Verdant Aura</span>
        </div>

        <div className="mx-auto w-full max-w-sm">
          <div className="mb-10">
            <h2 className="text-3xl font-black tracking-tight text-foreground">Welcome back</h2>
            <p className="mt-2 text-muted-foreground">Log in to manage your urban jungle</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold leading-6 text-foreground" htmlFor="email">
                Email Address
              </label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="nature@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-lg border-0 py-3 text-foreground shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-slate-800 dark:ring-slate-700 sm:text-sm sm:leading-6 h-12"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold leading-6 text-foreground" htmlFor="password">
                  Password
                </label>
                <div className="text-sm">
                  <Link href="#" className="font-semibold text-primary hover:text-primary/80">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2 relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-lg border-0 py-3 pr-10 text-foreground shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-slate-800 dark:ring-slate-700 sm:text-sm sm:leading-6 h-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-slate-400 hover:text-primary transition-colors"
                >
                    {showPassword 
                      ? <EyeClosed />
                      : <Eye />
                    }
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
              />
              <label className="ml-3 block text-sm text-muted-foreground" htmlFor="remember-me">
                Keep me logged in
              </label>
            </div>

            <div>
              <Button
                type="submit"
                className="flex w-full justify-center rounded-lg bg-primary px-3 py-6 text-sm font-bold leading-6 text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary transition-all"
                onClick={() => router.push("/")}
              >
                Sign in to your account
              </Button>
            </div>
          </form>

          <div className="mt-10">
            <div className="relative">
              <div aria-hidden="true" className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-background px-4 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="flex w-full items-center justify-center gap-3 rounded-lg bg-background dark:bg-slate-800 px-3 py-2 text-sm font-semibold text-foreground shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  ></path>
                </svg>
                <span className="text-sm font-semibold leading-6">Google</span>
              </button>
              <button className="flex w-full items-center justify-center gap-3 rounded-lg bg-background dark:bg-slate-800 px-3 py-2 text-sm font-semibold text-foreground shadow-sm ring-1 ring-inset ring-slate-200 dark:ring-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                <svg className="h-5 w-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="text-sm font-semibold leading-6">Facebook</span>
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            Not a member yet?{" "}
            <Link href="#" className="font-bold leading-6 text-primary hover:text-primary/80">
              Start your free trial
            </Link>
          </p>
        </div>

        <footer className="mt-auto pt-10 text-center lg:text-left">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>© 2024 Verdant Aura Plant Shop. All rights reserved.</p>
            <div className="flex justify-center lg:justify-end gap-6">
              <Link href="#" className="hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-primary">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-primary">
                Help Center
              </Link>
            </div>
          </div>
        </footer>
      </div>

      {/* Floating Decoration (Botanical Accent) */}
      <div className="fixed bottom-30 right-30 p-8 pointer-events-none opacity-20 hidden md:block select-none ">
        <LeafyGreen className="absolute w-[15rem] h-[15rem] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 " />
      </div>
    </div>
  );
}
