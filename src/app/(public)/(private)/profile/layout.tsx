import { ProfileSidebar } from "@/components/profile/sidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto w-full max-w-7xl flex flex-col md:flex-row gap-8 px-6 py-10">
      <ProfileSidebar />
      <section className="flex-1">
        {children}
      </section>
    </main>
  );
}
