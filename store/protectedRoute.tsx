"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (!userInfo) {
      if (
        path === "/dashboard"
      ) {
        router.push("/login");
      }
    }
  }, [router]);

  // Optionally, render a loading spinner while checking auth

  return <>{children}</>;
}
