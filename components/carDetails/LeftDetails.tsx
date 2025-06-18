import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CarDetailsProps from "@/types/carDetails";
import { FaCheck } from "react-icons/fa";
import FinancingCalculator from "./FinancingCalculator";

export default function LeftDetails({carData}:{carData: CarDetailsProps}) {
    const images = carData.imageUrls
    const features = carData.features
    const carPrice = carData.sellingPrice
  return (
    <div className="w-full">
      <div>
        <Carousel>
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image}
                  alt=""
                  className="rounded-lg h-[500px] max-md:h-[300px] object-cover w-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="bg-white p-5 shadow-md mt-5 border rounded-md">
        <h2 className="font-medium text-xl">Description</h2>
        <p className="text-gray-600 mt-2">{carData.listingDescription}</p>
      </div>
      <div className="bg-white p-5 shadow-md mt-5 border rounded-md">
        <h2 className="font-medium text-xl">Features</h2>
        <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-5">
            {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                    <div className="mt-3">
                        <FaCheck className="text-lg p-1 rounded-full bg-blue-100 text-blue-600 flex justify-center items-center" />
                    </div>
                    <p className="text-gray-600 mt-2">{feature}</p>
                </div>
            ))}
        </div>
      </div>
      <FinancingCalculator carPrice={carPrice} />
    </div>
  );
}
