"use client";

import { Provider } from "react-redux";
import store from "@/store/store";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

export default function ClientProviders({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Provider store={store}>
      <Toaster />
      {children}
    </Provider>
  );
}
