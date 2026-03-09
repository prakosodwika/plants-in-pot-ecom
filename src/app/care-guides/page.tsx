"use client";

import { Footer } from "@/components/shared/footer";
import { Header, HeaderSection } from "@/components/shared/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Sun, Wind, ThermometerSun } from "lucide-react";

export default function CareGuidesPage() {
  const guides = [
    {
      title: "Watering 101",
      icon: <Droplets className="w-8 h-8 text-primary" />,
      content: "Most houseplants prefer to dry out slightly between waterings. Stick your finger an inch into the soil; if it's dry, it's time to water.",
    },
    {
      title: "Lighting Guide",
      icon: <Sun className="w-8 h-8 text-primary" />,
      content: "Bright, indirect light is the gold standard for most indoor plants. Avoid harsh direct sun which can scorch leaves.",
    },
    {
      title: "Humidity & Air",
      icon: <Wind className="w-8 h-8 text-primary" />,
      content: "Tropical plants love humidity. Mist them regularly or use a pebble tray to keep them happy in dry indoor environments.",
    },
    {
      title: "Temperature",
      icon: <ThermometerSun className="w-8 h-8 text-primary" />,
      content: "Keep your plants away from cold drafts and heating vents. Most plants thrive in temperatures between 65°F and 75°F (18°C - 24°C).",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <HeaderSection
            title="Care Guides"
            description="Everything you need to know to keep your botanical friends thriving. From watering schedules to light requirements."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {guides.map((guide, index) => (
              <Card key={index} className="border-primary/10 bg-primary/5">
                <CardHeader className="flex flex-row items-center gap-4">
                  {guide.icon}
                  <CardTitle className="text-xl font-bold uppercase tracking-tight">{guide.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-primary leading-relaxed">
                    {guide.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 bg-primary text-primary-foreground rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-black uppercase mb-6">Need more help?</h2>
            <p className="text-lg mb-8 max-w-xl mx-auto opacity-90">
              Our team of plant experts is always ready to help you with your botanical journey. Contact us for personalized advice.
            </p>
            <button className="bg-white text-primary px-8 py-4 rounded-full font-bold uppercase tracking-wide hover:bg-slate-100 transition-colors">
              Contact Expert
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
