"use client";

import { ProductCard } from "@/components/shared/product";
import { products } from "@/lib/data";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { TitleSection } from "@/components/shared/title";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ShopContent() {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";
    const [activeCategory, setActiveCategory] = useState("All");
    
    const categories = useMemo(() => ["All", ...Array.from(new Set(products.map((p) => p.category)))], []);

    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const matchesCategory = activeCategory === "All" || p.category === activeCategory;
            const matchesSearch = searchQuery === "" || p.name.toLowerCase().includes(searchQuery);
            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, searchQuery]);

    return (
        <main className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full">
            <div className="flex flex-col gap-4 mb-12">
                <TitleSection title={searchQuery ? `Search results for "${searchQuery}"` : "The Collection"} />
                <p className="text-muted-foreground text-lg max-w-2xl">
                    {searchQuery 
                        ? `Found ${filteredProducts.length} results matching your search.`
                        : "Our current greenhouse selection, curated for every home and every skill level. From easy-to-care succulents to rare botanical specimens."
                    }
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
                    No plants found {searchQuery ? `matching "${searchQuery}"` : "in this category"}. Check back soon!
                </div>
            )}
        </main>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={<div className="flex-grow max-w-7xl mx-auto px-6 py-12 w-full text-center">Loading shop...</div>}>
            <ShopContent />
        </Suspense>
    );
}
