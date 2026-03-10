"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminSidebar } from "@/components/shared/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const userRole = localStorage.getItem("userRole");
    // if (userRole !== "admin") {
    //   router.push("/login");
    // }
  }, [router]);

  if (!isMounted) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}
