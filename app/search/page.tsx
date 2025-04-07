"use client";
import SearchCar from "@/components/searchcar/SearchCar";
import Header from "@/components/shared/Header";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GiGearStickPattern } from "react-icons/gi";
import { LuFuel } from "react-icons/lu";
import { MdOpenInNew } from "react-icons/md";
import { TbBrandSpeedtest } from "react-icons/tb";

interface ICar {
  _id: string;
  imageUrls: string[];
  listingTitle: string;
  mileage: number;
  fuelType: string;
  transmission: string;
  sellingPrice: string;
}

export default function SearchPage() {
  const [carData, setCarData] = useState<ICar[]>([]);
  const searchParams = useSearchParams();
  const car = searchParams.get("car");
  const make = searchParams.get("make");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const handleGetCars = async () => {
    try {
      const res = await axios.get("/api/cars");
      let cars: ICar[] = res.data.data;

      if (car) {
        if (car === "New") {
          cars = cars.filter((c) =>
            c?.listingTitle?.toLowerCase().includes("new")
          );
        } else if (car === "Old") {
          cars = cars.filter((c) =>
            c?.listingTitle?.toLowerCase().includes("Used")
          );
        }
      }

      if (make) {
        cars = cars.filter((c) =>
          c?.listingTitle?.toLowerCase().includes(make.toLowerCase())
        );
      }

      if (minPrice) {
        cars = cars.filter(
          (c) => Number(c.sellingPrice) >= Number(minPrice)
        );
      }

      if (maxPrice) {
        cars = cars.filter(
          (c) => Number(c.sellingPrice) <= Number(maxPrice)
        );
      }

      setCarData(cars);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetCars();
  }, [car, make, minPrice, maxPrice]);

  return (
    <section>
      <Header />
      <div>
        <div className="flex items-center flex-col gap-6 p-10 py-20 text-center h-[400px] w-full bg-[#eef0fc]">
          <p className="text-[60px] font-bold">Search for cars</p>
          <SearchCar />
        </div>

        <div className="p-10 py-20">
          <h1 className="text-[30px] font-bold">Results</h1>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {carData.length === 0 ? (
              <p className="col-span-full text-center text-gray-500">
                No cars found.
              </p>
            ) : (
              carData.map((car, index) => (
                <div
                  className="shadow-lg rounded-xl bg-white relative"
                  key={index}
                >
                  <h2 className="absolute top-0 bg-green-600 m-2 rounded-full text-white text-sm font-semibold px-2 py-1">
                    New
                  </h2>
                  <div>
                    <img
                      src={
                        Array.isArray(car.imageUrls) && car.imageUrls.length > 0
                          ? car.imageUrls[0]
                          : "/placeholder.jpg"
                      }
                      className="rounded-t-xl h-[190px] object-cover"
                      width={"100%"}
                      height={250}
                      alt="Car Image"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="font-bold text-black text-lg mb-2">
                      {car?.listingTitle.slice(0, 35) + "..."}
                    </h2>
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
                        <span className="text-sm">{car?.transmission}</span>
                      </div>
                    </div>
                    <Separator className="my-5 border" />
                    <div className="justify-between flex items-center">
                      <h2 className="font-bold text-xl">
                        ${car?.sellingPrice}
                      </h2>
                      <h2 className="text-blue-600 text-sm flex gap-2 items-center max-md:hidden">
                        <MdOpenInNew />
                        View Details
                      </h2>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
