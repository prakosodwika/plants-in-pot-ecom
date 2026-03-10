"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { Banknote, Bell, Calendar, Download, MapPin, Search, Star, UserRound } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { title: "Total Revenue", value: "$24,560.00", icon: Banknote, change: "+12.4%", color: "text-primary" },
    { title: "Active Orders", value: "1,284", icon: MapPin, change: "+5.2%", color: "text-blue-600" },
    { title: "New Customers", value: "142", icon: UserRound, change: "+2.1%", color: "text-orange-600" },
    { title: "Conversion Rate", value: "4.8%", icon: Star, change: "Neutral", color: "text-purple-600" },
  ];

  const topPlants = [
    { name: "Fiddle Leaf Fig", sold: 124, price: "$45.00", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvThJENSVIRjgc9Cq5tn0vY5eW_k-vX51upwPpN2Z2PeKiPZgKdrin8ug_8m9RKuGhTqwXfzFCS9S-HAX-a5BbX5vV0leqIo5cefA0pnaKFpoDLOutNKWJRnUn_Kyd5PVr4D1WzkU-eGy7r5jJDru15nldq1u5DbZf15t9L8vOa3nuv0ntfQr7sm1bOTS4leIXovwvL3v98Chm2Ovr85u_MbL30hQNrg-7m5qotQAh1EPePIT4UgG9HrvEsWReswOMlSINaEhLkr4" },
    { name: "Snake Plant", sold: 98, price: "$28.00", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCi2A0uxVGdmEayjg5q3OK9BQih9HopqhNOrcOzV9DyLdZXC8qLiZnqY1gVgy-aX3yLn7fvUyn8JTwpVi4APMBtIq33AaLD4pzKArzHmiPJCSakChoCKcU6E_1H5Yn7vLZhgvMuw9iT8gLlsIagyqjjPfS75K2QtrXYPtgW4WL6Xq9vdWLdKogVZeLPfiej4PTyGMoppmFaFI1Tt2Y4DEvhMKgCKlU9khPZQ7wKYdUp5GfKNfyaLobeoKIVPsBL1LpCgHS6lDiQNdI" },
  ];

  const recentOrders = [
    { id: "ORD-7294", customer: "Sarah Jenkins", product: "Fiddle Leaf Fig", status: "Delivered", total: "$150.00" },
    { id: "ORD-7295", customer: "Mark Thompson", product: "Snake Plant x2", status: "Shipping", total: "$110.00" },
    { id: "ORD-7296", customer: "Elena Rodriguez", product: "Bird of Paradise", status: "Pending", total: "$85.00" },
  ];

  return (
    <main className="flex-1 flex flex-col overflow-y-auto">
      <div className="p-8 space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Overview Dashboard</h2>
            <p className="text-slate-500">Welcome back! Heres whats happening today.</p>
          </div>
          <Button className="bg-primary text-white flex items-center gap-2">
            <Download className="w-4 h-4" /> Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 bg-slate-50 rounded-lg`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">{stat.change}</span>
                </div>
                <p className="text-slate-500 text-sm font-medium">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1 text-slate-900">{stat.value}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Top Selling Plants</h3>
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
                      <h4 className="text-sm font-bold text-slate-900">{plant.name}</h4>
                      <p className="text-xs text-slate-500">{plant.sold} sold this month</p>
                    </div>
                    <span className="text-sm font-bold text-slate-900">{plant.price}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Recent Orders</h3>
              <Link href="/admin/orders" className="text-sm text-primary font-medium hover:underline">Manage All</Link>
            </div>
            <Card className="border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-slate-900">Order ID</th>
                    <th className="px-6 py-4 font-semibold text-slate-900">Customer</th>
                    <th className="px-6 py-4 font-semibold text-slate-900">Status</th>
                    <th className="px-6 py-4 font-semibold text-right text-slate-900">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-500">{order.id}</td>
                      <td className="px-6 py-4 font-semibold text-slate-900">{order.customer}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Shipping' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-right text-slate-900">{order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
