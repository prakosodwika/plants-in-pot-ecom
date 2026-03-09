import { ArrowUpRight, BadgeCheck, ChevronRight, Heart } from "lucide-react";
import Link from "next/link";
import { products } from "@/lib/data";
import { ProductCard } from "./product";
import Image from "next/image";
import { TitleSection } from "./title";

export function ProductCategoryNewArrival() {
  const newArrivals = products.filter((p) => p.isNew);

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div className="grid gap-2">
            <TitleSection title="New Arrivals" />
            <p className="text-muted-foreground text-lg max-w-2xl">The latest additions to our greenhouse</p>
          </div>
          <Link className="text-primary font-bold flex items-center gap-1 hover:underline underline-offset-4" href="/shop">
            View All <ChevronRight />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function ProductCategoryBestSellers() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row gap-16 items-center">
        <div className="w-full md:w-1/2 order-2 md:order-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvThJENSVIRjgc9Cq5tn0vY5eW_k-vX51upwPpN2Z2PeKiPZgKdrin8ug_8m9RKuGhTqwXfzFCS9S-HAX-a5BbX5vV0leqIo5cefA0pnaKFpoDLOutNKWJRnUn_Kyd5PVr4D1WzkU-eGy7r5jJDru15nldq1u5DbZf15t9L8vOa3nuv0ntfQr7sm1bOTS4leIXovwvL3v98Chm2Ovr85u_MbL30hQNrg-7m5qotQAh1EPePIT4UgG9HrvEsWReswOMlSINaEhLkr4"
                alt="Fiddle Leaf Fig close up"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-square rounded-xl overflow-hidden mt-8">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi2A0uxVGdmEayjg5q3OK9BQih9HopqhNOrcOzV9DyLdZXC8qLiZnqY1gVgy-aX3yLn7fvUyn8JTwpVi4APMBtIq33AaLD4pzKArzHmiPJCSakChoCKcU6E_1H5Yn7vLZhgvMuw9iT8gLlsIagyqjjPfS75K2QtrXYPtgW4WL6Xq9vdWLdKogVZeLPfiej4PTyGMoppmFaFI1Tt2Y4DEvhMKgCKlU9khPZQ7wKYdUp5GfKNfyaLobeoKIVPsBL1LpCgHS6lDiQNdI"
                alt="Potted succulent collection"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 order-1 md:order-2">
          <TitleSection title="Our Best Sellers" />
          <p className="text-lg text-muted-foreground mb-8 mt-6 leading-relaxed">
            Loved by our community, these plants are perfect for both seasoned collectors and new plant parents. Each one comes with a lifetime care guide.
          </p>
          <div className="space-y-6 text-primary">
            <div className="flex items-center gap-4 p-4 rounded-xl border border-primary/10 hover:bg-primary/5 transition-colors cursor-pointer group">
              <BadgeCheck color="white" className="!w-7 !h-7 fill-primary" />
              <div>
                <h4 className="font-bold">The Fiddle Leaf Fig</h4>
                <p className="text-sm text-muted-foreground">The iconic statement piece for any bright room.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-xl border border-primary/10 hover:bg-primary/5 transition-colors cursor-pointer group">
              <Heart color="white" className="!w-6 !h-6 fill-primary stroke-primary" />
              <div>
                <h4 className="font-bold">Snake Plant Laurentii</h4>
                <p className="text-sm text-muted-foreground">Unstoppable and incredibly easy to care for.</p>
              </div>
            </div>
          </div>
          <Link href="/best-sellers">
            <button className="mt-10 text-primary font-bold flex items-center gap-2 border-b-2 border-primary pb-1 hover:opacity-80 transition-opacity">
              Shop All Best Sellers <ArrowUpRight />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}