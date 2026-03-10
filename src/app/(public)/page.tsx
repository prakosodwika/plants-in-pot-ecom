import { HeroLanding } from "@/components/shared/hero";
import { ProductCategoryBestSellers, ProductCategoryNewArrival } from "@/components/shared/product-category";

export default function HomePage() {
  return (
    <main className="flex-grow overflow-x-hidden">
      <HeroLanding />
      <ProductCategoryNewArrival />
      <ProductCategoryBestSellers />
    </main>
  );
}
