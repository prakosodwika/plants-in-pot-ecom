"use client";

import Image from "next/image";
import { Product } from "@/lib/data";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Heart, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useStore((state) => state.addToCart);
  const addToWishlist = useStore((state) => state.addToWishlist);
  const wishlist = useStore((state) => state.wishlist);
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-[3/4] rounded-xl bg-background-light overflow-hidden mb-4">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToWishlist(product);
              toast.success(`${product.name} added to wishlist`);
            }}
            className={`rounded-full shadow-lg transition-all ${isWishlisted ? "bg-primary text-white" : "bg-white/90 text-primary hover:bg-white"
              }`}
            size="icon"
          >
            <Heart />
          </Button>
        </div>
        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product);
            toast.success(`${product.name} added to cart`);
          }}
          className="absolute bottom-4 right-4 bg-white/90 backdrop-blur p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white text-primary"
        >
          <ShoppingBag />
          Add to Cart
        </Button>
      </div>
      <h3 className="font-bold text-lg">{product.name}</h3>
      <p className="text-slate-500">${product.price.toFixed(2)}</p>
    </div>
  );
}

interface ProductCardListItemProps {
  product: Product
  quantity: number
  canDelete: boolean
  canUpdateQuantity: boolean
}

export function ProductCardListItem({ product, quantity, canDelete, canUpdateQuantity }: ProductCardListItemProps) {
  const { removeFromCart, updateQuantity } = useStore();

  return (
    <Card className="ring-2 ring-primary/5 bg-primary-foreground overflow-hidden shadow-sm">
      <CardContent >
        <div className="flex gap-6">
          <div className="relative h-35 w-35 rounded-lg overflow-hidden shrink-0">
            <Image src={product.image} alt={product.name} fill className="object-cover" />
          </div>
          <div className="flex-grow flex flex-col justify-between py-2">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-xl">{product.name}</h3>
                <p className="text-base text-slate-500">{product.category}</p>
              </div>
              {canDelete && 
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    removeFromCart(product.id);
                    toast.info(`${product.name} removed from bag`);
                  }}
                  className="text-muted-foreground p-5 hover:text-primary transition-colors"
                >
                  <Trash2 className="!w-5 !h-5" />
                </Button>
              }
            </div>
            <div className="flex justify-between items-baseline">
              <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
              {canUpdateQuantity &&
                <div className="flex items-center gap-2 bg-primary/5 rounded-full">
                  <Button
                    onClick={() => quantity > 1 && updateQuantity(product.id, quantity - 1)}
                    className="py-5 px-7 hover:bg-primary/5 transition-colors rounded-l-full"
                    size="icon"
                    variant="ghost"
                  >
                    <Minus className="!w-5 !h-5"/>
                  </Button>
                  <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                  <Button
                    onClick={() => updateQuantity(product.id, quantity + 1)}
                    className="py-5 px-7 hover:bg-primary/5 transition-colors rounded-r-full"
                    size="icon"
                    variant="ghost"
                  >
                    <Plus className="!w-5 !h-5"/>
                  </Button>
                </div>
              }
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}