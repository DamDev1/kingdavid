import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@radix-ui/react-select";
import { LuFuel } from "react-icons/lu";
import { TbBrandSpeedtest } from "react-icons/tb";
import { GiGearStickPattern } from "react-icons/gi";
import { MdOpenInNew } from "react-icons/md";
import { useRouter } from "next/navigation";
import axios from "axios";
import ICar from "@/types/SmallCarDetails";

export default function MostSearchCar() {
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
    <section className="mx-24 max-md:mx-5">
      <h2 className="text-3xl font-bold text-center mt-16 mb-7">
        Most Search Car
      </h2>
      <Carousel>
        <CarouselContent>
          {carData.slice(0, 10).map((car: ICar, index: number) => (
            <CarouselItem className="basis-1/4 max-sm:basis-[85%] max-lg:basis-1/3" key={index}>
              <div className="shadow-lg rounded-xl bg-white relative" onClick={() => navigate.push(`/car-details/${car?._id}`)}>
                <h2 className="absolute top-0 bg-green-600 m-2 rounded-full text-white text-sm font-semibold px-2 py-1">
                  New
                </h2>
                <div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={car?.imageUrls[0]}
                    className="rounded-t-xl h-[190px] object-cover"
                    width={"100%"}
                    height={250}
                    alt=""
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
                    <h2 className="font-bold text-xl">${car?.sellingPrice}</h2>
                    <h2 className="text-blue-600 text-sm flex gap-2 items-center cursor-pointer" onClick={() => navigate.push(`/car-details/${car?._id}`)}>
                      <MdOpenInNew />
                      View Details
                    </h2>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="mt-10">
        <Carousel>
          <CarouselContent>
            {carData.slice(0, 10).map((car: ICar, index: number) => (
              <CarouselItem className="basis-1/4 max-sm:basis-[85%] max-lg:basis-1/3" key={index}>
                <div className="shadow-lg rounded-xl bg-white relative" onClick={() => navigate.push(`/car-details/${car?._id}`)}>
                  <h2 className="absolute top-0 bg-green-600 m-2 rounded-full text-white text-sm font-semibold px-2 py-1">
                    New
                  </h2>
                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={car?.imageUrls[0]}
                      className="rounded-t-xl h-[190px] object-cover"
                      width={"100%"}
                      height={250}
                      alt=""
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
                      <h2 className="text-blue-600 text-sm flex gap-2 items-center cursor-pointer" onClick={() => navigate.push(`/car-details/${car?._id}`)}>
                        <MdOpenInNew />
                        View Details
                      </h2>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="mt-10">
        <Carousel>
          <CarouselContent>
            {carData.slice(0, 10).map((car: ICar, index: number) => (
              <CarouselItem className="basis-1/4 max-sm:basis-[85%] max-lg:basis-1/3" key={index}>
                <div className="shadow-lg rounded-xl bg-white relative" onClick={() => navigate.push(`/car-details/${car?._id}`)}>
                  <h2 className="absolute top-0 bg-green-600 m-2 rounded-full text-white text-sm font-semibold px-2 py-1">
                    New
                  </h2>
                  <div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={car?.imageUrls[0]}
                      className="rounded-t-xl h-[190px] object-cover"
                      width={"100%"}
                      height={250}
                      alt=""
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
                      <h2 className="text-blue-600 text-sm flex gap-2 items-center cursor-pointer" onClick={() => navigate.push(`/car-details/${car?._id}`)}>
                        <MdOpenInNew />
                        View Details
                      </h2>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
