"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";

export default function AdminDashboard() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "admin") {
      router.push("/login");
    }
  }, [router]);

  if (!isMounted) return null;

  const stats = [
    { title: "Total Revenue", value: "$24,560.00", icon: "payments", change: "+12.4%", color: "text-primary" },
    { title: "Active Orders", value: "1,284", icon: "local_shipping", change: "+5.2%", color: "text-blue-600" },
    { title: "New Customers", value: "142", icon: "person_add", change: "+2.1%", color: "text-orange-600" },
    { title: "Conversion Rate", value: "4.8%", icon: "star", change: "Neutral", color: "text-purple-600" },
  ];

  const topPlants = [
    { name: "Fiddle Leaf Fig", sold: 124, price: "$45.00", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvThJENSVIRjgc9Cq5tn0vY5eW_k-vX51upwPpN2Z2PeKiPZgKdrin8ug_8m9RKuGhTqwXfzFCS9S-HAX-a5BbX5vV0leqIo5cefA0pnaKFpoDLOutNKWJRnUn_Kyd5PVr4D1WzkU-eGy7r5jJDru15nldq1u5DbZf15t9L8vOa3nuv0ntfQr7sm1bOTS4leIXovwvL3v98Chm2Ovr85u_MbL30hQNrg-7m5qotQAh1EPePIT4UgG9HrvEsWReswOMlSINaEhLkr4" },
    { name: "Snake Plant", sold: 98, price: "$28.00", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCi2A0uxVGdmEayjg5q3OK9BQih9HopqhNOrcOzV9DyLdZXC8qLiZnqY1gVgy-aX3yLn7fvUyn8JTwpVi4APMBtIq33AaLD4pzKArzHmiPJCSakChoCKcU6E_1H5Yn7vLZhgvMuw9iT8gLlsIagyqjjPfS75K2QtrXYPtgW4WL6Xq9vdWLdKogVZeLPfiej4PTyGMoppmFaFI1Tt2Y4DEvhMKgCKlU9khPZQ7wKYdUp5GfKNfyaLobeoKIVPsBL1LpCgHS6lDiQNdI" },
  ];

  const recentOrders = [
    { id: "#ORD-7294", customer: "Sarah Jenkins", product: "Fiddle Leaf Fig", status: "Delivered", total: "$48.50" },
    { id: "#ORD-7295", customer: "Mark Thompson", product: "Snake Plant x2", status: "Shipping", total: "$62.00" },
    { id: "#ORD-7296", customer: "Elena Rodriguez", product: "Monstera Leaf", status: "Pending", total: "$55.20" },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 bg-white flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-primary/10 rounded-lg p-2">
            <span className="material-symbols-outlined text-primary">potted_plant</span>
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight text-primary">Verdant Aura</h1>
            <p className="text-xs text-slate-500">Admin Console</p>
          </div>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary text-white">
            <span className="material-symbols-outlined text-[20px]">dashboard</span>
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-primary hover:bg-slate-100 transition-colors">
            <span className="material-symbols-outlined text-[20px]">inventory_2</span>
            <span className="text-sm font-medium">Inventory</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-primary hover:bg-slate-100 transition-colors">
            <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
            <span className="text-sm font-medium">Orders</span>
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-primary hover:bg-slate-100 transition-colors">
            <span className="material-symbols-outlined text-[20px]">group</span>
            <span className="text-sm font-medium">Customers</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 p-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-sm">person</span>
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-semibold truncate">Alex Gardener</p>
              <p className="text-xs text-slate-500 truncate">Manager</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => {
                localStorage.removeItem("userRole");
                router.push("/");
            }}>
                <span className="material-symbols-outlined text-slate-400 text-lg">logout</span>
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Nav */}
        <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-10 px-8 flex items-center justify-between">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <Input className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg focus-visible:ring-2 focus-visible:ring-primary/20 text-sm placeholder:text-slate-400" placeholder="Search orders, plants, or customers..." />
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Jan 24, 2024</span>
                <span className="material-symbols-outlined text-slate-400">calendar_today</span>
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </Button>
          </div>
        </header>

        <div className="p-8 space-y-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Overview Dashboard</h2>
              <p className="text-slate-500">Welcome back! Here's what's happening today.</p>
            </div>
            <Button className="bg-primary text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">download</span> Export Report
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <Card key={stat.title} className="border-slate-200 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 bg-slate-50 rounded-lg`}>
                      <span className={`material-symbols-outlined ${stat.color}`}>{stat.icon}</span>
                    </div>
                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">{stat.change}</span>
                  </div>
                  <p className="text-slate-500 text-sm font-medium">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Top Selling Plants</h3>
                <Link href="#" className="text-sm text-primary font-medium hover:underline">View All</Link>
              </div>
              <Card className="border-slate-200 overflow-hidden shadow-sm">
                <div className="divide-y divide-slate-100">
                  {topPlants.map((plant) => (
                    <div key={plant.name} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <Image src={plant.image} alt={plant.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold">{plant.name}</h4>
                        <p className="text-xs text-slate-500">{plant.sold} sold this month</p>
                      </div>
                      <span className="text-sm font-bold">{plant.price}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Recent Orders</h3>
                <Link href="#" className="text-sm text-primary font-medium hover:underline">Manage All</Link>
              </div>
              <Card className="border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Order ID</th>
                      <th className="px-6 py-4 font-semibold">Customer</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 font-semibold text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-500">{order.id}</td>
                        <td className="px-6 py-4 font-semibold">{order.customer}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'Shipping' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-right">{order.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
