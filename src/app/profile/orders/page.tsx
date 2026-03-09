"use client";

import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { ChevronRight, Package, Truck, CheckCircle2, XCircle } from "lucide-react";

const statusIcons = {
  Processing: Package,
  Shipped: Truck,
  Delivered: CheckCircle2,
  Cancelled: XCircle,
};

const statusColors = {
  Processing: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  Shipped: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  Delivered: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  Cancelled: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
};

export default function OrdersPage() {
  const { orders } = useStore();

  return (
    <div className="bg-white dark:bg-slate-900 border border-primary/10 rounded-2xl p-8 shadow-sm">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-slate-900 dark:text-slate-50 tracking-tight">My Orders</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2">Track and manage your plant purchases and delivery history.</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-primary/5 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Order ID</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Date</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Price</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {orders.length > 0 ? (
                orders.map((order) => {
                  const StatusIcon = statusIcons[order.status];
                  return (
                    <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-primary/5 transition-colors">
                      <td className="px-6 py-5">
                        <span className="text-sm font-bold text-slate-900 dark:text-slate-100">#{order.id}</span>
                      </td>
                      <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-400">{order.date}</td>
                      <td className="px-6 py-5">
                        <span className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold",
                          statusColors[order.status]
                        )}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm font-black text-slate-900 dark:text-slate-100">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button className="text-sm font-bold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1">
                          View Details <ChevronRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
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
