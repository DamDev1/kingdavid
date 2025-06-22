"use client";
import MethodOfPayment from "@/components/carDetails/checkout/methodOfPayment";
import Heading from "@/components/carDetails/Heading";
import Header from "@/components/shared/Header";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CarDetailsProps from "@/types/carDetails";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { Fragment, useEffect, useState } from "react";

export default function CheckoutPage() {
  const [carData, setCarData] = useState<CarDetailsProps | null>(null);
  const params = useParams();
  const handleGetDetails = async () => {
    try {
      const res = await axios.get(`/api/single-car`, {
        params: { id: params.id },
      });
      setCarData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetDetails();
  }, []);
  return (
    <section>
      <Header />
      {carData && (
        <Fragment>
          <div className="p-10 max-md:p-5 overflow-hidden">
            <Heading carData={carData} />
          </div>
          <div className="px-10 overflow-hidden max-md:px-5">
            <Carousel>
              <CarouselContent>
                {carData?.imageUrls.map((image, index) => (
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
          <div className="px-10 overflow-hidden max-md:px-5">
            <div className="bg-white p-5 shadow-md mt-5 border rounded-md">
              <h2 className="font-medium text-xl">Description</h2>
              <p className="text-gray-600 mt-2">{carData.listingDescription}</p>
            </div>
          </div>
          <div className="px-10 overflow-hidden max-md:px-5">
            <div className="bg-white p-5 shadow-md mt-5 border rounded-md">
              <h2 className="font-medium text-xl">Choose Method of Payment</h2>
              <MethodOfPayment/>
            </div>
          </div>
        </Fragment>
      )}
    </section>
  );
}
