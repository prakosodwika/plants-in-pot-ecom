"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
// import { useStore } from "@/lib/store";
import { MenuProfile, menuProfileItems } from "@/lib/data";
import { Description, Title } from "./headers";

export function ProfileSidebar() {
  const pathname = usePathname();
  // const { user } = useStore();

  return (
    <aside className="w-full md:w-64 flex flex-col gap-2">
      <div className="mb-4 space-y-1">
        <Title title="Settings" />
        <Description description="Manage your botanical journey" />
      </div>
      
      <nav className="flex flex-col gap-1">
        {menuProfileItems.map((item: MenuProfile) => (
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

      <hr className="my-2 border-primary/10" />
      
      <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors w-full text-left font-medium">
        <LogOut className="w-5 h-5" />
        <span>Sign Out</span>
      </button>
    </aside>
  );
}
