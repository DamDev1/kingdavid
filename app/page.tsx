"use client";
import Category from "@/components/shared/category";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import HeroSection from "@/components/shared/heroSection";
import MostSearchCar from "@/components/shared/MostSearchCar";
import WinCar from "@/components/shared/WinCar";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Header />
      <HeroSection/>
      <Category/>
      <MostSearchCar/>
      <WinCar/>
      <Footer/>
    </div>
  );
}
