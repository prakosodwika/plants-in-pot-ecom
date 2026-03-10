"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { orders, OrderStatus, Order } from "@/lib/data";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowLeft, BadgeInfo, MapPinCheckInside, Truck, UserRound } from "lucide-react";

export default function AdminOrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const foundOrder = orders.find((o) => o.id === id);
    if (foundOrder) {
      setOrder(foundOrder);
    }
  }, [id]);

  if (!order) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Order not found</h2>
          <Button onClick={() => router.push("/admin/orders")} className="mt-4">
            Back to Orders
          </Button>
        </div>
      </div>
    );
  }

  const handleStatusChange = (newStatus: OrderStatus) => {
    setOrder({ ...order, status: newStatus });
    toast.success(`Order status updated to ${newStatus}`);
  };

  return (
    <main className="flex-1 flex flex-col overflow-y-auto">
      <div className="p-8 max-w-5xl mx-auto w-full space-y-8 text-left">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Order Details</h1>
            <p className="text-slate-500 text-sm">
              Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
            </p>
          </div>
          
          <div className="flex items-center gap-3">

            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="outline" className="flex items-center gap-2 border-primary/20 bg-primary/5 text-primary font-bold">
                  <Truck />
                  {order.status}
                  {/* <span className="material-symbols-outlined text-sm">expand_more</span> */}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {Object.values(OrderStatus).map((status) => (
                  <DropdownMenuItem
                    key={status}
                    onClick={() => handleStatusChange(status)}
                    className={order.status === status ? "bg-slate-100 font-bold" : ""}
                  >
                    {status}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button className="bg-primary text-white font-bold px-6 shadow-lg shadow-primary/20">
              Save Changes
            </Button>
            <Button className="flex items-center gap-2 border-primary/20 bg-primary/5 text-primary font-bold" 
              onClick={() => router.back()}
              variant="outline"  
            >
              <ArrowLeft className="!w-5 !h-5" strokeWidth={2}/>
              Back
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <BadgeInfo />
              Order Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Order ID</span>
                <span className="text-slate-900 font-medium">{order.id}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Payment Status</span>
                <span className="text-green-600 font-bold">Paid</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Total Amount</span>
                <span className="text-slate-900 font-bold">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <UserRound />
              Customer
            </h3>
            <div className="space-y-1">
              <p className="text-sm font-bold text-slate-900">{order.customerName}</p>
              <p className="text-sm text-slate-500">{order.customerEmail}</p>
              <Button variant="link" className="p-0 h-auto text-primary text-sm font-bold mt-2">
                View Profile
              </Button>
            </div>
          </Card>

          <Card className="p-6 border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <MapPinCheckInside />
              Shipping Address
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {order.shippingAddress}
            </p>
          </Card>
        </div>

        <Card className="border-slate-200 shadow-sm overflow-hidden text-left">
          <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-200">
            <h3 className="font-bold text-slate-900">Order Items</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {order.items.map((item) => (
              <div key={item.id} className="p-6 flex items-center gap-6">
                <div className="h-24 w-24 bg-slate-100 rounded-xl overflow-hidden shrink-0 relative border border-slate-100">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-slate-900">{item.name}</h4>
                  <p className="text-sm text-slate-500">Price: ${item.price.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                  <p className="text-lg font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-slate-50/50 p-6 flex justify-end">
            <div className="w-64 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="text-slate-900 font-medium">${order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Shipping</span>
                <span className="text-slate-900 font-medium">$0.00</span>
              </div>
              <div className="flex justify-between text-lg pt-3 border-t border-slate-200">
                <span className="font-bold text-slate-900">Total</span>
                <span className="font-extrabold text-primary">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex justify-end gap-3 pt-4 pb-12">
          <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
            Cancel Order
          </Button>
          <Button variant="outline">
            Download Invoice
          </Button>
        </div>
      </div>
    </main>
  );
}
