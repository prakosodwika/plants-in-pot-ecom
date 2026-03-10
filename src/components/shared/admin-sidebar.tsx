"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, LeafyGreen, LogOut, Package, PersonStanding, Trees, Users } from "lucide-react";

const menuItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "#", label: "Inventory", icon: Trees},
  { href: "/admin/orders", label: "Orders", icon: Package },
  { href: "#", label: "Customers", icon: Users },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    router.push("/");
  };

  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col shrink-0 h-screen sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-primary/10 rounded-lg p-2">
          <LeafyGreen className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-lg font-bold leading-tight text-primary">Verdant Aura</h1>
          <p className="text-xs text-slate-500">Admin Console</p>
        </div>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-3 p-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            {/* <span className="material-symbols-outlined text-primary text-sm">person</span> */}
            <PersonStanding />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-semibold truncate">Alex Gardener</p>
            <p className="text-xs text-slate-500 truncate">Manager</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleLogout}
          >
            <LogOut />
          </Button>
        </div>
      </div>
    </aside>
  );
}
