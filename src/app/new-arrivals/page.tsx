"use client";

import { products } from "@/lib/data";
import { ProductCard } from "@/components/shared/product";
import { Header, HeaderSection } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";

export default function NewArrivalsPage() {
  const newArrivals = products.filter((product) => product.isNew);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <HeaderSection 
            title="New Arrivals" 
            description="Discover our latest additions. Fresh from our greenhouses, these botanical beauties are ready to find their new home." 
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
