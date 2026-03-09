"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, MapPin, Shield, Sprout, ReceiptText, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";

const menuItems = [
  { href: "/profile", label: "Personal Info", icon: User },
  { href: "/profile/addresses", label: "Addresses", icon: MapPin },
  { href: "/profile/security", label: "Security", icon: Shield },
  { href: "/profile/collection", label: "My Collection", icon: Sprout },
  { href: "/profile/orders", label: "Orders", icon: ReceiptText },
];

export function ProfileSidebar() {
  const pathname = usePathname();
  const { user } = useStore();

  return (
    <aside className="w-full md:w-64 flex flex-col gap-2">
      <div className="mb-6 px-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Settings</h3>
        <p className="text-sm text-slate-500">Manage your botanical journey</p>
      </div>
      
      <nav className="flex flex-col gap-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
              pathname === item.href
                ? "bg-primary text-white font-semibold shadow-lg shadow-primary/20"
                : "text-slate-600 dark:text-slate-400 hover:bg-primary/5 hover:text-primary"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <hr className="my-4 border-primary/10" />
      
      <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors w-full text-left font-medium">
        <LogOut className="w-5 h-5" />
        <span>Sign Out</span>
      </button>
    </aside>
  );
}
