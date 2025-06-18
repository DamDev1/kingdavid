import React from "react";
import Search from "./search";
import Image from "next/image";
import { teslaimg } from "@/asset/images";

export default function HeroSection() {
  return (
    <div>
      <div className="flex items-center flex-col gap-6 text-center p-10 py-20 h-[650px] w-full bg-[#eef0fc]">
        <h2 className="text-lg">Find a car for sale and fro rent near you</h2>
        <p className="text-[60px] font-bold">Find your dream car</p>
        <Search />
        <div className="w-full h-full max-md:hidden">
        <Image
          width={500}
          height={500}
          src={teslaimg.src}
          alt="hero"
          className="w-full mt-10"
        />
        </div>
      </div>
    </div>
  );
}
