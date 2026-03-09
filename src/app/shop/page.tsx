"use client";

import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { ProductCard } from "@/components/shared/product";
import { products } from "@/lib/data";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TitleSection } from "@/components/shared/title";

export default function ShopPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

    const filteredProducts = activeCategory === "All"
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
                <div className="flex flex-col gap-4 mb-12">
                    <TitleSection title="The Collection" />
                    <p className="text-muted-foreground text-lg max-w-2xl">
                        Our current greenhouse selection, curated for every home and every skill level.
                        From easy-to-care succulents to rare botanical specimens.
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={activeCategory === category ? "default" : "outline"}
                                onClick={() => setActiveCategory(category)}
                                className={`rounded-full px-6 transition-all ${activeCategory === category
                                        ? "bg-primary text-white"
                                        : "border-primary/20 text-primary hover:bg-primary/5"
                                    }`}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20 text-slate-500">
                        No plants found in this category. Check back soon!
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
