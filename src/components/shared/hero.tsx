import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function HeroLanding() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-primary font-bold tracking-widest uppercase text-xs">Curated Botanical Collection</span>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-green-950">
              Bring Nature <br /><span className="text-primary">Indoors</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed ">
              Discover our hand-picked collection of premium, rare, and resilient indoor plants designed to transform your living space into a sanctuary.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/shop">
              <Button className="bg-primary text-white px-8 py-6 rounded-lg font-bold hover:opacity-90 transition-opacity flex items-center gap-2">
                Shop New Arrivals
                <ArrowRight />
              </Button>
            </Link>
            <Link href="/care-guides">
              <Button variant="outline" className="border-primary/20 bg-white px-8 py-6 rounded-lg font-bold hover:bg-primary/5 transition-colors">
                View Care Guides
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative group">
          <div className="absolute -inset-4 bg-primary/5 rounded-xl -rotate-2"></div>
          <div className="relative aspect-[4/5] rounded-xl shadow-2xl overflow-hidden">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcPkErbQTi-tq6Os-I99xPKKm320aDIIsYTj-TGyfl7WYIqqexbFfSGzexsXEYyt8p6ocFfRjL5MGEYu-SG5T7p_8oJoIKbTt2aKpVljZ7djSfqMV_rNzaKhQojld9HRXNCMnH1KMIf3sBZnG5ZC1D5N2C2HmZJwUqMWPLt5WcUsNevPaeFvPQEtWibumMhMY9Rktpf-6BtdgER57420vsO5RBoT3aHu-0lXcmMqzejGvB1E-7iZx2NRs_VXGzctIVF93gE-7LFys"
              alt="Luxurious Monstera Deliciosa plant in a minimalist white room"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}