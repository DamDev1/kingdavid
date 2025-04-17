'use client';

import { Provider } from "react-redux";
import store from "@/store/store";
// import { usePathname } from "next/navigation";
import { ToastContainer } from 'react-toastify';
export default function ClientProviders({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Provider store={store}>
      <ToastContainer />
      {children}
    </Provider>
  );
}
