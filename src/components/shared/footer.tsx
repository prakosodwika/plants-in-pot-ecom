import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Earth, LeafyGreen, SendHorizonal, Share2, Users } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary/5 border-t border-primary/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6 text-primary">
              <LeafyGreen />
              <h2 className="text-lg font-bold tracking-tight">Plants in pot</h2>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Curating natures best for your home. We source our plants from sustainable local nurseries and deliver them with love.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-primary mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link className="hover:text-primary transition-colors" href="#">Indoor Plants</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Pots & Planters</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Care Tools</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Gift Cards</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-primary mb-6">Learn</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link className="hover:text-primary transition-colors" href="#">Care Guides</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Plant Hospital</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Blog</Link></li>
              <li><Link className="hover:text-primary transition-colors" href="#">Workshops</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-primary mb-6">Newsletter</h4>
            <p className="text-sm text-slate-500 mb-4">Join our community for plant tips and exclusive offers.</p>
            <div className="flex gap-1">
              <Input
                className="flex-1 bg-white border-primary/20 rounded-lg px-4 h-10 text-sm focus:ring-primary focus:border-primary"
                placeholder="Email address"
                type="email"
              />
              <Button size="icon" className="bg-primary text-white h-10 w-10 rounded-lg hover:opacity-90 transition-opacity">
                <SendHorizonal />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-primary/10 text-xs text-slate-400 gap-4">
          <p>© 2024 Verdant Aura. All rights reserved.</p>
          <div className="flex gap-6">
            <Link className="hover:text-primary" href="#">Privacy Policy</Link>
            <Link className="hover:text-primary" href="#">Terms of Service</Link>
            <Link className="hover:text-primary" href="#">Shipping Policy</Link>
          </div>
          <div className="flex gap-4">
            {/* <span className="material-symbols-outlined cursor-pointer hover:text-primary text-sm">public</span>
            <span className="material-symbols-outlined cursor-pointer hover:text-primary text-sm">group</span>
            <span className="material-symbols-outlined cursor-pointer hover:text-primary text-sm">share</span> */}
            <Earth className="!w-5 !h-5"/>
            <Users className="!w-5 !h-5"/>
            <Share2 className="!w-5 !h-5"/>
          </div>
        </div>
      </div>
    </footer>
  );
}
