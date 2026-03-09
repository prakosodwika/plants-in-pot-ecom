"use client";

import { useStore } from "@/lib/store";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { SummaryCardCheckoutCourier } from "@/components/shared/summary";
import { StepSection } from "@/components/shared/step";
import { CheckoutStep, couriers } from "@/lib/data";
import { CourierListItem } from "@/components/shared/courier";

export default function CheckoutCourierPage() {
  const { courier, cart, address } = useStore();
  const router = useRouter();
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!isMounted) return null;

  if (cart.length === 0) {
    redirect("/cart");
  }

  if (!address) {
    router.push("/checkout/address");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
        <StepSection name={CheckoutStep.ChooseCourier} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-4">
            {couriers.map((c) => (
              <CourierListItem key={c.id} courier={c} />
            ))}

            <div className="flex items-center justify-between pt-8 border-t border-primary/10">
              <Button 
                variant="ghost"
                onClick={() => router.back()} 
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Back to Address
              </Button>
              <Button 
                disabled={!courier}
                onClick={() => router.push("/checkout/final")}
                className="h-14 px-12 bg-primary text-white font-black uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                Final Review <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <SummaryCardCheckoutCourier address={address} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
