import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { SingleCarDetailsProvider } from "@/context/useSingleCarDetails";
import Footer from "@/components/shared/Footer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"], // Add this line
});

export const metadata: Metadata = {
  title: "KingDavidAuto",
  description: "Checkout your dream car",
};

export default function CarDetailsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${poppins.variable} antialiased`}>
        <SingleCarDetailsProvider>
          <div className="mb-5">
            {children}
          </div>
          <Footer />
        </SingleCarDetailsProvider>
      </body>
    </html>
  );
}
