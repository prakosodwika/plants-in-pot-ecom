"use client";

import { useStore } from "@/lib/store";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useSyncExternalStore } from "react";
import { ChevronLeft } from "lucide-react";
import { ProductCardListItem } from "@/components/shared/product";
import { SummaryCardCheckoutReview } from "@/components/shared/summary";
import { StepSection } from "@/components/shared/step";
import { CheckoutStep } from "@/lib/data";

export default function CheckoutReviewPage() {
  const { cart } = useStore();
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!isMounted) return null;

  if (cart.length === 0) {
    redirect("/cart");
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
        <StepSection name={CheckoutStep.ReviewItems} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <ProductCardListItem key={item.id} 
                product={item} 
                quantity={item.quantity} 
                canDelete={true} 
                canUpdateQuantity={false} 
              />
            ))}
            <Link href="/cart" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors">
              <ChevronLeft className="w-4 h-4" /> Back to Cart
            </Link>
          </div>

          <div className="lg:col-span-1">
            <SummaryCardCheckoutReview 
              totalItems={cart.length} 
              subtotal={subtotal} 
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
