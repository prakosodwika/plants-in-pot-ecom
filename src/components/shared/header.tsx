"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useSyncExternalStore, useState } from "react";
import { Bell, Heart, LeafyGreen, Search, ShoppingBag, UserRound } from "lucide-react";
import { TitleSection } from "./title";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const cart = useStore((state) => state.cart);
  const wishlist = useStore((state) => state.wishlist);
  const isMounted = useSyncExternalStore(
    () => () => { },
    () => true,
    () => false
  );

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { label: "Shop All", href: "/shop" },
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Best Sellers", href: "/best-sellers" },
    { label: "Care Guides", href: "/care-guides" },
  ];

  if (!isMounted) return null;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-2 text-primary">
            <LeafyGreen className="w-8 h-8" />
            <h1 className="text-2xl font-black tracking-tighter">Plants in Pot</h1>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold tracking-wide transition-colors hover:text-primary ${pathname === item.href ? "text-primary" : "text-muted-foreground"
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/shop?search=${encodeURIComponent(searchQuery)}`);
            }}
            className="hidden lg:flex items-center bg-primary/5 rounded-full px-4 border border-primary/10"
          >
            <Search className="w-4 h-4 text-primary/40" strokeWidth={3}/>
            <Input
              className="bg-transparent border-none focus-visible:ring-0 text-sm font-medium placeholder:text-primary/40 w-48 h-10"
              placeholder="Search our jungle..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <Link href="/wishlist">
            <Button variant="ghost" size="icon" className="relative p-5 hover:bg-primary/10 rounded-full transition-colors">
              <Heart className="!w-5 !h-5" />
              {wishlist.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-[10px] font-bold border-2 border-background">
                  {wishlist.length}
                </Badge>
              )}
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative p-5 hover:bg-primary/10 rounded-full transition-colors">
              <ShoppingBag className="!w-5 !h-5" />
              {totalCartItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-[10px] font-bold border-2 border-background">
                  {totalCartItems}
                </Badge>
              )}
            </Button>
          </Link>
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="p-5 hover:bg-primary/10 rounded-full transition-colors">
              <UserRound className="!w-5 !h-5" />
            </Button>
          </Link>
          {/* <Sheet>
            <SheetTrigger>
              <Button variant="ghost" size="icon" className="md:hidden p-2">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-8 mt-12">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      pathname === item.href ? "text-primary font-bold" : "text-primary"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet> */}
        </div>
      </div>
    </header>
  );
}

interface HeaderSectionProps {
  title: string
  description: string
}

export function HeaderSection({
  title,
  description,
}: HeaderSectionProps) {
  return (
    <section className="flex flex-col gap-4 mb-12">
      <TitleSection title={title} />
      <p className="text-muted-foreground text-lg max-w-2xl">
        {description}
      </p>
    </section>
  )
}

export function HeaderAdmin() {
  return (
    <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-10 px-8 flex items-center justify-between shrink-0">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/40" strokeWidth={3} />
            <Input
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg focus-visible:ring-2 focus-visible:ring-primary/20 text-sm placeholder:text-slate-400 h-10"
              placeholder="Search orders, plants, or customers..."
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="p-4" >
            <Bell className="!w-5 !h-5" strokeWidth={2}/>
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-base font-medium">Jan 24, 2024</span>
          </div>
        </div>
      </header>
  )
}