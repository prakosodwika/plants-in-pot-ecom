"use client";

import { HeaderSection } from "@/components/shared/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Guide, guides } from "@/lib/data";

export default function CareGuidesPage() {

  return (
    <main>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <HeaderSection
          title="Care Guides"
          description="Everything you need to know to keep your botanical friends thriving. From watering schedules to light requirements."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guides.map((guide: Guide, index) => (
            <Card key={index} className="border-primary/10 bg-primary/5">
              <CardHeader className="flex flex-row items-center gap-4">
                <guide.icon className="w-8 h-8 text-primary" />
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
  );
}
