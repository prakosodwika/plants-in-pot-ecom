"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { products, Product } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  Heart, 
  ShoppingBag, 
  Star, 
  Truck, 
  ShieldCheck, 
  RotateCcw,
  Plus,
  Minus,
  Leaf,
  Droplets,
  Sun,
  Thermometer
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const addToCart = useStore((state) => state.addToCart);
  const addToWishlist = useStore((state) => state.addToWishlist);
  const wishlist = useStore((state) => state.wishlist);
  const isWishlisted = wishlist.some((item) => item.id === product?.id);

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-slate-900">Plant not found</h2>
        <Button onClick={() => router.push("/shop")} variant="outline" className="rounded-full px-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Add multiple quantities
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${quantity} ${product.name} added to cart`);
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 w-full">
      <Link 
        href="/shop" 
        className="inline-flex items-center text-sm font-semibold text-primary hover:underline mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Collection
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Side: Image Gallery */}
        <div className="space-y-6">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-slate-100 border border-primary/5 shadow-xl">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
            {product.isNew && (
              <Badge className="absolute top-6 left-6 bg-primary text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border-none">
                New Arrival
              </Badge>
            )}
            {product.isBestSeller && (
              <Badge className="absolute top-6 left-6 bg-amber-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border-none">
                Best Seller
              </Badge>
            )}
          </div>
          
          <div className="grid grid-cols-4 gap-4">
             {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-xl bg-slate-50 border border-primary/5 relative overflow-hidden cursor-pointer hover:border-primary transition-colors">
                  <Image src={product.image} alt={product.name} fill className="object-cover opacity-60" />
                </div>
             ))}
          </div>
        </div>

        {/* Right Side: Product Info */}
        <div className="flex flex-col h-full">
          <div className="mb-2">
            <span className="text-primary font-bold text-sm uppercase tracking-[0.2em]">{product.category}</span>
          </div>
          
          <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center text-amber-500">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="text-slate-400 font-bold text-sm">(48 Reviews)</span>
          </div>

          <p className="text-4xl font-black text-primary mb-8">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-slate-600 text-lg leading-relaxed mb-10">
            {product.description}
          </p>

          {/* Plant Care Highlights */}
          <div className="grid grid-cols-2 gap-4 mb-10">
            <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/5">
              <Sun className="w-5 h-5 text-primary" />
              <div className="text-xs">
                <p className="font-bold text-primary">Bright Indirect Light</p>
                <p className="text-slate-500">Perfect for windows</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/5">
              <Droplets className="w-5 h-5 text-primary" />
              <div className="text-xs">
                <p className="font-bold text-primary">Weekly Watering</p>
                <p className="text-slate-500">Keep soil moist</p>
              </div>
            </div>
          </div>

          <Separator className="mb-10" />

          {/* Action Area */}
          <div className="space-y-6 mt-auto">
            <div className="flex items-center gap-6">
              <div className="flex items-center bg-slate-100 rounded-full p-1 h-15 gap-5 border border-primary/5">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full hover:bg-white transition-colors"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full hover:bg-white transition-colors"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <Button 
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-white rounded-full py-7 font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all flex items-center gap-3"
              >
                <ShoppingBag className="w-6 h-6" />
                Add to Cart
              </Button>
              
              <Button 
                variant="outline" 
                size="icon" 
                className={cn(
                  "rounded-full p-7 border-primary/10 transition-all",
                  isWishlisted ? "bg-primary text-white border-primary" : "hover:text-primary hover:border-primary"
                )}
                onClick={() => {
                   addToWishlist(product);
                   toast.success(`${product.name} added to wishlist`);
                }}
              >
                <Heart className={cn("w-6 h-6", isWishlisted && "fill-current")} />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-3 bg-slate-50 rounded-xl text-slate-500">
                  <Truck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-3 bg-slate-50 rounded-xl text-slate-500">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">30 Day Health</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-3 bg-slate-50 rounded-xl text-slate-500">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Care Details Section */}
      <div className="mt-24 bg-primary/5 rounded-[3rem] p-12 lg:p-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-primary mb-4">Plant Care Guide</h2>
            <p className="text-slate-500 font-medium">Keep your {product.name} thriving with these essential care tips.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex gap-6">
               <div className="p-4 bg-white rounded-2xl h-fit shadow-sm border border-primary/5">
                 <Sun className="w-8 h-8 text-primary" />
               </div>
               <div className="space-y-2">
                 <h4 className="font-bold text-xl text-primary">Light Requirement</h4>
                 <p className="text-slate-600 leading-relaxed">Bright, indirect sunlight is ideal. Avoid placing in direct, harsh sun which can scorch the delicate leaves.</p>
               </div>
            </div>
            <div className="flex gap-6">
               <div className="p-4 bg-white rounded-2xl h-fit shadow-sm border border-primary/5">
                 <Droplets className="w-8 h-8 text-primary" />
               </div>
               <div className="space-y-2">
                 <h4 className="font-bold text-xl text-primary">Watering Schedule</h4>
                 <p className="text-slate-600 leading-relaxed">Water once a week or when the top inch of soil feels dry. Ensure the pot has good drainage to prevent root rot.</p>
               </div>
            </div>
            <div className="flex gap-6">
               <div className="p-4 bg-white rounded-2xl h-fit shadow-sm border border-primary/5">
                 <Thermometer className="w-8 h-8 text-primary" />
               </div>
               <div className="space-y-2">
                 <h4 className="font-bold text-xl text-primary">Ideal Temperature</h4>
                 <p className="text-slate-600 leading-relaxed">Keep in a consistent environment between 65°F and 75°F (18°C - 24°C). Protect from drafts and vents.</p>
               </div>
            </div>
            <div className="flex gap-6">
               <div className="p-4 bg-white rounded-2xl h-fit shadow-sm border border-primary/5">
                 <Leaf className="w-8 h-8 text-primary" />
               </div>
               <div className="space-y-2">
                 <h4 className="font-bold text-xl text-primary">Nutrition & Soil</h4>
                 <p className="text-slate-600 leading-relaxed">Use a well-draining potting mix. Feed with a balanced liquid fertilizer once a month during spring and summer.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
