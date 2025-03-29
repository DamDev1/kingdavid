import React from "react";
import carList from "@/lib/FakerData";
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

interface ICar {
  image: string;
  name: string;
  miles: number;
  fuelType: string;
  gearType: string;
  price: string;
}

export default function MostSearchCar() {
  return (
    <section className="mx-24 max-md:mx-5">
      <h2 className="text-3xl font-bold text-center mt-16 mb-7">
        Most Search Car
      </h2>

      <Carousel>
        <CarouselContent>
          {carList.carList.map((car: ICar, index: number) => (
            <CarouselItem className="basis-1/4 max-md:basis-1/2" key={index}>
              <div className="shadow-lg rounded-xl bg-white">
                <h2 className="absolute top-0 bg-green-600 m-2 rounded-full text-white text-sm font-semibold px-2 py-1">
                  New
                </h2>
                <img
                  src={car?.image}
                  className="rounded-t-xl"
                  width={"100%"}
                  height={250}
                  alt=""
                />
                <div className="p-4">
                  <h2 className="font-bold text-black text-lg mb-2">
                    {car?.name}
                  </h2>
                  <Separator className="border" />
                  <div className="grid grid-cols-3 mt-5">
                    <div className="flex flex-col items-center">
                      <LuFuel className="text-lg mb-2" />
                      <span className="text-sm">{car?.miles} Miles</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <TbBrandSpeedtest className="text-lg mb-2" />
                      <span className="text-sm">{car?.gearType}</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <GiGearStickPattern className="text-lg mb-2" />
                      <span className="text-sm">{car?.fuelType}</span>
                    </div>
                  </div>
                  <Separator className="my-5 border" />
                  <div className="justify-between flex items-center">
                    <h2 className="font-bold text-xl">${car?.price}</h2>
                    <h2 className="text-blue-600 text-sm flex gap-2 items-center max-md:hidden">
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
    </section>
  );
}
