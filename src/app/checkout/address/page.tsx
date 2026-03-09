"use client";

import { useStore } from "@/lib/store";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect, useRouter } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { ArrowRight, ChevronLeft } from "lucide-react";
import { SummaryCardCheckoutAddress } from "@/components/shared/summary";
import { StepSection } from "@/components/shared/step";
import { CheckoutStep } from "@/lib/data";

export default function CheckoutAddressPage() {
  const { address, setAddress, cart } = useStore();
  const router = useRouter();
  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const [formData, setFormData] = useState(
    address || {
      fullName: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      phone: "",
    }
  );

  if (!isMounted) return null;

  if (cart.length === 0) {
    redirect("/cart");
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAddress(formData);
    router.push("/checkout/courier");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
        <StepSection name={CheckoutStep.ShippingAddress} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <form id="address-form" onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-xs font-black uppercase tracking-widest text-primary">Full Name</Label>
                  <Input
                    id="fullName"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="h-12 border-primary/20 border-2 bg-primary/5 focus-visible:ring-primary rounded-xl font-medium"
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs font-black uppercase tracking-widest text-primary">Phone Number</Label>
                  <Input
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="h-12 border-primary/20 border-2 bg-primary/5 focus-visible:ring-primary rounded-xl font-medium"
                    placeholder="+62 812..."
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="street" className="text-xs font-black uppercase tracking-widest text-primary">Street Address</Label>
                  <Input
                    id="street"
                    required
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="h-12 border-primary/20 border-2 bg-primary/5 focus-visible:ring-primary rounded-xl font-medium"
                    placeholder="House number and street name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-xs font-black uppercase tracking-widest text-primary">City</Label>
                  <Input
                    id="city"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="h-12 border-primary/20 border-2 bg-primary/5 focus-visible:ring-primary rounded-xl font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-xs font-black uppercase tracking-widest text-primary">State / Province</Label>
                  <Input
                    id="state"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="h-12 border-primary/20 border-2 bg-primary/5 focus-visible:ring-primary rounded-xl font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode" className="text-xs font-black uppercase tracking-widest text-primary">ZIP / Postal Code</Label>
                  <Input
                    id="zipCode"
                    required
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="h-12 border-primary/20 border-2 bg-primary/5 focus-visible:ring-primary rounded-xl font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-primary/10">
                <Button 
                  type="button"
                  variant="ghost"
                  onClick={() => router.back()} 
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Back to Review
                </Button>
                <Button 
                  type="submit"
                  className="h-14 px-12 bg-primary text-white font-black uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                  Choose Courier <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-1">
            <SummaryCardCheckoutAddress />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
