"use client";

import { useStore } from "@/lib/store";
import { HeaderSection } from "@/components/shared/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";
import { ChevronLeft, ShoppingBag } from "lucide-react";
import { ProductCardListItem } from "@/components/shared/product";
import { SummaryCardCart } from "@/components/shared/summary";

export default function CartPage() {
  const { cart } = useStore();
  const router = useRouter();
  const isMounted = useSyncExternalStore(
    () => () => { },
    () => true,
    () => false
  );

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 15.0;
  const total = subtotal + shipping;
  const description = cart.length > 0
    ? `You have ${cart.length} item${cart.length > 1 ? "s" : ""} in your bag.`
    : "You have no items in your bag."

  const handleCheckout = () => {
    router.push("/checkout/review");
  };

  if (!isMounted) return null;

  return (
    <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
      <HeaderSection
        title="Your Shopping Bag"
        description={description}
      />
      {cart.length === 0 ? (
        <div className="text-center py-20 flex flex-col items-center gap-6 border-2 border-dashed border-primary/10 rounded-2xl">
          <ShoppingBag className="!w-10 !h-10 text-primary" />
          <div className="space-y-2">
            <p className="text-xl font-bold text-primary">Your bag is empty</p>
            <p className="text-slate-400">Discover something new for your home sanctuary.</p>
          </div>
          <Link href="/shop">
            <Button className="bg-primary hover:opacity-90 py-6 px-8 font-bold">Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <ProductCardListItem key={item.id}
                product={item}
                quantity={item.quantity}
                canDelete={true}
                canUpdateQuantity={true}
              />
            ))}
            <Link className="text-primary font-bold flex items-center gap-1 hover:underline underline-offset-4" href="/shop">
              <ChevronLeft /> Continue Shopping
            </Link>
          </div>
          <div className="lg:col-span-1">
            <SummaryCardCart
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              handleCheckout={handleCheckout}
            />
          </div>
        </div>
      )}
    </main>
  );
}
