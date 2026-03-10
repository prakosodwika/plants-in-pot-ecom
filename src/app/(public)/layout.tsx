import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { Toaster } from "sonner";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      {children}
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
}