"use client";

import { useStore } from "@/lib/store";
import { HeaderSection } from "@/components/shared/header";
import { ProductCard } from "@/components/shared/product";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSyncExternalStore } from "react";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const description = wishlist.length > 0
    ? `You have ${wishlist.length} plant${wishlist.length > 1 ? "s" : ""} saved — ready to bring home?`
    : "Start exploring and save the plants you love."

  const isMounted = useSyncExternalStore(
    () => () => { },
    () => true,
    () => false
  );

  if (!isMounted) return null;

  return (
    <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
      <HeaderSection
        title="Your Wishlist"
        description={description}
      />

      {wishlist.length === 0 ? (
        <div className="text-center py-20 flex flex-col items-center gap-6 border-2 border-dashed border-primary/10 rounded-2xl">
          <span className="material-symbols-outlined text-6xl text-primary/20">favorite</span>
          <div className="space-y-2">
            <p className="text-xl font-medium text-primary">Your wishlist is empty</p>
            <p className="text-slate-400">Save your favorite plants for later.</p>
          </div>
          <Link href="/shop">
            <Button className="bg-primary hover:opacity-90 h-12 px-8">Discover Plants</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
