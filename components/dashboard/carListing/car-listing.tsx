"use client";
import { Button } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GiGearStickPattern } from "react-icons/gi";
import { LuFuel } from "react-icons/lu";
import { MdOpenInNew } from "react-icons/md";
import { TbBrandSpeedtest } from "react-icons/tb";

interface ICar {
  imageUrls: string;
  listingTitle: string;
  mileage: number;
  fuelType: string;
  driveType: string;
  sellingPrice: string;
}

export default function CarListing() {
  const navigate = useRouter();
  const [carData, setCarData] = useState([]);

  const handleGetCars = async () => {
    try {
      const res = await axios.get("/api/cars");
      setCarData(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetCars();
  }, []);
  return (
    <div className="mt-5">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-4xl">My Listing</h2>
        <Button onClick={() => navigate.push("/dashboard/add-car")}>
          +Add Listing
        </Button>
      </div>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-4">
        {carData.map((car: ICar, index: number) => (
          <div className="shadow-lg rounded-xl bg-white relative" key={index}>
            <h2 className="absolute top-0 bg-green-600 m-2 rounded-full text-white text-sm font-semibold px-2 py-1">
              New
            </h2>
            <img
              src={car?.imageUrls[0]}
              className="rounded-t-xl"
              width={"100%"}
              height={250}
              alt=""
            />
            <div className="p-4">
              <h2 className="font-bold text-black text-lg mb-2">{car?.listingTitle}</h2>
              <Separator className="border" />
              <div className="grid grid-cols-3 mt-5">
                <div className="flex flex-col items-center">
                  <LuFuel className="text-lg mb-2" />
                  <span className="text-sm">{car?.fuelType}</span>
                </div>

                <div className="flex flex-col items-center">
                  <TbBrandSpeedtest className="text-lg mb-2" />
                  <span className="text-sm">{car?.mileage} Miles</span>
      
                </div>

                <div className="flex flex-col items-center">
                  <GiGearStickPattern className="text-lg mb-2" />
                  <span className="text-sm">{car?.driveType}</span>
                </div>
              </div>
              <Separator className="my-5 border" />
              <div className="justify-between flex items-center">
                <h2 className="font-bold text-xl">${car?.sellingPrice}</h2>
                <h2 className="text-blue-600 text-sm flex gap-2 items-center max-md:hidden">
                  <MdOpenInNew />
                  View Details
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
