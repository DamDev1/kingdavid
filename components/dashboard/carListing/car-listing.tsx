"use client";
import DeleteCarModal from "@/components/modal/deleteCar";
import { Button } from "@/components/ui/button";
import { CarouselItem } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import axios from "axios";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { GiGearStickPattern } from "react-icons/gi";
import { LuFuel } from "react-icons/lu";
import { MdOpenInNew } from "react-icons/md";
import { TbBrandSpeedtest } from "react-icons/tb";
import { toast } from "react-toastify";


interface ICar {
  _id: string;
  imageUrls: string;
  listingTitle: string;
  mileage: number;
  fuelType: string;
  transmission: string;
  sellingPrice: string;
}

export default function CarListing() {
  const navigate = useRouter();
  const [carData, setCarData] = useState([]);
  const [isDeleteModal, setIsDeleteModal] = useState(false)
  const [carId, setCarId] = useState("");

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
      {isDeleteModal && <DeleteCarModal carId={carId} handleGetCars={handleGetCars} isDeleteModal={isDeleteModal} setIsDeleteModal={setIsDeleteModal}/>}
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-4xl">My Listing</h2>
        <Button onClick={() => navigate.push("/dashboard/add-car")}>
          +Add Listing
        </Button>
      </div>
      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {carData.map((car: ICar, index: number) => (
          <div className="shadow-lg rounded-xl bg-white relative" key={index}>
            <h2 className="absolute top-0 bg-green-600 m-2 rounded-full text-white text-sm font-semibold px-2 py-1">
              New
            </h2>
            <div>
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
                {car?.listingTitle}
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
                <h2 className="text-blue-600 text-sm flex gap-2 items-center max-md:hidden">
                  <MdOpenInNew />
                  View Details
                </h2>
              </div>
            </div>
            <div className="p-2 bg-gray-50 rounded-xl flex justify-between gap-3">
              <Button variant={"outline"} className="w-full flex-1/2">
                Edit
              </Button>
              <Button
                onClick={() => {
                  setIsDeleteModal(true)
                  setCarId(car._id)
                }}
                variant={"destructive"}
                className="cursor-pointer"
              >
                <Trash2Icon />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
