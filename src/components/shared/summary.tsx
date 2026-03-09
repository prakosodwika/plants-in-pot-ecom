import { ArrowRight, CreditCard } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { Address } from "@/lib/store";

interface SummaryCardCartProps {
  subtotal: number;
  shipping: number;
  total: number;
  handleCheckout: () => void;
}

export function SummaryCardCart({
  subtotal,
  shipping,
  total,
  handleCheckout,
}: SummaryCardCartProps) {
  return (
    <Card className="ring-0 sticky top-24 bg-primary-foreground shadow-sm p-4">
      <CardContent className="space-y-6 p-4">
        <h3 className="text-xl font-bold">Order Summary</h3>
        <div className="space-y-4 text-lg">
          <div className="flex justify-between text-primary">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-primary">
            <span>Doscount</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="pt-4 border-t text-xl text-primary border-primary/10 flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <Button onClick={handleCheckout} className="w-full h-14 bg-primary text-white text-base font-bold hover:opacity-90 transition-all active:scale-95">
          Proceed to Checkout <ArrowRight />
        </Button>
        <p className="text-xs text-center text-slate-400">
          Free shipping on orders over $150. Easy 30-day returns.
        </p>
        <div className="pt-4 border-t border-primary/10 space-y-2">
          <Label className="text-xs font-black uppercase tracking-widest text-primary">Promo code</Label>
          <div className="flex gap-2">
            <Input
              className="flex-1 h-12 border-primary/20 border-2 bg-primary/5 focus-visible:ring-primary rounded-xl font-medium"
              placeholder="Entry promo code"
              type="email"
            />
            <Button className="bg-primary/10 text-primary rounded-lg h-12 px-4 hover:opacity-90 transition-opacity font-bold">
              Apply
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface SummaryCardCheckoutReviewProps {
  totalItems: number
  subtotal: number
}

export function SummaryCardCheckoutReview({
  totalItems,
  subtotal
}: SummaryCardCheckoutReviewProps) {
  const router = useRouter()

  return (
    <Card className="ring-0 bg-primary/5 sticky top-24">
      <CardContent className="p-6 space-y-6">
        <h3 className="text-xl font-black uppercase tracking-tight">Order Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-medium uppercase tracking-wide">
            <span className="text-muted-foreground">Items ({totalItems})</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm font-medium uppercase tracking-wide">
            <span className="text-muted-foreground">Shipping</span>
            <span className="text-green-600">Calculated later</span>
          </div>
          <div className="pt-4 border-t border-primary/10 flex justify-between">
            <span className="font-black uppercase tracking-tighter text-xl">Subtotal</span>
            <span className="font-black text-xl">${subtotal.toFixed(2)}</span>
          </div>
        </div>
        <Button
          onClick={() => router.push("/checkout/address")}
          className="w-full h-14 bg-primary text-white font-black uppercase tracking-widest hover:opacity-90 transition-all active:scale-95"
        >
          Continue to Shipping <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </CardContent>
    </Card>
  )
}

interface SummaryCartCheckoutFinalProps {
  subtotal: number
  shippingPrice: number
  total: number
  handlePlaceOrder: () => void
}

export function SummaryCardCheckoutFinal({
  subtotal,
  shippingPrice,
  total,
  handlePlaceOrder
}: SummaryCartCheckoutFinalProps) {
  return (
    <Card className="ring-0 bg-primary/5 sticky top-24">
      <CardContent className="p-6 space-y-6">
        <h3 className="text-xl font-black uppercase tracking-tight">Order Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-medium uppercase tracking-wide">
            <span className="text-muted-foreground">Items Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm font-medium uppercase tracking-wide">
            <span className="text-muted-foreground">Shipping Fee</span>
            <span>${shippingPrice.toFixed(2)}</span>
          </div>
          <div className="pt-4 border-t border-primary/10 flex justify-between">
            <span className="font-black uppercase tracking-tighter text-xl">Total Amount</span>
            <span className="font-black text-xl text-primary">${total.toFixed(2)}</span>
          </div>
        </div>
        <div className="p-4 bg-white rounded-xl border border-primary/10 flex items-center gap-3">
          <CreditCard className="w-6 h-6 text-primary" />
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Payment Method</p>
            <p className="text-sm font-bold uppercase tracking-tight">Bank Transfer / Manual</p>
          </div>
        </div>
        <Button
          onClick={handlePlaceOrder}
          className="w-full h-14 bg-primary text-white font-black uppercase tracking-widest hover:opacity-90 transition-all active:scale-95"
        >
          Place Order Now <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
        <p className="text-[10px] text-center text-muted-foreground uppercase font-bold tracking-widest">
          By placing an order, you agree to our terms & conditions.
        </p>
      </CardContent>
    </Card>
  )
}

export function SummaryCardCheckoutCourier(
  { address }: { address: Address }
) {
  return (
    <Card className="ring-0 bg-primary/5 sticky top-24">
      <CardContent className="p-6">
        <h3 className="text-lg font-black uppercase tracking-tight mb-4">Shipping to:</h3>
        <div className="text-sm font-medium text-primary space-y-1">
          <p className="text-primary font-black uppercase tracking-tighter text-base">{address.fullName}</p>
          <p>{address.street}</p>
          <p>{address.city}, {address.state} {address.zipCode}</p>
          <p>{address.phone}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export function SummaryCardCheckoutAddress() {
  return (
    <Card className="ring-0 bg-primary/5 sticky top-24">
      <CardContent className="p-6">
        <h3 className="text-xl font-black uppercase tracking-tight mb-4">Why choose Verdant?</h3>
        <ul className="space-y-3 text-sm font-medium text-primary">
          <li className="flex items-start gap-3">
            <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-[10px]">1</div>
            Safe & secure plant packaging.
          </li>
          <li className="flex items-start gap-3">
            <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-[10px]">2</div>
            Health guarantee for 30 days.
          </li>
          <li className="flex items-start gap-3">
            <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-[10px]">3</div>
            Real-time tracking for every order.
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}