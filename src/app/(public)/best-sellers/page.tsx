"use client";

import { products } from "@/lib/data";
import { ProductCard } from "@/components/shared/product";
import { HeaderSection } from "@/components/shared/header";

export default function BestSellersPage() {
  const bestSellers = products.filter((product) => product.isBestSeller);

  return (
    <main>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <HeaderSection
          title="Best Sellers"
          description="Our most popular botanical friends. These favorites are loved for their beauty and ease of care."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
