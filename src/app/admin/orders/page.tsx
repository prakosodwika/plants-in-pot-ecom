"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { orders, OrderStatus } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { Download, Funnel, SearchX } from "lucide-react";

export default function AdminOrderList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All Orders");

  const tabs = ["All Orders", "Pending", "Processing", "Shipping", "Delivered", "Cancelled"];

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "All Orders" || order.status === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <main className="flex-1 flex flex-col overflow-y-auto">
      <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-10 px-8 flex items-center justify-between shrink-0">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
            <Input
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg focus-visible:ring-2 focus-visible:ring-primary/20 text-sm placeholder:text-slate-400"
              placeholder="Search orders by ID or customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Jan 24, 2024</span>
            <span className="material-symbols-outlined text-slate-400">calendar_today</span>
          </div>
        </div>
      </header>

      <div className="p-8 space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Orders</h2>
            <p className="text-slate-500">Manage and track all plant deliveries.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Funnel />
              Filter
            </Button>
            <Button className="bg-primary text-white flex items-center gap-2">
              <Download />
              Export
            </Button>
          </div>
        </div>

        <div className="flex border-b border-slate-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab
                  ? "border-primary text-primary font-bold"
                  : "border-transparent text-slate-500 hover:text-primary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="p-5 border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 bg-slate-100 rounded-lg overflow-hidden shrink-0 relative border border-slate-100">
                  <Image
                    src={order.items[0].image}
                    alt={order.items[0].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 grid grid-cols-4 gap-4 items-center text-left">
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Order ID</p>
                    <p className="text-sm font-bold text-slate-900">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Customer</p>
                    <p className="text-sm text-slate-600 font-medium">{order.customerName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Status</p>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      order.status === OrderStatus.Delivered ? "bg-green-100 text-green-700" :
                      order.status === OrderStatus.Shipping ? "bg-blue-100 text-blue-700" :
                      order.status === OrderStatus.Pending ? "bg-orange-100 text-orange-700" :
                      order.status === OrderStatus.Processing ? "bg-amber-100 text-amber-700" :
                      "bg-red-100 text-red-700"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        order.status === OrderStatus.Delivered ? "bg-green-600" :
                        order.status === OrderStatus.Shipping ? "bg-blue-600" :
                        order.status === OrderStatus.Pending ? "bg-orange-600" :
                        order.status === OrderStatus.Processing ? "bg-amber-600" :
                        "bg-red-600"
                      }`}></span>
                      {order.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Total</p>
                    <p className="text-sm font-bold text-slate-900">${order.total.toFixed(2)}</p>
                  </div>
                </div>
                <div className="shrink-0">
                  <Link href={`/admin/orders/${order.id}`}>
                    <Button variant="secondary" className="font-bold text-primary">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}

          {filteredOrders.length === 0 && (
            <div className="py-20 text-center">
              {/* <SearchX /> */}
              <p className="text-slate-500">No orders found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
