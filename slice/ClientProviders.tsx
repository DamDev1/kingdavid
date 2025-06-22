"use client";

import { Provider } from "react-redux";
import store from "@/store/store";
// import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";
import ProtectedLayout from "@/store/protectedRoute";
export default function ClientProviders({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Provider store={store}>
      <ProtectedLayout>
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {children}
      </ProtectedLayout>
    </Provider>
  );
}
