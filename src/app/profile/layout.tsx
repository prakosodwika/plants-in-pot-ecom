import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { ProfileSidebar } from "@/components/profile/sidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="mx-auto w-full max-w-7xl flex flex-col md:flex-row gap-8 px-6 py-10">
        <ProfileSidebar />
        <section className="flex-1">
          {children}
        </section>
      </main>
      <Footer />
    </div>
  );
}
