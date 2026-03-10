"use client";

import { Description, Title } from "@/components/profile/headers";
import { Order, useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Package, Truck, CheckCircle2, XCircle, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";
import { OrderDetailDialog } from "@/components/shared/dialogs";
import Image from "next/image";
import { orders as allOrders } from "@/lib/data";

const statusIcons = {
  Pending: Package,
  Processing: Package,
  Shipping: Truck,
  Delivered: CheckCircle2,
  Cancelled: XCircle,
};

const statusColors = {
  Pending: "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300",
  Processing: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  Shipping: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  Delivered: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  Cancelled: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
};

export default function OrdersPage() {
  const { user } = useStore();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const userOrders = useMemo(() => {
    // We use data from lib/data but can also include any new orders from the store
    // For now, let's prioritize showing the rich mock data for the demo user
    return allOrders.filter(o => o.customerEmail === "user@example.com" || o.customerEmail === user.email);
  }, [user.email]);

  const selectedOrder = useMemo(() => 
    userOrders.find((o) => o.id === selectedOrderId) ?? null
  , [selectedOrderId, userOrders]);

  return (
    <div className="bg-white dark:bg-slate-900 border border-primary/10 rounded-2xl p-8 shadow-sm">
      <div className="mb-8 space-y-1">
        <Title title="My Orders" />
        <Description description="Track and manage your plant purchases and delivery history." />
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-primary/5 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Order ID</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Date</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Items</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Price</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {userOrders.length > 0 ? (
                userOrders.map((order) => {
                  const StatusIcon = statusIcons[order.status] || Package;
                  return (
                    <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-primary/5 transition-colors">
                      <td className="px-6 py-5">
                        <span className="text-sm font-bold text-primary dark:text-slate-100">#{order.id}</span>
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-400">
                        {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex -space-x-2 overflow-hidden">
                          {order.items.slice(0, 3).map((item) => (
                            <div key={item.id} className="relative h-8 w-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 overflow-hidden">
                              <Image 
                                src={item.image} 
                                alt={item.name} 
                                fill 
                                className="object-cover"
                              />
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 text-[10px] font-bold text-slate-500">
                              +{order.items.length - 3}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold",
                          statusColors[order.status]
                        )}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm font-black text-primary dark:text-slate-100">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <OrderDetailDialog
                          setSelectedOrderId={setSelectedOrderId}
                          selectedOrder={selectedOrder as Order | null}
                          order={order as any}
                          statusColors={statusColors[order.status]}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
