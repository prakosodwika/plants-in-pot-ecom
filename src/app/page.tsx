import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { Toaster } from "@/components/ui/sonner";
import { HeroLanding } from "@/components/shared/hero";
import { ProductCategoryBestSellers, ProductCategoryNewArrival } from "@/components/shared/product-category";

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex-grow overflow-x-hidden">
        <HeroLanding />
        <ProductCategoryNewArrival />
        <ProductCategoryBestSellers />
      </main>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
}
