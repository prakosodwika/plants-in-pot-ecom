"use client";

import { useStore } from "@/lib/store";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";
import { ChevronLeft, MapPin, Truck, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { SummaryCardCheckoutFinal } from "@/components/shared/summary";
import { StepSection } from "@/components/shared/step";
import { CheckoutStep } from "@/lib/data";

export default function CheckoutFinalPage() {
  const { cart, address, courier, clearCart } = useStore();
  const router = useRouter();
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingPrice = courier?.price || 0;
  const total = subtotal + shippingPrice;

  if (!isMounted) return null;

  // if (cart.length === 0) {
  //   router.push("/cart");
  //   return null;
  // }

  if (!address || !courier) {
    router.push("/checkout/review");
    return null;
  }

  const handlePlaceOrder = () => {
    toast.success("Order placed successfully! Thank you for shopping with us.");
    clearCart();
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
        <StepSection name={CheckoutStep.FinalReview} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-primary/10 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4 text-primary">
                    <MapPin className="w-5 h-5" />
                    <h3 className="font-black uppercase tracking-tight">Shipping Address</h3>
                  </div>
                  <div className="text-sm font-medium text-primary space-y-1">
                    <p className="text-primary font-black uppercase tracking-tighter text-base">{address.fullName}</p>
                    <p>{address.street}</p>
                    <p>{address.city}, {address.state} {address.zipCode}</p>
                    <p>{address.phone}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/10 bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4 text-primary">
                    <Truck className="w-5 h-5" />
                    <h3 className="font-black uppercase tracking-tight">Delivery Method</h3>
                  </div>
                  <div className="text-sm font-medium text-primary space-y-1">
                    <p className="text-primary font-black uppercase tracking-tighter text-base">{courier.name}</p>
                    <p>{courier.deliveryTime}</p>
                    <p className="text-primary font-bold mt-2">${courier.price.toFixed(2)}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Items */}
            <Card className="border-primary/10 bg-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6 text-primary">
                  <ShoppingBag className="w-5 h-5" />
                  <h3 className="font-black uppercase tracking-tight">Items in Order</h3>
                </div>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 py-3 border-b border-primary/5 last:border-0">
                      <div className="relative h-16 w-16 rounded-lg overflow-hidden shrink-0 border border-primary/10">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold text-sm uppercase tracking-tight">{item.name}</h4>
                        <p className="text-xs text-muted-foreground uppercase font-medium">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between pt-4">
              <Button 
                variant="ghost"
                onClick={() => router.back()} 
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Back to Courier
              </Button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <SummaryCardCheckoutFinal
              subtotal={subtotal}
              shippingPrice={shippingPrice}
              total={total}
              handlePlaceOrder={handlePlaceOrder}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
